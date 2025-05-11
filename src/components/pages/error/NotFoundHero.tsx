// src/components/pages/error/NotFoundHero.tsx
import React, { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useAnimation } from 'framer-motion';
import { Button } from '@/components/ui/Button';

const NotFoundHero = () => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start("visible");
  }, [controls]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] }
    },
  };

  const floatAnimation = {
    initial: { y: 0 },
    animate: { 
      y: [-10, 10, -10], 
      transition: { 
        repeat: Infinity, 
        duration: 6, 
        ease: "easeInOut" 
      } 
    }
  };

  return (
    <section className="relative min-h-[70vh] flex items-center py-16 lg:py-0 overflow-hidden bg-gradient-to-b from-gray-50 to-white">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute top-0 -right-80 w-[800px] h-[800px] bg-babyBlue/5 rounded-full"></div>
        <div className="absolute top-40 -left-40 w-[600px] h-[600px] bg-poppy/5 rounded-full"></div>
        <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-lavender/5 rounded-full"></div>
        <div className="absolute -bottom-20 left-[20%] w-[200px] h-[200px] bg-forest/5 rounded-full"></div>
      </div>

      <div className="container mx-auto px-6 relative">
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {/* Left content */}
          <div className="lg:pr-8">
            <motion.div className="flex items-center mb-6" variants={itemVariants}>
              <div className="w-12 h-1 bg-poppy rounded-full mr-4"></div>
              <p className="text-sm uppercase tracking-wider font-semibold text-poppy">HALAMAN TIDAK DITEMUKAN</p>
            </motion.div>
            
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-babyBlue-dark via-poppy to-forest"
              variants={itemVariants}
            >
              Oops! <span className="text-gray-900">Sepertinya</span><br className="hidden md:block" /> Anda Tersesat
            </motion.h1>
            
            <motion.p 
              className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed"
              variants={itemVariants}
            >
              Halaman yang Anda cari tidak dapat ditemukan. Mungkin alamatnya berubah atau halaman tidak tersedia lagi.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row flex-wrap gap-4"
              variants={itemVariants}
            >
              <Link href="/">
                <Button 
                  variant="primary" 
                  size="lg" 
                  className="shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 bg-gradient-to-r from-babyBlue to-babyBlue-dark"
                >
                  Kembali ke Beranda
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                  </svg>
                </Button>
              </Link>
              <Link href="/contact">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-gray-300 hover:border-babyBlue-dark hover:text-babyBlue-dark"
                >
                  Hubungi Kami
                </Button>
              </Link>
            </motion.div>
          </div>
          
          {/* Right content - 404 illustration */}
          <motion.div 
            className="relative flex justify-center items-center"
            variants={itemVariants}
          >
            <motion.div 
              className="relative w-full max-w-md"
              variants={floatAnimation}
              animate="animate"
              initial="initial"
            >
              <div className="relative h-80 w-80 mx-auto">
                <svg className="w-full h-full" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="100" cy="100" r="80" fill="#E1C5DF" opacity="0.5" />
                  <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontSize="64" fontWeight="bold" fill="#B383B0">404</text>
                  <g transform="translate(100, 130)">
                    <path d="M-40,0 C-30,10 -10,15 0,15 C10,15 30,10 40,0" fill="none" stroke="#EE5A36" strokeWidth="4" strokeLinecap="round" />
                  </g>
                  <circle cx="70" cy="80" r="8" fill="#9FC4E8" />
                  <circle cx="130" cy="80" r="8" fill="#9FC4E8" />
                </svg>
              </div>
              
              {/* Decorative circles */}
              <div className="absolute top-0 -left-10 w-20 h-20 bg-poppy/10 rounded-full"></div>
              <div className="absolute bottom-10 -right-10 w-32 h-32 bg-babyBlue/10 rounded-full"></div>
              <div className="absolute top-20 right-0 w-16 h-16 bg-forest/10 rounded-full"></div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default NotFoundHero;