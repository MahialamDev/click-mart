import React from "react";

const ProductPageLoading = () => {
  return (
    <div className="space-y-6">
      {/* Header Skeleton */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="h-7 w-32 skeleton rounded-md"></div>
          <div className="h-4 w-48 skeleton rounded-md"></div>
        </div>
        <div className="h-10 w-32 skeleton rounded-xl"></div>
      </div>

      {/* Product Count Skeleton */}
      <div className="h-4 w-28 skeleton rounded-md"></div>

      {/* Products List Skeleton */}
      <div className="grid grid-cols-1 gap-4">
        {[...Array(5)].map((_, index) => (
          <div
            key={index}
            className="overflow-hidden border border-base-300 bg-base-100 rounded-2xl"
          >
            {/* ================= MOBILE SKELETON (Card Style) ================= */}
            <div className="block md:hidden p-4 space-y-4">
              {/* Image Skeleton */}
              <div className="h-48 w-full skeleton rounded-xl"></div>

              {/* Title & Category */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="h-5 w-20 skeleton rounded-md"></div>
                  <div className="h-4 w-14 skeleton rounded-md"></div>
                </div>
                <div className="h-6 w-3/4 skeleton rounded-md"></div>
                <div className="h-3 w-24 skeleton rounded-md"></div>
              </div>

              {/* Price */}
              <div className="h-6 w-28 skeleton rounded-md"></div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-3 pt-2 border-t border-base-300">
                <div className="h-8 skeleton rounded-md"></div>
                <div className="h-8 skeleton rounded-md"></div>
                <div className="h-8 skeleton rounded-md"></div>
                <div className="h-8 skeleton rounded-md"></div>
              </div>

              {/* Actions */}
              <div className="grid grid-cols-3 gap-2 pt-2">
                <div className="h-9 skeleton rounded-xl"></div>
                <div className="h-9 skeleton rounded-xl"></div>
                <div className="h-9 skeleton rounded-xl"></div>
              </div>
            </div>

            {/* ================= DESKTOP SKELETON (Row Style) ================= */}
            <div className="hidden md:flex items-center justify-between p-4">
              {/* Left: Image & Title Info */}
              <div className="flex items-center gap-4 w-1/3">
                <div className="h-16 w-16 skeleton rounded-xl shrink-0"></div>
                <div className="space-y-2 w-full">
                  <div className="h-4 w-16 skeleton rounded-md"></div>
                  <div className="h-5 w-3/4 skeleton rounded-md"></div>
                  <div className="h-3 w-24 skeleton rounded-md"></div>
                </div>
              </div>

              {/* Center-Left: Stock & Rating */}
              <div className="flex items-center gap-6 w-1/5">
                <div className="space-y-1">
                  <div className="h-3 w-10 skeleton rounded-md"></div>
                  <div className="h-5 w-20 skeleton rounded-md"></div>
                </div>
                <div className="space-y-1">
                  <div className="h-3 w-10 skeleton rounded-md"></div>
                  <div className="h-5 w-14 skeleton rounded-md"></div>
                </div>
              </div>

              {/* Center-Right: Pricing */}
              <div className="flex items-center gap-6 w-1/4">
                <div className="space-y-1">
                  <div className="h-3 w-16 skeleton rounded-md"></div>
                  <div className="h-6 w-20 skeleton rounded-md"></div>
                </div>
                <div className="space-y-1">
                  <div className="h-3 w-16 skeleton rounded-md"></div>
                  <div className="h-5 w-16 skeleton rounded-md"></div>
                </div>
              </div>

              {/* Right: Actions */}
              <div className="flex items-center justify-end gap-2 w-1/5">
                <div className="h-8 w-8 skeleton rounded-lg"></div>
                <div className="h-8 w-8 skeleton rounded-lg"></div>
                <div className="h-8 w-8 skeleton rounded-lg"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductPageLoading;