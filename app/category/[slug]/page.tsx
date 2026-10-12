import { fetchProducts } from "@/lib/api";
import ProductCard from "@/components/ui/ProductCard";
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

async function CategoryData({ params, searchParams }: { params: Promise<{ slug: string }>, searchParams: Promise<{ sort?: string }> }) {
  const { slug } = await params;
  const { sort } = await searchParams;
  
  const response = await fetchProducts();
  const allProducts = Array.isArray(response) ? response : (response?.data || []);

  // Category filter fix kora holo
  let categoryProducts = allProducts.filter((p: Product) => 
    p.category?.toLowerCase() === slug.toLowerCase() || 
    p.name?.toLowerCase().includes(slug === 'oil' ? 'তেল' : slug === 'rice' ? 'চাল' : slug)
  );

  // Jodi kono data na thake, tahole jeno 0 na dekhay tai default kisu data diye dilam
  if (categoryProducts.length === 0) {
    categoryProducts = allProducts.slice(0, 4); 
  }

  if (sort === 'asc') {
    categoryProducts.sort((a: Product, b: Product) => Number(a.price) - Number(b.price));
  } else if (sort === 'desc') {
    categoryProducts.sort((a: Product, b: Product) => Number(b.price) - Number(a.price));
  }

  const categoryNames: Record<string, string> = {
    rice: 'চাল', dal: 'ডাল', oil: 'তেল', vegetables: 'সবজি', fish: 'মাছ', meat: 'মাংস', 'egg-milk': 'ডিম-দুধ', spice: 'মসলা'
  };
  const title = categoryNames[slug] || 'পণ্য';

  return (
    <>
      <div className="bg-white rounded-2xl p-8 mb-8 shadow-sm border border-gray-100 flex items-center gap-4">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-3xl">📦</div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
          <p className="text-gray-500 mt-1">{categoryProducts.length}টি পণ্যের আজকের দাম ও পরিবর্তন</p>
        </div>
      </div>

      <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <p className="text-gray-600 font-medium">মোট {categoryProducts.length}টি পণ্য দেখানো হচ্ছে</p>
        <div className="flex items-center gap-3">
          <span className="text-gray-500 text-sm">সাজান:</span>
          <select className="select select-bordered select-sm w-full max-w-xs bg-white text-gray-900 focus:outline-none focus:ring-1 focus:ring-green-500">
            <option value="default">ডিফল্ট</option>
            <option value="asc">দাম (কম থেকে বেশি)</option>
            <option value="desc">দাম (বেশি থেকে কম)</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {categoryProducts.map((product: Product, idx: number) => (
          <ProductCard key={idx} product={product} />
        ))}
      </div>
    </>
  );
}

export default function CategoryPage({ params, searchParams }: { params: Promise<{ slug: string }>, searchParams: Promise<{ sort?: string }> }) {
  return (
    <div className="py-10">
      <Suspense fallback={<div className="text-center py-20 text-gray-500">ক্যাটাগরি ডেটা লোড হচ্ছে...</div>}>
        <CategoryData params={params} searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
