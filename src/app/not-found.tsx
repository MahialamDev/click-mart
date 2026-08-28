'use client';

import React from 'react';
import Link from 'next/link';
import { Home, ArrowLeft, Search, ShieldAlert } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="bg-base-200 min-h-[calc(100%-140px)] py-12 px-4 sm:px-6 flex items-center justify-center font-sans text-base-content">
      <div className="max-w-xl w-full bg-base-100 border border-base-300 rounded-3xl p-6 sm:p-10 shadow-xl space-y-6 text-center">
        
        {/* 404 Visual Badge */}
        <div className="relative mx-auto w-24 h-24 bg-primary/10 border border-primary/20 rounded-full flex items-center justify-center">
          <ShieldAlert className="w-12 h-12 text-primary animate-pulse" />
          <span className="absolute -bottom-2 px-3 py-0.5 text-[10px] font-black uppercase bg-secondary text-secondary-content rounded-full">
            Error 404
          </span>
        </div>

        {/* Big 404 Text & Heading */}
        <div className="space-y-2">
          <h1 className="text-6xl sm:text-7xl font-black text-primary tracking-tight font-mono">
            404
          </h1>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
            Page Not Found
          </h2>
          <p className="text-xs sm:text-sm text-base-content/70 max-w-md mx-auto leading-relaxed">
            Oops! The page you are looking for might have been removed, renamed, or is temporarily unavailable.
          </p>
        </div>

        {/* Quick Search / Helpful Suggestion Box */}
        <div className="bg-base-200/80 border border-base-300 rounded-2xl p-4 text-left space-y-2">
          <p className="text-xs font-bold text-base-content/80 flex items-center gap-1.5">
            <Search className="w-3.5 h-3.5 text-primary" /> What can you do?
          </p>
          <ul className="text-[11px] text-base-content/70 space-y-1 list-disc list-inside">
            <li>Double-check the web address for typos.</li>
            <li>Go back to our homepage and start fresh.</li>
            <li>Explore our available product catalog or account services.</li>
          </ul>
        </div>

        {/* Navigation Actions */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            onClick={() => window.history.back()}
            className="btn btn-ghost border border-base-300 w-full sm:w-1/2 rounded-xl text-xs font-bold gap-2"
          >
            <ArrowLeft className="w-4 h-4" /> Go Back
          </button>

          <Link
            href="/"
            className="btn btn-primary text-primary-content w-full sm:w-1/2 rounded-xl text-xs font-bold gap-2 uppercase tracking-wider"
          >
            <Home className="w-4 h-4" /> Return Home
          </Link>
        </div>

      </div>
    </div>
  );
}