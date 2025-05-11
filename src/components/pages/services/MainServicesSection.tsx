// src/components/pages/services/MainServicesSection.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

interface Service {
  id: string;
  title: string;
  description: string;
  image: string;
  icon: React.ReactNode;
  color: string;
  benefits: string[];
}

interface ServiceCardProps {
  service: Service;
  index: number;
}

const ServiceCard = ({ service, index }: ServiceCardProps) => {
  return (
    <motion.div
      className={`bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-t-4 border-${service.color}`}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { 
          opacity: 1, 
          y: 0,
          transition: { duration: 0.5, delay: index * 0.1 }
        }
      }}
    >
      <div className="relative h-48 overflow-hidden">
        <Image 
          src={service.image} 
          alt={service.title} 
          fill
          className="object-cover transition-transform duration-700 hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
          <div className="p-6">
            <h3 className="text-xl font-bold text-white">{service.title}</h3>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <div className="mb-4 flex items-center">
          <div className={`bg-${service.color}-light/30 p-3 rounded-lg mr-4`}>
            {service.icon}
          </div>
        </div>
        
        <p className="text-gray-600 mb-6">{service.description}</p>
        
        <div className="mb-4">
          <h4 className="text-sm font-semibold uppercase text-gray-500 mb-2">Manfaat</h4>
          <div className="flex flex-wrap gap-2">
            {service.benefits.map((benefit: string, i: number) => (
              <span key={i} className={`text-xs px-2 py-1 rounded-full bg-${service.color}-light/20 text-${service.color}-dark`}>
                {benefit}
              </span>
            ))}
          </div>
        </div>
        
        <Link href={`/services/${service.id}`}>
          <Button 
            variant="outline" 
            className={`w-full mt-2 border-${service.color} text-${service.color}-dark hover:bg-${service.color}-light/20`}
          >
            Pelajari Lebih Lanjut
          </Button>
        </Link>
      </div>
    </motion.div>
  );
};

interface Category {
  id: string;
  name: string;
  color: string;
  icon: React.ReactNode;
}

interface ServiceCategoryTabsProps {
  categories: Category[];
  activeCategory: string;
  setActiveCategory: (id: string) => void;
}

const ServiceCategoryTabs = ({ categories, activeCategory, setActiveCategory }: ServiceCategoryTabsProps) => {
  return (
    <div className="flex flex-wrap justify-center gap-3 mb-12">
      {categories.map((category: Category) => (
        <button
          key={category.id}
          className={`px-5 py-3 rounded-full text-sm font-medium transition-all flex items-center ${
            activeCategory === category.id
              ? `bg-${category.color}-light/30 text-${category.color}-dark shadow-md`
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
          onClick={() => setActiveCategory(category.id)}
        >
          <span className="mr-2">{category.icon}</span>
          {category.name}
        </button>
      ))}
    </div>
  );
};

const MainServicesSection = () => {
  const [activeCategory, setActiveCategory] = useState('education');

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

  // Category options for tabs
  const categories = [
    { id: 'education', name: 'Pendidikan', color: 'babyBlue', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3z" />
      </svg>
    )},
    { id: 'health', name: 'Kesehatan', color: 'poppy', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
      </svg>
    )},
    { id: 'development', name: 'Pengembangan', color: 'forest', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
      </svg>
    )},
    { id: 'support', name: 'Dukungan', color: 'lavender', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
      </svg>
    )}
  ];

  // Service data - simplified to only one service per category
  const services = {
    education: [
      {
        id: 1,
        title: "Program Pendidikan Awal",
        description: "Program pendidikan untuk anak-anak usia 3-6 tahun yang mencakup perkembangan kognitif, sosial, dan fisik.",
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-babyBlue" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
          </svg>
        ),
        image: "/images/services-education-01.jpeg",
        benefits: ["Perkembangan kognitif", "Keterampilan sosial", "Persiapan sekolah", "Kemampuan motorik"],
        color: "babyBlue"
      }
    ],
    health: [
      {
        id: 4,
        title: "Pemeriksaan Kesehatan Berkala",
        description: "Layanan pemeriksaan kesehatan berkala untuk anak-anak di panti asuhan dan komunitas yang kurang mampu.",
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-poppy" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
          </svg>
        ),
        image: "/images/services-health-01.jpeg",
        benefits: ["Deteksi dini penyakit", "Pemantauan tumbuh kembang", "Konsultasi kesehatan", "Rujukan medis"],
        color: "poppy"
      }
    ],
    development: [
      {
        id: 7,
        title: "Pelatihan Keterampilan",
        description: "Program pelatihan keterampilan untuk remaja dan dewasa muda untuk meningkatkan kemampuan kerja.",
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-forest" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
          </svg>
        ),
        image: "/images/services-development-01.jpeg",
        benefits: ["Keterampilan teknis", "Kemampuan komunikasi", "Kepemimpinan", "Kewirausahaan"],
        color: "forest"
      }
    ],
    support: [
      {
        id: 10,
        title: "Dukungan Keluarga",
        description: "Program pendampingan untuk keluarga yang menghadapi kesulitan dalam pengasuhan anak.",
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-lavender" viewBox="0 0 20 20" fill="currentColor">
            <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
          </svg>
        ),
        image: "/images/services-support-01.jpeg",
        benefits: ["Konseling keluarga", "Pengasuhan positif", "Resolusi konflik", "Penguatan ekonomi keluarga"],
        color: "lavender"
      }
    ]
  };

  return (
    <section id="main-services" className="py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        <motion.div 
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeIn}
        >
          <h2 className="text-4xl font-bold mb-4">
            Layanan <span className="text-babyBlue-dark">Lengkap</span> Kami
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            BakuBantu menyediakan berbagai layanan terpadu untuk memenuhi kebutuhan anak-anak
            dan komunitas di Sulawesi Utara.
          </p>
        </motion.div>

        <ServiceCategoryTabs 
          categories={categories} 
          activeCategory={activeCategory} 
          setActiveCategory={setActiveCategory} 
        />

        <motion.div 
          className="flex justify-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={stagger}
        >
          {/* Render a single service card for the active category */}
          {services[activeCategory as keyof typeof services].map((service: {
            id: number;
            title: string;
            description: string;
            icon: React.ReactNode;
            image: string;
            benefits: string[];
            color: string;
          }, index: number) => (
            <div key={service.id} className="max-w-md w-full">
              <ServiceCard service={{...service, id: service.id.toString()}} index={index} />
            </div>
          ))}
        </motion.div>

        <motion.div 
          className="mt-16 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeIn}
        >
          <p className="text-gray-500 mb-6">
            * Tampilan ini hanya menunjukkan contoh layanan. Data lengkap akan diambil dari database.
          </p>
          
          <Link href="/contact">
            <Button 
              variant="primary" 
              size="lg"
              className="bg-gradient-to-r from-babyBlue to-babyBlue-dark shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
            >
              Konsultasikan Kebutuhan Anda
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default MainServicesSection;