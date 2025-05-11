// src/components/pages/orphanages/OrphanageCard.tsx
"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { OrphanageCardProps } from '@/types/orphanage';

const OrphanageCard: React.FC<OrphanageCardProps> = ({ orphanage }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -8 }}
      className="bg-white rounded-lg shadow-md overflow-hidden h-full flex flex-col transition-all duration-300 hover:shadow-xl"
    >
      {/* Image */}
      <div className="relative aspect-video">
        <Image 
          src={orphanage.fotoUtama || '/images/orphanages/orphanage-placeholder.jpg'} 
          alt={orphanage.namaPanti}
          fill
          className="object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-3 left-4">
          <Badge 
            variant="primary"
            className="capitalize bg-white/80 backdrop-blur-sm text-babyBlue-dark"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            }
          >
            {orphanage.wilayah.nama}
          </Badge>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-5 flex-1 flex flex-col">
        <h3 className="text-xl font-semibold text-gray-900 mb-2 leading-tight">
          {orphanage.namaPanti}
        </h3>
        
        <div className="flex flex-wrap gap-4 mb-3 text-sm">
          <div className="flex items-center text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-forest" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <span>{orphanage.yayasan.namaYayasan}</span>
          </div>
          
          <div className="flex items-center text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-poppy" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span>{orphanage.jumlahAnak} Anak</span>
          </div>
        </div>
        
        <p className="text-gray-600 mb-4 text-sm flex-1">
          {orphanage.deskripsiSingkat.length > 100 
            ? `${orphanage.deskripsiSingkat.substring(0, 100)}...` 
            : orphanage.deskripsiSingkat}
        </p>
        
        <Link href={`/orphanages/${orphanage.id}`} className="mt-auto">
          <Button 
            variant="outline" 
            size="full" 
            className="border-babyBlue text-babyBlue-dark hover:bg-babyBlue-light/20"
            rightIcon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            }
          >
            Lihat Detail
          </Button>
        </Link>
      </div>
    </motion.div>
  );
};

export default OrphanageCard;