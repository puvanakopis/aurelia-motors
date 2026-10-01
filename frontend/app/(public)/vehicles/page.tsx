'use client';

import * as React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { VehicleCard } from '@/components/vehicle/vehicle-card';
import { VehicleQuickViewModal } from '@/components/vehicle/vehicle-quick-view-modal';
import { TestDriveModal } from '@/components/forms/test-drive-modal';
import { SAMPLE_VEHICLES, SAMPLE_CATEGORIES, SAMPLE_BRANCHES, SAMPLE_BRANDS } from '@/lib/constants';
import { Vehicle, FuelType } from '@aurelia/types';
import { Search, Filter, SlidersHorizontal } from 'lucide-react';
import { Input } from '@/components/ui/input';

export default function VehiclesPage() {
  const [vehicles] = React.useState<Vehicle[]>(SAMPLE_VEHICLES);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState<string>('all');
  const [selectedBrand, setSelectedBrand] = React.useState<string>('all');
  const [selectedFuel, setSelectedFuel] = React.useState<string>('all');
  const [favorites, setFavorites] = React.useState<string[]>(['veh-2']);
  const [quickViewVehicle, setQuickViewVehicle] = React.useState<Vehicle | null>(null);
  const [isTestDriveOpen, setIsTestDriveOpen] = React.useState(false);
  const [selectedVehicleForDrive, setSelectedVehicleForDrive] = React.useState<string>('veh-1');

  const filteredVehicles = vehicles.filter((v) => {
    const matchesSearch =
      v.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.brand?.name.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === 'all' || v.category?.slug === selectedCategory;

    const matchesBrand =
      selectedBrand === 'all' || v.brand?.slug === selectedBrand;

    const matchesFuel =
      selectedFuel === 'all' || v.fuelType === selectedFuel;

    return matchesSearch && matchesCategory && matchesBrand && matchesFuel;
  });

  const toggleFavorite = (vehicleId: string) => {
    setFavorites((prev) =>
      prev.includes(vehicleId)
        ? prev.filter((id) => id !== vehicleId)
        : [...prev, vehicleId]
    );
  };

  const handleOpenTestDrive = (vehicleId?: string) => {
    if (vehicleId) setSelectedVehicleForDrive(vehicleId);
    setIsTestDriveOpen(true);
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#FAF9F6]">
      <Navbar onOpenTestDrive={() => handleOpenTestDrive()} favoritesCount={favorites.length} />

      <main className="flex-1 pt-28 pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {/* Header */}
          <div className="border-b border-[#E5E2DC] pb-8 mb-10">
            <p className="sub-header-label mb-2">CURATED INVENTORY</p>
            <h1 className="text-3xl md:text-5xl font-bold uppercase tracking-tight text-foreground">
              ALL VEHICLES
            </h1>
            <p className="text-xs md:text-sm text-stone-500 mt-2">
              Explore our hand-selected automotive portfolio, certified for exceptional performance and provenance.
            </p>
          </div>

          {/* Search & Filter Bar */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-10">
            <div className="md:col-span-5 relative">
              <input
                type="text"
                placeholder="Search model, marque, or specification..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full h-11 bg-white border border-[#E5E2DC] px-4 pl-10 text-sm focus:outline-none focus:border-black"
              />
              <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-stone-400" />
            </div>

            <div className="md:col-span-7 flex flex-wrap gap-2 items-center justify-start md:justify-end">
              {/* Category Pills */}
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-3.5 py-2 text-[11px] uppercase tracking-tracked transition-colors ${
                  selectedCategory === 'all'
                    ? 'bg-black text-white font-semibold'
                    : 'bg-white border border-[#E5E2DC] text-stone-600 hover:border-black'
                }`}
              >
                All Body Styles
              </button>
              {SAMPLE_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.slug)}
                  className={`px-3.5 py-2 text-[11px] uppercase tracking-tracked transition-colors ${
                    selectedCategory === cat.slug
                      ? 'bg-black text-white font-semibold'
                      : 'bg-white border border-[#E5E2DC] text-stone-600 hover:border-black'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Results Info */}
          <div className="flex justify-between items-center mb-8 text-xs text-stone-500">
            <span>Showing {filteredVehicles.length} vehicles</span>
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase tracking-tracked">Sort by:</span>
              <select className="bg-transparent border-0 text-xs font-semibold text-black cursor-pointer focus:outline-none">
                <option>Featured Allocation</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Newest Year</option>
              </select>
            </div>
          </div>

          {/* Vehicle Grid */}
          {filteredVehicles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
              {filteredVehicles.map((vehicle) => (
                <VehicleCard
                  key={vehicle.id}
                  vehicle={vehicle}
                  isFavorite={favorites.includes(vehicle.id)}
                  onToggleFavorite={toggleFavorite}
                  onQuickView={(v) => setQuickViewVehicle(v)}
                />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center space-y-3 bg-white border border-[#E5E2DC]">
              <h3 className="text-lg font-bold uppercase tracking-tight text-foreground">
                No matching vehicles found
              </h3>
              <p className="text-xs text-stone-500 max-w-sm mx-auto">
                No vehicles match your current search or filter criteria. Please reset your filters or contact our Concierge for off-market acquisitions.
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                  setSelectedBrand('all');
                  setSelectedFuel('all');
                }}
                className="mt-4 inline-block px-5 py-2 text-[11px] font-semibold uppercase tracking-tracked bg-black text-white hover:bg-neutral-800"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      </main>

      <Footer />

      <TestDriveModal
        isOpen={isTestDriveOpen}
        onClose={() => setIsTestDriveOpen(false)}
        vehicles={SAMPLE_VEHICLES}
        branches={SAMPLE_BRANCHES}
        selectedVehicleId={selectedVehicleForDrive}
      />

      <VehicleQuickViewModal
        isOpen={!!quickViewVehicle}
        onClose={() => setQuickViewVehicle(null)}
        vehicle={quickViewVehicle}
        onBookTestDrive={(vId) => handleOpenTestDrive(vId)}
      />
    </div>
  );
}
