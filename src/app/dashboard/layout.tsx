import { getCurrentUser } from "@/lib/auth";
import Link from "next/link";
import React, { ReactNode } from "react";
import { IconType } from "react-icons";
import { CgProductHunt, CgProfile } from "react-icons/cg";

import { MdDashboard } from "react-icons/md";
import SidebarNav from "./SidebarNav";
import MobileSideNav from "./MobileSideNav";

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
      {/*Desktop Sidebar */}
      <aside className="hidden md:fixed  left-0 top-0 h-screen w-64 bg-white border-r border-slate-200 p-6 md:flex flex-col justify-between z-20 shadow-sm">
        <div>
          {/* Logo / Brand Name */}
          <div className="mb-8 px-2">
            <h2 className="text-xl font-bold text-slate-800 tracking-wide">
              Dashboard
            </h2>
          </div>

          <>
            <SidebarNav links={renderLink} />
          </>
        </div>
      </aside>

      {/* Mobile Side nav */}
      <div className="h-screen w-[75%] fixed top-0 left-0 border z-99">
          
      </div>

      {/* Main Content Area */}
      <main className="md:ml-64 min-h-screen flex flex-col">
        {/* Top Navbar */}
        <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-slate-200 px-4 md:px-8 py-4 flex items-center justify-between">
          <h1 className="text-sm font-medium text-slate-600">
            Welcome,{" "}
            <span className="font-semibold text-slate-900">
              {user?.name || "User"}
            </span>
          </h1>

          <MobileSideNav />
        </div>

        {/* Dynamic Children Content */}
        <div className="p-4 md:p-8 flex-1 ">{children}</div>
      </main>
    </div>
  );
};

export default Layout;
