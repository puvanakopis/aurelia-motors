'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { EnquiryModal } from '@/components/forms/enquiry-modal';
import { TestDriveModal } from '@/components/forms/test-drive-modal';
import { ArrowRight, Tag, Sparkles, Calendar, PhoneCall, CheckCircle2, ShieldCheck, Zap, Award } from 'lucide-react';
import { getOffers, getVehicles, getBranches } from '@/lib/api';
import { Vehicle, Branch, Offer } from '@aurelia/types';

export default function OffersPage() {
  const [selectedFilter, setSelectedFilter] = React.useState<string>('ALL');
  const [isConciergeOpen, setIsConciergeOpen] = React.useState(false);
  const [isTestDriveOpen, setIsTestDriveOpen] = React.useState(false);
  const [selectedOfferTitle, setSelectedOfferTitle] = React.useState<string>('');
  const [offers, setOffers] = React.useState<Offer[]>([]);
  const [vehicles, setVehicles] = React.useState<Vehicle[]>([]);
  const [branches, setBranches] = React.useState<Branch[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    Promise.all([
      getOffers().catch(() => []),
      getVehicles({ limit: 20 }).catch(() => ({ data: [] })),
      getBranches().catch(() => []),
    ])
      .then(([offersRes, vehRes, branchRes]) => {
        if (offersRes) setOffers(offersRes);
        if (vehRes?.data) setVehicles(vehRes.data);
        if (branchRes) setBranches(branchRes);
      })
      .catch((err) => {
        console.error('Failed to load offers page data:', err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const filters = [
    { id: 'ALL', label: 'All Offers' },
    { id: 'PERCENTAGE', label: 'Preferential Rates' },
    { id: 'FIXED', label: 'Cash Benefits' },
  ];

  const filteredOffers =
    selectedFilter === 'ALL'
      ? offers
      : offers.filter((o) => o.discountType === selectedFilter);

  const handleClaimOffer = (title: string) => {
    setSelectedOfferTitle(title);
    setIsConciergeOpen(true);
  };

  return (
    <div className="flex min-h-screen flex-col bg-white text-gray-900 font-sans antialiased">
      <Navbar onOpenTestDrive={() => setIsTestDriveOpen(true)} />

      <main className="flex-1 pt-28 sm:pt-36 pb-24 space-y-16">
        {/* 1. Header matching Carent style */}
        <section className="max-w-4xl mx-auto px-6 text-center space-y-4">
          <h1 className="text-4xl sm:text-6xl font-extrabold text-gray-950 tracking-tight">
            Offers & Privileges
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed max-w-2xl mx-auto">
            Explore tailored acquisition programs, preferential financing rates, and exclusive ownership inclusions structured to elevate your journey with Aurelia Motors.
          </p>

          {/* Centered Capsule Filter Pills */}
          <div className="flex flex-wrap justify-center gap-2 pt-4">
            {filters.map((filter) => {
              const active = selectedFilter === filter.id;
              return (
                <button
                  key={filter.id}
                  onClick={() => setSelectedFilter(filter.id)}
                  className={`px-5 py-2.5 text-xs font-bold rounded-full transition-all duration-200 cursor-pointer ${active
                    ? 'bg-black text-white shadow-md'
                    : 'bg-[#F4F4F6] text-stone-700 hover:bg-[#FEE123] hover:text-black'
                    }`}
                >
                  {filter.label}
                </button>
              );
            })}
          </div>
        </section>

        {/* 2. Offers 2-Column Grid matching Carent Cards */}
        <section className="max-w-7xl mx-auto px-6 lg:px-12">
          {loading ? (
            <div className="py-24 flex flex-col items-center justify-center space-y-4">
              <div className="w-8 h-8 border-3 border-[#FEE123] border-t-black rounded-full animate-spin" />
              <p className="text-xs font-bold text-stone-500">Loading Active Salon Offers...</p>
            </div>
          ) : filteredOffers.length === 0 ? (
            <div className="bg-[#F4F4F6] rounded-3xl p-16 text-center text-stone-500 max-w-xl mx-auto my-8">
              <Award className="w-12 h-12 text-stone-400 mx-auto mb-3" />
              <p className="font-extrabold text-xl text-gray-900 mb-1">No Active Offers in this Category</p>
              <p className="text-xs text-stone-500 mb-6">Contact our private client desk for customized acquisition terms.</p>
              <button
                onClick={() => setSelectedFilter('ALL')}
                className="bg-[#FEE123] hover:bg-[#FDD835] text-black font-bold text-xs px-6 py-3 rounded-full cursor-pointer shadow-sm transition-transform active:scale-95"
              >
                View All Privileges
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {filteredOffers.map((offer) => (
                <div
                  key={offer.id}
                  className="bg-[#F4F4F6] rounded-3xl overflow-hidden flex flex-col justify-between hover:shadow-xl transition-all duration-300 border border-black/5"
                >
                  {/* Top: Photo with luxury badges */}
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-stone-900">
                    <Image
                      src={offer.bannerUrl || '/images/hero-1.png'}
                      alt={offer.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover transition-transform duration-700 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/10" />

                    {/* Top Badges */}
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-black bg-[#FEE123] px-3.5 py-1.5 rounded-full shadow-md">
                        <Tag className="h-3 w-3" />
                        Privilege Structure
                      </span>

                      {offer.discountValue && (
                        <span className="text-xs font-black text-white bg-black/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 shadow-sm">
                          {offer.discountType === 'PERCENTAGE'
                            ? `${offer.discountValue}% OFF`
                            : `$${offer.discountValue.toLocaleString()} BENEFIT`}
                        </span>
                      )}
                    </div>

                    {/* Bottom Title on Image */}
                    <div className="absolute bottom-5 left-6 right-6">
                      <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug drop-shadow-sm">
                        {offer.title}
                      </h3>
                    </div>
                  </div>

                  {/* Body Details */}
                  <div className="p-8 sm:p-10 flex-1 flex flex-col justify-between space-y-6">
                    <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-medium">
                      {offer.description}
                    </p>

                    {/* Inclusions List */}
                    <div className="space-y-3 pt-3 border-t border-[#E5E5E8]">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block">
                        Included Privileges & Benefits
                      </span>
                      <div className="space-y-2.5 text-xs text-stone-800">
                        <div className="flex items-center gap-2.5">
                          <div className="w-5 h-5 rounded-full bg-[#FEE123] flex items-center justify-center shrink-0">
                            <CheckCircle2 className="w-3.5 h-3.5 text-black" />
                          </div>
                          <span className="font-semibold text-gray-900">Factory-Certified Scheduled Maintenance Included</span>
                        </div>
                        <div className="flex items-center gap-2.5">
                          <div className="w-5 h-5 rounded-full bg-[#FEE123] flex items-center justify-center shrink-0">
                            <CheckCircle2 className="w-3.5 h-3.5 text-black" />
                          </div>
                          <span className="font-semibold text-gray-900">Enclosed White-Glove Handover Ceremony</span>
                        </div>
                        <div className="flex items-center gap-2.5">
                          <div className="w-5 h-5 rounded-full bg-[#FEE123] flex items-center justify-center shrink-0">
                            <CheckCircle2 className="w-3.5 h-3.5 text-black" />
                          </div>
                          <span className="font-semibold text-gray-900">Dedicated Private Wealth & Fleet Advisor</span>
                        </div>
                      </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="pt-4 border-t border-[#E5E5E8] space-y-4">
                      <div className="flex items-center justify-between text-xs text-stone-500">
                        <span className="flex items-center gap-1.5 font-medium">
                          <Calendar className="h-3.5 w-3.5 text-stone-400" />
                          {offer.endDate
                            ? `Valid until ${new Date(offer.endDate).toLocaleDateString()}`
                            : 'Ongoing Salon Program'}
                        </span>
                        <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                          {offer.active ? 'Active Allocation' : 'Expired'}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                        <button
                          onClick={() => handleClaimOffer(offer.title)}
                          className="w-full bg-[#FEE123] hover:bg-[#FDD835] text-black font-bold text-xs py-3.5 px-4 rounded-full flex items-center justify-between shadow-sm transition-transform active:scale-98 cursor-pointer group"
                        >
                          <span className="font-extrabold tracking-tight">Claim Privilege</span>
                          <span className="w-7 h-7 rounded-full bg-black text-white flex items-center justify-center transition-transform group-hover:translate-x-0.5">
                            <ArrowRight className="w-3.5 h-3.5" />
                          </span>
                        </button>

                        <Link href="/vehicles" className="w-full">
                          <button className="w-full bg-white hover:bg-black hover:text-white text-gray-900 font-bold text-xs py-3.5 px-4 rounded-full flex items-center justify-center gap-2 border border-[#E5E5E8] transition-all cursor-pointer shadow-sm">
                            <span>View Eligible Cars</span>
                            <ArrowRight className="h-3.5 w-3.5" />
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* 3. Advisory Consultation Banner matching Carent Dark Block */}
        <section className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="bg-[#121316] text-white rounded-3xl p-8 sm:p-12 lg:p-16 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden">
            {/* Background luxury accent */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#FEE123]/5 rounded-full blur-3xl pointer-events-none" />

            <div className="space-y-4 relative z-10">
              <span className="text-xs font-bold uppercase tracking-wider text-[#FEE123] block">
                Bespoke Financial Structuring
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
                Looking for custom corporate or diplomatic terms?
              </h2>
              <p className="text-xs sm:text-sm text-stone-400 max-w-xl leading-relaxed">
                Our Private Wealth & Corporate Structuring desk prepares custom diplomatic duty exemptions, dual-currency settlement structures, and private family office allocations.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 shrink-0 relative z-10 w-full md:w-auto">
              <button
                onClick={() => setIsConciergeOpen(true)}
                className="w-full md:w-auto bg-[#FEE123] hover:bg-[#FDD835] text-black font-extrabold text-xs px-8 py-4 rounded-full inline-flex items-center justify-between md:justify-center gap-3 transition-transform active:scale-95 cursor-pointer shadow-lg group"
              >
                <span>Consult Client Advisor</span>
                <span className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center transition-transform group-hover:translate-x-0.5">
                  <ArrowRight className="w-3 h-3" />
                </span>
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
        defaultSubject={selectedOfferTitle ? `Privilege Inquiry: ${selectedOfferTitle}` : 'General Acquisition Inquiry'}
      />
    </div>
  );
}
