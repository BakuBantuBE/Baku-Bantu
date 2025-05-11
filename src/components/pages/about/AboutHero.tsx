// src/components/pages/about/AboutHero.tsx
"use client";

import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';

/**
 * Hero section for the About page
 * Displays a gradient background with a heading and a card with text
 */
const AboutHero: React.FC = () => {
  return (
    <section className="relative py-24 bg-gradient-to-br from-babyBlue-light/30 to-lavender-light/30 overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-mango-light/20 rounded-full -mr-32 -mt-32 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-poppy-light/10 rounded-full -ml-48 -mb-48 blur-3xl"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-8 items-start">
          <div>
            <div className="flex items-center mb-6">
              <div className="w-12 h-px bg-poppy mr-4"></div>
              <p className="text-sm uppercase tracking-wider font-semibold text-poppy-dark">TENTANG KAMI</p>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 leading-tight">
              Kami adalah organisasi <span className="text-babyBlue-dark">non-pemerintah</span> yang fokus pada <span className="text-poppy">komunitas</span>
            </h1>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-lg border border-gray-100">
            <h2 className="text-xl font-semibold mb-3 text-forest-dark">Kami membantu menghubungkan sumber daya dengan mereka yang membutuhkan</h2>
            <p className="text-gray-600 mb-4">
              BakuBantu hadir untuk menjembatani kepedulian masyarakat dengan kebutuhan nyata di lapangan. Kami percaya pada kekuatan kolaborasi dan gotong royong untuk menciptakan dampak positif yang berkelanjutan di Sulawesi Utara.
            </p>
            <div className="mt-8">
              <Button 
                variant="primary" 
                leftIcon={
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                }
              >
                Tonton Video Kami
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;