// src/components/pages/donation/ImpactSection.tsx
"use client";

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import CountUp from 'react-countup';

const ImpactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

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

  // Impact stories data
  const impactStories = [
    {
      id: 1,
      title: "Panti Asuhan Kasih Sayang",
      description: "Berkat donasi dari para donatur, kami dapat merenovasi fasilitas tempat tinggal dan belajar untuk 35 anak di Panti Asuhan Kasih Sayang di Manado.",
      image: "/images/cta-background.jpeg",
      stats: {
        value: 35,
        label: "Anak terbantu"
      }
    },
    {
      id: 2,
      title: "Program Beasiswa Pendidikan",
      description: "Melalui program beasiswa, 28 anak-anak dari keluarga tidak mampu dapat melanjutkan pendidikan menengah dan kejuruan dengan biaya penuh.",
      image: "/images/hero-service3.JPG",
      stats: {
        value: 28,
        label: "Penerima beasiswa"
      }
    },
    {
      id: 3,
      title: "Layanan Kesehatan Gratis",
      description: "Kami menyelenggarakan layanan kesehatan gratis yang telah menjangkau lebih dari 300 anak dan lansia di daerah terpencil Sulawesi Utara.",
      image: "/images/about_us_01.jpeg",
      stats: {
        value: 300,
        label: "Penerima layanan"
      }
    }
  ];

  return (
    <section id="impact" className="py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        <motion.div 
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeIn}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Dampak <span className="text-forest">Nyata</span> Donasi Anda
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Lihat bagaimana kontribusi Anda telah membantu mengubah kehidupan anak-anak dan komunitas di Sulawesi Utara.
          </p>
        </motion.div>

        {/* Impact Stats */}
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-20">
          <motion.div 
            className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <div className="mb-4 inline-flex rounded-full bg-babyBlue-light/30 p-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-babyBlue-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-4xl font-bold text-gray-900 mb-2">
              {isInView && <CountUp end={15} duration={2.5} suffix="+" />}
            </h3>
            <p className="text-gray-600">Panti Asuhan Terbantu</p>
          </motion.div>

          <motion.div 
            className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <div className="mb-4 inline-flex rounded-full bg-lavender-light/30 p-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-lavender-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="text-4xl font-bold text-gray-900 mb-2">
              {isInView && <CountUp end={250} duration={2.5} suffix="+" />}
            </h3>
            <p className="text-gray-600">Anak Mendapat Pendidikan</p>
          </motion.div>

          <motion.div 
            className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <div className="mb-4 inline-flex rounded-full bg-poppy-light/30 p-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-poppy-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 className="text-4xl font-bold text-gray-900 mb-2">
              {isInView && <CountUp end={520} duration={2.5} separator="," />}
            </h3>
            <p className="text-gray-600">Pemberi Donasi</p>
          </motion.div>

          <motion.div 
            className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.4, delay: 0.4 }}
          >
            <div className="mb-4 inline-flex rounded-full bg-mango-light/30 p-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-mango-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-4xl font-bold text-gray-900 mb-2">
              {isInView && (
                <>
                  Rp<CountUp end={150} duration={2.5} separator="," />jt
                </>
              )}
            </h3>
            <p className="text-gray-600">Total Donasi Terkumpul</p>
          </motion.div>
        </div>

        {/* Impact Stories */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={stagger}
        >
          {impactStories.map((story) => (
            <motion.div 
              key={story.id}
              className="bg-white rounded-xl overflow-hidden shadow-lg"
              variants={fadeIn}
            >
              <div className="relative h-56">
                <Image
                  src={story.image}
                  alt={story.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-0 left-0 bg-forest text-white py-1 px-4 rounded-tr-lg">
                  <div className="flex items-center">
                    <span className="text-2xl font-bold mr-2">{story.stats.value}</span>
                    <span className="text-xs">{story.stats.label}</span>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3">{story.title}</h3>
                <p className="text-gray-600">{story.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Testimonial */}
        <motion.div
          className="mt-16 bg-gradient-to-r from-babyBlue-light/30 to-lavender-light/30 p-8 md:p-12 rounded-2xl relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-poppy/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-forest/10 rounded-full blur-3xl"></div>
          
          <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
            <div className="md:w-1/3 flex-shrink-0">
              <div className="rounded-full overflow-hidden w-32 h-32 mx-auto md:w-40 md:h-40 border-4 border-white shadow-lg">
                <Image
                  src="/images/testimoni.JPG"
                  alt="Ibu Maria"
                  width={160}
                  height={160}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            <div className="md:w-2/3">
              <svg className="h-10 w-10 text-gray-300 mb-4" fill="currentColor" viewBox="0 0 32 32">
                <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
              </svg>
              <blockquote className="text-xl italic text-gray-800 mb-6">
                "Berkat dukungan dari BakuBantu, anak-anak kami sekarang memiliki harapan baru. Mereka dapat belajar dengan fasilitas yang layak, mendapatkan makanan bergizi setiap hari, dan yang terpenting, mereka dapat bermimpi kembali tentang masa depan yang lebih baik."
              </blockquote>
              <div>
                <h4 className="text-lg font-bold">Ibu Maria Lomboto</h4>
                <p className="text-gray-600">Pengurus Panti Asuhan Kasih Sayang, Manado</p>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default ImpactSection;