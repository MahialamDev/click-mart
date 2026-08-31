'use client';
// this is for refarance and i hovae create already 8 components in product/details
import React, { useState } from 'react';
import Image from 'next/image';
import { 
  Star, 
  ShoppingCart, 
  Heart, 
  Share2, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Check, 
  ThumbsUp, 
  MessageSquare 
} from 'lucide-react';
import axiosInstance from '@/Hooks/axiosInstance';

// Dummy Product Data
const dummyProduct = {
  id: 'prod-101',
  title: 'Beats Solo3 Wireless On-Ear Headphones - Apple W1 Headphone Chip',
  brand: 'Beats',
  category: 'Audio & Headsets',
  price: 179.99,
  originalPrice: 199.95,
  discount: '10% OFF',
  rating: 4.8,
  totalReviews: 128,
  totalSold: 1420,
  stock: 15,
  sku: 'BEATS-S3-WHT',
  images: [
    'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80',
  ],
  colors: [
    { name: 'Matte Black', class: 'bg-black' },
    { name: 'Gloss White', class: 'bg-white border' },
    { name: 'Rose Gold', class: 'bg-rose-300' },
  ],
  features: [
    'High-performance wireless Bluetooth headphones',
    'Features the Apple W1 chip and Class 1 wireless Bluetooth connectivity',
    'With up to 40 hours of battery life, Beats Solo3 wireless is your perfect everyday headphone',
    'Compatible with iOS and Android devices',
    'Adjustable fit with comfort-cushioned ear cups made for everyday use',
  ],
  description: `Connect via Class 1 Bluetooth with your device for wireless listening. The award-winning sound and design you've come to love from Beats. Up to 40 hours of battery life for multi-day use. With Fast Fuel, 5 minutes of charging gives you 3 hours of playback when battery is low. Adjustable fit with comfort-cushioned ear cups made for everyday use.`,
  reviews: [
    {
      id: 1,
      user: 'Rahim Ahmed',
      avatar: 'https://i.pravatar.cc/150?img=11',
      rating: 5,
      date: '2 weeks ago',
      comment: 'Sound quality is top-notch! Battery life easily lasts 3-4 days on moderate daily use. Fast delivery as well.',
      likes: 12,
    },
    {
      id: 2,
      user: 'Tanvir Hasan',
      avatar: 'https://i.pravatar.cc/150?img=32',
      rating: 4,
      date: '1 month ago',
      comment: 'Very comfortable to wear for long hours. Noise isolation is decent, though not active noise canceling.',
      likes: 5,
    },
  ],
};

