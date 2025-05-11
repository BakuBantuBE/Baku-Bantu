// src/components/common/Header.tsx
"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState('/');

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    // Set active link based on pathname
    setActiveLink(window.location.pathname);

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white shadow-md py-2' 
        : 'bg-white/80 backdrop-blur-md py-4'
    }`}>
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/" className="flex items-center group">
              <div className="relative h-10 w-10 mr-2 overflow-hidden rounded-full bg-babyBlue-light transform group-hover:scale-110 transition-transform duration-300">
                <Image
                  src="/images/logo_01.png"
                  alt="bakubantu logo"
                  fill
                  className="object-contain p-1"
                />
              </div>
              <h1 className="text-2xl font-medium text-gray-900 transition-all duration-300 
                             group-hover:scale-105 transform origin-left">
                baku<span className="font-bold text-babyBlue-dark">bantu</span>
              </h1>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-1">
            {[
              { path: '/', label: 'Beranda' },
              { path: '/about', label: 'Tentang Kami' },
              { path: '/services', label: 'Layanan' },
              { path: '/orphanages', label: 'Mitra' },
              { path: '/contact', label: 'Kontak' }
            ].map((item) => (
              <Link 
                key={item.path} 
                href={item.path}
                className={`px-4 py-2 rounded-md transition-all duration-200 ${
                  activeLink === item.path
                    ? 'text-babyBlue-dark bg-babyBlue-light/40 font-medium'
                    : 'text-gray-700 hover:text-babyBlue-dark hover:bg-babyBlue-light/20'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link 
              href="/donate" 
              className="ml-2 px-4 py-2 bg-poppy text-white rounded-md hover:bg-poppy-dark transition-colors duration-200 shadow-md hover:shadow-lg transform hover:translate-y-px"
            >
              Donasi
            </Link>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-babyBlue-dark hover:bg-babyBlue-light/20 transition-colors"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Buka menu utama</span>
              <svg
                className={`h-6 w-6 ${isMenuOpen ? 'hidden' : 'block'}`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg
                className={`h-6 w-6 ${isMenuOpen ? 'block' : 'hidden'}`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation with enhanced styling */}
      <div 
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 pt-2 pb-3 space-y-1 bg-white shadow-inner">
          {[
            { path: '/', label: 'Beranda' },
            { path: '/about', label: 'Tentang Kami' },
            { path: '/services', label: 'Layanan' },
            { path: '/orphanages', label: 'Mitra' },
            { path: '/contact', label: 'Kontak' }
          ].map((item) => (
            <Link 
              key={item.path}
              href={item.path} 
              className={`block px-3 py-2 rounded-md ${
                activeLink === item.path
                  ? 'bg-babyBlue-light/30 text-babyBlue-dark font-medium'
                  : 'text-gray-700 hover:bg-babyBlue-light/20 hover:text-babyBlue-dark'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Link 
            href="/donate" 
            className="block px-3 py-2 mt-2 text-center rounded-md bg-poppy text-white hover:bg-poppy-dark"
            onClick={() => setIsMenuOpen(false)}
          >
            Donasi Sekarang
          </Link>
        </div>
      </div>
    </header>
  );
};

// Add this explicit default export
export default Header;