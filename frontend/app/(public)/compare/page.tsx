'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { formatCurrency, formatMileage } from '@/lib/utils';
import { getVehicles } from '@/lib/api';
import { Vehicle } from '@aurelia/types';

export default function ComparePage() {
  const [vehicles, setVehicles] = React.useState<Vehicle[]>([]);
  const [car1, setCar1] = React.useState<Vehicle | null>(null);
  const [car2, setCar2] = React.useState<Vehicle | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    getVehicles({ limit: 100 })
      .then((res) => {
        const list = res.data || [];
        setVehicles(list);
        if (list.length > 0) {
          setCar1(list[0]);
          setCar2(list.length > 1 ? list[1] : list[0]);
        }
      })
      .catch((err) => {
        console.error('Failed to load vehicles for comparison:', err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-white text-gray-900">
      <Navbar />

      <main className="flex-1 pt-28 sm:pt-36 pb-24 space-y-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {/* Centered Page Header */}
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
            <h1 className="text-4xl sm:text-6xl font-extrabold text-gray-900 tracking-tight">
              Compare Vehicles
            </h1>
            <p className="text-xs sm:text-sm text-stone-600">
              Side-by-side technical evaluation across powertrain, dimensions, seating, performance, and price.
            </p>
          </div>

          {loading ? (
            <div className="py-24 flex flex-col items-center justify-center space-y-4">
              <div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin" />
              <p className="text-xs font-semibold text-stone-500">Loading fleet comparison data...</p>
            </div>
          ) : vehicles.length === 0 || !car1 || !car2 ? (
            <div className="bg-[#F4F4F6] rounded-3xl p-12 text-center text-stone-500 max-w-lg mx-auto">
              <p className="font-bold text-base text-gray-900 mb-1">Insufficient Fleet Data</p>
              <p className="text-xs text-stone-500">No vehicles available in the database for side-by-side comparison.</p>
            </div>
          ) : (
            <>
              {/* Selector Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-[#F4F4F6] p-6 rounded-2xl space-y-2">
                  <label className="text-xs font-bold text-gray-900">Select Vehicle A</label>
                  <select
                    className="w-full bg-white border border-[#E5E5E8] p-3 text-xs font-bold rounded-lg text-gray-900 focus:outline-none"
                    value={car1.id}
                    onChange={(e) => {
                      const found = vehicles.find((v) => v.id === e.target.value);
                      if (found) setCar1(found);
                    }}
                  >
                    {vehicles.map((v) => (
                      <option key={v.id} value={v.id}>
                        {v.name} ({formatCurrency(v.price)})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="bg-[#F4F4F6] p-6 rounded-2xl space-y-2">
                  <label className="text-xs font-bold text-gray-900">Select Vehicle B</label>
                  <select
                    className="w-full bg-white border border-[#E5E5E8] p-3 text-xs font-bold rounded-lg text-gray-900 focus:outline-none"
                    value={car2.id}
                    onChange={(e) => {
                      const found = vehicles.find((v) => v.id === e.target.value);
                      if (found) setCar2(found);
                    }}
                  >
                    {vehicles.map((v) => (
                      <option key={v.id} value={v.id}>
                        {v.name} ({formatCurrency(v.price)})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Comparison Matrix Table */}
              <div className="bg-[#F4F4F6] rounded-3xl p-6 sm:p-8 overflow-x-auto shadow-sm">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-[#E5E5E8]">
                      <th className="p-4 text-xs font-bold text-stone-500 w-1/4">Specification</th>
                      <th className="p-4 text-sm font-extrabold text-gray-900 w-3/8 text-center">{car1.name}</th>
                      <th className="p-4 text-sm font-extrabold text-gray-900 w-3/8 text-center">{car2.name}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E5E5E8] text-xs">
                    <tr>
                      <td className="p-4 font-bold text-stone-500">Visual</td>
                      <td className="p-4 text-center">
                        <div className="relative aspect-[16/10] w-52 mx-auto overflow-hidden">
                          <Image src={car1.images?.[0]?.url || '/images/hero-1.png'} alt={car1.name} fill className="object-contain" />
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        <div className="relative aspect-[16/10] w-52 mx-auto overflow-hidden">
                          <Image src={car2.images?.[0]?.url || '/images/hero-1.png'} alt={car2.name} fill className="object-contain" />
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="p-4 font-bold text-stone-500">Price</td>
                      <td className="p-4 text-center font-extrabold text-base text-gray-900">{formatCurrency(car1.price)}</td>
                      <td className="p-4 text-center font-extrabold text-base text-gray-900">{formatCurrency(car2.price)}</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-bold text-stone-500">Year</td>
                      <td className="p-4 text-center font-semibold">{car1.year}</td>
                      <td className="p-4 text-center font-semibold">{car2.year}</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-bold text-stone-500">Marque / Brand</td>
                      <td className="p-4 text-center font-semibold">{car1.brand?.name || 'N/A'}</td>
                      <td className="p-4 text-center font-semibold">{car2.brand?.name || 'N/A'}</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-bold text-stone-500">Body Style</td>
                      <td className="p-4 text-center font-semibold">{car1.category?.name || 'N/A'}</td>
                      <td className="p-4 text-center font-semibold">{car2.category?.name || 'N/A'}</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-bold text-stone-500">Fuel Type</td>
                      <td className="p-4 text-center font-semibold">{car1.fuelType}</td>
                      <td className="p-4 text-center font-semibold">{car2.fuelType}</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-bold text-stone-500">Transmission</td>
                      <td className="p-4 text-center font-semibold">{car1.transmission}</td>
                      <td className="p-4 text-center font-semibold">{car2.transmission}</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-bold text-stone-500">Horsepower</td>
                      <td className="p-4 text-center font-semibold">{car1.horsepower ? `${car1.horsepower} HP` : 'N/A'}</td>
                      <td className="p-4 text-center font-semibold">{car2.horsepower ? `${car2.horsepower} HP` : 'N/A'}</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-bold text-stone-500">Mileage</td>
                      <td className="p-4 text-center font-semibold">{formatMileage(car1.mileage)}</td>
                      <td className="p-4 text-center font-semibold">{formatMileage(car2.mileage)}</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-bold text-stone-500">Actions</td>
                      <td className="p-4 text-center">
                        <Link href={`/vehicles/${car1.slug}`}>
                          <button className="bg-[#FEE123] hover:bg-[#FDD835] text-black font-bold text-xs px-5 py-2.5 rounded-lg shadow-sm cursor-pointer">
                            View Vehicle
                          </button>
                        </Link>
                      </td>
                      <td className="p-4 text-center">
                        <Link href={`/vehicles/${car2.slug}`}>
                          <button className="bg-[#FEE123] hover:bg-[#FDD835] text-black font-bold text-xs px-5 py-2.5 rounded-lg shadow-sm cursor-pointer">
                            View Vehicle
                          </button>
                        </Link>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
