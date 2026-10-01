'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, notFound } from 'next/navigation';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { VehicleCard } from '@/components/vehicle/vehicle-card';
import { TestDriveModal } from '@/components/forms/test-drive-modal';
import { EnquiryModal } from '@/components/forms/enquiry-modal';
import { SAMPLE_VEHICLES, SAMPLE_BRANCHES } from '@/lib/constants';
import { formatCurrency, formatMileage } from '@/lib/utils';
import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  Share2,
  ShieldCheck,
  Gauge,
  Fuel,
  Zap,
  Cog,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  PhoneCall,
  Calendar,
  Sparkles,
  Calculator,
  FileText,
  Clock,
  Compass,
  CheckCircle2,
  Layers,
  Award,
} from 'lucide-react';

export default function VehicleDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const vehicle = SAMPLE_VEHICLES.find((v) => v.slug === slug) || SAMPLE_VEHICLES[0];

  const [activeImage, setActiveImage] = React.useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = React.useState(false);
  const [isTestDriveOpen, setIsTestDriveOpen] = React.useState(false);
  const [isConciergeOpen, setIsConciergeOpen] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState<'overview' | 'specs' | 'guarantee' | 'finance'>('overview');
  const [copiedLink, setCopiedLink] = React.useState(false);
  const [showStickyBar, setShowStickyBar] = React.useState(false);

  // Finance Calculator State
  const [downPaymentPercent, setDownPaymentPercent] = React.useState<number>(30);
  const [loanTermMonths, setLoanTermMonths] = React.useState<number>(48);
  const interestRateAnnual = 0.075; // 7.5% annual rate

  // Scroll listener for sticky subheader
  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 450) {
        setShowStickyBar(true);
      } else {
        setShowStickyBar(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!vehicle) {
    return notFound();
  }

  // Multi-angle gallery fallback images to create a full 4-angle experience
  const fallbackGallery = [
    '/images/vehicles/bmw-x5-1.jpg',
    '/images/vehicles/porsche-911.jpg',
    '/images/vehicles/audi-etron-gt.jpg',
    '/images/vehicles/bmw-x5-2.jpg',
  ];

  const images =
    vehicle.images && vehicle.images.length > 0
      ? vehicle.images.map((img) => img.url)
      : fallbackGallery;

  // Ensure at least 3-4 images for rich showroom feel
  const displayImages = images.length >= 3 ? images : [...images, ...fallbackGallery.slice(images.length, 4)];

  // Finance Calculation
  const downPaymentAmount = (vehicle.price * downPaymentPercent) / 100;
  const principalAmount = vehicle.price - downPaymentAmount;
  const monthlyInterestRate = interestRateAnnual / 12;
  const monthlyPayment = Math.round(
    (principalAmount *
      (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, loanTermMonths))) /
      (Math.pow(1 + monthlyInterestRate, loanTermMonths) - 1)
  );

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const nextImage = () => {
    setActiveImage((prev) => (prev + 1) % displayImages.length);
  };

  const prevImage = () => {
    setActiveImage((prev) => (prev - 1 + displayImages.length) % displayImages.length);
  };

  // Similar vehicles (excluding current)
  const similarVehicles = SAMPLE_VEHICLES.filter((v) => v.id !== vehicle.id).slice(0, 3);

  return (
    <div className="flex min-h-screen flex-col bg-[#FAF9F6] text-[#111215]">
      {/* Primary Global Navigation */}
      <Navbar onOpenTestDrive={() => setIsTestDriveOpen(true)} />

      {/* Floating Sticky Subheader on scroll */}
      <div
        className={`fixed top-20 left-0 right-0 z-30 bg-[#0D0E10]/90 backdrop-blur-md text-white border-b border-white/10 transition-all duration-300 transform ${
          showStickyBar ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 h-14 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-xs uppercase font-bold tracking-tracked text-champagne hidden sm:inline">
              {vehicle.brand?.name}
            </span>
            <span className="text-sm font-semibold tracking-tight truncate max-w-[200px] sm:max-w-none">
              {vehicle.model}
            </span>
            <span className="text-xs font-normal text-stone-400 hidden md:inline">
              · {vehicle.year} · {formatMileage(vehicle.mileage)}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm font-bold tracking-tight text-white hidden sm:inline">
              {formatCurrency(vehicle.price)}
            </span>
            <Button
              variant="champagne"
              size="sm"
              onClick={() => setIsTestDriveOpen(true)}
              className="text-[11px] font-semibold tracking-tracked uppercase px-4 py-1.5"
            >
              Book Test Drive
            </Button>
          </div>
        </div>
      </div>

      <main className="flex-1 pt-24 md:pt-28 pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {/* Header Action Bar / Breadcrumb */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pt-2">
            <Link
              href="/vehicles"
              className="inline-flex items-center gap-2 text-[11px] uppercase font-semibold tracking-tracked text-stone-500 hover:text-black transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> Back to Collection
            </Link>

            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 border border-emerald-200 text-emerald-800 text-[10px] font-semibold tracking-tracked uppercase">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 animate-pulse" />
                Available In Salon Floor
              </span>

              <button
                onClick={handleShare}
                aria-label="Share vehicle dossier"
                className="inline-flex items-center gap-1.5 px-3 py-1 border border-stone-300 hover:border-black bg-white text-[11px] font-medium tracking-tracked text-stone-600 hover:text-black transition-colors"
              >
                <Share2 className="h-3.5 w-3.5" />
                <span>{copiedLink ? 'Link Copied' : 'Share'}</span>
              </button>
            </div>
          </div>

          {/* Vehicle Main Dossier Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* LEFT COLUMN: Hero Stage, Telemetry Matrix, Tabbed Narrative */}
            <div className="lg:col-span-7 space-y-8">
              {/* Interactive High-Res Gallery Stage */}
              <div className="relative group bg-stone-900 overflow-hidden border border-stone-300">
                {/* Main Active Canvas */}
                <div className="relative aspect-[16/10] w-full cursor-zoom-in" onClick={() => setIsLightboxOpen(true)}>
                  <Image
                    src={displayImages[activeImage]}
                    alt={`${vehicle.name} - View ${activeImage + 1}`}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />

                  {/* Expand Lightbox Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsLightboxOpen(true);
                    }}
                    aria-label="Expand image in lightbox"
                    className="absolute top-4 right-4 p-2 bg-black/60 hover:bg-black/90 backdrop-blur-md text-white rounded-none border border-white/20 transition-all opacity-0 group-hover:opacity-100"
                  >
                    <Maximize2 className="h-4 w-4" />
                  </button>

                  {/* Stage Image Counter */}
                  <div className="absolute bottom-4 left-4 px-3 py-1 bg-black/70 backdrop-blur-md text-white text-[10px] uppercase font-bold tracking-tracked border border-white/15">
                    Angle {activeImage + 1} / {displayImages.length}
                  </div>

                  {/* Arrow Navigators */}
                  {displayImages.length > 1 && (
                    <>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          prevImage();
                        }}
                        aria-label="Previous image"
                        className="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-black/80 backdrop-blur-sm text-white border border-white/20 transition-all opacity-0 group-hover:opacity-100"
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          nextImage();
                        }}
                        aria-label="Next image"
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-black/80 backdrop-blur-sm text-white border border-white/20 transition-all opacity-0 group-hover:opacity-100"
                      >
                        <ChevronRight className="h-5 w-5" />
                      </button>
                    </>
                  )}
                </div>

                {/* Thumbnails Row */}
                {displayImages.length > 1 && (
                  <div className="p-3 bg-[#111215] border-t border-white/10 grid grid-cols-4 gap-2.5">
                    {displayImages.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveImage(idx)}
                        className={`relative aspect-[16/10] overflow-hidden border transition-all ${
                          activeImage === idx
                            ? 'border-champagne ring-1 ring-champagne opacity-100'
                            : 'border-white/15 opacity-60 hover:opacity-100'
                        }`}
                      >
                        <Image src={img} alt={`Thumbnail ${idx + 1}`} fill className="object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Performance Telemetry HUD Matrix */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-white border border-[#E5E2DC] p-4 flex flex-col justify-between hover:border-black transition-colors">
                  <div className="flex items-center justify-between text-stone-400 mb-2">
                    <span className="text-[10px] uppercase font-bold tracking-tracked">0–100 KM/H</span>
                    <Zap className="h-4 w-4 text-stone-700" />
                  </div>
                  <div>
                    <div className="text-xl font-bold tracking-tight text-foreground font-display">
                      {vehicle.specifications?.find((s) => s.name.toLowerCase().includes('0-100'))?.value || '4.2s'}
                    </div>
                    <span className="text-[10px] text-stone-500">Acceleration</span>
                  </div>
                </div>

                <div className="bg-white border border-[#E5E2DC] p-4 flex flex-col justify-between hover:border-black transition-colors">
                  <div className="flex items-center justify-between text-stone-400 mb-2">
                    <span className="text-[10px] uppercase font-bold tracking-tracked">POWER</span>
                    <Gauge className="h-4 w-4 text-stone-700" />
                  </div>
                  <div>
                    <div className="text-xl font-bold tracking-tight text-foreground font-display">
                      {vehicle.horsepower ? `${vehicle.horsepower} HP` : '388 HP'}
                    </div>
                    <span className="text-[10px] text-stone-500">
                      {vehicle.torque ? `${vehicle.torque} Nm Torque` : 'Peak Output'}
                    </span>
                  </div>
                </div>

                <div className="bg-white border border-[#E5E2DC] p-4 flex flex-col justify-between hover:border-black transition-colors">
                  <div className="flex items-center justify-between text-stone-400 mb-2">
                    <span className="text-[10px] uppercase font-bold tracking-tracked">GEARBOX</span>
                    <Cog className="h-4 w-4 text-stone-700" />
                  </div>
                  <div>
                    <div className="text-base sm:text-lg font-bold tracking-tight text-foreground font-display truncate">
                      {vehicle.transmission === 'AUTOMATIC' ? 'Automatic' : vehicle.transmission}
                    </div>
                    <span className="text-[10px] text-stone-500 truncate block">
                      {vehicle.doors} Doors · {vehicle.seats} Seats
                    </span>
                  </div>
                </div>

                <div className="bg-white border border-[#E5E2DC] p-4 flex flex-col justify-between hover:border-black transition-colors">
                  <div className="flex items-center justify-between text-stone-400 mb-2">
                    <span className="text-[10px] uppercase font-bold tracking-tracked">POWERTRAIN</span>
                    <Fuel className="h-4 w-4 text-stone-700" />
                  </div>
                  <div>
                    <div className="text-xl font-bold tracking-tight text-foreground font-display">
                      {vehicle.fuelType.charAt(0) + vehicle.fuelType.slice(1).toLowerCase()}
                    </div>
                    <span className="text-[10px] text-stone-500">{formatMileage(vehicle.mileage)}</span>
                  </div>
                </div>
              </div>

              {/* Dossier Section Navigator Tabs */}
              <div className="bg-white border border-[#E5E2DC]">
                {/* Tab Navigation Buttons */}
                <div className="flex border-b border-[#E5E2DC] overflow-x-auto">
                  <button
                    onClick={() => setActiveTab('overview')}
                    className={`px-6 py-4 text-xs font-semibold uppercase tracking-tracked whitespace-nowrap transition-colors border-b-2 -mb-px cursor-pointer ${
                      activeTab === 'overview'
                        ? 'border-black text-black bg-[#FAF9F6]'
                        : 'border-transparent text-stone-400 hover:text-black'
                    }`}
                  >
                    Overview & Provenance
                  </button>
                  <button
                    onClick={() => setActiveTab('specs')}
                    className={`px-6 py-4 text-xs font-semibold uppercase tracking-tracked whitespace-nowrap transition-colors border-b-2 -mb-px cursor-pointer ${
                      activeTab === 'specs'
                        ? 'border-black text-black bg-[#FAF9F6]'
                        : 'border-transparent text-stone-400 hover:text-black'
                    }`}
                  >
                    Technical Specifications
                  </button>
                  <button
                    onClick={() => setActiveTab('guarantee')}
                    className={`px-6 py-4 text-xs font-semibold uppercase tracking-tracked whitespace-nowrap transition-colors border-b-2 -mb-px cursor-pointer ${
                      activeTab === 'guarantee'
                        ? 'border-black text-black bg-[#FAF9F6]'
                        : 'border-transparent text-stone-400 hover:text-black'
                    }`}
                  >
                    Aurelia Standard
                  </button>
                  <button
                    onClick={() => setActiveTab('finance')}
                    className={`px-6 py-4 text-xs font-semibold uppercase tracking-tracked whitespace-nowrap transition-colors border-b-2 -mb-px cursor-pointer ${
                      activeTab === 'finance'
                        ? 'border-black text-black bg-[#FAF9F6]'
                        : 'border-transparent text-stone-400 hover:text-black'
                    }`}
                  >
                    Finance Estimator
                  </button>
                </div>

                {/* Tab Content Panels */}
                <div className="p-8">
                  {/* TAB 1: OVERVIEW */}
                  {activeTab === 'overview' && (
                    <div className="space-y-8">
                      <div>
                        <h3 className="text-xs uppercase font-bold tracking-tracked text-stone-400 mb-3">
                          Editorial & Provenance
                        </h3>
                        <p className="text-stone-800 text-sm leading-relaxed antialiased">
                          {vehicle.description}
                        </p>
                      </div>

                      {/* Bespoke Equipment Matrix */}
                      <div>
                        <h4 className="text-xs uppercase font-bold tracking-tracked text-stone-400 mb-4">
                          Bespoke Factory Equipment & Highlights
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {[
                            'Adaptive M / Dynamic Sport Suspension with selectable driving modes',
                            'Panoramic Sunroof with acoustic heat-insulating glass',
                            'Surround View 360° Cameras with Park Assist Active Matrix',
                            'Bespoke Premium Sound System with active noise cancellation',
                            'Ventilated and Heated 14-Way Power Comfort Seats with memory',
                            'Wireless Apple CarPlay & Android Auto with high-speed induction charging',
                          ].map((item, idx) => (
                            <div key={idx} className="flex items-start gap-2.5 text-xs text-stone-700">
                              <CheckCircle2 className="h-4 w-4 text-stone-900 shrink-0 mt-0.5" />
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Colorway & Finish Details */}
                      <div className="pt-6 border-t border-[#EAE6DF] grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                        <div>
                          <span className="text-stone-400 uppercase tracking-tracked text-[10px] block mb-1">
                            Exterior Paintwork
                          </span>
                          <span className="font-semibold text-black">{vehicle.color}</span>
                        </div>
                        <div>
                          <span className="text-stone-400 uppercase tracking-tracked text-[10px] block mb-1">
                            Upholstery & Interior
                          </span>
                          <span className="font-semibold text-black">Bespoke Extended Leather</span>
                        </div>
                        <div>
                          <span className="text-stone-400 uppercase tracking-tracked text-[10px] block mb-1">
                            Chassis / Catalogue ID
                          </span>
                          <span className="font-mono text-black font-medium">AUR-{vehicle.id.toUpperCase()}-2025</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB 2: FULL SPECIFICATIONS */}
                  {activeTab === 'specs' && (
                    <div className="space-y-6">
                      <div>
                        <h4 className="text-xs uppercase font-bold tracking-tracked text-stone-400 mb-3">
                          Powertrain & Performance
                        </h4>
                        <div className="divide-y divide-[#EAE6DF] text-xs">
                          <div className="flex justify-between py-2.5">
                            <span className="text-stone-500">Engine Configuration</span>
                            <span className="font-semibold text-black">{vehicle.engine || 'High-Output Performance'}</span>
                          </div>
                          <div className="flex justify-between py-2.5">
                            <span className="text-stone-500">Displacement</span>
                            <span className="font-semibold text-black">{vehicle.engineCapacity || '2,998 cc'}</span>
                          </div>
                          <div className="flex justify-between py-2.5">
                            <span className="text-stone-500">Max Horsepower</span>
                            <span className="font-semibold text-black">{vehicle.horsepower ? `${vehicle.horsepower} HP` : '375 HP'}</span>
                          </div>
                          <div className="flex justify-between py-2.5">
                            <span className="text-stone-500">Max Torque</span>
                            <span className="font-semibold text-black">{vehicle.torque ? `${vehicle.torque} Nm` : '500 Nm'}</span>
                          </div>
                        </div>
                      </div>

                      <div className="pt-4">
                        <h4 className="text-xs uppercase font-bold tracking-tracked text-stone-400 mb-3">
                          Drivetrain & Dimensions
                        </h4>
                        <div className="divide-y divide-[#EAE6DF] text-xs">
                          <div className="flex justify-between py-2.5">
                            <span className="text-stone-500">Transmission</span>
                            <span className="font-semibold text-black">{vehicle.transmission}</span>
                          </div>
                          <div className="flex justify-between py-2.5">
                            <span className="text-stone-500">Seating Capacity</span>
                            <span className="font-semibold text-black">{vehicle.seats} Passengers</span>
                          </div>
                          <div className="flex justify-between py-2.5">
                            <span className="text-stone-500">Doors</span>
                            <span className="font-semibold text-black">{vehicle.doors} Doors</span>
                          </div>
                          <div className="flex justify-between py-2.5">
                            <span className="text-stone-500">Mileage Recorded</span>
                            <span className="font-semibold text-black">{formatMileage(vehicle.mileage)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB 3: AURELIA STANDARD */}
                  {activeTab === 'guarantee' && (
                    <div className="space-y-6">
                      <div className="flex items-start gap-4 p-4 bg-[#FAF9F6] border border-[#EAE6DF]">
                        <Award className="h-8 w-8 text-[#D4AF37] shrink-0 mt-1" />
                        <div>
                          <h4 className="text-sm font-bold uppercase tracking-tight text-black mb-1">
                            Aurelia Certified Salon Standard
                          </h4>
                          <p className="text-xs text-stone-600 leading-relaxed">
                            Every vehicle admitted to our salon undergoes rigorous multi-point vetting, mechanical forensic inspection, and provenance validation before private viewing.
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                        <div className="p-4 border border-[#E5E2DC] space-y-2">
                          <div className="flex items-center gap-2 font-bold text-black uppercase tracking-tracked text-[11px]">
                            <ShieldCheck className="h-4 w-4 text-black" />
                            <span>160-Point Master Inspection</span>
                          </div>
                          <p className="text-stone-600 leading-relaxed">
                            Full diagnostics covering powertrain tolerance, electronic systems, suspension geometry, and structural integrity.
                          </p>
                        </div>

                        <div className="p-4 border border-[#E5E2DC] space-y-2">
                          <div className="flex items-center gap-2 font-bold text-black uppercase tracking-tracked text-[11px]">
                            <Check className="h-4 w-4 text-black" />
                            <span>24-Month Comprehensive Warranty</span>
                          </div>
                          <p className="text-stone-600 leading-relaxed">
                            Complete peace-of-mind warranty covering mechanical, electrical, and electronic factory components.
                          </p>
                        </div>

                        <div className="p-4 border border-[#E5E2DC] space-y-2">
                          <div className="flex items-center gap-2 font-bold text-black uppercase tracking-tracked text-[11px]">
                            <Compass className="h-4 w-4 text-black" />
                            <span>White-Glove Enclosed Delivery</span>
                          </div>
                          <p className="text-stone-600 leading-relaxed">
                            Complimentary nationwide enclosed carrier transport straight to your private residence or preferred salon studio.
                          </p>
                        </div>

                        <div className="p-4 border border-[#E5E2DC] space-y-2">
                          <div className="flex items-center gap-2 font-bold text-black uppercase tracking-tracked text-[11px]">
                            <FileText className="h-4 w-4 text-black" />
                            <span>Verified Provenance & Clean Title</span>
                          </div>
                          <p className="text-stone-600 leading-relaxed">
                            Guaranteed clear title with full authenticated international maintenance and ownership records.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB 4: FINANCE & LEASING ESTIMATOR */}
                  {activeTab === 'finance' && (
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs uppercase font-bold tracking-tracked text-stone-400">
                          Bespoke Financing & Lease Estimator
                        </h4>
                        <span className="text-[11px] text-stone-500 font-mono">
                          Indicative Rate: 7.5% APR
                        </span>
                      </div>

                      {/* Interactive Controls */}
                      <div className="space-y-6 bg-[#FAF9F6] p-6 border border-[#EAE6DF]">
                        {/* Down Payment Slider */}
                        <div>
                          <div className="flex justify-between text-xs mb-2">
                            <span className="text-stone-600 font-medium">Down Payment ({downPaymentPercent}%)</span>
                            <span className="font-bold text-black">{formatCurrency(downPaymentAmount)}</span>
                          </div>
                          <input
                            type="range"
                            min="10"
                            max="60"
                            step="5"
                            value={downPaymentPercent}
                            onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                            className="w-full h-1.5 bg-stone-300 rounded-lg appearance-none cursor-pointer accent-black"
                          />
                        </div>

                        {/* Loan Term Selector */}
                        <div>
                          <label className="text-xs text-stone-600 font-medium block mb-2">
                            Financing Term (Months)
                          </label>
                          <div className="grid grid-cols-4 gap-2">
                            {[24, 36, 48, 60].map((term) => (
                              <button
                                key={term}
                                onClick={() => setLoanTermMonths(term)}
                                className={`py-2 text-xs font-semibold uppercase tracking-tracked border transition-all cursor-pointer ${
                                  loanTermMonths === term
                                    ? 'bg-black text-white border-black shadow-sm'
                                    : 'bg-white text-stone-600 border-stone-300 hover:border-black'
                                }`}
                              >
                                {term} Mo
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Calculated Output Card */}
                        <div className="pt-4 border-t border-stone-200 flex flex-col sm:flex-row justify-between items-start sm:items-baseline gap-2">
                          <div>
                            <span className="text-[10px] uppercase tracking-tracked text-stone-400 block">
                              Estimated Monthly Investment
                            </span>
                            <span className="text-2xl font-bold tracking-tight text-black font-display">
                              {formatCurrency(monthlyPayment)}
                              <span className="text-xs font-normal text-stone-500"> / month</span>
                            </span>
                          </div>

                          <Button
                            variant="champagne"
                            size="sm"
                            onClick={() => setIsConciergeOpen(true)}
                            className="text-[10px] font-bold uppercase tracking-tracked"
                          >
                            Apply for Financing
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Sticky Luxury Purchasing Dossier */}
            <div className="lg:col-span-5 space-y-6 sticky top-28">
              <div className="bg-white border border-[#E5E2DC] p-8 shadow-sm">
                {/* Brand & Model Headline */}
                <div className="pb-6 border-b border-[#EAE6DF] space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-tracked text-stone-400">
                      {vehicle.brand?.name} · {vehicle.year}
                    </span>
                    <span className="text-[10px] uppercase font-semibold tracking-tracked text-stone-500 bg-stone-100 px-2 py-0.5">
                      {vehicle.category?.name || 'Exclusive'}
                    </span>
                  </div>

                  <h1 className="text-3xl font-bold tracking-tight text-foreground font-display">
                    {vehicle.model}
                  </h1>

                  {vehicle.variant && (
                    <p className="text-xs font-medium text-stone-500 tracking-wide">{vehicle.variant}</p>
                  )}
                </div>

                {/* Showroom Price Box */}
                <div className="py-6 border-b border-[#EAE6DF] space-y-2">
                  <div className="flex items-baseline justify-between">
                    <span className="text-[10px] uppercase tracking-tracked text-stone-400">
                      Showroom Acquisition Price
                    </span>
                    <span className="text-[10px] uppercase font-semibold text-emerald-700 tracking-tracked">
                      Immediate Handover
                    </span>
                  </div>

                  <div className="text-4xl font-bold tracking-tight text-black font-display">
                    {formatCurrency(vehicle.price)}
                  </div>

                  <p className="text-[11px] text-stone-500">
                    Transparent pricing inclusive of all pre-delivery inspection & certified provenance documents.
                  </p>
                </div>

                {/* Call-to-Action Buttons */}
                <div className="py-6 border-b border-[#EAE6DF] space-y-3">
                  <Button
                    variant="champagne"
                    size="lg"
                    onClick={() => setIsTestDriveOpen(true)}
                    className="w-full text-xs font-semibold tracking-tracked uppercase shadow-sm flex items-center justify-center gap-2"
                  >
                    <Calendar className="h-4 w-4" />
                    <span>SCHEDULE PRIVATE TEST DRIVE</span>
                  </Button>

                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => setIsConciergeOpen(true)}
                    className="w-full border-black hover:bg-black hover:text-white transition-colors text-xs font-semibold tracking-tracked uppercase flex items-center justify-center gap-2"
                  >
                    <FileText className="h-4 w-4" />
                    <span>REQUEST BESPOKE QUOTATION</span>
                  </Button>
                </div>

                {/* Direct Concierge Contact */}
                <div className="pt-6 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-stone-400 uppercase tracking-tracked text-[10px]">Private Concierge</span>
                    <span className="font-semibold text-black">Colombo · Batticaloa · Jaffna</span>
                  </div>

                  <a
                    href="tel:+94112589000"
                    className="flex items-center justify-between p-3 bg-[#FAF9F6] border border-[#EAE6DF] hover:border-black transition-colors text-xs font-medium text-black group"
                  >
                    <span className="flex items-center gap-2">
                      <PhoneCall className="h-3.5 w-3.5 text-stone-700" />
                      <span>+94 11 258 9000</span>
                    </span>
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-stone-400 group-hover:text-black" />
                  </a>

                  <div className="pt-2 text-[11px] text-stone-500 text-center">
                    Dedicated client advisor available Monday – Saturday, 9:00 AM – 7:00 PM
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Similar Vehicles Carousel / Grid */}
          {similarVehicles.length > 0 && (
            <div className="mt-28 pt-16 border-t border-[#E5E2DC]">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10">
                <div>
                  <span className="text-xs uppercase tracking-tracked-wide text-stone-400 font-semibold block mb-2">
                    Curated Alternatives
                  </span>
                  <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground font-display uppercase">
                    You May Also Consider
                  </h2>
                </div>

                <Link
                  href="/vehicles"
                  className="mt-4 sm:mt-0 inline-flex items-center gap-1.5 text-xs font-semibold tracking-tracked uppercase hover:text-stone-600 transition-colors"
                >
                  <span>Explore Full Collection</span>
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {similarVehicles.map((simVehicle) => (
                  <VehicleCard key={simVehicle.id} vehicle={simVehicle} />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />

      {/* Full-Screen High-Definition Lightbox Modal */}
      {isLightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/95 text-white flex flex-col justify-between p-6 sm:p-10 animate-in fade-in duration-200"
          onClick={() => setIsLightboxOpen(false)}
        >
          {/* Lightbox Top Header */}
          <div className="flex items-center justify-between z-10" onClick={(e) => e.stopPropagation()}>
            <div>
              <span className="text-xs uppercase font-bold tracking-tracked text-champagne">
                {vehicle.brand?.name} · {vehicle.year}
              </span>
              <h3 className="text-lg font-bold text-white">{vehicle.model}</h3>
            </div>

            <button
              onClick={() => setIsLightboxOpen(false)}
              className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-none border border-white/20 transition-colors"
              aria-label="Close lightbox"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Lightbox Main Image Display */}
          <div
            className="relative flex-1 w-full max-w-6xl mx-auto my-4 flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-full max-h-[75vh]">
              <Image
                src={displayImages[activeImage]}
                alt={`${vehicle.name} - Angle ${activeImage + 1}`}
                fill
                className="object-contain"
                priority
              />
            </div>

            {displayImages.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  aria-label="Previous image"
                  className="absolute left-2 p-3 bg-black/60 hover:bg-black/90 text-white border border-white/20 transition-colors"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={nextImage}
                  aria-label="Next image"
                  className="absolute right-2 p-3 bg-black/60 hover:bg-black/90 text-white border border-white/20 transition-colors"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            )}
          </div>

          {/* Lightbox Bottom Indicator */}
          <div className="text-center text-xs text-stone-400 tracking-tracked uppercase z-10" onClick={(e) => e.stopPropagation()}>
            Image {activeImage + 1} of {displayImages.length}
          </div>
        </div>
      )}

      {/* Interactive Modals */}
      <TestDriveModal
        isOpen={isTestDriveOpen}
        onClose={() => setIsTestDriveOpen(false)}
        vehicles={[vehicle, ...SAMPLE_VEHICLES.filter((v) => v.id !== vehicle.id)]}
        branches={SAMPLE_BRANCHES}
        selectedVehicleId={vehicle.id}
      />

      <EnquiryModal
        isOpen={isConciergeOpen}
        onClose={() => setIsConciergeOpen(false)}
      />
    </div>
  );
}
