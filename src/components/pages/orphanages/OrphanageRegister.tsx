// src/components/pages/orphanages/OrphanageRegister.tsx
"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { motion } from 'framer-motion';

const OrphanageRegister = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-white to-lavender-light/20">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center gap-10">
          <motion.div 
            className="md:w-1/2"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="relative h-96 w-full rounded-xl overflow-hidden shadow-xl">
              <Image 
                src="/images/orphanages1.JPG" 
                alt="Menjadi Mitra BakuBantu"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6 z-10">
                <h3 className="text-2xl font-bold text-white mb-2">
                  Mari Bergabung!
                </h3>
                <p className="text-white/90">
                  Membangun harapan dan masa depan bersama anak-anak Indonesia
                </p>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="md:w-1/2"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="flex items-center mb-6">
                <div className="w-12 h-px bg-forest mr-4"></div>
                <p className="text-sm uppercase tracking-wider font-semibold text-forest-dark">MITRA PANTI ASUHAN</p>
              </div>
              
              <h2 className="text-3xl font-bold mb-4 text-gray-900">
                Ingin Menjadi Mitra?
              </h2>
              
              <p className="text-gray-600 mb-6">
                BakuBantu membuka kesempatan bagi panti asuhan di Sulawesi Utara untuk menjadi mitra. 
                Dengan menjadi mitra, panti asuhan Anda dapat:
              </p>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-mango-light flex items-center justify-center mr-3 mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-mango-dark" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-700">Mendapatkan dukungan dana dan sumbangan dari donatur</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-mango-light flex items-center justify-center mr-3 mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-mango-dark" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-700">Akses terhadap program pendampingan dan pengembangan</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-mango-light flex items-center justify-center mr-3 mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-mango-dark" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-700">Terhubung dengan komunitas dan relawan</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-mango-light flex items-center justify-center mr-3 mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-mango-dark" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-700">Kesempatan untuk mengikuti program pelatihan</span>
                </li>
              </ul>
              
              <a href="mailto:bakubantusulut@gmail.com">
                <Button 
                  variant="primary" 
                  size="lg"
                  className="w-full"
                  rightIcon={
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  }
                >
                  Daftarkan Panti Asuhan
                </Button>
              </a>
              
              <p className="mt-4 text-sm text-gray-500 text-center">
                Untuk informasi lebih lanjut, silakan hubungi kami di{' '}
                <a href="mailto:bakubantusulut@gmail.com" className="text-babyBlue-dark hover:underline">
                  bakubantusulut@gmail.com
                </a>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default OrphanageRegister;