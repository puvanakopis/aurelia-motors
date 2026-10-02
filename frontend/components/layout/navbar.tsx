'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown, Compass } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface NavbarProps {
  onOpenTestDrive?: () => void;
}

export function Navbar({ onOpenTestDrive }: NavbarProps) {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const pathname = usePathname();

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Cars', href: '/vehicles' },
    { name: 'Offers', href: '/offers' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-40 transition-all duration-200 bg-white/95 backdrop-blur-md',
          isScrolled ? 'shadow-sm py-3' : 'py-5'
        )}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">
          {/* Brand Logo with Yellow Pin Icon */}
          <Link
            href="/"
            className="flex items-center gap-2.5 text-xl font-bold text-gray-900 tracking-tight"
          >
            <div className="w-8 h-8 rounded-full bg-[#FEE123] flex items-center justify-center text-black shadow-sm">
              <Compass className="w-4 h-4 fill-black stroke-black" />
            </div>
            <span className="font-extrabold text-gray-900 tracking-tight">Aurelia</span>
          </Link>

          {/* Desktop Capsule Pill Navigation */}
          <nav className="hidden md:flex items-center bg-[#141517] text-white rounded-full px-6 py-2.5 shadow-md">
            <div className="flex items-center space-x-6 text-xs font-medium">
              {navLinks.map((link) => {
                const isActive = pathname === link.href || (link.href === '/vehicles' && pathname.startsWith('/vehicles'));
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={cn(
                      'transition-colors hover:text-[#FEE123]',
                      isActive ? 'text-[#FEE123] font-semibold' : 'text-stone-300'
                    )}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* Right Action: CTA Button */}
          <div className="hidden lg:flex items-center gap-3">
            <Button
              variant="champagne"
              size="sm"
              onClick={() => {
                if (onOpenTestDrive) onOpenTestDrive();
                else {
                  const el = document.getElementById('test-drive');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="text-xs font-semibold px-5 py-2.5"
            >
              Book Drive
            </Button>
          </div>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-gray-900 md:hidden cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[#121316] text-white flex flex-col p-8 md:hidden">
          <div className="flex justify-between items-center pb-6 border-b border-white/10">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#FEE123] flex items-center justify-center text-black">
                <Compass className="w-4 h-4 fill-black stroke-black" />
              </div>
              <span className="font-bold text-lg">Aurelia</span>
            </div>
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
                className={cn(
                  'text-lg font-medium transition-colors',
                  pathname === link.href ? 'text-[#FEE123] font-bold' : 'text-neutral-200'
                )}
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/compare"
              onClick={() => setMobileMenuOpen(false)}
              className="text-lg font-medium text-neutral-200 hover:text-white"
            >
              Compare Cars
            </Link>
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="text-xs uppercase font-medium tracking-widest text-[#FEE123] pt-4"
            >
              → Admin Portal
            </Link>
          </div>

          <div className="mt-auto pt-6 border-t border-white/10 space-y-3">
            <Button
              variant="champagne"
              className="w-full text-xs font-bold"
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenTestDrive) onOpenTestDrive();
              }}
            >
              BOOK A TEST DRIVE
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
