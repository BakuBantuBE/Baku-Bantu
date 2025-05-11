// src/components/pages/about/SponsorsSection.tsx
"use client";

import React from 'react';
import Image from 'next/image';

/**
 * Sponsors section for the About page
 * Displays a grid of sponsor logos with animation effects
 */
const SponsorsSection: React.FC = () => {
  // Array of sponsor numbers for generating the grid
  const sponsorNumbers = [1, 2, 3, 4, 5, 6];
  
  return (
    <section className="py-16 bg-gradient-to-br from-white to-lavender-light/20 relative overflow-hidden">
      <div className="absolute left-0 bottom-0 w-72 h-72 bg-mango/10 rounded-full blur-3xl"></div>
      <div className="container mx-auto px-6 relative">
        <div className="text-center mb-10">
          <h3 className="text-xl font-semibold text-lavender-dark">PENDUKUNG KAMI</h3>
          <div className="w-24 h-1 bg-gradient-to-r from-lavender-light to-lavender-dark mx-auto mt-3"></div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
          {sponsorNumbers.map((i) => (
            <div key={i} className="flex justify-center transform transition-transform duration-300 hover:scale-110">
              <Image 
                src={`/images/sponsors/logo${i}.svg`} 
                alt={`Sponsor ${i}`}
                width={120}
                height={60}
                className="h-12 w-auto opacity-60 grayscale hover:opacity-100 hover:grayscale-0 transition-all"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SponsorsSection;