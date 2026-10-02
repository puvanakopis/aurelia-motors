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
import { getVehicles, getCategories, getBranches } from '@/lib/api';
import { Vehicle, Category, Branch } from '@aurelia/types';

export default function HomePage() {
  const [vehicles, setVehicles] = React.useState<Vehicle[]>([]);
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [branches, setBranches] = React.useState<Branch[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isTestDriveOpen, setIsTestDriveOpen] = React.useState(false);
  const [isConciergeOpen, setIsConciergeOpen] = React.useState(false);
  const [selectedVehicleForDrive, setSelectedVehicleForDrive] = React.useState<string>('');
  const [quickViewVehicle, setQuickViewVehicle] = React.useState<Vehicle | null>(null);

  React.useEffect(() => {
    setIsLoading(true);
    Promise.all([
      getVehicles({ limit: 6 }),
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
      .catch((err) => {
        console.error('Database connection error:', err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const handleOpenTestDrive = (vehicleId?: string) => {
    if (vehicleId) {
      setSelectedVehicleForDrive(vehicleId);
    } else if (vehicles.length > 0) {
      setSelectedVehicleForDrive(vehicles[0].id);
    }
    setIsTestDriveOpen(true);
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#FAF9F6]">
      {/* Navigation */}
      <Navbar onOpenTestDrive={() => handleOpenTestDrive()} />

      <main className="flex-1">
        {/* 1. Hero Section */}
        <Hero onBookTestDrive={() => handleOpenTestDrive(vehicles[0]?.id)} />

        {/* 2. Featured Vehicles Grid (Fetched directly from DB) */}
        <FeaturedVehicles
          vehicles={vehicles.slice(0, 3)}
          onQuickView={(v) => setQuickViewVehicle(v)}
        />

        {/* 3. Browse By Category (Fetched directly from DB) */}
        <CategoriesSection categories={categories} />

        {/* 4. Our Standard */}
        <StandardsSection />

        {/* 5. Experience Appointment CTA Banner */}
        <AppointmentCTA
          onBookTestDrive={() => handleOpenTestDrive()}
          onOpenConcierge={() => setIsConciergeOpen(true)}
        />

        {/* 6. Showroom Branches Gallery (Fetched directly from DB) */}
        <BranchesSection branches={branches} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Modals */}
      <TestDriveModal
        isOpen={isTestDriveOpen}
        onClose={() => setIsTestDriveOpen(false)}
        vehicles={vehicles}
        branches={branches}
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
        onBookTestDrive={(id) => handleOpenTestDrive(id)}
      />
    </div>
  );
}
