import Image from "next/image";
import { Star, ShoppingBag, Filter } from "lucide-react";
import Link from "next/link";
import axiosInstance from "@/Hooks/axiosInstance";
import { Product } from "@/types/product";

export default async function ProductsPage() {
  const response = await axiosInstance.get("/products");

  const products = response?.data?.data || [];

  return (
    <div className="bg-base-100 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-base-200 pb-4">
          <div>
            <h1 className="text-3xl font-black text-base-content">
              All Products
            </h1>

            <p className="text-sm text-base-content/60">
              Explore our complete collection of gadgets
            </p>
          </div>

          <button className="btn btn-outline border-base-300 gap-2">
            <Filter className="w-4 h-4" />
            Filter
          </button>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-6">

          {products.map((p: Product) => {
            const imageUrl = 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80'
              
            return (
              <Link
                href={`/products/${p.slug}`}
                key={p.id}
                className="bg-base-100 border border-base-200 rounded-2xl p-4 flex flex-col justify-between hover:shadow-lg transition-all hover:-translate-y-1"
              >
                {/* Image */}
                <div className="relative w-full h-48 bg-base-200 rounded-xl overflow-hidden mb-4">
                  <Image
                    src={imageUrl}
                    alt={p.images?.[0]?.alt || p.title}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-contain p-2"
                  />
                </div>

                <div className="space-y-2">

                  {/* Category */}
                  <span className="text-[10px] font-bold uppercase text-primary tracking-wider">
                    {p.category?.name || "Uncategorized"}
                  </span>

                  {/* Brand */}
                  {p.brand && (
                    <p className="text-xs text-base-content/50">
                      {p.brand}
                    </p>
                  )}

                  {/* Title */}
                  <h3 className="font-bold text-sm text-base-content line-clamp-2">
                    {p.title}
                  </h3>

                  {/* Rating */}
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < Math.round(p.rating || 0)
                            ? "fill-amber-400 text-amber-400"
                            : "text-base-300"
                        }`}
                      />
                    ))}
                  </div>

                  {/* Price + Cart */}
                  <div className="flex items-center justify-between pt-2">

                    <div className="flex flex-col">
                      {p.originalPrice &&
                        p.originalPrice > p.price && (
                          <span className="text-xs line-through text-base-content/50">
                            ${p.originalPrice}
                          </span>
                        )}

                      <span className="text-lg font-black text-base-content">
                        ${p.price}
                      </span>
                    </div>

                    <button
                      className="btn btn-primary btn-sm rounded-xl"
                      // onClick={(e) => {
                      //   e.preventDefault();
                      // }}
                    >
                      <ShoppingBag className="w-4 h-4" />
                    </button>

                  </div>
                </div>
              </Link>
            );
          })}

        </div>

        {/* Empty State */}
        {products.length === 0 && (
          <div className="text-center py-20">
            <h2 className="text-xl font-bold">
              No Products Found
            </h2>

            <p className="text-base-content/60 mt-2">
              Products will appear here once they are added.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}