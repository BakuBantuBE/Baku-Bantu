// src/components/pages/orphanages/detail/OrphanageHero.tsx
"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { OrphanageHeroProps } from '@/types/orphanage';

const OrphanageHero: React.FC<OrphanageHeroProps> = ({ orphanage }) => {
  return (
    <section className="relative py-0 md:py-0 overflow-hidden">
      {/* Background hero image with overlay */}
      <div className="relative w-full h-[50vh] md:h-[60vh] lg:h-[70vh]">
        <Image 
          src={orphanage.foto_utama || '/images/orphanages/orphanage-placeholder.jpg'} 
          alt={orphanage.nama_panti}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/70"></div>
        
        {/* Floating info card */}
        <motion.div 
            className="absolute top-1/2 transform -translate-y-1/2 right-0 left-0 px-4 md:px-0 md:left-auto md:translate-y-0 md:top-24 md:right-16 lg:right-20 w-full md:w-auto md:max-w-md lg:max-w-lg"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            >
          <div className="bg-white/95 backdrop-blur-md p-6 md:p-8 rounded-xl shadow-xl w-full">
            {/* Breadcrumb */}
            <div className="hidden md:flex items-center text-sm text-gray-500 mb-4">
              <Link href="/" className="hover:text-babyBlue-dark">Beranda</Link>
              <span className="mx-2">/</span>
              <Link href="/orphanages" className="hover:text-babyBlue-dark">Panti Asuhan</Link>
              <span className="mx-2">/</span>
              <span className="text-gray-700 font-medium">Detail</span>
            </div>
            
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 text-gray-900 leading-tight">
              {orphanage.nama_panti}
            </h1>
            
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge 
                variant="primary"
                className="bg-babyBlue-light/80 text-babyBlue-dark"
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                }
              >
                {orphanage.wilayah.nama_wilayah}
              </Badge>
              
              <Badge 
                variant="primary"
                className="bg-forest-light/80 text-forest-dark"
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                }
              >
                {orphanage.yayasan.nama_yayasan}
              </Badge>
              
              <Badge 
                variant="primary"
                className="bg-poppy-light/80 text-poppy-dark"
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                }
              >
                {orphanage.jumlah_anak} Anak
              </Badge>
            </div>
            
            <p className="text-gray-700 mb-6 line-clamp-3 md:line-clamp-none">
              {orphanage.deskripsi_singkat}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/donasi" className="flex-1">
                <Button 
                  variant="primary" 
                  size="lg"
                  className="w-full shadow-md"
                  leftIcon={
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  }
                >
                  Donasi Sekarang
                </Button>
              </Link>
              
              <Button 
                variant="outline" 
                size="lg"
                className="flex-1 border-gray-200 bg-white text-forest-dark hover:bg-gray-50"
                leftIcon={
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                }
              >
                Jadwalkan Kunjungan
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Quick stats under hero */}
      <motion.div 
        className="relative z-10 bg-white shadow-lg rounded-t-3xl md:rounded-3xl -mt-6 md:-mt-16 mx-auto max-w-7xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 p-6 md:p-8">
          <div className="text-center">
            <div className="w-12 h-12 bg-babyBlue-light/30 rounded-full flex items-center justify-center mx-auto mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-babyBlue-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{orphanage.jumlah_anak}</h3>
            <p className="text-sm text-gray-600">Total Anak</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-forest-light/30 rounded-full flex items-center justify-center mx-auto mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-forest-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{orphanage.detail.jumlah_pengasuh}</h3>
            <p className="text-sm text-gray-600">Pengasuh</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-lavender-light/30 rounded-full flex items-center justify-center mx-auto mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-lavender-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{orphanage.detail.jumlah_penghuni.laki_laki}</h3>
            <p className="text-sm text-gray-600">Laki-laki</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-poppy-light/30 rounded-full flex items-center justify-center mx-auto mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-poppy-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{orphanage.detail.jumlah_penghuni.perempuan}</h3>
            <p className="text-sm text-gray-600">Perempuan</p>
          </div>
        </div>
        
        <div className="px-6 pb-6 md:px-8 md:pb-8">
          <div className="w-full h-px bg-gray-200 my-6"></div>
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 h-10 w-10 rounded-md bg-mango-light/30 flex items-center justify-center mt-1 mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-mango-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Fokus Pelayanan:</h4>
                <p className="text-gray-600">{orphanage.detail.fokus_pelayanan}</p>
              </div>
            </div>
            
            <div className="flex gap-2 mt-4 md:mt-0">
              {orphanage.detail.kategori_kebutuhan.slice(0, 3).map((kategori, index) => (
                <span 
                  key={index}
                  className="px-3 py-1 bg-lavender-light/20 text-lavender-dark text-sm rounded-full"
                >
                  {kategori}
                </span>
              ))}
              {orphanage.detail.kategori_kebutuhan.length > 3 && (
                <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                  +{orphanage.detail.kategori_kebutuhan.length - 3} lainnya
                </span>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default OrphanageHero;