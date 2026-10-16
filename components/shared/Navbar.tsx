"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function Navbar() {
  const router = useRouter();
  const [currentDate, setCurrentDate] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Better Auth session hook
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  // বাইরে ক্লিক করলে ড্রপডাউন বন্ধ করার লজিক
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  // Dynamic Date Logic
  useEffect(() => {
    const timer = setTimeout(() => {
      const date = new Date();
      const days = [
        "রবিবার",
        "সোমবার",
        "মঙ্গলবার",
        "বুধবার",
        "বৃহস্পতিবার",
        "শুক্রবার",
        "শনিবার",
      ];
      const months = [
        "জানুয়ারি",
        "ফেব্রুয়ারি",
        "মার্চ",
        "এপ্রিল",
        "মে",
        "জুন",
        "জুলাই",
        "আগস্ট",
        "সেপ্টেম্বর",
        "অক্টোবর",
        "নভেম্বর",
        "ডিসেম্বর",
      ];

      const dayName = days[date.getDay()];
      const monthName = months[date.getMonth()];

      const toBengaliNumber = (num: number) => {
        const banglaNumbers = [
          "০",
          "১",
          "২",
          "৩",
          "৪",
          "৫",
          "৬",
          "৭",
          "৮",
          "৯",
        ];
        return num
          .toString()
          .split("")
          .map((n) => banglaNumbers[parseInt(n)])
          .join("");
      };

      const dayNumber = toBengaliNumber(date.getDate());
      const yearNumber = toBengaliNumber(date.getFullYear());

      setCurrentDate(`${dayName}, ${dayNumber} ${monthName}, ${yearNumber}`);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const handleLogout = async () => {
    await authClient.signOut();
    setIsDropdownOpen(false);
    router.push("/");
  };

  const initial = user?.name ? user.name.charAt(0).toUpperCase() : "U";
  const shortName = user?.name ? user.name.split(" ")[0] : "User";

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-40 shadow-sm">
      <div className="container mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-[#0f9d58] rounded-xl flex items-center justify-center text-white text-xl shadow-sm">
              🛒
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 leading-none">
                বাজার দর
              </h1>
              <p className="text-[10px] sm:text-xs text-gray-500 mt-1">
                {currentDate || "লোড হচ্ছে..."}
              </p>
            </div>
          </Link>
        </div>

        <div>
          {isPending ? (
            <div className="w-20 h-8 bg-gray-100 animate-pulse rounded-lg"></div>
          ) : user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 hover:bg-gray-50 px-2 py-1.5 rounded-lg transition border-none bg-transparent cursor-pointer"
              >
                <div className="w-9 h-9 rounded-full overflow-hidden bg-green-100 border border-gray-200 flex items-center justify-center shrink-0 relative">
                  {user.image ? (
                    <Image
                      src={user.image}
                      alt={user.name || "User"}
                      fill
                      sizes="36px"
                      className="object-cover"
                    />
                  ) : (
                    <span className="text-green-700 font-bold text-sm">
                      {initial}
                    </span>
                  )}
                </div>
                <span className="text-sm font-medium text-gray-700 hidden sm:block">
                  {shortName} ▾
                </span>
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50">
                  <div className="px-5 py-3 border-b border-gray-50 bg-gray-50/50 mx-2 rounded-xl mb-2">
                    <p className="text-sm font-bold text-gray-900 truncate">
                      {user.name}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5 truncate">
                      {user.email}
                    </p>
                  </div>

                  <div className="flex flex-col gap-1 px-2">
                    <Link
                      href="/profile"
                      onClick={() => setIsDropdownOpen(false)}
                      className="px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700 rounded-lg flex items-center gap-3 transition"
                    >
                      <span className="text-lg">👤</span> আমার প্রোফাইল
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg flex items-center gap-3 transition border-none bg-transparent cursor-pointer"
                    >
                      <span className="text-lg">↪</span> সাইন আউট
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2 sm:gap-4">
              <Link
                href="/signin"
                className="text-sm font-medium text-gray-600 hover:text-[#0f9d58] transition"
              >
                সাইন ইন
              </Link>
              <Link
                href="/signup"
                className="bg-[#0f9d58] hover:bg-green-700 text-white px-4 sm:px-6 py-2 sm:py-2.5 text-sm font-medium rounded-lg transition shadow-sm"
              >
                সাইন আপ
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
