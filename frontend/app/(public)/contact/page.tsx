'use client';

import * as React from 'react';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { BranchesSection } from '@/components/homepage/branches-section';
import { SAMPLE_BRANCHES } from '@/lib/constants';
import { CheckCircle2 } from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#FAF9F6]">
      <Navbar />

      <main className="flex-1 pt-28 pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="border-b border-[#E5E2DC] pb-8 mb-16">
            <p className="sub-header-label mb-2">COMMUNICATIONS</p>
            <h1 className="text-3xl md:text-5xl font-bold uppercase tracking-tight text-foreground">
              CONTACT OUR CONCIERGE
            </h1>
            <p className="text-sm text-stone-500 mt-2 max-w-xl">
              Connect with our Private Client advisory team for confidential vehicle inquiries, acquisition commissions, or appointment bookings.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
            <div className="lg:col-span-7 bg-white p-8 md:p-10 border border-[#E5E2DC]">
              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="mx-auto w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-bold uppercase tracking-tight text-foreground">
                    Communication Received
                  </h3>
                  <p className="text-xs text-stone-500 max-w-sm mx-auto">
                    Thank you. A specialist will be in contact shortly to assist with your requirements.
                  </p>
                  <Button variant="primary" onClick={() => setSubmitted(false)}>
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input label="First Name" required placeholder="Alexander" />
                    <Input label="Last Name" required placeholder="Wright" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input label="Email Address" type="email" required placeholder="alexander@domain.com" />
                    <Input label="Phone Number" type="tel" required placeholder="+94 77 000 0000" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-medium uppercase tracking-tracked text-stone-600">
                      Nature of Inquiry
                    </label>
                    <textarea
                      rows={5}
                      required
                      placeholder="Please detail your vehicle preference, timeline, or consultation request..."
                      className="w-full bg-stone-50 dark:bg-stone-900 border border-[#E5E2DC] dark:border-stone-800 p-3 text-sm text-stone-900 dark:text-stone-100 placeholder:text-stone-400 focus:outline-none focus:border-black dark:focus:border-white transition-colors"
                    />
                  </div>
                  <Button
                    type="submit"
                    variant="champagne"
                    size="lg"
                    isLoading={isLoading}
                    className="w-full"
                  >
                    DISPATCH TO PRIVATE CONCIERGE
                  </Button>
                </form>
              )}
            </div>

            <div className="lg:col-span-5 space-y-6">
              <div className="border border-[#E5E2DC] bg-white p-6 space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-tracked text-stone-400">
                  Direct Line
                </span>
                <p className="text-xl font-bold text-foreground">+94 11 258 9000</p>
                <p className="text-xs text-stone-500">Available Monday through Saturday 9:00 AM – 7:00 PM</p>
              </div>

              <div className="border border-[#E5E2DC] bg-white p-6 space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-tracked text-stone-400">
                  Concierge Mailbox
                </span>
                <p className="text-xl font-bold text-foreground">concierge@aureliamotors.com</p>
                <p className="text-xs text-stone-500">For acquisitions, consignments, and press inquiries</p>
              </div>
            </div>
          </div>
        </div>

        <BranchesSection branches={SAMPLE_BRANCHES} />
      </main>

      <Footer />
    </div>
  );
}
