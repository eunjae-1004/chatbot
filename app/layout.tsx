import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "호텔 고객 지원 | 숙박·식사 문의 챗봇",
  description:
    "체크인·체크아웃, 조식, 룸서비스, 부대시설 이용 정보를 빠르게 안내해 드립니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
        />
      </head>
      <body className="min-h-screen font-sans">{children}</body>
    </html>
  );
}
