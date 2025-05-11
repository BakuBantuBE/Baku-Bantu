// src/components/common/Footer.tsx
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-br from-gray-900 to-gray-800 text-white pt-20 pb-8 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-poppy/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-babyBlue/10 rounded-full blur-3xl"></div>
      <div className="absolute top-1/3 right-1/4 w-60 h-60 bg-lavender/10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-14 border-b border-gray-700">
          <div>
            <div className="flex items-center mb-6">
              <div className="relative h-12 w-12 mr-3 overflow-hidden rounded-full bg-white/10 backdrop-blur-sm">
                <Image
                  src="/images/logo_01.png"
                  alt="bakubantu logo"
                  fill
                  className="object-contain p-1"
                />
              </div>
              <h2 className="text-2xl font-medium">
                baku<span className="font-bold text-babyBlue">bantu</span>
              </h2>
            </div>
            <p className="text-gray-400 mb-6">
              Menghubungkan jiwa-jiwa yang peduli untuk menciptakan perubahan yang berarti di Sulawesi Utara.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://www.instagram.com/bakubantusulut/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-babyBlue/20 flex items-center justify-center hover:bg-babyBlue/40 transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
              <a 
                href="https://www.linkedin.com/company/baku-bantu-sulut/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-forest/20 flex items-center justify-center hover:bg-forest/40 transition-colors"
                aria-label="LinkedIn"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-babyBlue-light">Beranda</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition-colors flex items-center">
                  <svg className="w-3 h-3 mr-2 text-mango" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  Beranda
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition-colors flex items-center">
                  <svg className="w-3 h-3 mr-2 text-mango" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  Tentang kami
                </Link>
              </li>
              <li>
                <Link href="/team" className="text-gray-400 hover:text-white transition-colors flex items-center">
                  <svg className="w-3 h-3 mr-2 text-mango" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  Tim
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-400 hover:text-white transition-colors flex items-center">
                  <svg className="w-3 h-3 mr-2 text-mango" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  Yang kami lakukan
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white transition-colors flex items-center">
                  <svg className="w-3 h-3 mr-2 text-mango" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  Kontak
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-lavender-light">Lainnya</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/orphanages" className="text-gray-400 hover:text-white transition-colors flex items-center">
                  <svg className="w-3 h-3 mr-2 text-poppy" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  Mitra
                </Link>
              </li>
              <li>
                <Link href="/donate" className="text-gray-400 hover:text-white transition-colors flex items-center">
                  <svg className="w-3 h-3 mr-2 text-poppy" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  Donasi
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-forest-light">Kontak Kami</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 rounded-md bg-forest/20 flex items-center justify-center mt-1 mr-3">
                  <svg className="w-4 h-4 text-forest-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <p className="text-gray-400">
                  Walian, Tomohon Selatan<br />
                  Kota Tomohon<br />
                  Sulawesi Utara
                </p>
              </li>
              
              <li className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 rounded-md bg-mango/20 flex items-center justify-center mt-1 mr-3">
                  <svg className="w-4 h-4 text-mango-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <p className="text-gray-400">
                  +62 853-3715-2513<br />
                  <span className="text-sm">(Krisan - Lead Coordinator)</span>
                </p>
              </li>
              
              <li className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 rounded-md bg-babyBlue/20 flex items-center justify-center mt-1 mr-3">
                  <svg className="w-4 h-4 text-babyBlue-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <p className="text-gray-400">
                  bakubantusulut@gmail.com
                </p>
              </li>

              <li className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 rounded-md bg-lavender/20 flex items-center justify-center mt-1 mr-3">
                  <svg className="w-4 h-4 text-lavender-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-gray-400">
                  Senin-Sabtu<br />
                  8.00-17.00 (tentatif)
                </p>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom section with copyright */}
        <div className="mt-10 text-center">
          <div className="inline-block mb-8">
            <div className="flex justify-center space-x-2">
              <Link href="/privacy" className="text-gray-500 hover:text-gray-400 text-sm">
                Kebijakan Privasi
              </Link>
              <span className="text-gray-700">•</span>
              <Link href="/terms" className="text-gray-500 hover:text-gray-400 text-sm">
                Syarat dan Ketentuan
              </Link>
              <span className="text-gray-700">•</span>
              <Link href="/faq" className="text-gray-500 hover:text-gray-400 text-sm">
                FAQ
              </Link>
            </div>
          </div>
          
          {/* <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Baku Bantu. Semua hak dilindungi.
          </p>
          <p className="text-gray-600 text-xs mt-2">
            Dibuat oleh <a href="https://www.instagram.com/codemercs" className="text-poppy hover:underline">codemercs</a> <span className="text-red-500">♥</span> untuk Sulawesi Utara
          </p> */}
        </div>
      </div>
    </footer>
  );
};

// Add this explicit default export
export default Footer;