// src/app/volunteer/success/page.tsx
"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Header, Footer } from '@/components/common';
import { useToast } from '@/contexts/ToastContext';
import { VolunteerResponse } from '@/services/volunteerService';

// Tambahkan status ke interface VolunteerResponse
interface VolunteerResponseWithStatus extends VolunteerResponse {
  status: string;
}

export default function VolunteerSuccessPage() {
  const router = useRouter();
  const toast = useToast();
  const [volunteerData, setVolunteerData] = useState<VolunteerResponseWithStatus | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fade in animation for content
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  // Redirect to registration page if user accesses this page directly
  useEffect(() => {
    const hasRegistered = sessionStorage.getItem('volunteer_registered');
    const volunteerId = sessionStorage.getItem('volunteer_id');
    
    if (!hasRegistered) {
      // Uncomment this for production use to enforce the correct user flow
      // router.push('/register/volunteer');
      // return;
    }

    // If we have a volunteer ID, fetch the registration details
    if (volunteerId) {
      fetchVolunteerData(volunteerId);
    } else {
      setIsLoading(false);
    }
  }, [router]);

  // Fetch volunteer data from API
  const fetchVolunteerData = async (id: string) => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/volunteers/${id}`);
      const data = await response.json();
      
      if (data.success && data.data) {
        // Cast response data to include status
        setVolunteerData(data.data as VolunteerResponseWithStatus);
      } else {
        toast.error(data.message || 'Gagal mengambil data pendaftaran');
      }
    } catch (error) {
      console.error('Error fetching volunteer data:', error);
      toast.error('Terjadi kesalahan saat mengambil data pendaftaran');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <section className="py-20">
          <div className="container mx-auto px-6">
            <motion.div 
              className="max-w-3xl mx-auto text-center"
              initial="hidden"
              animate="visible"
              variants={fadeIn}
            >
              <div className="mb-10 inline-flex justify-center">
                <div className="rounded-full bg-green-100 p-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Pendaftaran Berhasil!
              </h1>

              <div className="mb-10">
                <p className="text-lg text-gray-600 mb-6">
                  Terima kasih telah mendaftar sebagai relawan BakuBantu. Kami sangat menghargai kesediaan Anda untuk bergabung dengan misi kami membantu mereka yang membutuhkan.
                </p>

                {volunteerData && (
                  <div className="bg-babyBlue-light/20 p-6 rounded-lg text-left mb-8">
                    <h2 className="text-lg font-semibold text-babyBlue-dark mb-3">Detail Pendaftaran:</h2>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-babyBlue-dark mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 2a1 1 0 00-1 1v1a1 1 0 002 0V3a1 1 0 00-1-1zM4 4h3a3 3 0 006 0h3a2 2 0 012 2v9a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm2.5 7a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm2.45 4a2.5 2.5 0 10-4.9 0h4.9zM12 9a1 1 0 100 2h3a1 1 0 100-2h-3zm-1 4a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1z" clipRule="evenodd" />
                        </svg>
                        <div>
                          <span className="font-medium">Nama:</span> {volunteerData.namaLengkap}
                        </div>
                      </li>
                      <li className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-babyBlue-dark mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                        </svg>
                        <div>
                          <span className="font-medium">Email:</span> {volunteerData.email}
                        </div>
                      </li>
                      <li className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-babyBlue-dark mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                        </svg>
                        <div>
                          <span className="font-medium">Nomor HP:</span> {volunteerData.nomorHP}
                        </div>
                      </li>
                      <li className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-babyBlue-dark mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                        </svg>
                        <div>
                          <span className="font-medium">Status:</span>{' '}
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                            {volunteerData.status === 'PENDING' ? 'Menunggu Persetujuan' : volunteerData.status}
                          </span>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-babyBlue-dark mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                        <div>
                          <span className="font-medium">ID Pendaftaran:</span> {volunteerData.id}
                        </div>
                      </li>
                    </ul>
                  </div>
                )}

                <div className="bg-blue-50 p-6 rounded-lg text-left mb-8">
                  <h2 className="text-lg font-semibold text-blue-800 mb-3">Langkah Selanjutnya:</h2>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                      </svg>
                      <span>Tim kami akan melakukan verifikasi data Anda dalam waktu 2-3 hari kerja.</span>
                    </li>
                    <li className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                      </svg>
                      <span>Anda akan menerima email konfirmasi dengan detail status pendaftaran Anda.</span>
                    </li>
                    <li className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                      </svg>
                      <span>Jika email tidak muncul di inbox, silakan periksa folder spam/junk email Anda.</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg flex flex-col md:flex-row items-center justify-between">
                  <div className="text-left mb-4 md:mb-0">
                    <h3 className="font-medium text-gray-900">Ada pertanyaan?</h3>
                    <p className="text-gray-600">Hubungi tim dukungan relawan kami</p>
                  </div>
                  <div className="flex space-x-3">
                    <a href="tel:+62123456789" className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                      +62 123 456 789
                    </a>
                    <a href="mailto:volunteer@bakubantu.id" className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                      volunteer@bakubantu.id
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 justify-center">
                <Link href="/volunteer">
                  <Button variant="outline">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                    </svg>
                    Kembali ke Halaman Relawan
                  </Button>
                </Link>
                <Link href="/">
                  <Button variant="primary">
                    Kembali ke Beranda
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                    </svg>
                  </Button>
                </Link>
              </div>
              
              {/* Clean up session storage to prevent access after leaving */}
              <div className="hidden">
                {/* Use useEffect for side effects instead of directly in JSX */}
                {(() => {
                  useEffect(() => {
                    // This runs on component mount
                    return () => {
                      // This runs on component unmount
                      sessionStorage.removeItem('volunteer_registered');
                      sessionStorage.removeItem('volunteer_id');
                    };
                  }, []);
                  return null;
                })()}
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}