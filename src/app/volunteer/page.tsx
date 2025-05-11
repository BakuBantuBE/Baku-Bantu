// src/app/volunteer/page.tsx
"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Header, Footer } from '@/components/common';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';

export default function VolunteerPage() {
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

  

  // Bagian hero section dengan latar belakang video/image
  const HeroSection = () => {
    return (
      <section className="relative min-h-screen flex items-center">
        {/* Background image/video dengan overlay gradient */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/cta-background.jpeg" 
            alt="Relawan BakuBantu" 
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent"></div>
        </div>

        {/* Hero content */}
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              className="text-white"
              initial="hidden"
              animate="visible"
              variants={fadeIn}
            >
              <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
                Jadilah Bagian Dari<br />
                <span className="text-babyBlue">Perubahan</span> Di <span className="text-poppy">BakuBantu</span>
              </h1>
              
              <p className="text-xl mb-8 text-gray-200">
                Bergabunglah bersama kami untuk menciptakan dampak positif bagi masyarakat yang membutuhkan. Setiap tangan yang membantu membuat perbedaan.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Link href="/register/volunteer">
                  <Button 
                    variant="primary" 
                    size="lg" 
                    className="shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
                  >
                    Daftar Sekarang
                  </Button>
                </Link>
                <Link href="#programs">
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="border-white text-white hover:bg-white/20"
                  >
                    Lihat Program
                  </Button>
                </Link>
              </div>
            </motion.div>
            
            <motion.div 
              className="hidden lg:block"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="relative">
                <div className="absolute -top-6 -left-6 w-64 h-64 bg-poppy/20 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-6 -right-6 w-64 h-64 bg-babyBlue/20 rounded-full blur-3xl"></div>
                <div className="relative bg-white/10 backdrop-blur-sm p-6 rounded-2xl shadow-2xl border border-white/20">
                  <Image 
                    src="/images/cta-background.jpeg" 
                    alt="Relawan BakuBantu" 
                    width={500} 
                    height={500}
                    className="rounded-lg"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-10 left-0 right-0 flex justify-center"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1, repeat: Infinity, repeatType: "reverse" }}
        >
          <Link href="#stats" className="text-white flex flex-col items-center">
            <span className="mb-2 text-sm font-light">Scroll ke bawah</span>
            <svg className="w-6 h-6 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </Link>
        </motion.div>
      </section>
    );
  };

  // Stats section yang menampilkan angka-angka
  const StatsSection = () => {
    return (
      <section id="stats" className="py-20 bg-gradient-to-b from-black to-gray-900 text-white">
        <div className="container mx-auto px-6">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
          >
            <motion.div 
              className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 shadow-xl"
              variants={fadeIn}
            >
              <h3 className="text-5xl font-bold text-babyBlue mb-2">
                <CountUp end={250} duration={2.5} enableScrollSpy />+
              </h3>
              <p className="text-xl text-gray-300">Relawan Aktif</p>
            </motion.div>
            
            <motion.div 
              className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 shadow-xl"
              variants={fadeIn}
            >
              <h3 className="text-5xl font-bold text-poppy mb-2">
                <CountUp end={5000} duration={2.5} enableScrollSpy />+
              </h3>
              <p className="text-xl text-gray-300">Jam Sukarela</p>
            </motion.div>
            
            <motion.div 
              className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 shadow-xl"
              variants={fadeIn}
            >
              <h3 className="text-5xl font-bold text-mango mb-2">
                <CountUp end={35} duration={2.5} enableScrollSpy />+
              </h3>
              <p className="text-xl text-gray-300">Proyek Terlaksana</p>
            </motion.div>
          </motion.div>
        </div>
      </section>
    );
  };

  // Why Volunteer Section dengan desain yang lebih menarik
  const WhyVolunteerSection = () => {
    const reasons = [
      {
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-poppy" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        ),
        title: "Dampak Langsung",
        description: "Berkontribusi secara langsung pada kehidupan masyarakat yang membutuhkan dan menyaksikan perubahan positif yang terjadi berkat bantuan Anda."
      },
      {
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-babyBlue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        ),
        title: "Jaringan Sosial",
        description: "Bertemu dengan orang-orang baru yang memiliki semangat dan nilai yang sama untuk menciptakan perubahan positif di masyarakat."
      },
      {
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-mango" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        ),
        title: "Pengembangan Keterampilan",
        description: "Memperoleh dan mengembangkan berbagai keterampilan baru, dari komunikasi hingga manajemen proyek, dalam lingkungan yang mendukung."
      },
      {
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-lavender" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        ),
        title: "Pengalaman Bermakna",
        description: "Merasakan kebahagiaan dan kepuasan pribadi yang mendalam dari tindakan membantu orang lain dan membuat perbedaan nyata."
      }
    ];
    
    return (
      <section className="py-24 bg-gradient-to-br from-white to-gray-50">
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeIn}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Mengapa <span className="text-babyBlue-dark">Menjadi Relawan?</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Menjadi relawan di BakuBantu tidak hanya memberi dampak bagi mereka yang membutuhkan, tetapi juga memberikan pengalaman berharga bagi Anda.
            </p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={stagger}
          >
            {reasons.map((reason, index) => (
              <motion.div 
                key={index}
                className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300"
                variants={fadeIn}
              >
                <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                  {reason.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{reason.title}</h3>
                <p className="text-gray-600">{reason.description}</p>
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div 
            className="text-center mt-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeIn}
          >
            <Link href="/register/volunteer">
              <Button 
                variant="primary" 
                size="lg"
                className="shadow-md hover:shadow-lg transition-all"
              >
                Daftar Sebagai Relawan
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    );
  };

  // Program Relawan section dengan card yang lebih interaktif
  const ProgramsSection = () => {
    const [activeTab, setActiveTab] = useState(0);
    
    const programs = [
      {
        title: "Pengajar Sukarelawan",
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-babyBlue" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
          </svg>
        ),
        description: "Berbagi pengetahuan dan keterampilan dengan mengajar anak-anak di panti asuhan dalam berbagai mata pelajaran.",
        commitment: "4-8 jam per minggu",
        requirements: ["Pendidikan minimal SMA/sederajat", "Memiliki kemampuan komunikasi yang baik", "Sabar dan suka dengan anak-anak"],
        image: "/images/cta-background.jpeg"
      },
      {
        title: "Kesehatan & Kebersihan",
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-poppy" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M7 2a1 1 0 00-.707 1.707L7 4.414v3.758a1 1 0 01-.293.707l-4 4C.817 14.769 2.156 18 4.828 18h10.343c2.673 0 4.012-3.231 2.122-5.121l-4-4A1 1 0 0113 8.172V4.414l.707-.707A1 1 0 0013 2H7zm2 6.172V4h2v4.172a3 3 0 00.879 2.12l1.027 1.028a4 4 0 00-2.171.102l-.47.156a4 4 0 01-2.53 0l-.563-.187a1.993 1.993 0 00-.114-.035l1.063-1.063A3 3 0 009 8.172z" clipRule="evenodd" />
          </svg>
        ),
        description: "Membantu dalam memberikan edukasi dan praktik kesehatan serta kebersihan untuk anak-anak dan masyarakat.",
        commitment: "6-10 jam per minggu",
        requirements: ["Latar belakang kedokteran/keperawatan adalah nilai plus", "Memahami dasar-dasar PHBS", "Bisa bekerja dalam tim"],
        image: "/images/cta-background.jpeg"
      },
      {
        title: "Kegiatan Kreativitas",
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-mango" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5 5a3 3 0 015-2.236A3 3 0 0114.83 6H16a2 2 0 110 4h-5V9a1 1 0 10-2 0v1H4a2 2 0 110-4h1.17C5.06 5.687 5 5.35 5 5zm4 1V5a1 1 0 10-1 1h1zm3 0a1 1 0 10-1-1v1h1z" clipRule="evenodd" />
            <path d="M9 11H3v5a2 2 0 002 2h4v-7zM11 18h4a2 2 0 002-2v-5h-6v7z" />
          </svg>
        ),
        description: "Mengadakan kegiatan seni, musik, teater, dan kerajinan tangan untuk mengembangkan kreativitas anak-anak.",
        commitment: "3-6 jam per minggu",
        requirements: ["Memiliki keahlian di bidang seni/musik/teater", "Kreatif dan inovatif", "Energik dan bersemangat"],
        image: "/images/cta-background.jpeg"
      },
      {
        title: "Outreach & Advokasi",
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-lavender" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 3a1 1 0 00-1.447-.894L8.763 6H5a3 3 0 000 6h.28l1.771 5.316A1 1 0 008 18h1a1 1 0 001-1v-4.382l6.553 3.276A1 1 0 0018 15V3z" clipRule="evenodd" />
          </svg>
        ),
        description: "Terlibat dalam kampanye kesadaran dan advokasi untuk isu-isu sosial terkait perlindungan anak dan pendidikan.",
        commitment: "5-8 jam per minggu",
        requirements: ["Kemampuan komunikasi yang sangat baik", "Pemahaman tentang isu sosial", "Kemampuan bekerja dengan beragam pihak"],
        image: "/images/cta-background.jpeg"
      }
    ];

    return (
      <section id="programs" className="py-24 bg-babyBlue-light/20">
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeIn}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Program <span className="text-babyBlue-dark">Relawan</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Pilih program yang sesuai dengan minat, keahlian, dan ketersediaan waktu Anda untuk memberikan kontribusi yang optimal.
            </p>
          </motion.div>
          
          {/* Program tabs */}
          <div className="mb-8">
            <div className="flex flex-wrap justify-center gap-4">
              {programs.map((program, index) => (
                <button
                  key={index}
                  className={`px-6 py-3 rounded-full text-sm font-medium transition-all ${
                    activeTab === index
                      ? 'bg-white shadow-md text-babyBlue-dark border-2 border-babyBlue'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  onClick={() => setActiveTab(index)}
                >
                  {program.title}
                </button>
              ))}
            </div>
          </div>
          
          {/* Program detail card */}
          <motion.div 
            className="bg-white rounded-2xl shadow-xl overflow-hidden"
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-8 lg:p-12">
                <div className="flex items-center mb-6">
                  <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mr-4">
                    {programs[activeTab].icon}
                  </div>
                  <h3 className="text-2xl font-bold">{programs[activeTab].title}</h3>
                </div>
                
                <p className="text-gray-600 mb-6">{programs[activeTab].description}</p>
                
                <div className="mb-6">
                  <h4 className="text-lg font-semibold mb-2">Komitmen Waktu</h4>
                  <p className="text-gray-700 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-babyBlue" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                    {programs[activeTab].commitment}
                  </p>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold mb-2">Persyaratan</h4>
                  <ul className="space-y-2">
                    {programs[activeTab].requirements.map((req, index) => (
                      <li key={index} className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="mt-8">
                  <Link href="/register/volunteer">
                    <Button variant="primary">
                      Daftar Program Ini
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </Button>
                  </Link>
                </div>
              </div>
              
              <div className="relative h-80 lg:h-auto">
                <Image
                  src={programs[activeTab].image}
                  alt={programs[activeTab].title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end">
                  <div className="p-6">
                    <span className="text-white text-sm font-medium bg-poppy px-3 py-1 rounded-full">
                      Program Populer
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    );
  };

  // Testimonial section dengan slider
  const TestimonialsSection = () => {
    const testimonials = [
      {
        quote: "Menjadi relawan di BakuBantu adalah pengalaman terbaik dalam hidup saya. Saya bisa membantu anak-anak mendapatkan pendidikan yang layak sambil mengembangkan keterampilan mengajar saya.",
        author: "Bayu Wijaya",
        role: "Relawan Pengajar, 2 tahun",
        image: "/images/cta-background.jpeg"
      },
      {
        quote: "Program kesehatan BakuBantu sangat terorganisir dengan baik. Saya senang bisa berbagi pengetahuan kesehatan dan melihat perubahan positif dalam kebiasaan hidup sehat di komunitas.",
        author: "Siti Nurhayati",
        role: "Relawan Kesehatan, 1.5 tahun",
        image: "/images/cta-background.jpeg"
      },
      {
        quote: "Kreativitas anak-anak sungguh luar biasa! Menjadi relawan untuk kegiatan seni membuka mata saya akan potensi besar yang mereka miliki. BakuBantu memberikan platform yang tepat untuk mengembangkan bakat mereka.",
        author: "Andi Pratama",
        role: "Relawan Kreatif, 1 tahun",
        image: "/images/cta-background.jpeg"
      }
    ];
    
    return (
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeIn}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Cerita <span className="text-poppy">Relawan</span> Kami
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Dengarkan pengalaman langsung dari para relawan yang telah menjadi bagian dari perubahan di BakuBantu.
            </p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={stagger}
          >
            {testimonials.map((testimonial, index) => (
              <motion.div 
                key={index}
                className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300 flex flex-col h-full"
                variants={fadeIn}
              >
                <div className="mb-8">
                  <svg className="h-10 w-10 text-gray-300" fill="currentColor" viewBox="0 0 32 32">
                    <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                  </svg>
                </div>
                
                <blockquote className="text-gray-600 italic flex-grow">"{testimonial.quote}"</blockquote>
                
                <div className="flex items-center mt-6">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                    <Image 
                      src={testimonial.image} 
                      alt={testimonial.author} 
                      width={48} 
                      height={48} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-semibold">{testimonial.author}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div 
            className="text-center mt-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeIn}
          >
            <Link href="/register/volunteer">
              <Button variant="secondary" size="lg">
                Bergabung Bersama Mereka
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    );
  };

  // FAQ section dengan accordion
  const FAQSection = () => {
    const [openFaqs, setOpenFaqs] = useState<number[]>([]);
    
    const toggleFaq = (index: number) => {
      if (openFaqs.includes(index)) {
        setOpenFaqs(openFaqs.filter(i => i !== index));
      } else {
        setOpenFaqs([...openFaqs, index]);
      }
    };
    
    const faqs = [
      {
        question: "Berapa banyak waktu yang harus saya luangkan sebagai relawan?",
        answer: "BakuBantu menawarkan fleksibilitas dalam komitmen waktu. Anda dapat menjadi relawan secara rutin (mingguan atau bulanan) atau berpartisipasi dalam kegiatan tertentu saja. Minimal komitmen waktu adalah 4 jam per bulan, namun program-program tertentu mungkin memiliki persyaratan waktu yang berbeda."
      },
      {
        question: "Apakah saya perlu memiliki keahlian khusus untuk menjadi relawan?",
        answer: "Tidak selalu. Beberapa program mungkin memerlukan keterampilan tertentu seperti mengajar atau medis, tetapi banyak kegiatan yang tidak memerlukan keahlian khusus. Yang terpenting adalah kesediaan untuk belajar dan membantu. Kami akan memberikan pelatihan yang diperlukan sebelum Anda mulai sebagai relawan."
      },
      {
        question: "Bagaimana proses seleksi relawan dilakukan?",
        answer: "Setelah mendaftar, tim kami akan meninjau aplikasi Anda dan menghubungi Anda untuk wawancara singkat. Selanjutnya, Anda akan mengikuti orientasi dan pelatihan sebelum mulai menjadi relawan aktif. Proses ini biasanya memakan waktu sekitar 2 minggu."
      },
      {
        question: "Apakah ada biaya untuk menjadi relawan?",
        answer: "Tidak ada biaya untuk menjadi relawan BakuBantu. Namun, beberapa kegiatan mungkin memerlukan kontribusi pribadi untuk transportasi atau makan. Kami berusaha memfasilitasi kebutuhan relawan semaksimal mungkin dalam batas kemampuan organisasi."
      },
      {
        question: "Dapatkah saya mengajak teman atau keluarga untuk menjadi relawan bersama?",
        answer: "Tentu! Kami mendorong partisipasi kelompok dan keluarga. Beberapa program kami khusus dirancang untuk kegiatan kelompok. Anda dapat mendaftar bersama-sama dan kami akan berusaha menempatkan Anda pada program yang sama jika memungkinkan."
      },
      {
        question: "Apakah saya akan mendapatkan sertifikat sebagai relawan?",
        answer: "Ya, BakuBantu memberikan sertifikat pengakuan kepada relawan yang telah berpartisipasi selama minimal 3 bulan atau 20 jam kegiatan. Sertifikat ini dapat Anda gunakan untuk memperkaya CV atau portofolio Anda."
      },
    ];
    
    return (
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeIn}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Pertanyaan <span className="text-forest">Umum</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Berikut adalah beberapa pertanyaan yang sering ditanyakan tentang program relawan kami.
            </p>
          </motion.div>
          
          <motion.div 
            className="max-w-3xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={stagger}
          >
            {faqs.map((faq, index) => (
              <motion.div 
                key={index}
                className="mb-4"
                variants={fadeIn}
              >
                <button
                  className={`w-full text-left p-6 rounded-xl bg-white shadow-md hover:shadow-lg transition-all flex justify-between items-center ${
                    openFaqs.includes(index) ? 'bg-white' : 'bg-white'
                  }`}
                  onClick={() => toggleFaq(index)}
                >
                  <h3 className="text-lg font-semibold pr-8">{faq.question}</h3>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-6 w-6 transition-transform duration-300 ${
                      openFaqs.includes(index) ? 'transform rotate-180' : ''
                    }`}
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
                </button>
                
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openFaqs.includes(index) 
                      ? 'max-h-96 opacity-100 mt-2' 
                      : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="p-6 bg-white rounded-xl shadow-md border-t border-gray-100">
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">Masih punya pertanyaan lain?</p>
            <Link href="/contact">
              <Button variant="outline">Hubungi Kami</Button>
            </Link>
          </div>
        </div>
      </section>
    );
  };

  // CTA Section redesigned
  const CTASection = () => {
    return (
      <section className="py-16 bg-gradient-to-r from-poppy to-poppy-dark text-white relative overflow-hidden">
        {/* Ganti div Image dengan background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-poppy-dark/30 to-black/30 mix-blend-overlay"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeIn}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Siap untuk membuat perbedaan?
            </h2>
            <p className="text-xl mb-8 text-white/90">
              Bergabunglah dengan komunitas relawan kami hari ini dan jadilah bagian dari perubahan positif dalam kehidupan mereka yang membutuhkan.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/register/volunteer">
                <Button 
                  variant="secondary" 
                  size="lg" 
                  className="bg-white text-poppy hover:bg-gray-100 w-full sm:w-auto"
                >
                  Daftar Sekarang
                </Button>
              </Link>
              <Link href="#programs">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-white text-white hover:bg-white/20 w-full sm:w-auto"
                >
                  Lihat Program
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    );
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <HeroSection />
        <StatsSection />
        <WhyVolunteerSection />
        <ProgramsSection />
        <TestimonialsSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  )};