"use client";

import { ShoppingBag } from "lucide-react";

export default function AddToCartButton({ productId }: { productId: string }) {
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevents navigating Link wrapper
    // Add to cart logic
  };

  return (
    <button
      type="button"
      aria-label="Add to cart"
      onClick={handleAddToCart}
      className="btn btn-primary btn-sm rounded-xl px-3 hover:scale-105 transition-transform"
    >
      <ShoppingBag className="w-4 h-4" />
    </button>
  );
}