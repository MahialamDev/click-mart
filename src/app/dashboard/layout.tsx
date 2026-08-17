import { getCurrentUser } from "@/lib/auth";
import Link from "next/link";
import React, { ReactNode } from "react";
import { IconType } from "react-icons";
import { CgProductHunt, CgProfile } from "react-icons/cg";
import { FaUserSecret } from "react-icons/fa6";

type sideLink = {
  href: string;
  label: string;
  icon: IconType;
};

// admin Link
const adminLink: sideLink[] = [
  { href: "/dashboard/profile", label: "Profile", icon: CgProfile },
  { href: "/dashboard/products", label: "Products", icon: CgProductHunt },
  { href: "/dashboard/users", label: "Users", icon: FaUserSecret },
];

// user link
const userLink: sideLink[] = [
  { href: "/dashboard/profile", label: "Profile", icon: CgProfile },
];

const Layout = async ({ children }: { children: ReactNode }) => {
  const user = await getCurrentUser();

  const renderLink: sideLink[] = user?.role === "USER" ? userLink : adminLink;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-slate-200 p-6 flex flex-col justify-between z-20 shadow-sm">
        <div>
          {/* Logo / Brand Name */}
          <div className="mb-8 px-2">
            <h2 className="text-xl font-bold text-slate-800 tracking-wide">
              Dashboard
            </h2>
          </div>

          {/* Navigation Links */}
          <div className="space-y-1.5">
            {renderLink.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 hover:text-blue-600 hover:bg-slate-100 font-medium text-sm transition-colors duration-200"
                >
                  <Icon className="text-lg shrink-0" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="ml-64 min-h-screen flex flex-col">
        {/* Top Navbar */}
        <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-slate-200 px-8 py-4 flex items-center justify-between">
          <h1 className="text-sm font-medium text-slate-600">
            Welcome, <span className="font-semibold text-slate-900">{user?.name || "User"}</span>
          </h1>
        </div>

        {/* Dynamic Children Content */}
        <div className="p-8 flex-1">{children}</div>
      </main>
    </div>
  );
};

export default Layout;