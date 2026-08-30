"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  Edit,
  Trash2,
  Package,
  Eye,
  Star,
} from "lucide-react";

import { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const image = product.images?.[0]?.url;
  const profit = product.price - product.costPrice;

  return (
    <>
      {/* ==================== MOBILE LAYOUT (Box / Card View) ==================== */}
      <div className="block md:hidden card overflow-hidden border border-base-300 bg-base-100 shadow-sm transition hover:shadow-md">
        {/* Product Image */}
        <figure className="relative h-52 w-full bg-base-200">
          {image ? (
            <Image
              src={image}
              alt={product.images?.[0]?.alt || product.title}
              fill
              className="object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <Package size={50} className="opacity-30" />
            </div>
          )}

          {/* Stock Badge */}
          <div className="absolute right-3 top-3">
            {product.stock > 0 ? (
              <span className="badge badge-success badge-sm font-medium">
                {product.stock} in stock
              </span>
            ) : (
              <span className="badge badge-error badge-sm font-medium">
                Out of stock
              </span>
            )}
          </div>
        </figure>

        {/* Card Body */}
        <div className="card-body gap-3 p-4">
          {/* Category + Brand */}
          <div className="flex items-center justify-between gap-2">
            <span className="badge badge-primary badge-outline text-xs">
              {product.category?.name}
            </span>
            <span className="text-xs opacity-60 font-medium">
              {product.brand}
            </span>
          </div>

          {/* Title */}
          <h2 className="card-title line-clamp-1 text-base font-bold">
            {product.title}
          </h2>

          {/* SKU */}
          <p className="text-xs opacity-60">SKU: {product.sku}</p>

          {/* Price */}
          <div className="flex items-end gap-2">
            <span className="text-xl font-bold text-primary">
              ৳{product.price}
            </span>
            {product.originalPrice > product.price && (
              <span className="text-xs text-base-content/50 line-through">
                ৳{product.originalPrice}
              </span>
            )}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-2.5 border-y border-base-300 py-3.5 text-xs">
            <div>
              <p className="opacity-60">Cost Price</p>
              <p className="font-semibold">৳{product.costPrice}</p>
            </div>
            <div>
              <p className="opacity-60">Profit / Item</p>
              <p
                className={`font-semibold ${
                  profit > 0 ? "text-success" : "text-error"
                }`}
              >
                ৳{profit}
              </p>
            </div>
            <div>
              <p className="opacity-60">Sold</p>
              <p className="font-semibold">{product.totalSold}</p>
            </div>
            <div>
              <p className="opacity-60">Rating</p>
              <p className="font-semibold">
                ⭐ {product.rating} ({product.totalReviews})
              </p>
            </div>
          </div>

          {/* Added By */}
          <div className="text-xs">
            <p className="opacity-60">Added by</p>
            <p className="font-medium">{product.addedBy?.name}</p>
          </div>

          {/* Actions */}
          <div className="card-actions grid grid-cols-3 gap-2 pt-2">
            <Link
              href={`/products/${product.slug}`}
              className="btn btn-outline btn-sm"
            >
              <Eye size={16} />
            </Link>
            <Link
              href={`/dashboard/products/edit/${product.id}`}
              className="btn btn-primary btn-sm"
            >
              <Edit size={16} />
              Edit
            </Link>
            <button
              className="btn btn-error btn-sm text-white"
              type="button"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* ==================== DESKTOP LAYOUT (Horizontal Row View) ==================== */}
      <div className="hidden md:flex items-center justify-between border-b border-base-300 bg-base-100 p-4 transition hover:bg-base-200/50">
        
        {/* Left: Product Info + Image */}
        <div className="flex items-center gap-4 w-1/3">
          <div className="relative h-16 w-16 shrink-0 rounded-lg overflow-hidden border border-base-300 bg-base-200">
            {image ? (
              <Image
                src={image}
                alt={product.images?.[0]?.alt || product.title}
                fill
                className="object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <Package size={24} className="opacity-30" />
              </div>
            )}
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="badge badge-primary badge-outline text-[10px] px-1.5 py-0.5">
                {product.category?.name}
              </span>
              <span className="text-xs opacity-60">{product.brand}</span>
            </div>
            <h3 className="font-bold text-sm line-clamp-1">{product.title}</h3>
            <p className="text-xs opacity-50">SKU: {product.sku}</p>
          </div>
        </div>

        {/* Center-Left: Stock & Rating */}
        <div className="flex items-center gap-6 w-1/5">
          <div>
            <p className="text-xs opacity-50">Stock</p>
            {product.stock > 0 ? (
              <span className="badge badge-success badge-sm font-medium mt-0.5">
                {product.stock} in stock
              </span>
            ) : (
              <span className="badge badge-error badge-sm font-medium mt-0.5">
                Out of stock
              </span>
            )}
          </div>
          <div>
            <p className="text-xs opacity-50">Rating</p>
            <div className="flex items-center gap-1 text-xs font-semibold mt-1">
              <Star size={12} className="fill-warning text-warning" />
              <span>{product.rating}</span>
              <span className="opacity-50">({product.totalReviews})</span>
            </div>
          </div>
        </div>

        {/* Center-Right: Pricing & Profit */}
        <div className="flex items-center gap-6 w-1/4">
          <div>
            <p className="text-xs opacity-50">Selling Price</p>
            <div className="flex items-baseline gap-1.5">
              <span className="font-bold text-primary text-base">৳{product.price}</span>
              {product.originalPrice > product.price && (
                <span className="text-xs text-base-content/50 line-through">
                  ৳{product.originalPrice}
                </span>
              )}
            </div>
          </div>
          <div>
            <p className="text-xs opacity-50">Profit/Cost</p>
            <p className="text-xs font-semibold">
              <span className={profit > 0 ? "text-success" : "text-error"}>
                +৳{profit}
              </span>{" "}
              <span className="opacity-40">/ ৳{product.costPrice}</span>
            </p>
          </div>
        </div>

        {/* Right: Added By & Action Buttons */}
        <div className="flex items-center justify-end gap-4 w-1/5">
          <div className="text-right hidden lg:block">
            <p className="text-xs opacity-50">Added By</p>
            <p className="text-xs font-medium">{product.addedBy?.name}</p>
          </div>
          
          <div className="flex items-center gap-1.5">
            <Link
              href={`/products/${product.slug}`}
              className="btn btn-ghost btn-square btn-sm"
              title="View Product"
            >
              <Eye size={18} />
            </Link>
            <Link
              href={`/dashboard/products/edit/${product.id}`}
              className="btn btn-primary btn-square btn-sm"
              title="Edit Product"
            >
              <Edit size={16} />
            </Link>
            <button
              className="btn btn-error btn-square btn-sm text-white"
              type="button"
              title="Delete Product"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>

      </div>
    </>
  );
};

export default ProductCard;