const ProductDetailsPage = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'reviews'>('description');
  const [newComment, setNewComment] = useState('');
  const id = 1

  const res =  axiosInstance.get(`/products/${id}`)

  const handleQuantityChange = (type: 'inc' | 'dec') => {
    if (type === 'inc') setQuantity((prev) => prev + 1);
    if (type === 'dec' && quantity > 1) setQuantity((prev) => prev - 1);
  };

  return (
    <div className="bg-base-100 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Main Product Details Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Left: Product Images Gallery */}
          <div className="lg:col-span-6 space-y-4">
            {/* Main Image */}
            <div className="relative w-full h-[380px] sm:h-[450px] bg-base-200/50 rounded-2xl overflow-hidden border border-base-200">
              <Image
                src={dummyProduct.images[selectedImage]}
                alt={dummyProduct.title}
                fill
                priority
                className="object-contain p-4 transition-all duration-300"
              />
              <span className="absolute top-4 left-4 bg-red-500 text-white font-bold text-xs px-2.5 py-1 rounded-full">
                {dummyProduct.discount}
              </span>
            </div>

            {/* Thumbnail Navigation */}
            <div className="grid grid-cols-4 gap-3">
              {dummyProduct.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`relative h-20 bg-base-200/50 rounded-xl overflow-hidden border-2 transition-all ${
                    selectedImage === idx ? 'border-primary ring-2 ring-primary/20' : 'border-base-200 hover:border-base-300'
                  }`}
                >
                  <Image src={img} alt={`Thumbnail ${idx}`} fill className="object-contain p-1" />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Product Meta & Purchase Options */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Title & Brand */}
            <div>
              <div className="flex items-center justify-between text-xs text-base-content/60 mb-2">
                <span>Brand: <strong className="text-base-content">{dummyProduct.brand}</strong></span>
                <span>SKU: {dummyProduct.sku}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-base-content leading-snug">
                {dummyProduct.title}
              </h1>
            </div>

            {/* Rating, Sold & Stock Badge */}
            <div className="flex flex-wrap items-center gap-4 text-xs">
              <div className="flex items-center gap-1 bg-amber-400/10 px-2.5 py-1 rounded-lg text-amber-600 font-bold">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span>{dummyProduct.rating}</span>
                <span className="text-base-content/60 font-normal">({dummyProduct.totalReviews} reviews)</span>
              </div>
              <div className="text-base-content/70">
                <strong className="text-base-content">{dummyProduct.totalSold}</strong> Sold
              </div>
              <div className="badge badge-success text-white font-semibold">
                In Stock ({dummyProduct.stock} left)
              </div>
            </div>

            {/* Pricing */}
            <div className="flex items-baseline gap-3 p-4 bg-base-200/40 rounded-2xl border border-base-200">
              <span className="text-3xl font-black text-base-content">
                ${dummyProduct.price.toFixed(2)}
              </span>
              <span className="text-base text-base-content/40 line-through">
                ${dummyProduct.originalPrice.toFixed(2)}
              </span>
            </div>

            {/* Color Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-base-content uppercase tracking-wider block mb-4 ">
                Color: <span className="font-semibold text-primary">{dummyProduct.colors[selectedColor].name}</span>
              </label>
              <div className="flex items-center gap-3">
                {dummyProduct.colors.map((color, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedColor(idx)}
                    className={`w-8 h-8 rounded-full ${color.class} flex items-center justify-center border-2 transition-all ${
                      selectedColor === idx ? 'ring-2 ring-primary ring-offset-2 border-primary' : 'border-base-300'
                    }`}
                  >
                    {selectedColor === idx && <Check className={`w-4 h-4 ${color.name === 'Gloss White' ? 'text-black' : 'text-white'}`} />}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selector & Action Buttons */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-base-300 rounded-xl bg-base-100">
                  <button onClick={() => handleQuantityChange('dec')} className="btn btn-ghost btn-sm px-3 rounded-l-xl font-bold text-lg">-</button>
                  <span className="w-12 text-center font-bold text-sm">{quantity}</span>
                  <button onClick={() => handleQuantityChange('inc')} className="btn btn-ghost btn-sm px-3 rounded-r-xl font-bold text-lg">+</button>
                </div>

                <button className="btn btn-primary flex-1 gap-2 rounded-xl font-bold shadow-lg shadow-primary/20">
                  <ShoppingCart className="w-5 h-5" /> Add to Cart
                </button>
                
                <button className=" btn btn-outline border-base-300 rounded-xl">
                  <Heart className="w-5 h-5" />
                </button>
                <button className="hidden md:inline btn btn-outline border-base-300 rounded-xl">
                  <Share2 className="w-5 h-5" />
                </button>
                          </div>

            <div className='flex items-center gap-2'>
    
              <button className="btn btn-warning flex-1 font-bold rounded-xl text-slate-900">
                Buy Now
                              </button>
              <button className="md:hidden inline btn btn-outline border-base-300 rounded-xl">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>


            </div>

            {/* Guarantees / Service Badges */}
            <div className="grid grid-cols-3 gap-2 pt-4 border-t border-base-200 text-center">
              <div className="p-3 bg-base-200/30 rounded-xl space-y-1">
                <Truck className="w-5 h-5 mx-auto text-primary" />
                <p className="text-[11px] font-bold text-base-content">Fast Shipping</p>
              </div>
              <div className="p-3 bg-base-200/30 rounded-xl space-y-1">
                <ShieldCheck className="w-5 h-5 mx-auto text-primary" />
                <p className="text-[11px] font-bold text-base-content">1 Year Warranty</p>
              </div>
              <div className="p-3 bg-base-200/30 rounded-xl space-y-1">
                <RotateCcw className="w-5 h-5 mx-auto text-primary" />
                <p className="text-[11px] font-bold text-base-content">7 Days Return</p>
              </div>
            </div>

          </div>

        </div>

        {/* Tabs Section: Description & Reviews */}
        <div className="bg-base-100 border border-base-200 rounded-2xl p-6 sm:p-8 space-y-6">
          
          {/* Tab Header */}
          <div className="flex border-b border-base-200 gap-8">
            <button
              onClick={() => setActiveTab('description')}
              className={`pb-4 text-sm font-bold border-b-2 transition-colors ${
                activeTab === 'description' ? 'border-primary text-primary' : 'border-transparent text-base-content/60 hover:text-base-content'
              }`}
            >
              Description & Features
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`pb-4 text-sm font-bold border-b-2 transition-colors ${
                activeTab === 'reviews' ? 'border-primary text-primary' : 'border-transparent text-base-content/60 hover:text-base-content'
              }`}
            >
              Customer Reviews ({dummyProduct.reviews.length})
            </button>
          </div>

          {/* Tab 1: Description */}
          {activeTab === 'description' && (
            <div className="space-y-6 text-sm text-base-content/80 leading-relaxed">
              <p>{dummyProduct.description}</p>
              <div>
                <h4 className="font-bold text-base-content text-base mb-3">Key Features:</h4>
                <ul className="list-disc list-inside space-y-2">
                  {dummyProduct.features.map((feat, idx) => (
                    <li key={idx}>{feat}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Tab 2: Reviews & Comment Form */}
          {activeTab === 'reviews' && (
            <div className="space-y-8">
              
              {/* Add New Comment/Review Input */}
              <div className="bg-base-200/40 p-5 rounded-2xl border border-base-200 space-y-3">
                <h4 className="font-bold text-sm text-base-content flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-primary" /> Write a Customer Review
                </h4>
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Share your feedback about this product..."
                  className="textarea textarea-bordered w-full text-sm rounded-xl focus:outline-none"
                  rows={3}
                ></textarea>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 cursor-pointer" />
                    ))}
                  </div>
                  <button className="btn btn-primary btn-sm rounded-xl font-bold">
                    Submit Review
                  </button>
                </div>
              </div>

              {/* Existing Reviews List */}
              <div className="space-y-4 divide-y divide-base-200">
                {dummyProduct.reviews.map((rev) => (
                  <div key={rev.id} className="pt-4 first:pt-0 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Image src={rev.avatar} alt={rev.user} width={40} height={40} className="rounded-full" />
                        <div>
                          <h5 className="font-bold text-sm text-base-content">{rev.user}</h5>
                          <span className="text-xs text-base-content/50">{rev.date}</span>
                        </div>
                      </div>
                      <div className="flex text-amber-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-3.5 h-3.5 ${i < rev.rating ? 'fill-amber-400' : 'text-base-300'}`} />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-base-content/80 leading-relaxed pl-13">
                      {rev.comment}
                    </p>
                    <div className="pl-13">
                      <button className="btn btn-xs btn-ghost gap-1 text-base-content/60 hover:text-primary">
                        <ThumbsUp className="w-3 h-3" /> Helpful ({rev.likes})
                      </button>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};

export default ProductDetailsPage;