'use client';

import React from 'react';
import Image from 'next/image';

const categoryTree = [
  {
    title: 'Wireless Headphones',
    items: ['Desktops', 'Laptops/ Notebooks'],
  },
  {
    title: 'Computer & Laptop',
    items: ['Control Speakers', 'Wireless Printer'],
  },
  {
    title: 'Camera & Videos',
    items: ['Video Game', 'Control Speakers'],
  },
];

const SpecialBannersAndCategories = () => {
  return (
    <section className="py-8 bg-base-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Top 2 Side-by-Side Offer Banners */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Blue Polaroid Banner */}
          <div className="relative rounded-xl overflow-hidden bg-blue-600 text-white p-8 flex items-center justify-between min-h-[180px]">
            <div className="space-y-2 max-w-[55%] z-10">
              <span className="text-xs uppercase font-semibold text-blue-100">
                Special Offers
              </span>
              <h3 className="text-xl font-bold">Polaroid Camera Blue & White</h3>
              <button className="btn btn-sm btn-outline text-white border-white hover:bg-white hover:text-blue-600 rounded mt-2 text-xs font-bold uppercase">
                SHOP NOW
              </button>
            </div>
            <div className="relative w-36 h-36">
              <Image
                src="https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=400&q=80"
                alt="Polaroid Camera"
                fill
                className="object-contain"
              />
            </div>
          </div>

          {/* Orange Smart Speaker Banner */}
          <div className="relative rounded-xl overflow-hidden bg-orange-500 text-white p-8 flex items-center justify-between min-h-[180px]">
            <div className="space-y-2 max-w-[55%] z-10">
              <span className="text-xs uppercase font-semibold text-orange-100">
                Get 50% Off
              </span>
              <h3 className="text-xl font-bold">Smart Speaker & Assistant</h3>
              <button className="btn btn-sm btn-outline text-white border-white hover:bg-white hover:text-orange-500 rounded mt-2 text-xs font-bold uppercase">
                SHOP NOW
              </button>
            </div>
            <div className="relative w-36 h-36">
              <Image
                src="https://images.unsplash.com/photo-1543512214-318c7553f230?auto=format&fit=crop&w=400&q=80"
                alt="Smart Speaker"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>

        {/* Bottom Category Listing Block */}
        <div>
          <h3 className="text-xl font-bold text-base-content border-b border-base-200 pb-3 mb-6">
            Shop By Category
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categoryTree.map((cat, idx) => (
              <div key={idx} className="bg-base-200/40 border border-base-200 p-5 rounded-xl">
                <h4 className="font-bold text-sm text-base-content mb-3">{cat.title}</h4>
                <ul className="space-y-2 text-xs text-base-content/70">
                  {cat.items.map((subItem, sIdx) => (
                    <li key={sIdx} className="hover:text-primary cursor-pointer transition-colors">
                      {subItem}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default SpecialBannersAndCategories;