"use client";

import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import DeviceInfo from "@/components/DeviceInfo";
import Image from "next/image";
import {
  Mail,
  ShieldCheck,
  Calendar,
  Pencil,
  X,
  User as UserIcon,
  Camera,
} from "lucide-react";

const ProfilePage = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  
  // Edit Modal State
  const [isEditOpen, setIsEditOpen] = useState(false);
  
  // Edit Form Inputs State (Future API integration)
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    imageUrl: user?.imageUrl || "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: আপনার Profile Update API এখানে ইন্টিগ্রেট করবেন
    console.log("Updated Profile Data:", formData);
    setIsEditOpen(false);
  };

  // Date Formatting (e.g., Aug 07, 2026)
  const formattedDate = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "2-digit",
      })
    : "N/A";

  return (
    <div className="min-h-screen bg-slate-50/50 py-8 sm:px-6 lg:px-8">
      <div className=" space-y-8">
        
        {/* Main Profile Header Card */}
        <div className="bg-white border border-slate-200/80 rounded-3xl shadow-sm overflow-hidden">
          {/* Cover Banner */}
          <div className="h-44 sm:h-52 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 relative">
            <button
              onClick={() => setIsEditOpen(true)}
              className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white px-4 py-2 rounded-xl text-xs sm:text-sm font-medium flex items-center gap-2 transition-all shadow-sm"
            >
              <Pencil className="w-4 h-4" />
              Edit Profile
            </button>
          </div>

          {/* Profile Details Bar */}
          <div className="px-6 sm:px-8 pb-8 pt-0 relative">
            <div className="flex flex-col sm:flex-row items-center sm:items-end justify-between -mt-16 sm:-mt-20 gap-4 mb-6">
              
              {/* Profile Image Avatar */}
              <div className="relative group">
                <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full border-4 border-white bg-slate-100 shadow-md overflow-hidden relative flex items-center justify-center">
                  {user?.imageUrl ? (
                    <Image
                      src={user.imageUrl}
                      alt={user?.name || "User Avatar"}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <span className="text-4xl font-extrabold text-blue-600 uppercase">
                      {user?.name?.charAt(0) || "U"}
                    </span>
                  )}
                </div>
                <button
                  onClick={() => setIsEditOpen(true)}
                  className="absolute bottom-1 right-1 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full shadow-lg transition-transform hover:scale-105"
                  title="Change Avatar"
                >
                  <Camera className="w-4 h-4" />
                </button>
              </div>

              {/* Role Badge */}
              <div className="sm:self-end">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  {user?.role || "USER"}
                </span>
              </div>
            </div>

            {/* Name & Basic Info */}
            <div className="space-y-1 text-center sm:text-left">
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
                {user?.name || "User Name"}
              </h1>
              <p className="text-slate-500 text-sm flex items-center justify-center sm:justify-start gap-1.5">
                <Mail className="w-4 h-4 text-slate-400" />
                {user?.email || "email@example.com"}
              </p>
            </div>
          </div>
        </div>

        {/* Content Layout Grid (Account Details + Device Diagnostics) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Account Overview Card (Left 2 Columns) */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
              <h2 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-4">
                Account Information
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                  <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Full Name</span>
                  <p className="text-sm font-semibold text-slate-800">{user?.name || "N/A"}</p>
                </div>

                {/* Email Address */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                  <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Email Address</span>
                  <p className="text-sm font-semibold text-slate-800 truncate">{user?.email || "N/A"}</p>
                </div>

                {/* Account Role */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                  <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Account Role</span>
                  <p className="text-sm font-semibold text-slate-800">{user?.role || "USER"}</p>
                </div>

                {/* Joined Date */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                  <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Joined Date</span>
                  <p className="text-sm font-semibold text-slate-800 flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-slate-400" />
                    {formattedDate}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Device Information Card (Right 1 Column) */}
          <div className="lg:col-span-1">
            <DeviceInfo />
          </div>
        </div>

      </div>

      {/* Edit Profile Modal */}
      {isEditOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white border border-slate-200 rounded-3xl w-full max-w-md p-6 shadow-2xl space-y-6">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-900">Edit Profile</h3>
              <button
                onClick={() => setIsEditOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSaveProfile} className="space-y-4">
              {/* Name Field */}
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                  Full Name
                </label>
                <div className="relative">
                  <UserIcon className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    placeholder="Enter your name"
                    required
                  />
                </div>
              </div>

              {/* Image URL Field */}
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                  Profile Image URL
                </label>
                <div className="relative">
                  <Camera className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    name="imageUrl"
                    value={formData.imageUrl}
                    onChange={handleInputChange}
                    className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsEditOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md transition-all"
                >
                  Save Changes
                </button>
              </div>
            </form>

          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;