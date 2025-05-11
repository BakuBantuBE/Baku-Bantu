// src/components/pages/error/SuggestedLinks.tsx
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const SuggestedLinks = () => {
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

  // Popular links to display
  const popularLinks = [
    {
      title: "Tentang Kami",
      description: "Pelajari lebih lanjut tentang BakuBantu dan misi kami",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-lavender" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      href: "/about"
    },
    {
      title: "Layanan Kami",
      description: "Jelajahi berbagai layanan dan program yang kami tawarkan",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-babyBlue" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      ),
      href: "/services"
    },
    {
      title: "Menjadi Relawan",
      description: "Bergabunglah dengan kami dan jadilah bagian dari perubahan",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-poppy" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      href: "/volunteer"
    },
    {
      title: "Kontak",
      description: "Hubungi kami untuk informasi lebih lanjut atau bantuan",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-forest" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      href: "/contact"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <motion.div 
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeIn}
        >
          <h2 className="text-3xl font-bold mb-4">
            Mungkin Anda sedang mencari
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Berikut adalah beberapa halaman populer yang mungkin ingin Anda kunjungi
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={stagger}
        >
          {popularLinks.map((link, index) => (
            <motion.div 
              key={index}
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              variants={fadeIn}
            >
              <Link href={link.href} className="flex flex-col items-center text-center h-full">
                <div className="p-4 rounded-full bg-gray-50 mb-4">
                  {link.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{link.title}</h3>
                <p className="text-gray-600 flex-grow">{link.description}</p>
                <div className="mt-4 text-babyBlue-dark flex items-center">
                  <span className="mr-2">Kunjungi</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="mt-16 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeIn}
        >
          <p className="text-gray-500">
            Jika Anda masih tidak dapat menemukan yang Anda cari, silakan <Link href="/contact" className="text-babyBlue-dark underline">hubungi kami</Link> dan kami akan membantu Anda.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default SuggestedLinks;