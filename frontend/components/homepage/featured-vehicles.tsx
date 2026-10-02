'use client';

import * as React from 'react';
import Link from 'next/link';
import { Vehicle } from '@aurelia/types';
import { VehicleCard } from '@/components/vehicle/vehicle-card';

interface FeaturedVehiclesProps {
  vehicles: Vehicle[];
  onQuickView?: (vehicle: Vehicle) => void;
}

export function FeaturedVehicles({
  vehicles,
  onQuickView,
}: FeaturedVehiclesProps) {
  return (
    <section className="bg-white py-12 sm:py-16 text-foreground">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            Our rental car collection
          </h2>

          <Link href="/vehicles">
            <button className="bg-[#FEE123] hover:bg-[#FDD835] text-black font-bold text-xs px-5 py-2.5 rounded-lg inline-flex items-center gap-2.5 transition-transform active:scale-95 shadow-sm cursor-pointer">
              <span>View all vehicles</span>
              <span className="w-4 h-4 bg-black text-white rounded-sm flex items-center justify-center text-[10px] font-bold">
                →
              </span>
            </button>
          </Link>
        </div>

        {/* Vehicles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {vehicles.map((vehicle) => (
            <VehicleCard
              key={vehicle.id}
              vehicle={vehicle}
              onQuickView={onQuickView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
