"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  ShoppingCart,
  Search,
  Menu,
  X,
  Zap,
  Home,
  Sun,
  Moon,
  LogOut,
  LayoutDashboard,
  Package,
  Users,
  User,
  LayoutGrid,
} from "lucide-react";
import { User as UserType } from "@/redux/features/auth/authSlice";

type SideLink = {
  href: string;
  label: string;
};

const iconMap = {
  dashboard: LayoutDashboard,
  product: Package,
  users: Users,
  profile: User,
};

interface MobileNavbarProps {
  user?: UserType | null;
  handleLogout: () => void;
  links: SideLink[];
}

const MobileNavbar = ({ user, handleLogout, links = [] }: MobileNavbarProps) => {
  const [showNav, setShowNav] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const pathName = usePathname();

  // Scroll visibility management state
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Dark/Light Theme Handler
  const toggleTheme = () => {
    setIsDarkMode((prev) => {
      const newMode = !prev;
      document.documentElement.setAttribute("data-theme", newMode ? "dark" : "light");
      return newMode;
    });
  };

  // Scroll Direction Detect Logic
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // scroll down -> hide navbar
      // scroll up -> show navbar
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <>
      {/* 1. Main Header Container - Auto Hide/Show Effect */}
      <div
        className={`block md:hidden fixed top-0 left-0 right-0 z-50 bg-[#101827] text-white transition-transform duration-300 ${
          showNavbar ? "translate-y-0" : "translate-y-[-55px]"
        }`}
      >
        {/* Header (Logo & Top Action Bar) */}
        <div className="flex items-center justify-between px-4 pt-3 pb-2 border-b border-gray-800/50">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="p-1.5 bg-primary text-[#101827] rounded-lg">
              <Zap className="h-5 w-5 fill-current" />
            </span>
            <span className="text-xl font-black text-white tracking-wide">
              CLICK<span className="text-primary">MART</span>
            </span>
          </Link>

          {/* Right Actions */}
          <div className="flex items-center gap-3.5">
            {/* Cart Icon */}
            <Link href="/cart" className="relative text-gray-300">
              <ShoppingCart className="h-6 w-6" />
              <span className="absolute -top-1.5 -right-2 bg-primary text-[#101827] text-[10px] rounded-full h-4 w-4 flex items-center justify-center font-bold">
                0
              </span>
            </Link>
            

            {/* User Profile Avatar */}
            {user ? (
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="w-8 h-8 rounded-full border border-primary overflow-hidden relative bg-gray-700 flex items-center justify-center"
                >
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

                {/* Profile Dropdown Items */}
                <div
                  tabIndex={0}
                  className="dropdown-content menu z-[110] mt-3 w-56 p-3 shadow-2xl bg-[#101827] text-white border border-gray-800 rounded-xl space-y-2"
                >
                  <div className="px-2 py-1">
                    <h4 className="font-bold text-sm text-white truncate">{user?.name}</h4>
                    <p className="text-xs text-gray-400 truncate">{user?.email}</p>
                  </div>
                  <div className="divider my-0 h-[1px] bg-gray-800"></div>
                  <ul className="menu p-0 gap-1 text-xs">
                    <li>
                      <Link href="/dashboard/profile" className="hover:bg-[#1E293B]">
                        My Profile
                      </Link>
                    </li>
                    <li>
                      <Link href="/dashboard" className="hover:bg-[#1E293B]">
                        Dashboard
                      </Link>
                    </li>
                  </ul>
                  <button
                    onClick={handleLogout}
                    className="w-full btn btn-error btn-soft btn-xs rounded-lg py-1.5 text-xs mt-1"
                  >
                    Log Out
                  </button>
                </div>
              </div>
            )

              :
            <Link href="/login" className="relative text-gray-300">
              <User className="h-6 w-6" />
            </Link>

          }

            {/* Hamburger Menu Trigger */}
            <button
              type="button"
              onClick={() => setShowNav(true)}
              className="text-gray-300 hover:text-primary focus:outline-none p-1"
              aria-label="Open menu"
            >
              <Menu className="h-7 w-7" />
            </button>
          </div>
        </div>

        {/* Search Field Container */}
        <div className="px-4 pb-3 pt-2 border-b border-gray-800 shadow-md">
          <div className="flex w-full bg-[#1E293B] border border-gray-700 rounded-lg overflow-hidden focus-within:border-primary transition-all">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full px-3 py-2 bg-transparent text-white placeholder-gray-400 text-xs focus:outline-none"
            />
            <button className="bg-primary text-[#101827] px-4 py-2 font-bold flex items-center justify-center">
              <Search className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 2. Content Spacer - Fixed Navbar-এর পেছনে কনটেন্ট যেন ঢেকে না যায় */}
      <div className="block md:hidden h-[110px]" />

      {/* 3. Backdrop Overlay */}
      {showNav && (
        <div
          onClick={() => setShowNav(false)}
          className="fixed inset-0 h-screen bg-slate-950/60 backdrop-blur-xs z-[100] transition-opacity md:hidden"
        />
      )}

      {/* 4. Side Drawer Navigation */}
      <aside
        className={`fixed top-0 left-0 h-screen w-[75%] max-w-72 bg-[#101827] text-white z-[110] shadow-2xl flex flex-col justify-between border-r border-gray-800 transform transition-transform duration-300 ease-in-out md:hidden ${
          showNav ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div>
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-5 border-b border-gray-800">
            <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
              <LayoutGrid className="h-5 w-5 text-primary" /> Menu
            </h2>
            <button
              type="button"
              onClick={() => setShowNav(false)}
              className="p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-gray-800 transition-colors"
              aria-label="Close menu"
            >
              <X size={20} />
            </button>
          </div>

          {/* Quick Actions */}
          <div className="p-4 grid grid-cols-2 gap-2 border-b border-gray-800">
            <Link
              href="/"
              onClick={() => setShowNav(false)}
              className="flex items-center justify-center gap-2 py-2 px-3 bg-[#1E293B] hover:bg-gray-800 text-gray-200 text-xs font-semibold rounded-xl transition-colors"
            >
              <Home size={15} />
              <span>Home</span>
            </Link>

            <button
              type="button"
              onClick={toggleTheme}
              className="flex items-center justify-center gap-2 py-2 px-3 bg-[#1E293B] hover:bg-gray-800 text-gray-200 text-xs font-semibold rounded-xl transition-colors"
            >
              {isDarkMode ? (
                <>
                  <Sun size={15} className="text-amber-400" />
                  <span>Light</span>
                </>
              ) : (
                <>
                  <Moon size={15} className="text-indigo-400" />
                  <span>Dark</span>
                </>
              )}
            </button>
          </div>

          {/* Nav Items Container */}
          <nav className="p-4 space-y-1 overflow-y-auto max-h-[60vh]">
            <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-2">
              Navigation
            </p>
            
            {/* Default Pages Links */}
            <div className="pt-2 border-t border-gray-800/60 space-y-1">
              { 
                links.map((link) => { 
                  return (
                    <Link
                    key={link.href}
                href={link.href}
                onClick={() => setShowNav(false)}
                className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium text-gray-300 hover:text-white hover:bg-[#1E293B]" 
              >
                      { link.label}
              </Link>
                  )
                })
              }
              
            </div>
          </nav>
        </div>

        {/* Bottom Section (Logout) */}
        {user && (
          <div className="p-4 border-t border-gray-800">
            <button
              type="button"
              onClick={() => {
                setShowNav(false);
                handleLogout();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 font-semibold text-xs transition-colors border border-rose-500/20"
            >
              <LogOut size={16} />
              <span>Log Out</span>
            </button>
          </div>
        )}
      </aside>
    </>
  );
};

export default MobileNavbar;