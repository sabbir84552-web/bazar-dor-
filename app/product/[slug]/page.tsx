import { fetchProducts } from "@/lib/api";
import Link from "next/link";
import { Suspense } from "react";

interface Product {
  _id?: string;
  id?: string | number;
  slug?: string;
  nameBn?: string;
  name?: string;
  price?: number | string;
  today?: number | string;
  unit?: string;
  image?: string;
  change?: { dir: string; pct: number } | string;
  category?: string;
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function ProductContent({ params }: PageProps) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  const response = await fetchProducts();
  const allProducts = Array.isArray(response) ? response : response?.data || [];

  const product = allProducts.find(
    (p: Product) =>
      p._id?.toString() === slug ||
      p.id?.toString() === slug ||
      p.slug === slug,
  );

  if (!product) {
    return (
      <div className="text-center py-20 text-red-500 font-bold text-xl">
        প্রোডাক্টটি পাওয়া যায়নি!
      </div>
    );
  }

  const productName = product.nameBn || product.name || "পণ্য";
  const productPrice = Number(product.today || product.price || 66);

  let isUp = false;
  let isDown = false;
  let changeDisplay = "";

  if (typeof product.change === "object" && product.change !== null) {
    isUp = product.change.dir === "up";
    isDown = product.change.dir === "down";
    changeDisplay = `${product.change.pct}%`;
  } else if (typeof product.change === "string") {
    isUp = product.change.includes("+") || product.change.includes("up");
    isDown = product.change.includes("-") || product.change.includes("down");
    changeDisplay = product.change.replace(/[+-]/g, "");
  }

  // Figma design er sathe match kore market table data
  const marketPrices = [
    {
      market: "মাঠ বাজার",
      division: "ময়মনসিংহ",
      min: productPrice - 7,
      max: productPrice - 1,
      avg: productPrice - 4,
    },
    {
      market: "সদর বাজার",
      division: "রাজশাহী",
      min: productPrice - 6,
      max: productPrice,
      avg: productPrice - 3,
    },
    {
      market: "বাজারহাট",
      division: "খুলনা",
      min: productPrice - 6,
      max: productPrice + 1,
      avg: productPrice - 2.5,
    },
    {
      market: "বাসারহাট বাজার",
      division: "রাজশাহী",
      min: productPrice - 6,
      max: productPrice + 2,
      avg: productPrice - 2,
    },
    {
      market: "চৌর বাজার",
      division: "ময়মনসিংহ",
      min: productPrice - 6,
      max: productPrice + 3,
      avg: productPrice - 1.5,
    },
    {
      market: "আমতলী বাজার",
      division: "চট্টগ্রাম",
      min: productPrice - 5,
      max: productPrice + 3,
      avg: productPrice - 0.5,
    },
    {
      market: "ডবলগেট বাজার",
      division: "খুলনা",
      min: productPrice - 4,
      max: productPrice + 3,
      avg: productPrice - 0.5,
    },
    {
      market: "চৌরাস্তা বাজার",
      division: "সিলেট",
      min: productPrice - 3,
      max: productPrice + 9,
      avg: productPrice + 1,
    },
    {
      market: "গ্রীন মার্কেট, মিরপুর",
      division: "ঢাকা",
      min: productPrice - 3,
      max: productPrice + 9,
      avg: productPrice + 1.5,
    },
    {
      market: "চৌগ্রাম বাজার",
      division: "চট্টগ্রাম",
      min: productPrice - 3,
      max: productPrice + 7,
      avg: productPrice + 2,
    },
    {
      market: "আমবাজার",
      division: "সিলেট",
      min: productPrice - 3,
      max: productPrice + 7,
      avg: productPrice + 2.5,
    },
    {
      market: "কারওয়ান বাজার",
      division: "ঢাকা",
      min: productPrice - 2,
      max: productPrice + 7,
      avg: productPrice + 3,
    },
  ];

