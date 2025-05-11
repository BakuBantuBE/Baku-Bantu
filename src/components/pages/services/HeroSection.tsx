// src/components/pages/services/HeroSection.tsx
import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

const HeroSection = () => {
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

  const imageVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1, 
      transition: { 
        duration: 1, 
        ease: [0.4, 0, 0.2, 1],
        delay: 0.2
      } 
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

  const services = [
    {
      name: "Pendidikan",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M12 14l9-5-9-5-9 5 9 5z" />
          <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
        </svg>
      ),
      color: "babyBlue"
    },
    {
      name: "Kesehatan",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      color: "poppy"
    },
    {
      name: "Pengembangan",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
        </svg>
      ),
      color: "forest"
    },
    {
      name: "Dukungan",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      color: "lavender"
    }
  ];

  return (
    <section className="relative min-h-screen flex items-center py-16 lg:py-0 overflow-hidden bg-gradient-to-b from-gray-50 to-white">
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
              <p className="text-sm uppercase tracking-wider font-semibold text-poppy">LAYANAN KAMI</p>
            </motion.div>
            
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-babyBlue-dark via-poppy to-forest"
              variants={itemVariants}
            >
              Solusi <span className="text-gray-900">Berkelanjutan</span><br className="hidden md:block" /> Untuk Komunitas
            </motion.h1>
            
            <motion.p 
              className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed"
              variants={itemVariants}
            >
              BakuBantu hadir dengan berbagai layanan terintegrasi untuk meningkatkan kualitas hidup anak-anak dan masyarakat di Sulawesi Utara.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row flex-wrap gap-4"
              variants={itemVariants}
            >
              <Link href="#main-services">
                <Button 
                  variant="primary" 
                  size="lg" 
                  className="shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 bg-gradient-to-r from-babyBlue to-babyBlue-dark"
                >
                  Jelajahi Layanan
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Button>
              </Link>
              <Link href="#eligibility">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-gray-300 hover:border-babyBlue-dark hover:text-babyBlue-dark"
                >
                  Siapa yang Berhak?
                </Button>
              </Link>
            </motion.div>

            {/* Service categories */}
            <motion.div 
              className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-3"
              variants={itemVariants}
            >
              {services.map((service, index) => (
                <motion.div 
                  key={index}
                  className={`bg-white p-4 rounded-xl shadow-sm border border-gray-100 text-center hover:shadow-md hover:border-${service.color} transition-all duration-300`}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <div className={`w-12 h-12 mx-auto rounded-full bg-${service.color}-light/30 flex items-center justify-center mb-2`}>
                    <span className={`text-${service.color}-dark`}>{service.icon}</span>
                  </div>
                  <p className="text-sm font-medium">{service.name}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
          
          {/* Right content - 3D-like image composition */}
          <motion.div 
            className="relative lg:h-[600px] hidden lg:block"
            variants={imageVariants}
          >
            <motion.div 
              className="absolute top-0 right-0 w-[420px] h-[280px] rounded-2xl overflow-hidden shadow-2xl z-20"
              variants={floatAnimation}
              animate="animate"
              initial="initial"
            >
              <Image 
                src="/images/hero-service3.JPG" 
                alt="Pendidikan Anak" 
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-babyBlue-dark/60 to-transparent flex items-end">
                <div className="p-4">
                  <h3 className="text-white font-bold">Program Pendidikan</h3>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="absolute bottom-0 left-0 w-[380px] h-[250px] rounded-2xl overflow-hidden shadow-2xl z-10"
              variants={floatAnimation}
              animate="animate"
              initial="initial"
              transition={{ 
                repeat: Infinity, 
                duration: 5, 
                ease: "easeInOut",
                delay: 0.5 
              }}
            >
              <Image 
                src="/images/hero-service1.JPG" 
                alt="Kesehatan Anak" 
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-poppy-dark/60 to-transparent flex items-end">
                <div className="p-4">
                  <h3 className="text-white font-bold">Kesehatan</h3>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="absolute top-[160px] left-[60px] w-[300px] h-[200px] rounded-2xl overflow-hidden shadow-2xl z-30"
              variants={floatAnimation}
              animate="animate"
              initial="initial"
              transition={{ 
                repeat: Infinity, 
                duration: 4, 
                ease: "easeInOut",
                delay: 1 
              }}
            >
              <Image 
                src="/images/hero-service4.JPG" 
                alt="Pengembangan Keterampilan" 
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-dark/60 to-transparent flex items-end">
                <div className="p-4">
                  <h3 className="text-white font-bold">Pelatihan Keterampilan</h3>
                </div>
              </div>
            </motion.div>

            {/* Decorative elements */}
            <div className="absolute top-[50px] left-[30px] w-[80px] h-[80px] rounded-full bg-lavender-light/30 z-0"></div>
            <div className="absolute bottom-[70px] right-[40px] w-[60px] h-[60px] rounded-full bg-mango-light/30 z-0"></div>
            <div className="absolute top-[280px] right-[80px] w-[40px] h-[40px] rounded-full bg-poppy-light/30 z-0"></div>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-10 left-0 right-0 flex justify-center"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 2, repeat: Infinity, repeatType: "reverse" }}
      >
        <Link href="#main-services" className="text-gray-700 flex flex-col items-center">
          <span className="mb-2 text-sm font-light">Scroll untuk melihat layanan</span>
          <div className="w-8 h-12 rounded-full border-2 border-gray-400 flex justify-center pt-2">
            <motion.div 
              className="w-1 h-2 bg-gray-400 rounded-full"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
        </Link>
      </motion.div>
    </section>
  );
};

export default HeroSection;