"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<{ name: string; email: string } | null>(
    null,
  );
  const [updateName, setUpdateName] = useState("");
  // Hydration mismatch এড়াতে isHydrated স্টেট ব্যবহার করা হলো
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // আলাদা ফাংশন ব্যবহার করে ডেটা লোড করা হলো (এতে ESLint ওয়ার্নিং দেবে না)
    const loadProfileData = () => {
      const storedUser = localStorage.getItem("bazardor_user");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setUpdateName(parsedUser.name);
      } else {
        router.push("/signin");
      }
      setIsHydrated(true);
    };

    loadProfileData();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("bazardor_user");
    window.dispatchEvent(new Event("storage"));
    router.push("/");
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (user && updateName.trim() !== "") {
      const updatedUser = { ...user, name: updateName };
      localStorage.setItem("bazardor_user", JSON.stringify(updatedUser));
      setUser(updatedUser);
      window.dispatchEvent(new Event("storage"));
      alert("প্রোফাইল আপডেট করা হয়েছে!");
    }
  };

  if (!isHydrated || !user) {
    return <div className="text-center py-20 text-gray-500">লোড হচ্ছে...</div>;
  }

  const initial = user.name ? user.name.charAt(0).toUpperCase() : "U";

  return (
    <div className="container mx-auto px-4 md:px-8 py-10 max-w-3xl">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">আমার প্রোফাইল</h1>
        <p className="text-gray-500">
          আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন এবং আপডেট করুন।
        </p>
      </div>

      <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 mb-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-green-100 text-green-700 text-2xl font-bold flex items-center justify-center">
            {initial}
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
            <p className="text-gray-500">{user.email}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="px-6 py-2 border border-red-200 text-red-600 hover:bg-red-50 rounded-lg font-medium transition flex items-center gap-2"
        >
          <span className="text-lg">↪</span> সাইন আউট
        </button>
      </div>

      <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
        <h3 className="text-lg font-bold text-gray-900 mb-6">তথ্য আপডেট</h3>

        <form onSubmit={handleUpdate} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              নাম
            </label>
            <input
              type="text"
              value={updateName}
              onChange={(e) => setUpdateName(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#0f9d58] hover:bg-green-700 text-white font-medium py-3 rounded-lg transition shadow-sm mt-2"
          >
            আপডেট করুন
          </button>
        </form>
      </div>
    </div>
  );
}
