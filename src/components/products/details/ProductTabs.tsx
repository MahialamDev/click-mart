'use client';

import React, { useState } from 'react';

interface ProductTabsProps {
  reviewCount: number;
  descriptionChild: React.ReactNode;
  reviewsChild: React.ReactNode;
}

const ProductTabs = ({
  reviewCount,
  descriptionChild,
  reviewsChild,
}: ProductTabsProps) => {
  const [activeTab, setActiveTab] = useState<'description' | 'reviews'>('description');

  return (
    <div className="bg-base-100 border border-base-200 rounded-2xl p-6 sm:p-8 space-y-6">
      {/* Navigation Headers */}
      <div className="flex border-b border-base-200 gap-8">
        <button
          type="button"
          onClick={() => setActiveTab('description')}
          className={`pb-4 text-sm font-bold border-b-2 transition-colors ${
            activeTab === 'description'
              ? 'border-primary text-primary'
              : 'border-transparent text-base-content/60 hover:text-base-content'
          }`}
        >
          Description & Features
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('reviews')}
          className={`pb-4 text-sm font-bold border-b-2 transition-colors ${
            activeTab === 'reviews'
              ? 'border-primary text-primary'
              : 'border-transparent text-base-content/60 hover:text-base-content'
          }`}
        >
          Customer Reviews ({reviewCount})
        </button>
      </div>

      {/* Tab Panels */}
      <div>
        {activeTab === 'description' && descriptionChild}
        {activeTab === 'reviews' && reviewsChild}
      </div>
    </div>
  );
};

export default ProductTabs;