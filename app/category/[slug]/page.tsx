import { fetchProducts } from "@/lib/api";
import ProductCard from "@/components/ui/ProductCard";
import { Suspense } from "react";
import Link from "next/link";

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
  searchParams: Promise<{ sort?: string }>;
}

async function CategoryData({ params, searchParams }: PageProps) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  
  const slug = resolvedParams.slug.toLowerCase();
  const sort = resolvedSearchParams.sort;
  
  const response = await fetchProducts();
  const allProducts = Array.isArray(response) ? response : (response?.data || []);

  // স্মার্ট ক্যাটাগরি ফিল্টারিং লজিক (০ আসবে না, আর উল্টাপাল্টাও হবে না)
  const categoryProducts = allProducts.filter((p: Product) => {
    const pCat = (p.category || '').toLowerCase();
    const pName = (p.nameBn || p.name || '').toLowerCase();

    // API-এর ক্যাটাগরি সরাসরি মিললে
    if (pCat && (pCat === slug || pCat.includes(slug))) return true;

    // নামের উপর ভিত্তি করে নিখুঁত ফিল্টার
    if (slug === 'rice') return pName.includes('চাল');
    if (slug === 'dal') return pName.includes('ডাল') || pName.includes('ছোলা');
    
    // তেলের ক্ষেত্রে তেলাপিয়া বাদ!
    if (slug === 'oil') return pName.includes('তেল') && !pName.includes('তেলাপিয়া');
    
    if (slug === 'vegetables') return pName.includes('সবজি') || pName.includes('আলু') || pName.includes('পেঁয়াজ') || pName.includes('বেগুন') || pName.includes('ঢেঁড়স') || pName.includes('কাঁচামরিচ') || pName.includes('আদা');
    
    // তেলাপিয়া এখন শুধুই মাছের ক্যাটাগরিতে
    if (slug === 'fish') return pName.includes('মাছ') || pName.includes('তেলাপিয়া') || pName.includes('রুই') || pName.includes('ইলিশ') || pName.includes('কাতলা') || pName.includes('চিংড়ি');
    
    // মাংসের ক্যাটাগরি থেকে মাখন সরানো হলো
    if (slug === 'meat') return pName.includes('মাংস') || pName.includes('মুরগি') || pName.includes('গরু') || pName.includes('খাসি') || pName.includes('হাঁস');
    
    // মাখন এখন ডিম-দুধের (ডেইরি) ক্যাটাগরিতে
    if (slug === 'egg-milk') return pName.includes('ডিম') || pName.includes('দুধ') || pName.includes('মাখন');
    
    if (slug === 'spice') return pName.includes('মসলা') || pName.includes('মরিচ') || pName.includes('রসুন') || pName.includes('হলুদ') || pName.includes('জিরা');
    
    return false;
  });

  // Sorting logic
  if (sort === 'asc') {
    categoryProducts.sort((a: Product, b: Product) => Number(a.today || a.price || 0) - Number(b.today || b.price || 0));
  } else if (sort === 'desc') {
    categoryProducts.sort((a: Product, b: Product) => Number(b.today || b.price || 0) - Number(a.today || a.price || 0));
  }

  const categoryNames: Record<string, string> = {
    rice: 'চাল', dal: 'ডাল', oil: 'তেল', vegetables: 'সবজি', fish: 'মাছ', meat: 'মাংস', 'egg-milk': 'ডিম-দুধ', spice: 'মসলা'
  };
  const title = categoryNames[slug] || 'পণ্য';

  return (
    <>
      <div className="bg-white rounded-2xl p-8 mb-8 shadow-sm border border-gray-100 flex items-center gap-4">
        <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center text-3xl">📦</div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
          <p className="text-gray-500 mt-1">মোট {categoryProducts.length}টি পণ্যের আজকের দাম ও পরিবর্তন</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <p className="text-gray-600 font-medium">মোট {categoryProducts.length}টি পণ্য দেখানো হচ্ছে</p>
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-gray-500 text-sm">সাজান:</span>
          <Link 
            href={`/category/${slug}`}
            className={`px-3 py-1.5 text-xs rounded-lg font-medium transition ${!sort ? 'bg-[#0f9d58] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
          >
            ডিফল্ট
          </Link>
          <Link 
            href={`/category/${slug}?sort=asc`}
            className={`px-3 py-1.5 text-xs rounded-lg font-medium transition ${sort === 'asc' ? 'bg-[#0f9d58] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
          >
            দাম: কম থেকে বেশি
          </Link>
          <Link 
            href={`/category/${slug}?sort=desc`}
            className={`px-3 py-1.5 text-xs rounded-lg font-medium transition ${sort === 'desc' ? 'bg-[#0f9d58] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
          >
            দাম: বেশি থেকে কম
          </Link>
        </div>
      </div>

      {categoryProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoryProducts.map((product: Product, idx: number) => (
            <ProductCard key={idx} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
          <p className="text-gray-500 text-lg">এই ক্যাটাগরিতে বর্তমানে কোনো পণ্য পাওয়া যায়নি।</p>
        </div>
      )}
    </>
  );
}

export default function CategoryPage({ params, searchParams }: PageProps) {
  return (
    <div className="container mx-auto px-4 md:px-8 py-10">
      <div className="mb-6">
        <Link href="/" className="text-sm text-gray-500 hover:text-green-600 font-medium">
          ← হোম পেজে ফিরে যান
        </Link>
      </div>
      <Suspense fallback={<div className="text-center py-20 text-gray-500">ক্যাটাগরি ডেটা লোড হচ্ছে...</div>}>
        <CategoryData params={params} searchParams={searchParams} />
      </Suspense>
    </div>
  );
}