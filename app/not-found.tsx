import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <h2 className="text-3xl font-bold text-red-600 mb-4">
        ৪০৪ - পেজটি পাওয়া যায়নি!
      </h2>
      <p className="text-gray-600 mb-6">
        আপনি যে পেজটি খুঁজছেন তা সম্ভবত মুছে ফেলা হয়েছে বা লিংকটি ভুল।
      </p>
      <Link
        href="/"
        className="btn bg-[#0f9d58] hover:bg-green-700 text-white border-none px-6"
      >
        হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}
