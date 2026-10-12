import React from 'react';

const Footer = () => {
  return (
   <footer className="bg-[#f8faf9] py-8 mt-12 border-t border-gray-200">
      <div className="container mx-auto px-4 md:px-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 gap-4">
        <p>বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।</p>
        <p>সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।</p>
      </div>
    </footer>
  );
};

export default Footer;