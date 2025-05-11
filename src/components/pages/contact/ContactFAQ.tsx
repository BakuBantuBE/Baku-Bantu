// src/components/pages/contact/ContactFAQ.tsx
import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';

const ContactFAQ = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "Berapa lama waktu respon untuk pesan yang saya kirim?",
      answer: "Kami berusaha merespon semua pertanyaan dalam waktu 1-2 hari kerja. Untuk pertanyaan yang lebih mendesak, silakan hubungi kami melalui telepon di nomor yang tercantum di halaman ini."
    },
    {
      question: "Bagaimana cara saya mendaftar sebagai relawan?",
      answer: "Anda dapat mendaftar sebagai relawan melalui halaman Relawan pada website kami atau mengirimkan pesan melalui formulir kontak dengan memilih topik 'Informasi Relawan'. Tim kami akan menghubungi Anda dengan informasi lebih lanjut mengenai proses pendaftaran."
    },
    {
      question: "Apakah BakuBantu menerima donasi barang?",
      answer: "Ya, kami menerima donasi barang seperti buku, pakaian, makanan, dan perlengkapan lainnya. Silakan hubungi kami terlebih dahulu untuk informasi mengenai barang yang saat ini dibutuhkan dan proses pengirimannya."
    },
    {
      question: "Bagaimana cara membuat kerjasama dengan BakuBantu?",
      answer: "Untuk kerjasama, Anda dapat mengirimkan proposal kerjasama melalui email ke partnership@bakubantu.id atau mengisi formulir kontak dengan memilih topik 'Kerjasama'. Tim kami akan meninjau proposal Anda dan menghubungi Anda untuk diskusi lebih lanjut."
    },
    {
      question: "Apakah BakuBantu memiliki kantor di luar Manado?",
      answer: "Saat ini kantor pusat kami hanya berada di Manado, Sulawesi Utara. Namun, kami memiliki jaringan relawan dan mitra di beberapa kota lain di Indonesia. Untuk informasi lebih lanjut, silakan hubungi kami."
    }
  ];

  // Animation variants
  const containerAnimation = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  const contentAnimation = {
    hidden: { opacity: 0, height: 0 },
    visible: { 
      opacity: 1, 
      height: "auto",
      transition: { duration: 0.3 }
    },
    exit: {
      opacity: 0,
      height: 0,
      transition: { duration: 0.3 }
    }
  };

  return (
    <section className="py-16 bg-gray-50 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-lavender/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-mango/10 rounded-full blur-3xl -z-10"></div>
      
      <div className="container mx-auto px-6 relative">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Pertanyaan <span className="text-babyBlue-dark">Umum</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Berikut adalah beberapa pertanyaan yang sering ditanyakan. Jika Anda tidak menemukan jawaban untuk pertanyaan Anda, jangan ragu untuk menghubungi kami.
          </p>
        </motion.div>
        
        <motion.div 
          className="max-w-3xl mx-auto"
          variants={containerAnimation}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {faqs.map((faq, index) => (
            <motion.div 
              key={index}
              className="mb-4"
              variants={itemAnimation}
            >
              <button
                className={`w-full text-left p-6 rounded-xl bg-white shadow-md hover:shadow-lg transition-all flex justify-between items-center ${
                  activeIndex === index ? 'bg-white ring-2 ring-babyBlue-light' : 'bg-white'
                }`}
                onClick={() => toggleFaq(index)}
              >
                <h3 className="text-lg font-semibold pr-8">{faq.question}</h3>
                <motion.div
                  animate={{ rotate: activeIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex-shrink-0 bg-${activeIndex === index ? 'babyBlue' : 'gray-100'} rounded-full p-2`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-5 w-5 ${activeIndex === index ? 'text-white' : 'text-gray-500'}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </motion.div>
              </button>
              
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    variants={contentAnimation}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="overflow-hidden"
                  >
                    <div className="p-6 bg-white rounded-b-xl shadow-md border-t border-gray-100">
                      <p className="text-gray-600">{faq.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
        
        <div className="text-center mt-12">
          <motion.div 
            className="inline-block"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="bg-white p-6 rounded-xl shadow-md inline-block">
              <p className="text-gray-600 mb-4">Masih punya pertanyaan lain?</p>
              <Link href="#contact-form">
                <Button variant="primary">
                  Hubungi Kami
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactFAQ;