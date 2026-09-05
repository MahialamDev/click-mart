'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, Menu } from 'lucide-react';

const categories = [
  'Smart Items',
  'Smart Watches',
  'iPad Accessories',
  'Microphone',
  'Wireless Printer',
  'Video Game',
  'Polaroid Camera',
  'Air Purifier',
  'Control Speakers',
  'Headset',
];

const HeroSection = () => {
  return (
    <section className="bg-base-200/50 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Sidebar Category Menu */}
          <div className="hidden lg:block lg:col-span-3 bg-base-100 rounded-xl shadow-sm border border-base-200 overflow-hidden">
            <div className="bg-amber-400 text-slate-900 font-bold px-4 py-3.5 flex items-center gap-2 text-sm uppercase tracking-wider">
              <Menu className="w-5 h-5" />
              <span>Shop By Categories</span>
            </div>
            <ul className="divide-y divide-base-200 text-sm font-medium">
              {categories.map((item, idx) => (
                <li key={idx}>
                  <Link
                    href="#"
                    className="flex items-center justify-between px-4 py-2.5 hover:bg-base-200/60 hover:text-primary transition-colors"
                  >
                    <span>{item}</span>
                    <ChevronRight className="w-4 h-4 text-base-content/40" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Main Banner Area */}
          <div className="lg:col-span-9 space-y-6">
            {/* Main Hero Slider Banner */}
            <div className="relative rounded-2xl overflow-hidden bg-slate-950 text-white min-h-[360px] sm:min-h-[420px] flex items-center shadow-lg">
              <Image
                src="https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&w=1200&q=80"
                alt="VR Gaming Hero"
                fill
                 sizes="100vw"
                priority
                className="object-cover object-left opacity-80"
              />
              <div className="relative z-10 p-8 sm:p-12 max-w-lg ml-auto text-right sm:text-left space-y-4">
                <span className="text-amber-400 font-semibold text-sm uppercase tracking-wide">
                  Limited Offer 40% Off
                </span>
                <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight">
                  Playing Video Game
                </h1>
                <div>
                  <Link
                    href="#shop"
                    className="btn btn-warning text-slate-900 font-bold rounded-lg px-8 shadow-md"
                  >
                    SHOP NOW
                  </Link>
                </div>
              </div>
            </div>

            {/* Bottom Promo Grid Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Promo Card 1 */}
              <div className="relative rounded-xl overflow-hidden bg-amber-400 text-slate-900 p-6 flex items-center justify-between min-h-[140px] shadow-sm">
                <div className="space-y-1 max-w-[60%]">
                  <span className="text-xs font-bold uppercase tracking-wider opacity-80">
                    Extra 30% Off
                  </span>
                  <h3 className="text-lg font-extrabold leading-snug">
                    Prolet Designed For AirPods
                  </h3>
                </div>
                <div className="relative w-24 h-24">
                  <Image
                    src="https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=300&q=80"
                    alt="AirPods"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>

              {/* Promo Card 2 */}
              <div className="relative rounded-xl overflow-hidden bg-slate-800 text-white p-6 flex items-center justify-between min-h-[140px] shadow-sm">
                <div className="space-y-1 max-w-[60%]">
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                    Extra 25% Off
                  </span>
                  <h3 className="text-lg font-extrabold leading-snug">
                    EasySkinz XBOX Series X
                  </h3>
                </div>
                <div className="relative w-24 h-24">
                  <Image
                    src="https://images.unsplash.com/photo-1605901309584-828e34709657?auto=format&fit=crop&w=300&q=80"
                    alt="Xbox Controller"
                    fill
                    sizes='300px'
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;