// src/components/pages/what-we-do/ImpactSection.tsx
import React from 'react';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import Image from 'next/image';

interface ImpactStat {
  value: number;
  label: string;
  suffix?: string;
  prefix?: string;
  color: string;
  icon: React.ReactNode;
}

const ImpactSection = () => {
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

  const stats: ImpactStat[] = [
    {
      value: 230,
      label: "Anak dalam asuhan kami",
      suffix: "+",
      color: "bg-babyBlue text-babyBlue-dark",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    {
      value: 85,
      label: "Relawan aktif",
      suffix: "%",
      color: "bg-poppy text-poppy-dark",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      )
    },
    {
      value: 45,
      label: "Program yang dijalankan",
      suffix: "+",
      color: "bg-mango text-mango-dark",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      )
    },
    {
      value: 95,
      label: "Tingkat kelulusan",
      suffix: "%",
      color: "bg-forest text-forest-dark",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M12 14l9-5-9-5-9 5 9 5z" />
          <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
        </svg>
      )
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-babyBlue/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-poppy/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeIn}
        >
          <span className="text-sm uppercase tracking-wider font-semibold text-poppy">DAMPAK KAMI</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-2 mb-6">
            Membuat <span className="text-poppy">Perubahan</span> Nyata
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Setiap tahun, kami berupaya meningkatkan dampak positif untuk anak-anak 
            di bawah asuhan kami dan komunitas sekitar.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div 
            className="order-2 md:order-1"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={stagger}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <motion.div 
                  key={index}
                  className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                  variants={fadeIn}
                >
                  <div className={`${stat.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-4`}>
                    {stat.icon}
                  </div>
                  <h3 className="text-4xl font-bold mb-2 flex items-center">
                    {stat.prefix && <span>{stat.prefix}</span>}
                    <CountUp 
                      end={stat.value} 
                      duration={2.5} 
                      enableScrollSpy 
                      scrollSpyDelay={100}
                    />
                    {stat.suffix && <span>{stat.suffix}</span>}
                  </h3>
                  <p className="text-gray-600">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            className="order-1 md:order-2"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-50px" }}
          >
            <div className="bg-white p-6 rounded-2xl shadow-xl relative">
              <div className="absolute top-6 left-6 w-20 h-20 -z-10 bg-lavender/20 rounded-full blur-xl"></div>
              <div className="absolute bottom-6 right-6 w-20 h-20 -z-10 bg-babyBlue/20 rounded-full blur-xl"></div>
              
              <div className="bg-gradient-to-tr from-gray-900 to-gray-800 p-6 rounded-xl text-white mb-6">
                <h3 className="text-xl font-bold mb-4">Komitmen Berkelanjutan</h3>
                <p className="text-gray-300">
                  Kami berkomitmen untuk menyediakan pendidikan berkualitas, 
                  pengasuhan yang penuh perhatian, dan lingkungan yang mendukung 
                  bagi setiap anak dalam asuhan kami.
                </p>
              </div>
              
              <div className="relative h-64 rounded-xl overflow-hidden">
                <Image 
                  src="/images/project-2.jpg" 
                  alt="Dampak Sosial BakuBantu" 
                  fill 
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                  <span className="text-white font-medium">
                    Mendukung masa depan mereka
                  </span>
                </div>
              </div>
              
              <div className="mt-6 space-y-4">
                <div className="flex items-center">
                  <div className="w-12 h-2 rounded-full bg-gray-200 flex-grow">
                    <div className="h-full w-11/12 rounded-full bg-babyBlue"></div>
                  </div>
                  <span className="ml-3 text-sm font-medium text-gray-700">95% Tingkat Kehadiran</span>
                </div>
                <div className="flex items-center">
                  <div className="w-12 h-2 rounded-full bg-gray-200 flex-grow">
                    <div className="h-full w-10/12 rounded-full bg-poppy"></div>
                  </div>
                  <span className="ml-3 text-sm font-medium text-gray-700">90% Penerimaan Beasiswa</span>
                </div>
                <div className="flex items-center">
                  <div className="w-12 h-2 rounded-full bg-gray-200 flex-grow">
                    <div className="h-full w-9/12 rounded-full bg-mango"></div>
                  </div>
                  <span className="ml-3 text-sm font-medium text-gray-700">85% Melanjutkan Pendidikan Tinggi</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ImpactSection;