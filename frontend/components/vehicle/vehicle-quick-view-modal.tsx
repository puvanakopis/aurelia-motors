'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Vehicle } from '@aurelia/types';
import { Modal } from '@/components/ui/modal';
import { Button } from '@/components/ui/button';
import { formatCurrency, formatMileage } from '@/lib/utils';
import { ArrowUpRight } from 'lucide-react';

interface VehicleQuickViewModalProps {
  vehicle: Vehicle | null;
  isOpen: boolean;
  onClose: () => void;
  onBookTestDrive: (vehicleId: string) => void;
}

export function VehicleQuickViewModal({
  vehicle,
  isOpen,
  onClose,
  onBookTestDrive,
}: VehicleQuickViewModalProps) {
  if (!vehicle) return null;

  const primaryImage =
    vehicle.images?.find((img) => img.isPrimary)?.url ||
    vehicle.images?.[0]?.url ||
    '/images/hero/hero-main.jpg';

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={vehicle.name}
      subtitle={`${vehicle.brand?.name || 'AURELIA'} · ${vehicle.year}`}
      maxWidth="2xl"
    >
      <div className="space-y-6">
        {/* Main Image */}
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-stone-100 dark:bg-stone-900 rounded-2xl">
          <Image
            src={primaryImage}
            alt={vehicle.name}
            fill
            sizes="800px"
            className="object-cover"
          />
        </div>

        {/* Price & Summary */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 hairline-b pb-4">
          <div>
            <h4 className="text-xl font-bold uppercase tracking-tight text-foreground">
              {vehicle.model}
            </h4>
            {vehicle.variant && (
              <p className="text-xs text-stone-500">{vehicle.variant}</p>
            )}
          </div>
          <div className="text-2xl font-bold text-foreground">
            {formatCurrency(vehicle.price)}
          </div>
        </div>

        {/* Description */}
        <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
          {vehicle.description}
        </p>

        {/* Key Specs Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-stone-50 dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800 rounded-2xl">
          <div>
            <span className="text-[10px] uppercase tracking-tracked text-stone-400 block">Fuel</span>
            <span className="text-xs font-semibold text-foreground">{vehicle.fuelType}</span>
          </div>
          <div>
            <span className="text-[10px] uppercase tracking-tracked text-stone-400 block">Transmission</span>
            <span className="text-xs font-semibold text-foreground">{vehicle.transmission}</span>
          </div>
          <div>
            <span className="text-[10px] uppercase tracking-tracked text-stone-400 block">Mileage</span>
            <span className="text-xs font-semibold text-foreground">{formatMileage(vehicle.mileage)}</span>
          </div>
          <div>
            <span className="text-[10px] uppercase tracking-tracked text-stone-400 block">Horsepower</span>
            <span className="text-xs font-semibold text-foreground">{vehicle.horsepower ? `${vehicle.horsepower} HP` : 'N/A'}</span>
          </div>
        </div>

        {/* Specifications List */}
        {vehicle.specifications && vehicle.specifications.length > 0 && (
          <div className="space-y-2">
            <h5 className="text-[11px] font-semibold uppercase tracking-tracked text-stone-500">
              Highlighted Specifications
            </h5>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {vehicle.specifications.map((spec) => (
                <div key={spec.id} className="flex justify-between py-1 hairline-b">
                  <span className="text-stone-500">{spec.name}</span>
                  <span className="font-medium text-foreground">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Button
            variant="champagne"
            className="flex-1 rounded-full"
            onClick={() => {
              onClose();
              onBookTestDrive(vehicle.id);
            }}
          >
            BOOK TEST DRIVE
          </Button>

          <Link href={`/vehicles/${vehicle.slug}`} className="flex-1">
            <Button variant="primary" className="w-full flex items-center justify-center gap-2 rounded-full">
              <span>FULL VEHICLE DOSSIER</span>
              <ArrowUpRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </Modal>
  );
}
