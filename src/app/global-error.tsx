// src/app/global-error.tsx
"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';

interface GlobalErrorProps {
  error: Error;
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  // For global errors, we need a minimal error page that doesn't depend on other components
  // as they might be the cause of the error
  
  return (
    <html>
      <body>
        <div className="min-h-screen bg-white flex flex-col justify-center items-center p-4">
          <div className="text-center max-w-xl">
            <div className="mb-6 inline-flex">
              <div className="w-12 h-1 bg-poppy rounded-full mr-4 mt-4"></div>
              <h1 className="text-sm uppercase tracking-wider font-semibold text-poppy">FATAL ERROR</h1>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-babyBlue-dark via-poppy to-forest">
              Maaf, Terjadi Kesalahan Sistem
            </h1>
            
            <p className="text-lg text-gray-700 mb-8">
              Aplikasi mengalami masalah yang tidak terduga. Tim teknis kami telah diberitahu dan sedang bekerja untuk memperbaikinya.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
              <button
                onClick={reset}
                className="px-6 py-3 rounded-md bg-babyBlue text-white shadow hover:bg-babyBlue-dark hover:shadow-md transition-colors"
              >
                Coba Lagi
              </button>
              <a 
                href="/"
                className="px-6 py-3 rounded-md border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 transition-colors"
              >
                Kembali ke Beranda
              </a>
            </div>

            {/* Error details in development mode */}
            {process.env.NODE_ENV === 'development' && (
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 text-left">
                <p className="text-sm font-medium text-gray-700 mb-2">Error Details (only visible in development):</p>
                <p className="text-sm text-red-600 font-mono">{error.message}</p>
                <p className="text-xs text-gray-500 mt-2">Stack: {error.stack}</p>
              </div>
            )}
            
            <div className="mt-10 text-center">
              <p className="text-sm text-gray-500">
                © {new Date().getFullYear()} Baku Bantu. Semua hak dilindungi.
              </p>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}