// src/components/pages/contact/ContactHero.tsx
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const ContactHero = () => {
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
    <section className="relative min-h-[90vh] md:min-h-[70vh] flex items-center py-20 md:py-0">
      {/* Background image with overlay gradient */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/images/cta-background.jpeg" 
          alt="Hubungi BakuBantu" 
          fill
          className="object-cover"
          priority
        />
        {/* Improved gradient for better mobile readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/80 to-black/60 md:via-black/70 md:to-black/50"></div>
      </div>

      {/* Decorative floating shapes - hidden on small screens */}
      <motion.div 
        className="absolute right-1/4 top-1/4 w-16 h-16 md:w-20 md:h-20 rounded-full bg-lavender/20 backdrop-blur-sm hidden sm:block"
        initial={{ y: 0 }}
        animate={{ y: [0, -15, 0] }}
        transition={{ repeat: Infinity, duration: 3 }}
      />
      
      <motion.div 
        className="absolute left-1/4 bottom-1/3 w-12 h-12 md:w-16 md:h-16 rounded-full bg-mango/30 backdrop-blur-sm hidden sm:block"
        initial={{ y: 0 }}
        animate={{ y: [0, 15, 0] }}
        transition={{ repeat: Infinity, duration: 4 }}
      />

      {/* Hero content */}
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-3xl">
          <motion.div 
            className="text-white"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            <div className="flex items-center mb-4 md:mb-6">
              <div className="w-8 md:w-12 h-px bg-poppy mr-3 md:mr-4"></div>
              <p className="text-xs md:text-sm uppercase tracking-wider font-semibold text-poppy">HUBUNGI KAMI</p>
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 md:mb-6">
              Mari Bersama <span className="text-babyBlue">Menciptakan</span> <span className="text-poppy">Perubahan</span>
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl mb-6 md:mb-8 text-gray-200 max-w-2xl">
              Kami senang mendengar dari Anda. Ajukan pertanyaan, bagikan ide Anda, atau cari tahu lebih lanjut tentang bagaimana Anda dapat terlibat dengan misi kami.
            </p>
            
            <motion.div 
              className="bg-white/10 backdrop-blur-sm p-4 md:p-6 rounded-xl border border-white/20 w-full sm:w-auto"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                <div className="flex items-center">
                  <div className="bg-babyBlue/30 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs md:text-sm text-gray-300">Telepon kami di</p>
                    <p className="text-sm md:text-base font-medium">+62 853-3715-2513 (Krisan - Lead Coordinator)</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="bg-poppy/30 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs md:text-sm text-gray-300">Email kami di</p>
                    <p className="text-sm md:text-base font-medium">bakubantusulut@gmail.com</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactHero;