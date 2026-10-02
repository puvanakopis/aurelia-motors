import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0D0E10] text-white flex flex-col items-center justify-center px-6 text-center">
      <p className="text-xs uppercase tracking-tracked-wide text-champagne mb-4">404 — Page Not Found</p>
      <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 font-display">
        LOST IN THE JOURNEY
      </h1>
      <p className="text-neutral-400 max-w-md mb-8 text-sm leading-relaxed">
        The destination you are looking for does not exist or has been relocated within the salon.
      </p>
      <Link href="/">
        <Button variant="champagne" size="md" className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" /> Return to Showroom
        </Button>
      </Link>
    </div>
  );
}
