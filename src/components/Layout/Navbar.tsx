'use client';
import React, { useState } from 'react';
import { ShoppingCart, Search, User, Menu, X, Heart } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <a href="#" className="text-2xl font-bold text-gray-900 flex items-center gap-1">
              Click<span className="text-blue-600">Mart</span>
            </a>
          </div>

          {/* Search Bar (Desktop) */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search products, brands and categories..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-8 text-sm font-medium text-gray-700">
            <a href="#" className="hover:text-blue-600 transition-colors">Home</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Categories</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Deals</a>
            <a href="#" className="hover:text-blue-600 transition-colors">New Arrivals</a>
          </div>

          {/* Right Action Icons */}
          <div className="hidden md:flex items-center space-x-6">
            <a href="#" className="text-gray-700 hover:text-blue-600 relative">
              <Heart className="h-6 w-6" />
            </a>
            <a href="#" className="text-gray-700 hover:text-blue-600 relative">
              <ShoppingCart className="h-6 w-6" />
              <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                0
              </span>
            </a>
            <a href="#" className="text-gray-700 hover:text-blue-600">
              <User className="h-6 w-6" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-4">
            <a href="#" className="text-gray-700 relative">
              <ShoppingCart className="h-6 w-6" />
              <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                0
              </span>
            </a>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-blue-600 focus:outline-none"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white px-4 pt-2 pb-4 space-y-3">
          <div className="relative w-full my-2">
            <input
              type="text"
              placeholder="Search ClickMart..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          </div>
          <div className="flex flex-col space-y-2 text-base font-medium text-gray-700">
            <a href="#" className="px-3 py-2 rounded-md hover:bg-gray-100 hover:text-blue-600">Home</a>
            <a href="#" className="px-3 py-2 rounded-md hover:bg-gray-100 hover:text-blue-600">Categories</a>
            <a href="#" className="px-3 py-2 rounded-md hover:bg-gray-100 hover:text-blue-600">Deals</a>
            <a href="#" className="px-3 py-2 rounded-md hover:bg-gray-100 hover:text-blue-600">Wishlist</a>
            <a href="#" className="px-3 py-2 rounded-md hover:bg-gray-100 hover:text-blue-600">Account</a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;