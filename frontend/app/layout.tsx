import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Aurelia Motors | Curated Luxury Automotive Salon',
  description:
    'A considered collection of exceptional vehicles, selected for those who expect more from every journey.',
  keywords: ['luxury cars', 'BMW', 'Porsche', 'Mercedes-Benz', 'Audi', 'Tesla', 'exotic car showroom'],
  authors: [{ name: 'Aurelia Motors' }],
  openGraph: {
    title: 'Aurelia Motors | Curated Luxury Automotive Salon',
    description: 'A considered collection of vehicles for those who see driving as something more.',
    siteName: 'Aurelia Motors',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="min-h-screen bg-background text-foreground font-sans antialiased selection:bg-stone-900 selection:text-[#FAF9F6]">
        {children}
      </body>
    </html>
  );
}
