'use client';

import React from 'react';
import Image from 'next/image';
import { Star, Truck, PhoneCall, ShieldCheck, Tag, Smile } from 'lucide-react';

const products = [
  {
    id: 1,
    title: 'Beats Solo3 Wireless Headphones Beats',
    price: 17.0,
    oldPrice: 19.0,
    discount: '-11%',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 2,
    title: 'All-New Amazon Echo Product Dot (4th Gen)',
    price: 100.0,
    oldPrice: 120.0,
    discount: '-17%',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1589003077984-894e133dabab?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 3,
    title: 'New Apple iPhone 12 Pro Max Gold',
    price: 9.0,
    oldPrice: 12.0,
    discount: '-25%',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1605236453806-6ff36851218e?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 4,
    title: 'French Connection Unisex Smartwatch',
    price: 240.0,
    oldPrice: null,
    discount: null,
    rating: 3,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=400&q=80',
  },
];

const services = [
  { icon: Truck, title: 'Fast Delivery', desc: 'Our Fast Delivery Service' },
  { icon: PhoneCall, title: '24/7 Call Support', desc: 'Any Time Support' },
  { icon: ShieldCheck, title: 'Quality Products', desc: 'Best Product Service' },
  { icon: Tag, title: 'Up to 20% Off', desc: 'Best Discount in product' },
  { icon: Smile, title: 'Best Satisfaction', desc: 'Our Best Services' },
];

const PopularProducts = () => {
  return (
    <section className="py-10 bg-base-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Service Strip Sidebar */}
          <div className="lg:col-span-3 space-y-6">
            <div className="p-6 bg-base-200/50 rounded-xl border border-base-200">
              <h4 className="font-bold text-base-content text-base mb-2">
                Awesome Experience With Our Company
              </h4>
              <p className="text-xs text-base-content/70 leading-relaxed mb-4">
                High quality electronics and smart gadgets delivered directly to your doorstep.
              </p>
              <button className="btn btn-warning btn-sm font-bold text-xs uppercase px-4">
                READ MORE
              </button>
            </div>

            <div className="divide-y divide-base-200 bg-base-100 border border-base-200 rounded-xl">
              {services.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="flex items-center gap-4 p-4">
                    <Icon className="w-7 h-7 text-base-content/70" />
                    <div>
                      <h5 className="font-bold text-sm text-base-content">{item.title}</h5>
                      <p className="text-xs text-base-content/60">{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Product Grid */}
          <div className="lg:col-span-9 space-y-8">
            <div>
              <div className="flex items-center justify-between border-b border-base-200 pb-3 mb-6">
                <h3 className="text-xl font-bold text-base-content">Popular Products</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                {products.map((item) => (
                  <div
                    key={item.id}
                    className="bg-base-100 rounded-xl border border-base-200 p-4 flex flex-col justify-between relative group hover:shadow-md transition-shadow"
                  >
                    {item.discount && (
                      <span className="absolute top-3 left-3 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                        {item.discount}
                      </span>
                    )}

                    <div className="relative w-full h-44 my-2">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="300px"
                        className="object-contain"
                      />
                    </div>

                    <div className="space-y-2 mt-2">
                      <h4 className="text-xs font-semibold text-base-content/90 line-clamp-2 h-8">
                        {item.title}
                      </h4>

                      <div className="flex text-amber-400">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3.5 h-3.5 ${
                              i < item.rating ? 'fill-amber-400' : 'text-base-300'
                            }`}
                          />
                        ))}
                      </div>

                      <div className="flex items-center gap-2">
                        {item.oldPrice && (
                          <span className="text-xs text-base-content/50 line-through">
                            ${item.oldPrice.toFixed(2)}
                          </span>
                        )}
                        <span className="text-sm font-bold text-base-content">
                          ${item.price.toFixed(2)}
                        </span>
                      </div>

                      <button className="btn btn-sm btn-ghost bg-base-200 hover:bg-warning hover:text-slate-900 w-full mt-2 font-bold text-xs uppercase">
                        OPTIONS
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Middle Horizontal Camera Promo Banner */}
            <div className="relative rounded-xl overflow-hidden bg-slate-950 text-white min-h-[160px] flex items-center p-8 shadow-sm">
              <Image
                src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1200&q=80"
                alt="Nikon Lens Banner"
                fill
                sizes="300px"
                className="object-cover opacity-60"
              />
              <div className="relative z-10 max-w-md space-y-2">
                <span className="bg-amber-400 text-slate-900 font-bold text-[11px] px-2.5 py-1 rounded">
                  Exclusively High Quality Products
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  Nikon Normal 55mm f/1.2 Manual Focus Lens
                </h3>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default PopularProducts;