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
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { logoutUser } from "@/lib/client-auth";
import { logout } from "@/redux/features/auth/authSlice";
import { MdDashboard } from "react-icons/md";

const links = (
  <>
    <Link
      href="/"
      className="px-3 py-2 rounded-md hover:bg-gray-100 hover:text-blue-600"
    >
      Home
    </Link>
    <Link
      href="/categories"
      className="px-3 py-2 rounded-md hover:bg-gray-100 hover:text-blue-600"
    >
      Categories
    </Link>
    <Link
      href="/deals"
      className="px-3 py-2 rounded-md hover:bg-gray-100 hover:text-blue-600"
    >
      Deals
    </Link>
    <Link
      href="/wishlist"
      className="px-3 py-2 rounded-md hover:bg-gray-100 hover:text-blue-600"
    >
      Wishlist
    </Link>
    <Link
      href="/login"
      className="px-3 py-2 rounded-md hover:bg-gray-100 hover:text-blue-600"
    >
      Account
    </Link>
  </>
);

const hiddenNav = ['/dashboard']

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const user = useSelector((state: RootState) => state.auth.user);
  const loading = useSelector((state: RootState) => state.auth.loading);
  const dispatch = useDispatch();

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

  const pathname = usePathname();
  if (hiddenNav.some((route) => pathname.startsWith(route))) { 
    return null;
  }

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link
              href="/"
              className="text-2xl font-bold text-gray-900 flex items-center gap-1"
            >
              Click<span className="text-blue-600">Mart</span>
            </Link>
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
            {links}
          </div>

          {/* Right Action Icons */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/wishlist" className="text-gray-700 hover:text-blue-600 relative">
              <Heart className="h-6 w-6" />
            </Link>
            <Link href="/cart" className="text-gray-700 hover:text-blue-600 relative">
              <ShoppingCart className="h-6 w-6" />
              <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                0
              </span>
            </Link>

            {loading ? (
             <span className="loading loading-spinner text-primary"></span>
            ) : user ? (
              /* Profile Dropdown Start */
              <div className="dropdown dropdown-end">
                {/* Avatar Button */}
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar border-2 border-blue-500 bg-blue-100 hover:bg-blue-200 transition-all duration-200 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                >
                  <span className="text-blue-700 font-extrabold text-base uppercase">
                    {user?.name?.charAt(0) || "U"}
                  </span>
                </div>

                {/* Dropdown Content */}
                <div
                  tabIndex={0}
                  className="dropdown-content menu z-[50] mt-3 w-64 p-3 shadow-2xl bg-base-100 border border-base-200 rounded-2xl space-y-3"
                >
                  {/* User Header Info */}
                  <div className="flex items-center gap-3 px-2 py-1">
                    <div className="w-10 h-10 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-lg shadow-md shrink-0">
                      {user?.name?.charAt(0)?.toUpperCase() || "U"}
                    </div>
                    <div className="overflow-hidden">
                      <h4 className="font-bold text-base-content text-sm truncate leading-tight">
                        {user?.name || "User Name"}
                      </h4>
                      <p className="text-xs text-base-content/60 truncate mt-0.5">
                        {user?.email || "user@example.com"}
                      </p>
                    </div>
                  </div>

                  <div className="divider my-0 h-[1px] bg-base-200"></div>

                  {/* Menu Items */}
                  <ul className="menu p-0 gap-1 text-sm font-medium">
                    <li>
                      <Link
                        href="/profile"
                        className="py-2.5 px-3 rounded-xl hover:bg-base-200 transition-colors"
                      >
                        <User className="w-4 h-4 text-base-content/70" />
                        My Profile
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/dashboard"
                        className="py-2.5 px-3 rounded-xl hover:bg-base-200 transition-colors"
                      >
                        <MdDashboard className="w-4 h-4 text-base-content/70" />
                        Dashboard
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/settings"
                        className="py-2.5 px-3 rounded-xl hover:bg-base-200 transition-colors"
                      >
                        <Settings className="w-4 h-4 text-base-content/70" />
                        Settings
                      </Link>
                    </li>
                  </ul>

                  <div className="divider my-0 h-[1px] bg-base-200"></div>

                  {/* Logout Button */}
                  <button
                    onClick={handleLogout}
                    className="w-full btn btn-error btn-soft btn-sm flex items-center justify-center gap-2 rounded-xl text-xs font-semibold py-2.5"
                  >
                    <LogOut className="w-4 h-4" />
                    Log Out
                  </button>
                </div>
              </div>
              /* Profile Dropdown End */
            ) : (
              <Link
                href="/login"
                className="text-gray-700 hover:text-blue-600 flex items-center justify-center"
              >
                <User className="h-6 w-6" />
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-4">
            <Link href="/cart" className="text-gray-700 relative">
              <ShoppingCart className="h-6 w-6" />
              <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                0
              </span>
            </Link>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-blue-600 focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
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
            {links}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;