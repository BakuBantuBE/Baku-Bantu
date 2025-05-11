// src/components/pages/what-we-do/ServicesSection.tsx
import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';

interface Service {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  image: string;
  color: string;
  details: string[];
}

const ServicesSection = () => {
  const [activeService, setActiveService] = useState<number>(0);

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

  const services: Service[] = [
    {
      id: 1,
      title: "Perawatan & Pengasuhan Anak",
      description: "Menyediakan tempat tinggal yang aman dan nyaman dengan pengasuh yang peduli",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      image: "/images/about_us_01.jpeg",
      color: "from-lavender-light to-lavender text-lavender-dark",
      details: [
        "Tempat tinggal yang aman, bersih, dan nyaman untuk anak-anak",
        "Pengasuh terlatih yang memberikan perhatian dan kasih sayang",
        "Makanan bergizi dan seimbang untuk tumbuh kembang optimal",
        "Pemeriksaan kesehatan rutin dan perawatan medis",
        "Lingkungan yang mendukung perkembangan emosional"
      ]
    },
    {
      id: 2,
      title: "Pendidikan & Pengembangan Diri",
      description: "Memberikan akses pendidikan formal dan pelatihan keterampilan",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M12 14l9-5-9-5-9 5 9 5z" />
          <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
        </svg>
      ),
      image: "/images/services-learning.jpeg",
      color: "from-babyBlue-light to-babyBlue text-babyBlue-dark",
      details: [
        "Pendampingan untuk pendidikan formal di sekolah-sekolah terbaik",
        "Bimbingan belajar dan les tambahan untuk penguatan akademis",
        "Pelatihan komputer dan teknologi informasi",
        "Pengembangan bakat dan minat dalam seni, musik, dan olahraga",
        "Program bahasa asing untuk meningkatkan kemampuan komunikasi"
      ]
    },
    {
      id: 3,
      title: "Kegiatan Sosial & Rekreasi",
      description: "Mengadakan berbagai kegiatan untuk pengembangan sosial dan hiburan",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      image: "/images/project-1.jpg",
      color: "from-mango-light to-mango text-mango-dark",
      details: [
        "Kegiatan olahraga rutin untuk menjaga kesehatan fisik",
        "Kegiatan seni dan kerajinan tangan untuk mengembangkan kreativitas",
        "Program rekreasi dan kunjungan edukatif ke museum, taman, dan destinasi edukasi",
        "Kegiatan komunitas dan bermain bersama untuk membangun keterampilan sosial",
        "Perayaan hari besar dan acara spesial untuk menciptakan kenangan indah"
      ]
    },
    {
      id: 4,
      title: "Bimbingan Rohani & Psikologis",
      description: "Memberikan dukungan spiritual dan kesehatan mental",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      image: "/images/project-3.jpg",
      color: "from-forest-light to-forest text-forest-dark",
      details: [
        "Bimbingan rohani rutin sesuai dengan keyakinan masing-masing anak",
        "Konseling psikologis oleh tenaga profesional",
        "Terapi bagi anak-anak dengan trauma atau masalah emosional",
        "Program pengembangan karakter dan nilai-nilai positif",
        "Pendampingan personal untuk anak-anak dengan kebutuhan khusus"
      ]
    },
    {
      id: 5,
      title: "Program Kemandirian",
      description: "Mempersiapkan anak untuk hidup mandiri saat dewasa",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      image: "/images/project-2.jpg",
      color: "from-poppy-light to-poppy text-poppy-dark",
      details: [
        "Pelatihan keterampilan hidup dasar (memasak, membersihkan, menjaga diri)",
        "Pelatihan keterampilan vokasional untuk persiapan karir",
        "Program magang dan kerja paruh waktu untuk remaja",
        "Bimbingan perencanaan keuangan dan pengelolaan uang",
        "Pendampingan dalam pencarian sekolah lanjutan atau perguruan tinggi"
      ]
    }
  ];

  return (
    <section id="services" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <motion.div 
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeIn}
        >
          <span className="text-sm uppercase tracking-wider font-semibold text-babyBlue-dark">LAYANAN KAMI</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-2 mb-6">
            Bagaimana Kami <span className="text-babyBlue-dark">Membantu</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Kami menyediakan berbagai layanan holistik untuk memastikan anak-anak mendapatkan 
            perawatan, pendidikan, dan dukungan yang mereka butuhkan.
          </p>
        </motion.div>
        
        {/* Service selection */}
        <motion.div 
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={stagger}
        >
          {services.map((service) => (
            <motion.button
              key={service.id}
              className={`px-6 py-4 rounded-xl flex items-center text-sm md:text-base font-medium transition-all duration-300 ${
                activeService === service.id - 1
                  ? `bg-gradient-to-r ${service.color} text-white shadow-lg scale-105`
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => setActiveService(service.id - 1)}
              variants={fadeIn}
              whileHover={{ scale: activeService === service.id - 1 ? 1.05 : 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className={`${activeService === service.id - 1 ? 'text-white' : 'text-gray-500'} mr-3`}>
                {service.icon}
              </span>
              {service.title}
            </motion.button>
          ))}
        </motion.div>
        
        {/* Service detail card */}
        <motion.div 
          key={activeService}
          className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-5">
            <div className="lg:col-span-3 p-8 lg:p-12">
              <div className="flex items-center mb-6">
                <div className={`bg-gradient-to-r ${services[activeService].color} w-16 h-16 rounded-full flex items-center justify-center mr-4 text-white`}>
                  {services[activeService].icon}
                </div>
                <h3 className="text-2xl font-bold">{services[activeService].title}</h3>
              </div>
              
              <p className="text-gray-600 mb-8">{services[activeService].description}</p>
              
              <div className="mb-8">
                <h4 className="text-lg font-semibold mb-4">Apa yang Kami Lakukan:</h4>
                <ul className="space-y-4">
                  {services[activeService].details.map((detail, index) => (
                    <motion.li 
                      key={index} 
                      className="flex items-start"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-green-500 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>{detail}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
              
              <div className="flex gap-4">
                <Button variant="primary">
                  Dukung Program Ini
                </Button>
                <Button variant="outline">
                  Pelajari Lebih Lanjut
                </Button>
              </div>
            </div>
            
            <div className="lg:col-span-2 relative">
              <div className="h-full">
                <Image
                  src={services[activeService].image}
                  alt={services[activeService].title}
                  fill
                  className="object-cover"
                />
                <div className={`absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end`}>
                  <div className="p-6 w-full">
                    <div className="flex justify-between items-center">
                      <span className="text-white text-sm font-medium bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full">
                        Program Unggulan
                      </span>
                      <motion.button
                        className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                          <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                        </svg>
                      </motion.button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;