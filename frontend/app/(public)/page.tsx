'use client';

import * as React from 'react';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Hero } from '@/components/homepage/hero';
import { FeaturedVehicles } from '@/components/homepage/featured-vehicles';
import { CategoriesSection } from '@/components/homepage/categories-section';
import { StandardsSection } from '@/components/homepage/standards-section';
import { AppointmentCTA } from '@/components/homepage/appointment-cta';
import { BranchesSection } from '@/components/homepage/branches-section';
import { TestDriveModal } from '@/components/forms/test-drive-modal';
import { EnquiryModal } from '@/components/forms/enquiry-modal';
import { VehicleQuickViewModal } from '@/components/vehicle/vehicle-quick-view-modal';
import {
  SAMPLE_VEHICLES,
  SAMPLE_CATEGORIES,
  SAMPLE_BRANCHES,
} from '@/lib/constants';
import { Vehicle } from '@aurelia/types';

export default function HomePage() {
  const [favorites, setFavorites] = React.useState<string[]>(['veh-2']);
  const [isTestDriveOpen, setIsTestDriveOpen] = React.useState(false);
  const [isConciergeOpen, setIsConciergeOpen] = React.useState(false);
  const [selectedVehicleForDrive, setSelectedVehicleForDrive] = React.useState<string>('veh-1');
  const [quickViewVehicle, setQuickViewVehicle] = React.useState<Vehicle | null>(null);

  const toggleFavorite = (vehicleId: string) => {
    setFavorites((prev) =>
      prev.includes(vehicleId)
        ? prev.filter((id) => id !== vehicleId)
        : [...prev, vehicleId]
    );
  };

  const handleOpenTestDrive = (vehicleId?: string) => {
    if (vehicleId) {
      setSelectedVehicleForDrive(vehicleId);
    }
    setIsTestDriveOpen(true);
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#FAF9F6]">
      {/* Navigation */}
      <Navbar
        onOpenTestDrive={() => handleOpenTestDrive()}
        favoritesCount={favorites.length}
      />

      <main className="flex-1">
        {/* 1. Hero Section (Reference Image 4) */}
        <Hero onBookTestDrive={() => handleOpenTestDrive('veh-1')} />

        {/* 2. Featured Vehicles Grid (Reference Image 3) */}
        <FeaturedVehicles
          vehicles={SAMPLE_VEHICLES.slice(0, 3)}
          favorites={favorites}
          onToggleFavorite={toggleFavorite}
          onQuickView={(v) => setQuickViewVehicle(v)}
        />

        {/* 3. Browse By Category 2x2 Grid (Reference Image 2) */}
        <CategoriesSection categories={SAMPLE_CATEGORIES} />

        {/* 4. Our Standard (Reference Image 1 - Top Half) */}
        <StandardsSection />

        {/* 5. Experience Appointment CTA Banner (Reference Image 1 - Middle Dark Banner) */}
        <AppointmentCTA
          onBookTestDrive={() => handleOpenTestDrive()}
          onOpenConcierge={() => setIsConciergeOpen(true)}
        />

        {/* 6. Showroom Branches Gallery (Colombo, Jaffna, Batticaloa) */}
        <BranchesSection branches={SAMPLE_BRANCHES} />
      </main>

      {/* Footer (Reference Image 1 - Bottom Half) */}
      <Footer />

      {/* Interactive Modals */}
      <TestDriveModal
        isOpen={isTestDriveOpen}
        onClose={() => setIsTestDriveOpen(false)}
        vehicles={SAMPLE_VEHICLES}
        branches={SAMPLE_BRANCHES}
        selectedVehicleId={selectedVehicleForDrive}
      />

      <EnquiryModal
        isOpen={isConciergeOpen}
        onClose={() => setIsConciergeOpen(false)}
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
