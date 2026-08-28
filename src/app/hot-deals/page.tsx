'use client';

import React from 'react';
import Image from 'next/image';
import { Flame, Clock } from 'lucide-react';

export default function DealsPage() {
  return (
    <div className="bg-base-100 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Deal Banner */}
        <div className="bg-gradient-to-r from-red-600 to-amber-500 rounded-3xl p-8 sm:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-3 max-w-lg">
            <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center w-fit gap-1">
              <Flame className="w-4 h-4 fill-white" /> Limited Time Offer
            </span>
            <h1 className="text-3xl sm:text-5xl font-black">Flash Summer Sale</h1>
            <p className="text-white/80 text-sm">Grab your favorite gadgets at up to 50% discount before timer ends!</p>
          </div>
          <div className="flex items-center gap-2 bg-black/30 p-4 rounded-2xl border border-white/20">
            <Clock className="w-6 h-6 text-amber-300" />
            <span className="font-mono text-xl font-bold">12h : 45m : 22s</span>
          </div>
        </div>

        {/* Deals Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative rounded-2xl overflow-hidden bg-slate-900 text-white p-6 flex items-center justify-between h-48">
            <div className="space-y-2 z-10 max-w-[60%]">
              <span className="badge badge-error text-white font-bold">Save 30%</span>
              <h3 className="text-xl font-bold">XBOX Wireless Controller</h3>
              <p className="text-xs text-slate-400">$350.00 <span className="line-through text-slate-500">$400.00</span></p>
            </div>
            <div className="relative w-32 h-32">
              <Image src="https://images.unsplash.com/photo-1605901309584-828e34709657?auto=format&fit=crop&w=300&q=80" alt="Controller" fill className="object-contain" />
            </div>
          </div>

          <div className="relative rounded-2xl overflow-hidden bg-amber-400 text-slate-900 p-6 flex items-center justify-between h-48">
            <div className="space-y-2 z-10 max-w-[60%]">
              <span className="badge badge-neutral text-white font-bold">Extra 25% Off</span>
              <h3 className="text-xl font-bold">AirPods Protective Case</h3>
              <p className="text-xs text-slate-800 font-bold">$19.99 <span className="line-through opacity-60">$29.99</span></p>
            </div>
            <div className="relative w-32 h-32">
              <Image src="https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=300&q=80" alt="Case" fill className="object-contain" />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}