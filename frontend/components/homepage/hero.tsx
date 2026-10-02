'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, Zap, Tag, Headphones } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeroProps {
  onBookTestDrive?: () => void;
}

export function Hero({ onBookTestDrive }: HeroProps) {
  return (
    <div className="w-full bg-white pt-24 sm:pt-28">
      {/* 1. Hero Rounded Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="relative w-full h-[460px] sm:h-[540px] md:h-[600px] rounded-3xl overflow-hidden shadow-2xl flex flex-col justify-end p-8 sm:p-14 lg:p-16">
          {/* Background Image */}
          <Image
            src="/images/hero-1.png"
            alt="Aurelia Motors Flagship Luxury Vehicle"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          {/* Soft vignette overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20" />

          {/* Hero Content */}
          <div className="relative z-10 max-w-2xl space-y-6">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-tight">
              Quick and affordable luxury salon
            </h1>

            <div>
              <button
                onClick={() => {
                  if (onBookTestDrive) onBookTestDrive();
                  else {
                    const el = document.getElementById('test-drive');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="bg-[#FEE123] hover:bg-[#FDD835] text-black font-bold text-xs sm:text-sm px-6 py-3.5 rounded-lg inline-flex items-center gap-3 transition-transform active:scale-95 shadow-md cursor-pointer"
              >
                <span>Book your drive</span>
                <span className="w-5 h-5 bg-black text-white rounded-sm flex items-center justify-center text-xs font-bold">
                  →
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Value Proposition 4-Column Bar */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 sm:py-20">
        <div className="text-center max-w-xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            Enjoy flexibility and unbeatable rates with our city car rentals
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Item 1 */}
          <div className="flex flex-col items-center text-center space-y-3 p-4">
            <div className="w-12 h-12 rounded-full bg-[#F4F4F6] flex items-center justify-center text-gray-900 mb-1">
              <ShieldCheck className="w-6 h-6 text-gray-900" />
            </div>
            <h3 className="text-sm font-bold text-gray-900">No hidden costs</h3>
            <p className="text-xs text-stone-500 leading-relaxed max-w-xs">
              Direct, transparent pricing with all taxes and certified inspections included upfront.
            </p>
          </div>

          {/* Item 2 */}
          <div className="flex flex-col items-center text-center space-y-3 p-4">
            <div className="w-12 h-12 rounded-full bg-[#F4F4F6] flex items-center justify-center text-gray-900 mb-1">
              <Zap className="w-6 h-6 text-gray-900" />
            </div>
            <h3 className="text-sm font-bold text-gray-900">Easy reservations</h3>
            <p className="text-xs text-stone-500 leading-relaxed max-w-xs">
              Book online in seconds or schedule a bespoke appointment with our private curators.
            </p>
          </div>

          {/* Item 3 */}
          <div className="flex flex-col items-center text-center space-y-3 p-4">
            <div className="w-12 h-12 rounded-full bg-[#F4F4F6] flex items-center justify-center text-gray-900 mb-1">
              <Tag className="w-6 h-6 text-gray-900" />
            </div>
            <h3 className="text-sm font-bold text-gray-900">Affordable pricing</h3>
            <p className="text-xs text-stone-500 leading-relaxed max-w-xs">
              Competitive acquisition terms and customized trade-in appraisals on every vehicle.
            </p>
          </div>

          {/* Item 4 */}
          <div className="flex flex-col items-center text-center space-y-3 p-4">
            <div className="w-12 h-12 rounded-full bg-[#F4F4F6] flex items-center justify-center text-gray-900 mb-1">
              <Headphones className="w-6 h-6 text-gray-900" />
            </div>
            <h3 className="text-sm font-bold text-gray-900">24/7 support</h3>
            <p className="text-xs text-stone-500 leading-relaxed max-w-xs">
              Dedicated private concierge support throughout your entire ownership journey.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
