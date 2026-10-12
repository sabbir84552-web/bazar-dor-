"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Marquee from "./Marquee";

const Navbar = () => {
  const [banglaDate, setBanglaDate] = useState<string>("");

  useEffect(() => {
    const timer = setTimeout(() => {
      const today = new Date();
      const formatted = today.toLocaleDateString("bn-BD", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      setBanglaDate(formatted);
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  const categories = [
    { name: "চাল", icon: "🍚", slug: "rice" },
    { name: "ডাল", icon: "🍲", slug: "dal" },
    { name: "তেল", icon: "🛢️", slug: "oil" },
    { name: "সবজি", icon: "🥬", slug: "vegetables" },
    { name: "মাছ", icon: "🐟", slug: "fish" },
    { name: "মাংস", icon: "🍗", slug: "meat" },
    { name: "ডিম-দুধ", icon: "🥛", slug: "egg-milk" },
    { name: "মসলা", icon: "🌶️", slug: "spice" },
  ];

  return (
   <header className="bg-[#f8faf9] border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 md:px-8 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-green-700 rounded-xl flex items-center justify-center p-2 shadow-sm">
            <Image
              src="/image/logo-icon.png"
              alt="Bazar Dor Logo"
              width={24}
              height={24}
              priority
            />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 leading-tight">
              বাজার দর
            </h1>
            <p
              className="text-[13px] text-gray-500 mt-0.5 min-h-[18px]"
              suppressHydrationWarning
            >
              {banglaDate}
            </p>
          </div>
        </Link>

        <div className="flex gap-4 items-center">
          <Link
            href="/signin"
            className="text-sm font-semibold text-gray-700 hover:text-green-700 transition"
          >
            সাইন ইন
          </Link>
          <Link
            href="/signup"
            className="text-sm font-semibold bg-[#0f9d58] text-white px-5 py-2.5 rounded-lg hover:bg-green-700 transition shadow-sm"
          >
            সাইন আপ
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8">
        <ul className="flex gap-8 overflow-x-auto py-3 text-sm font-medium text-gray-600 scrollbar-hide">
          {categories.map((cat, index) => (
            <li key={index}>
              <Link
                href={`/category/${cat.slug}`}
                className="flex items-center gap-2 hover:text-green-700 whitespace-nowrap transition"
              >
                <span className="text-lg">{cat.icon}</span> {cat.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <Marquee />
    </header>
  );
};

export default Navbar;
