// src/components/pages/orphanages/detail/OrphanageDisclaimer.tsx
"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { OrphanageDetailsProps } from '@/types/orphanage';

const OrphanageDisclaimer: React.FC<OrphanageDetailsProps> = ({ orphanage }) => {
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
    <section className="py-8 bg-gray-50 relative">
      <div className="container mx-auto px-6">
        <motion.div 
          className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-25px" }}
          variants={fadeIn}
        >
          <div className="flex items-start">
            <div className="flex-shrink-0 mr-4">
              <div className="w-10 h-10 rounded-full bg-babyBlue-light/30 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-babyBlue-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-2 text-gray-900">Disclaimer</h4>
              <p className="text-gray-600 text-sm mb-2">
                Informasi yang tersedia ditujukan kepada setiap pihak yang membutuhkan acuan dalam melaksanakan 
                kegiatan bakti sosial di region {orphanage.wilayah.nama_wilayah}. Kami menerima masukan berupa 
                koreksi jika terdapat kekeliruan dalam informasi yang ditampilkan.
              </p>
              <p className="text-gray-600 text-sm">
                Mohon manfaatkan nomor kontak yang ada secara bijak untuk menghubungi pihak panti sekiranya membutuhkan 
                informasi yang belum tercantum dalam tabel ini. Terima kasih dan semoga bermanfaat.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default OrphanageDisclaimer;