import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Product } from '@/types/product';
import axiosInstance from '@/Hooks/axiosInstance';

import ProductGallery from '@/components/products/details/ProductGallery';
import ProductInfo from '@/components/products/details/ProductInfo';
import ProductActions from '@/components/products/details/ProductActions';
import ProductServiceBadges from '@/components/products/details/ProductServiceBadges';
import ProductTabs from '@/components/products/details/ProductTabs';
import ProductDescription from '@/components/products/details/ProductDescription';
import ProductReviews from '@/components/products/details/ProductReviews';

type Props = {
  params: Promise<{ slug: string }>;
};

async function getProduct(slug: string): Promise<Product | null> {
  try {
    // Extract ID from slug (e.g., "rahat-basic-i8l7252yulxc8krq99eu6cde" -> "i8l7252yulxc8krq99eu6cde")
    const id = slug.split("-").pop();
    const res = await axiosInstance.get(`/products/${id}`);

    return res?.data?.data || null;
  } catch (error) {
    console.error('Failed to fetch product:', error);
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    return {
      title: "Product Not Found | ClickMart",
    };
  }

  const description =
    product.description && product.description.length > 160
      ? product.description.slice(0, 157) + "..."
      : product.description || '';

  return {
    title: `${product.title} | ClickMart`,
    description,
    openGraph: {
      title: product.title,
      description,
      images: product.images?.[0]
        ? [
            {
              url: product.images[0].url,
              alt: product.title,
            },
          ]
        : [],
    },
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    notFound();
  }

  return (
    <main className="bg-base-100 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Main Product Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Column - Gallery */}
          <ProductGallery
            images={product.images || []}
            title={product.title}
            discount={product.discount != null ? String(product.discount) : undefined}
          />

          {/* Right Column - Meta & Purchasing */}
          <div className="lg:col-span-6 space-y-6">
            <ProductInfo
              title={product.title}
              brand={product.brand}
              sku={product.sku}
              rating={product.rating}
              totalReviews={product.totalReviews}
              totalSold={product.totalSold}
              stock={product.stock}
              price={product.price}
              originalPrice={product.originalPrice}
            />

            <ProductActions
              colors={product.colors || []}
              stock={product.stock}
            />

            <ProductServiceBadges />
          </div>
        </div>

        {/* Tabbed Content */}
        <ProductTabs
          reviewCount={product.reviews?.length || 0}
          descriptionChild={
            <ProductDescription
              description={product.description}
              features={product.features || []}
            />
          }
          reviewsChild={<ProductReviews reviews={product.reviews || []} />}
        />
      </div>
    </main>
  );
}