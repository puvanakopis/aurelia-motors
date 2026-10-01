'use client';

import * as React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Vehicle } from '@aurelia/types';
import { VehicleCard } from '@/components/vehicle/vehicle-card';
import { Button } from '@/components/ui/button';

interface FeaturedVehiclesProps {
  vehicles: Vehicle[];
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  onQuickView?: (vehicle: Vehicle) => void;
}

export function FeaturedVehicles({
  vehicles,
  favorites,
  onToggleFavorite,
  onQuickView,
}: FeaturedVehiclesProps) {
  return (
    <section className="bg-[#FAF9F6] py-20 md:py-28 text-foreground">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Vehicles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {vehicles.map((vehicle) => (
            <VehicleCard
              key={vehicle.id}
              vehicle={vehicle}
              isFavorite={favorites.includes(vehicle.id)}
              onToggleFavorite={onToggleFavorite}
              onQuickView={onQuickView}
            />
          ))}
        </div>

        {/* View All Vehicles Centered CTA */}
        <div className="mt-16 flex justify-center">
          <Link href="/vehicles">
            <Button
              variant="outline"
              size="md"
              className="bg-transparent border-[#D5D1C8] text-[#111215] hover:bg-[#F2EFEB] px-8 py-3 font-semibold text-xs tracking-tracked flex items-center gap-2"
            >
              <span>VIEW ALL VEHICLES</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
