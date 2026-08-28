'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Mail, Phone, MapPin, Send, ShieldCheck, Truck, RotateCcw } from 'lucide-react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const hiddenNav = ['/dashboard'];

const Footer = () => {
  const pathname = usePathname();

  // Hide footer in dashboard routes
  if (hiddenNav.some((route) => pathname.startsWith(route))) {
    return null;
  }

  return (
    <footer className="bg-slate-950 text-slate-300 font-sans border-t border-slate-800">
      
      {/* Top Feature Highlights Bar */}
      <div className="bg-slate-900 border-b border-slate-800 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-4">
              <div className="p-3 bg-amber-400/10 text-amber-400 rounded-xl">
                <Truck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-white text-sm">Free Express Shipping</h4>
                <p className="text-xs text-slate-400">On all orders over $99</p>
              </div>
            </div>

            <div className="flex items-center justify-center md:justify-start gap-4">
              <div className="p-3 bg-amber-400/10 text-amber-400 rounded-xl">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-white text-sm">Genuine Warranty</h4>
                <p className="text-xs text-slate-400">100% authentic electronic products</p>
              </div>
            </div>

            <div className="flex items-center justify-center md:justify-start gap-4">
              <div className="p-3 bg-amber-400/10 text-amber-400 rounded-xl">
                <RotateCcw className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-white text-sm">7-Day Easy Return</h4>
                <p className="text-xs text-slate-400">Hassle-free replacement policy</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand Info */}
          <div className="sm:col-span-2 space-y-4">
            <Link href="/" className="text-2xl font-black tracking-tight text-white flex items-center gap-1">
              Elect<span className="text-amber-400">box</span>
            </Link>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              Your trusted destination for premium electronics, smart gadgets, wireless gear, and accessories.
            </p>
            
            {/* Social Icons */}
            <div className="flex space-x-3 pt-2">
              <a href="#" className="h-9 w-9 rounded-xl bg-slate-800 flex items-center justify-center text-slate-300 hover:bg-amber-400 hover:text-slate-950 transition-all">
                <FaFacebookF className="h-4 w-4" />
              </a>
              <a href="#" className="h-9 w-9 rounded-xl bg-slate-800 flex items-center justify-center text-slate-300 hover:bg-amber-400 hover:text-slate-950 transition-all">
                <FaTwitter className="h-4 w-4" />
              </a>
              <a href="#" className="h-9 w-9 rounded-xl bg-slate-800 flex items-center justify-center text-slate-300 hover:bg-amber-400 hover:text-slate-950 transition-all">
                <FaInstagram className="h-4 w-4" />
              </a>
              <a href="#" className="h-9 w-9 rounded-xl bg-slate-800 flex items-center justify-center text-slate-300 hover:bg-amber-400 hover:text-slate-950 transition-all">
                <FaLinkedinIn className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">Quick Navigation</h3>
            <ul className="space-y-2 text-xs font-medium">
              <li><Link href="/" className="hover:text-amber-400 transition-colors">Home</Link></li>
              <li><Link href="/products" className="hover:text-amber-400 transition-colors">All Products</Link></li>
              <li><Link href="/categories" className="hover:text-amber-400 transition-colors">Shop by Categories</Link></li>
              <li><Link href="/hot-deals" className="hover:text-amber-400 transition-colors">Hot Deals & Flash Sale</Link></li>
              <li><Link href="/cart" className="hover:text-amber-400 transition-colors">Shopping Cart</Link></li>
            </ul>
          </div>

          {/* Customer Care */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">Customer Support</h3>
            <ul className="space-y-2 text-xs font-medium">
              <li><Link href="/contact" className="hover:text-amber-400 transition-colors">Contact Us</Link></li>
              <li><a href="#" className="hover:text-amber-400 transition-colors">Order Tracking</a></li>
              <li><a href="#" className="hover:text-amber-400 transition-colors">Shipping & Delivery Info</a></li>
              <li><a href="#" className="hover:text-amber-400 transition-colors">Return Policy</a></li>
              <li><a href="#" className="hover:text-amber-400 transition-colors">Terms & Privacy Policy</a></li>
            </ul>
          </div>

          {/* Newsletter Subscription */}
          <div className="space-y-3 sm:col-span-2 lg:col-span-1">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">Newsletter</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Get weekly updates on exclusive gadget deals and tech trends.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter email address"
                  className="w-full px-3 py-2 pr-10 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-amber-400"
                />
                <button
                  type="submit"
                  className="absolute right-1 top-1 bottom-1 px-3 bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold rounded-lg transition-colors flex items-center justify-center"
                >
                  <Send className="h-3.5 w-3.5" />
                </button>
              </div>
            </form>
          </div>

        </div>

        {/* Address & Contact Strip */}
        <div className="mt-10 pt-8 border-t border-slate-900 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-3">
            <MapPin className="h-4 w-4 text-amber-400 shrink-0" />
            <span>Jamalpur, Bangladesh</span>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="h-4 w-4 text-amber-400 shrink-0" />
            <span>+880 1234-567890</span>
          </div>
          <div className="flex items-center gap-3">
            <Mail className="h-4 w-4 text-amber-400 shrink-0" />
            <span>support@electbox.com</span>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className="bg-slate-950 py-4 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-2">
          <p>© {new Date().getFullYear()} Electbox Inc. All rights reserved.</p>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-slate-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-400 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-slate-400 transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;