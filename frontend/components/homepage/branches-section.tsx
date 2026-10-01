'use client';

import * as React from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { Branch } from '@aurelia/types';

interface BranchesSectionProps {
  branches: Branch[];
}

export function BranchesSection({ branches }: BranchesSectionProps) {
  return (
    <section className="bg-[#FAF9F6] py-20 md:py-28 text-foreground border-t border-[#EAE6DF]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <p className="sub-header-label mb-2">04 — SALONS & GALLERIES</p>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground uppercase">
              OUR SHOWROOMS
            </h2>
          </div>
          <p className="text-xs text-stone-500 max-w-sm">
            Visit our architectural spaces designed for contemplation, personalized configuration, and quiet luxury.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {branches.map((branch) => (
            <div
              key={branch.id}
              className="border border-[#E5E2DC] p-8 bg-white/50 backdrop-blur-xs flex flex-col justify-between space-y-6 hover:border-stone-900 transition-colors"
            >
              <div className="space-y-4">
                <span className="text-[10px] font-semibold tracking-tracked uppercase text-stone-400">
                  {branch.city}
                </span>
                <h3 className="text-lg font-bold uppercase tracking-tight text-foreground">
                  {branch.name}
                </h3>
                
                <div className="space-y-2.5 text-xs text-stone-600 pt-2">
                  <div className="flex items-start gap-2.5">
                    <MapPin className="h-4 w-4 text-stone-400 shrink-0 mt-0.5" />
                    <span>{branch.address}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Phone className="h-4 w-4 text-stone-400 shrink-0" />
                    <a href={`tel:${branch.phone}`} className="hover:text-black">
                      {branch.phone}
                    </a>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Mail className="h-4 w-4 text-stone-400 shrink-0" />
                    <a href={`mailto:${branch.email}`} className="hover:text-black">
                      {branch.email}
                    </a>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Clock className="h-4 w-4 text-stone-400 shrink-0 mt-0.5" />
                    <span>{branch.openingHours}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 hairline-t">
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(branch.name + ' ' + branch.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] font-semibold uppercase tracking-tracked text-stone-900 hover:text-stone-500 flex items-center gap-1.5"
                >
                  GET DIRECTIONS ↗
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
