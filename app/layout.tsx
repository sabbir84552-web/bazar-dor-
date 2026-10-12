import type { Metadata } from "next";
import { Noto_Sans_Bengali } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { Toaster } from "react-hot-toast"; // Toast import kora holo

const notoSansBengali = Noto_Sans_Bengali({ subsets: ["bengali"] });

export const metadata: Metadata = {
  title: "বাজার দর - Bazar Dor",
  description: "প্রয়োজনীয় পণ্যের দাম এক নজরে",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bn">
      <body
        className={`${notoSansBengali.className} bg-[#f4f6f5] text-gray-900`}
      >
        <Navbar />
        <main className="min-h-[calc(100vh-250px)]">{children}</main>
        <Footer />
        {/* Shob page e jate toast message kaj kore tai ekhane dewa holo */}
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
