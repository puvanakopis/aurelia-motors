import * as React from 'react';

export function StandardsSection() {
  const standards = [
    {
      num: '01',
      title: 'Curated Inventory',
      desc: 'Every vehicle is selected with purpose.',
    },
    {
      num: '02',
      title: 'Verified Quality',
      desc: 'Confidence in every vehicle.',
    },
    {
      num: '03',
      title: 'Transparent Pricing',
      desc: 'Clear pricing without unnecessary complexity.',
    },
    {
      num: '04',
      title: 'Personal Service',
      desc: 'A buying experience designed around you.',
    },
  ];

  return (
    <section className="bg-[#FAF9F6] py-24 md:py-32 text-foreground border-t border-[#EAE6DF]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Heading */}
          <div className="lg:col-span-5 space-y-4">
            <p className="sub-header-label">03 — OUR STANDARD</p>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground uppercase leading-[1.05]">
              MORE THAN
              <br />
              A SHOWROOM.
            </h2>
          </div>

          {/* Right Column: Numbered List */}
          <div className="lg:col-span-7">
            <div className="divide-y divide-[#E5E2DC]">
              {standards.map((item) => (
                <div
                  key={item.num}
                  className="py-8 first:pt-0 last:pb-0 grid grid-cols-12 gap-6 items-baseline"
                >
                  <span className="col-span-2 text-xs font-semibold tracking-tracked text-stone-400">
                    {item.num}
                  </span>
                  <div className="col-span-10 space-y-1">
                    <h3 className="text-base md:text-lg font-semibold text-foreground tracking-tight">
                      {item.title}
                    </h3>
                    <p className="text-xs md:text-sm text-stone-500 font-normal">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
