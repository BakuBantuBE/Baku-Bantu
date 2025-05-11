// src/components/pages/services/ServiceComparisonSection.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@/components/ui/Table';
import { Tooltip } from '@/components/ui/Tooltip';

const ServiceComparisonSection = () => {
  const [activeCategory, setActiveCategory] = useState('educational');

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  // Categories for the tabs
  const serviceCategories = [
    { id: 'educational', label: 'Layanan Pendidikan' },
    { id: 'health', label: 'Layanan Kesehatan' },
    { id: 'development', label: 'Layanan Pengembangan' },
    { id: 'support', label: 'Layanan Dukungan' },
  ];

  // Comparison data
  const comparisonData = {
    educational: [
      {
        service: 'Program Pendidikan Awal',
        eligibility: 'Anak usia 3-6 tahun',
        duration: '1 tahun, dapat diperpanjang',
        coverage: 'Kurikulum dasar, materi pembelajaran, aktivitas perkembangan',
        referral: 'Tidak diperlukan',
        location: 'Pusat layanan, panti asuhan'
      },
      {
        service: 'Program Beasiswa',
        eligibility: 'Anak usia sekolah dari keluarga prasejahtera',
        duration: 'Hingga lulus jenjang pendidikan',
        coverage: 'Biaya sekolah, buku, seragam, perlengkapan belajar',
        referral: 'Diperlukan dari sekolah atau tokoh masyarakat',
        location: 'Sekolah yang terdaftar'
      },
      {
        service: 'Perpustakaan Bergerak',
        eligibility: 'Semua anak dan masyarakat',
        duration: 'Kunjungan berkala',
        coverage: 'Akses ke buku dan materi belajar',
        referral: 'Tidak diperlukan',
        location: 'Daerah terpencil, sekolah, pusat komunitas'
      }
    ],
    health: [
      {
        service: 'Pemeriksaan Kesehatan Berkala',
        eligibility: 'Anak-anak di panti asuhan dan masyarakat prasejahtera',
        duration: 'Setiap 3 bulan',
        coverage: 'Pemeriksaan umum, imunisasi, pemantauan tumbuh kembang',
        referral: 'Tidak diperlukan',
        location: 'Pusat layanan, klinik keliling'
      },
      {
        service: 'Program Gizi',
        eligibility: 'Anak dengan kekurangan gizi dan keluarga prasejahtera',
        duration: '6 bulan, dapat diperpanjang',
        coverage: 'Makanan bergizi, edukasi gizi, pemantauan status gizi',
        referral: 'Diperlukan dari tenaga kesehatan',
        location: 'Pusat layanan, kunjungan rumah'
      },
      {
        service: 'Kesehatan Mental',
        eligibility: 'Anak-anak dan remaja dengan trauma atau masalah psikologis',
        duration: 'Sesuai kebutuhan',
        coverage: 'Konseling individu, terapi kelompok, dukungan psikososial',
        referral: 'Diperlukan dari tenaga kesehatan atau sekolah',
        location: 'Pusat layanan, sekolah'
      }
    ],
    development: [
      {
        service: 'Pelatihan Keterampilan',
        eligibility: 'Remaja dan dewasa muda dari keluarga prasejahtera',
        duration: '3-6 bulan',
        coverage: 'Pelatihan teknis, komunikasi, kepemimpinan',
        referral: 'Tidak diperlukan',
        location: 'Pusat pelatihan, pusat komunitas'
      },
      {
        service: 'Program Wirausaha',
        eligibility: 'Keluarga prasejahtera dengan potensi usaha',
        duration: '1 tahun',
        coverage: 'Modal usaha, pelatihan bisnis, pendampingan',
        referral: 'Diperlukan dari tokoh masyarakat',
        location: 'Pusat layanan, tempat usaha'
      },
      {
        service: 'Pengembangan Komunitas',
        eligibility: 'Komunitas di daerah terpencil atau prasejahtera',
        duration: '2-3 tahun',
        coverage: 'Penguatan kapasitas lokal, infrastruktur dasar',
        referral: 'Diperlukan dari pemerintah setempat',
        location: 'Desa atau komunitas yang ditargetkan'
      }
    ],
    support: [
      {
        service: 'Dukungan Keluarga',
        eligibility: 'Keluarga yang menghadapi kesulitan dalam pengasuhan anak',
        duration: 'Sesuai kebutuhan',
        coverage: 'Konseling keluarga, pengasuhan positif, resolusi konflik',
        referral: 'Tidak diperlukan',
        location: 'Pusat layanan, kunjungan rumah'
      },
      {
        service: 'Advokasi Hak Anak',
        eligibility: 'Anak-anak yang membutuhkan perlindungan khusus',
        duration: 'Sesuai kebutuhan',
        coverage: 'Kampanye kesadaran, pendidikan hak anak, penanganan kasus',
        referral: 'Diperlukan dari lembaga perlindungan anak',
        location: 'Pusat layanan, sekolah, masyarakat'
      },
      {
        service: 'Bantuan Kemanusiaan',
        eligibility: 'Korban bencana dan situasi darurat',
        duration: 'Hingga situasi stabil',
        coverage: 'Bantuan makanan, tempat tinggal, layanan kesehatan darurat',
        referral: 'Tidak diperlukan dalam situasi darurat',
        location: 'Lokasi bencana atau daerah terdampak'
      }
    ]
  };

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
          <h2 className="text-4xl font-bold mb-4">
            Perbandingan <span className="text-babyBlue-dark">Layanan</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Berikut adalah perbandingan rinci dari layanan-layanan yang kami tawarkan untuk membantu Anda 
            menemukan program yang sesuai dengan kebutuhan Anda.
          </p>
        </motion.div>

        {/* Category tabs */}
        <div className="mb-8 flex flex-wrap justify-center gap-3">
          {serviceCategories.map((category) => (
            <button
              key={category.id}
              className={`px-5 py-3 rounded-full text-sm font-medium transition-all ${
                activeCategory === category.id
                  ? 'bg-babyBlue-light/30 text-babyBlue-dark shadow-md'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Comparison table */}
        <motion.div 
          className="bg-white rounded-xl shadow-lg overflow-hidden"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeIn}
        >
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Layanan</TableHead>
                  <TableHead>Kelayakan</TableHead>
                  <TableHead>Durasi</TableHead>
                  <TableHead>Cakupan</TableHead>
                  <TableHead>Rujukan</TableHead>
                  <TableHead>Lokasi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {comparisonData[activeCategory as keyof typeof comparisonData].map((service: {
                  service: string;
                  eligibility: string;
                  duration: string;
                  coverage: string;
                  referral: string;
                  location: string;
                }, index: number) => (
                  <TableRow key={index} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                    <TableCell className="font-medium">{service.service}</TableCell>
                    <TableCell>{service.eligibility}</TableCell>
                    <TableCell>{service.duration}</TableCell>
                    <TableCell>
                      <Tooltip content={service.coverage}>
                        <span className="cursor-help underline decoration-dotted">
                          {service.coverage.length > 30 
                            ? `${service.coverage.substring(0, 30)}...` 
                            : service.coverage}
                        </span>
                      </Tooltip>
                    </TableCell>
                    <TableCell>{service.referral}</TableCell>
                    <TableCell>{service.location}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </motion.div>

        {/* Legend and notes */}
        <motion.div 
          className="mt-8 text-sm text-gray-500"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeIn}
        >
          <p>* Semua layanan tersedia tanpa biaya untuk penerima yang memenuhi syarat.</p>
          <p>* Ketersediaan layanan dapat bervariasi berdasarkan lokasi dan sumber daya yang tersedia.</p>
          <p>* Untuk informasi lebih detail, silakan hubungi tim layanan kami.</p>
        </motion.div>
      </div>
    </section>
  );
};

export default ServiceComparisonSection;