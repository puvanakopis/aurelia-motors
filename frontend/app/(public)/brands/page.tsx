'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { EnquiryModal } from '@/components/forms/enquiry-modal';
import { TestDriveModal } from '@/components/forms/test-drive-modal';
import { getBrands, getVehicles, getBranches } from '@/lib/api';
import { Brand, Vehicle, Branch } from '@aurelia/types';
import { ArrowRight, Compass, Sparkles } from 'lucide-react';

const BRAND_IMAGES: Record<string, { image: string; tag: string; description: string; highlights: string[] }> = {
  bmw: {
    image: '/images/brands/bmw.jpg',
    tag: 'Bavarian Precision',
    description: 'The Ultimate Driving Machine. Uncompromising dynamics, iconic inline-six & V8 powerplants, and M-engineered motorsport heritage.',
    highlights: ['M-Adaptive Dynamics', 'TwinPower Turbo Architecture', 'xDrive Intelligent AWD'],
  },
  porsche: {
    image: '/images/brands/porsche.jpg',
    tag: 'Stuttgart Iconography',
    description: 'Relentless engineering pursuit. Flat-six acoustics, PDK dual-clutch telepathy, and timeless design purity from Zuffenhausen.',
    highlights: ['Rear & Mid-Engine Layouts', '8-Speed PDK Transmission', 'Porsche Ceramic Composite Brakes'],
  },
  'mercedes-benz': {
    image: '/images/brands/mercedes.jpg',
    tag: 'The Standard of Luxury',
    description: 'The pinnacle of executive comfort, serene acoustic insulation, and AMG hand-built performance mastery.',
    highlights: ['EQ Boost Electrification', 'AIRMATIC Air Suspension', 'MBUX Hyperscreen Innovation'],
  },
  audi: {
    image: '/images/brands/audi.jpg',
    tag: 'Vorsprung durch Technik',
    description: 'Progressive lighting design, electrified quattro architectures, and driver-centric digital cockpit cockpits.',
    highlights: ['quattro Permanent All-Wheel Drive', '800V High-Speed Architecture', 'Matrix LED Optics'],
  },
  tesla: {
    image: '/images/brands/tesla.jpg',
    tag: 'Pure Electric Velocity',
    description: 'Next-generation electric propulsion, tri-motor hypercar acceleration, and intelligent autonomy.',
    highlights: ['Sub-2.0s 0-100 km/h Capability', 'Carbon-Sleeved Rotors', 'Full Self-Driving Hardware'],
  },
  'land-rover': {
    image: '/images/brands/land-rover.jpg',
    tag: 'Unmatched All-Terrain Luxury',
    description: 'Aristocratic British poise combined with peerless all-terrain capability and bespoke cabin craftsmanship.',
    highlights: ['Terrain Response 2 System', 'Executive Class Seating', 'Electronic Air Suspension'],
  },
};

