// src/components/pages/orphanages/OrphanageHero.tsx
"use client";

import React from 'react';
import { motion } from 'framer-motion';

const OrphanageHero = () => {
  return (
    <section className="relative py-20 bg-gradient-to-br from-babyBlue-light/30 to-lavender-light/20 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-mango-light/20 rounded-full -mr-32 -mt-32 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-poppy-light/10 rounded-full -ml-48 -mb-48 blur-3xl"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center justify-center mb-6">
            <div className="w-12 h-px bg-poppy mr-4"></div>
            <p className="text-sm uppercase tracking-wider font-semibold text-poppy-dark">PANTI ASUHAN</p>
            <div className="w-12 h-px bg-poppy ml-4"></div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 leading-tight">
            Panti Asuhan Mitra BakuBantu
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Menghubungkan kepedulian dengan aksi nyata untuk membantu panti asuhan di Sulawesi Utara. 
            Bersama, kita dapat memberikan dukungan yang dibutuhkan oleh anak-anak di panti asuhan.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default OrphanageHero;