// app/products/ProductCard.tsx
import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import { Product } from "@/types/product";
import AddToCartButton from "../Buttons/AddToCartButton";


export default function ProductCard({ product }: { product: Product }) {
  const imageUrl =
    product.images?.[0]?.url ||
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80";

  const productUrl = `/products/${product.slug}`;

  return (
    <div className="group bg-base-100 border rounded-2xl p-4 flex flex-col justify-between hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div>
        {/* Product Image Link */}
        <Link 
          href={productUrl} 
          className="relative block w-full h-48 bg-base-200/50 rounded-xl overflow-hidden mb-4 group-hover:bg-base-200 transition-colors"
        >
          <Image
            src={imageUrl}
            alt={product.images?.[0]?.alt || product.title}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-contain p-3 group-hover:scale-105 transition-transform duration-300"
          />
        </Link>

        {/* Product Details */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[10px] font-bold uppercase text-primary tracking-wider truncate">
              {product.category?.name || "Uncategorized"}
            </span>
            {product.brand && (
              <span className="text-[11px] text-base-content/50 truncate">
                {product.brand}
              </span>
            )}
          </div>

          {/* Title Link */}
          <h2 className="font-semibold text-sm text-base-content line-clamp-2 min-h-[2.5rem]">
            <Link 
              href={productUrl} 
              className="hover:text-primary transition-colors"
            >
              {product.title}
            </Link>
          </h2>

          {/* Rating */}
          <div className="flex items-center gap-1 pt-1">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3.5 h-3.5 ${
                    i < Math.round(product.rating || 0)
                      ? "fill-amber-400 text-amber-400"
                      : "text-base-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-[11px] text-base-content/60 font-medium">
              ({product.totalReviews || 0})
            </span>
          </div>
        </div>
      </div>

      {/* Footer: Price & Add to Cart */}
      <div className="flex items-center justify-between pt-3 mt-3 border-t border-base-200">
        <div className="flex flex-col">
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="text-xs line-through text-base-content/40">
              ${product.originalPrice}
            </span>
          )}
          <span className="text-base font-black text-base-content">
            ${product.price}
          </span>
        </div>

        {/* Client Component Button (No nested <a> inside <button> issues) */}
        <AddToCartButton productId={product.id} />
      </div>
    </div>
  );
}