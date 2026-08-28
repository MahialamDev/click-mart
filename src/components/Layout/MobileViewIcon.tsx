'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Grid, ShoppingBag, Flame, User } from 'lucide-react';

const navItems = [
  { label: 'Home', href: '/', icon: Home },
  { label: 'Categories', href: '/categories', icon: Grid },
  { label: 'Cart', href: '/cart', icon: ShoppingBag, badge: 2 }, // Cart counter badge
  { label: 'Deals', href: '/hot-deals', icon: Flame },
  { label: 'Account', href: '/account', icon: User },
];

const MobileViewIcon = () => {
  const pathname = usePathname();

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-slate-950/95 backdrop-blur-md border-t border-slate-800 z-50 px-2 py-2 shadow-lg">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.label}
              href={item.href}
              className={`relative flex flex-col items-center justify-center w-full py-1 text-xs font-medium transition-colors ${
                isActive ? 'text-amber-400 font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 mb-0.5 ${isActive ? 'stroke-[2.5px]' : 'stroke-2'}`} />
                {item.badge && item.badge > 0 && (
                  <span className="absolute -top-1.5 -right-2 bg-amber-400 text-slate-950 text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] tracking-tight">{item.label}</span>

              {/* Active Indicator Bar */}
              {isActive && (
                <span className="absolute -bottom-1 w-5 h-0.5 bg-amber-400 rounded-full" />
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default MobileViewIcon;