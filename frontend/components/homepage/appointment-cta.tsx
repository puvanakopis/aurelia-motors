'use client';

import * as React from 'react';
import { ArrowRight, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AppointmentCTAProps {
  onBookTestDrive?: () => void;
  onOpenConcierge?: () => void;
}

export function AppointmentCTA({
  onBookTestDrive,
  onOpenConcierge,
}: AppointmentCTAProps) {
  return (
    <section
      id="test-drive"
      className="bg-[#0D0E10] text-white py-20 md:py-28 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Headline */}
          <div className="lg:col-span-8 space-y-4">
            <p className="text-[11px] font-semibold uppercase tracking-tracked-wide text-stone-400">
              A PERSONAL APPOINTMENT
            </p>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white uppercase leading-[1.05]">
              EXPERIENCE IT
              <br />
              BEFORE YOU DECIDE.
            </h2>
            <p className="text-xs md:text-sm text-neutral-400 max-w-lg font-normal pt-2">
              Some vehicles need to be felt, not explained.
            </p>
          </div>

          {/* Right Column: Action Stack */}
          <div className="lg:col-span-4 flex flex-col space-y-4 sm:max-w-xs lg:ml-auto w-full">
            {/* Primary Button */}
            <Button
              variant="champagne"
              size="md"
              onClick={onBookTestDrive}
              className="w-full flex items-center justify-between px-6 py-3.5 text-xs font-semibold tracking-tracked text-[#111215] rounded-full group cursor-pointer"
            >
              <span>BOOK A TEST DRIVE</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>

            {/* Call Button */}
            <a
              href="tel:+94112589000"
              className="w-full inline-flex items-center justify-center gap-2.5 h-11 px-6 text-xs uppercase font-medium tracking-tracked bg-transparent text-white border border-neutral-700 hover:border-neutral-500 hover:bg-white/5 rounded-full transition-colors"
            >
              <Phone className="h-3.5 w-3.5" />
              <span>CALL OUR SHOWROOM</span>
            </a>

            {/* Email Concierge Link */}
            <button
              onClick={onOpenConcierge}
              className="text-[11px] uppercase tracking-tracked text-neutral-400 hover:text-white transition-colors text-center pt-2 cursor-pointer font-medium"
            >
              EMAIL THE CONCIERGE
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
