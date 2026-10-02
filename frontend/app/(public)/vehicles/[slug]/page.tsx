'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, notFound } from 'next/navigation';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { VehicleCard } from '@/components/vehicle/vehicle-card';
import { TestDriveModal } from '@/components/forms/test-drive-modal';
import { EnquiryModal } from '@/components/forms/enquiry-modal';
import { formatCurrency, formatMileage } from '@/lib/utils';
import {
  Users,
  Gauge,
  Briefcase,
  Fuel,
  CheckCircle,
  PhoneCall,
  Star,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react';

import { getVehicleBySlug, getVehicles, getBranches } from '@/lib/api';
import { Vehicle, Branch } from '@aurelia/types';

export default function VehicleDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const [vehicle, setVehicle] = React.useState<Vehicle | null>(null);
  const [allVehicles, setAllVehicles] = React.useState<Vehicle[]>([]);
  const [branches, setBranches] = React.useState<Branch[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isTestDriveOpen, setIsTestDriveOpen] = React.useState(false);
  const [isConciergeOpen, setIsConciergeOpen] = React.useState(false);
  const [selectedTermsTab, setSelectedTermsTab] = React.useState<'insurance' | 'requirements' | 'cancellation'>('insurance');

  React.useEffect(() => {
    if (!slug) return;
    setIsLoading(true);

    Promise.all([
      getVehicleBySlug(slug),
      getVehicles({ limit: 10 }).catch(() => null),
      getBranches().catch(() => null),
    ])
      .then(([veh, allVehRes, branchRes]) => {
        setVehicle(veh);
        if (allVehRes?.data) setAllVehicles(allVehRes.data);
        if (branchRes) setBranches(branchRes);
      })
      .catch((err) => {
        console.error('Vehicle load error:', err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center space-y-4">
        <div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin" />
        <p className="text-xs font-semibold text-stone-500">Retrieving Vehicle Details...</p>
      </div>
    );
  }

  if (!vehicle) {
    return notFound();
  }

  const primaryImage =
    vehicle.images?.find((img) => img.isPrimary)?.url ||
    vehicle.images?.[0]?.url ||
    '/images/hero-1.png';

  const galleryImages =
    vehicle.images && vehicle.images.length > 0
      ? vehicle.images.map((img) => img.url)
      : [
          '/images/categories/suv.jpg',
          '/images/categories/sedan.jpg',
          '/images/categories/sports.jpg',
          '/images/categories/electric.jpg',
          '/images/hero-1.png',
          '/images/categories/suv.jpg',
        ];

  const transmissionLabel =
    vehicle.transmission === 'AUTOMATIC'
      ? 'Automatic'
      : vehicle.transmission === 'MANUAL'
      ? 'Manual'
      : vehicle.transmission;

  const isSuv = vehicle.category?.slug === 'suv' || vehicle.name.toLowerCase().includes('x5') || vehicle.name.toLowerCase().includes('gle') || vehicle.name.toLowerCase().includes('rover');
  const seats = isSuv ? 7 : (vehicle.category?.slug === 'sports' ? 2 : 5);
  const luggageBags = isSuv ? '4 bags' : (vehicle.category?.slug === 'sports' ? '1 bag' : '2 bags');

  const defaultFeatures = [
    '10-touch screen audio',
    'Cruise control with brake assist',
    'Apple CarPlay & Android Auto',
    'Panoramic acoustic sunroof',
    'Active park assist system',
    'Surround view camera',
    'Lane departure warning',
    'Keyless entry',
    'Adaptive suspension',
    'Air conditioning climate suite',
  ];

  const features =
    vehicle.specifications && vehicle.specifications.length > 0
      ? vehicle.specifications.map((f) => `${f.name}: ${f.value}`)
      : defaultFeatures;

  const similarVehicles = allVehicles.filter((v) => v.id !== vehicle.id).slice(0, 2);

  return (
    <div className="flex min-h-screen flex-col bg-white text-gray-900">
      <Navbar onOpenTestDrive={() => setIsTestDriveOpen(true)} />

      <main className="flex-1 pt-28 sm:pt-36 pb-24 space-y-20">
        {/* 1. Vehicle Hero Row matching Image 3 */}
        <section className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Big Gray Card with Car */}
            <div className="lg:col-span-6 bg-[#F4F4F6] rounded-3xl p-8 sm:p-12 flex items-center justify-center min-h-[400px] lg:min-h-[500px]">
              <div className="relative aspect-[16/10] w-full">
                <Image
                  src={primaryImage}
                  alt={vehicle.name}
                  fill
                  priority
                  className="object-contain"
                />
              </div>
            </div>

            {/* Right Details Column */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
                  {vehicle.name}
                </h1>
                <p className="text-xs sm:text-sm text-stone-500 mt-1 font-medium">
                  {vehicle.category?.name || 'Luxury'} · {transmissionLabel} · {vehicle.year}
                </p>
              </div>

              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                {vehicle.description ||
                  'A pristine specimen combining exceptional performance and handcrafted luxury comfort. Complete with verified telemetry diagnostics, authenticated service records, and comprehensive factory warranty.'}
              </p>

              {/* Price & Book Action */}
              <div className="space-y-4 pt-2">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl sm:text-4xl font-extrabold text-gray-900">
                    {formatCurrency(vehicle.price)}
                  </span>
                  <span className="text-xs text-stone-500 font-normal">/Allocation</span>
                </div>

                <div className="flex flex-wrap items-center gap-4">
                  <button
                    onClick={() => setIsTestDriveOpen(true)}
                    className="bg-[#FEE123] hover:bg-[#FDD835] text-black font-bold text-xs px-7 py-3.5 rounded-lg inline-flex items-center gap-2 shadow-sm transition-transform active:scale-95 cursor-pointer"
                  >
                    <span>Book now</span>
                  </button>

                  <button
                    onClick={() => setIsConciergeOpen(true)}
                    className="text-xs font-semibold text-gray-900 hover:text-stone-600 inline-flex items-center gap-2 cursor-pointer"
                  >
                    <PhoneCall className="w-4 h-4 text-gray-900" />
                    <span>Book by call: +94 11 234 5678</span>
                  </button>
                </div>
              </div>

              {/* 4-Item Spec Grid matching Image 3 */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-6 border-y border-[#E5E5E8]">
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-gray-900 shrink-0" />
                  <div className="text-xs">
                    <span className="text-[10px] text-stone-400 block">Seat</span>
                    <span className="font-bold text-gray-900">{seats}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Gauge className="w-5 h-5 text-gray-900 shrink-0" />
                  <div className="text-xs">
                    <span className="text-[10px] text-stone-400 block">Gearbox</span>
                    <span className="font-bold text-gray-900">{transmissionLabel}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Briefcase className="w-5 h-5 text-gray-900 shrink-0" />
                  <div className="text-xs">
                    <span className="text-[10px] text-stone-400 block">Luggage</span>
                    <span className="font-bold text-gray-900">{luggageBags}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Fuel className="w-5 h-5 text-gray-900 shrink-0" />
                  <div className="text-xs">
                    <span className="text-[10px] text-stone-400 block">Fuel</span>
                    <span className="font-bold text-gray-900">{vehicle.fuelType}</span>
                  </div>
                </div>
              </div>

              {/* Vehicle Features 2-Column List */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-gray-900">Vehicle features</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-700">
                  {features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-black shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. "Vehicle gallery" 6-Grid matching Image 3 */}
        <section className="max-w-7xl mx-auto px-6 lg:px-12 space-y-8">
          <div className="text-center">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
              Vehicle gallery
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages.slice(0, 6).map((imgUrl, idx) => (
              <div
                key={idx}
                className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-[#F4F4F6] shadow-sm hover:shadow-md transition-shadow"
              >
                <Image
                  src={imgUrl}
                  alt={`${vehicle.name} angle ${idx + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </section>

        {/* 3. "Terms and Conditions" Dark Card matching Image 3 */}
        <section className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="bg-[#121316] text-white rounded-3xl p-8 sm:p-12 lg:p-16 shadow-xl">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-8">
              Terms and Conditions
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
              {/* Left Sidebar Menu */}
              <div className="md:col-span-4 space-y-3">
                <button
                  onClick={() => setSelectedTermsTab('insurance')}
                  className={`w-full text-left px-4 py-2.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                    selectedTermsTab === 'insurance'
                      ? 'bg-white/15 text-[#FEE123]'
                      : 'text-stone-400 hover:text-white'
                  }`}
                >
                  Insurance and Coverage
                </button>
                <button
                  onClick={() => setSelectedTermsTab('requirements')}
                  className={`w-full text-left px-4 py-2.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                    selectedTermsTab === 'requirements'
                      ? 'bg-white/15 text-[#FEE123]'
                      : 'text-stone-400 hover:text-white'
                  }`}
                >
                  Rental & Test Drive Requirements
                </button>
                <button
                  onClick={() => setSelectedTermsTab('cancellation')}
                  className={`w-full text-left px-4 py-2.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                    selectedTermsTab === 'cancellation'
                      ? 'bg-white/15 text-[#FEE123]'
                      : 'text-stone-400 hover:text-white'
                  }`}
                >
                  Cancellation & Handover Policy
                </button>
              </div>

              {/* Right Content */}
              <div className="md:col-span-8 space-y-6 text-xs text-stone-300 leading-relaxed border-l border-white/10 pl-0 md:pl-8">
                {selectedTermsTab === 'insurance' && (
                  <div className="space-y-4">
                    <h3 className="text-sm font-bold text-white">Basic Insurance Included</h3>
                    <p>
                      All vehicles include comprehensive bumper-to-bumper insurance with factory warranty and zero hidden deductible surprises.
                    </p>
                    <h3 className="text-sm font-bold text-white pt-2">Excess Waiver</h3>
                    <p>
                      Optional zero-excess waiver packages and tire & glass protection are available at reservation for complete peace of mind.
                    </p>
                  </div>
                )}
                {selectedTermsTab === 'requirements' && (
                  <div className="space-y-4">
                    <h3 className="text-sm font-bold text-white">Driver Verification</h3>
                    <p>
                      Patrons must hold a valid driver license with a minimum of 2 years driving history. International patrons can provide an International Driving Permit.
                    </p>
                    <h3 className="text-sm font-bold text-white pt-2">Security Deposit</h3>
                    <p>
                      A refundable pre-authorization is placed upon vehicle handover and released immediately following mechanical return inspection.
                    </p>
                  </div>
                )}
                {selectedTermsTab === 'cancellation' && (
                  <div className="space-y-4">
                    <h3 className="text-sm font-bold text-white">Flexible Cancellation</h3>
                    <p>
                      Cancel up to 24 hours prior to your scheduled handover or test drive appointment for a 100% full refund with zero cancellation fees.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* 4. "Feedback from satisfied renter" matching Image 3 */}
        <section className="max-w-7xl mx-auto px-6 lg:px-12 space-y-8">
          <div className="text-center">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
              Feedback from satisfied renter
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-[#F4F4F6] rounded-3xl p-8 space-y-4 shadow-sm">
              <div className="flex items-center gap-1 text-[#FEE123]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#FEE123] stroke-[#FEE123]" />
                ))}
              </div>
              <h3 className="text-base font-bold text-gray-900">
                Perfect car for my business trip!
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                &quot;I rented this {vehicle.name} for an executive conference in Colombo. The car was spotless, the pickup was fast, and the concierge was extremely helpful. Highly recommend Aurelia!&quot;
              </p>
              <div className="flex items-center gap-3 pt-3 border-t border-[#E5E5E8]">
                <div className="w-10 h-10 rounded-full bg-stone-300 overflow-hidden relative">
                  <Image src="/images/about/team-1.jpg" alt="Mark Stevenson" fill className="object-cover" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-900">Mark Stevenson</p>
                  <p className="text-[10px] text-stone-500">Corporate Director</p>
                </div>
              </div>
            </div>

            <div className="bg-[#F4F4F6] rounded-3xl p-8 space-y-4 shadow-sm">
              <div className="flex items-center gap-1 text-[#FEE123]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#FEE123] stroke-[#FEE123]" />
                ))}
              </div>
              <h3 className="text-base font-bold text-gray-900">
                Convenient and affordable!
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                &quot;The booking procedure was seamless. The rate was very reasonable and the car performed flawlessly. I will definitely use Aurelia Motors again for my next trip!&quot;
              </p>
              <div className="flex items-center gap-3 pt-3 border-t border-[#E5E5E8]">
                <div className="w-10 h-10 rounded-full bg-stone-300 overflow-hidden relative">
                  <Image src="/images/about/team-2.jpg" alt="Emma Watson" fill className="object-cover" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-900">Emma Watson</p>
                  <p className="text-[10px] text-stone-500">Private Client</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. "You may also like" 2-Column Row matching Image 3 */}
        {similarVehicles.length > 0 && (
          <section className="max-w-7xl mx-auto px-6 lg:px-12 space-y-8">
            <div className="text-center">
              <h2 className="text-2xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
                You may also like
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {similarVehicles.map((simVeh) => (
                <VehicleCard key={simVeh.id} vehicle={simVeh} />
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />

      {/* Modals */}
      <TestDriveModal
        isOpen={isTestDriveOpen}
        onClose={() => setIsTestDriveOpen(false)}
        vehicles={allVehicles.length > 0 ? allVehicles : [vehicle]}
        branches={branches}
        selectedVehicleId={vehicle.id}
      />

      <EnquiryModal
        isOpen={isConciergeOpen}
        onClose={() => setIsConciergeOpen(false)}
        vehicleId={vehicle.id}
      />
    </div>
  );
}
