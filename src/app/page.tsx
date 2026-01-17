import Calendar from '@/components/Calendar';
import styles from './page.module.css';

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.hero}>
        <div className={styles.blob}></div>
        <h1 className={`${styles.title} animate-fade-in`}>
          <span className="gradient-text">中国节假日 API</span>
        </h1>
        <p className={`${styles.subtitle} animate-fade-in`} style={{ animationDelay: '0.2s' }}>
          为开发者提供的 2020 - 2026 年中国法定节假日及调休安排接口
        </p>
        
        <div className={`${styles.badge} animate-fade-in`} style={{ animationDelay: '0.4s' }}>
          <span>🚀 高性能 JSON 接口</span>
          <span>📅 2020-2026 全年覆盖</span>
          <span>💎 匠心设计 UI</span>
        </div>
      </div>

      <section className={styles.section}>
        <div className={styles.card}>
          <h2 className={styles.sectionTitle}>API 快速集成</h2>
          <div className={styles.apiBlock}>
            <div className={styles.apiHeader}>
              <span className={styles.method}>GET</span>
              <code className={styles.url}>/api/v1/holidays/[year]</code>
            </div>
            <pre className={styles.code}>
{`{
  "2026-01-01": {
    "date": "2026-01-01",
    "name": "元旦",
    "isOffDay": true
  },
  ...
}`}
            </pre>
          </div>
          <p className={styles.description}>
            接口返回标准 JSON 对象，键为日期字符串，值为该日期的节假日信息。
          </p>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>节假日台历</h2>
          <p className={styles.sectionSubtitle}>直观可视化 2026 年的所有放假与补班安排</p>
        </div>
        <div className="animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <Calendar />
        </div>
      </section>

      <footer className={styles.footer}>
        <p>© 2026 中国节假日 API | 基于 Next.js 构建</p>
      </footer>
    </main>
  );
}
