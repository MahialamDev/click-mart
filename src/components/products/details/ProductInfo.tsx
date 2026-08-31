import React from 'react';
import { Star } from 'lucide-react';

interface ProductInfoProps {
  title: string;
  brand: string;
  sku: string;
  rating: number;
  totalReviews: number;
  totalSold: number;
  stock: number;
  price: number;
  originalPrice?: number | null;
}

const ProductInfo = ({
  title,
  brand,
  sku,
  rating,
  totalReviews,
  totalSold,
  stock,
  price,
  originalPrice,
}: ProductInfoProps) => {
  return (
    <div className="space-y-6">
      {/* Title & Brand Meta */}
      <div>
        <div className="flex items-center justify-between text-xs text-base-content/60 mb-2">
          <span>
            Brand: <strong className="text-base-content">{brand}</strong>
          </span>
          <span>SKU: {sku}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-base-content leading-snug">
          {title}
        </h1>
      </div>

      {/* Ratings and Stock */}
      <div className="flex flex-wrap items-center gap-4 text-xs">
        <div className="flex items-center gap-1 bg-amber-400/10 px-2.5 py-1 rounded-lg text-amber-600 font-bold">
          <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
          <span>{rating}</span>
          <span className="text-base-content/60 font-normal">
            ({totalReviews} reviews)
          </span>
        </div>
        <div className="text-base-content/70">
          <strong className="text-base-content">{totalSold}</strong> Sold
        </div>
        <div
          className={`badge ${
            stock > 0 ? 'badge-success text-white' : 'badge-error text-white'
          } font-semibold`}
        >
          {stock > 0 ? `In Stock (${stock} left)` : 'Out of Stock'}
        </div>
      </div>

      {/* Price Block */}
      <div className="flex items-baseline gap-3 p-4 bg-base-200/40 rounded-2xl border border-base-200">
        <span className="text-3xl font-black text-base-content">
          ${price.toFixed(2)}
        </span>
        {originalPrice && originalPrice > price && (
          <span className="text-base text-base-content/40 line-through">
            ${originalPrice.toFixed(2)}
          </span>
        )}
      </div>
    </div>
  );
};

export default ProductInfo;