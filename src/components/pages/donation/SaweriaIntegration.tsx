// src/components/pages/donation/SaweriaIntegration.tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';

interface SaweriaIntegrationProps {
  donationAmount: number;
  showQrCode: boolean;
  setShowQrCode: (show: boolean) => void;
}

const SaweriaIntegration: React.FC<SaweriaIntegrationProps> = ({ 
  donationAmount, 
  showQrCode, 
  setShowQrCode 
}) => {
  const [copied, setCopied] = useState(false);

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3 }
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      transition: { duration: 0.2 }
    }
  };

  // Format amount as currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', { 
      style: 'currency', 
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  // Construct Saweria URL with amount
  const getSaweriaUrl = () => {
    // Replace this with your actual Saweria username
    const saweriaUsername = "bakubantudonation";
    let url = `https://saweria.co/${saweriaUsername}`;
    
    // Add amount parameter if available
    if (donationAmount > 0) {
      url += `?amount=${donationAmount}`;
    }
    
    return url;
  };

  // Handle copy link to clipboard
  const handleCopyLink = () => {
    navigator.clipboard.writeText(getSaweriaUrl());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Handle donation button click
  const handleDonationClick = (e: React.MouseEvent) => {
    e.preventDefault();
    alert("Mohon maaf, saat ini kami sedang dalam maintenance. Silakan coba beberapa saat lagi.");
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Donasi melalui Saweria</h3>
      
      {/* Donation Summary */}
      {donationAmount > 0 && (
        <motion.div 
          className="bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex justify-between items-center">
            <span className="text-gray-700">Total donasi:</span>
            <span className="text-xl font-bold text-babyBlue-dark">
              {formatCurrency(donationAmount)}
            </span>
          </div>
        </motion.div>
      )}

      {/* Donation Instructions */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <h4 className="font-medium mb-4">Cara berdonasi melalui Saweria:</h4>
        <ol className="space-y-3 text-gray-700 text-sm mb-6">
          <li className="flex">
            <span className="bg-babyBlue-light w-6 h-6 rounded-full text-babyBlue-dark font-medium flex items-center justify-center mr-3 flex-shrink-0">1</span>
            <span>Pilih nominal donasi atau masukkan nominal lainnya</span>
          </li>
          <li className="flex">
            <span className="bg-babyBlue-light w-6 h-6 rounded-full text-babyBlue-dark font-medium flex items-center justify-center mr-3 flex-shrink-0">2</span>
            <span>Klik tombol "Donasi via Saweria" untuk diarahkan ke halaman pembayaran Saweria</span>
          </li>
          <li className="flex">
            <span className="bg-babyBlue-light w-6 h-6 rounded-full text-babyBlue-dark font-medium flex items-center justify-center mr-3 flex-shrink-0">3</span>
            <span>Pilih metode pembayaran (QRIS, transfer bank, e-wallet, dll)</span>
          </li>
          <li className="flex">
            <span className="bg-babyBlue-light w-6 h-6 rounded-full text-babyBlue-dark font-medium flex items-center justify-center mr-3 flex-shrink-0">4</span>
            <span>Lengkapi informasi pembayaran dan selesaikan transaksi</span>
          </li>
          <li className="flex">
            <span className="bg-babyBlue-light w-6 h-6 rounded-full text-babyBlue-dark font-medium flex items-center justify-center mr-3 flex-shrink-0">5</span>
            <span>Anda akan menerima konfirmasi donasi melalui email</span>
          </li>
        </ol>

        <div className="flex items-center mb-6">
          <div className="flex-shrink-0 w-12 h-12 mr-4">
            <Image 
              src="/images/saweria.png" 
              alt="Saweria Logo"
              width={48}
              height={48}
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <h4 className="font-medium text-gray-800">Saweria</h4>
            <p className="text-xs text-gray-600">Platform donasi aman dan terpercaya</p>
          </div>
        </div>

        <div className="space-y-3">
          <Button 
            variant="primary" 
            size="full"
            className={`bg-gradient-to-r ${donationAmount > 0 ? 'from-poppy to-poppy-dark' : 'from-gray-400 to-gray-500'} flex items-center justify-center`}
            disabled={donationAmount <= 0}
            onClick={handleDonationClick}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5 5a3 3 0 015-2.236A3 3 0 0114.83 6H16a2 2 0 110 4h-5V9a1 1 0 10-2 0v1H4a2 2 0 110-4h1.17C5.06 5.687 5 5.35 5 5zm4 1V5a1 1 0 10-1 1h1zm3 0a1 1 0 10-1-1v1h1z" clipRule="evenodd" />
              <path d="M9 11H3v5a2 2 0 002 2h4v-7zM11 18h4a2 2 0 002-2v-5h-6v7z" />
            </svg>
            Donasi via Saweria
          </Button>

          <div className="flex space-x-3">
            <button
              type="button"
              onClick={() => setShowQrCode(!showQrCode)}
              className="flex-1 py-2 px-4 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-babyBlue flex items-center justify-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm2 2V5h1v1H5zM3 13a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1H4a1 1 0 01-1-1v-3zm2 2v-1h1v1H5zM13 3a1 1 0 00-1 1v3a1 1 0 001 1h3a1 1 0 001-1V4a1 1 0 00-1-1h-3zm1 2v1h1V5h-1z" clipRule="evenodd" />
                <path d="M11 4a1 1 0 10-2 0v1a1 1 0 002 0V4zM10 7a1 1 0 011 1v1h2a1 1 0 110 2h-3a1 1 0 01-1-1V8a1 1 0 011-1zM16 9a1 1 0 100 2 1 1 0 000-2zM9 13a1 1 0 011-1h1a1 1 0 110 2v2a1 1 0 11-2 0v-3zM7 11a1 1 0 100-2H4a1 1 0 100 2h3zM17 13a1 1 0 01-1 1h-2a1 1 0 110-2h2a1 1 0 011 1zM16 17a1 1 0 100-2h-3a1 1 0 100 2h3z" />
              </svg>
              {showQrCode ? "Sembunyikan QR Code" : "Tampilkan QR Code"}
            </button>
            
            <button
              type="button"
              onClick={handleCopyLink}
              className="flex-1 py-2 px-4 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-babyBlue flex items-center justify-center"
            >
              {copied ? (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Tersalin!
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M8 2a1 1 0 000 2h2a1 1 0 100-2H8z" />
                    <path d="M3 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v6h-4.586l1.293-1.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L10.414 13H15v3a2 2 0 01-2 2H5a2 2 0 01-2-2V5zM15 11h2a1 1 0 110 2h-2v-2z" />
                  </svg>
                  Salin Link
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* QR Code Section */}
      <AnimatePresence>
        {showQrCode && (
          <motion.div
            className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={fadeIn}
          >
            <h4 className="font-medium mb-4 text-center">Scan QR Code untuk donasi</h4>
            <div className="flex justify-center mb-4">
              <div className="relative w-64 h-64 bg-gray-100 rounded-lg p-4 border border-gray-200">
                <Image
                  src="/images/saweria.png"
                  alt="Saweria QR Code"
                  fill
                  className="object-contain p-4"
                />
              </div>
            </div>
            <p className="text-sm text-gray-600 text-center">
              Pindai kode QR ini dengan aplikasi pembayaran Anda atau aplikasi kamera untuk membuka halaman donasi Saweria
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Security Notice */}
      <div className="bg-blue-50 p-4 rounded-lg text-sm text-blue-700 flex">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
        <span>
          Donasi Anda diproses melalui Saweria, platform pembayaran yang aman dan terpercaya. Semua transaksi dilindungi dengan enkripsi tingkat tinggi.
        </span>
      </div>
    </div>
  );
};

export default SaweriaIntegration;