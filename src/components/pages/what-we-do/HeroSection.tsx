// src/components/pages/what-we-do/HeroSection.tsx
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
          src="/images/cta-background.jpeg" 
          alt="What We Do at BakuBantu" 
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
              Apa yang <span className="text-babyBlue">BakuBantu</span><br />
              <span className="text-poppy">Lakukan</span> Untuk Mereka
            </h1>
            
            <p className="text-xl mb-8 text-gray-200">
              Kami berusaha memberikan dampak positif melalui berbagai program yang fokus pada pendidikan, perawatan, dan pengembangan anak-anak yang membutuhkan.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Link href="#services">
                <Button 
                  variant="primary" 
                  size="lg" 
                  className="shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
                >
                  Lihat Layanan Kami
                </Button>
              </Link>
              <Link href="/donate">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-white text-white hover:bg-white/20"
                >
                  Donasi Sekarang
                </Button>
              </Link>
            </div>
          </motion.div>
          
          <motion.div 
            className="hidden lg:block"
            initial={{ opacity: 0, scale: 0.8, rotateY: 25 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-64 h-64 bg-babyBlue/20 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-6 -right-6 w-64 h-64 bg-poppy/20 rounded-full blur-3xl"></div>
              <div className="relative bg-white/10 backdrop-blur-sm p-6 rounded-2xl shadow-2xl border border-white/20">
                <div className="grid grid-cols-2 gap-3">
                  <div className="aspect-square rounded-lg overflow-hidden">
                    <Image 
                      src="/images/services-learning.jpeg" 
                      alt="Pendidikan Anak" 
                      width={250} 
                      height={250}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="aspect-square rounded-lg overflow-hidden">
                    <Image 
                      src="/images/about_us_01.jpeg" 
                      alt="Pengasuhan Anak" 
                      width={250} 
                      height={250}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="aspect-square rounded-lg overflow-hidden">
                    <Image 
                      src="/images/project-1.jpg" 
                      alt="Kegiatan Sosial" 
                      width={250} 
                      height={250}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="aspect-square rounded-lg overflow-hidden">
                    <Image 
                      src="/images/project-2.jpg" 
                      alt="Program Kemandirian" 
                      width={250} 
                      height={250}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
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
        <Link href="#services" className="text-white flex flex-col items-center">
          <svg className="w-6 h-6 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </Link>
      </motion.div>
    </section>
  );
};

export default HeroSection;