export default function BrandsPage() {
  const [brands, setBrands] = React.useState<Brand[]>([]);
  const [vehicles, setVehicles] = React.useState<Vehicle[]>([]);
  const [branches, setBranches] = React.useState<Branch[]>([]);
  const [selectedCountry, setSelectedCountry] = React.useState<string>('ALL');
  const [isConciergeOpen, setIsConciergeOpen] = React.useState(false);
  const [isTestDriveOpen, setIsTestDriveOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    Promise.all([
      getBrands().catch(() => []),
      getVehicles({ limit: 100 }).catch(() => ({ data: [] })),
      getBranches().catch(() => []),
    ])
      .then(([brandRes, vehRes, branchRes]) => {
        if (brandRes) setBrands(brandRes);
        if (vehRes?.data) setVehicles(vehRes.data);
        if (branchRes) setBranches(branchRes);
      })
      .catch((err) => {
        console.error('Failed to load brands:', err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const countries = ['ALL', ...Array.from(new Set(brands.map((b) => b.country).filter(Boolean) as string[]))];

  const filteredBrands =
    selectedCountry === 'ALL'
      ? brands
      : brands.filter((b) => b.country?.toLowerCase() === selectedCountry.toLowerCase());

  return (
    <div className="flex min-h-screen flex-col bg-white text-gray-900">
      <Navbar onOpenTestDrive={() => setIsTestDriveOpen(true)} />

      <main className="flex-1 pt-28 sm:pt-36 pb-24 space-y-16">
        {/* Header Section */}
        <section className="max-w-4xl mx-auto px-6 text-center space-y-4">
          <h1 className="text-4xl sm:text-6xl font-extrabold text-gray-900 tracking-tight">
            Marques & Brands
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed max-w-2xl mx-auto">
            Explore the automotive manufacturers represented in the Aurelia Motors salon. Each manufacturer is hand-selected for engineering excellence, historic provenance, and craftsmanship.
          </p>

          {/* Country/Origin Filter Pills */}
          <div className="flex flex-wrap justify-center gap-2 pt-4">
            {countries.map((country) => (
              <button
                key={country}
                onClick={() => setSelectedCountry(country)}
                className={`px-5 py-2 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                  selectedCountry === country
                    ? 'bg-black text-white shadow-sm'
                    : 'bg-[#FEE123] text-black hover:bg-[#FDD835]'
                }`}
              >
                {country === 'ALL' ? 'All Origins' : country}
              </button>
            ))}
          </div>
        </section>

        {/* Brands Grid */}
        <section className="max-w-7xl mx-auto px-6 lg:px-12">
          {loading ? (
            <div className="py-20 flex flex-col items-center justify-center space-y-4">
              <div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin" />
              <p className="text-xs font-semibold text-stone-500">Loading Automotive Marques...</p>
            </div>
          ) : filteredBrands.length === 0 ? (
            <div className="bg-[#F4F4F6] rounded-3xl p-12 text-center text-stone-500 max-w-lg mx-auto">
              <p className="font-bold text-base text-gray-900 mb-1">No brands registered</p>
              <p className="text-xs text-stone-500">Add marques in the Admin Portal to showcase them here.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredBrands.map((brand) => {
                const brandMeta = BRAND_IMAGES[brand.slug] || {
                  image: brand.logoUrl || '/images/hero-1.png',
                  tag: 'Prestige Automotive',
                  description: brand.description || 'Pinnacle automotive engineering and handcrafted luxury specification.',
                  highlights: ['Authentic Provenance', 'Factory-Certified Allocation', 'Bespoke Order Available'],
                };
                const brandVehicles = vehicles.filter((v) => v.brandId === brand.id || v.brand?.slug === brand.slug);

                return (
                  <div
                    key={brand.id}
                    className="bg-[#F4F4F6] rounded-3xl overflow-hidden flex flex-col justify-between hover:shadow-lg transition-all duration-300"
                  >
                    {/* Visual Card Top */}
                    <div className="relative aspect-[16/9] w-full overflow-hidden bg-stone-900">
                      <Image
                        src={brandMeta.image}
                        alt={brand.name}
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />

                      <div className="absolute top-4 left-4">
                        <span className="text-[10px] font-bold text-black bg-[#FEE123] px-3 py-1 rounded-md shadow-sm">
                          {brand.country || 'Global'}
                        </span>
                      </div>

                      <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between">
                        <div>
                          <span className="text-[10px] font-bold text-stone-300 block mb-1">
                            {brandMeta.tag}
                          </span>
                          <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                            {brand.name}
                          </h3>
                        </div>
                        <div className="text-right">
                          <span className="text-xs font-semibold text-stone-300 block">
                            {brandVehicles.length} {brandVehicles.length === 1 ? 'Car' : 'Cars'}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Brand Body Details */}
                    <div className="p-8 flex-1 flex flex-col justify-between space-y-6">
                      <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                        {brandMeta.description}
                      </p>

                      {/* Technical Highlights */}
                      <div className="space-y-2 pt-2 border-t border-[#E5E5E8]">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block">
                          Key Signatures
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {brandMeta.highlights.map((highlight, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-xs text-stone-800">
                              <span className="w-1.5 h-1.5 bg-[#FEE123] rounded-full shrink-0" />
                              <span>{highlight}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* CTAs */}
                      <div className="pt-4 border-t border-[#E5E5E8] flex flex-col sm:flex-row gap-3">
                        <Link href={`/vehicles?brand=${brand.slug}`} className="flex-1">
                          <button className="w-full bg-[#121316] hover:bg-black text-white font-bold text-xs px-5 py-3 rounded-lg flex items-center justify-center gap-2 transition-colors cursor-pointer">
                            <span>Explore {brand.name} Fleet</span>
                            <ArrowRight className="h-3.5 w-3.5" />
                          </button>
                        </Link>

                        <button
                          onClick={() => setIsConciergeOpen(true)}
                          className="border border-stone-300 hover:border-black text-gray-900 font-semibold text-xs px-5 py-3 rounded-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <Compass className="h-3.5 w-3.5" />
                          <span>Bespoke Sourcing</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* Global Commission Banner */}
        <section className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="bg-[#121316] text-white rounded-3xl p-8 sm:p-12 lg:p-16 flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#FEE123] block">
                Factory Allocations & Bespoke Commissions
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                Seeking a rare marque or custom specification?
              </h2>
              <p className="text-xs sm:text-sm text-stone-400 max-w-xl leading-relaxed">
                Our global acquisition team holds direct relationships with European design ateliers to source rare build slots, custom paints, and limited production editions.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <button
                onClick={() => setIsConciergeOpen(true)}
                className="bg-[#FEE123] hover:bg-[#FDD835] text-black font-bold text-xs px-6 py-3.5 rounded-lg inline-flex items-center gap-2 transition-colors cursor-pointer shadow-sm"
              >
                <Sparkles className="h-4 w-4" />
                <span>Inquire with Specialist</span>
              </button>
            </div>
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
