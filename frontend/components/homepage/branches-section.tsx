'use client';

import * as React from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { Branch } from '@aurelia/types';

interface BranchesSectionProps {
  branches: Branch[];
}

export function BranchesSection({ branches }: BranchesSectionProps) {
  return (
    <section className="bg-white py-12 sm:py-16 text-foreground">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-10 gap-4">
          <div>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-gray-900">
              Our salons and showrooms
            </h2>
          </div>
          <p className="text-xs text-stone-500 max-w-sm">
            Visit our architectural spaces designed for personal consultation and live vehicle viewing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {branches.map((branch) => (
            <div
              key={branch.id}
              className="bg-[#F4F4F6] rounded-3xl p-8 flex flex-col justify-between space-y-6 hover:shadow-md transition-all duration-200"
            >
              <div className="space-y-4">
                <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400">
                  {branch.city}
                </span>
                <h3 className="text-xl font-bold tracking-tight text-gray-900">
                  {branch.name}
                </h3>
                
                <div className="space-y-3 text-xs text-stone-600 pt-2">
                  <div className="flex items-start gap-2.5">
                    <MapPin className="h-4 w-4 text-stone-700 shrink-0 mt-0.5" />
                    <span>{branch.address}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Phone className="h-4 w-4 text-stone-700 shrink-0" />
                    <a href={`tel:${branch.phone}`} className="hover:text-black font-medium">
                      {branch.phone}
                    </a>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Mail className="h-4 w-4 text-stone-700 shrink-0" />
                    <a href={`mailto:${branch.email}`} className="hover:text-black">
                      {branch.email}
                    </a>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Clock className="h-4 w-4 text-stone-700 shrink-0 mt-0.5" />
                    <span>{branch.openingHours}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#E5E5E8]">
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(branch.name + ' ' + branch.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-gray-900 hover:text-stone-600 inline-flex items-center gap-1.5"
                >
                  Get directions →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
