import Image from 'next/image';
import Link from 'next/link';

interface Product {
  id?: string | number;
  _id?: string;
  slug?: string;
  nameBn?: string;
  name?: string;
  price?: number | string;
  today?: number | string;
  unit?: string;
  image?: string;
  change?: { dir: string; pct: number } | string;
  status?: 'up' | 'down' | 'stable';
}

const ProductCard = ({ product }: { product: Product }) => {
  const productName = product.nameBn || product.name || 'পণ্য';
  const productPrice = product.today || product.price || 0;

  let isUp = product.status === 'up';
  let isDown = product.status === 'down';
  let changeDisplay = '';

  if (typeof product.change === 'object' && product.change !== null) {
    isUp = product.change.dir === 'up';
    isDown = product.change.dir === 'down';
    changeDisplay = `${product.change.pct}%`;
  } else if (typeof product.change === 'string') {
    isUp = product.change.includes('+') || product.change.includes('up');
    isDown = product.change.includes('-') || product.change.includes('down');
    changeDisplay = product.change.replace(/[+-]/g, '');
  }
  
  return (
    <Link 
      href={`/product/${product._id || product.id || '1'}`} 
      className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition block w-full max-w-sm mx-auto sm:max-w-none"
    >
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center p-2 text-2xl shrink-0">
          {product.image || '📦'}
        </div>
        <div className="overflow-hidden">
          <h3 className="text-lg font-bold text-gray-800 truncate">{productName}</h3>
          <p className="text-xs text-gray-500">প্রতি {product.unit || 'কেজি'}</p>
        </div>
      </div>

      <div className="flex justify-between items-end mt-4">
        <div>
          <p className="text-[11px] text-gray-400 mb-0.5">আজকের দাম</p>
          <p className="text-xl font-bold text-gray-900">
            {productPrice} <span className="text-sm font-normal">টাকা</span>
          </p>
        </div>
        
        {changeDisplay && (
          <div className={`text-sm font-semibold flex items-center gap-1 shrink-0 ${isUp ? 'text-red-500' : isDown ? 'text-green-500' : 'text-gray-500'}`}>
            {isUp ? '▲' : isDown ? '▼' : '—'} {changeDisplay}
          </div>
        )}
      </div>
    </Link>
  );
};

export default ProductCard;