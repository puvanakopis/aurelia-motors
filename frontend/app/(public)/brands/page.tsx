'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { EnquiryModal } from '@/components/forms/enquiry-modal';
import { TestDriveModal } from '@/components/forms/test-drive-modal';
import { SAMPLE_BRANDS, SAMPLE_VEHICLES, SAMPLE_BRANCHES } from '@/lib/constants';
import { ArrowRight, ArrowUpRight, Compass, ShieldCheck, Sparkles, Globe, Award, ChevronRight } from 'lucide-react';

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
  const [selectedCountry, setSelectedCountry] = React.useState<string>('ALL');
  const [isConciergeOpen, setIsConciergeOpen] = React.useState(false);
  const [isTestDriveOpen, setIsTestDriveOpen] = React.useState(false);

  const countries = ['ALL', 'Germany', 'United Kingdom', 'United States'];

  const filteredBrands =
    selectedCountry === 'ALL'
      ? SAMPLE_BRANDS
      : SAMPLE_BRANDS.filter((b) => b.country?.toLowerCase() === selectedCountry.toLowerCase());

  return (
    <div className="flex min-h-screen flex-col bg-[#FAF9F6] text-[#111215]">
      <Navbar onOpenTestDrive={() => setIsTestDriveOpen(true)} />

      <main className="flex-1 pt-24 md:pt-28 pb-24">
        {/* Editorial Page Header */}
        <section className="max-w-7xl mx-auto px-6 lg:px-12 pt-4 pb-12 border-b border-[#E5E2DC]">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <p className="sub-header-label mb-2 flex items-center gap-2">
                <Award className="h-3.5 w-3.5 text-champagne-accent" />
                MARQUES & MANUFACTURES
              </p>
              <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold uppercase tracking-tight text-foreground font-display">
                PREMIER BRANDS
              </h1>
              <p className="text-xs md:text-sm text-stone-600 mt-3 max-w-2xl leading-relaxed">
                Explore the prestigious automotive dynasties represented in the Aurelia Motors salon. Each manufacturer is hand-selected for mechanical excellence, historic provenance, and exceptional craftsmanship.
              </p>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap gap-2">
              {countries.map((country) => (
                <button
                  key={country}
                  onClick={() => setSelectedCountry(country)}
                  className={`px-4 py-2 text-xs font-semibold uppercase tracking-tracked transition-all cursor-pointer border ${
                    selectedCountry === country
                      ? 'bg-black text-white border-black shadow-sm'
                      : 'bg-white text-stone-600 border-stone-300 hover:border-black hover:text-black'
                  }`}
                >
                  {country === 'ALL' ? 'All Marques' : country}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Brands Grid Showcase */}
        <section className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBrands.map((brand) => {
              const brandData = BRAND_IMAGES[brand.slug] || {
                image: '/images/brands/bmw.jpg',
                tag: 'Luxury Automaker',
                description: 'Exceptional engineering and prestige automotive heritage.',
                highlights: ['Certified Provenance', 'Comprehensive Warranty', 'Salon Verified'],
              };

              return (
                <div
                  key={brand.id}
                  className="group bg-white border border-[#E5E2DC] flex flex-col justify-between overflow-hidden hover:border-black transition-all duration-300 hover:shadow-lg"
                >
                  {/* Atmospheric Brand Backdrop Image */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-stone-900">
                    <Image
                      src={brandData.image}
                      alt={`${brand.name} Collection`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                    {/* Country & Tag Badges */}
                    <div className="absolute top-4 left-4 flex gap-2">
                      <span className="bg-black/80 backdrop-blur-sm text-champagne text-[10px] uppercase font-bold tracking-tracked px-2.5 py-1 border border-white/10">
                        {brand.country}
                      </span>
                    </div>

                    <div className="absolute bottom-4 left-4 right-4">
                      <span className="text-[10px] uppercase font-bold tracking-tracked text-stone-300 block mb-0.5">
                        {brandData.tag}
                      </span>
                      <h3 className="text-2xl font-bold uppercase tracking-tight text-white font-display">
                        {brand.name}
                      </h3>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                    <p className="text-xs text-stone-600 leading-relaxed">
                      {brandData.description}
                    </p>

                    {/* Highlights List */}
                    <div className="space-y-2 pt-2 border-t border-[#EAE6DF]">
                      <span className="text-[10px] uppercase font-bold tracking-tracked text-stone-400 block">
                        Signature Capabilities
                      </span>
                      <div className="space-y-1">
                        {brandData.highlights.map((highlight, hIdx) => (
                          <div key={hIdx} className="flex items-center gap-2 text-[11px] text-stone-700">
                            <span className="h-1 w-1 rounded-full bg-black" />
                            <span>{highlight}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Action Footer */}
                    <div className="pt-4 border-t border-[#EAE6DF] flex items-center justify-between">
                      <span className="text-[11px] font-semibold text-stone-500">
                        {brand.vehicleCount} Models Available
                      </span>

                      <Link
                        href={`/vehicles?brand=${brand.slug}`}
                        className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-tracked text-black group-hover:text-stone-600 transition-colors"
                      >
                        <span>EXPLORE INVENTORY</span>
                        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Bespoke Marque Sourcing Concierge Banner */}
        <section className="max-w-7xl mx-auto px-6 lg:px-12 mt-10">
          <div className="bg-[#0D0E10] text-white p-8 md:p-14 border border-white/10 relative overflow-hidden">
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4">
                <span className="text-xs uppercase font-bold tracking-tracked-wide text-champagne block">
                  BESPOKE VEHICLE SOURCING
                </span>
                <h2 className="text-2xl md:text-4xl font-bold uppercase tracking-tight font-display">
                  CANNOT FIND YOUR PREFERRED SPECIFICATION?
                </h2>
                <p className="text-xs md:text-sm text-stone-400 max-w-2xl leading-relaxed">
                  Our private client advisory desk maintains direct relationships with authorized European manufactures, bespoke ateliers, and verified collectors worldwide. We procure factory allocations, rare build slots, and paint-to-sample editions with authenticated international provenance.
                </p>
              </div>

              <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-end">
                <Button
                  variant="champagne"
                  size="md"
                  onClick={() => setIsConciergeOpen(true)}
                  className="w-full text-xs font-semibold tracking-tracked uppercase flex items-center justify-center gap-2"
                >
                  <Sparkles className="h-4 w-4" />
                  <span>COMMISSION BESPOKE SOURCING</span>
                </Button>

                <Link href="/contact" className="w-full">
                  <Button
                    variant="dark"
                    size="md"
                    className="w-full border-white/20 text-white hover:border-white text-xs font-semibold tracking-tracked uppercase"
                  >
                    VISIT OUR SALONS
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Modals */}
      <TestDriveModal
        isOpen={isTestDriveOpen}
        onClose={() => setIsTestDriveOpen(false)}
        vehicles={SAMPLE_VEHICLES}
        branches={SAMPLE_BRANCHES}
      />

      <EnquiryModal
        isOpen={isConciergeOpen}
        onClose={() => setIsConciergeOpen(false)}
      />
    </div>
  );
}
