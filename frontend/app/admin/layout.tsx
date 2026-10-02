'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  CalendarCheck,
  MessageSquareText,
  FileSpreadsheet,
  Car,
  Tag,
  Layers,
  Building2,
  Sparkles,
  LogOut,
  Menu,
  X,
  ExternalLink,
  Compass,
} from 'lucide-react';
import { getStoredUser, clearAuthSession, getProfile, getAuthToken } from '@/lib/api';
import { User } from '@/types';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const isLoginPage = pathname === '/admin/login';
  const [currentUser, setCurrentUser] = React.useState<User | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = React.useState(true);

  React.useEffect(() => {
    if (isLoginPage) {
      setIsCheckingAuth(false);
      return;
    }

    const token = getAuthToken();
    const stored = getStoredUser();

    if (!token) {
      router.push('/admin/login');
      return;
    }

    if (stored) {
      setCurrentUser(stored);
      setIsCheckingAuth(false);
    }

    // Refresh profile in background
    getProfile()
      .then((user) => {
        setCurrentUser(user);
        setIsCheckingAuth(false);
      })
      .catch(() => {
        clearAuthSession();
        router.push('/admin/login');
      });
  }, [pathname, isLoginPage, router]);

  const handleLogout = () => {
    clearAuthSession();
    router.push('/admin/login');
  };

  if (isLoginPage) {
    return <>{children}</>;
  }

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-[#F8F8FA] text-[#111215] flex flex-col items-center justify-center space-y-4">
        <div className="w-10 h-10 border-3 border-[#FEE123] border-t-black rounded-full animate-spin" />
        <p className="text-xs uppercase font-bold tracking-wider text-stone-500">
          Authenticating Aurelia Management Suite...
        </p>
      </div>
    );
  }

  const navItems = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Test Drives', href: '/admin/test-drives', icon: CalendarCheck },
    { name: 'Enquiries', href: '/admin/enquiries', icon: MessageSquareText },
    { name: 'Quotations', href: '/admin/quotations', icon: FileSpreadsheet },
    { name: 'Vehicles Fleet', href: '/admin/vehicles', icon: Car },
    { name: 'Brands & Marques', href: '/admin/brands', icon: Tag },
    { name: 'Body Styles', href: '/admin/categories', icon: Layers },
    { name: 'Showroom Salons', href: '/admin/branches', icon: Building2 },
    { name: 'Offers & Programs', href: '/admin/offers', icon: Sparkles },
  ];

  return (
    <div className="min-h-screen bg-[#F8F8FA] text-[#111215] flex flex-col md:flex-row">
      {/* Sidebar for Desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-[#121316] text-white shrink-0 border-r border-[#23252B] shadow-xl">
        {/* Brand Header */}
        <div className="p-6 border-b border-white/10">
          <Link href="/admin" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#FEE123] flex items-center justify-center text-black shadow-sm">
              <Compass className="w-4 h-4 fill-black stroke-black" />
            </div>
            <div>
              <span className="text-base font-extrabold tracking-tight text-white block">
                Aurelia
              </span>
              <span className="text-[10px] uppercase font-semibold tracking-wider text-[#FEE123] block -mt-0.5">
                Executive Portal
              </span>
            </div>
          </Link>
        </div>

        {/* Navigation links */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.href === '/admin'
                ? pathname === '/admin'
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                  isActive
                    ? 'bg-[#FEE123] text-black shadow-sm'
                    : 'text-stone-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <Icon
                  className={`h-4 w-4 shrink-0 ${
                    isActive ? 'text-black' : 'text-stone-400'
                  }`}
                />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* User Info & Footer */}
        <div className="p-4 border-t border-white/10 space-y-3 bg-[#16171B]">
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-2.5 overflow-hidden">
              <div className="w-8 h-8 rounded-full bg-[#FEE123]/20 border border-[#FEE123]/40 text-[#FEE123] flex items-center justify-center text-xs font-bold shrink-0">
                {currentUser?.firstName?.[0] || 'A'}
              </div>
              <div className="overflow-hidden">
                <p className="text-xs font-bold text-white truncate">
                  {currentUser?.firstName} {currentUser?.lastName}
                </p>
                <p className="text-[10px] text-stone-400 font-medium tracking-wide">
                  {currentUser?.role || 'ADMIN'}
                </p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              title="Sign Out"
              className="p-1.5 text-stone-400 hover:text-rose-400 hover:bg-white/5 rounded-lg transition-colors cursor-pointer"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>

          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-center gap-2 w-full py-2.5 bg-white/5 hover:bg-white/10 text-xs font-semibold tracking-wide text-stone-200 rounded-xl transition-colors border border-white/10"
          >
            <span>Public Showroom</span>
            <ExternalLink className="h-3.5 w-3.5 text-[#FEE123]" />
          </Link>
        </div>
      </aside>

      {/* Mobile Header */}
      <header className="md:hidden flex items-center justify-between p-4 bg-[#121316] text-white border-b border-white/10 sticky top-0 z-40">
        <Link href="/admin" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-[#FEE123] flex items-center justify-center text-black">
            <Compass className="w-3.5 h-3.5 fill-black stroke-black" />
          </div>
          <div>
            <span className="text-sm font-extrabold tracking-tight text-white block">
              Aurelia
            </span>
            <span className="text-[9px] uppercase font-bold tracking-wider text-[#FEE123] block -mt-0.5">
              Portal
            </span>
          </div>
        </Link>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 text-white hover:bg-white/10 rounded-lg cursor-pointer"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-[#121316]/98 p-6 flex flex-col space-y-4 text-white">
          <div className="flex justify-between items-center pb-4 border-b border-white/10">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-[#FEE123] flex items-center justify-center text-black">
                <Compass className="w-3.5 h-3.5 fill-black stroke-black" />
              </div>
              <span className="text-base font-extrabold">Aurelia Portal</span>
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-stone-400 hover:text-white rounded-lg cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <nav className="flex-1 space-y-1.5 overflow-y-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                item.href === '/admin'
                  ? pathname === '/admin'
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 p-3 rounded-xl text-sm font-semibold tracking-wide transition-all ${
                    isActive
                      ? 'bg-[#FEE123] text-black'
                      : 'text-stone-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icon className={`h-4 w-4 ${isActive ? 'text-black' : 'text-stone-400'}`} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
          <div className="pt-4 border-t border-white/10 space-y-2">
            <Link
              href="/"
              target="_blank"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-2.5 bg-white/10 text-white rounded-xl text-xs font-semibold"
            >
              <span>Public Showroom</span>
              <ExternalLink className="h-3.5 w-3.5 text-[#FEE123]" />
            </Link>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                handleLogout();
              }}
              className="w-full py-2.5 bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs font-semibold rounded-xl flex items-center justify-center gap-2 cursor-pointer"
            >
              <LogOut className="h-4 w-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-10">
        <div className="max-w-7xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
