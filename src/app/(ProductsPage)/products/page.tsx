import Image from "next/image";
import { Star, ShoppingBag, Filter } from "lucide-react";
import Link from "next/link";
import axiosInstance from "@/Hooks/axiosInstance";
import { Product } from "@/types/product";
import ProductCard from "@/components/products/cards/ProductCard";


export default async function ProductsPage() {
  const response = await axiosInstance.get("/products");

  const products = response?.data?.data || [];

  return (
    <div className="bg-base-100 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 space-y-8">

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

          {products.map((p: Product) => <ProductCard key={p.id} product={p} /> )}

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