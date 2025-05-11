// src/components/pages/services/EligibilitySection.tsx
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

const EligibilitySection = () => {
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const eligibilityCards = [
    {
      title: "Anak-anak Yatim Piatu",
      description: "Anak-anak yang kehilangan salah satu atau kedua orang tua, terutama dari keluarga dengan keterbatasan ekonomi.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-poppy" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      priority: "Tinggi",
      priorityColor: "poppy"
    },
    {
      title: "Anak dengan Disabilitas",
      description: "Anak-anak dengan disabilitas fisik, sensorik, intelektual, atau psikososial yang membutuhkan dukungan khusus.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-babyBlue" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      ),
      priority: "Tinggi",
      priorityColor: "poppy"
    },
    {
      title: "Keluarga Prasejahtera",
      description: "Keluarga dengan penghasilan di bawah garis kemiskinan dan akses terbatas ke layanan dasar.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-lavender" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
      priority: "Sedang",
      priorityColor: "mango"
    },
    {
      title: "Korban Bencana",
      description: "Individu dan keluarga yang terdampak bencana alam atau situasi darurat lainnya.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-forest" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      priority: "Tinggi",
      priorityColor: "poppy"
    },
    {
      title: "Komunitas Rentan",
      description: "Komunitas di daerah terpencil dengan akses terbatas ke pendidikan, kesehatan, dan layanan dasar lainnya.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-mango" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      priority: "Sedang",
      priorityColor: "mango"
    },
    {
      title: "Individu dengan Masalah Kesehatan Serius",
      description: "Individu dengan kondisi kesehatan kronis yang membutuhkan perawatan medis berkelanjutan.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-poppy" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      priority: "Tinggi",
      priorityColor: "poppy"
    }
  ];

  return (
    <section id="eligibility" className="py-24 bg-gradient-to-br from-babyBlue-light/20 to-lavender-light/30 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-poppy/5 rounded-full blur-3xl -ml-48 -mt-48"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-mango/5 rounded-full blur-3xl -mr-48 -mb-48"></div>

      <div className="container mx-auto px-6 relative">
        <motion.div 
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeIn}
        >
          <h2 className="text-4xl font-bold mb-4">
            Siapa yang <span className="text-poppy">Berhak</span> Menerima Layanan?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            BakuBantu berkomitmen untuk membantu mereka yang paling membutuhkan. Berikut adalah kriteria 
            penerima layanan kami berdasarkan prioritas kebutuhan.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {eligibilityCards.map((card, index) => (
            <motion.div 
              key={index}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 relative overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-25px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="absolute top-0 right-0">
                <div className={`bg-${card.priorityColor} text-white text-xs px-4 py-1 rounded-bl-lg`}>
                  Prioritas: {card.priority}
                </div>
              </div>
              <div className="flex flex-col items-center text-center mb-4">
                <div className="mb-4 text-center">
                  {card.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{card.title}</h3>
                <p className="text-gray-600">{card.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="mt-16 text-center bg-white p-8 rounded-xl shadow-lg max-w-3xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeIn}
        >
          <h3 className="text-2xl font-bold mb-4">Bagaimana Proses Pengajuan Layanan?</h3>
          <p className="text-gray-600 mb-6">
            Proses pengajuan layanan BakuBantu dirancang untuk memudahkan akses bagi mereka yang membutuhkan. Pendaftaran dapat dilakukan secara langsung atau melalui sistem rujukan.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact">
              <Button variant="primary" className="shadow-md">
                Hubungi Kami
              </Button>
            </Link>
            <Link href="/services/application">
              <Button variant="outline" className="border-babyBlue text-babyBlue-dark">
                Unduh Formulir Pengajuan
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default EligibilitySection;