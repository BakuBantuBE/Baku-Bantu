// src/app/page.tsx
"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import DonationChart from '@/components/charts/DonationChart';
import { Header, Footer, CallToAction } from '@/components/common';

// Hero Section Component
const HeroSection = () => {
  return (
    <section className="relative bg-cover bg-center h-screen flex items-center" 
             style={{ backgroundImage: "url('/images/Hero.png')" }}>
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="container mx-auto px-6 relative z-10 text-white">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Bersama Kita Bantu, Bersama Kita Tumbuh
          </h1>
          <div className="flex flex-wrap gap-4 mt-8">
            <Link href="what-we-do">
              <Button variant="primary" size="lg">Apa yang Kami Lakukan</Button>
            </Link>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-0 right-0 flex justify-between px-10 lg:px-20 text-white">
        <div className="text-center">
          <p className="text-xl md:text-2xl font-bold">230</p>
          <p className="text-sm md:text-base">anak dalam asuhan kami</p>
        </div>
        <div className="border-t border-white/30 my-4 flex-grow mx-8 mt-6"></div>
        <div className="text-center">
          <p className="text-xl md:text-2xl font-bold">58</p>
          <p className="text-sm md:text-base">donasi terkumpul</p>
        </div>
      </div>
    </section>
  );
};

