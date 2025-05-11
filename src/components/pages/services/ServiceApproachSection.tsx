// src/components/pages/services/ServiceApproachSection.tsx
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const ServiceApproachSection = () => {
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
        staggerChildren: 0.2
      }
    }
  };

  // Approach steps
  const approachSteps = [
    {
      title: "Identifikasi Kebutuhan",
      description: "Kami melakukan pemetaan kebutuhan dengan pendekatan berbasis data untuk memahami tantangan nyata yang dihadapi komunitas.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-poppy" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      ),
      color: "poppy"
    },
    {
      title: "Perancangan Program",
      description: "Bersama dengan ahli dan komunitas, kami merancang program yang sesuai dengan konteks lokal dan berkelanjutan.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-babyBlue" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
        </svg>
      ),
      color: "babyBlue"
    },
    {
      title: "Pelaksanaan Kolaboratif",
      description: "Kami melibatkan semua pemangku kepentingan dalam pelaksanaan program untuk memastikan rasa kepemilikan dan efektivitas.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-forest" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      color: "forest"
    },
    {
      title: "Pemantauan & Evaluasi",
      description: "Kami terus memantau dan mengevaluasi program untuk melakukan penyesuaian dan memastikan dampak positif yang berkelanjutan.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-lavender" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      color: "lavender"
    }
  ];

  const principles = [
    {
      title: "Berpusat pada Anak",
      description: "Semua program kami dirancang dengan mengutamakan kepentingan terbaik anak.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-mango" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      )
    },
    {
      title: "Partisipatif",
      description: "Melibatkan penerima manfaat dalam proses pengambilan keputusan.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-poppy" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
        </svg>
      )
    },
    {
      title: "Berbasis Komunitas",
      description: "Mendorong pemberdayaan dan kemandirian komunitas sebagai solusi jangka panjang.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-forest" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      )
    },
    {
      title: "Inklusif",
      description: "Memastikan semua layanan dapat diakses oleh semua orang, termasuk yang berkebutuhan khusus.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-babyBlue" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      )
    }
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-lavender/10 rounded-full blur-3xl -mr-48 -mt-48"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-babyBlue/10 rounded-full blur-3xl -ml-48 -mb-48"></div>

      <div className="container mx-auto px-6 relative">
        <motion.div 
          className="text-center mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeIn}
        >
          <h2 className="text-4xl font-bold mb-4">
            Pendekatan <span className="text-forest">Layanan</span> Kami
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Kami menerapkan metodologi yang komprehensif dan berbasis bukti untuk memastikan layanan kami
            memberikan dampak positif yang berkelanjutan.
          </p>
        </motion.div>

        {/* Approach Steps */}
        <motion.div 
          className="flex flex-col md:flex-row mb-24"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={stagger}
        >
          {approachSteps.map((step, index) => (
            <motion.div 
              key={index}
              className="md:w-1/4 mb-10 md:mb-0 px-4"
              variants={fadeIn}
            >
              <div className="flex flex-col items-center text-center">
                <div className={`w-16 h-16 rounded-full bg-${step.color}-light/30 flex items-center justify-center mb-6`}>
                  {step.icon}
                </div>
                <h3 className={`text-xl font-bold mb-3 text-${step.color}-dark`}>{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
                
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Principles Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            className="order-2 lg:order-1"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeIn}
          >
            <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
              <h3 className="text-2xl font-bold mb-6 text-gray-900">Prinsip Inti Layanan</h3>
              
              <div className="space-y-6">
                {principles.map((principle, index) => (
                  <div key={index} className="flex">
                    <div className="flex-shrink-0 mr-4">
                      <div className="w-14 h-14 bg-gray-50 rounded-xl flex items-center justify-center">
                        {principle.icon}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-lg font-medium mb-2">{principle.title}</h4>
                      <p className="text-gray-600">{principle.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="order-1 lg:order-2"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeIn}
          >
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-64 h-64 bg-poppy/10 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-6 -right-6 w-64 h-64 bg-babyBlue/10 rounded-full blur-3xl"></div>
              
              <div className="relative rounded-2xl overflow-hidden shadow-xl">
                <Image 
                  src="/images/hero-service2.JPG" 
                  alt="BakuBantu Service Approach" 
                  width={600} 
                  height={400}
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                  <div className="p-6">
                    <p className="text-white font-medium">
                      "Kami percaya bahwa prinsip-prinsip ini adalah fondasi untuk menciptakan perubahan yang berarti dan berkelanjutan."
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ServiceApproachSection;