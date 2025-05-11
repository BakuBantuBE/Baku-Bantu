// src/components/pages/donation/FAQSection.tsx
"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

const FAQSection = () => {
  const [openFaqs, setOpenFaqs] = useState<number[]>([0]); // First FAQ is open by default
  
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  // Toggle FAQ
  const toggleFaq = (index: number) => {
    if (openFaqs.includes(index)) {
      setOpenFaqs(openFaqs.filter(i => i !== index));
    } else {
      setOpenFaqs([...openFaqs, index]);
    }
  };

  // FAQ data
  const faqs = [
    {
      question: "Bagaimana cara saya berdonasi melalui Baku Bantu?",
      answer: "Anda dapat berdonasi melalui platform Saweria dengan mengklik tombol 'Donasi Sekarang' di halaman ini. Kami menerima berbagai metode pembayaran seperti transfer bank, e-wallet, QRIS, dan kartu kredit. Setelah mengisi informasi yang diperlukan, Anda akan diarahkan ke halaman pembayaran yang aman."
    },
    {
      question: "Apakah donasi saya akan mendapatkan tanda bukti atau kuitansi?",
      answer: "Ya, setiap donasi akan mendapatkan tanda bukti elektronik yang akan dikirimkan ke email Anda. Tanda bukti ini berisi informasi donasi seperti jumlah, tanggal, dan kode referensi unik untuk pelacakan."
    },
    {
      question: "Bagaimana saya bisa memastikan donasi saya digunakan dengan tepat?",
      answer: "Kami berkomitmen pada transparansi penuh. Anda dapat mengakses laporan keuangan dan laporan dampak program kami di website ini. Semua dana yang kami terima diaudit oleh auditor independen, dan hasilnya dipublikasikan secara berkala. Kami juga mengirimkan update kepada para donatur tentang program-program yang didanai dari donasi mereka."
    },
    {
      question: "Apakah donasi saya akan mendapatkan keringanan pajak?",
      answer: "Saat ini Baku Bantu sedang dalam proses untuk mendapatkan status organisasi yang memenuhi syarat untuk keringanan pajak. Untuk informasi terbaru mengenai status ini, silakan hubungi tim kami melalui email atau telepon yang tercantum di halaman Kontak."
    },
    {
      question: "Dapatkah saya menjadi donatur rutin?",
      answer: "Tentu! Kami memiliki program 'Sahabat Baku Bantu' untuk donatur rutin. Anda dapat memilih untuk berdonasi secara bulanan dengan jumlah tetap. Program ini membantu kami merencanakan dan menjalankan program-program jangka panjang dengan lebih efektif. Anda dapat mendaftar untuk program ini melalui halaman Donasi dengan memilih opsi 'Donasi Bulanan'."
    },
    {
      question: "Bagaimana saya bisa berdonasi selain dalam bentuk uang?",
      answer: "Kami juga menerima donasi dalam bentuk barang seperti buku, pakaian, mainan, dan perlengkapan sekolah. Untuk donasi barang, silakan hubungi tim kami terlebih dahulu melalui email atau telepon untuk mengatur waktu dan tempat pengiriman. Kami juga memiliki program 'Donasi Keahlian' di mana Anda dapat menyumbangkan waktu dan keahlian Anda untuk membantu program-program kami."
    },
    {
      question: "Apakah saya bisa menentukan program spesifik untuk donasi saya?",
      answer: "Ya, kami menyediakan opsi bagi Anda untuk mengarahkan donasi ke program spesifik seperti pendidikan, kesehatan, atau infrastruktur. Pada formulir donasi, Anda dapat memilih kategori program yang ingin Anda dukung. Jika Anda memiliki pertanyaan tentang program spesifik, silakan hubungi tim kami untuk informasi lebih lanjut."
    },
    {
      question: "Apakah transaksi donasi saya aman?",
      answer: "Keamanan transaksi adalah prioritas utama kami. Kami menggunakan platform pembayaran Saweria yang telah terintegrasi dengan sistem keamanan berlapis dan enkripsi data. Semua informasi pribadi dan data pembayaran Anda dilindungi sesuai dengan standar keamanan industri terkini."
    }
  ];

  return (
    <section id="faq" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <motion.div 
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeIn}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Pertanyaan yang Sering <span className="text-mango">Ditanyakan</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Temukan jawaban untuk pertanyaan umum tentang proses donasi dan bagaimana kami menggunakan dana Anda.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <motion.div 
            className="space-y-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeIn}
          >
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden"
              >
                <button
                  className="w-full flex justify-between items-center p-6 text-left focus:outline-none transition-colors"
                  onClick={() => toggleFaq(index)}
                  aria-expanded={openFaqs.includes(index)}
                >
                  <h3 className="text-lg font-semibold pr-8">{faq.question}</h3>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors duration-300 ${
                    openFaqs.includes(index) 
                      ? 'bg-mango text-white rotate-180' 
                      : 'bg-gray-200 text-gray-500'
                  }`}>
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-4 w-4 transition-transform duration-300" 
                      viewBox="0 0 20 20" 
                      fill="currentColor"
                    >
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </button>
                
                <AnimatePresence>
                  {openFaqs.includes(index) && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-6 text-gray-600 border-t border-gray-100 pt-3">
                        <p>{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </motion.div>
          
          {/* Additional Support */}
          <motion.div 
            className="mt-12 bg-babyBlue-light/20 p-8 rounded-xl text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeIn}
          >
            <h3 className="text-xl font-semibold mb-4">Masih punya pertanyaan?</h3>
            <p className="text-gray-600 mb-6">
              Jika Anda tidak menemukan jawaban yang Anda cari, silakan hubungi tim dukungan donatur kami. Kami siap membantu Anda.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/contact">
                <Button variant="primary">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2h2a1 1 0 100-2H9z" clipRule="evenodd" />
                  </svg>
                  Hubungi Kami
                </Button>
              </Link>
              <a href="mailto:bakubantusulut@gmail.com">
                <Button variant="outline">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  Email: bakubantusulut@gmail.com
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;