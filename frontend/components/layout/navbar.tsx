'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, Menu, X, PhoneCall } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface NavbarProps {
  onOpenTestDrive?: () => void;
  favoritesCount?: number;
}

export function Navbar({ onOpenTestDrive, favoritesCount = 0 }: NavbarProps) {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const pathname = usePathname();
  const isHomepage = pathname === '/';

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'VEHICLES', href: '/vehicles' },
    { name: 'COMPARE', href: '/compare' },
    { name: 'TEST DRIVE', href: '#test-drive', isAction: true },
    { name: 'BRANDS', href: '/brands' },
    { name: 'OFFERS', href: '/offers' },
    { name: 'ABOUT', href: '/about' },
  ];

  const headerBgClass = isHomepage
    ? isScrolled
      ? 'bg-[#0D0E10]/95 backdrop-blur-md border-b border-white/10 text-white shadow-xl'
      : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent text-white'
    : 'bg-[#0D0E10] text-white border-b border-white/10';

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-40 transition-all duration-300',
          headerBgClass
        )}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
          {/* Brand Logo */}
          <Link
            href="/"
            className="text-sm md:text-base font-bold tracking-tracked-wide text-white transition-opacity hover:opacity-80 uppercase"
          >
            AURELIA MOTORS
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => {
              if (link.isAction) {
                return (
                  <button
                    key={link.name}
                    onClick={() => {
                      if (onOpenTestDrive) onOpenTestDrive();
                      else {
                        const el = document.getElementById('test-drive');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="text-xs uppercase font-medium tracking-tracked text-neutral-300 hover:text-white transition-colors cursor-pointer"
                  >
                    {link.name}
                  </button>
                );
              }
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    'text-xs uppercase font-medium tracking-tracked transition-colors',
                    isActive
                      ? 'text-white font-semibold'
                      : 'text-neutral-300 hover:text-white'
                  )}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Stack */}
          <div className="flex items-center space-x-4 md:space-x-6">
            {/* Search link */}
            <Link
              href="/vehicles"
              aria-label="Search showroom"
              className="p-2 text-neutral-300 hover:text-white transition-colors"
            >
              <Search className="h-4 w-4" />
            </Link>

            {/* Book Test Drive Button (matches reference image header) */}
            <Button
              variant="dark"
              size="sm"
              onClick={() => {
                if (onOpenTestDrive) onOpenTestDrive();
                else {
                  const el = document.getElementById('test-drive');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="hidden lg:inline-flex bg-black/80 hover:bg-neutral-900 border border-neutral-700 text-white font-semibold text-[11px] tracking-tracked"
            >
              BOOK A TEST DRIVE
            </Button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-white md:hidden"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 text-white flex flex-col p-8 md:hidden">
          <div className="flex justify-between items-center pb-6 hairline-b">
            <span className="text-sm font-bold tracking-tracked-wide uppercase">
              AURELIA MOTORS
            </span>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-neutral-400 hover:text-white"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="flex flex-col space-y-6 py-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg font-medium tracking-tracked text-neutral-200 hover:text-white uppercase"
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/account"
              onClick={() => setMobileMenuOpen(false)}
              className="text-lg font-medium tracking-tracked text-neutral-200 hover:text-white uppercase"
            >
              MY ACCOUNT
            </Link>
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="text-xs uppercase font-medium tracking-widest text-champagne pt-4"
            >
              → Admin Portal
            </Link>
          </div>

          <div className="mt-auto pt-6 hairline-t space-y-3">
            <Button
              variant="champagne"
              className="w-full"
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenTestDrive) onOpenTestDrive();
              }}
            >
              BOOK A TEST DRIVE
            </Button>
            <a
              href="tel:+94112589000"
              className="flex items-center justify-center gap-2 text-xs uppercase tracking-tracked text-neutral-400 py-2"
            >
              <PhoneCall className="h-3.5 w-3.5" /> Call Showroom Concierge
            </a>
          </div>
        </div>
      )}
    </>
  );
}
