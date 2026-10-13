import Image from "next/image";
import Link from "next/link";
import { fetchProducts } from "@/lib/api";
import ProductCard from "@/components/ui/ProductCard";
import { Suspense } from "react";
import Marquee from "@/components/shared/Marquee";
import { connection } from "next/server"; 

interface Product {
  _id?: string;
  id?: string | number;
  name: string;
  price: number | string;
  unit?: string;
  image?: string;
  change?: { dir: string; pct: number } | string;
  status?: "up" | "down" | "stable";
  category?: string;
}

async function ProductList() {
  const response = await fetchProducts();
  const products = Array.isArray(response) ? response : response?.data || [];

  // ফিগমা ডিজাইন অনুযায়ী ৩টি করে পণ্য দেখানো হচ্ছে
  const priceUpProducts = products.slice(0, 3);
  const priceDownProducts = products.slice(3, 6);
  const allProducts = products;

  return (
    <>
      {/* আজ দাম বেড়েছে section */}
      {priceUpProducts.length > 0 && (
        <section className="mb-10">
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2 mb-6">
            <span className="text-red-500 text-sm">▲</span> আজ দাম বেড়েছে
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {priceUpProducts.map((product: Product, idx: number) => (
              <ProductCard
                key={idx}
                product={{
                  ...product,
                  status: "up",
                }}
              />
            ))}
          </div>
        </section>
      )}

      {/* আজ দাম কমেছে section */}
      {priceDownProducts.length > 0 && (
        <section className="mb-12">
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2 mb-6">
            <span className="text-green-500 text-sm">▼</span> আজ দাম কমেছে
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {priceDownProducts.map((product: Product, idx: number) => (
              <ProductCard
                key={idx}
                product={{
                  ...product,
                  status: "down",
                }}
              />
            ))}
          </div>
        </section>
      )}

      {/* সব পণ্য section */}
      <section id="all-products">
        <h2 className="text-xl font-bold text-gray-800 mb-6">সব পণ্য</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allProducts.length > 0 ? (
            allProducts.map((product: Product, idx: number) => (
              <ProductCard key={idx} product={product} />
            ))
          ) : (
            <p className="text-gray-500">
              কোনো প্রোডাক্ট পাওয়া যায়নি। API চেক করুন।
            </p>
          )}
        </div>
      </section>
    </>
  );
}

export default async function Home() {
  await connection();

  const date = new Date();
  const days = ['রবিবার', 'সোমবার', 'মঙ্গলবার', 'বুধবার', 'বৃহস্পতিবার', 'শুক্রবার', 'শনিবার'];
  const months = ['জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন', 'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'];
  
  const dayName = days[date.getDay()];
  const monthName = months[date.getMonth()];
  
  const toBengaliNumber = (num: number) => {
    const banglaNumbers = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
    return num.toString().split('').map(n => banglaNumbers[parseInt(n)]).join('');
  };

  const dayNumber = toBengaliNumber(date.getDate());
  const yearNumber = toBengaliNumber(date.getFullYear());

  const currentDate = `${dayName}, ${dayNumber} ${monthName}, ${yearNumber}`;

  return (
    <main>
      {/* ১. Category Navigation Bar (একদম আগের মতো বাংলায় ফিরিয়ে আনা হয়েছে) */}
      <div className="bg-white border-b border-gray-100 overflow-x-auto">
        <div className="container mx-auto px-4 md:px-8">
         <div className="flex items-center gap-6 md:gap-8 py-3 text-sm font-medium text-gray-700 min-w-max">
  <Link href="/category/চাল" className="flex items-center gap-2 hover:text-[#0f9d58] transition"><span>🍚</span> চাল</Link>
  <Link href="/category/ডাল" className="flex items-center gap-2 hover:text-[#0f9d58] transition"><span>🧆</span> ডাল</Link>
  <Link href="/category/তেল" className="flex items-center gap-2 hover:text-[#0f9d58] transition"><span>🛢️</span> তেল</Link>
  <Link href="/category/সবজি" className="flex items-center gap-2 hover:text-[#0f9d58] transition"><span>🥬</span> সবজি</Link>
  <Link href="/category/মাছ" className="flex items-center gap-2 hover:text-[#0f9d58] transition"><span>🐟</span> মাছ</Link>
  <Link href="/category/মাংস" className="flex items-center gap-2 hover:text-[#0f9d58] transition"><span>🍗</span> মাংস</Link>
  <Link href="/category/ডিম-দুধ" className="flex items-center gap-2 hover:text-[#0f9d58] transition"><span>🥛</span> ডিম-দুধ</Link>
  <Link href="/category/মসলা" className="flex items-center gap-2 hover:text-[#0f9d58] transition"><span>🌶️</span> মসলা</Link>
</div>
        </div>
      </div>

      <Marquee /> 

      <div className="container mx-auto px-4 md:px-8 py-10">
        <section className="bg-white rounded-2xl p-8 mb-12 shadow-sm border border-gray-100 flex flex-col md:flex-row items-center justify-between">
          <div className="max-w-xl">
            <span 
              suppressHydrationWarning 
              className="inline-block px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full mb-4"
            >
              {currentDate}
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
              আজকের বাজারের দাম এক নজরে
            </h1>
            <p className="text-gray-600 mb-8 leading-relaxed">
              চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
              বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
            </p>
            <a
              href="#all-products"
              className="inline-block bg-[#0f9d58] hover:bg-green-700 text-white px-8 py-3 rounded-lg font-medium transition shadow-sm"
            >
              সব পণ্য দেখুন
            </a>
          </div>
          <div className="hidden md:block">
            <Image
              src="/image/bazar-hero.png"
              alt="Bazar Hero"
              width={250}
              height={250}
              className="w-auto h-auto"
              priority
            />
          </div>
        </section>

        <Suspense
          fallback={
            <div className="text-center py-10 text-green-600 text-lg font-medium animate-pulse">
              লোড হচ্ছে...
            </div>
          }
        >
          <ProductList />
        </Suspense>
      </div>
    </main>
  );
}