import React from 'react';

const Marquee = () => {
  return (
    <div className="overflow-hidden whitespace-nowrap py-2 text-sm bg-gray-50 border-t border-gray-200">
      {/* Tailwind config-e animation add korbo, aponmone scroll korar jnno */}
      <div className="inline-block animate-[marquee_20s_linear_infinite] text-gray-700">
        <span className="mx-4 inline-flex items-center gap-1">
          🍚 স্বর্ণামুচি চাল <span className="text-gray-500">১৪৮ টাকা/কেজি</span> <span className="text-red-500 font-medium">▲ ২.১%</span>
        </span>
        <span className="mx-4 inline-flex items-center gap-1">
          🍚 মিনিকেট চাল <span className="text-gray-500">৯৯ টাকা/কেজি</span> <span className="text-green-500 font-medium">▼ ২.৯%</span>
        </span>
        <span className="mx-4 inline-flex items-center gap-1">
          🍚 বাটন সাইজ চাল <span className="text-gray-500">৬৬ টাকা/কেজি</span> <span className="text-red-500 font-medium">▲ ৩.১%</span>
        </span>
        <span className="mx-4 inline-flex items-center gap-1">
          🍲 মসুর ডাল <span className="text-gray-500">১৪২ টাকা/কেজি</span> <span className="text-red-500 font-medium">▲ ২.৯%</span>
        </span>
      </div>
    </div>
  );
};

export default Marquee;