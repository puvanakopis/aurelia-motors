'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  Car,
  CalendarCheck,
  MessageSquareText,
  FileSpreadsheet,
  TrendingUp,
  Clock,
  ArrowUpRight,
  ShieldAlert,
  Building2,
  Plus,
  Sparkles,
} from 'lucide-react';
import { getDashboardStats, DashboardStats } from '@/lib/api';
import { formatCurrency } from '@/lib/utils';

export default function AdminDashboardPage() {
  const [stats, setStats] = React.useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    getDashboardStats()
      .then((data) => {
        setStats(data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message || 'Failed to load dashboard metrics');
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <div className="space-y-8 animate-pulse">
        <div className="h-10 bg-stone-200 rounded-xl w-64" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-36 bg-white rounded-2xl border border-stone-200" />
          ))}
        </div>
      </div>
    );
  }

  if (error || !stats) {
    return (
      <div className="p-6 bg-rose-50 border border-rose-200 text-rose-700 rounded-2xl shadow-sm">
        <p className="font-bold text-sm">Dashboard Error</p>
        <p className="text-xs mt-1 text-rose-600">{error || 'Unable to retrieve statistics.'}</p>
      </div>
    );
  }

  const { metrics, recentTestDrives, recentEnquiries } = stats;

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="bg-white rounded-2xl border border-[#E5E5E8] p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFF8D6] text-stone-900 border border-[#FEE123] text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-black" />
            <span>Executive Overview</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#111215]">
            Concierge & Fleet Management
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            Real-time status of showroom inventory, client appointments and bespoke inquiries.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/admin/vehicles"
            className="px-4 py-2.5 bg-[#FEE123] hover:bg-[#FDD835] active:bg-[#F5CB23] text-black font-bold text-xs uppercase tracking-wide rounded-xl transition-all shadow-sm flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            <span>Add Vehicle</span>
          </Link>
          <Link
            href="/admin/test-drives"
            className="px-4 py-2.5 bg-[#121316] hover:bg-black text-white font-semibold text-xs uppercase tracking-wide rounded-xl transition-all shadow-sm flex items-center gap-2"
          >
            <CalendarCheck className="h-4 w-4 text-[#FEE123]" />
            <span>Appointments</span>
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Pending Test Drives */}
        <div className="bg-white rounded-2xl border border-[#E5E5E8] p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
              Pending Test Drives
            </span>
            <div className="w-9 h-9 rounded-xl bg-[#FFF8D6] flex items-center justify-center text-black border border-[#FEE123]">
              <CalendarCheck className="h-4 w-4" />
            </div>
          </div>
          <div className="my-4">
            <p className="text-3xl sm:text-4xl font-extrabold text-[#111215] tracking-tight">
              {metrics.pendingTestDrives}
            </p>
          </div>
          <div className="flex items-center justify-between text-xs text-stone-500 pt-3 border-t border-[#E5E5E8]">
            <span>Total bookings</span>
            <span className="font-bold text-stone-900">{metrics.totalTestDrives}</span>
          </div>
        </div>

        {/* New Enquiries */}
        <div className="bg-white rounded-2xl border border-[#E5E5E8] p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
              New Inquiries
            </span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 border border-emerald-200">
              <MessageSquareText className="h-4 w-4" />
            </div>
          </div>
          <div className="my-4">
            <p className="text-3xl sm:text-4xl font-extrabold text-[#111215] tracking-tight">
              {metrics.newEnquiries}
            </p>
          </div>
          <div className="flex items-center justify-between text-xs text-stone-500 pt-3 border-t border-[#E5E5E8]">
            <span>Total received</span>
            <span className="font-bold text-stone-900">{metrics.totalEnquiries}</span>
          </div>
        </div>

        {/* Available Allocations */}
        <div className="bg-white rounded-2xl border border-[#E5E5E8] p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
              Active Inventory
            </span>
            <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 border border-blue-200">
              <Car className="h-4 w-4" />
            </div>
          </div>
          <div className="my-4">
            <p className="text-3xl sm:text-4xl font-extrabold text-[#111215] tracking-tight">
              {metrics.availableVehicles}
            </p>
          </div>
          <div className="flex items-center justify-between text-xs text-stone-500 pt-3 border-t border-[#E5E5E8]">
            <span>Total fleet listings</span>
            <span className="font-bold text-stone-900">{metrics.totalVehicles}</span>
          </div>
        </div>

        {/* Total Inventory Valuation */}
        <div className="bg-white rounded-2xl border border-[#E5E5E8] p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
              Fleet Valuation
            </span>
            <div className="w-9 h-9 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600 border border-purple-200">
              <TrendingUp className="h-4 w-4" />
            </div>
          </div>
          <div className="my-4">
            <p className="text-2xl sm:text-3xl font-extrabold text-[#111215] tracking-tight">
              {formatCurrency(metrics.totalInventoryValue)}
            </p>
          </div>
          <div className="flex items-center justify-between text-xs text-stone-500 pt-3 border-t border-[#E5E5E8]">
            <span>Average listing</span>
            <span className="font-bold text-stone-900">
              {formatCurrency(metrics.averageVehiclePrice)}
            </span>
          </div>
        </div>
      </div>

      {/* Two Column Section: Recent Test Drives & Recent Inquiries */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Recent Test Drive Bookings (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-[#E5E5E8] p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-[#E5E5E8]">
            <div>
              <h2 className="text-base font-extrabold text-[#111215]">
                Recent Test Drive Appointments
              </h2>
              <p className="text-xs text-stone-500 mt-0.5">
                Client reservations across all showroom salons
              </p>
            </div>
            <Link
              href="/admin/test-drives"
              className="text-xs font-bold text-stone-900 hover:text-black flex items-center gap-1 bg-[#F4F4F6] hover:bg-[#E5E5E8] px-3 py-1.5 rounded-full transition-colors"
            >
              <span>View All</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {recentTestDrives.length > 0 ? (
              recentTestDrives.map((td) => (
                <div
                  key={td.id}
                  className="p-4 bg-[#F8F8FA] hover:bg-[#F4F4F6] border border-[#E5E5E8] rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors"
                >
                  <div className="space-y-1">
                    <p className="text-sm font-bold text-[#111215]">
                      {td.name}
                    </p>
                    <p className="text-xs font-semibold text-stone-700">
                      {td.vehicle?.name || 'Vehicle reservation'}
                    </p>
                    <p className="text-[11px] text-stone-500">
                      {td.branch?.name} · {td.preferredDate} at {td.preferredTime}
                    </p>
                  </div>

                  <div>
                    <span
                      className={`inline-block px-3 py-1 text-xs font-bold rounded-full ${
                        td.status === 'PENDING'
                          ? 'bg-[#FFF8D6] text-stone-900 border border-[#FEE123]'
                          : td.status === 'CONFIRMED'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : td.status === 'COMPLETED'
                          ? 'bg-blue-50 text-blue-700 border border-blue-200'
                          : 'bg-stone-100 text-stone-600 border border-stone-200'
                      }`}
                    >
                      {td.status}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-xs text-stone-500 py-8 text-center">
                No recent test drive appointments.
              </p>
            )}
          </div>
        </div>

        {/* Recent Client Enquiries (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-[#E5E5E8] p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-[#E5E5E8]">
            <div>
              <h2 className="text-base font-extrabold text-[#111215]">
                Client Inquiries
              </h2>
              <p className="text-xs text-stone-500 mt-0.5">
                Direct messages to Concierge desk
              </p>
            </div>
            <Link
              href="/admin/enquiries"
              className="text-xs font-bold text-stone-900 hover:text-black flex items-center gap-1 bg-[#F4F4F6] hover:bg-[#E5E5E8] px-3 py-1.5 rounded-full transition-colors"
            >
              <span>View All</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {recentEnquiries.length > 0 ? (
              recentEnquiries.map((enq) => (
                <div
                  key={enq.id}
                  className="p-4 bg-[#F8F8FA] hover:bg-[#F4F4F6] border border-[#E5E5E8] rounded-xl space-y-2 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#111215]">
                      {enq.name}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                        enq.status === 'NEW'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-stone-100 text-stone-600 border border-stone-200'
                      }`}
                    >
                      {enq.status}
                    </span>
                  </div>
                  <p className="text-xs text-stone-600 line-clamp-2 italic">
                    &quot;{enq.message}&quot;
                  </p>
                  <div className="text-[11px] text-stone-400 flex justify-between pt-1 border-t border-stone-100">
                    <span>{enq.phone || enq.email}</span>
                    <span>{new Date(enq.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-xs text-stone-500 py-8 text-center">
                No recent inquiries.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
