'use client';

import * as React from 'react';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { BranchesSection } from '@/components/homepage/branches-section';
import { getBranches, submitEnquiry } from '@/lib/api';
import { Branch } from '@aurelia/types';
import { CheckCircle2, AlertCircle, Phone, Mail, MapPin, Clock, ArrowRight, Sparkles, ShieldCheck, Headphones } from 'lucide-react';

export default function ContactPage() {
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [submitted, setSubmitted] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [branches, setBranches] = React.useState<Branch[]>([]);

  React.useEffect(() => {
    getBranches()
      .then((data) => {
        if (data && data.length > 0) setBranches(data);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      await submitEnquiry({
        name: `${firstName} ${lastName}`.trim(),
        email,
        phone,
        message,
      });
      setSubmitted(true);
    } catch (err: any) {
      setError(err.message || 'Failed to dispatch inquiry. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-white text-gray-900 font-sans antialiased">
      <Navbar />

      <main className="flex-1 pt-28 sm:pt-36 pb-24 space-y-16">
        {/* Centered Page Header matching Carent style */}
        <div className="max-w-4xl mx-auto px-6 text-center space-y-4">
          <h1 className="text-4xl sm:text-6xl font-extrabold text-gray-950 tracking-tight">
            Contact Us
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed max-w-2xl mx-auto">
            Connect with our curators for confidential vehicle inquiries, test drive scheduling, or personalized acquisition advisory.
          </p>
        </div>

        {/* 2-Column Contact Form & Direct Contact Card */}
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left: Soft Gray Form Container */}
            <div className="lg:col-span-7 bg-[#F4F4F6] rounded-3xl p-8 sm:p-12 shadow-sm border border-black/5 flex flex-col justify-between">
              {submitted ? (
                <div className="py-16 text-center space-y-5 my-auto">
                  <div className="mx-auto w-16 h-16 rounded-full bg-[#FEE123] flex items-center justify-center text-black shadow-md">
                    <CheckCircle2 className="w-8 h-8 text-black" />
                  </div>
                  <h3 className="text-2xl font-extrabold tracking-tight text-gray-950">
                    Inquiry Dispatched Successfully
                  </h3>
                  <p className="text-xs text-stone-600 max-w-sm mx-auto leading-relaxed">
                    Thank you for reaching out to Aurelia Motors. A dedicated client advisor will review your dossier and contact you shortly.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFirstName('');
                      setLastName('');
                      setEmail('');
                      setPhone('');
                      setMessage('');
                    }}
                    className="bg-[#121316] hover:bg-black text-white font-bold text-xs px-7 py-3.5 rounded-full cursor-pointer transition-transform active:scale-95 shadow-sm"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-1 mb-2">
                    <h2 className="text-xl font-bold tracking-tight text-gray-950">
                      Send an Inquiry
                    </h2>
                    <p className="text-xs text-stone-500">
                      Fill out the form below and we will get back to you within 2 business hours.
                    </p>
                  </div>

                  {error && (
                    <div className="p-3.5 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl flex items-center gap-2.5">
                      <AlertCircle className="h-4 w-4 shrink-0 text-rose-600" />
                      <span>{error}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-900 block">First Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="Alexander"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="w-full bg-white border border-[#E5E5E8] focus:border-black focus:ring-1 focus:ring-black focus:outline-none px-4 py-3.5 rounded-xl text-xs font-medium text-gray-900 placeholder:text-stone-400 transition-colors shadow-xs"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-900 block">Last Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="Vance"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="w-full bg-white border border-[#E5E5E8] focus:border-black focus:ring-1 focus:ring-black focus:outline-none px-4 py-3.5 rounded-xl text-xs font-medium text-gray-900 placeholder:text-stone-400 transition-colors shadow-xs"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-900 block">Email Address *</label>
                      <input
                        type="email"
                        required
                        placeholder="vance@aurelia.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-white border border-[#E5E5E8] focus:border-black focus:ring-1 focus:ring-black focus:outline-none px-4 py-3.5 rounded-xl text-xs font-medium text-gray-900 placeholder:text-stone-400 transition-colors shadow-xs"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-900 block">Phone Number</label>
                      <input
                        type="tel"
                        placeholder="+94 77 123 4567"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-white border border-[#E5E5E8] focus:border-black focus:ring-1 focus:ring-black focus:outline-none px-4 py-3.5 rounded-xl text-xs font-medium text-gray-900 placeholder:text-stone-400 transition-colors shadow-xs"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-900 block">Message / Inquiries *</label>
                    <textarea
                      required
                      rows={5}
                      placeholder="Specify your vehicle of interest, requested delivery timelines, or private consultation preferences..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full bg-white border border-[#E5E5E8] focus:border-black focus:ring-1 focus:ring-black focus:outline-none p-4 rounded-xl text-xs font-medium text-gray-900 placeholder:text-stone-400 transition-colors resize-none shadow-xs"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-[#FEE123] hover:bg-[#FDD835] text-black font-extrabold text-xs px-6 py-4 rounded-full shadow-sm cursor-pointer transition-all active:scale-98 flex items-center justify-between group"
                  >
                    <span>{isLoading ? 'Dispatching Message...' : 'Send Confidential Message'}</span>
                    <span className="w-7 h-7 rounded-full bg-black text-white flex items-center justify-center transition-transform group-hover:translate-x-0.5">
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </button>
                </form>
              )}
            </div>

            {/* Right: Dark Card with Direct Concierge Info */}
            <div className="lg:col-span-5 bg-[#121316] text-white rounded-3xl p-8 sm:p-12 shadow-2xl space-y-8 flex flex-col justify-between relative overflow-hidden">
              {/* Background Glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#FEE123]/5 rounded-full blur-3xl pointer-events-none" />

              <div className="space-y-3 relative z-10">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#FEE123] block">
                  Private Client Desk
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                  Get in touch directly
                </h3>
                <p className="text-xs text-stone-400 mt-2 leading-relaxed">
                  Our private client advisors are on call Monday through Saturday to assist with tailored specifications, private showings, and acquisition dossiers.
                </p>
              </div>

              <div className="space-y-5 text-xs text-stone-300 relative z-10">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#FEE123] flex items-center justify-center shrink-0 text-black shadow-md">
                    <Phone className="w-4 h-4 text-black" />
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[10px] font-semibold uppercase tracking-wider">Direct Hotline</span>
                    <a href="tel:+94112345678" className="font-bold text-sm text-white hover:text-[#FEE123] transition-colors">
                      +94 11 234 5678
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#FEE123] flex items-center justify-center shrink-0 text-black shadow-md">
                    <Mail className="w-4 h-4 text-black" />
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[10px] font-semibold uppercase tracking-wider">Concierge Email</span>
                    <a href="mailto:concierge@aureliamotors.lk" className="font-bold text-sm text-white hover:text-[#FEE123] transition-colors">
                      concierge@aureliamotors.lk
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#FEE123] flex items-center justify-center shrink-0 text-black shadow-md">
                    <MapPin className="w-4 h-4 text-black" />
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[10px] font-semibold uppercase tracking-wider">Flagship Atelier</span>
                    <span className="text-white font-medium block">
                      No. 450, Galle Road, Kollupitiya, Colombo 03
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#FEE123] flex items-center justify-center shrink-0 text-black shadow-md">
                    <Clock className="w-4 h-4 text-black" />
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[10px] font-semibold uppercase tracking-wider">Salon Hours</span>
                    <span className="text-white font-medium block">
                      Mon - Sat: 9:00 AM - 7:00 PM <br />
                      <span className="text-stone-400 text-[11px]">Sunday by Private Appointment Only</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom Quick Badge */}
              <div className="pt-6 border-t border-white/10 relative z-10 flex items-center justify-between text-xs text-stone-400">
                <span className="flex items-center gap-1.5 font-semibold text-stone-300">
                  <ShieldCheck className="w-4 h-4 text-[#FEE123]" />
                  Confidentiality Guaranteed
                </span>
                <span className="text-[11px] font-bold text-[#FEE123]">
                  24/7 VIP Assistance
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Showrooms Gallery */}
        <BranchesSection branches={branches} />
      </main>

      <Footer />
    </div>
  );
}
