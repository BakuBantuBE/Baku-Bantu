// src/components/pages/donation/HeroSection.tsx
"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';

const HeroSection = () => {
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section className="relative min-h-screen flex items-center">
      {/* Background image with overlay gradient */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/images/hero-service2.JPG" 
          alt="Donasi untuk BakuBantu" 
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent"></div>
      </div>

      {/* Hero content */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            className="text-white"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
              Bersama <span className="text-poppy">Berbagi</span> <br />
              Untuk <span className="text-babyBlue">Perubahan</span>
            </h1>
            
            <p className="text-xl mb-8 text-gray-200">
              Donasi Anda tidak hanya memberikan bantuan material, tetapi juga membawa harapan dan kesempatan bagi mereka yang membutuhkan di Sulawesi Utara.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Link href="#donation-options">
                <Button 
                  variant="primary" 
                  size="lg" 
                  className="shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 bg-gradient-to-r from-babyBlue to-babyBlue-dark"
                >
                  Donasi Sekarang
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Button>
              </Link>
              <Link href="#impact">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-white text-white hover:bg-white/20 bg-black/30"
                >
                  Lihat Dampak Donasi
                </Button>
              </Link>
            </div>

            <div className="mt-10 bg-black/30 backdrop-blur-sm rounded-xl p-6 max-w-xl">
              <div className="flex items-center mb-3">
                <div className="h-10 w-10 rounded-full bg-poppy/80 flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold">Transparansi Donasi</h3>
              </div>
              <p className="text-gray-300 text-sm">
                Kami berkomitmen untuk transparansi penuh. 100% donasi Anda dialokasikan untuk program-program bantuan, dengan laporan penggunaan dana yang dapat diakses publik setiap bulan.
              </p>
            </div>
          </motion.div>
          
          <motion.div 
            className="hidden lg:block"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-64 h-64 bg-poppy/20 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-6 -right-6 w-64 h-64 bg-babyBlue/20 rounded-full blur-3xl"></div>
              <div className="relative bg-white/10 backdrop-blur-sm p-6 rounded-2xl shadow-2xl border border-white/20">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-white">Target Donasi</h3>
                    <span className="bg-poppy/80 text-white px-3 py-1 rounded-full text-sm font-medium">
                      5% Tercapai
                    </span>
                  </div>
                  
                  <div className="h-4 bg-white/20 rounded-full overflow-hidden mb-2">
                    <motion.div 
                      className="h-full bg-gradient-to-r from-babyBlue to-poppy"
                      initial={{ width: 0 }}
                      animate={{ width: "5%" }}
                      transition={{ duration: 1.5, delay: 0.5 }}
                    />
                  </div>
                  
                  <div className="flex justify-between text-sm text-white/80">
                    <span>Rp5.000.000</span>
                    <span>Rp100.000.000</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                    <h4 className="text-3xl font-bold text-white">250+</h4>
                    <p className="text-white/80 text-sm">Donatur</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                    <h4 className="text-3xl font-bold text-white">15+</h4>
                    <p className="text-white/80 text-sm">Program Bantuan</p>
                  </div>
                </div>
                
                <Link href="#donation-options" className="block">
                  <Button 
                    variant="primary" 
                    size="full"
                    className="bg-gradient-to-r from-poppy to-poppy-dark"
                  >
                    Donasi Lewat Saweria
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-10 left-0 right-0 flex justify-center"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1, repeat: Infinity, repeatType: "reverse" }}
      >
        <Link href="#donation-options" className="text-white flex flex-col items-center">
          <span className="mb-2 text-sm font-light">Scroll ke bawah</span>
          <svg className="w-6 h-6 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </Link>
      </motion.div>
    </section>
  );
};

export default HeroSection;