'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ArrowDownRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeroProps {
  onBookTestDrive?: () => void;
}

export function Hero({ onBookTestDrive }: HeroProps) {
  return (
    <section className="relative w-full h-screen min-h-screen lg:h-[100dvh] bg-[#0D0E10] text-white flex flex-col justify-end overflow-hidden">
      {/* Hero Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero/hero-main.jpg"
          alt="Aurelia Motors Flagship Luxury Vehicle"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center scale-[1.02] transition-transform duration-1000 ease-out"
        />
        {/* Soft cinematic vignette overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/50" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/20 to-black/60 pointer-events-none" />
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 lg:px-12 pb-14 md:pb-18">
        {/* Horizontal Hairline Divider */}
        <div className="w-full h-px bg-white/20 mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-3">
            <h1 className="sr-only">Aurelia Motors - Exceptional Luxury Vehicles</h1>
            <p className="text-sm md:text-base text-neutral-200 font-normal leading-relaxed max-w-xl antialiased">
              A curated collection of exceptional vehicles, selected for those who expect more from every journey.
            </p>
          </div>

          {/* Right CTA Action Buttons Column */}
          <div className="lg:col-span-5 flex flex-wrap sm:flex-nowrap gap-4 justify-start lg:justify-end items-center">
            <Link href="/vehicles" className="w-full sm:w-auto">
              <Button
                variant="champagne"
                size="md"
                className="w-full sm:w-auto px-7 flex items-center justify-between gap-3 text-[#111215] font-semibold text-xs tracking-tracked group"
              >
                <span>EXPLORE VEHICLES</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>

            <Button
              variant="dark"
              size="md"
              onClick={() => {
                if (onBookTestDrive) onBookTestDrive();
                else {
                  const el = document.getElementById('test-drive');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="w-full sm:w-auto px-7 flex items-center justify-between gap-3 text-white font-semibold text-xs tracking-tracked group border-white/30 hover:border-white"
            >
              <span>BOOK A TEST DRIVE</span>
              <ArrowDownRight className="h-4 w-4 transition-transform group-hover:translate-y-0.5 group-hover:translate-x-0.5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
