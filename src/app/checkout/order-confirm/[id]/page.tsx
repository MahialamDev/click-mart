'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  CheckCircle2, 
  PackageCheck, 
  Truck, 
  ArrowRight, 
  Home, 
  Copy, 
  Clock 
} from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function ConfirmOrderThanksPage() {
  const params = useParams();
  const router = useRouter();

  // URL route param extract
  const orderId = params?.orderId ? decodeURIComponent(params.orderId as string) : 'N/A';

  const handleCopyOrderId = () => {
    navigator.clipboard.writeText(orderId);
    toast.success('Order ID copied to clipboard!');
  };

  return (
    <div className="bg-base-200 min-h-screen py-12 px-4 sm:px-6 flex items-center justify-center font-sans text-base-content">
      <div className="max-w-2xl w-full bg-base-100 border border-base-300 rounded-3xl p-6 sm:p-10 shadow-xl space-y-8 text-center">
        
        {/* Animated Success Icon Badge */}
        <div className="relative mx-auto w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center">
          <CheckCircle2 className="w-12 h-12 text-primary animate-bounce" />
        </div>

        {/* Header Heading */}
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            Thank You for Your Order!
          </h1>
          <p className="text-xs sm:text-sm text-base-content/70 max-w-md mx-auto">
            Your order has been successfully placed and is now being processed by our team.
          </p>
        </div>

        {/* Order ID Box */}
        <div className="bg-base-200/80 border border-base-300 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-3 max-w-lg mx-auto">
          <div className="text-left space-y-0.5">
            <span className="text-[10px] uppercase font-bold text-base-content/60 tracking-wider">
              Order Reference ID
            </span>
            <p className="text-lg font-black text-primary font-mono">{orderId}</p>
          </div>

          <button
            onClick={handleCopyOrderId}
            className="btn btn-sm btn-ghost border border-base-300 rounded-xl gap-2 text-xs hover:bg-base-300"
          >
            <Copy className="w-3.5 h-3.5" /> Copy ID
          </button>
        </div>

        {/* Order Steps Status Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-left">
          <div className="bg-base-200/50 border border-base-300 p-3.5 rounded-xl space-y-1">
            <div className="flex items-center gap-2 text-primary font-bold text-xs">
              <Clock className="w-4 h-4" /> Processing
            </div>
            <p className="text-[10px] text-base-content/70">Order verification in progress</p>
          </div>

          <div className="bg-base-200/50 border border-base-300 p-3.5 rounded-xl space-y-1">
            <div className="flex items-center gap-2 text-primary font-bold text-xs">
              <PackageCheck className="w-4 h-4" /> Packaging
            </div>
            <p className="text-[10px] text-base-content/70">Preparing items for dispatch</p>
          </div>

          <div className="bg-base-200/50 border border-base-300 p-3.5 rounded-xl space-y-1">
            <div className="flex items-center gap-2 text-primary font-bold text-xs">
              <Truck className="w-4 h-4" /> Shipping
            </div>
            <p className="text-[10px] text-base-content/70">Delivery within 2-3 days</p>
          </div>
        </div>

        {/* Navigation Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-base-300">
          <Link
            href="/"
            className="btn btn-ghost border border-base-300 w-full sm:w-1/2 rounded-xl text-xs font-bold gap-2"
          >
            <Home className="w-4 h-4" /> Back to Home
          </Link>

          <Link
            href={`/user/orders/${orderId}`}
            className="btn btn-primary text-primary-content w-full sm:w-1/2 rounded-xl text-xs font-bold gap-2 uppercase tracking-wider"
          >
            Track Parcel <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </div>
  );
}