// src/components/pages/orphanages/detail/OrphanageDetails.tsx
"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { OrphanageDetailsProps } from '@/types/orphanage';

const OrphanageDetails: React.FC<OrphanageDetailsProps> = ({ orphanage }) => {
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
    <section className="py-16 bg-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-babyBlue/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-lavender/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-6 relative">
        <motion.div 
          className="text-center mb-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeIn}
        >
          <div className="inline-flex items-center justify-center mb-4">
            <div className="w-12 h-px bg-babyBlue mr-4"></div>
            <p className="text-sm uppercase tracking-wider font-semibold text-babyBlue-dark">TENTANG PANTI ASUHAN</p>
            <div className="w-12 h-px bg-babyBlue ml-4"></div>
          </div>
          
          <h2 className="text-3xl font-bold mb-4 text-gray-900">
            Informasi Lengkap {orphanage.nama_panti}
          </h2>
          
          <p className="text-gray-600 max-w-2xl mx-auto">
            Mengenal lebih dekat dengan panti asuhan kami dan bagaimana kami merawat 
            serta mendidik anak-anak untuk memiliki masa depan yang cerah.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Info Card */}
          <motion.div
            className="bg-white p-8 rounded-xl shadow-lg border border-gray-100"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeIn}
          >
            <h3 className="text-xl font-bold mb-6 pb-4 border-b border-gray-100">
              Profil Panti Asuhan
            </h3>
            
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold mb-3 text-babyBlue-dark">Deskripsi</h4>
                <p className="text-gray-600">
                  {orphanage.detail.deskripsi_lengkap}
                </p>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold mb-3 text-babyBlue-dark">Lokasi</h4>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-10 w-10 rounded-md bg-babyBlue-light/30 flex items-center justify-center mt-1 mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-babyBlue-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h5 className="font-medium mb-1">Alamat Lengkap:</h5>
                    <p className="text-gray-600">
                      {orphanage.detail.alamat_lengkap}
                    </p>
                    <p className="text-gray-600 mt-1">
                      Wilayah: {orphanage.wilayah.nama_wilayah}
                      {orphanage.wilayah.provinsi && `, ${orphanage.wilayah.provinsi}`}
                    </p>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold mb-3 text-babyBlue-dark">Yayasan Pengelola</h4>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-10 w-10 rounded-md bg-forest-light/30 flex items-center justify-center mt-1 mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-forest-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <div>
                    <h5 className="font-medium mb-1">Nama Yayasan:</h5>
                    <p className="text-gray-600">
                      {orphanage.yayasan.nama_yayasan}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Statistics Card */}
          <motion.div
            className="bg-white p-8 rounded-xl shadow-lg border border-gray-100"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeIn}
          >
            <h3 className="text-xl font-bold mb-6 pb-4 border-b border-gray-100">
              Data dan Statistik
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              <div className="bg-babyBlue-light/20 p-4 rounded-lg">
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-10 w-10 rounded-md bg-babyBlue/30 flex items-center justify-center mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-babyBlue-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-babyBlue-dark">{orphanage.jumlah_anak}</div>
                    <div className="text-sm text-gray-600">Total Anak Asuh</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-forest-light/20 p-4 rounded-lg">
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-10 w-10 rounded-md bg-forest/30 flex items-center justify-center mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-forest-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-forest-dark">{orphanage.detail.jumlah_pengasuh}</div>
                    <div className="text-sm text-gray-600">Pengasuh</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-lavender-light/20 p-4 rounded-lg">
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-10 w-10 rounded-md bg-lavender/30 flex items-center justify-center mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-lavender-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-lavender-dark">{orphanage.detail.jumlah_penghuni.laki_laki}</div>
                    <div className="text-sm text-gray-600">Laki-laki</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-poppy-light/20 p-4 rounded-lg">
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-10 w-10 rounded-md bg-poppy/30 flex items-center justify-center mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-poppy-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-poppy-dark">{orphanage.detail.jumlah_penghuni.perempuan}</div>
                    <div className="text-sm text-gray-600">Perempuan</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4 text-babyBlue-dark">Fokus Pelayanan</h4>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-gray-700">
                  {orphanage.detail.fokus_pelayanan}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default OrphanageDetails;