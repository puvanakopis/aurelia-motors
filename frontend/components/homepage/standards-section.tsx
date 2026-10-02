'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Star, CheckCircle, Car, Calendar, Key } from 'lucide-react';

export function StandardsSection() {
  const steps = [
    {
      num: '1',
      title: 'Choose your car',
      desc: 'Browse our authenticated fleet and select the vehicle tailored to your exact journey.',
      icon: Car,
    },
    {
      num: '2',
      title: 'Book online',
      desc: 'Reserve a priority test drive or arrange acquisition terms in minutes with zero paperwork delays.',
      icon: Calendar,
    },
    {
      num: '3',
      title: 'Pick up & drive',
      desc: 'Collect your vehicle at our architectural salon or enjoy white-glove enclosed transporter delivery.',
      icon: Key,
    },
  ];

  const feedbacks = [
    {
      id: '1',
      title: 'Perfect car for my business trip!',
      text: 'Aurelia Motors provided a brand new BMW X5. The booking process was seamless and the concierge service was top notch.',
      author: 'Mark Stevenson',
      role: 'Executive Director',
      avatar: '/images/about/team-1.jpg',
    },
    {
      id: '2',
      title: 'Convenient and affordable',
      text: 'I loved how straightforward everything was! The car was spotless, the rate was competitive, and the drop-off was effortless.',
      author: 'Emma Watson',
      role: 'Private Client',
      avatar: '/images/about/team-2.jpg',
    },
    {
      id: '3',
      title: 'Unmatched supercar performance',
      text: 'The Porsche 911 Carrera S was in pristine factory condition. Pure acoustic ecstasy and world-class customer treatment.',
      author: 'Sarah Jenkins',
      role: 'Motorsport Enthusiast',
      avatar: '/images/about/team-3.jpg',
    },
    {
      id: '4',
      title: 'Flawless wedding transport',
      text: 'Arranged the S-Class for our special day. The chauffeur was punctual, courteous, and the vehicle was immaculately prepped.',
      author: 'David Chen',
      role: 'Wedding Patron',
      avatar: '/images/about/team-4.jpg',
    },
    {
      id: '5',
      title: 'Exceeded all expectations',
      text: 'Smooth acceleration, pristine interior, and transparent lease terms. Will definitely return for all our executive allocations.',
      author: 'Elena Rostova',
      role: 'Corporate Fleet Lead',
      avatar: '/images/about/team-1.jpg',
    },
    {
      id: '6',
      title: 'Best luxury salon experience',
      text: 'From the initial inquiry to handover ceremony, everything felt bespoke, modern, and trustworthy. Highly recommended!',
      author: 'Marcus Vance',
      role: 'Architectural Partner',
      avatar: '/images/about/team-2.jpg',
    },
  ];

  return (
    <div className="bg-white space-y-20 py-12 sm:py-16">
      {/* 1. "Rent your car in 3 easy steps" Banner matching Image 4 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left Image Box */}
          <div className="lg:col-span-6 relative min-h-[360px] lg:min-h-[460px] rounded-3xl overflow-hidden shadow-md">
            <Image
              src="/images/drive-open-road.jpg"
              alt="Drive on open road"
              fill
              className="object-cover"
            />
          </div>

          {/* Right Dark Container */}
          <div className="lg:col-span-6 bg-[#121316] text-white rounded-3xl p-8 sm:p-12 lg:p-14 flex flex-col justify-center space-y-8 shadow-xl">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-snug">
              Rent your car in 3 easy steps
            </h2>

            <div className="space-y-6">
              {steps.map((step) => (
                <div key={step.num} className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-full bg-[#FEE123] text-black font-extrabold flex items-center justify-center shrink-0 shadow-sm text-sm">
                    {step.num}
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-base font-bold text-white">{step.title}</h3>
                    <p className="text-xs text-stone-400 leading-relaxed max-w-md">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2. "Feedback from satisfied renters" Grid matching Image 4 */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center max-w-xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            Feedback from satisfied renters
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {feedbacks.map((item) => (
            <div
              key={item.id}
              className="bg-[#F4F4F6] rounded-2xl p-6 sm:p-7 flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow"
            >
              {/* Stars */}
              <div className="space-y-2">
                <div className="flex items-center gap-1 text-[#FEE123]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#FEE123] stroke-[#FEE123]" />
                  ))}
                </div>
                <h3 className="text-sm font-bold text-gray-900">{item.title}</h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  &quot;{item.text}&quot;
                </p>
              </div>

              {/* Author */}
              <div className="flex items-center gap-3 pt-3 border-t border-[#E5E5E8]">
                <div className="w-9 h-9 rounded-full bg-stone-300 overflow-hidden relative">
                  <Image
                    src={item.avatar}
                    alt={item.author}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-900">{item.author}</p>
                  <p className="text-[10px] text-stone-500">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. "Driving excellence in car rental services" Banner matching Image 4 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Text & Stats */}
          <div className="lg:col-span-6 space-y-6 px-2">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">
              Driving excellence in car rental services
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed max-w-lg">
              At Aurelia Motors, our fleet of hand-selected vehicles pairs bespoke financial structures with verified mechanical provenance to ensure every journey is elevated.
            </p>

            <Link href="/vehicles" className="inline-block">
              <button className="bg-[#FEE123] hover:bg-[#FDD835] text-black font-bold text-xs px-6 py-3 rounded-lg inline-flex items-center gap-3 transition-transform active:scale-95 shadow-sm cursor-pointer">
                <span>See available fleet</span>
                <span className="w-4 h-4 bg-black text-white rounded-sm flex items-center justify-center text-[10px] font-bold">
                  →
                </span>
              </button>
            </Link>

            {/* 2 Stats */}
            <div className="grid grid-cols-2 gap-6 pt-4 border-t border-[#E5E5E8]">
              <div>
                <span className="text-3xl sm:text-4xl font-extrabold text-gray-900 block">5K+</span>
                <span className="text-xs text-stone-500">Satisfied client handovers worldwide</span>
              </div>
              <div>
                <span className="text-3xl sm:text-4xl font-extrabold text-gray-900 block">99%</span>
                <span className="text-xs text-stone-500">Verified mechanical health score</span>
              </div>
            </div>
          </div>

          {/* Right Sports Car Image */}
          <div className="lg:col-span-6 relative aspect-[4/3] rounded-3xl overflow-hidden shadow-xl">
            <Image
              src="/images/supercar-performance.jpg"
              alt="High performance car"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