  return (
    <>
      {/* Top Summary */}
      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-200 mb-8 flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center text-5xl shrink-0">
            {product.image || "📦"}
          </div>
          <div>
            <div className="flex gap-2 mb-2">
              <span className="text-xs text-gray-500 font-medium">
                হোম &gt; {product.category || "চাল"} &gt; {productName}
              </span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-1">
              {productName}
            </h1>
            <p className="text-gray-500 text-sm">
              প্রতি কেজি · {product.category || "চাল"}
            </p>
            <p className="text-gray-500 text-xs mt-1">
              গতকালের তুলনায় আজ{" "}
              <span
                className={
                  isUp
                    ? "text-red-500 font-medium"
                    : isDown
                      ? "text-green-500 font-medium"
                      : "text-gray-700"
                }
              >
                {isUp ? "বেড়েছে" : isDown ? "কমেছে" : "অপরিবর্তিত"}
              </span>{" "}
              {changeDisplay || "৩.১%"}
            </p>
          </div>
        </div>

        <div className="text-right bg-gray-50 p-6 rounded-2xl border border-gray-100 min-w-[200px]">
          <p className="text-sm text-gray-500 mb-1">আজকের দাম</p>
          <p className="text-4xl font-bold text-gray-900 mb-1">
            {productPrice}
          </p>
          <p className="text-sm text-gray-500">টাকা / কেজি</p>
          {changeDisplay && (
            <p
              className={`text-sm font-medium mt-2 ${isUp ? "text-red-500" : isDown ? "text-green-500" : "text-gray-500"}`}
            >
              {isUp ? "▲" : isDown ? "▼" : "—"} {changeDisplay}
            </p>
          )}
        </div>
      </div>

      {/* Price Summary Cards */}
      <h2 className="text-xl font-bold text-gray-900 mb-4">দামের সারসংক্ষেপ</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
          <p className="text-sm text-gray-500 mb-2">সর্বনিম্ন দাম</p>
          <p className="text-2xl font-bold text-green-600">
            {productPrice - 7}{" "}
            <span className="text-base font-normal text-green-600">টাকা</span>
          </p>
          <p className="text-xs text-gray-400 mt-1">সবচেয়ে কম দামের বাজার</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
          <p className="text-sm text-gray-500 mb-2">সর্বোচ্চ দাম</p>
          <p className="text-2xl font-bold text-red-600">
            {productPrice + 7}{" "}
            <span className="text-base font-normal text-red-600">টাকা</span>
          </p>
          <p className="text-xs text-gray-400 mt-1">সবচেয়ে বেশি দামের বাজার</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
          <p className="text-sm text-gray-500 mb-2">গড় দাম</p>
          <p className="text-2xl font-bold text-gray-900">
            {productPrice} <span className="text-base font-normal">টাকা</span>
          </p>
          <p className="text-xs text-gray-400 mt-1">প্রতি কেজি-এর হিসাবে</p>
        </div>
      </div>

      {/* Marketwise Price Table (Figma Requirement) */}
      <h2 className="text-xl font-bold text-gray-900 mb-4">
        বাজারভিত্তিক আজকের দাম
      </h2>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden mb-10">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-200 text-gray-500 text-sm bg-gray-50/50">
                <th className="py-4 px-6 font-medium">বাজার</th>
                <th className="py-4 px-6 font-medium">বিভাগ</th>
                <th className="py-4 px-6 font-medium">সর্বনিম্ন</th>
                <th className="py-4 px-6 font-medium">সর্বোচ্চ</th>
                <th className="py-4 px-6 font-medium">গড়</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-800 text-sm">
              {marketPrices.map((item, idx) => (
                <tr key={idx} className="hover:bg-gray-50/80 transition">
                  <td className="py-4 px-6 font-medium text-gray-900">
                    {item.market}
                  </td>
                  <td className="py-4 px-6 text-gray-600">{item.division}</td>
                  <td className="py-4 px-6 text-green-600 font-medium">
                    {item.min} টাকা
                  </td>
                  <td className="py-4 px-6 text-red-600 font-medium">
                    {item.max} টাকা
                  </td>
                  <td className="py-4 px-6 font-semibold text-gray-900">
                    {item.avg} টাকা
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default function ProductDetails({ params }: PageProps) {
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
        <ProductContent params={params} />
      </Suspense>
    </div>
  );
}
