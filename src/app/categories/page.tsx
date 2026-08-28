'use client';

import React from 'react';
import { Smartphone, Headphones, Laptop, Camera, Speaker, Gamepad2, Watch, Printer } from 'lucide-react';

const categoriesList = [
  { name: 'Smart Phones', items: 120, icon: Smartphone },
  { name: 'Wireless Headphones', items: 85, icon: Headphones },
  { name: 'Computer & Laptop', items: 45, icon: Laptop },
  { name: 'Cameras & Video', items: 30, icon: Camera },
  { name: 'Smart Speakers', items: 60, icon: Speaker },
  { name: 'Gaming Consoles', items: 40, icon: Gamepad2 },
  { name: 'Smart Watches', items: 95, icon: Watch },
  { name: 'Wireless Printers', items: 20, icon: Printer },
];

export default function CategoriesPage() {
  return (
    <div className="bg-base-100 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="border-b border-base-200 pb-4">
          <h1 className="text-3xl font-black text-base-content">Shop by Categories</h1>
          <p className="text-sm text-base-content/60">Find products quickly by browsing our categories</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {categoriesList.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <div key={idx} className="p-6 bg-base-200/50 border border-base-200 rounded-2xl hover:border-primary/50 transition-colors cursor-pointer flex items-center gap-4">
                <div className="p-4 bg-primary/10 text-primary rounded-2xl">
                  <Icon className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="font-bold text-base-content text-base">{cat.name}</h3>
                  <p className="text-xs text-base-content/60">{cat.items} Products</p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}