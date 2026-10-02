'use client';

import * as React from 'react';
import Link from 'next/link';
import { Compass, Instagram, Facebook, Linkedin, Twitter } from 'lucide-react';

export function Footer() {
  const [email, setEmail] = React.useState('');
  const [subscribed, setSubscribed] = React.useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="w-full px-4 sm:px-8 pb-8 pt-4 bg-white">
      <div className="max-w-7xl mx-auto bg-[#121316] text-white rounded-3xl p-8 sm:p-12 lg:p-16 shadow-xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Left Column: Brand & Newsletter */}
          <div className="md:col-span-5 space-y-6">
            <Link href="/" className="flex items-center gap-2.5 text-xl font-bold text-white tracking-tight">
              <div className="w-8 h-8 rounded-full bg-[#FEE123] flex items-center justify-center text-black shadow-sm">
                <Compass className="w-4 h-4 fill-black stroke-black" />
              </div>
              <span className="font-extrabold tracking-tight">Aurelia</span>
            </Link>

            <div className="space-y-3 pt-2">
              <p className="text-sm font-semibold text-white">
                Subscribe to our newsletter
              </p>

              {subscribed ? (
                <div className="p-3 bg-white/10 text-[#FEE123] text-xs rounded-lg font-medium">
                  Thank you for subscribing to Aurelia concierge updates.
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 max-w-md">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 bg-[#202226] border border-transparent focus:border-[#FEE123] focus:outline-none text-white text-xs px-4 py-3 rounded-lg placeholder:text-stone-500"
                  />
                  <button
                    type="submit"
                    className="bg-[#FEE123] hover:bg-[#FDD835] text-black font-bold text-xs px-6 py-3 rounded-lg transition-colors cursor-pointer shrink-0"
                  >
                    Subscribe!
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Column 2: Pages */}
          <div className="md:col-span-2 md:col-start-7 space-y-4">
            <p className="text-sm font-bold text-white tracking-tight">Pages</p>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/vehicles" className="text-[#FEE123] font-semibold hover:underline">
                  Cars
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/offers" className="hover:text-white transition-colors">
                  Offers
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Utility Pages */}
          <div className="md:col-span-3 space-y-4">
            <p className="text-sm font-bold text-white tracking-tight">Utility Pages</p>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li>
                <Link href="/compare" className="hover:text-white transition-colors">
                  Vehicle Comparison
                </Link>
              </li>
              <li>
                <Link href="/brands" className="hover:text-white transition-colors">
                  Marques & Brands
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  Salon Standards
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-[#FEE123] transition-colors text-stone-300">
                  Concierge Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Quick Links */}
          <div className="md:col-span-2 space-y-4">
            <p className="text-sm font-bold text-white tracking-tight">Locations</p>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li>Colombo Atelier</li>
              <li>Jaffna Pavilion</li>
              <li>Batticaloa Salon</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Socials */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <p>
            Designed with excellence. Powered by{' '}
            <span className="text-[#FEE123] font-semibold underline">Aurelia Motors</span>
          </p>

          <div className="flex items-center space-x-4 text-stone-400">
            <a href="#" className="hover:text-[#FEE123] transition-colors" aria-label="Facebook">
              <Facebook className="w-4 h-4" />
            </a>
            <a href="#" className="hover:text-[#FEE123] transition-colors" aria-label="Instagram">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="#" className="hover:text-[#FEE123] transition-colors" aria-label="LinkedIn">
              <Linkedin className="w-4 h-4" />
            </a>
            <a href="#" className="hover:text-[#FEE123] transition-colors" aria-label="Twitter">
              <Twitter className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
