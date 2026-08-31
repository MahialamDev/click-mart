import React from 'react';
import { Truck, ShieldCheck, RotateCcw } from 'lucide-react';

const ProductServiceBadges = () => {
  return (
    <div className="grid grid-cols-3 gap-2 pt-4 border-t border-base-200 text-center">
      <div className="p-3 bg-base-200/30 rounded-xl space-y-1">
        <Truck className="w-5 h-5 mx-auto text-primary" />
        <p className="text-[11px] font-bold text-base-content">Fast Shipping</p>
      </div>
      <div className="p-3 bg-base-200/30 rounded-xl space-y-1">
        <ShieldCheck className="w-5 h-5 mx-auto text-primary" />
        <p className="text-[11px] font-bold text-base-content">1 Year Warranty</p>
      </div>
      <div className="p-3 bg-base-200/30 rounded-xl space-y-1">
        <RotateCcw className="w-5 h-5 mx-auto text-primary" />
        <p className="text-[11px] font-bold text-base-content">7 Days Return</p>
      </div>
    </div>
  );
};

export default ProductServiceBadges;