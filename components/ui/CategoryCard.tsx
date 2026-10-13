import Link from 'next/link';

interface CategoryCardProps {
  name: string;
  icon: string;
  slug: string;
}

export default function CategoryCard({ name, icon, slug }: CategoryCardProps) {
  return (
    <Link
      href={`/category/${slug}`}
      className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition flex items-center gap-4"
    >
      <div className="w-12 h-12 bg-green-50 text-2xl rounded-xl flex items-center justify-center">
        {icon}
      </div>
      <div>
        <h3 className="text-lg font-bold text-gray-900">{name}</h3>
        <p className="text-xs text-gray-500 mt-0.5">পণ্যের দাম ও বাজার দেখুন</p>
      </div>
    </Link>
  );
}