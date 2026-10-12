import Image from 'next/image';
import Link from 'next/link';

// API এর ডেটা টাইপ অনুযায়ী একটি ইন্টারফেস
interface Product {
  id?: string | number;
  _id?: string;
  name: string;
  price: number | string;
  unit?: string;
  image?: string;
  change?: string;
  status?: 'up' | 'down' | 'stable';
}

const ProductCard = ({ product }: { product: Product }) => {
  // দাম বাড়া বা কমার কালার লজিক
  const isUp = product.status === 'up' || (product.change && product.change.includes('+'));
  const isDown = product.status === 'down' || (product.change && product.change.includes('-'));
  
  return (
    <Link href={`/product/${product._id || product.id || '1'}`} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition block">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center p-2">
          {/* API-তে ইমেজ থাকলে দেখাবে, না থাকলে ডিফল্ট ইমোজি */}
          {product.image ? (
            <Image src={product.image} alt={product.name} width={32} height={32} className="object-contain" />
          ) : (
            <span className="text-2xl">📦</span>
          )}
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-800">{product.name}</h3>
          <p className="text-xs text-gray-500">{product.unit || 'প্রতি কেজি'}</p>
        </div>
      </div>

      <div className="flex justify-between items-end mt-4">
        <div>
          <p className="text-[11px] text-gray-400 mb-0.5">আজকের দাম</p>
          <p className="text-xl font-bold text-gray-900">
            {product.price} <span className="text-sm font-normal">টাকা</span>
          </p>
        </div>
        
        {product.change && (
          <div className={`text-sm font-semibold flex items-center gap-1 ${isUp ? 'text-red-500' : isDown ? 'text-green-500' : 'text-gray-500'}`}>
            {isUp ? '▲' : isDown ? '▼' : '—'} {product.change.replace(/[+-]/g, '')}
          </div>
        )}
      </div>
    </Link>
  );
};

export default ProductCard;