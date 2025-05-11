// src/components/pages/about/VideoSection.tsx
"use client";

import React from 'react';
import Image from 'next/image';

/**
 * Video showcase section for the About page
 * Displays a video thumbnail with play button and description
 */
const VideoSection: React.FC = () => {
  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="absolute left-0 top-1/4 w-64 h-64 bg-mango/10 rounded-full blur-3xl"></div>
      <div className="absolute right-0 bottom-1/4 w-64 h-64 bg-babyBlue/10 rounded-full blur-3xl"></div>
      <div className="container mx-auto px-6 relative">
        <div className="relative rounded-2xl overflow-hidden shadow-xl">
          <div className="aspect-w-16 aspect-h-9 h-[500px]">
            <Image 
              src="/images/cta-background.jpeg" 
              alt="Misi kami dalam aksi"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40 flex items-center justify-center">
              <button 
                className="group w-24 h-24 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-all duration-300 transform hover:scale-110"
                aria-label="Putar video"
              >
                <div className="w-20 h-20 rounded-full bg-poppy flex items-center justify-center group-hover:bg-poppy-dark transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                </div>
              </button>
            </div>
          </div>
        </div>
        <div className="max-w-3xl mx-auto text-center mt-12">
          <div className="inline-block mb-4">
            <div className="flex items-center justify-center">
              <div className="w-12 h-px bg-mango mr-4"></div>
              <h2 className="text-3xl font-bold text-gray-900">Cerita Kami</h2>
              <div className="w-12 h-px bg-mango ml-4"></div>
            </div>
          </div>
          <p className="text-gray-600 text-lg">
            Pada tahun 2024, Baku Bantu memulai proyek pertama yaitu melakukan Survei Kebutuhan Panti di Kota Tomohon, Kabupaten Minahasa, dan Kabupaten Minahasa Selatan. Survei dilakukan oleh tim berisikan 16 relawan dari berbagai komunitas.
          </p>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;