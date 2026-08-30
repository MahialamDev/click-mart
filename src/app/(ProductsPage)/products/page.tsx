'use client';

import React from 'react';
import Image from 'next/image';
import { Star, ShoppingBag, Filter } from 'lucide-react';
import Link from 'next/link';
import axiosInstance from '@/Hooks/axiosInstance';

const mockProducts = [
  { id: 1, title: 'Wireless Noise-Canceling Headphones', price: 199.99, category: 'Headset', rating: 5, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80' },
  { id: 2, title: 'Beats Solo3 Wireless Headphones', price: 17.00, category: 'Audio', rating: 4, image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=400&q=80' },
  { id: 3, title: 'All-New Amazon Echo Dot (4th Gen)', price: 100.00, category: 'Smart Home', rating: 5, image: 'https://images.unsplash.com/photo-1589003077984-894e133dabab?auto=format&fit=crop&w=400&q=80' },
  { id: 4, title: 'New Apple iPhone 12 Pro Max Gold', price: 999.00, category: 'Mobile', rating: 5, image: 'https://images.unsplash.com/photo-1605236453806-6ff36851218e?auto=format&fit=crop&w=400&q=80' },
];

export default function ProductsPage() {

  
  return (
    <div className="bg-base-100 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-base-200 pb-4">
          <div>
            <h1 className="text-3xl font-black text-base-content">All Products</h1>
            <p className="text-sm text-base-content/60">Explore our complete collection of gadgets</p>
          </div>
          <button className="btn btn-outline border-base-300 gap-2">
            <Filter className="w-4 h-4" /> Filter
          </button>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-6">
          {mockProducts.map((p) => (
            <Link href={`/products/${p.id}`} key={p.id} className="bg-base-100 border border-base-200 rounded-2xl p-4 flex flex-col justify-between hover:shadow-lg transition-shadow">
             
              <div className="relative w-full h-48 bg-base-200 rounded-xl overflow-hidden mb-4">
                <Image src={p.image} alt={p.title} fill className="object-contain p-2" />
              </div>
              <div className="space-y-2">
                <span className="text-[10px] font-bold uppercase text-primary tracking-wider">{p.category}</span>
                <h3 className="font-bold text-sm text-base-content line-clamp-2">{p.title}</h3>
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-3.5 h-3.5 ${i < p.rating ? 'fill-amber-400' : 'text-base-300'}`} />
                  ))}
                </div>
                <div className="flex items-center justify-between pt-2">
                  <span className="text-lg font-black text-base-content">${p.price}</span>
                  <button className="btn btn-primary btn-sm rounded-xl">
                    <ShoppingBag className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
}