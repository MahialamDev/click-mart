'use client';

import React from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="bg-base-100 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h1 className="text-3xl font-black text-base-content">Contact Us</h1>
          <p className="text-sm text-base-content/60">Have questions or need support? Send us a message.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5 space-y-4">
            <div className="p-6 bg-base-200/50 border border-base-200 rounded-2xl flex items-center gap-4">
              <Phone className="w-6 h-6 text-primary" />
              <div>
                <h4 className="font-bold text-sm text-base-content">Call Center</h4>
                <p className="text-xs text-base-content/60">+91 0123-456-789</p>
              </div>
            </div>
            <div className="p-6 bg-base-200/50 border border-base-200 rounded-2xl flex items-center gap-4">
              <Mail className="w-6 h-6 text-primary" />
              <div>
                <h4 className="font-bold text-sm text-base-content">Email Support</h4>
                <p className="text-xs text-base-content/60">support@electbox.com</p>
              </div>
            </div>
            <div className="p-6 bg-base-200/50 border border-base-200 rounded-2xl flex items-center gap-4">
              <MapPin className="w-6 h-6 text-primary" />
              <div>
                <h4 className="font-bold text-sm text-base-content">Head Office</h4>
                <p className="text-xs text-base-content/60">Jamalpur, Bangladesh</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 bg-base-200/40 border border-base-200 p-6 sm:p-8 rounded-2xl space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input type="text" placeholder="Your Name" className="input input-bordered w-full" />
              <input type="email" placeholder="Your Email" className="input input-bordered w-full" />
            </div>
            <input type="text" placeholder="Subject" className="input input-bordered w-full" />
            <textarea placeholder="Write your message here..." className="textarea textarea-bordered w-full" rows={4}></textarea>
            <button className="btn btn-primary gap-2 rounded-xl">
              <Send className="w-4 h-4" /> Send Message
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}