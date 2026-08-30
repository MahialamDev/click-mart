"use client";

import axiosInstance from "@/Hooks/axiosInstance";
import { RootState } from "@/redux/store";
import React, { useEffect, useState } from "react";
import {
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { useSelector } from "react-redux";

type Category = {
  id: string;
  name: string;
  slug: string;
};

type ProductFormData = {
  title: string;
  brand: string;
  categoryId: string;

  costPrice?: number;
  price: number;
  originalPrice?: number;
  discount?: string;

  stock: number;
  sku: string;
  description: string;

  images: {
    url: string;
    alt?: string;
  }[];

  colors: {
    name: string;
    className?: string;
  }[];

  features: {
    title: string;
  }[];
};

const AddProductsPage = () => {
  // ==========================================
  // STATES
  // ==========================================

  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryLoading, setCategoryLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const user = useSelector((state: RootState) => state.auth.user)
  

  // ==========================================
  // FORM
  // ==========================================

  const {
    register,
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isValid },
  } = useForm<ProductFormData>({
    mode: "onChange",

    defaultValues: {
      title: "",
      brand: "",
      categoryId: "",

      costPrice: undefined,
      price: 0,
      originalPrice: undefined,
      discount: "",

      stock: 0,
      sku: "",
      description: "",

      images: [
        {
          url: "",
          alt: "",
        },
      ],

      colors: [
        {
          name: "",
          className: "",
        },
      ],

      features: [
        {
          title: "",
        },
      ],
    },
  });

  // ==========================================
  // WATCH VALUES
  // ==========================================

  const sellingPrice = watch("price");

  // ==========================================
  // IMAGES
  // ==========================================

  const {
    fields: imageFields,
    append: appendImage,
    remove: removeImage,
  } = useFieldArray({
    control,
    name: "images",
  });

  // ==========================================
  // COLORS
  // ==========================================

  const {
    fields: colorFields,
    append: appendColor,
    remove: removeColor,
  } = useFieldArray({
    control,
    name: "colors",
  });

  // ==========================================
  // FEATURES
  // ==========================================

  const {
    fields: featureFields,
    append: appendFeature,
    remove: removeFeature,
  } = useFieldArray({
    control,
    name: "features",
  });

  // ==========================================
  // GET CATEGORIES
  // ==========================================

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setCategoryLoading(true);

        const response = await axiosInstance.get(
          "/products/categories"
        );

        setCategories(response.data.data);
      } catch (error) {
        console.error("Category fetch error:", error);
      } finally {
        setCategoryLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // ==========================================
  // SUBMIT
  // ==========================================

  const onSubmit: SubmitHandler<ProductFormData> = async (data) => {
    try {
      setIsSubmitting(true);

      // Backend expects categoryIds[]
      const productData = {
        title: data.title,
        brand: data.brand,

        categoryId: data.categoryId,

        costPrice: data.costPrice,
        price: data.price,
        originalPrice: data.originalPrice,
        discount: data.discount,

        stock: data.stock,
        sku: data.sku,
        description: data.description,

        images: data.images,
        colors: data.colors,
          features: data.features,
        addedById: user?.id
      };

      console.log("Product Data:", productData);

      const response = await axiosInstance.post(
        "/products",
        productData
      );

      console.log("Product Response:", response.data);

      alert("Product added successfully!");

      reset();
    } catch (error: any) {
      console.error(
        "Product creation error:",
        error.response?.data || error
      );

      alert(
        error.response?.data?.message ||
          "Something went wrong"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // ==========================================
  // UI
  // ==========================================

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="mx-auto max-w-7xl">

        {/* =====================================
            HEADER
        ====================================== */}

        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Add Product
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Add a new product to your store
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
        >

          {/* =====================================
              BASIC INFORMATION
          ====================================== */}

          <section className="rounded-xl bg-white p-5 shadow-sm md:p-6">
            <h2 className="mb-5 text-lg font-semibold text-gray-900">
              Basic Information
            </h2>

            <div className="grid gap-5 md:grid-cols-2">

              {/* TITLE */}

              <div className="md:col-span-2">
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Product Title
                </label>

                <input
                  {...register("title", {
                    required: "Product title is required",

                    minLength: {
                      value: 3,
                      message:
                        "Title must be at least 3 characters",
                    },

                    maxLength: {
                      value: 100,
                      message:
                        "Title cannot exceed 100 characters",
                    },
                  })}
                  placeholder="Beats Solo3 Wireless Headphones"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none transition focus:border-green-500 focus:ring-1 focus:ring-green-500"
                />

                {errors.title && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.title.message}
                  </p>
                )}
              </div>

              {/* BRAND */}

              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Brand
                </label>

                <input
                  {...register("brand", {
                    required: "Brand is required",

                    minLength: {
                      value: 2,
                      message:
                        "Brand must be at least 2 characters",
                    },
                  })}
                  placeholder="Apple"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-green-500"
                />

                {errors.brand && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.brand.message}
                  </p>
                )}
              </div>

              {/* CATEGORY */}

              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Category
                </label>

                <select
                  {...register("categoryId", {
                    required: "Please select a category",
                  })}
                  disabled={categoryLoading}
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 outline-none focus:border-green-500"
                >
                  <option value="">
                    {categoryLoading
                      ? "Loading categories..."
                      : "Select category"}
                  </option>

                  {categories.map((category) => (
                    <option
                      key={category.id}
                      value={category.id}
                    >
                      {category.name}
                    </option>
                  ))}
                </select>

                {errors.categoryId && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.categoryId.message}
                  </p>
                )}
              </div>

              {/* SKU */}

              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  SKU
                </label>

                <input
                  {...register("sku", {
                    required: "SKU is required",

                    minLength: {
                      value: 3,
                      message:
                        "SKU must be at least 3 characters",
                    },

                    pattern: {
                      value: /^[A-Za-z0-9-_]+$/,
                      message:
                        "Only letters, numbers, - and _ are allowed",
                    },
                  })}
                  placeholder="BEATS-S3-WHT"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 uppercase outline-none focus:border-green-500"
                />

                {errors.sku && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.sku.message}
                  </p>
                )}
              </div>

              {/* STOCK */}

              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Stock
                </label>

                <input
                  type="number"
                  {...register("stock", {
                    required: "Stock is required",
                    valueAsNumber: true,

                    min: {
                      value: 0,
                      message:
                        "Stock cannot be negative",
                    },

                    validate: (value) =>
                      Number.isInteger(value) ||
                      "Stock must be a whole number",
                  })}
                  placeholder="15"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-green-500"
                />

                {errors.stock && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.stock.message}
                  </p>
                )}
              </div>
            </div>
          </section>

          {/* =====================================
              PRICING
          ====================================== */}

          <section className="rounded-xl bg-white p-5 shadow-sm md:p-6">
            <h2 className="mb-5 text-lg font-semibold text-gray-900">
              Pricing
            </h2>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

              {/* COST PRICE */}

              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Cost Price
                </label>

                <input
                  type="number"
                  step="0.01"
                  {...register("costPrice", {
                    valueAsNumber: true,

                    min: {
                      value: 0,
                      message:
                        "Cost price cannot be negative",
                    },

                    validate: (value) => {
                      if (
                        value === undefined ||
                        Number.isNaN(value)
                      ) {
                        return true;
                      }

                      return (
                        value <= sellingPrice ||
                        "Cost price cannot be greater than selling price"
                      );
                    },
                  })}
                  placeholder="120.00"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-green-500"
                />

                {errors.costPrice && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.costPrice.message}
                  </p>
                )}
              </div>

              {/* SELLING PRICE */}

              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Selling Price
                </label>

                <input
                  type="number"
                  step="0.01"
                  {...register("price", {
                    required:
                      "Selling price is required",

                    valueAsNumber: true,

                    min: {
                      value: 0.01,
                      message:
                        "Price must be greater than 0",
                    },
                  })}
                  placeholder="179.99"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-green-500"
                />

                {errors.price && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.price.message}
                  </p>
                )}
              </div>

              {/* ORIGINAL PRICE */}

              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Original Price
                </label>

                <input
                  type="number"
                  step="0.01"
                  {...register("originalPrice", {
                    valueAsNumber: true,

                    min: {
                      value: 0,
                      message:
                        "Original price cannot be negative",
                    },

                    validate: (value) => {
                      if (
                        value === undefined ||
                        Number.isNaN(value)
                      ) {
                        return true;
                      }

                      return (
                        value >= sellingPrice ||
                        "Original price should be greater than selling price"
                      );
                    },
                  })}
                  placeholder="199.99"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-green-500"
                />

                {errors.originalPrice && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.originalPrice.message}
                  </p>
                )}
              </div>

              {/* DISCOUNT */}

              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Discount
                </label>

                <input
                  {...register("discount", {
                    maxLength: {
                      value: 20,
                      message:
                        "Discount cannot exceed 20 characters",
                    },
                  })}
                  placeholder="10% OFF"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-green-500"
                />

                {errors.discount && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.discount.message}
                  </p>
                )}
              </div>
            </div>
          </section>

          {/* =====================================
              IMAGES
          ====================================== */}

          <section className="rounded-xl bg-white p-5 shadow-sm md:p-6">

            <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Product Images
                </h2>

                <p className="text-sm text-gray-500">
                  Add one or more product image URLs
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  appendImage({
                    url: "",
                    alt: "",
                  })
                }
                className="rounded-lg bg-green-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-green-700"
              >
                + Add Image
              </button>
            </div>

            <div className="space-y-4">

              {imageFields.map((field, index) => (
                <div
                  key={field.id}
                  className="rounded-lg border border-gray-200 p-4"
                >
                  <div className="grid gap-4 md:grid-cols-[1fr_1fr_auto]">

                    {/* URL */}

                    <div>
                      <label className="mb-1.5 block text-sm font-medium">
                        Image URL
                      </label>

                      <input
                        {...register(
                          `images.${index}.url`,
                          {
                            required:
                              "Image URL is required",

                            pattern: {
                              value:
                                /^https?:\/\/.+/i,
                              message:
                                "Enter a valid image URL",
                            },
                          }
                        )}
                        placeholder="https://example.com/image.jpg"
                        className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-green-500"
                      />

                      {errors.images?.[index]?.url && (
                        <p className="mt-1 text-sm text-red-500">
                          {
                            errors.images[index]?.url
                              ?.message
                          }
                        </p>
                      )}
                    </div>

                    {/* ALT */}

                    <div>
                      <label className="mb-1.5 block text-sm font-medium">
                        Alt Text
                      </label>

                      <input
                        {...register(
                          `images.${index}.alt`
                        )}
                        placeholder="Beats Solo3 Headphones"
                        className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-green-500"
                      />
                    </div>

                    {/* REMOVE */}

                    <div className="flex items-end">
                      <button
                        type="button"
                        onClick={() =>
                          removeImage(index)
                        }
                        disabled={
                          imageFields.length === 1
                        }
                        className="w-full rounded-lg border border-red-200 px-4 py-2.5 text-sm font-medium text-red-500 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-40 md:w-auto"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* =====================================
              COLORS
          ====================================== */}

          <section className="rounded-xl bg-white p-5 shadow-sm md:p-6">

            <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Product Colors
                </h2>

                <p className="text-sm text-gray-500">
                  Add available colors
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  appendColor({
                    name: "",
                    className: "",
                  })
                }
                className="rounded-lg bg-green-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-green-700"
              >
                + Add Color
              </button>
            </div>

            <div className="space-y-4">

              {colorFields.map((field, index) => (
                <div
                  key={field.id}
                  className="grid gap-4 rounded-lg border border-gray-200 p-4 md:grid-cols-[1fr_1fr_auto]"
                >

                  {/* NAME */}

                  <div>
                    <label className="mb-1.5 block text-sm font-medium">
                      Color Name
                    </label>

                    <input
                      {...register(
                        `colors.${index}.name`,
                        {
                          required:
                            "Color name is required",

                          minLength: {
                            value: 2,
                            message:
                              "Color name must be at least 2 characters",
                          },
                        }
                      )}
                      placeholder="Matte Black"
                      className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-green-500"
                    />

                    {errors.colors?.[index]?.name && (
                      <p className="mt-1 text-sm text-red-500">
                        {
                          errors.colors[index]?.name
                            ?.message
                        }
                      </p>
                    )}
                  </div>

                  {/* CLASS */}

                  <div>
                    <label className="mb-1.5 block text-sm font-medium">
                      Tailwind Class
                    </label>

                    <input
                      {...register(
                        `colors.${index}.className`
                      )}
                      placeholder="bg-black"
                      className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-green-500"
                    />
                  </div>

                  {/* REMOVE */}

                  <div className="flex items-end">
                    <button
                      type="button"
                      onClick={() =>
                        removeColor(index)
                      }
                      disabled={
                        colorFields.length === 1
                      }
                      className="w-full rounded-lg border border-red-200 px-4 py-2.5 text-sm font-medium text-red-500 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-40 md:w-auto"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* =====================================
              FEATURES
          ====================================== */}

          <section className="rounded-xl bg-white p-5 shadow-sm md:p-6">

            <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Product Features
                </h2>

                <p className="text-sm text-gray-500">
                  Add product features
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  appendFeature({
                    title: "",
                  })
                }
                className="rounded-lg bg-green-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-green-700"
              >
                + Add Feature
              </button>
            </div>

            <div className="space-y-4">

              {featureFields.map((field, index) => (
                <div
                  key={field.id}
                  className="flex flex-col gap-3 sm:flex-row"
                >

                  <div className="flex-1">
                    <input
                      {...register(
                        `features.${index}.title`,
                        {
                          required:
                            "Feature is required",

                          minLength: {
                            value: 3,
                            message:
                              "Feature must be at least 3 characters",
                          },

                          maxLength: {
                            value: 200,
                            message:
                              "Feature cannot exceed 200 characters",
                          },
                        }
                      )}
                      placeholder="Up to 40 hours of battery life"
                      className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-green-500"
                    />

                    {errors.features?.[index]?.title && (
                      <p className="mt-1 text-sm text-red-500">
                        {
                          errors.features[index]?.title
                            ?.message
                        }
                      </p>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      removeFeature(index)
                    }
                    disabled={
                      featureFields.length === 1
                    }
                    className="rounded-lg border border-red-200 px-4 py-2.5 text-sm font-medium text-red-500 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* =====================================
              DESCRIPTION
          ====================================== */}

          <section className="rounded-xl bg-white p-5 shadow-sm md:p-6">

            <h2 className="mb-5 text-lg font-semibold text-gray-900">
              Product Description
            </h2>

            <textarea
              {...register("description", {
                required:
                  "Description is required",

                minLength: {
                  value: 20,
                  message:
                    "Description must be at least 20 characters",
                },

                maxLength: {
                  value: 5000,
                  message:
                    "Description cannot exceed 5000 characters",
                },
              })}
              rows={7}
              placeholder="Write detailed product description..."
              className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-500"
            />

            {errors.description && (
              <p className="mt-1 text-sm text-red-500">
                {errors.description.message}
              </p>
            )}
          </section>

          {/* =====================================
              ACTION BUTTONS
          ====================================== */}

          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

            {/* RESET */}

            <button
              type="button"
              onClick={() => reset()}
              disabled={isSubmitting}
              className="rounded-lg border border-gray-300 bg-white px-6 py-3 font-medium text-gray-700 transition hover:bg-gray-100 disabled:opacity-50"
            >
              Reset
            </button>

            {/* SUBMIT */}

            <button
              type="submit"
              disabled={
                isSubmitting || !isValid
              }
              className="rounded-lg bg-green-600 px-7 py-3 font-medium text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting
                ? "Adding Product..."
                : "Add Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductsPage;