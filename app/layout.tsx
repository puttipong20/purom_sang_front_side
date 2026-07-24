// app/layout.tsx (นอกสุด)
import type { Metadata } from "next";
import { Kanit, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: "ภูร่มแสง",
  description: "โฮมสเตย์ ม่อนแจ่ม",
};

const kanit = Kanit({
  subsets: ["latin", "thai"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-kanit",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="th"
      className={cn(
        "h-full",
        "antialiased",
        kanit.variable,
        "font-sans",
        geist.variable,
      )}
    >
      {/* ใส่คลาสจัดโครงสร้างให้ยืดเต็มจอเตรียมไว้ให้ Layout ย่อยใช้งาน */}
      <body className="min-h-screen flex flex-col relative">
          {children} {/* 👈 โค้ดของ Layout ย่อยแต่ละกลุ่มจะมาแสดงตรงนี้ */}
      </body>
    </html>
  );
}
