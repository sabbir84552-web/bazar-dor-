"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const [customName, setCustomName] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [message, setMessage] = useState("");

  const name = customName !== null ? customName : session?.user?.name || "";

  const handleLogout = async () => {
    await authClient.signOut();
    router.push("/");
  };

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name.trim()) return;

    setIsUpdating(true);
    setMessage("");

    try {
      await authClient.updateUser({
        name: name,
      });
      setMessage("নাম সফলভাবে আপডেট করা হয়েছে!");
    } catch {
      setMessage("আপডেট করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setIsUpdating(false);
    }
  };

  if (isPending) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-gray-500">
        লোড হচ্ছে...
      </div>
    );
  }

  if (!session?.user) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 text-gray-600">
        <p>প্রোফাইল দেখতে আপনাকে লগইন করতে হবে।</p>
        <button
          onClick={() => router.push("/signin")}
          className="bg-[#0f9d58] text-white px-5 py-2 rounded-lg font-medium hover:bg-green-700 transition cursor-pointer border-none"
        >
          লগইন করুন
        </button>
      </div>
    );
  }

  const user = session.user;
  const initial = user.name ? user.name.charAt(0).toUpperCase() : "U";

  return (
    <div className="min-h-[calc(100vh-140px)] bg-[#f4f7f4] py-12 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* টাইটেল হেডার */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            আমার প্রোফাইল
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
          </p>
        </div>

        {/* কার্ড ১: ইউজার তথ্য ও সাইন আউট বাটন */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-gray-100 border border-gray-200 flex items-center justify-center shrink-0">
              {user.image ? (
                <Image
                  src={user.image}
                  alt={user.name || "User"}
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              ) : (
                <span className="text-green-700 font-bold text-2xl">
                  {initial}
                </span>
              )}
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900 leading-snug">
                {user.name || "নাম পাওয়া যায়নি"}
              </h2>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-[#e05252] border border-[#f5b8b8] rounded-xl hover:bg-red-50 transition w-full sm:w-auto bg-transparent cursor-pointer"
          >
            <span>↩</span>
            <span>সাইন আউট</span>
          </button>
        </div>

        {/* কার্ড ২: নাম পরিবর্তন ফর্ম */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h3 className="text-base font-bold text-gray-900 mb-5">তথ্য</h3>

          <form onSubmit={handleUpdate} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-xs font-medium text-gray-600 mb-2"
              >
                নাম
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setCustomName(e.target.value)}
                placeholder="আপনার নাম লিখুন"
                className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl outline-none focus:border-[#0f9d58] focus:ring-1 focus:ring-[#0f9d58] transition bg-white"
              />
            </div>

            {message && (
              <p className="text-xs text-green-700 font-medium">{message}</p>
            )}

            <button
              type="submit"
              disabled={isUpdating}
              className="w-full bg-[#0f9d58] hover:bg-green-700 disabled:opacity-60 text-white font-medium py-3 rounded-xl text-sm transition cursor-pointer border-none shadow-sm"
            >
              {isUpdating ? "আপডেট হচ্ছে..." : "আপডেট"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
