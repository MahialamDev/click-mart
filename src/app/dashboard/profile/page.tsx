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
  Sparkles,
  UserCheck,
} from "lucide-react";

const ProfilePage = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  
  // Edit Modal State
  const [isEditOpen, setIsEditOpen] = useState(false);
  
  // Edit Form Inputs State
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
    console.log("Updated Profile Data:", formData);
    setIsEditOpen(false);
  };

  // Date Formatting
  const formattedDate = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "2-digit",
      })
    : "N/A";

  return (
    <div className="min-h-screen bg-base-200 py-8 px-4 sm:px-6 lg:px-8 text-base-content font-sans">
      <div className=" mx-auto space-y-8">
        
        {/* Main Profile Header Card */}
        <div className="bg-base-100 border border-base-300 rounded-3xl shadow-xl overflow-hidden relative">
          
          {/* Electbox Gradient Cover Banner */}
          <div className="h-48 sm:h-60 bg-gradient-to-r from-secondary via-neutral to-secondary relative overflow-hidden">
            {/* Background Decorative Element */}
            <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#FFCC00_1px,transparent_1px)] [background-size:16px_16px]"></div>
            
            {/* Edit Button */}
            <button
              onClick={() => setIsEditOpen(true)}
              className="absolute top-5 right-5 bg-base-100/15 hover:bg-base-100/30 backdrop-blur-md text-secondary-content px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all shadow-lg border border-white/20 hover:scale-105 active:scale-95"
            >
              <Pencil className="w-4 h-4 text-primary" />
              Edit Profile
            </button>
          </div>

          {/* Profile Details Bar */}
          <div className="px-6 sm:px-10 pb-8 pt-0 relative">
            <div className="flex flex-col sm:flex-row items-center sm:items-end justify-between -mt-20 sm:-mt-24 gap-6 mb-6">
              
              {/* Profile Image Avatar */}
              <div className="relative group">
                <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-3xl border-4 border-base-100 bg-secondary text-secondary-content shadow-2xl overflow-hidden relative flex items-center justify-center transform group-hover:scale-[1.02] transition-all duration-300">
                  {user?.imageUrl ? (
                    <Image
                      src={user.imageUrl}
                      alt={user?.name || "User Avatar"}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-secondary to-neutral flex items-center justify-center">
                      <span className="text-5xl font-extrabold text-primary tracking-wider">
                        {user?.name?.charAt(0) || "U"}
                      </span>
                    </div>
                  )}
                </div>
                
                {/* Camera Overlay Icon */}
                <button
                  onClick={() => setIsEditOpen(true)}
                  className="absolute bottom-2 right-2 bg-primary hover:bg-primary/90 text-primary-content p-2.5 rounded-2xl shadow-lg transition-transform hover:scale-110 active:scale-95 border-2 border-base-100"
                  title="Change Avatar"
                >
                  <Camera className="w-4 h-4" />
                </button>
              </div>

              {/* Badges Stack */}
              <div className="sm:self-end flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-2xl text-xs font-bold bg-primary text-primary-content shadow-md shadow-primary/20">
                  <ShieldCheck className="w-4 h-4" />
                  {user?.role || "USER"}
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-2xl text-xs font-semibold bg-success/15 text-success border border-success/30">
                  <UserCheck className="w-3.5 h-3.5" />
                  Verified Account
                </span>
              </div>
            </div>

            {/* Name & Basic Info */}
            <div className="space-y-2 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <h1 className="text-3xl sm:text-4xl font-black text-base-content tracking-tight">
                  {user?.name || "User Name"}
                </h1>
                <Sparkles className="w-5 h-5 text-primary animate-pulse" />
              </div>
              <p className="text-base-content/70 text-sm font-medium flex items-center justify-center sm:justify-start gap-2">
                <Mail className="w-4 h-4 text-primary" />
                {user?.email || "email@example.com"}
              </p>
            </div>
          </div>
        </div>

        {/* Content Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Account Overview Card (Left 2 Columns) */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-base-100 border border-base-300 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
              
              <div className="flex items-center justify-between border-b border-base-300 pb-4">
                <h2 className="text-xl font-extrabold text-base-content flex items-center gap-2">
                  <span className="w-2.5 h-6 bg-primary rounded-full inline-block"></span>
                  Account Information
                </h2>
                <span className="text-xs font-semibold px-3 py-1 bg-base-200 text-base-content/70 rounded-xl border border-base-300">
                  Electbox Member
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Full Name */}
                <div className="p-5 rounded-2xl bg-base-200/60 border border-base-300 hover:border-primary/40 transition-colors space-y-1.5 group">
                  <span className="text-xs font-bold text-base-content/50 uppercase tracking-wider">Full Name</span>
                  <p className="text-base font-bold text-base-content group-hover:text-primary transition-colors">
                    {user?.name || "N/A"}
                  </p>
                </div>

                {/* Email Address */}
                <div className="p-5 rounded-2xl bg-base-200/60 border border-base-300 hover:border-primary/40 transition-colors space-y-1.5 group">
                  <span className="text-xs font-bold text-base-content/50 uppercase tracking-wider">Email Address</span>
                  <p className="text-base font-bold text-base-content truncate group-hover:text-primary transition-colors">
                    {user?.email || "N/A"}
                  </p>
                </div>

                {/* Account Role */}
                <div className="p-5 rounded-2xl bg-base-200/60 border border-base-300 hover:border-primary/40 transition-colors space-y-1.5">
                  <span className="text-xs font-bold text-base-content/50 uppercase tracking-wider">Account Role</span>
                  <div className="pt-0.5">
                    <span className="inline-block px-3 py-1 bg-secondary text-secondary-content text-xs font-bold rounded-xl shadow-sm">
                      {user?.role || "USER"}
                    </span>
                  </div>
                </div>

                {/* Joined Date */}
                <div className="p-5 rounded-2xl bg-base-200/60 border border-base-300 hover:border-primary/40 transition-colors space-y-1.5">
                  <span className="text-xs font-bold text-base-content/50 uppercase tracking-wider">Joined Date</span>
                  <p className="text-base font-bold text-base-content flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-primary" />
                    {formattedDate}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Device Information Card (Right 1 Column) */}
          <div className="lg:col-span-1">
            <div className="bg-base-100 border border-base-300 rounded-3xl p-1 shadow-xl">
              <DeviceInfo />
            </div>
          </div>
        </div>

      </div>

      {/* Edit Profile Modal */}
      {isEditOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-secondary/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-base-100 border border-base-300 rounded-3xl w-full max-w-md p-6 sm:p-8 shadow-2xl space-y-6">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-base-300">
              <h3 className="text-xl font-bold text-base-content flex items-center gap-2">
                <Pencil className="w-5 h-5 text-primary" />
                Edit Profile
              </h3>
              <button
                onClick={() => setIsEditOpen(false)}
                className="p-2 text-base-content/50 hover:text-base-content rounded-2xl hover:bg-base-200 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSaveProfile} className="space-y-5">
              {/* Name Field */}
              <div>
                <label className="block text-xs font-bold text-base-content/70 uppercase tracking-wider mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <UserIcon className="w-5 h-5 text-base-content/40 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full pl-11 pr-4 py-3 bg-base-200 border border-base-300 rounded-2xl text-sm font-semibold text-base-content placeholder:text-base-content/40 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="Enter your name"
                    required
                  />
                </div>
              </div>

              {/* Image URL Field */}
              <div>
                <label className="block text-xs font-bold text-base-content/70 uppercase tracking-wider mb-2">
                  Profile Image URL
                </label>
                <div className="relative">
                  <Camera className="w-5 h-5 text-base-content/40 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    name="imageUrl"
                    value={formData.imageUrl}
                    onChange={handleInputChange}
                    className="w-full pl-11 pr-4 py-3 bg-base-200 border border-base-300 rounded-2xl text-sm font-semibold text-base-content placeholder:text-base-content/40 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-5 border-t border-base-300">
                <button
                  type="button"
                  onClick={() => setIsEditOpen(false)}
                  className="px-5 py-2.5 text-xs font-bold text-base-content/70 hover:bg-base-200 rounded-2xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 text-xs font-bold text-primary-content bg-primary hover:bg-primary/90 rounded-2xl shadow-lg shadow-primary/20 transition-all active:scale-95 border-none"
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