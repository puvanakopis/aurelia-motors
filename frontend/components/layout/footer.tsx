import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-[#FAF9F6] text-[#111215] border-t border-[#E5E2DC] pt-14 pb-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12">
          {/* Brand Info */}
          <div className="md:col-span-6 space-y-3">
            <Link
              href="/"
              className="text-xs font-bold tracking-tracked-wide text-[#111215] uppercase inline-block font-display"
            >
              AURELIA MOTORS
            </Link>
            <p className="text-xs text-stone-500 max-w-sm leading-relaxed">
              A considered collection of vehicles for those who see driving as something more.
            </p>
          </div>

          {/* Navigation Column */}
          <div className="md:col-span-3 space-y-2.5">
            <p className="text-[10px] font-bold uppercase tracking-tracked text-stone-400">
              SHOWROOM
            </p>
            <ul className="space-y-2 text-xs text-stone-600">
              <li>
                <Link href="/vehicles" className="hover:text-black transition-colors">
                  Vehicles
                </Link>
              </li>
              <li>
                <Link href="/compare" className="hover:text-black transition-colors">
                  Compare
                </Link>
              </li>
              <li>
                <Link href="/brands" className="hover:text-black transition-colors">
                  Brands
                </Link>
              </li>
              <li>
                <Link href="/offers" className="hover:text-black transition-colors">
                  Offers
                </Link>
              </li>
            </ul>
          </div>

          {/* Salon & Connect Column */}
          <div className="md:col-span-3 space-y-2.5">
            <p className="text-[10px] font-bold uppercase tracking-tracked text-stone-400">
              CONNECT
            </p>
            <ul className="space-y-2 text-xs text-stone-600">
              <li>
                <Link href="/about" className="hover:text-black transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-black transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-black transition-colors text-stone-400">
                  Staff Login
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-[#EAE6DF] flex flex-col md:flex-row items-center justify-between text-[11px] text-stone-400 space-y-2 md:space-y-0">
          <p>© {new Date().getFullYear()} Aurelia Motors.</p>
          <p className="tracking-wide">
            Colombo · Jaffna · Batticaloa
          </p>
        </div>
      </div>
    </footer>
  );
}
