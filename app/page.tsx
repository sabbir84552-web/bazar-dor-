import Image from "next/image";
import { fetchProducts } from "@/lib/api";
import ProductCard from "@/components/ui/ProductCard";
import { Suspense } from "react"; // Suspense import kora holo

interface Product {
  _id?: string;
  id?: string | number;
  name: string;
  price: number | string;
  unit?: string;
  image?: string;
  change?: string;
  status?: "up" | "down" | "stable";
  category?: string;
}

// Data fetch korar jonno alada ekta async component banano holo
async function ProductList() {
  const response = await fetchProducts();
  const products = Array.isArray(response) ? response : response?.data || [];

  const priceUpProducts = products.slice(0, 4);
  const priceDownProducts = products.slice(4, 8);
  const allProducts = products;

  return (
    <>
      {/* aaja dam bereche section */}
      {priceUpProducts.length > 0 && (
        <section className="mb-10">
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2 mb-6">
            <span className="text-red-500 text-sm">▲</span> আজ দাম বেড়েছে
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {priceUpProducts.map((product: Product, idx: number) => (
              <ProductCard
                key={idx}
                product={{
                  ...product,
                  status: "up",
                  change: product.change || "২.৫%",
                }}
              />
            ))}
          </div>
        </section>
      )}

      {/* aaj dam komeche section */}
      {priceDownProducts.length > 0 && (
        <section className="mb-12">
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2 mb-6">
            <span className="text-green-500 text-sm">▼</span> আজ দাম কমেছে
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {priceDownProducts.map((product: Product, idx: number) => (
              <ProductCard
                key={idx}
                product={{
                  ...product,
                  status: "down",
                  change: product.change || "১.২%",
                }}
              />
            ))}
          </div>
        </section>
      )}

      {/* shob ponno section */}
      <section id="all-products">
        <h2 className="text-xl font-bold text-gray-800 mb-6">সব পণ্য</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {allProducts.length > 0 ? (
            allProducts.map((product: Product, idx: number) => (
              <ProductCard key={idx} product={product} />
            ))
          ) : (
            <p className="text-gray-500">
              কোনো প্রোডাক্ট পাওয়া যায়নি। API চেক করুন।
            </p>
          )}
        </div>
      </section>
    </>
  );
}

// Eta amader main Home component
export default function Home() {
  return (
    <div className="py-10">
      {/* Hero Section (Static thakbe) */}
      <section className="bg-white rounded-2xl p-8 mb-12 shadow-sm border border-gray-100 flex flex-col md:flex-row items-center justify-between">
        <div className="max-w-xl">
          <span className="inline-block px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full mb-4">
            আজকের বাজার দর
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
            আজকের বাজারের দাম এক নজরে
          </h1>
          <p className="text-gray-600 mb-8 leading-relaxed">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
            বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
          </p>
          <a
            href="#all-products"
            className="inline-block bg-[#0f9d58] hover:bg-green-700 text-white px-8 py-3 rounded-lg font-medium transition shadow-sm"
          >
            সব পণ্য দেখুন
          </a>
        </div>
        <div className="hidden md:block">
          {/* Image er warning ta fixed */}
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

      {/* Ekhane Suspense use kora hoyeche jate Next.js kono error na dey */}
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
  );
}
