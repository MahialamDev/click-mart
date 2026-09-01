'use client';

import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Image from 'next/image';
import { 
  MapPin, 
  Plus, 
  Edit3, 
  Trash2, 
  CheckCircle2, 
  CreditCard, 
  Truck, 
  Phone, 
  User, 
  ShieldCheck, 
  ArrowRight,
  X,
  ShoppingBag
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import axiosInstance from '@/Hooks/axiosInstance';

type RootState = {
  auth: {
    user: {
      name?: string;
      email?: string;
      phone?: string;
    } | null;
  };
};

interface Address {
  id: string;
  title: string;
  name: string;
  phone: string;
  city: string;
  fullAddress: string;
}

interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string | null;
  color?: string;
}

interface ApiCartItem {
  id: string;
  quantity: number;
  color: string,
  product: {
    id: string;
    title: string;
    price: number;
    images?: {
      url: string;
    }[];
  };
}



const initialAddresses: Address[] = [
  {
    id: 'addr-1',
    title: 'Home',
    name: 'Md Mahi Alam',
    phone: '01712345678',
    city: 'Jamalpur',
    fullAddress: 'Station Road, Jamalpur Sadar, Jamalpur',
  },
  {
    id: 'addr-2',
    title: 'Office',
    name: 'Mahialam Rahat',
    phone: '01887654321',
    city: 'Dhaka',
    fullAddress: 'Level 5, Software Technology Park, Kawran Bazar, Dhaka',
  },
];

