'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { EnquiryModal } from '@/components/forms/enquiry-modal';
import { TestDriveModal } from '@/components/forms/test-drive-modal';
import { SAMPLE_VEHICLES, SAMPLE_BRANCHES } from '@/lib/constants';
import {
  ArrowRight,
  Tag,
  Sparkles,
  ShieldCheck,
  Zap,
  Percent,
  Calendar,
  CheckCircle2,
  PhoneCall,
  FileCheck,
  ChevronRight,
  TrendingUp,
} from 'lucide-react';

interface OfferItem {
  id: string;
  category: 'finance' | 'electric' | 'trade' | 'delivery';
  title: string;
  badge: string;
  subtitle: string;
  image: string;
  rate?: string;
  desc: string;
  inclusions: string[];
  expires: string;
  eligibleVehiclesSlug?: string;
}

const OFFERS_DATA: OfferItem[] = [
  {
    id: 'off-1',
    category: 'finance',
    title: 'Executive Salon Lease Allocation',
    badge: 'Bespoke Financing',
    subtitle: 'Exceptional 2.9% APR Tailored Financing',
    image: '/images/offers/offer-lease.jpg',
    rate: '2.9% APR',
    desc: 'Structured exclusively for 2024 and 2025 executive sedans and performance SUVs, with fully deductible corporate lease structuring and guaranteed residual values.',
    inclusions: [
      '3 Years / 45,000 km Complimentary Scheduled Factory Maintenance',
      'Zero Origination or Documentation Fees',
      'Flexible 24 to 60-Month Tailored Amortization Schedules',
      'Dedicated Private Financial Wealth Advisor Liaison',
    ],
    expires: 'Valid until April 30, 2026',
    eligibleVehiclesSlug: '/vehicles',
  },
  {
    id: 'off-2',
    category: 'electric',
    title: 'Electrified Velocity Ownership Suite',
    badge: 'Complimentary Inclusions',
    subtitle: 'Zero-Emission Infrastructure & Charging Privilege',
    image: '/images/offers/offer-ev.jpg',
    rate: 'Worth $8,500',
    desc: 'Acquire any high-performance all-electric vehicle from our salon and receive complete turnkey charging infrastructure at your private residence.',
    inclusions: [
      'Complimentary 22kW Level-2 Rapid Home Wallbox Charger with certified installation',
      '20,000 km Nationwide Supercharging Network Credits',
      '8-Year / 160,000 km High-Voltage Battery & Drivetrain Guarantee',
      'Annual Thermal Battery Health Diagnostic & Optimization Service',
    ],
    expires: 'Valid until May 15, 2026',
    eligibleVehiclesSlug: '/vehicles?category=electric',
  },
  {
    id: 'off-3',
    category: 'trade',
    title: 'Provenance Trade-In Enhancement',
    badge: 'Valuation Boost',
    subtitle: '+8% Above Fair Market Value Appraisal',
    image: '/images/offers/offer-trade.jpg',
    rate: '+8% Boost',
    desc: 'Transition smoothly into your next prestige vehicle. We provide an authenticated premium appraisal for your current luxury automobile with documented single-owner history.',
    inclusions: [
      'Immediate 8% Guaranteed Valuation Uplift against any showroom acquisition',
      'Seamless Same-Day Title & Ownership Transfer Handling',
      'Complimentary Courtesy Loaner Vehicle during transition period',
      'Full Settlement of Existing Vehicle Financing Agreements',
    ],
    expires: 'Ongoing Salon Program',
    eligibleVehiclesSlug: '/vehicles',
  },
  {
    id: 'off-4',
    category: 'delivery',
    title: 'Private Estate White-Glove Handover',
    badge: 'VIP Delivery',
    subtitle: 'Enclosed Nationwide Transport & Curation',
    image: '/images/offers/offer-delivery.jpg',
    rate: 'Complimentary',
    desc: 'Experience an unforgettable handover ceremony at your private residence, corporate headquarters, or selected Aurelia studio location.',
    inclusions: [
      'Climate-Controlled Fully Enclosed Transporter Delivery',
      'Full Vehicle Ceramic Paint Protection Coating Pre-Delivery',
      '1-on-1 Master Technologist Handover & System Calibration Session',
      'Full Tank / 100% High-Speed Battery Charge upon arrival',
    ],
    expires: 'Permanent Client Privilege',
    eligibleVehiclesSlug: '/vehicles',
  },
];

