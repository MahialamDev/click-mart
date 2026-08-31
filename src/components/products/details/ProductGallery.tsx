'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ProductImage } from '@/types/product';

interface ProductGalleryProps {
  images: ProductImage[];
  title: string;
  discount?: string | null;
}

const ProductGallery = ({ images, title, discount }: ProductGalleryProps) => {
  const [selectedImage, setSelectedImage] = useState(0);

  // const activeImage = images[selectedImage]?.url || '/placeholder-product.jpg';
  const activeImage ='https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80';

  return (
    <div className="lg:col-span-6 space-y-4">
      {/* Main Image View */}
      <div className="relative w-full h-[380px] sm:h-[450px] bg-base-200/50 rounded-2xl overflow-hidden border border-base-200">
        <Image
          src={activeImage}
          alt={images[selectedImage]?.alt || title}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-contain p-4 transition-all duration-300"
        />
        {discount && (
          <span className="absolute top-4 left-4 bg-red-500 text-white font-bold text-xs px-2.5 py-1 rounded-full">
            {discount}
          </span>
        )}
      </div>

      {/* Thumbnail Bar */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-3">
          {images.map((img, idx) => (
            <button
              key={img.id || idx}
              type="button"
              onClick={() => setSelectedImage(idx)}
              className={`relative h-20 bg-base-200/50 rounded-xl overflow-hidden border-2 transition-all ${
                selectedImage === idx
                  ? 'border-primary ring-2 ring-primary/20'
                  : 'border-base-200 hover:border-base-300'
              }`}
            >
              <Image
                src={img.url}
                alt={img.alt || `Thumbnail ${idx + 1}`}
                fill
                sizes="100px"
                className="object-contain p-1"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductGallery;