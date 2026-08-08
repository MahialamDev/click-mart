import React from 'react';
import { ShoppingBag, ArrowRight, ShieldCheck, Truck, RefreshCw, Star } from 'lucide-react';
import { getCurrentUser } from '@/lib/auth';

const Hero = async() => {
  const user = await getCurrentUser();
  console.log(user, 'current')
  return (
    <div className="bg-gradient-to-b from-blue-50 via-white to-white py-12 md:py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headline & CTA */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Promo Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-100 text-blue-700 text-xs sm:text-sm font-semibold tracking-wide">
              <span className="bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full uppercase">New</span>
              Summer Sale is Live — Up to 50% Off! { user?.email}
            </div>

            {/* Main Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight leading-tight">
              Everything You Need, <br className="hidden sm:inline" />
              Just a <span className="text-blue-600 underline decoration-blue-300 decoration-wavy">Click Away</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto lg:mx-0">
              Discover thousands of premium products across tech, fashion, home essentials, and more. Fast shipping and guaranteed best prices at ClickMart.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <a
                href="#shop"
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 border border-transparent text-base font-medium rounded-xl text-white bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/25 transition-all duration-200 gap-2"
              >
                <ShoppingBag className="h-5 w-5" />
                Shop Now
              </a>
              <a
                href="#deals"
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 border border-gray-300 text-base font-medium rounded-xl text-gray-700 bg-white hover:bg-gray-50 transition-all duration-200 gap-2"
              >
                View Hot Deals
                <ArrowRight className="h-5 w-5 text-gray-400" />
              </a>
            </div>

            {/* Social Proof */}
            <div className="pt-6 border-t border-gray-200/80 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400" />
                  ))}
                </div>
                <span className="font-bold text-gray-900 ml-1">4.9/5</span>
              </div>
              <span className="text-gray-300">|</span>
              <p>Trusted by <span className="font-semibold text-gray-900">50,000+</span> happy shoppers</p>
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Background Glow Effect */}
              <div className="absolute -top-4 -left-4 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-pulse"></div>
              <div className="absolute -bottom-4 -right-4 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-pulse delay-1000"></div>

              {/* Main Product Card Image */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-gray-100 bg-white">
                <img
                  src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80"
                  alt="Premium Headphones"
                  className="w-full h-[380px] object-cover object-center"
                />

                {/* Floating Discount Badge */}
                <div className="absolute top-4 right-4 bg-red-500 text-white font-bold text-sm px-3 py-1.5 rounded-full shadow-md">
                  30% OFF
                </div>

                {/* Floating Product Highlight Card */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md p-4 rounded-2xl border border-white/40 shadow-lg flex items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-blue-600">Featured Item</span>
                    <h4 className="text-sm font-bold text-gray-900">Wireless Noise-Canceling Headphones</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-lg font-bold text-gray-900">$199.99</span>
                      <span className="text-xs text-gray-400 line-through">$285.00</span>
                    </div>
                  </div>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white p-2.5 rounded-xl transition-colors">
                    <ShoppingBag className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Value Proposition Strip */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 pt-10 border-t border-gray-100">
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50/80">
            <div className="p-3 bg-blue-100 text-blue-600 rounded-xl">
              <Truck className="h-6 w-6" />
            </div>
            <div>
              <h4 className="font-bold text-gray-900 text-sm">Free Express Delivery</h4>
              <p className="text-xs text-gray-500">On all orders over $50</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50/80">
            <div className="p-3 bg-blue-100 text-blue-600 rounded-xl">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <h4 className="font-bold text-gray-900 text-sm">Secure Shopping</h4>
              <p className="text-xs text-gray-500">100% protected online payments</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50/80">
            <div className="p-3 bg-blue-100 text-blue-600 rounded-xl">
              <RefreshCw className="h-6 w-6" />
            </div>
            <div>
              <h4 className="font-bold text-gray-900 text-sm">30-Day Easy Returns</h4>
              <p className="text-xs text-gray-500">Hassle-free money-back guarantee</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Hero;