export default function OffersPage() {
  const [selectedFilter, setSelectedFilter] = React.useState<string>('ALL');
  const [isConciergeOpen, setIsConciergeOpen] = React.useState(false);
  const [isTestDriveOpen, setIsTestDriveOpen] = React.useState(false);
  const [selectedOfferTitle, setSelectedOfferTitle] = React.useState<string>('');

  const filters = [
    { id: 'ALL', label: 'All Privileges' },
    { id: 'finance', label: 'Bespoke Financing' },
    { id: 'electric', label: 'EV Infrastructure' },
    { id: 'trade', label: 'Trade-In Premium' },
    { id: 'delivery', label: 'White-Glove Handover' },
  ];

  const filteredOffers =
    selectedFilter === 'ALL'
      ? OFFERS_DATA
      : OFFERS_DATA.filter((o) => o.category === selectedFilter);

  const handleClaimOffer = (title: string) => {
    setSelectedOfferTitle(title);
    setIsConciergeOpen(true);
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#FAF9F6] text-[#111215]">
      <Navbar onOpenTestDrive={() => setIsTestDriveOpen(true)} />

      <main className="flex-1 pt-24 md:pt-28 pb-24">
        {/* Editorial Header */}
        <section className="max-w-7xl mx-auto px-6 lg:px-12 pt-4 pb-12 border-b border-[#E5E2DC]">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <p className="sub-header-label mb-2 flex items-center gap-2">
                <Sparkles className="h-3.5 w-3.5 text-champagne-accent" />
                PRIVILEGES & INCENTIVES
              </p>
              <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold uppercase tracking-tight text-foreground font-display">
                CURRENT OFFERS
              </h1>
              <p className="text-xs md:text-sm text-stone-600 mt-3 max-w-2xl leading-relaxed">
                Explore tailored acquisition programs, preferential financing rates, and exclusive ownership inclusions structured to elevate your journey with Aurelia Motors.
              </p>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap gap-2">
              {filters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setSelectedFilter(filter.id)}
                  className={`px-4 py-2 text-xs font-semibold uppercase tracking-tracked transition-all cursor-pointer border ${
                    selectedFilter === filter.id
                      ? 'bg-black text-white border-black shadow-sm'
                      : 'bg-white text-stone-600 border-stone-300 hover:border-black hover:text-black'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Offers Grid */}
        <section className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {filteredOffers.map((offer) => (
              <div
                key={offer.id}
                className="bg-white border border-[#E5E2DC] flex flex-col justify-between overflow-hidden hover:border-black transition-all duration-300 hover:shadow-lg"
              >
                {/* Visual Header */}
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-stone-900">
                  <Image
                    src={offer.image}
                    alt={offer.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />

                  {/* Top Badges */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-tracked text-black bg-[#EAE5DD] px-3 py-1 shadow-sm">
                      <Tag className="h-3 w-3" />
                      {offer.badge}
                    </span>

                    {offer.rate && (
                      <span className="text-xs font-bold font-display uppercase tracking-tracked text-white bg-black/70 backdrop-blur-sm px-3 py-1 border border-white/20">
                        {offer.rate}
                      </span>
                    )}
                  </div>

                  <div className="absolute bottom-4 left-6 right-6">
                    <span className="text-[10px] uppercase font-bold tracking-tracked text-stone-300 block mb-1">
                      {offer.subtitle}
                    </span>
                    <h3 className="text-2xl font-bold uppercase tracking-tight text-white font-display">
                      {offer.title}
                    </h3>
                  </div>
                </div>

                {/* Offer Details Body */}
                <div className="p-8 flex-1 flex flex-col justify-between space-y-6">
                  <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                    {offer.desc}
                  </p>

                  {/* Inclusions Checklist */}
                  <div className="space-y-3 pt-2">
                    <span className="text-[10px] uppercase font-bold tracking-tracked text-stone-400 block">
                      Program Inclusions
                    </span>
                    <div className="space-y-2">
                      {offer.inclusions.map((inclusion, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 text-xs text-stone-800">
                          <CheckCircle2 className="h-4 w-4 text-emerald-700 shrink-0 mt-0.5" />
                          <span>{inclusion}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Timeline & Actions */}
                  <div className="pt-6 border-t border-[#EAE6DF] space-y-4">
                    <div className="flex items-center justify-between text-xs text-stone-500">
                      <span className="flex items-center gap-1.5 font-medium">
                        <Calendar className="h-3.5 w-3.5 text-stone-400" />
                        {offer.expires}
                      </span>
                      <span className="text-[11px] font-semibold text-emerald-700 uppercase tracking-tracked">
                        Active Allocation
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <Button
                        variant="champagne"
                        size="md"
                        onClick={() => handleClaimOffer(offer.title)}
                        className="w-full text-xs font-semibold tracking-tracked uppercase shadow-sm flex items-center justify-center gap-2"
                      >
                        <Sparkles className="h-4 w-4" />
                        <span>CLAIM PRIVILEGE</span>
                      </Button>

                      <Link href={offer.eligibleVehiclesSlug || '/vehicles'} className="w-full">
                        <Button
                          variant="outline"
                          size="md"
                          className="w-full border-stone-300 hover:border-black text-black text-xs font-semibold tracking-tracked uppercase flex items-center justify-center gap-1.5"
                        >
                          <span>VIEW ELIGIBLE MODELS</span>
                          <ArrowRight className="h-3.5 w-3.5" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Private Client Advisory Consultation Banner */}
        <section className="max-w-7xl mx-auto px-6 lg:px-12 mt-6">
          <div className="bg-[#0D0E10] text-white p-8 md:p-12 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-2">
              <span className="text-xs uppercase font-bold tracking-tracked text-champagne block">
                BESPOKE FINANCIAL STRUCTURING
              </span>
              <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-tight font-display">
                LOOKING FOR CUSTOM CORPORATE OR DIPLOMATIC TERMS?
              </h2>
              <p className="text-xs md:text-sm text-stone-400 max-w-xl leading-relaxed">
                Our Private Wealth & Corporate Structuring desk prepares custom diplomatic duty exemptions, dual-currency settlement structures, and private family office allocations.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <Button
                variant="champagne"
                size="md"
                onClick={() => setIsConciergeOpen(true)}
                className="text-xs font-semibold tracking-tracked uppercase flex items-center gap-2"
              >
                <PhoneCall className="h-4 w-4" />
                <span>CONSULT CLIENT ADVISOR</span>
              </Button>
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
