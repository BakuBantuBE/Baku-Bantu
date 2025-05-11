// src/components/pages/orphanages/detail/OrphanageNeeds.tsx
"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { OrphanageNeedsProps } from '@/types/orphanage';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

const OrphanageNeeds: React.FC<OrphanageNeedsProps> = ({ orphanage }) => {
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  // Icons for categories
  const categoryIcons: Record<string, React.ReactNode> = {
    'Sembako': (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    'Peralatan Sekolah': (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    'Peralatan Mandi': (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76" />
      </svg>
    ),
    'Perlengkapan Belajar': (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
      </svg>
    ),
    'Mainan Edukatif': (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    // Default icon for any other category
    'default': (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
      </svg>
    ),
  };

  // Helper to get correct icon for a category
  const getCategoryIcon = (category: string) => {
    return categoryIcons[category] || categoryIcons['default'];
  };

  // Colors for card backgrounds based on index
  const cardColors = [
    'bg-babyBlue-light/20',
    'bg-lavender-light/20',
    'bg-poppy-light/20',
    'bg-forest-light/20',
    'bg-mango-light/20'
  ];

  return (
    <section className="py-16 bg-gray-50 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-poppy/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-babyBlue/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-6 relative">
        <motion.div 
          className="text-center mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeIn}
        >
          <div className="inline-flex items-center justify-center mb-4">
            <div className="w-12 h-px bg-poppy mr-4"></div>
            <p className="text-sm uppercase tracking-wider font-semibold text-poppy-dark">KEBUTUHAN PRIORITAS</p>
            <div className="w-12 h-px bg-poppy ml-4"></div>
          </div>
          
          <h2 className="text-3xl font-bold mb-4 text-gray-900">
            Bagaimana Anda Dapat Membantu
          </h2>
          
          <p className="text-gray-600 max-w-2xl mx-auto">
            {orphanage.nama_panti} memiliki beberapa kebutuhan prioritas yang dapat Anda bantu 
            untuk meningkatkan kualitas hidup anak-anak asuh.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {orphanage.detail.kategori_kebutuhan.map((category, index) => (
            <motion.div 
              key={index}
              className={`${cardColors[index % cardColors.length]} p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-200`}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-25px" }}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { 
                  opacity: 1, 
                  y: 0,
                  transition: { duration: 0.5, delay: index * 0.1 }
                }
              }}
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center mr-4 shadow-sm">
                  {getCategoryIcon(category)}
                </div>
                <h3 className="text-xl font-semibold text-gray-800">{category}</h3>
              </div>
              
              <p className="text-gray-600 mb-4">
                Bantuan {category.toLowerCase()} sangat dibutuhkan untuk mendukung kehidupan sehari-hari 
                dan pendidikan anak-anak di {orphanage.nama_panti}.
              </p>
              
              <Link href="/donate">
                <Button 
                  variant="outline" 
                  className="w-full border-gray-300 hover:border-babyBlue hover:bg-babyBlue-light/10"
                >
                  Donasi {category}
                </Button>
              </Link>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="bg-white p-6 md:p-8 rounded-xl shadow-md"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeIn}
        >
          <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-center">
            <div className="md:flex-1">
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Bentuk Sumbangan yang Diterima</h3>
              <p className="text-gray-600 mb-4">
                {orphanage.nama_panti} menerima berbagai bentuk sumbangan untuk mendukung 
                operasional dan kesejahteraan anak-anak asuh.
              </p>
              
              <div className="flex flex-wrap gap-2">
                {orphanage.detail.sumbangan_diterima.map((type, index) => (
                  <span 
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full bg-babyBlue-light/20 text-babyBlue-dark text-sm"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {type}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="shrink-0">
              <Button 
                variant="primary" 
                size="lg"
                className="shadow-md"
                rightIcon={
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                }
              >
                Donasi Sekarang
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default OrphanageNeeds;