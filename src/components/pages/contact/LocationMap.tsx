// src/components/pages/contact/LocationMap.tsx
import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const LocationMap = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold text-gray-900 mb-3">Lokasi Kami</h3>
      
      <motion.div 
        className="relative overflow-hidden rounded-xl shadow-lg border border-gray-200"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        <div className="aspect-video relative">
          {/* Static map image as a placeholder - in a real app you would use a real map API */}
          <Image 
            src="/images/cta-background.jpeg" 
            alt="Lokasi BakuBantu"
            fill
            className="object-cover"
          />
          
          {/* Map overlay with address pin */}
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
            <motion.div 
              className="bg-white rounded-full p-3 shadow-lg"
              animate={{ 
                y: isHovered ? [0, -10, 0] : 0 
              }}
              transition={{ 
                duration: 1,
                repeat: isHovered ? Infinity : 0,
                repeatType: "loop"
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-poppy" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
            </motion.div>
          </div>
          
          {/* Location info box */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
            <div className="flex items-start">
              <div className="bg-white/10 backdrop-blur-sm p-3 rounded-lg mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="text-white">
                <h4 className="font-medium">Kantor Pusat BakuBantu</h4>
                <p className="text-sm text-gray-200">Walian, Tomohon Selatan, Kota Tomohon, Sulawesi Utara</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Map actions */}
        <div className="p-4 bg-gray-50 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex gap-3">
              <span className="text-sm text-gray-500 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                1.3019° N, 124.8421° E
              </span>
              <span className="text-sm text-gray-500 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                15 menit dari pusat kota
              </span>
            </div>
            <motion.a
              href="https://www.google.com/maps/place/Walian,+Kec.+Tomohon+Sel.,+Kota+Tomohon,+Sulawesi+Utara/@1.3018996,124.8420725,19z/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm text-babyBlue-dark flex items-center hover:text-babyBlue-dark/80 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Lihat di Google Maps
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </motion.a>
          </div>
        </div>
      </motion.div>
      
      <div className="mt-4 text-sm text-gray-500">
        <p className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-forest" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          Tersedia tempat parkir gratis untuk pengunjung
        </p>
      </div>
    </div>
  );
};

export default LocationMap;