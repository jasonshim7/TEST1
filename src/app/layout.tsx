import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "리드 수집",
  description: "이름, 이메일, 전화번호를 입력해주세요.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
