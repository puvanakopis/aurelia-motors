'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, Lock, Mail, AlertCircle, Compass } from 'lucide-react';
import { login } from '@/lib/api';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = React.useState('admin@carshowroom.local');
  const [password, setPassword] = React.useState('Admin@12345');
  const [error, setError] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const res = await login(email, password);
      if (res.user.role === 'CUSTOMER') {
        throw new Error('Access denied: Staff or Administrative privileges required.');
      }
      router.push('/admin');
    } catch (err: any) {
      setError(err.message || 'Authentication failed. Please verify credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F4F6] text-[#111215] flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#FEE123]/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="w-full max-w-md bg-white border border-[#E5E5E8] rounded-3xl p-8 sm:p-10 relative z-10 shadow-xl">
        {/* Header */}
        <div className="text-center space-y-2 mb-8">
          <div className="mx-auto w-14 h-14 rounded-full bg-[#FEE123] flex items-center justify-center text-black mb-4 shadow-sm">
            <Compass className="w-7 h-7 fill-black stroke-black" />
          </div>
          <span className="text-xs uppercase font-extrabold tracking-wider text-stone-500">
            AURELIA MOTORS
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#111215]">
            Executive Portal
          </h1>
          <p className="text-xs text-stone-500 max-w-xs mx-auto">
            Internal operations suite for fleet allocations, test drives & bespoke inquiries.
          </p>
        </div>

        {error && (
          <div className="mb-6 p-3.5 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-xs flex items-center gap-2.5">
            <AlertCircle className="h-4 w-4 shrink-0 text-rose-600" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-700">
              Staff Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@carshowroom.local"
                className="w-full bg-[#F4F4F6] focus:bg-white border border-[#E5E5E8] focus:border-black focus:ring-1 focus:ring-black rounded-xl px-4 py-3 pl-10 text-sm text-[#111215] transition-all outline-none"
              />
              <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-stone-400" />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-700">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-[#F4F4F6] focus:bg-white border border-[#E5E5E8] focus:border-black focus:ring-1 focus:ring-black rounded-xl px-4 py-3 pl-10 text-sm text-[#111215] transition-all outline-none"
              />
              <Lock className="absolute left-3.5 top-3.5 h-4 w-4 text-stone-400" />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 bg-[#FEE123] hover:bg-[#FDD835] active:bg-[#F5CB23] text-black font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 shadow-sm disabled:opacity-50 cursor-pointer"
            >
              {isLoading ? (
                <span>Authenticating...</span>
              ) : (
                <>
                  <span>ENTER MANAGEMENT SUITE</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </div>
        </form>

        <div className="mt-8 pt-6 border-t border-[#E5E5E8] text-center">
          <Link
            href="/"
            className="text-xs font-semibold text-stone-500 hover:text-black transition-colors"
          >
            ← Return to Public Showroom
          </Link>
        </div>
      </div>
    </div>
  );
}
