'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { SAMPLE_VEHICLES } from '@/lib/constants';
import { formatCurrency, formatMileage } from '@/lib/utils';
import { Vehicle } from '@aurelia/types';

export default function ComparePage() {
  const [car1, setCar1] = React.useState<Vehicle>(SAMPLE_VEHICLES[0]); // BMW X5
  const [car2, setCar2] = React.useState<Vehicle>(SAMPLE_VEHICLES[1]); // Porsche 911

  return (
    <div className="flex min-h-screen flex-col bg-[#FAF9F6]">
      <Navbar />

      <main className="flex-1 pt-28 pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="border-b border-[#E5E2DC] pb-8 mb-10">
            <p className="sub-header-label mb-2">COMPARISON MATRIX</p>
            <h1 className="text-3xl md:text-5xl font-bold uppercase tracking-tight text-foreground">
              COMPARE VEHICLES
            </h1>
            <p className="text-xs md:text-sm text-stone-500 mt-2">
              Side-by-side technical evaluation across powertrain, dimensions, performance, and price.
            </p>
          </div>

          {/* Selector Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="bg-white p-4 border border-[#E5E2DC] space-y-2">
              <label className="text-[10px] uppercase font-bold tracking-tracked text-stone-400">Vehicle A</label>
              <select
                className="w-full bg-stone-50 border border-[#E5E2DC] p-2.5 text-xs font-semibold"
                value={car1.id}
                onChange={(e) => {
                  const found = SAMPLE_VEHICLES.find((v) => v.id === e.target.value);
                  if (found) setCar1(found);
                }}
              >
                {SAMPLE_VEHICLES.map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.name} ({formatCurrency(v.price)})
                  </option>
                ))}
              </select>
            </div>

            <div className="bg-white p-4 border border-[#E5E2DC] space-y-2">
              <label className="text-[10px] uppercase font-bold tracking-tracked text-stone-400">Vehicle B</label>
              <select
                className="w-full bg-stone-50 border border-[#E5E2DC] p-2.5 text-xs font-semibold"
                value={car2.id}
                onChange={(e) => {
                  const found = SAMPLE_VEHICLES.find((v) => v.id === e.target.value);
                  if (found) setCar2(found);
                }}
              >
                {SAMPLE_VEHICLES.map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.name} ({formatCurrency(v.price)})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Comparison Matrix Table */}
          <div className="bg-white border border-[#E5E2DC] overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#E5E2DC]">
                  <th className="p-4 bg-stone-50 text-[11px] font-bold uppercase tracking-tracked text-stone-400 w-1/4">Specification</th>
                  <th className="p-4 text-sm font-bold uppercase w-3/8 text-center">{car1.name}</th>
                  <th className="p-4 text-sm font-bold uppercase w-3/8 text-center bg-stone-50/50">{car2.name}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EAE6DF] text-xs">
                <tr>
                  <td className="p-4 font-semibold text-stone-500">Visual</td>
                  <td className="p-4 text-center">
                    <div className="relative aspect-[16/10] w-48 mx-auto overflow-hidden">
                      <Image src={car1.images?.[0]?.url || ''} alt={car1.name} fill className="object-cover" />
                    </div>
                  </td>
                  <td className="p-4 text-center bg-stone-50/50">
                    <div className="relative aspect-[16/10] w-48 mx-auto overflow-hidden">
                      <Image src={car2.images?.[0]?.url || ''} alt={car2.name} fill className="object-cover" />
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-stone-500">Price</td>
                  <td className="p-4 text-center font-bold text-base">{formatCurrency(car1.price)}</td>
                  <td className="p-4 text-center font-bold text-base bg-stone-50/50">{formatCurrency(car2.price)}</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-stone-500">Year</td>
                  <td className="p-4 text-center">{car1.year}</td>
                  <td className="p-4 text-center bg-stone-50/50">{car2.year}</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-stone-500">Fuel Type</td>
                  <td className="p-4 text-center">{car1.fuelType}</td>
                  <td className="p-4 text-center bg-stone-50/50">{car2.fuelType}</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-stone-500">Transmission</td>
                  <td className="p-4 text-center">{car1.transmission}</td>
                  <td className="p-4 text-center bg-stone-50/50">{car2.transmission}</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-stone-500">Horsepower</td>
                  <td className="p-4 text-center font-semibold">{car1.horsepower ? `${car1.horsepower} HP` : 'N/A'}</td>
                  <td className="p-4 text-center font-semibold bg-stone-50/50">{car2.horsepower ? `${car2.horsepower} HP` : 'N/A'}</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-stone-500">Torque</td>
                  <td className="p-4 text-center">{car1.torque ? `${car1.torque} Nm` : 'N/A'}</td>
                  <td className="p-4 text-center bg-stone-50/50">{car2.torque ? `${car2.torque} Nm` : 'N/A'}</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-stone-500">Mileage</td>
                  <td className="p-4 text-center">{formatMileage(car1.mileage)}</td>
                  <td className="p-4 text-center bg-stone-50/50">{formatMileage(car2.mileage)}</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-stone-500">Actions</td>
                  <td className="p-4 text-center">
                    <Link href={`/vehicles/${car1.slug}`}>
                      <Button variant="outline" size="sm">View Dossier</Button>
                    </Link>
                  </td>
                  <td className="p-4 text-center bg-stone-50/50">
                    <Link href={`/vehicles/${car2.slug}`}>
                      <Button variant="outline" size="sm">View Dossier</Button>
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
