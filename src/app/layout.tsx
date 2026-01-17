import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "【中国节假日查询】- 2020-2026 年中国法定节假日及调休安排",
  description: "免费的中国节假日查询服务。提供2020-2026年完整的中国法定节假日、调休安排信息。包括春节、清明节、劳动节、端午节、中秋节、国庆节等所有法定节假日查询。",
  keywords: "中国节假日,节假日查询,放假安排,调休安排,春节,清明节,劳动节,端午节,中秋节,国庆节,2026年放假安排",
  authors: [{ name: "中国节假日 API" }],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "中国节假日查询 - 2020-2026年完整放假安排",
    description: "免费查询中国法定节假日和调休安排，获取准确的放假信息。",
    type: "website",
    locale: "zh_CN",
  },
  twitter: {
    card: "summary_large_image",
    title: "中国节假日查询",
    description: "查询中国法定节假日及调休安排",
  },
  alternates: {
    canonical: "https://holidays.docflow.top/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
