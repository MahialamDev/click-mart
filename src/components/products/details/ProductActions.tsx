'use client';

import React, { useState } from 'react';
import { ShoppingCart, Heart, Share2, Check } from 'lucide-react';
import { ProductColor } from '@/types/product';
import { toast } from 'react-hot-toast';
import axiosInstance from '@/Hooks/axiosInstance';

interface ProductActionsProps {
  colors: ProductColor[];
  stock: number;
  id: string
}

const ProductActions = ({ colors, stock, id }: ProductActionsProps) => {
  const [selectedColor, setSelectedColor] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (type: 'inc' | 'dec') => {
    if (type === 'inc' && quantity < stock) setQuantity((prev) => prev + 1);
    if (type === 'dec' && quantity > 1) setQuantity((prev) => prev - 1);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: window.document.title,
          url: window.location.href,
        });
      } catch (err) {
        console.error('Share failed', err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    }
  };

  const handleAddToCart = async(productId:string) => { 
    const sendInfo = { 
      productId, quantity
    }
    const res = await axiosInstance.post(`/cart`, sendInfo)
    if (res?.data?.success) { 
      toast.success("Added To Cart")
    }
  }

  return (
    <div className="space-y-6 pt-2">
      {/* Color Selector */}
      {colors.length > 0 && (
        <div className="space-y-2">
          <label className="text-xs font-bold text-base-content uppercase tracking-wider block mb-3">
            Color:{' '}
            <span className="font-semibold text-primary">
              {colors[selectedColor]?.name}
            </span>
          </label>
          <div className="flex items-center gap-3">
            {colors.map((color, idx) => (
              <button
                key={color.id || idx}
                type="button"
                onClick={() => setSelectedColor(idx)}
                style={
                  !color.className
                    ? { backgroundColor: color.name.toLowerCase() }
                    : undefined
                }
                className={`w-8 h-8 rounded-full ${
                  color.className || ''
                } flex items-center justify-center border-2 transition-all ${
                  selectedColor === idx
                    ? 'ring-2 ring-primary ring-offset-2 border-primary'
                    : 'border-base-300'
                }`}
              >
                {selectedColor === idx && (
                  <Check className="w-4 h-4 text-white drop-shadow-sm" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Quantity & Core Buttons */}
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center border border-base-300 rounded-xl bg-base-100">
            <button
              type="button"
              onClick={() => handleQuantityChange('dec')}
              className="btn btn-ghost btn-sm px-3 rounded-l-xl font-bold text-lg"
              disabled={quantity <= 1}
            >
              -
            </button>
            <span className="w-12 text-center font-bold text-sm">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => handleQuantityChange('inc')}
              className="btn btn-ghost btn-sm px-3 rounded-r-xl font-bold text-lg"
              disabled={quantity >= stock}
            >
              +
            </button>
          </div>

          <button
            onClick={()=>handleAddToCart(id)}
            type="button"
            className="btn btn-primary flex-1 gap-2 rounded-xl font-bold shadow-lg shadow-primary/20"
            disabled={stock <= 0}
          >
            <ShoppingCart className="w-5 h-5" /> Add to Cart
          </button>

          <button
            type="button"
            aria-label="Wishlist"
            className="btn btn-outline border-base-300 rounded-xl"
          >
            <Heart className="w-5 h-5" />
          </button>

          <button
            type="button"
            aria-label="Share"
            onClick={handleShare}
            className="hidden md:inline-flex btn btn-outline border-base-300 rounded-xl"
          >
            <Share2 className="w-5 h-5" />
          </button>
        </div>

        {/* Buy Now Bar */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="btn btn-warning flex-1 font-bold rounded-xl text-slate-900"
            disabled={stock <= 0}
          >
            Buy Now
          </button>
          <button
            type="button"
            aria-label="Share Mobile"
            onClick={handleShare}
            className="md:hidden inline-flex btn btn-outline border-base-300 rounded-xl"
          >
            <Share2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductActions;