'use client';

import React from 'react';

export default function CheckoutPage() {
  return (
    <div className="bg-base-100 min-h-screen py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
        <h1 className="text-3xl font-black text-base-content">Checkout</h1>

        <div className="bg-base-200/40 border border-base-200 p-6 sm:p-8 rounded-2xl space-y-6">
          <h3 className="text-lg font-bold text-base-content">Shipping Details</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input type="text" placeholder="Full Name" className="input input-bordered w-full" />
            <input type="email" placeholder="Email Address" className="input input-bordered w-full" />
            <input type="text" placeholder="Phone Number" className="input input-bordered w-full" />
            <input type="text" placeholder="City / Region" className="input input-bordered w-full" />
            <textarea placeholder="Full Shipping Address" className="textarea textarea-bordered w-full sm:col-span-2" rows={3}></textarea>
          </div>

          <h3 className="text-lg font-bold text-base-content pt-4">Payment Method</h3>
          <div className="flex gap-4">
            <label className="label cursor-pointer gap-2 border border-base-300 p-3 rounded-xl bg-base-100">
              <input type="radio" name="payment" className="radio radio-primary" defaultChecked />
              <span className="label-text font-bold">Cash on Delivery</span>
            </label>
            <label className="label cursor-pointer gap-2 border border-base-300 p-3 rounded-xl bg-base-100">
              <input type="radio" name="payment" className="radio radio-primary" />
              <span className="label-text font-bold">Online Payment</span>
            </label>
          </div>

          <button className="btn btn-primary w-full btn-lg rounded-xl font-bold">Place Order Now</button>
        </div>
      </div>
    </div>
  );
}