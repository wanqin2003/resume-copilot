import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Resume Copilot - AI 智能简历定制助手",
  description:
    "基于大模型的个人职业生涯管理与智能投递助理。本地存储，隐私优先。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className={inter.className}>
        <div className="flex h-screen overflow-hidden">
          <Sidebar />
          <main className="flex-1 overflow-y-auto bg-muted/30 p-8">
            <div className="mx-auto max-w-6xl">{children}</div>
          </main>
        </div>
      </body>
    </html>
  );
}
