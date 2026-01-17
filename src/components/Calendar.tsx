'use client';

import React, { useState, useEffect } from 'react';
import styles from './Calendar.module.css';

interface Holiday {
  date: string;
  name: string;
  isOffDay: boolean;
}

interface HolidayData {
  [key: string]: Holiday;
}

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 0, 1));
  const [selectedDate, setSelectedDate] = useState(new Date(2026, 0, 1));
  const [holidays, setHolidays] = useState<HolidayData>({});

  useEffect(() => {
    const year = currentDate.getFullYear();
    fetch(`/api/v1/holidays/${year}`)
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) {
          setHolidays(data);
        } else {
          setHolidays({});
        }
      });
  }, [currentDate.getFullYear()]);

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  const daysInMonth = getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth());
  const monthName = currentDate.toLocaleString('zh-CN', { month: 'long' });
  const displayYear = currentDate.getFullYear();

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newYear = parseInt(e.target.value);
    setCurrentDate(new Date(newYear, currentDate.getMonth(), 1));
  };

  const handleDayClick = (year: number, month: number, day: number) => {
    setSelectedDate(new Date(year, month, day));
  };

  const renderDays = () => {
    const days = [];
    const prevMonthDays = getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth() - 1);
    
    // Previous month's days
    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
      days.push(
        <div key={`prev-${i}`} className={`${styles.dayCell} ${styles.otherMonth}`}>
          <span className={styles.dayNumber}>{prevMonthDays - i}</span>
        </div>
      );
    }

    // Current month's days
    for (let i = 1; i <= daysInMonth; i++) {
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth();
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
      const holiday = holidays[dateStr];
      const isToday = new Date().toISOString().split('T')[0] === dateStr;
      const isSelected = selectedDate.getFullYear() === year && selectedDate.getMonth() === month && selectedDate.getDate() === i;

      let cellClass = styles.dayCell;
      if (holiday) {
        cellClass += holiday.isOffDay ? ` ${styles.isHoliday}` : ` ${styles.isWorkDay}`;
      }
      if (isToday) cellClass += ` ${styles.today}`;
      if (isSelected) cellClass += ` ${styles.selectedDay}`;

      days.push(
        <div key={i} className={cellClass} onClick={() => handleDayClick(year, month, i)}>
          <span className={styles.dayNumber}>{i}</span>
          {holiday && <span className={styles.holidayName}>{holiday.name}</span>}
          {holiday && (
            <span style={{ fontSize: '10px', marginTop: '2px', opacity: 0.8 }}>
              {holiday.isOffDay ? '休' : '班'}
            </span>
          )}
        </div>
      );
    }

    // Next month's days
    const remainingCells = 42 - days.length;
    for (let i = 1; i <= remainingCells; i++) {
      days.push(
        <div key={`next-${i}`} className={`${styles.dayCell} ${styles.otherMonth}`}>
          <span className={styles.dayNumber}>{i}</span>
        </div>
      );
    }

    return days;
  };

  const selectedDateStr = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`;
  const selectedHoliday = holidays[selectedDateStr];
  const chineseWeekday = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'][selectedDate.getDay()];

  const years = Array.from({ length: 7 }, (_, i) => 2020 + i);

  return (
    <div className={styles.calendarContainer}>
      <div className={styles.leftView}>
        <div className={styles.header}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <h2 className={styles.title}>{displayYear}年</h2>
            <select 
              className={styles.yearSelect} 
              value={displayYear} 
              onChange={handleYearChange}
            >
              {years.map(y => (
                <option key={y} value={y}>{y}年</option>
              ))}
            </select>
          </div>
          <div className={styles.controls}>
            <button className={styles.btn} onClick={prevMonth}>&lt;</button>
            <button className={styles.btn} onClick={() => {
              const now = new Date();
              setCurrentDate(new Date(now.getFullYear(), now.getMonth(), 1));
              setSelectedDate(now);
            }}>今天</button>
            <button className={styles.btn} onClick={nextMonth}>&gt;</button>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginBottom: '1rem', fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--primary)' }}>
          {monthName}
        </div>

        <div className={styles.monthGrid}>
          {['日', '一', '二', '三', '四', '五', '六'].map((day) => (
            <div key={day} className={styles.weekdayHeader}>{day}</div>
          ))}
          {renderDays()}
        </div>

        <div className={styles.legend}>
          <div className={styles.legendItem}>
            <div className={`${styles.legendDot} ${styles.isHoliday}`}></div>
            <span>法定节假日 (休)</span>
          </div>
          <div className={styles.legendItem}>
            <div className={`${styles.legendDot} ${styles.isWorkDay}`}></div>
            <span>调休工作日 (班)</span>
          </div>
        </div>
      </div>

      <div className={styles.rightView}>
        <div className={styles.fuSticker}>福</div>
        <div className={styles.detailCard}>
          <div className={styles.detailYear}>{selectedDate.getFullYear()}年</div>
          <div className={styles.detailMonth}>{selectedDate.getMonth() + 1}月</div>
          <div className={styles.detailDay}>{selectedDate.getDate()}</div>
          <div className={styles.detailWeekday}>{chineseWeekday}</div>
          {selectedHoliday ? (
            <div className={styles.detailHoliday}>
              {selectedHoliday.name}
              <div style={{ fontSize: '0.8rem', opacity: 0.9 }}>
                {selectedHoliday.isOffDay ? '【 宜 休息 】' : '【 宜 工作 】'}
              </div>
            </div>
          ) : (
            <div style={{ fontSize: '1rem', color: 'var(--secondary)', letterSpacing: '0.2em' }}>
              传统台历
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
