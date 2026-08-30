import axiosInstance from "@/Hooks/axiosInstance";
import Link from "next/link";
import React from "react";
import ProductCard from "./ProductCard";
import { Product } from "@/types/product";

const AdminProductsPage = async () => {
  const response = await axiosInstance.get("/products");

  const products: Product[] = response?.data?.data || [];

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        
        <div>
          <h1 className="text-2xl font-bold">
            Products
          </h1>

          <p className="text-sm opacity-60">
            Manage all your products
          </p>
        </div>

        <Link
          href="/dashboard/products/add-products"
          className="btn btn-primary"
        >
          + Add Product
        </Link>

      </div>

      {/* Product Count */}
      <div className="text-sm opacity-70">
        Total Products: {products.length}
      </div>

      {/* Products */}
      {products.length > 0 ? (
        <div className="grid grid-cols-1 gap-5">
          
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}

        </div>
      ) : (
        <div className="flex min-h-60 items-center justify-center rounded-box border border-dashed border-base-300 bg-base-100">
          
          <div className="text-center">
            <h3 className="text-lg font-semibold">
              No Products Found
            </h3>

            <p className="text-sm opacity-60">
              Add your first product to get started.
            </p>
          </div>

        </div>
      )}

    </div>
  );
};

export default AdminProductsPage;