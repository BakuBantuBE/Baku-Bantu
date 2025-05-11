// src/components/pages/what-we-do/ProcessSection.tsx
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface ProcessStep {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  bgColor: string;
  iconBgColor: string;
  iconColor: string;
}

const ProcessSection = () => {
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const stagger = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const steps: ProcessStep[] = [
    {
      id: 1,
      title: "Identifikasi Kebutuhan",
      description: "Kami mengidentifikasi kebutuhan anak-anak dan komunitas melalui asesmen menyeluruh untuk memastikan program yang tepat sasaran.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      ),
      bgColor: "bg-lavender/10",
      iconBgColor: "bg-lavender",
      iconColor: "text-white"
    },
    {
      id: 2,
      title: "Perencanaan Program",
      description: "Berdasarkan kebutuhan yang teridentifikasi, kami merancang program yang komprehensif dengan target dan metrik yang jelas.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      ),
      bgColor: "bg-babyBlue/10",
      iconBgColor: "bg-babyBlue",
      iconColor: "text-white"
    },
    {
      id: 3,
      title: "Mobilisasi Sumber Daya",
      description: "Kami mengumpulkan sumber daya yang diperlukan, baik dana, relawan, maupun kemitraan dengan organisasi lain.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      bgColor: "bg-mango/10",
      iconBgColor: "bg-mango",
      iconColor: "text-white"
    },
    {
      id: 4,
      title: "Implementasi",
      description: "Kami menjalankan program sesuai dengan rencana yang telah disusun, dengan tim yang terlatih dan berpengalaman.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      bgColor: "bg-poppy/10",
      iconBgColor: "bg-poppy",
      iconColor: "text-white"
    },
    {
      id: 5,
      title: "Monitoring & Evaluasi",
      description: "Kami terus memantau dan mengevaluasi program untuk memastikan efektivitas dan dampak yang berkelanjutan.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      bgColor: "bg-forest/10",
      iconBgColor: "bg-forest",
      iconColor: "text-white"
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
          <span className="text-sm uppercase tracking-wider font-semibold text-babyBlue">PROSES KERJA</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-2 mb-6">
            Bagaimana Kami <span className="text-babyBlue">Bekerja</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Kami mengikuti pendekatan sistematis untuk memastikan bahwa setiap program 
            memberikan dampak yang maksimal dan berkelanjutan.
          </p>
        </motion.div>

        {/* Process Steps Visualization - Desktop */}
        <div className="hidden lg:block relative mb-12">
          
          {/* Process Steps */}
          <div className="grid grid-cols-5 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                className="flex flex-col items-center relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <motion.div 
                  className={`w-16 h-16 ${step.iconBgColor} rounded-full flex items-center justify-center ${step.iconColor} shadow-lg relative z-10`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {step.icon}
                </motion.div>
                
                <div className="text-center mt-6">
                  <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-600">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Process Steps - Mobile */}
        <div className="lg:hidden space-y-6">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              className={`${step.bgColor} rounded-xl p-6 shadow-md`}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="flex items-start gap-4">
                <div className={`flex-shrink-0 w-14 h-14 ${step.iconBgColor} rounded-full flex items-center justify-center ${step.iconColor}`}>
                  {step.icon}
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                  <p className="text-gray-600 text-sm">{step.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Visual representation with steps detail cards */}
        <div className="mt-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Image
                src="/images/project-3.jpg"
                alt="Proses Kerja BakuBantu"
                width={600}
                height={400}
                className="rounded-xl shadow-lg object-cover w-full h-[400px]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent rounded-xl"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                  <h3 className="text-white text-lg font-bold mb-2">Pendekatan Holistik</h3>
                  <p className="text-white/90 text-sm">
                    Kami memastikan program kami memperhatikan berbagai aspek kehidupan anak-anak untuk perkembangan yang seimbang.
                  </p>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              className="space-y-6"
              initial="hidden"
              whileInView="visible"
              variants={stagger}
              viewport={{ once: true }}
            >
              <motion.div 
                className="bg-white rounded-lg p-6 shadow-md border border-gray-100"
                variants={fadeIn}
              >
                <h3 className="font-bold text-xl mb-3">Mengapa Proses Ini Penting?</h3>
                <p className="text-gray-600">
                  Pendekatan sistematis kami memastikan bahwa setiap program dirancang dengan baik, 
                  dilaksanakan secara efektif, dan terus dipantau untuk hasil yang optimal.
                </p>
              </motion.div>
              
              <motion.div 
                className="bg-white rounded-lg p-6 shadow-md border border-gray-100"
                variants={fadeIn}
              >
                <h3 className="font-bold text-xl mb-3">Tim Profesional</h3>
                <p className="text-gray-600">
                  Program kami didukung oleh tim profesional dari berbagai bidang keahlian yang 
                  bekerja bersama untuk mendukung perkembangan anak-anak.
                </p>
                <div className="mt-4 flex items-center gap-2">
                  <span className="px-3 py-1 bg-babyBlue/10 text-babyBlue-dark text-xs font-medium rounded-full">Pendidikan</span>
                  <span className="px-3 py-1 bg-lavender/10 text-lavender-dark text-xs font-medium rounded-full">Kesehatan</span>
                  <span className="px-3 py-1 bg-forest/10 text-forest-dark text-xs font-medium rounded-full">Psikologi</span>
                </div>
              </motion.div>
              
              <motion.div 
                className="bg-white rounded-lg p-6 shadow-md border border-gray-100"
                variants={fadeIn}
              >
                <h3 className="font-bold text-xl mb-3">Hasil Nyata</h3>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-babyBlue">95%</div>
                    <p className="text-xs text-gray-600">Tingkat Kelulusan</p>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-forest">85%</div>
                    <p className="text-xs text-gray-600">Melanjutkan Pendidikan</p>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-poppy">90%</div>
                    <p className="text-xs text-gray-600">Kepuasan Program</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;