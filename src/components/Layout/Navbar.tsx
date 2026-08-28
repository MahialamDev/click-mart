"use client";

import React, { useState } from "react";
import {
  ShoppingCart,
  Search,
  User,
  Menu,
  X,
  Heart,
  Settings,
  LogOut,
  Zap,
  ChevronDown,
  PhoneCall,
  GitCompare,
  LayoutGrid,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { logoutUser } from "@/lib/client-auth";
import { logout } from "@/redux/features/auth/authSlice";
import { MdDashboard } from "react-icons/md";
import Image from "next/image";
import MobileNavbar from "./MobileNavbar";

const hiddenNav = ["/dashboard"];
export const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'All Products' },
  { href: '/categories', label: 'Categories' },
  { href: '/hot-deals', label: 'Hot Deals' },
  { href: '/checkout', label: 'Checkout' },
  { href: '/contact', label: 'Contact Us' },
];

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();
  const user = useSelector((state: RootState) => state.auth.user);
  const loading = useSelector((state: RootState) => state.auth.loading);
  const dispatch = useDispatch();
  const pathname = usePathname();

  const handleLogout = async () => {
    try {
      await logoutUser();
      dispatch(logout());
      router.push("/login");
      router.refresh();
    } catch (err) {
      console.log(err);
    }
  };

  if (hiddenNav.some((route) => pathname.startsWith(route))) {
    return null;
  }

  return (
    <header className="w-full md:shadow-lg font-sans sticky top-0 z-100">
      
      {/* ========================================================= */}
      {/* 1. DESKTOP LAYOUT (hidden md:block)                       */}
      {/* ========================================================= */}
      <div className="hidden md:block">
        
        {/* Top Header Bar */}
        <div className="bg-[#101827] text-gray-100 py-3.5 px-6 border-b border-gray-800">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-6">
            
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <span className="p-2 bg-primary text-[#101827] rounded-xl font-black shadow-md group-hover:scale-105 transition-transform">
                <Zap className="h-5 w-5 fill-current" />
              </span>
              <span className="text-2xl font-black tracking-tight text-white">
                CLICK<span className="text-primary">MART</span>
              </span>
            </Link>

            {/* Search Box */}
            <div className="flex-1 max-w-2xl">
              <div className="flex w-full bg-[#1E293B] border border-gray-700 rounded-xl overflow-hidden focus-within:border-primary transition-all">
                <input
                  type="text"
                  placeholder="Search over 10,000+ tech & gadget products..."
                  className="w-full px-4 py-2.5 bg-transparent text-white placeholder-gray-400 focus:outline-none text-sm"
                />
                <button className="bg-primary hover:bg-yellow-400 text-[#101827] font-extrabold px-6 py-2.5 text-xs tracking-wider uppercase flex items-center gap-2 transition-colors">
                  <Search className="h-4 w-4" />
                  <span>Search</span>
                </button>
              </div>
            </div>

            {/* Icons & User Profile */}
            <div className="flex items-center space-x-6">
              
              {/* Compare */}
              <Link href="/compare" className="flex items-center gap-2 hover:text-primary transition-colors text-xs font-semibold group">
                <div className="relative">
                  <GitCompare className="h-5 w-5 text-gray-300 group-hover:text-primary" />
                  <span className="absolute -top-2 -right-2 bg-primary text-[#101827] text-[10px] rounded-full h-4 w-4 flex items-center justify-center font-bold">
                    0
                  </span>
                </div>
                <span>Compare</span>
              </Link>

              {/* Wishlist */}
              <Link href="/wishlist" className="flex items-center gap-2 hover:text-primary transition-colors text-xs font-semibold group">
                <div className="relative">
                  <Heart className="h-5 w-5 text-gray-300 group-hover:text-primary" />
                  <span className="absolute -top-2 -right-2 bg-primary text-[#101827] text-[10px] rounded-full h-4 w-4 flex items-center justify-center font-bold">
                    0
                  </span>
                </div>
                <span>Wishlist</span>
              </Link>

              {/* Cart */}
              <Link href="/cart" className="flex items-center gap-2 hover:text-primary transition-colors text-xs font-semibold group">
                <div className="relative">
                  <ShoppingCart className="h-5 w-5 text-gray-300 group-hover:text-primary" />
                  <span className="absolute -top-2 -right-2 bg-primary text-[#101827] text-[10px] rounded-full h-4 w-4 flex items-center justify-center font-bold">
                    0
                  </span>
                </div>
                <span>My Cart</span>
              </Link>

              {/* Profile Dropdown */}
              {loading ? (
                <span className="loading loading-spinner text-primary"></span>
              ) : user ? (
                <div className="dropdown dropdown-end">
                  <div
                    tabIndex={0}
                    role="button"
                    className="flex items-center gap-2.5 cursor-pointer bg-[#1E293B] hover:bg-gray-800 p-1.5 pr-3 rounded-full border border-gray-700 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full border-2 border-primary overflow-hidden relative bg-gray-700 flex items-center justify-center">
                      {user?.imageUrl ? (
                        <Image
                          src={user.imageUrl}
                          alt={user?.name || "User"}
                          fill
                          sizes="32px"
                          className="object-cover"
                        />
                      ) : (
                        <span className="text-white font-bold text-xs">
                          {user?.name?.charAt(0)?.toUpperCase() || "U"}
                        </span>
                      )}
                    </div>
                    <span className="text-xs font-bold text-white max-w-[80px] truncate">
                      {user?.name?.split(" ")[0]}
                    </span>
                    <ChevronDown className="h-3.5 w-3.5 text-gray-400" />
                  </div>

                  {/* Dark Theme Styled Profile Dropdown */}
                  <div
                    tabIndex={0}
                    className="dropdown-content menu z-[60] mt-3 w-64 p-3 shadow-2xl bg-[#101827] text-white border border-gray-800 rounded-2xl space-y-3"
                  >
                    <div className="flex items-center gap-3 px-2 py-1">
                      <div className="w-10 h-10 rounded-full bg-primary text-[#101827] font-bold flex items-center justify-center text-lg shadow-md shrink-0">
                        {user?.name?.charAt(0)?.toUpperCase() || "U"}
                      </div>
                      <div className="overflow-hidden">
                        <h4 className="font-bold text-sm truncate text-white">
                          {user?.name || "User Name"}
                        </h4>
                        <p className="text-xs text-gray-400 truncate mt-0.5">
                          {user?.email || "user@example.com"}
                        </p>
                      </div>
                    </div>

                    <div className="divider my-0 h-[1px] bg-gray-800"></div>

                    <ul className="menu p-0 gap-1 text-xs font-semibold">
                      <li>
                        <Link href="/dashboard/profile" className="py-2.5 px-3 rounded-xl hover:bg-[#1E293B] hover:text-primary transition-colors">
                          <User className="w-4 h-4 text-gray-400" />
                          My Profile
                        </Link>
                      </li>
                      <li>
                        <Link href="/dashboard" className="py-2.5 px-3 rounded-xl hover:bg-[#1E293B] hover:text-primary transition-colors">
                          <MdDashboard className="w-4 h-4 text-gray-400" />
                          Dashboard
                        </Link>
                      </li>
                      <li>
                        <Link href="/settings" className="py-2.5 px-3 rounded-xl hover:bg-[#1E293B] hover:text-primary transition-colors">
                          <Settings className="w-4 h-4 text-gray-400" />
                          Settings
                        </Link>
                      </li>
                    </ul>

                    <div className="divider my-0 h-[1px] bg-gray-800"></div>

                    <button
                      onClick={handleLogout}
                      className="w-full btn btn-error btn-soft btn-sm flex items-center justify-center gap-2 rounded-xl text-xs font-bold py-2.5"
                    >
                      <LogOut className="w-4 h-4" />
                      Log Out
                    </button>
                  </div>
                </div>
              ) : (
                <Link href="/login" className="flex items-center gap-2 hover:text-primary transition-colors text-xs font-semibold group">
               
                  <User className="h-5 w-5 text-gray-300 group-hover:text-primary" />
                  
                
                <span>Account</span>
              </Link>
              )}
            </div>

          </div>
        </div>

        {/* Sticky Desktop Bottom Navbar */}
        <div className="sticky top-0 z-50 bg-[#1E293B] text-white border-b border-gray-800 shadow-md">
          <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-13">
            
            {/* Sticky Shop By Category */}
            <div className="relative">
              <button className="bg-primary text-[#101827] font-black px-5 py-3 rounded-t-lg flex items-center gap-2.5 hover:bg-yellow-400 transition-colors text-xs uppercase tracking-wider">
                <LayoutGrid className="h-4 w-4" />
                <span>Shop By Categories</span>
                <ChevronDown className="h-4 w-4" />
              </button>
            </div>

            {/* Desktop Navigation */}
            <nav className="flex items-center space-x-8 text-xs font-bold uppercase tracking-wider text-gray-300">
              {navLinks.map((link) =>
                <Link key={link.href} href={link.href} className="hover:text-primary transition-colors">
                  { link.label}
              </Link>
              )}
              
              
            </nav>

            {/* Helpline */}
            <div className="flex items-center gap-2 text-xs font-bold text-gray-300">
              <PhoneCall className="h-4 w-4 text-primary" />
              <span>Need Help? (+880) 1234-567890</span>
            </div>
          </div>
        </div>

      </div>

      {/* ========================================================= */}
      {/* 2. MOBILE LAYOUT (block md:hidden)                       */}
      {/* ========================================================= */}
      <MobileNavbar user={user} navLinks={navLinks} handleLogout={handleLogout} />

    </header>
  );
};

export default Navbar;