// About Section Component
const AboutSection = () => {
  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <div className="lg:w-1/2">
            <div className="flex items-center mb-6">
              <div className="w-12 h-px bg-babyBlue-dark mr-4"></div>
              <p className="text-sm uppercase tracking-wider font-semibold text-gray-600">TENTANG KAMI</p>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Menjembatani kepedulian untuk mereka yang membutuhkan
            </h2>
            
            <p className="text-gray-600 mb-6">
              Di bakubantu, kami percaya bahwa kebersamaan adalah kunci perubahan sosial. Kami menghubungkan sumber daya dengan panti asuhan dan komunitas yang membutuhkan di Sulawesi Utara, berfokus pada pemberdayaan berkelanjutan yang berdampak positif.
            </p>
            
            <p className="text-gray-600 mb-8">
              Kami berkolaborasi dengan masyarakat lokal, relawan, dan organisasi mitra untuk memastikan bahwa mereka yang rentan mendapatkan akses pendidikan berkualitas, layanan kesehatan, dan dukungan emosional. Program kami dirancang untuk berkelanjutan dan digerakkan oleh semangat gotong royong.
            </p>
            <Link href="/about">
              <Button variant="secondary">Pelajari Lebih Lanjut</Button>
            </Link>
          </div>
          
          <div className="lg:w-1/2">
            <div className="relative rounded-lg overflow-hidden">
              <Image 
                src="/images/about_us_01.jpeg" 
                alt="Children walking together" 
                width={600} 
                height={400} 
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Services Section Component
const ServicesSection = () => {
  return (
    <section id="services" className="py-20 bg-babyBlue-light/20">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-12">
          <div className="lg:w-1/2">
            <div className="flex items-center mb-6">
              <div className="w-12 h-px bg-babyBlue-dark mr-4"></div>
              <p className="text-sm uppercase tracking-wider font-semibold text-gray-600">LAYANAN KAMI</p>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Beberapa layanan yang kami berikan untuk anak-anak
            </h2>
            
            <p className="text-gray-600 mb-10">
              Fokus layanan kami adalah menjembatani kebutuhan-kebutuhan kelompok rentan dengan sumberdaya yang sesuai melalui penyediaan data. Hal ini diperlengkapi dengan proses identifikasi kebutuhan riil di lapangan, publikasi hasil temuan dan analisis, kolaborasi multipihak, dan mobilisasi sumberdaya manusia (relawan).
            </p>
            
            <div className="space-y-8">
              <div className="flex">
                <div className="flex-shrink-0 h-12 w-12 bg-lavender-light rounded-lg flex items-center justify-center mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-lavender-dark" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Riset Sosial</h3>
                  <p className="text-gray-600">Mengadakan riset sosial secara sukarela terkait topik kelompok rentan di Kota dan Kabupaten di Sulawesi Utara agar berbagai pihak dapat menggunakan data ini sebagai referensi dalam perencanaan aksi sosial mereka.</p>
                </div>
              </div>
              
              <div className="flex">
                <div className="flex-shrink-0 h-12 w-12 bg-babyBlue-light rounded-lg flex items-center justify-center mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-babyBlue-dark" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Perancangan Aksi Respon</h3>
                  <p className="text-gray-600">Melakukan perancangan aksi respon yang sesuai dengan data temuan riset sosial agar bantuan untuk sektor sosial dapat tepat sasaran dan problem-based.</p>
                </div>
              </div>
              
              <div className="flex">
                <div className="flex-shrink-0 h-12 w-12 bg-poppy-light rounded-lg flex items-center justify-center mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-poppy-dark" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Publikasi dan Popularisasi</h3>
                  <p className="text-gray-600">Melakukan publikasi dan popularisasi hasil riset sosial dan aksi respon sosial yang efektif agar lebih banyak pihak dapat mengefektifkan upaya-upaya sosial mereka.</p>
                </div>
              </div>
              
              <div className="flex">
                <div className="flex-shrink-0 h-12 w-12 bg-forest-light rounded-lg flex items-center justify-center mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-forest-dark" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Penyediaan Relawan</h3>
                  <p className="text-gray-600">Membantu penyediaan dan pengalokasian relawan-relawan untuk membantu kelompok rentan sesuai kebutuhan.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:w-1/2 flex items-center justify-center">
            <div className="rounded-lg overflow-hidden shadow-lg">
              <Image 
                src="/images/services-learning.jpeg" 
                alt="Anak-anak sedang belajar" 
                width={500} 
                height={600} 
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Komponen Bagian Proyek
const ProjectsSection = () => {
  return (
    <section id="projects" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="flex items-center mb-10">
          <div className="w-12 h-px bg-babyBlue-dark mr-4"></div>
          <p className="text-sm uppercase tracking-wider font-semibold text-babyBlue-dark">PROYEK YANG TELAH KAMI LAKUKAN</p>
        </div>
        
        <div className="space-y-16">
          <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Proyek yang Telah Kami Lakukan</h2>
            <div className="prose prose-lg text-gray-600">
              <p>
                Pada tahun 2024, Baku Bantu memulai proyek pertama yaitu melakukan Survei Kebutuhan Panti Kota Tomohon, Kabupaten Minahasa, dan Kabupaten Minahasa Selatan. Survei dilakukan oleh tim berisikan 16 relawan (dari Pemuda GMIM Sion Tomohon, Conqueror Generation, dan pribadi).
              </p>
              <p>
                Data yang diperoleh dari survei tersebut dipublikasi oleh tim ke media internet (<a href="https://bakubantu.wordpress.com" target="_blank" rel="noopener noreferrer" className="text-babyBlue-dark hover:text-babyBlue-darker">bakubantu.wordpress.com</a>) dan media sosial (Instagram & Tiktok) agar data tersebut dapat menjadi panduan donasi bagi masyarakat yang ingin menyediakan bantuan-bantuan kepada panti/ rumah asuh yang ada.
              </p>
              <div className="mt-6 grid grid-cols-3 gap-4 text-center">
                <div className="bg-babyBlue-light/20 p-4 rounded-lg">
                  <p className="text-2xl font-bold text-babyBlue-dark">1,200</p>
                  <p className="text-sm text-gray-600">Likes di Website</p>
                </div>
                <div className="bg-babyBlue-light/20 p-4 rounded-lg">
                  <p className="text-2xl font-bold text-babyBlue-dark">6,500</p>
                  <p className="text-sm text-gray-600">Likes di Instagram</p>
                </div>
                <div className="bg-babyBlue-light/20 p-4 rounded-lg">
                  <p className="text-2xl font-bold text-babyBlue-dark">2,024</p>
                  <p className="text-sm text-gray-600">Likes di Tiktok</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Proyek yang Sedang Kami Lakukan</h2>
            <div className="space-y-8">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Riset Sosial: Identifikasi Kebutuhan dan Permasalahan</h3>
                <p className="text-gray-600 leading-relaxed">
                  Sebagai dukungan untuk negara dalam mewujudkan kesejahteraan dan keadilan sosial bagi komunitas-komunitas panti atau rumah asuh, peran dari warga sipil diharapkan dapat mengkatalisasi upaya tersebut. Salah satu bentuk upaya tersebut adalah sebagai relawan data sosial.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Proyek Volunteering Mingguan</h3>
                <p className="text-gray-600 leading-relaxed">
                  Kegiatan mingguan dilakukan oleh anggota tetap dan relawan-relawan Baku Bantu di Rumah Asuh Mercyville Kakas. Kegiatan sukarela ini menjadi salah satu bentuk layanan Baku Bantu dalam memobilisasi sumberdaya manusia yang dimiliki.
                </p>
                <ul className="mt-4 grid grid-cols-2 gap-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-babyBlue-dark" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                    </svg>
                    Tutor Matematika
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-babyBlue-dark" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                    </svg>
                    Konseling Psikologis
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-babyBlue-dark" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                    </svg>
                    Pemeriksaan Kesehatan
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-babyBlue-dark" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                    </svg>
                    Perawatan Lingkungan
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Komponen Bagian Donasi
const DonationSection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 to-black text-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <div className="lg:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-babyBlue-light to-babyBlue">
              Bagaimana kami menggunakan donasi Anda
            </h2>
            <p className="text-gray-300 mb-8 text-lg">
              Kami berkomitmen untuk transparansi penuh dalam penggunaan setiap donasi yang kami terima.
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white/5 p-4 rounded-lg backdrop-blur-sm">
                <div className="flex items-center mb-2">
                  <div className="w-4 h-4 bg-babyBlue rounded-sm mr-2"></div>
                  <span className="font-semibold">40%</span>
                </div>
                <p className="text-sm text-gray-300">Panti Asuhan</p>
              </div>
              <div className="bg-white/5 p-4 rounded-lg backdrop-blur-sm">
                <div className="flex items-center mb-2">
                  <div className="w-4 h-4 bg-lavender rounded-sm mr-2"></div>
                  <span className="font-semibold">35%</span>
                </div>
                <p className="text-sm text-gray-300">Program Kebersihan</p>
              </div>
              <div className="bg-white/5 p-4 rounded-lg backdrop-blur-sm">
                <div className="flex items-center mb-2">
                  <div className="w-4 h-4 bg-mango rounded-sm mr-2"></div>
                  <span className="font-semibold">10%</span>
                </div>
                <p className="text-sm text-gray-300">Kegiatan Luar</p>
              </div>
              <div className="bg-white/5 p-4 rounded-lg backdrop-blur-sm">
                <div className="flex items-center mb-2">
                  <div className="w-4 h-4 bg-forest rounded-sm mr-2"></div>
                  <span className="font-semibold">15%</span>
                </div>
                <p className="text-sm text-gray-300">Program Bantuan</p>
              </div>
            </div>
          </div>
          
          <div className="lg:w-1/2 flex justify-center">
            <DonationChart className="w-full max-w-md filter drop-shadow-xl" />
          </div>
        </div>
      </div>
    </section>
  );
};

// Komponen Halaman Utama
export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <ProjectsSection />
        <DonationSection />
        <CallToAction />
      </main>
      <Footer />
    </div>
  )};