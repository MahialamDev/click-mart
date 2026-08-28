'use client';

import React from 'react';
import Image from 'next/image';
import { Trash2, ArrowRight } from 'lucide-react';

export default function CartPage() {
  return (
    <div className="bg-base-100 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <h1 className="text-3xl font-black text-base-content">Your Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Cart Item List */}
          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center justify-between p-4 bg-base-200/50 border border-base-200 rounded-2xl">
              <div className="flex items-center gap-4">
                <div className="relative w-16 h-16 bg-base-100 rounded-xl overflow-hidden">
                  <Image src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=200&q=80" alt="Item" fill className="object-contain" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-base-content">Wireless Noise-Canceling Headphones</h4>
                  <p className="text-xs text-base-content/60">$199.99</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <input type="number" defaultValue={1} className="input input-sm input-bordered w-16 text-center" />
                <button className="btn btn-ghost btn-sm text-error">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Cart Summary */}
          <div className="lg:col-span-4 bg-base-200/50 border border-base-200 p-6 rounded-2xl space-y-4 h-fit">
            <h3 className="font-bold text-lg text-base-content border-b border-base-200 pb-2">Order Summary</h3>
            <div className="space-y-2 text-sm text-base-content/70">
              <div className="flex justify-between"><span>Subtotal</span><span className="font-bold text-base-content">$199.99</span></div>
              <div className="flex justify-between"><span>Shipping</span><span className="text-success font-bold">Free</span></div>
              <div className="flex justify-between border-t border-base-200 pt-2 text-base font-bold text-base-content"><span>Total</span><span>$199.99</span></div>
            </div>
            <button className="btn btn-primary w-full gap-2 rounded-xl">
              Proceed to Checkout <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}