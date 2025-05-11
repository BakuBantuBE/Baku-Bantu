// src/components/pages/donation/DonationOptions.tsx
"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import SaweriaIntegration from './SaweriaIntegration';

const DonationOptions = () => {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [showQrCode, setShowQrCode] = useState(false);

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const stagger = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  // Preset donation amounts
  const donationAmounts = [
    { value: 50000, label: 'Rp50.000' },
    { value: 100000, label: 'Rp100.000' },
    { value: 200000, label: 'Rp200.000' },
    { value: 500000, label: 'Rp500.000' },
    { value: 1000000, label: 'Rp1.000.000' },
  ];

  // Handle custom amount change
  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Remove non-numeric characters
    const numericValue = value.replace(/[^0-9]/g, '');
    setCustomAmount(numericValue);
    // Deselect preset amounts
    setSelectedAmount(null);
  };

  // Format the custom amount as currency
  const formatCurrency = (value: string) => {
    if (!value) return '';
    const numericValue = parseInt(value.replace(/[^0-9]/g, ''));
    if (isNaN(numericValue)) return '';
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(numericValue);
  };

  // Get the final donation amount
  const getDonationAmount = () => {
    if (selectedAmount) return selectedAmount;
    if (customAmount) return parseInt(customAmount);
    return 0;
  };

  return (
    <section id="donation-options" className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-6">
        <motion.div 
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeIn}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Pilih <span className="text-poppy">Nominal</span> Donasi
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Setiap donasi, berapapun nominalnya, membawa dampak nyata bagi mereka yang membutuhkan di Sulawesi Utara.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={stagger}
          >
            <h3 className="text-2xl font-semibold mb-6">Pilih Nominal</h3>
            
            {/* Preset amounts */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
              {donationAmounts.map((amount, index) => (
                <motion.div key={index} variants={fadeIn}>
                  <button
                    type="button"
                    className={`w-full py-4 px-6 rounded-xl text-center transition-all duration-300 ${
                      selectedAmount === amount.value
                        ? 'bg-babyBlue text-white shadow-lg transform -translate-y-1'
                        : 'bg-white border border-gray-200 hover:border-babyBlue hover:shadow-md text-gray-800'
                    }`}
                    onClick={() => {
                      setSelectedAmount(amount.value);
                      setCustomAmount('');
                    }}
                  >
                    <span className="block text-lg font-semibold">{amount.label}</span>
                  </button>
                </motion.div>
              ))}
            </div>

            {/* Custom amount */}
            <motion.div variants={fadeIn} className="mb-8">
              <label htmlFor="customAmount" className="block text-sm font-medium text-gray-700 mb-2">
                Atau masukkan nominal lainnya
              </label>
              <div className="relative rounded-lg shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">Rp</span>
                </div>
                <input
                  type="text"
                  name="customAmount"
                  id="customAmount"
                  className={`block w-full pl-12 pr-12 py-4 border-gray-300 rounded-lg focus:ring-babyBlue focus:border-babyBlue text-lg ${
                    customAmount ? 'border-babyBlue' : 'border-gray-300'
                  }`}
                  placeholder="Masukkan nominal"
                  value={customAmount}
                  onChange={handleCustomAmountChange}
                />
              </div>
            </motion.div>

            {/* Integration with Saweria */}
            <motion.div variants={fadeIn}>
              <SaweriaIntegration 
                donationAmount={getDonationAmount()} 
                showQrCode={showQrCode}
                setShowQrCode={setShowQrCode}
              />
            </motion.div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeIn}
            className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100"
          >
            <h3 className="text-2xl font-semibold mb-6">Dampak Donasi Anda</h3>
            
            <div className="space-y-6">
              <Card className="overflow-hidden border-0 shadow-md">
                <div className="relative h-40">
                  <Image
                    src="/images/orphanages1.JPG"
                    alt="Bantuan Pangan"
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="p-4">
                  <h4 className="font-semibold text-lg mb-2">Donasi Rp50.000</h4>
                  <p className="text-gray-600 text-sm">
                    Dapat menyediakan makanan bergizi untuk 5 anak selama satu hari di panti asuhan
                  </p>
                </CardContent>
              </Card>
              
              <Card className="overflow-hidden border-0 shadow-md">
                <div className="relative h-40">
                  <Image
                    src="/images/hero-service3.JPG"
                    alt="Bantuan Pendidikan"
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="p-4">
                  <h4 className="font-semibold text-lg mb-2">Donasi Rp200.000</h4>
                  <p className="text-gray-600 text-sm">
                    Dapat memberikan perlengkapan sekolah lengkap untuk satu anak selama satu semester
                  </p>
                </CardContent>
              </Card>
              
              <Card className="overflow-hidden border-0 shadow-md">
                <div className="relative h-40">
                  <Image
                    src="/images/hero-service1.JPG"
                    alt="Bantuan Kesehatan"
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="p-4">
                  <h4 className="font-semibold text-lg mb-2">Donasi Rp500.000</h4>
                  <p className="text-gray-600 text-sm">
                    Dapat membiayai pemeriksaan kesehatan dan vaksinasi dasar untuk 3 anak
                  </p>
                </CardContent>
              </Card>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 italic">
                  "Setiap donasi, berapapun jumlahnya, membawa perubahan nyata bagi anak-anak kami. Terima kasih atas kepedulian Anda."
                </p>
                <p className="text-right text-xs text-gray-500 mt-2">— Yayasan Panti Asuhan Sulawesi Utara</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DonationOptions;