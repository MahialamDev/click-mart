"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Menu,
  X,
  LogOut,
  Home,
  Sun,
  Moon,
  User,
  Package,
  LayoutDashboard,
  Users,
} from "lucide-react";
import { usePathname } from "next/navigation";

type SideLink = {
  href: string;
  label: string;
  icon: "profile" | "product" | "dashboard" | "users";
};

const iconMap = {
  dashboard: LayoutDashboard,
  product: Package,
  users: Users,
  profile: User,
};

interface MobileSideNavProps {
  links: SideLink[];
  onLogout?: () => void;
}

const MobileSideNav = ({ links, onLogout }: MobileSideNavProps) => {
  const [showNav, setShowNav] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const pathName = usePathname()

  // Toggle Theme Logic
  const toggleTheme = () => {
  setIsDarkMode((prev) => {
    const newMode = !prev;
    document.documentElement.setAttribute("data-theme", newMode ? "dark" : "light");
    return newMode;
  });
};

  return (
    <>
      {/* Menu Button */}
      <button
        type="button"
        onClick={() => setShowNav(true)}
        className="md:hidden p-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        aria-label="Open menu"
      >
        <Menu size={24} />
      </button>

      {/* Overlay */}
      {showNav && (
        <div
          onClick={() => setShowNav(false)}
          className="fixed h-screen inset-0 bg-slate-900/50 backdrop-blur-xs z-40 md:hidden transition-opacity"
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen w-[75%] max-w-72 bg-white dark:bg-slate-900 z-50 shadow-2xl flex flex-col justify-between
        transform transition-transform duration-300 ease-in-out md:hidden
        ${showNav ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Top Content */}
        <div>
          {/* Header */}
          <div className="flex items-center justify-between p-5 border-b border-slate-100 dark:border-slate-800">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
              Dashboard
            </h2>

            <button
              type="button"
              onClick={() => setShowNav(false)}
              className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Close menu"
            >
              <X size={22} />
            </button>
          </div>

          {/* Quick Nav Options (Home & Theme Toggle) */}
          <div className="p-4 grid grid-cols-2 gap-2 border-b border-slate-100 dark:border-slate-800">
            {/* Go to Home */}
            <Link
              href="/"
              onClick={() => setShowNav(false)}
              className="flex items-center justify-center gap-2 py-2 px-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200/80 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold rounded-xl transition-colors"
            >
              <Home size={15} />
              <span>Home</span>
            </Link>

            {/* Dark / Light Toggle */}
            <button
              type="button"
              onClick={toggleTheme}
              className="flex items-center justify-center gap-2 py-2 px-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200/80 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold rounded-xl transition-colors"
            >
              {isDarkMode ? (
                <>
                  <Sun size={15} className="text-amber-400" />
                  <span>Light</span>
                </>
              ) : (
                <>
                  <Moon size={15} className="text-indigo-500" />
                  <span>Dark</span>
                </>
              )}
            </button>
          </div>

          {/* Links Nav */}
          <nav className="p-4 space-y-1">
            <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
              Menu Navigation
            </p>
            {links.map((link) => {
              const IconComponent = iconMap[link.icon] || LayoutDashboard;
              const isActive = link.href === '/dashboard' 
                              ? pathName === '/dashboard' : pathName.startsWith(link.href)
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setShowNav(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl ${isActive ? 'text-blue-600' : 'text-slate-600 '} dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50/60 dark:hover:bg-slate-800/80 font-medium text-sm transition-all`}
                >
                  <IconComponent size={18} className="text-slate-400 dark:text-slate-500" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Section (Log Out) */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800">
          <button
            type="button"
            onClick={() => {
              setShowNav(false);
              if (onLogout) onLogout();
            }}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-900/40 font-semibold text-sm transition-colors border border-rose-100 dark:border-rose-900/30"
          >
            <LogOut size={18} />
            <span>Log Out</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default MobileSideNav;