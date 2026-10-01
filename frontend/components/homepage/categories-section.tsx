'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Category } from '@aurelia/types';

interface CategoriesSectionProps {
  categories: Category[];
}

export function CategoriesSection({ categories }: CategoriesSectionProps) {
  return (
    <section className="bg-[#FAF9F6] py-20 md:py-28 text-foreground border-t border-[#EAE6DF]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="mb-12">
          <p className="sub-header-label mb-2">02 — BROWSE</p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground uppercase">
            FIND YOUR DRIVE
          </h2>
        </div>

        {/* 2x2 Grid of Category Tiles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/vehicles?category=${cat.slug}`}
              className="group relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden bg-stone-900 block"
            >
              {/* Category Background Image */}
              {cat.imageUrl && (
                <Image
                  src={cat.imageUrl}
                  alt={cat.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              )}

              {/* Dark Gradient Overlay for Readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

              {/* Category Info Overlay at Bottom Left */}
              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between text-white">
                <div className="space-y-1">
                  <h3 className="text-xl md:text-2xl font-bold uppercase tracking-tight text-white">
                    {cat.name}
                  </h3>
                  {cat.description && (
                    <p className="text-xs text-neutral-300 font-normal">
                      {cat.description}
                    </p>
                  )}
                </div>

                <div className="h-8 w-8 rounded-full bg-white/10 group-hover:bg-white text-white group-hover:text-black flex items-center justify-center transition-colors">
                  <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
