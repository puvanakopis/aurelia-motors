'use client';

import * as React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { VehicleCard } from '@/components/vehicle/vehicle-card';
import { VehicleQuickViewModal } from '@/components/vehicle/vehicle-quick-view-modal';
import { TestDriveModal } from '@/components/forms/test-drive-modal';
import { getVehicles, getCategories, getBrands, getBranches } from '@/lib/api';
import { Vehicle, Category, Brand, Branch } from '@aurelia/types';
import { Search } from 'lucide-react';

export default function VehiclesPage() {
  const [vehicles, setVehicles] = React.useState<Vehicle[]>([]);
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [branches, setBranches] = React.useState<Branch[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState<string>('all');
  const [isTestDriveOpen, setIsTestDriveOpen] = React.useState(false);
  const [selectedVehicleForDrive, setSelectedVehicleForDrive] = React.useState<string>('');

  React.useEffect(() => {
    setIsLoading(true);
    Promise.all([
      getVehicles({ limit: 100 }),
      getCategories(),
      getBranches(),
    ])
      .then(([vehRes, catRes, branchRes]) => {
        const list = Array.isArray(vehRes) ? vehRes : (vehRes?.data || []);
        setVehicles(list);
        setCategories(catRes || []);
        setBranches(branchRes || []);
        if (list.length > 0) {
          setSelectedVehicleForDrive(list[0].id);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));
  }, []);

  const filteredVehicles = vehicles.filter((v) => {
    const matchesSearch =
      v.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (v.brand?.name || '').toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === 'all' ||
      v.category?.slug === selectedCategory ||
      (v.category?.name || '').toLowerCase() === selectedCategory.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  const handleOpenTestDrive = (vehicleId?: string) => {
    if (vehicleId) {
      setSelectedVehicleForDrive(vehicleId);
    } else if (vehicles.length > 0) {
      setSelectedVehicleForDrive(vehicles[0].id);
    }
    setIsTestDriveOpen(true);
  };

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar onOpenTestDrive={() => handleOpenTestDrive()} />

      <main className="flex-1 pt-28 sm:pt-36 pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {/* Centered Page Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl sm:text-6xl font-extrabold text-gray-900 tracking-tight">
              Cars
            </h1>
          </div>

          {/* Centered Category Pills Filter Bar */}
          <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-3 mb-12">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-5 py-2 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-black text-white shadow-sm'
                  : 'bg-[#FEE123] text-black hover:bg-[#FDD835]'
              }`}
            >
              All cars
            </button>

            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.slug)}
                className={`px-5 py-2 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                  selectedCategory === cat.slug
                    ? 'bg-black text-white shadow-sm'
                    : 'bg-[#FEE123] text-black hover:bg-[#FDD835]'
                }`}
              >
                {cat.name}
              </button>
            ))}

            {/* In case DB categories are loading or custom tags */}
            {categories.length === 0 && (
              <>
                <button
                  onClick={() => setSelectedCategory('Business')}
                  className={`px-4 py-2 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                    selectedCategory === 'Business' ? 'bg-black text-white' : 'bg-[#FEE123] text-black'
                  }`}
                >
                  Business
                </button>
                <button
                  onClick={() => setSelectedCategory('Family')}
                  className={`px-4 py-2 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                    selectedCategory === 'Family' ? 'bg-black text-white' : 'bg-[#FEE123] text-black'
                  }`}
                >
                  Family
                </button>
                <button
                  onClick={() => setSelectedCategory('Adventure')}
                  className={`px-4 py-2 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                    selectedCategory === 'Adventure' ? 'bg-black text-white' : 'bg-[#FEE123] text-black'
                  }`}
                >
                  Adventure
                </button>
                <button
                  onClick={() => setSelectedCategory('Wedding')}
                  className={`px-4 py-2 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                    selectedCategory === 'Wedding' ? 'bg-black text-white' : 'bg-[#FEE123] text-black'
                  }`}
                >
                  Wedding
                </button>
              </>
            )}
          </div>

          {/* Quick Search Input */}
          <div className="max-w-md mx-auto mb-10 relative">
            <input
              type="text"
              placeholder="Search by model or brand..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#F4F4F6] border border-transparent focus:border-black focus:outline-none px-4 pl-10 py-2.5 text-xs rounded-lg text-gray-900 placeholder:text-stone-400"
            />
            <Search className="absolute left-3.5 top-3 h-4 w-4 text-stone-400" />
          </div>

          {/* Vehicles 2-Column Grid matching Image 1 */}
          {isLoading ? (
            <div className="py-24 flex flex-col items-center justify-center space-y-4">
              <div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin" />
              <p className="text-xs font-semibold text-stone-500">Loading car collection...</p>
            </div>
          ) : filteredVehicles.length === 0 ? (
            <div className="bg-[#F4F4F6] rounded-3xl p-16 text-center text-stone-500 max-w-xl mx-auto my-12">
              <p className="font-bold text-lg text-gray-900 mb-1">No vehicles matched your criteria</p>
              <p className="text-xs text-stone-500 mb-6">Try selecting &apos;All cars&apos; or adjusting your search keyword.</p>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchTerm('');
                }}
                className="bg-[#FEE123] hover:bg-[#FDD835] text-black font-semibold text-xs px-6 py-2.5 rounded-md cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                {filteredVehicles.map((vehicle) => (
                  <VehicleCard
                    key={vehicle.id}
                    vehicle={vehicle}
                  />
                ))}
              </div>

              {/* Bottom Pagination matching Image 1 */}
              <div className="flex items-center justify-center gap-6 pt-4">
                <span className="text-xs font-medium text-stone-500">1 / 1</span>
                <button
                  disabled
                  className="bg-[#FEE123] text-black font-semibold text-xs px-8 py-2.5 rounded-md cursor-default shadow-sm opacity-90"
                >
                  Next &gt;
                </button>
              </div>
            </>
          )}
        </div>
      </main>

      <Footer />

      {/* Test Drive Modal */}
      <TestDriveModal
        isOpen={isTestDriveOpen}
        onClose={() => setIsTestDriveOpen(false)}
        vehicles={vehicles}
        branches={branches}
        selectedVehicleId={selectedVehicleForDrive}
      />
    </div>
  );
}
