'use client';
import React from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { usePathname } from 'next/navigation';

const hiddenNav = ['/dashboard']

const Footer = () => {
    const pathname = usePathname();
  if (hiddenNav.some((route) => pathname.startsWith(route))) { 
    return null;
  }
  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <a href="#" className="text-2xl font-bold text-white flex items-center gap-1">
              Click<span className="text-blue-500">Mart</span>
            </a>
            <p className="text-sm text-gray-400 max-w-sm">
              Your one-stop destination for quality products delivered fast to your doorstep. Experience effortless online shopping today.
            </p>
            
            {/* Social Icons */}
            <div className="flex space-x-4 pt-2">
              <a href="#" className="h-9 w-9 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors">
                <FaFacebookF className="h-4 w-4" />
              </a>
              <a href="#" className="h-9 w-9 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors">
                <FaTwitter className="h-4 w-4" />
              </a>
              <a href="#" className="h-9 w-9 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors">
                <FaInstagram className="h-4 w-4" />
              </a>
              <a href="#" className="h-9 w-9 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors">
                <FaLinkedinIn className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Shop All</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Featured Deals</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Customer Reviews</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
            </ul>
          </div>

          {/* Customer Support */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Customer Care</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Help Center / FAQ</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Track Order</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Shipping & Delivery</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Returns & Exchanges</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Newsletter Subscription */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Stay Connected</h3>
            <p className="text-sm text-gray-400">
              Subscribe to get exclusive discount updates and latest news.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full px-3 py-2 pr-10 bg-gray-800 border border-gray-700 rounded-md text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className="absolute right-1 top-1 bottom-1 px-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors flex items-center justify-center"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </form>
          </div>

        </div>

        {/* Contact Strip */}
        <div className="mt-10 pt-8 border-t border-gray-800 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-400">
          <div className="flex items-center gap-3">
            <MapPin className="h-5 w-5 text-blue-500 flex-shrink-0" />
            <span>123 Market Street, Commerce City, NY 10001</span>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="h-5 w-5 text-blue-500 flex-shrink-0" />
            <span>+1 (800) 123-4567</span>
          </div>
          <div className="flex items-center gap-3">
            <Mail className="h-5 w-5 text-blue-500 flex-shrink-0" />
            <span>support@clickmart.com</span>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className="bg-gray-950 py-4 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-2">
          <p>© {new Date().getFullYear()} ClickMart Inc. All rights reserved.</p>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-gray-400 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-gray-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gray-400 transition-colors">Cookie Preferences</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;