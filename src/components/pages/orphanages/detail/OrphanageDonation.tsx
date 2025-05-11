// src/components/pages/orphanages/detail/OrphanageDonation.tsx
"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { OrphanageDonationProps } from '@/types/orphanage';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Checkbox } from '@/components/ui/Checkbox';
import Link from 'next/link';

const OrphanageDonation: React.FC<OrphanageDonationProps> = ({ orphanage }) => {
  // State for donation amount
  const [donationAmount, setDonationAmount] = useState<string>('');
  const [customAmount, setCustomAmount] = useState<boolean>(false);
  
  // Predefined donation amounts
  const donationOptions = ['50.000', '100.000', '250.000', '500.000', '1.000.000'];
  
  // Handle donation amount selection
  const handleAmountSelect = (amount: string) => {
    setDonationAmount(amount);
    setCustomAmount(false);
  };
  
  // Handle custom amount toggle
  const handleCustomToggle = () => {
    setCustomAmount(true);
    setDonationAmount('');
  };
  
  // Handle custom amount input
  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDonationAmount(e.target.value);
  };
  
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
      <div className="absolute top-0 right-0 w-96 h-96 bg-mango/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-forest/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-6 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left column - Donation info */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeIn}
          >
            <div className="flex items-center mb-6">
              <div className="w-12 h-px bg-forest mr-4"></div>
              <p className="text-sm uppercase tracking-wider font-semibold text-forest-dark">DONASI</p>
            </div>
            
            <h2 className="text-3xl font-bold mb-6 text-gray-900">
              Berikan Bantuan untuk Anak-anak di {orphanage.nama_panti}
            </h2>
            
            <p className="text-gray-600 mb-8">
              Donasi Anda akan membantu {orphanage.jumlah_anak} anak di {orphanage.nama_panti} mendapatkan 
              akses ke pendidikan berkualitas, gizi seimbang, dan lingkungan yang aman untuk tumbuh dan berkembang.
            </p>
            
            <div className="bg-gray-50 p-6 rounded-xl mb-8">
              <h3 className="text-lg font-semibold mb-4 text-gray-900">Donasi Anda akan membantu:</h3>
              
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-forest-light flex items-center justify-center mr-3 mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-forest-dark" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-700">Memenuhi kebutuhan makanan bergizi dan seimbang</span>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-forest-light flex items-center justify-center mr-3 mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-forest-dark" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-700">Memberikan akses ke pendidikan yang berkualitas</span>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-forest-light flex items-center justify-center mr-3 mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-forest-dark" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-700">Menyediakan perawatan kesehatan yang memadai</span>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-forest-light flex items-center justify-center mr-3 mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-forest-dark" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-700">Meningkatkan fasilitas dan infrastruktur panti asuhan</span>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Right column - Call to action */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeIn}
          >
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
              <h3 className="text-xl font-bold mb-6 text-gray-900">Mari Bantu {orphanage.nama_panti}</h3>
              
              <p className="text-gray-600 mb-8">
                Donasi Anda akan membantu anak-anak di {orphanage.nama_panti} mendapatkan 
                kehidupan yang lebih baik. Setiap kontribusi, tidak peduli seberapa kecil, 
                dapat membuat perbedaan besar dalam hidup mereka.
              </p>
              
              <div className="bg-lavender-light/20 p-4 rounded-lg mb-8">
                <h4 className="font-medium text-lavender-dark mb-2">Apa yang bisa Anda donasikan:</h4>
                <ul className="space-y-2">
                  {orphanage.detail.sumbangan_diterima.map((type, index) => (
                    <li key={index} className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-lavender-dark" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>{type}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <Link href="/donate">
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
              
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="font-medium text-gray-700">Informasi Donasi</span>
                </div>
                <p className="text-sm text-gray-600">
                  Semua donasi akan ditangani melalui halaman donasi pusat BakuBantu. 
                  Anda akan dapat memilih {orphanage.nama_panti} sebagai penerima donasi Anda.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default OrphanageDonation;