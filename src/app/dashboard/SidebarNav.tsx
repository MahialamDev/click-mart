'use client'
import Link from 'next/link';
import { CgProductHunt, CgProfile } from "react-icons/cg";
import { FaUserSecret } from "react-icons/fa6";
import { MdDashboard } from "react-icons/md";
import { usePathname } from 'next/navigation';

import React from 'react';


type SideLink = {
  href: string;
  label: string;
  icon:  "profile" | "product" | "dashboard" | "users";
};

const SidebarNav = ({ links }: { links: SideLink[] }) => {
  const pathName = usePathname();
  console.log(pathName)
  // all icons
  const icons = {
    profile: CgProfile,
    product: CgProductHunt,
    dashboard: MdDashboard,
    users: FaUserSecret
  }
    return (
         <div className="space-y-1.5">
        {links.map((link) => {
          const Icon = icons[link.icon];
          const isActive = link.href === '/dashboard'
            ? pathName === '/dashboard'
            : pathName.startsWith(link.href)
          
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-3 py-2.5 ${isActive ? 'text-blue-600' : 'text-slate-600 '} rounded-lg hover:text-blue-600 hover:bg-slate-100 font-medium text-sm transition-colors duration-200 `}
                >
                  <Icon className="text-lg shrink-0" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </div>
    );
};

export default SidebarNav;