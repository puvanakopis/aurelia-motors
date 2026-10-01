'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { EnquiryModal } from '@/components/forms/enquiry-modal';
import { TestDriveModal } from '@/components/forms/test-drive-modal';
import { StandardsSection } from '@/components/homepage/standards-section';
import { BranchesSection } from '@/components/homepage/branches-section';
import { SAMPLE_BRANCHES, SAMPLE_VEHICLES } from '@/lib/constants';
import {
  Award,
  ShieldCheck,
  Compass,
  Sparkles,
  CheckCircle2,
  Calendar,
  PhoneCall,
  ArrowRight,
  Clock,
  Layers,
  MapPin,
  Building,
} from 'lucide-react';

export default function AboutPage() {
  const [isConciergeOpen, setIsConciergeOpen] = React.useState(false);
  const [isTestDriveOpen, setIsTestDriveOpen] = React.useState(false);

  const pillars = [
    {
      number: '01',
      title: 'Forensic Provenance & Curation',
      desc: 'We do not mass-acquire inventory. Every vehicle admitted to the salon undergoes exhaustive mechanical ultrasound, digital telemetry verification, and title authentication.',
      icon: ShieldCheck,
    },
    {
      number: '02',
      title: 'Architectural Sanctuaries',
      desc: 'Our salons in Colombo, Jaffna, and Batticaloa are conceived not as conventional car dealerships, but as serene, minimalist galleries where vehicles are appreciated as functional works of art.',
      icon: Building,
    },
    {
      number: '03',
      title: 'White-Glove Stewardship',
      desc: 'Ownership begins before handover and endures for years. We provide enclosed climate-controlled delivery, comprehensive 24-month warranties, and dedicated private client advisors.',
      icon: Compass,
    },
    {
      number: '04',
      title: 'Bespoke Atelier Sourcing',
      desc: 'For patrons seeking paint-to-sample allocations or rare collector editions, our international sourcing desk maintains direct pipelines with European manufactures and verified private collections.',
      icon: Sparkles,
    },
  ];

  const milestones = [
    { year: '2020', title: 'Private Atelier Founded', desc: 'Established as an exclusive automotive advisory serving discerning private collectors across South Asia.' },
    { year: '2022', title: 'Colombo Flagship Unveiled', desc: 'Opened our flagship architectural salon in Kollupitiya, introducing the 160-point certified salon standard.' },
    { year: '2024', title: 'Regional Expansion', desc: 'Expanded our footprint with dedicated galleries in Jaffna and Batticaloa, establishing nationwide white-glove logistics.' },
    { year: '2026', title: 'Electrified & Bespoke Horizons', desc: 'Pioneering high-speed charging infrastructure and bespoke individual commissioning for high-performance vehicles.' },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-[#FAF9F6] text-[#111215]">
      <Navbar onOpenTestDrive={() => setIsTestDriveOpen(true)} />

      <main className="flex-1 pt-24 md:pt-28 pb-24">
        {/* Editorial Hero Header */}
        <section className="max-w-7xl mx-auto px-6 lg:px-12 pt-4 pb-16 border-b border-[#E5E2DC]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
            <div className="lg:col-span-8 space-y-4">
              <p className="sub-header-label flex items-center gap-2">
                <Award className="h-3.5 w-3.5 text-champagne-accent" />
                HERITAGE & VISION
              </p>
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold uppercase tracking-tight text-foreground font-display leading-[1.05]">
                THE ARCHITECTURE OF AUTOMOTIVE DISTINCTION
              </h1>
              <p className="text-sm md:text-base text-stone-600 max-w-2xl leading-relaxed antialiased">
                Aurelia Motors was founded on a singular conviction: that acquiring an exceptional automobile should be as refined, transparent, and exhilarating as the drive itself.
              </p>
            </div>

            {/* Key Stats Pill Box */}
            <div className="lg:col-span-4 bg-white border border-[#E5E2DC] p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4 divide-x divide-[#EAE6DF]">
                <div className="space-y-1">
                  <span className="text-2xl font-bold tracking-tight font-display">160+</span>
                  <p className="text-[10px] uppercase font-semibold tracking-tracked text-stone-400">
                    Inspection Points
                  </p>
                </div>
                <div className="pl-4 space-y-1">
                  <span className="text-2xl font-bold tracking-tight font-display">100%</span>
                  <p className="text-[10px] uppercase font-semibold tracking-tracked text-stone-400">
                    Clean Titles
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-[#EAE6DF] grid grid-cols-2 gap-4 divide-x divide-[#EAE6DF]">
                <div className="space-y-1">
                  <span className="text-2xl font-bold tracking-tight font-display">3</span>
                  <p className="text-[10px] uppercase font-semibold tracking-tracked text-stone-400">
                    Salon Galleries
                  </p>
                </div>
                <div className="pl-4 space-y-1">
                  <span className="text-2xl font-bold tracking-tight font-display">24 Mo</span>
                  <p className="text-[10px] uppercase font-semibold tracking-tracked text-stone-400">
                    Warranty Standard
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Cinematic Salon Imagery & Narrative */}
        <section className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Image Canvas */}
            <div className="lg:col-span-7 relative aspect-[16/10] overflow-hidden bg-stone-900 border border-[#E5E2DC] shadow-md">
              <Image
                src="/images/about/salon-interior.jpg"
                alt="Aurelia Motors Flagship Salon Interior"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 text-white">
                <span className="text-[10px] uppercase font-bold tracking-tracked text-champagne block">
                  Flagship Salon · Kollupitiya
                </span>
                <span className="text-sm font-semibold tracking-tight">Curated Exhibition Space</span>
              </div>
            </div>

            {/* Narrative Writeup */}
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs uppercase font-bold tracking-tracked text-stone-400 block">
                THE AURELIA COMMITMENT
              </span>
              <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-tight font-display">
                CURATING RARITY, PRESERVING INTEGRITY
              </h2>
              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                We operate not as transactional brokers, but as personal custodians and advisers to clients who value engineering authenticity. We believe that true luxury is defined by transparency, restraint, and an unwavering devotion to provenance.
              </p>
              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                Whether commissioning a bespoke Porsche allocation from Germany or securing a verified low-mileage executive saloon, our clients enjoy an uncompromised standard of private advisory and aftercare.
              </p>

              <div className="pt-2">
                <Button
                  variant="champagne"
                  size="md"
                  onClick={() => setIsConciergeOpen(true)}
                  className="text-xs font-semibold tracking-tracked uppercase flex items-center gap-2"
                >
                  <Sparkles className="h-4 w-4" />
                  <span>SCHEDULE PRIVATE CONSULTATION</span>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* 4 Core Pillars */}
        <section className="max-w-7xl mx-auto px-6 lg:px-12 py-16 border-t border-[#E5E2DC]">
          <div className="mb-12">
            <p className="sub-header-label mb-2">OUR GUIDING PRINCIPLES</p>
            <h2 className="text-2xl md:text-4xl font-bold uppercase tracking-tight text-foreground font-display">
              THE FOUR PILLARS OF OUR PRACTICE
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={idx}
                  className="bg-white border border-[#E5E2DC] p-8 flex flex-col justify-between hover:border-black transition-colors space-y-6"
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <span className="font-mono text-xs font-bold text-stone-400">{pillar.number}</span>
                      <Icon className="h-5 w-5 text-stone-900" />
                    </div>
                    <h3 className="text-base font-bold uppercase tracking-tight text-foreground font-display mb-3">
                      {pillar.title}
                    </h3>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Timeline Milestones */}
        <section className="max-w-7xl mx-auto px-6 lg:px-12 py-16 border-t border-[#E5E2DC]">
          <div className="mb-12">
            <p className="sub-header-label mb-2">CHRONOLOGY OF EXCELLENCE</p>
            <h2 className="text-2xl md:text-4xl font-bold uppercase tracking-tight text-foreground font-display">
              THE AURELIA TIMELINE
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {milestones.map((m, idx) => (
              <div key={idx} className="border-l-2 border-black pl-6 py-2 space-y-2">
                <span className="font-mono text-sm font-bold text-black block tracking-widest">{m.year}</span>
                <h4 className="text-sm font-bold uppercase tracking-tight text-foreground">{m.title}</h4>
                <p className="text-xs text-stone-600 leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Reusable Standards & Branches Section */}
        <StandardsSection />
        <BranchesSection branches={SAMPLE_BRANCHES} />
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
