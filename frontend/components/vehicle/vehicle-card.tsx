'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Users, Gauge, Briefcase, Fuel } from 'lucide-react';
import { Vehicle } from '@aurelia/types';
import { formatCurrency, formatMileage, cn } from '@/lib/utils';

interface VehicleCardProps {
  vehicle: Vehicle;
  onQuickView?: (vehicle: Vehicle) => void;
  className?: string;
}

export function VehicleCard({
  vehicle,
  onQuickView,
  className,
}: VehicleCardProps) {
  const primaryImage =
    vehicle.images?.find((img) => img.isPrimary)?.url ||
    vehicle.images?.[0]?.url ||
    '/images/hero-1.png';

  const transmissionLabel =
    vehicle.transmission === 'AUTOMATIC'
      ? 'Automatic'
      : vehicle.transmission === 'MANUAL'
      ? 'Manual'
      : vehicle.transmission;

  // Approximate seating and luggage based on body type / category
  const isSuv = vehicle.category?.slug === 'suv' || vehicle.name.toLowerCase().includes('x5') || vehicle.name.toLowerCase().includes('gle') || vehicle.name.toLowerCase().includes('rover');
  const seats = isSuv ? 7 : (vehicle.category?.slug === 'sports' ? 2 : 5);
  const luggageBags = isSuv ? '4 bags' : (vehicle.category?.slug === 'sports' ? '1 bag' : '2 bags');

  return (
    <div
      className={cn(
        'group bg-[#F4F4F6] rounded-2xl sm:rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:shadow-md hover:bg-[#EFEFF2]',
        className
      )}
    >
      {/* Top: Floating Vehicle Image */}
      <Link href={`/vehicles/${vehicle.slug}`} className="block mb-6 overflow-hidden">
        <div className="relative aspect-[16/10] w-full flex items-center justify-center">
          <Image
            src={primaryImage}
            alt={vehicle.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-contain transition-transform duration-500 ease-out group-hover:scale-105"
          />
        </div>
      </Link>

      {/* Middle: Title and Price Row */}
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-gray-900 tracking-tight leading-snug">
            <Link href={`/vehicles/${vehicle.slug}`} className="hover:text-black">
              {vehicle.name}
            </Link>
          </h3>
          <p className="text-xs text-stone-500 mt-0.5">
            {vehicle.brand?.name || 'Aurelia'} · {vehicle.year}
          </p>
        </div>

        <div className="text-right shrink-0">
          <div className="text-base sm:text-lg font-extrabold text-gray-900">
            {formatCurrency(vehicle.price)}
          </div>
          <span className="text-[11px] text-stone-500 font-normal">
            /Allocation
          </span>
        </div>
      </div>

      {/* Bottom: 3-column Spec Icons Row */}
      <div className="pt-4 border-t border-[#E5E5E8] grid grid-cols-3 gap-2 text-stone-700">
        {/* Seat Column */}
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4 text-stone-700 shrink-0" />
          <div className="text-[11px] leading-tight">
            <span className="text-[10px] text-stone-400 block font-normal">Seat</span>
            <span className="font-semibold text-gray-900">{seats}</span>
          </div>
        </div>

        {/* Gearbox Column */}
        <div className="flex items-center gap-2">
          <Gauge className="h-4 w-4 text-stone-700 shrink-0" />
          <div className="text-[11px] leading-tight">
            <span className="text-[10px] text-stone-400 block font-normal">Gearbox</span>
            <span className="font-semibold text-gray-900">{transmissionLabel}</span>
          </div>
        </div>

        {/* Luggage / Fuel Column */}
        <div className="flex items-center gap-2">
          <Briefcase className="h-4 w-4 text-stone-700 shrink-0" />
          <div className="text-[11px] leading-tight">
            <span className="text-[10px] text-stone-400 block font-normal">Luggage</span>
            <span className="font-semibold text-gray-900">{luggageBags}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
