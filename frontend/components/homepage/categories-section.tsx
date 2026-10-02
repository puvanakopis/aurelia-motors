'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Category } from '@aurelia/types';

interface CategoriesSectionProps {
  categories: Category[];
}

export function CategoriesSection({ categories }: CategoriesSectionProps) {
  const fallbackCategories = [
    { id: '1', name: 'Sedans', slug: 'sedan', imageUrl: '/images/categories/sedan.jpg' },
    { id: '2', name: 'SUVs', slug: 'suv', imageUrl: '/images/categories/suv.jpg' },
    { id: '3', name: 'Sports', slug: 'sports', imageUrl: '/images/categories/sports.jpg' },
    { id: '4', name: 'Electric', slug: 'electric', imageUrl: '/images/categories/electric.jpg' },
  ];

  const displayCategories = categories.length > 0 ? categories : fallbackCategories;

  return (
    <section className="bg-white py-12 sm:py-16 text-foreground">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="mb-10">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            Our rental categories
          </h2>
        </div>

        {/* 4 Circular Category Cards Grid matching Image 4 */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {displayCategories.slice(0, 4).map((cat) => (
            <Link
              key={cat.id}
              href={`/vehicles?category=${cat.slug}`}
              className="group bg-[#F4F4F6] hover:bg-[#EFEFF2] rounded-3xl p-6 flex flex-col items-center justify-center transition-all duration-300 hover:shadow-md"
            >
              {/* Circular Avatar / Image */}
              <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-full overflow-hidden shadow-sm mb-4 border-2 border-white">
                <Image
                  src={cat.imageUrl || '/images/hero-1.png'}
                  alt={cat.name}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              <h3 className="text-sm sm:text-base font-bold text-gray-900 group-hover:text-black">
                {cat.name}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
