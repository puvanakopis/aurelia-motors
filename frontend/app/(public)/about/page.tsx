'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { EnquiryModal } from '@/components/forms/enquiry-modal';
import { TestDriveModal } from '@/components/forms/test-drive-modal';
import { getBranches, getVehicles } from '@/lib/api';
import { Branch, Vehicle } from '@aurelia/types';

export default function AboutPage() {
  const [isConciergeOpen, setIsConciergeOpen] = React.useState(false);
  const [isTestDriveOpen, setIsTestDriveOpen] = React.useState(false);
  const [branches, setBranches] = React.useState<Branch[]>([]);
  const [vehicles, setVehicles] = React.useState<Vehicle[]>([]);

  React.useEffect(() => {
    Promise.all([
      getBranches().catch(() => []),
      getVehicles({ limit: 20 }).catch(() => ({ data: [] })),
    ]).then(([branchRes, vehRes]) => {
      if (branchRes) setBranches(branchRes);
      if (vehRes?.data) setVehicles(vehRes.data);
    });
  }, []);

  const stats = [
    { value: '15+', label: 'Years of automotive excellence and curation' },
    { value: '99%', label: 'Client satisfaction and repeat patron score' },
    { value: '5,000+', label: 'Trusted by thousands of satisfied clients' },
    { value: '24/7', label: 'Dedicated client support and roadside assist' },
  ];

  const team = [
    {
      name: 'Emily Johnson',
      role: 'Client Service Manager',
      image: '/images/about/team-1.jpg',
    },
    {
      name: 'Michael Smith',
      role: 'Fleet Operations Supervisor',
      image: '/images/about/team-2.jpg',
    },
    {
      name: 'Sarah Davis',
      role: 'Marketing Director',
      image: '/images/about/team-3.jpg',
    },
    {
      name: 'David Lee',
      role: 'Business Development Manager',
      image: '/images/about/team-4.jpg',
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-white text-gray-900">
      <Navbar onOpenTestDrive={() => setIsTestDriveOpen(true)} />

      <main className="flex-1 pt-28 sm:pt-36 pb-24 space-y-20">
        {/* 1. Header Section matching Image 2 */}
        <section className="max-w-4xl mx-auto px-6 text-center space-y-6">
          <h1 className="text-4xl sm:text-6xl font-extrabold text-gray-900 tracking-tight">
            Who we are
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed max-w-2xl mx-auto">
            Founded with a passion for exceptional motoring, Aurelia Motors has grown into a premier luxury vehicle salon. Our mission is to provide patrons with authenticated, pristine vehicles and bespoke ownership structuring for every journey.
          </p>
        </section>

        {/* 2. 4-Column Stat Counters matching Image 2 */}
        <section className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-8 border-y border-[#E5E5E8]">
            {stats.map((stat, idx) => (
              <div key={idx} className="space-y-2 border-l-2 border-[#FEE123] pl-4 sm:pl-6">
                <span className="text-3xl sm:text-5xl font-extrabold text-gray-900 block tracking-tight">
                  {stat.value}
                </span>
                <p className="text-xs text-stone-500 leading-snug">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 3. Hero Showroom Image matching Image 2 */}
        <section className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="relative w-full h-[360px] sm:h-[480px] lg:h-[540px] rounded-3xl overflow-hidden shadow-xl">
            <Image
              src="/images/hero-1.png"
              alt="Aurelia Motors Flagship Salon"
              fill
              className="object-cover"
            />
          </div>
        </section>

        {/* 4. Our Mission & Our Values matching Image 2 */}
        <section className="max-w-4xl mx-auto px-6 space-y-12">
          {/* Mission */}
          <div className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
              Our mission
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              Our mission is to provide an exceptional vehicle ownership experience that makes luxury motoring effortless, transparent, and exhilarating. With an authenticated inventory and a commitment to customer satisfaction, we strive to make every journey memorable.
            </p>
          </div>

          {/* Values */}
          <div className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
              Our values
            </h2>
            <div className="space-y-3 text-xs sm:text-sm text-stone-700 leading-relaxed">
              <p>
                <strong className="text-gray-900 font-bold">• Customer Focus:</strong> We put our clients at the center of everything we do. We build lasting trust through genuine care and tailored attention to detail.
              </p>
              <p>
                <strong className="text-gray-900 font-bold">• Integrity & Transparency:</strong> We operate with complete honesty and transparent terms across every quotation and inspection report.
              </p>
              <p>
                <strong className="text-gray-900 font-bold">• Reliability:</strong> We maintain our vehicles to the highest certified factory standards to ensure total mechanical peace of mind.
              </p>
              <p>
                <strong className="text-gray-900 font-bold">• Innovation:</strong> We embrace electrified mobility, digital telemetry diagnostics, and seamless online test drive reservations.
              </p>
              <p>
                <strong className="text-gray-900 font-bold">• Sustainability:</strong> We are committed to reducing environmental impact through electrified fleets and carbon-offset handovers.
              </p>
            </div>
          </div>
        </section>

        {/* 5. 5-Image Mosaic Gallery matching Image 2 */}
        <section className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-sm">
              <Image src="/images/categories/suv.jpg" alt="Salon experience" fill className="object-cover" />
            </div>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-sm">
              <Image src="/images/categories/sedan.jpg" alt="Showroom gallery" fill className="object-cover" />
            </div>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-sm">
              <Image src="/images/categories/sports.jpg" alt="Supercar lineup" fill className="object-cover" />
            </div>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-sm">
              <Image src="/images/categories/electric.jpg" alt="Client consultation" fill className="object-cover" />
            </div>
          </div>
        </section>

        {/* 6. "Our team" Circular Portraits matching Image 2 */}
        <section className="max-w-7xl mx-auto px-6 lg:px-12 pt-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
              Our team
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {team.map((member, idx) => (
              <div key={idx} className="flex flex-col items-center text-center space-y-3">
                <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-full overflow-hidden shadow-md border-4 border-[#F4F4F6]">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-gray-900">{member.name}</h3>
                  <p className="text-[11px] text-stone-500">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />

      {/* Modals */}
      <TestDriveModal
        isOpen={isTestDriveOpen}
        onClose={() => setIsTestDriveOpen(false)}
        vehicles={vehicles}
        branches={branches}
      />

      <EnquiryModal
        isOpen={isConciergeOpen}
        onClose={() => setIsConciergeOpen(false)}
      />
    </div>
  );
}
