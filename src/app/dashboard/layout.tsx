import { getCurrentUser } from "@/lib/auth";
import Link from "next/link";
import React, { ReactNode } from "react";

import SidebarNav from "./SidebarNav";
import MobileSideNav from "./MobileSideNav";
import { HiOutlineSparkles, HiShieldCheck } from "react-icons/hi2";
import { FiLogOut, FiMoon, FiSun } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";

type sideLink = {
  href: string;
  label: string;
  icon: "profile" | "product" | "dashboard" | "users";
};

// admin Link
const adminLink: sideLink[] = [
  { href: "/dashboard/profile", label: "Profile", icon: "profile" },
  { href: "/dashboard/products", label: "Products", icon: "dashboard" },
  { href: "/dashboard/users", label: "Users", icon: "users" },
];

// user link
const userLink: sideLink[] = [
  { href: "/dashboard", label: "Dashboard", icon: "dashboard" },
  { href: "/dashboard/profile", label: "Profile", icon: "profile" },
];

const Layout = async ({ children }: { children: ReactNode }) => {
  const user = await getCurrentUser();

  const renderLink: sideLink[] = user?.role === "USER" ? userLink : adminLink;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Desktop Sidebar (Light Theme) */}
      <aside className="hidden md:fixed left-0 top-0 h-screen w-64 bg-white text-slate-800 border-r border-slate-200 p-5 md:flex flex-col justify-between z-20 shadow-sm">
        {/* Top Section: Brand & Nav */}
        <div className="space-y-6">
          {/* Brand / Logo Header */}
          <div className="flex items-center justify-between px-2 py-1 border-b border-slate-100 pb-4">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
                <HiOutlineSparkles className="h-5 w-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-base font-bold tracking-tight text-slate-900 leading-none">
                  NextMart
                </span>
                <span className="text-[10px] text-indigo-600 font-semibold tracking-wider uppercase mt-1">
                  Admin Console
                </span>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            <SidebarNav links={renderLink} />
          </nav>
        </div>

        {/* Bottom Section: Theme Toggle, User Card & Logout */}
        <div className="space-y-4 pt-4 border-t border-slate-100">
          {/* Theme Switcher Toggle (Light Mode Active) */}
          <div className="flex items-center justify-between bg-slate-100 p-1 rounded-xl border border-slate-200/60">
            <button
              type="button"
              className="flex-1 flex items-center justify-center gap-2 py-1.5 text-xs font-semibold rounded-lg text-slate-500 hover:text-slate-800 transition-colors"
            >
              <FiMoon className="h-3.5 w-3.5" />
              <span>Dark</span>
            </button>
            <button
              type="button"
              className="flex-1 flex items-center justify-center gap-2 py-1.5 text-xs font-semibold rounded-lg bg-white text-indigo-600 shadow-xs border border-slate-200/80 transition-all"
            >
              <FiSun className="h-3.5 w-3.5" />
              <span>Light</span>
            </button>
          </div>

          {/* Compact Profile Summary */}
          <div className="flex items-center gap-3 p-2 rounded-xl bg-slate-50 border border-slate-100">
            <div className="relative">
              <div className="h-9 w-9 rounded-lg bg-indigo-50 text-indigo-600 border border-indigo-100 flex items-center justify-center font-bold text-sm">
                {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
              </div>
              <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
            </div>
            <div className="flex flex-col truncate flex-1">
              <span className="text-xs font-semibold text-slate-800 truncate">
                {user?.name || "Developer"}
              </span>
              <span className="text-[10px] text-slate-500 flex items-center gap-1 font-medium">
                <HiShieldCheck className="text-indigo-600 h-3 w-3" />
                {user?.role || "USER"}
              </span>
            </div>
          </div>

          {/* Logout Button */}
          <button
            type="button"
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-semibold text-rose-600 hover:text-white bg-rose-50 hover:bg-rose-600 border border-rose-100 hover:border-transparent transition-all duration-200 shadow-2xs"
          >
            <FiLogOut className="h-4 w-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="md:ml-64 min-h-screen flex flex-col">
        {/* Top Navbar */}
        <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-slate-200/80 px-4 md:px-8 py-3.5 flex items-center justify-between shadow-xs">
          {/* Left: Greeting & Role Badge */}
          <div className="flex items-center gap-3">
            {/* User Avatar Placeholder / Icon */}
            <div className="hidden sm:flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-600 ring-1 ring-slate-200">
              <CgProfile className="h-5 w-5" />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
              <h1 className="text-sm md:text-base font-semibold text-slate-800">
                Welcome back,{" "}
                <span className="text-indigo-600 font-bold ">
                  {user?.name || "User"}
                </span>
              </h1>

              {/* Role Badge */}
              <span className="hidden md:inline-flex items-center w-max px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wide uppercase bg-indigo-50 text-indigo-700 ring-1 ring-inset ring-indigo-600/20">
                {user?.role || "USER"}
              </span>
            </div>
          </div>

          {/* Right Action Menu: Notifications, Profile Link & Mobile Toggle */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Notification Icon */}
            <button
              type="button"
              aria-label="View notifications"
              className="relative p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              {/* Notification Dot */}
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-indigo-600 ring-2 ring-white" />
            </button>

            {/* Profile Quick Link */}
            <Link
              href="/dashboard/profile"
              className="hidden sm:flex items-center gap-2 p-1.5 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
            >
              <div className="h-7 w-7 rounded-full bg-indigo-600 text-white flex items-center justify-center font-semibold text-xs">
                {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
              </div>
            </Link>

            {/* Mobile Navigation */}
            <div className="md:hidden border-l border-slate-200 pl-2">
              <MobileSideNav links={renderLink} />
            </div>
          </div>
        </div>

        {/* Dynamic Children Content */}
        <div className="p-4 md:p-8 flex-1 ">{children}</div>
      </main>
    </div>
  );
};

export default Layout;
