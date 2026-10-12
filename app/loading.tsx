export default function Loading() {
  return (
    <div className="py-20 flex flex-col items-center justify-center min-h-[50vh]">
      <span className="loading loading-spinner loading-lg text-[#0f9d58]"></span>
      <p className="mt-4 text-gray-500 font-medium">
        ডেটা লোড হচ্ছে, অনুগ্রহ করে অপেক্ষা করুন...
      </p>
    </div>
  );
}
