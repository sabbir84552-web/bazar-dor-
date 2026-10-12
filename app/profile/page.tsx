"use client";

import { useState } from "react";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const [name, setName] = useState("Rezwan Ahmed");
  const [loading, setLoading] = useState(false);

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // BetterAuth এর আপডেট লজিক এখানে বসবে
    setTimeout(() => {
      toast.success("তথ্য সফলভাবে আপডেট হয়েছে!");
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="container mx-auto px-4 md:px-8 py-10 max-w-3xl">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">আমার প্রোফাইল</h1>
        <p className="text-gray-500">
          আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন এবং আপডেট করুন।
        </p>
      </div>

      <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-200 mb-6 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 bg-green-100 text-green-700 rounded-full flex items-center justify-center text-3xl font-bold">
            {name.charAt(0)}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{name}</h2>
            <p className="text-gray-500 mt-1">rezwanahmed@gmail.com</p>
          </div>
        </div>
        <button className="text-red-600 border border-red-200 hover:bg-red-50 px-6 py-2.5 rounded-xl font-medium transition flex items-center gap-2">
          <span>←</span> সাইন আউট
        </button>
      </div>

      <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-6">তথ্য আপডেট</h3>
        <form onSubmit={handleUpdate} className="flex flex-col gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              নাম
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#0f9d58] hover:bg-green-700 text-white font-medium py-3 rounded-xl transition mt-2 flex justify-center items-center"
          >
            {loading ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              "আপডেট করুন"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