export default function CheckoutPage() {
  const reduxUser = useSelector((state: RootState) => state.auth.user);

  const [addresses, setAddresses] = useState<Address[]>(initialAddresses);
  const [selectedAddressId, setSelectedAddressId] = useState<string>(initialAddresses[0]?.id || '');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState<string | null>(null);

  const [orderItems, setOrderItems] = useState<CartItem[]>([]);
const [cartLoading, setCartLoading] = useState(true);

  const router = useRouter();
  
  const [addressForm, setAddressForm] = useState({
    title: 'Home',
    name: reduxUser?.name || '',
    phone: reduxUser?.phone || '',
    city: 'Dhaka',
    fullAddress: '',
  });

  useEffect(() => {
  const getCart = async () => {
    try {
      setCartLoading(true);

      const res = await axiosInstance.get("/cart");

      const items = res.data?.data?.items || [];

      const formattedItems: CartItem[] = items.map(
        (item: ApiCartItem) => ({
          id: item.id,
          productId: item.product.id,
          name: item.product.title,
          price: item.product.price,
          quantity: item.quantity,
          image: item.product.images?.[0]?.url || null,
          color: item.color
        }),
      );

      setOrderItems(formattedItems);
    } catch (error) {
      console.error("Failed to fetch cart:", error);
      setOrderItems([]);
    } finally {
      setCartLoading(false);
    }
  };

  getCart();
}, []);

  useEffect(() => {
    if (reduxUser) {
      setAddressForm((prev) => ({
        ...prev,
        name: reduxUser.name || prev.name,
        phone: reduxUser.phone || prev.phone,
      }));
    }
  }, [reduxUser]);

  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'online'>('cod');
  const [onlineProvider, setOnlineProvider] = useState<'bkash' | 'nagad' | 'rocket' | 'card'>('bkash');

  const subtotal = orderItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const deliveryCharge = 70;
  const grandTotal = subtotal + deliveryCharge;

  const handleSaveAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!addressForm.name || !addressForm.phone || !addressForm.fullAddress) {
      alert('Please fill out all required fields.');
      return;
    }

    if (editingAddressId) {
      setAddresses((prev) =>
        prev.map((addr) => (addr.id === editingAddressId ? { ...addr, ...addressForm } : addr))
      );
    } else {
      const newAddr: Address = { id: `addr-${Date.now()}`, ...addressForm };
      setAddresses((prev) => [...prev, newAddr]);
      setSelectedAddressId(newAddr.id);
    }
    closeModal();
  };

  const openAddModal = () => {
    setEditingAddressId(null);
    setAddressForm({
      title: 'Home',
      name: reduxUser?.name || '',
      phone: reduxUser?.phone || '',
      city: 'Dhaka',
      fullAddress: '',
    });
    setIsModalOpen(true);
  };

  const openEditModal = (addr: Address, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingAddressId(addr.id);
    setAddressForm({
      title: addr.title,
      name: addr.name,
      phone: addr.phone,
      city: addr.city,
      fullAddress: addr.fullAddress,
    });
    setIsModalOpen(true);
  };

  const handleDeleteAddress = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (addresses.length <= 1) {
      alert('You must keep at least one address.');
      return;
    }
    const filtered = addresses.filter((a) => a.id !== id);
    setAddresses(filtered);
    if (selectedAddressId === id) setSelectedAddressId(filtered[0].id);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingAddressId(null);
  };

  const handlePlaceOrder = () => {
    const activeAddress = addresses.find((a) => a.id === selectedAddressId);
    if (!activeAddress) {
      toast.error('Please select a valid address.');
      return;
    }
    toast.success(`Order Placed Successfully via ${paymentMethod === 'cod' ? 'Cash on Delivery' : onlineProvider.toUpperCase()}!`);
    router.push('/checkout/order-confirm/orderId=Du-441')
  };

  return (
    <div className="bg-base-200 min-h-screen py-8 text-base-content font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Header */}
        <div className="border-b border-base-300 pb-4">
          <h1 className="text-2xl sm:text-3xl font-black">Checkout</h1>
          <p className="text-xs text-base-content/70 mt-1">Review your ordered items, address, and payment options.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Content Area */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* 1. Customer Info */}
            <div className="bg-base-100 border border-base-300 p-5 rounded-2xl space-y-4 shadow-sm">
              <h3 className="text-sm font-bold flex items-center gap-2">
                <User className="w-4 h-4 text-primary" /> Account Details
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-3 bg-base-200 border border-base-300 rounded-xl space-y-1">
                  <span className="text-base-content/60 block text-[10px]">Name</span>
                  <p className="font-bold">{reduxUser?.name || 'Md Mahi Alam'}</p>
                </div>
                <div className="p-3 bg-base-200 border border-base-300 rounded-xl space-y-1">
                  <span className="text-base-content/60 block text-[10px]">Email</span>
                  <p className="font-bold">{reduxUser?.email || 'mahi@electbox.com'}</p>
                </div>
              </div>
            </div>

            {/* 2. Shipping Address Selection */}
            <div className="bg-base-100 border border-base-300 p-5 rounded-2xl space-y-4 shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary" /> Shipping Address
                </h3>
                <button
                  type="button"
                  onClick={openAddModal}
                  className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" /> Add New
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {addresses.map((addr) => {
                  const isSelected = selectedAddressId === addr.id;
                  return (
                    <div
                      key={addr.id}
                      onClick={() => setSelectedAddressId(addr.id)}
                      className={`relative p-4 rounded-xl border cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-primary/10 border-primary text-base-content'
                          : 'bg-base-200 border-base-300 text-base-content/80 hover:border-base-content/30'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span className="px-2 py-0.5 text-[10px] font-black uppercase bg-secondary text-secondary-content rounded-md">
                          {addr.title}
                        </span>
                        <div className="flex items-center gap-2">
                          <button onClick={(e) => openEditModal(addr, e)} className="hover:text-primary p-1">
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button onClick={(e) => handleDeleteAddress(addr.id, e)} className="hover:text-error p-1">
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <p className="text-xs font-bold mb-1">{addr.name}</p>
                      <p className="text-[11px] text-base-content/70 flex items-center gap-1 mb-1">
                        <Phone className="w-3 h-3 text-primary shrink-0" /> {addr.phone}
                      </p>
                      <p className="text-[11px] text-base-content/70 line-clamp-2 leading-relaxed">
                        {addr.fullAddress}, {addr.city}
                      </p>

                      {isSelected && (
                        <CheckCircle2 className="absolute bottom-3 right-3 w-4 h-4 text-primary" />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 3. Payment Method */}
            <div className="bg-base-100 border border-base-300 p-5 rounded-2xl space-y-4 shadow-sm">
              <h3 className="text-sm font-bold flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-primary" /> Payment Method
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-4 rounded-xl border cursor-pointer flex items-center gap-3 transition-all ${
                    paymentMethod === 'cod'
                      ? 'bg-primary/10 border-primary'
                      : 'bg-base-200 border-base-300 text-base-content/70'
                  }`}
                >
                  <Truck className="w-5 h-5 text-primary shrink-0" />
                  <div>
                    <p className="text-xs font-bold text-base-content">Cash on Delivery</p>
                    <p className="text-[10px] text-base-content/60">Pay cash when product arrives</p>
                  </div>
                </label>

                <label
                  onClick={() => setPaymentMethod('online')}
                  className={`p-4 rounded-xl border cursor-pointer flex items-center gap-3 transition-all ${
                    paymentMethod === 'online'
                      ? 'bg-primary/10 border-primary'
                      : 'bg-base-200 border-base-300 text-base-content/70'
                  }`}
                >
                  <CreditCard className="w-5 h-5 text-primary shrink-0" />
                  <div>
                    <p className="text-xs font-bold text-base-content">Online Payment</p>
                    <p className="text-[10px] text-base-content/60">bKash, Nagad, Rocket, Card</p>
                  </div>
                </label>
              </div>

              {paymentMethod === 'online' && (
                <div className="pt-3 border-t border-base-300 space-y-2">
                  <p className="text-xs font-bold">Select Online Gateway:</p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { id: 'bkash', name: 'bKash' },
                      { id: 'nagad', name: 'Nagad' },
                      { id: 'rocket', name: 'Rocket' },
                      { id: 'card', name: 'Card' },
                    ].map((provider) => (
                      <button
                        key={provider.id}
                        type="button"
                        onClick={() => setOnlineProvider(provider.id as any)}
                        className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all ${
                          onlineProvider === provider.id
                            ? 'border-primary bg-primary text-primary-content'
                            : 'border-base-300 bg-base-200 text-base-content/70'
                        }`}
                      >
                        {provider.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

          </div>

          {/* Right Sidebar: Product Items + Order Summary */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Ordered Items Preview List */}
            <div className="bg-base-100 border border-base-300 p-5 rounded-2xl space-y-4 shadow-sm">
              <h3 className="font-bold text-sm border-b border-base-300 pb-3 flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-primary" /> Items in Order ({orderItems.length})
              </h3>

              <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
                {orderItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 p-2 bg-base-200/50 rounded-xl border border-base-300">
                    <div className="relative w-14 h-14 bg-base-100 rounded-lg overflow-hidden shrink-0 border border-base-300">
                      <Image src='https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80' alt={item.name} fill className="object-contain p-1" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-xs truncate text-base-content">{item.name}</h4>
                      <p className="text-[10px] text-base-content/60">Qty: {item.quantity} | Color: {item.color}</p>
                      <p className="text-xs font-extrabold text-primary pt-0.5">৳{item.price.toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Price Calculations */}
            <div className="bg-base-100 border border-base-300 p-5 rounded-2xl space-y-4 shadow-sm sticky top-6">
              <h3 className="font-bold text-sm border-b border-base-300 pb-3">Order Summary</h3>

              <div className="space-y-2 text-xs text-base-content/80">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold text-base-content">৳{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Charge</span>
                  <span className="font-bold text-base-content">৳{deliveryCharge}</span>
                </div>
                <div className="flex justify-between border-t border-base-300 pt-3 text-sm font-black text-base-content">
                  <span>Grand Total</span>
                  <span className="text-primary text-base">৳{grandTotal.toLocaleString()}</span>
                </div>
              </div>

              <button
                onClick={handlePlaceOrder}
                className="btn btn-primary w-full text-primary-content font-black rounded-xl uppercase tracking-wider text-xs flex items-center justify-center gap-2"
              >
                Confirm Order <ArrowRight className="w-4 h-4" />
              </button>

              <div className="pt-2 text-[10px] text-base-content/60 space-y-1 border-t border-base-300">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-primary shrink-0" />
                  <span>Encrypted 100% Safe Checkout</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Add / Edit Address Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-base-100 border border-base-300 rounded-2xl w-full max-w-lg p-6 space-y-5 relative text-base-content shadow-2xl">
            <div className="flex items-center justify-between border-b border-base-300 pb-3">
              <h3 className="text-sm font-bold">
                {editingAddressId ? 'Edit Address' : 'Add New Address'}
              </h3>
              <button onClick={closeModal} className="hover:text-primary">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveAddress} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block mb-1 font-semibold text-base-content/70">Tag</label>
                  <select
                    value={addressForm.title}
                    onChange={(e) => setAddressForm({ ...addressForm, title: e.target.value })}
                    className="select select-sm select-bordered w-full rounded-xl bg-base-200"
                  >
                    <option value="Home">Home</option>
                    <option value="Office">Office</option>
                    <option value="Mess">Mess</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-1 font-semibold text-base-content/70">City</label>
                  <select
                    value={addressForm.city}
                    onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })}
                    className="select select-sm select-bordered w-full rounded-xl bg-base-200"
                  >
                    <option value="Dhaka">Dhaka</option>
                    <option value="Jamalpur">Jamalpur</option>
                    <option value="Chittagong">Chittagong</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block mb-1 font-semibold text-base-content/70">Name</label>
                  <input
                    type="text"
                    required
                    value={addressForm.name}
                    onChange={(e) => setAddressForm({ ...addressForm, name: e.target.value })}
                    className="input input-sm input-bordered w-full rounded-xl bg-base-200"
                  />
                </div>
                <div>
                  <label className="block mb-1 font-semibold text-base-content/70">Phone</label>
                  <input
                    type="text"
                    required
                    value={addressForm.phone}
                    onChange={(e) => setAddressForm({ ...addressForm, phone: e.target.value })}
                    className="input input-sm input-bordered w-full rounded-xl bg-base-200"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-1 font-semibold text-base-content/70">Full Address</label>
                <textarea
                  rows={3}
                  required
                  value={addressForm.fullAddress}
                  onChange={(e) => setAddressForm({ ...addressForm, fullAddress: e.target.value })}
                  className="textarea textarea-bordered w-full rounded-xl bg-base-200"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button type="button" onClick={closeModal} className="btn btn-sm btn-ghost w-1/2 rounded-xl">
                  Cancel
                </button>
                <button type="submit" className="btn btn-sm btn-primary w-1/2 rounded-xl font-bold">
                  {editingAddressId ? 'Update' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}