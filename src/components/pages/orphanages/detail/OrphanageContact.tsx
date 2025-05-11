// src/components/pages/orphanages/detail/OrphanageContact.tsx
"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { OrphanageContactProps } from '@/types/orphanage';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

const OrphanageContact: React.FC<OrphanageContactProps> = ({ orphanage }) => {
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
    <section className="py-16 bg-gray-50 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-lavender/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-babyBlue/10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-6 relative">
        <motion.div 
          className="text-center mb-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeIn}
        >
          <div className="inline-flex items-center justify-center mb-4">
            <div className="w-12 h-px bg-lavender mr-4"></div>
            <p className="text-sm uppercase tracking-wider font-semibold text-lavender-dark">HUBUNGI KAMI</p>
            <div className="w-12 h-px bg-lavender ml-4"></div>
          </div>
          
          <h2 className="text-3xl font-bold mb-4 text-gray-900">
            Ingin Tahu Lebih Banyak?
          </h2>
          
          <p className="text-gray-600 max-w-2xl mx-auto">
            Jika Anda memiliki pertanyaan atau ingin informasi lebih lanjut tentang {orphanage.nama_panti}, 
            silakan hubungi kami melalui kontak di bawah ini atau kirim pesan melalui formulir.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Contact info */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeIn}
          >
            <div className="bg-white p-8 rounded-xl shadow-md h-full">
              <h3 className="text-xl font-bold mb-6 text-gray-900">Informasi Kontak</h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-10 w-10 rounded-md bg-babyBlue-light/30 flex items-center justify-center mt-1 mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-babyBlue-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Alamat</h4>
                    <p className="text-gray-600">
                      {orphanage.detail.alamat_lengkap}
                    </p>
                    <p className="text-gray-600 mt-1">
                      {orphanage.wilayah.nama_wilayah}
                      {orphanage.wilayah.provinsi && `, ${orphanage.wilayah.provinsi}`}
                    </p>
                  </div>
                </div>
                
                {orphanage.yayasan.kontak_yayasan && orphanage.yayasan.kontak_yayasan.length > 0 && (
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-10 w-10 rounded-md bg-forest-light/30 flex items-center justify-center mt-1 mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-forest-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-1">Kontak</h4>
                      <div className="space-y-2">
                        {orphanage.yayasan.kontak_yayasan.map((kontak, index) => (
                          <div key={index}>
                            <p className="text-gray-600">
                              {kontak.nama_kontak} ({kontak.jabatan})
                            </p>
                            <p className="text-gray-600">
                              <a href={`tel:${kontak.nomor_telepon}`} className="text-babyBlue-dark hover:underline">
                                {kontak.nomor_telepon}
                              </a>
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-10 w-10 rounded-md bg-poppy-light/30 flex items-center justify-center mt-1 mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-poppy-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Email</h4>
                    <p className="text-gray-600">
                      <a href={`mailto:info@${orphanage.nama_panti.toLowerCase().replace(/\s+/g, '-')}.org`} className="text-babyBlue-dark hover:underline">
                        info@{orphanage.nama_panti.toLowerCase().replace(/\s+/g, '-')}.org
                      </a>
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-10 w-10 rounded-md bg-mango-light/30 flex items-center justify-center mt-1 mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-mango-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Jam Kunjungan</h4>
                    <p className="text-gray-600">
                      Senin - Jumat: 09:00 - 16:00 WIB
                    </p>
                    <p className="text-gray-600">
                      Sabtu: 09:00 - 12:00 WIB
                    </p>
                    <p className="text-gray-600">
                      Minggu & Hari Libur: Dengan perjanjian
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Contact form */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeIn}
          >
            <div className="bg-white p-8 rounded-xl shadow-md">
              <h3 className="text-xl font-bold mb-6 text-gray-900">Kirim Pesan</h3>
              
              <form>
                <div className="mb-4">
                  <Input
                    label="Nama Lengkap"
                    placeholder="Masukkan nama lengkap Anda"
                  />
                </div>
                
                <div className="mb-4">
                  <Input
                    label="Email"
                    type="email"
                    placeholder="Masukkan alamat email Anda"
                  />
                </div>
                
                <div className="mb-4">
                  <Input
                    label="Nomor Telepon"
                    type="tel"
                    placeholder="Masukkan nomor telepon Anda"
                  />
                </div>
                
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Pesan
                  </label>
                  <textarea
                    rows={4}
                    className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm transition-colors placeholder:text-gray-400 focus:outline-none focus:border-babyBlue focus:ring-1 focus:ring-babyBlue shadow-sm"
                    placeholder="Tulis pesan Anda disini..."
                  />
                </div>
                
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
                  Kirim Pesan
                </Button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default OrphanageContact;