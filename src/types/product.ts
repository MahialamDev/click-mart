export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ProductImage {
  id: string;
  url: string;
  alt: string | null;
  sortOrder: number;
  productId: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProductColor {
  id: string;
  name: string;
  className: string;
  productId: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProductFeature {
  id: string;
  title: string;
  sortOrder: number;
  productId: string;
  createdAt: string;
  updatedAt: string;
}

export interface AddedBy {
  id: string;
  name: string;
  email: string;
}

export interface Product {
  id: string;
  title: string;
  slug: string;
  brand: string;

  categoryId: string;

  costPrice: number;
  price: number;
  originalPrice: number;

  discount: string | number;

  rating: number;
  totalReviews: number;
  totalSold: number;

  stock: number;
  sku: string;

  description: string;

  createdAt: string;
  updatedAt: string;

  addedById: string;

  category: Category;
  images: ProductImage[];
  colors: ProductColor[];
  features: ProductFeature[];
  addedBy: AddedBy;
}