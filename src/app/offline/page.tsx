// src/app/offline/page.tsx
"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Header, Footer } from '@/components/common';
import { Button } from '@/components/ui/Button';

const OfflinePage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <section className="relative min-h-[70vh] flex items-center py-16 lg:py-0 overflow-hidden bg-gradient-to-b from-gray-50 to-white">
          {/* Background decorative elements */}
          <div className="absolute inset-0 overflow-hidden -z-10">
            <div className="absolute top-0 -right-80 w-[800px] h-[800px] bg-babyBlue/5 rounded-full"></div>
            <div className="absolute top-40 -left-40 w-[600px] h-[600px] bg-poppy/5 rounded-full"></div>
            <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-lavender/5 rounded-full"></div>
            <div className="absolute -bottom-20 left-[20%] w-[200px] h-[200px] bg-forest/5 rounded-full"></div>
          </div>

          <div className="container mx-auto px-6 relative">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left content */}
              <div className="lg:pr-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-1 bg-poppy rounded-full mr-4"></div>
                  <p className="text-sm uppercase tracking-wider font-semibold text-poppy">TIDAK ADA KONEKSI INTERNET</p>
                </div>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-babyBlue-dark via-poppy to-forest">
                  Anda <span className="text-gray-900">Sedang</span><br className="hidden md:block" /> Offline
                </h1>
                
                <p className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed">
                  Sepertinya Anda sedang tidak terhubung ke internet. Sebagian fitur mungkin tidak tersedia sampai koneksi Anda pulih.
                </p>
                
                <div className="flex flex-col sm:flex-row flex-wrap gap-4">
                  <Button 
                    variant="primary" 
                    size="lg" 
                    className="shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 bg-gradient-to-r from-babyBlue to-babyBlue-dark"
                    onClick={() => window.location.reload()}
                  >
                    Coba Lagi
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                    </svg>
                  </Button>
                </div>

                <div className="mt-10 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <h3 className="text-lg font-semibold mb-2">Mengapa ini terjadi?</h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-2">
                    <li>Koneksi internet Anda terputus</li>
                    <li>Server mungkin sedang mengalami gangguan</li>
                    <li>Anda mungkin berada di area dengan sinyal lemah</li>
                  </ul>
                </div>
              </div>
              
              {/* Right content - Offline illustration */}
              <div className="relative flex justify-center items-center">
                <div className="relative w-full max-w-md">
                  <div className="relative h-80 w-80 mx-auto">
                    <svg className="w-full h-full" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="100" cy="100" r="80" fill="#C1DBF2" opacity="0.5" />
                      <path d="M70,120 Q100,140 130,120" fill="none" stroke="#1A9562" strokeWidth="4" strokeLinecap="round" />
                      <circle cx="70" cy="80" r="8" fill="#9FC4E8" />
                      <circle cx="130" cy="80" r="8" fill="#9FC4E8" />
                      <g transform="translate(100, 40)">
                        <path d="M0,0 L0,20 M-10,10 L10,10" stroke="#EE5A36" strokeWidth="6" strokeLinecap="round" />
                      </g>
                      <g transform="translate(100, 140)">
                        <path d="M-30,-15 L30,15 M-30,15 L30,-15" stroke="#F5AB54" strokeWidth="4" strokeLinecap="round" strokeDasharray="3 3" />
                      </g>
                    </svg>
                  </div>
                  
                  {/* Decorative circles */}
                  <div className="absolute top-0 -left-10 w-20 h-20 bg-poppy/10 rounded-full"></div>
                  <div className="absolute bottom-10 -right-10 w-32 h-32 bg-babyBlue/10 rounded-full"></div>
                  <div className="absolute top-20 right-0 w-16 h-16 bg-forest/10 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <div className="max-w-xl mx-auto bg-white rounded-xl p-6 shadow-md">
              <h2 className="text-2xl font-bold mb-4 text-center">Konten yang Tersedia Offline</h2>
              <p className="text-gray-600 mb-6 text-center">
                Beberapa konten telah disimpan untuk akses offline. Anda masih dapat menjelajahi halaman-halaman berikut:
              </p>
              
              <div className="space-y-3">
                <div className="p-3 bg-gray-50 rounded-lg flex items-center">
                  <div className="w-8 h-8 rounded-full bg-babyBlue-light/50 flex items-center justify-center mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-babyBlue-dark" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                    </svg>
                  </div>
                  <span className="text-gray-700">Beranda</span>
                </div>
                
                <div className="p-3 bg-gray-50 rounded-lg flex items-center">
                  <div className="w-8 h-8 rounded-full bg-lavender-light/50 flex items-center justify-center mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-lavender-dark" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2h2a1 1 0 100-2H9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-700">Tentang Kami</span>
                </div>
                
                <div className="p-3 bg-gray-50 rounded-lg flex items-center">
                  <div className="w-8 h-8 rounded-full bg-forest-light/50 flex items-center justify-center mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-forest-dark" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M7 9a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 01-2 2H9a2 2 0 01-2-2V9z" />
                      <path d="M5 3a2 2 0 00-2 2v6a2 2 0 002 2V5h8a2 2 0 00-2-2H5z" />
                    </svg>
                  </div>
                  <span className="text-gray-700">Layanan</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default OfflinePage;