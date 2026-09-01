'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Trash2, 
  ArrowRight, 
  ShieldCheck, 
  Truck, 
  Tag, 
  MapPin, 
  ShoppingBag, 
  Plus, 
  Minus,
  CreditCard
} from 'lucide-react';
import axiosInstance from '@/Hooks/axiosInstance';
import { toast } from 'react-hot-toast';

interface CartItem {
  id: string;
  productId: string;
  title: string;
  price: number;
  originalPrice: number;
  image: string | null;
  quantity: number;
  sku: string;
  color?: string;
}

interface ApiCartItem {
  id: string;
  quantity: number;

  product: {
    id: string;
    title: string;
    price: number;
    originalPrice: number;
    sku: string;

    images: {
      url: string;
    }[];
  };
}



export default function CartPage() {
  const [deliveryZone, setDeliveryZone] = useState<'inside' | 'outside'>('inside');
  const [coupon, setCoupon] = useState('');
  const [ discount, setDiscount] = useState(0);
  const [couponApplied, setCouponApplied] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

 useEffect(() => {
  const getCart = async () => {
    try {
      setLoading(true)
      const res = await axiosInstance.get("/cart");

      const items = res.data.data.items || [];

      const formattedItems: CartItem[] = items.map((item: ApiCartItem) => ({
        id: item.id,
        productId: item.product.id,
        title: item.product.title,
        price: item.product.price,
        originalPrice: item.product.originalPrice,
        image: item.product.images?.[0]?.url || null,
        quantity: item.quantity,
        sku: item.product.sku,
      }));

      setCartItems(formattedItems);
    } catch (error) {
      console.error("Failed to fetch cart:", error);
      setCartItems([]);
    } finally {
      setLoading(false);
    }
  };

  getCart();
}, []);
  // Delivery Charges (BDT)
  const deliveryCharge = deliveryZone === 'inside' ? 70 : 130;

  // Quantity Handler
  const handleQuantity = (id: string, type: 'inc' | 'dec') => {
    setCartItems(prev =>
      prev.map(item => {
        if (item.id === id) {
          const newQty = type === 'inc' ? item.quantity + 1 : Math.max(1, item.quantity - 1);
          return { ...item, quantity: newQty };
        }
        return item;
      })
    );
  };

  // Remove Item Handler
  const removeItem = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  // Calculations
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const totalSavings = cartItems.reduce((acc, item) => acc + (item.originalPrice - item.price) * item.quantity, 0);
  const grandTotal = subtotal + deliveryCharge - discount;

  // Coupon Apply
  const applyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (coupon.toLowerCase() === 'elect10') {
      setDiscount(Math.round(subtotal * 0.1));
      setCouponApplied(true);
    } else {
      toast.error('Invalid Promo Code! Try "ELECT10"');
    }
  };

  if (loading) {
  return (
    <div className="bg-base-200 min-h-screen flex items-center justify-center">
      <span className="loading loading-spinner loading-lg text-primary"></span>
    </div>
  );
}

  if (cartItems.length === 0) {
    return (
      <div className="bg-base-200 min-h-screen py-16 flex items-center justify-center font-sans text-base-content">
        <div className="text-center space-y-4 max-w-md px-4">
          <div className="w-20 h-20 bg-base-100 border border-base-300 rounded-full flex items-center justify-center mx-auto text-primary">
            <ShoppingBag className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-black">Your Shopping Cart is Empty!</h2>
          <p className="text-xs text-base-content/70">Looks like you haven&apos;t added anything to your cart yet.</p>
          <Link href="/products" className="btn btn-primary text-primary-content font-bold border-none rounded-xl">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-base-200 min-h-screen py-8 text-base-content font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-base-300 pb-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black">Shopping Cart</h1>
            <p className="text-xs text-base-content/70 mt-1">You have <span className="text-primary font-bold">{cartItems.length} items</span> in your cart</p>
          </div>
          <Link href="/products" className="text-xs font-bold text-primary hover:underline flex items-center gap-1">
            Continue Shopping <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Free Shipping Tracker */}
        <div className="bg-base-100 border border-base-300 p-4 rounded-2xl space-y-2 shadow-sm">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-base-content flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-primary" /> 
              {subtotal >= 10000 ? 'Congrats! You unlocked FREE Shipping!' : `Add ৳${(10000 - subtotal).toLocaleString()} more for FREE Express Shipping!`}
            </span>
            <span className="font-bold text-primary">{Math.min(100, Math.round((subtotal / 10000) * 100))}%</span>
          </div>
          <div className="w-full h-2 bg-base-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary transition-all duration-300"
              style={{ width: `${Math.min(100, (subtotal / 10000) * 100)}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Cart Item List */}
          <div className="lg:col-span-8 space-y-3">
            {cartItems.map((item) => (
              <div 
                key={item.id} 
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-base-100 border border-base-300 rounded-2xl gap-4 hover:border-base-content/20 transition-all shadow-sm"
              >
                {/* Product Info */}
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <div className="relative w-20 h-20 bg-base-200 rounded-xl overflow-hidden shrink-0 border border-base-300">
                    <Image src='https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80' alt={item.title} fill className="object-contain p-2" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-bold text-xs sm:text-sm text-base-content line-clamp-1">{item.title}</h4>
                    <p className="text-[11px] text-base-content/70">Color: <span className="text-base-content font-medium">{item.color}</span> | SKU: {item.sku}</p>
                    <div className="flex items-baseline gap-2 pt-0.5">
                      <span className="text-sm font-bold text-primary">৳{item.price.toLocaleString()}</span>
                      <span className="text-xs text-base-content/50 line-through">৳{item.originalPrice.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Quantity Control & Actions */}
                <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4 pt-2 sm:pt-0 border-t sm:border-t-0 border-base-300">
                  <div className="flex items-center border border-base-300 rounded-xl bg-base-200">
                    <button 
                      onClick={() => handleQuantity(item.id, 'dec')} 
                      className="p-1.5 hover:text-primary text-base-content/70 transition-colors"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-3 text-xs font-bold text-base-content">{item.quantity}</span>
                    <button 
                      onClick={() => handleQuantity(item.id, 'inc')} 
                      className="p-1.5 hover:text-primary text-base-content/70 transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="text-right">
                    <span className="text-sm font-black text-base-content block">৳{(item.price * item.quantity).toLocaleString()}</span>
                  </div>

                  <button 
                    onClick={() => removeItem(item.id)} 
                    className="p-2 text-base-content/50 hover:text-error hover:bg-error/10 rounded-xl transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}

            {/* Savings Notice */}
            {totalSavings > 0 && (
              <div className="p-3 bg-success/10 border border-success/20 text-success rounded-xl text-xs flex items-center justify-between">
                <span>🎉 You are saving total <strong>৳{totalSavings.toLocaleString()}</strong> on this order!</span>
              </div>
            )}
          </div>

          {/* Cart Summary */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-base-100 border border-base-300 p-5 rounded-2xl space-y-4 shadow-sm">
              <h3 className="font-bold text-base text-base-content border-b border-base-300 pb-3">Order Summary</h3>
              
              {/* Delivery Zone Selector */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-base-content/80 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-primary" /> Delivery Location
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setDeliveryZone('inside')}
                    className={`py-2 px-3 text-xs rounded-xl border font-semibold text-center transition-all ${
                      deliveryZone === 'inside'
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-base-300 bg-base-200 text-base-content/70'
                    }`}
                  >
                    Inside Dhaka (৳70)
                  </button>
                  <button
                    onClick={() => setDeliveryZone('outside')}
                    className={`py-2 px-3 text-xs rounded-xl border font-semibold text-center transition-all ${
                      deliveryZone === 'outside'
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-base-300 bg-base-200 text-base-content/70'
                    }`}
                  >
                    Outside Dhaka (৳130)
                  </button>
                </div>
              </div>

              {/* Promo Code Input */}
              <form onSubmit={applyCoupon} className="space-y-1.5 pt-2 border-t border-base-300">
                <label className="text-xs font-bold text-base-content/80 flex items-center gap-1">
                  <Tag className="w-3.5 h-3.5 text-primary" /> Apply Coupon Code
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Use code: ELECT10"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    disabled={couponApplied}
                    className="w-full px-3 py-2 bg-base-200 border border-base-300 rounded-xl text-xs text-base-content placeholder-base-content/50 focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                  <button
                    type="submit"
                    disabled={couponApplied}
                    className="px-4 py-2 bg-secondary text-secondary-content hover:bg-secondary/90 text-xs font-bold rounded-xl transition-colors disabled:opacity-50"
                  >
                    {couponApplied ? 'Applied' : 'Apply'}
                  </button>
                </div>
              </form>

              {/* Calculation List */}
              <div className="space-y-2.5 text-xs border-t border-base-300 pt-3 text-base-content/80">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold text-base-content">৳{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Charge</span>
                  <span className="font-bold text-base-content">৳{deliveryCharge}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-success">
                    <span>Discount (10%)</span>
                    <span className="font-bold">- ৳{discount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between border-t border-base-300 pt-3 text-sm font-black text-base-content">
                  <span>Grand Total</span>
                  <span className="text-primary text-base">৳{grandTotal.toLocaleString()}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <Link href={'/checkout'} className="w-full py-3 bg-primary text-primary-content hover:opacity-90 font-bold rounded-xl transition-all flex items-center justify-center gap-2 text-xs uppercase tracking-wider">
                Proceed to Checkout <ArrowRight className="w-4 h-4" />
              </Link>

              {/* Trust Badges */}
              <div className="pt-2 grid grid-cols-2 gap-2 text-[10px] text-base-content/70">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-primary shrink-0" />
                  <span>100% Secure Checkout</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CreditCard className="w-3.5 h-3.5 text-primary shrink-0" />
                  <span>bKash, Nagad & Cards</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}