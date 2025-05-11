// src/components/pages/about/MissionVision.tsx
"use client";

import React from 'react';

/**
 * Mission and Vision section for the About page
 * Displays two cards with mission and vision information
 */
const MissionVision: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-white to-babyBlue-light/30 relative overflow-hidden">
      <div className="absolute right-0 bottom-0 w-96 h-96 bg-lavender/10 rounded-full blur-3xl"></div>
      <div className="container mx-auto px-6 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Mission Card */}
          <div className="bg-white p-8 rounded-xl shadow-lg border-l-4 border-babyBlue transform hover:-translate-y-2 transition-transform duration-300">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-babyBlue-light mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-babyBlue-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold uppercase mb-4 text-babyBlue-dark">MISI KAMI</h3>
            <h2 className="text-3xl font-bold mb-6 text-gray-900">
              Membangun Dampak Sosial yang Efektif
            </h2>
            <div className="space-y-4 text-gray-600">
              <div className="flex">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-babyBlue-light flex items-center justify-center mr-3">
                  <span className="font-bold text-babyBlue-dark">1</span>
                </div>
                <p>Mengidentifikasi dan menganalisis masalah-masalah sosial yang dihadapi oleh kelompok masyarakat yang rentan di Sulawesi Utara</p>
              </div>
              <div className="flex">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-babyBlue-light flex items-center justify-center mr-3">
                  <span className="font-bold text-babyBlue-dark">2</span>
                </div>
                <p>Merancang aksi respon terhadap masalah-masalah sosial yang ditemukan dalam proses identifikasi dan analisis</p>
              </div>
              <div className="flex">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-babyBlue-light flex items-center justify-center mr-3">
                  <span className="font-bold text-babyBlue-dark">3</span>
                </div>
                <p>Mempopulerkan aksi sosial yang efektif, bertanggungjawab, dan berlandaskan etika moral</p>
              </div>
            </div>
          </div>
          
          {/* Vision Card */}
          <div className="bg-white p-8 rounded-xl shadow-lg border-l-4 border-lavender transform hover:-translate-y-2 transition-transform duration-300">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-lavender-light mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-lavender-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold uppercase mb-4 text-lavender-dark">VISI KAMI</h3>
            <h2 className="text-3xl font-bold mb-6 text-gray-900">
              Menjadi Katalisator Dampak Sosial yang Efektif
            </h2>
            <div className="space-y-4">
              <p className="text-gray-600 border-l-2 border-lavender-light pl-4">
                Kami bercita-cita menjadi katalisator dampak sosial yang penuh arti dan efektif di Sulawesi Utara, dengan pendekatan berbasis data dan berlandaskan empati.
              </p>
              <p className="text-gray-600 border-l-2 border-lavender-light pl-4">
                &ldquo;Sitou timou tumou tou&rdquo; menjadi pendorong kami untuk percaya bahwa manusia diciptakan untuk hidup berdampingan dan saling membantu.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionVision;