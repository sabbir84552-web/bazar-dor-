import { fetchProducts } from "@/lib/api";
import Link from "next/link";
import { Suspense } from "react";

interface Product {
  _id?: string;
  id?: string | number;
  name: string;
  price: number | string;
  unit?: string;
  image?: string;
  change?: string;
  category?: string;
}

async function ProductData({ slug }: { slug: string }) {
  const response = await fetchProducts();
  const allProducts = Array.isArray(response) ? response : response?.data || [];

  // URL er id (slug) onujayi nirdishto product khuje ber kora
  const product = allProducts.find(
    (p: Product) => p._id?.toString() === slug || p.id?.toString() === slug,
  );

  if (!product) {
    return (
      <div className="text-center py-20 text-red-500 font-bold text-xl">
        প্রোডাক্টটি পাওয়া যায়নি!
      </div>
    );
  }

  const isUp = product.change?.includes("+");
  const isDown = product.change?.includes("-");

  return (
    <>
      {/* Top Summary */}
      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-200 mb-8 flex flex-col md:flex-row gap-6 items-start md:items-center">
        <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center text-5xl shrink-0">
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              className="w-16 h-16 object-contain"
            />
          ) : (
            "📦"
          )}
        </div>
        <div className="flex-1">
          <div className="flex gap-2 mb-2">
            <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full font-medium">
              {product.category || "পণ্য"}
            </span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {product.name}
          </h1>
          <p className="text-gray-500 text-sm">
            গতকালের তুলনায় আজ দাম{" "}
            {isUp ? (
              <span className="text-red-500 font-medium">বেড়েছে</span>
            ) : isDown ? (
              <span className="text-green-500 font-medium">কমেছে</span>
            ) : (
              "অপরিবর্তিত"
            )}
          </p>
        </div>
        <div className="text-right bg-gray-50 p-6 rounded-2xl border border-gray-100 min-w-[180px]">
          <p className="text-sm text-gray-500 mb-1">আজকের দাম</p>
          <p className="text-4xl font-bold text-gray-900 mb-1">
            {product.price}
          </p>
          <p className="text-sm text-gray-500">
            {product.unit || "টাকা / কেজি"}
          </p>
          {product.change && (
            <p
              className={`text-sm font-medium mt-2 ${isUp ? "text-red-500" : isDown ? "text-green-500" : "text-gray-500"}`}
            >
              {isUp ? "▲" : isDown ? "▼" : "—"}{" "}
              {product.change.replace(/[+-]/g, "")}
            </p>
          )}
        </div>
      </div>

      {/* Price Summary */}
      <h2 className="text-xl font-bold text-gray-900 mb-4">দামের সারসংক্ষেপ</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
          <p className="text-sm text-gray-500 mb-2">সর্বনিম্ন দাম</p>
          <p className="text-2xl font-bold text-green-600">
            {(Number(product.price) * 0.9).toFixed(0)}{" "}
            <span className="text-base font-normal text-green-600">টাকা</span>
          </p>
          <p className="text-xs text-gray-400 mt-1">সবচেয়ে কম দামের বাজার</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
          <p className="text-sm text-gray-500 mb-2">সর্বোচ্চ দাম</p>
          <p className="text-2xl font-bold text-red-600">
            {(Number(product.price) * 1.1).toFixed(0)}{" "}
            <span className="text-base font-normal text-red-600">টাকা</span>
          </p>
          <p className="text-xs text-gray-400 mt-1">সবচেয়ে বেশি দামের বাজার</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
          <p className="text-sm text-gray-500 mb-2">গড় দাম</p>
          <p className="text-2xl font-bold text-gray-900">
            {product.price} <span className="text-base font-normal">টাকা</span>
          </p>
          <p className="text-xs text-gray-400 mt-1">প্রতি কেজি-এর হিসাবে</p>
        </div>
      </div>
    </>
  );
}

export default async function ProductDetails({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <div className="container mx-auto px-4 md:px-8 py-10 max-w-5xl">
      <div className="mb-6">
        <Link
          href="/"
          className="text-sm text-gray-500 hover:text-green-600 font-medium"
        >
          ← হোম পেজে ফিরে যান
        </Link>
      </div>

      <Suspense
        fallback={
          <div className="text-center py-20 text-gray-500">
            প্রোডাক্টের বিস্তারিত লোড হচ্ছে...
          </div>
        }
      >
        <ProductData slug={slug} />
      </Suspense>
    </div>
  );
}
