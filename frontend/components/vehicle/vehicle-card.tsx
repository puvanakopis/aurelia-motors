'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Vehicle } from '@aurelia/types';
import { formatCurrency, formatMileage, cn } from '@/lib/utils';

interface VehicleCardProps {
  vehicle: Vehicle;
  isFavorite?: boolean;
  onToggleFavorite?: (id: string) => void;
  onQuickView?: (vehicle: Vehicle) => void;
  className?: string;
}

export function VehicleCard({
  vehicle,
  isFavorite = false,
  onToggleFavorite,
  onQuickView,
  className,
}: VehicleCardProps) {
  const primaryImage =
    vehicle.images?.find((img) => img.isPrimary)?.url ||
    vehicle.images?.[0]?.url ||
    '/images/hero/hero-main.jpg';

  const brandName = vehicle.brand?.name || 'AURELIA';
  const transmissionLabel =
    vehicle.transmission === 'AUTOMATIC'
      ? 'Auto'
      : vehicle.transmission === 'MANUAL'
      ? 'Manual'
      : vehicle.transmission;

  return (
    <div
      className={cn(
        'group flex flex-col bg-transparent pb-8 transition-all duration-300',
        className
      )}
    >
      {/* Vehicle Image Container */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-stone-100 dark:bg-stone-900 mb-5">
        <Image
          src={primaryImage}
          alt={vehicle.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Quick Spec Badge */}
        {vehicle.discountPrice && (
          <span className="absolute bottom-3 left-3 bg-black/80 backdrop-blur-sm text-white text-[10px] font-semibold tracking-tracked uppercase px-2 py-1">
            Special Offer
          </span>
        )}
      </div>

      {/* Metadata & Title Header */}
      <div className="flex justify-between items-baseline mb-1">
        <span className="text-[11px] uppercase tracking-tracked text-stone-500 font-medium">
          {brandName} · {vehicle.year}
        </span>
        <span className="text-sm font-semibold tracking-tight text-foreground">
          {formatCurrency(vehicle.price)}
        </span>
      </div>

      {/* Model Name */}
      <h3 className="text-lg md:text-xl font-bold tracking-tight text-foreground group-hover:text-stone-700 dark:group-hover:text-stone-300 transition-colors mb-2">
        <Link href={`/vehicles/${vehicle.slug}`}>
          {vehicle.model}
        </Link>
      </h3>

      {/* Specs Line */}
      <p className="text-xs text-stone-500 mb-4 font-normal">
        {vehicle.fuelType.charAt(0) + vehicle.fuelType.slice(1).toLowerCase()} ·{' '}
        {transmissionLabel} · {formatMileage(vehicle.mileage)}
      </p>

      {/* View Vehicle Action Link */}
      <div className="mt-auto flex items-center justify-between pt-2">
        <Link
          href={`/vehicles/${vehicle.slug}`}
          className="inline-flex items-center gap-1.5 text-[11px] uppercase font-semibold tracking-tracked text-foreground hover:text-stone-600 transition-colors group/link"
        >
          <span>VIEW VEHICLE</span>
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
        </Link>

        {onQuickView && (
          <button
            onClick={() => onQuickView(vehicle)}
            className="text-[10px] uppercase tracking-tracked text-stone-400 hover:text-stone-900 dark:hover:text-white transition-colors cursor-pointer"
          >
            Quick Specs
          </button>
        )}
      </div>

      {/* Bottom Hairline Divider matching reference */}
      <div className="w-full h-px bg-[#E5E2DC] dark:bg-neutral-800 mt-6" />
    </div>
  );
}
