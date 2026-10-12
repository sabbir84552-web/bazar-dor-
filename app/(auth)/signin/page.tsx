"use client";

import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Ekhane BetterAuth er signIn logic boshbe
    setTimeout(() => {
      toast.success("সাইন ইন সফল হয়েছে!");
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">সাইন ইন</h1>
        <p className="text-gray-500 text-sm">
          বিস্তারিত দাম, বাজারের তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
        </p>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 w-full max-w-md">
        <form onSubmit={handleSignIn} className="flex flex-col gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              ইমেইল
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              পাসওয়ার্ড
            </label>
            <input
              type="password"
              placeholder="কমপক্ষে ৮ অক্ষর"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#0f9d58] hover:bg-green-700 text-white font-medium py-2.5 rounded-lg transition mt-2 flex justify-center items-center"
          >
            {loading ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              "সাইন ইন"
            )}
          </button>
        </form>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">অথবা</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button className="flex-1 flex items-center justify-center gap-2 border border-gray-300 py-2.5 rounded-lg hover:bg-gray-50 transition text-sm font-medium text-gray-700">
            <span className="text-red-500 text-lg">G</span> Google দিয়ে চালিয়ে
            যান
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 border border-gray-300 py-2.5 rounded-lg hover:bg-gray-50 transition text-sm font-medium text-gray-700">
            <span className="text-black text-lg">GH</span> GitHub দিয়ে চালিয়ে
            যান
          </button>
        </div>

        <p className="text-center text-sm text-gray-600 mt-8">
          অ্যাকাউন্ট নেই?{" "}
          <Link
            href="/signup"
            className="text-[#0f9d58] font-medium hover:underline"
          >
            সাইন আপ করুন
          </Link>
        </p>
      </div>

      <Link
        href="/"
        className="mt-8 text-sm text-gray-500 hover:text-gray-800 transition"
      >
        ← হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}
