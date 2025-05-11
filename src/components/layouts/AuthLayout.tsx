// src/components/layouts/AuthLayout.tsx
import { ReactNode } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle: string;
  imageSrc?: string;
  imageAlt?: string;
  showLogo?: boolean;
  heroTitle?: string;
  heroDescription?: string;
}

const AuthLayout = ({
  children,
  title,
  subtitle,
  imageSrc = '/images/logo_01.png',
  imageAlt = 'bakubantu',
  showLogo = true,
  heroTitle = 'Make a difference today',
  heroDescription = 'Join bakubantu and help connect resources to communities in need',
}: AuthLayoutProps) => {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Left Section - Form */}
      <div className="flex flex-col justify-center px-6 md:px-8 lg:px-16 w-full lg:w-1/2">
        <div className="max-w-md mx-auto w-full py-8 md:py-12">
          {/* Logo */}
          {showLogo && (
            <div className="mb-8 md:mb-10">
              <Link href="/" className="flex items-center">
                <h1 className="text-2xl md:text-3xl font-medium text-gray-900">
                  baku<span className="font-bold text-babyBlue-dark">bantu</span>
                </h1>
              </Link>
              <p className="mt-2 text-sm text-gray-600">Connect and help your community</p>
            </div>
          )}

          {/* Form Title */}
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 md:mb-3">{title}</h1>
            <p className="text-gray-600">{subtitle}</p>
          </div>

          {/* Content */}
          {children}
        </div>
      </div>

      {/* Right Section - Illustration */}
      <div className="hidden lg:flex lg:w-1/2 bg-babyBlue-light items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-babyBlue-light/90 to-lavender-light/90 z-10"></div>
        
        <div className="relative z-20 max-w-lg px-10 text-center">
          <div className="flex justify-center mb-8">
            <div className="rounded-full bg-white/20 p-8 backdrop-blur-sm shadow-lg">
              {imageSrc && (
                <Image
                  src={imageSrc}
                  alt={imageAlt}
                  width={240}
                  height={240}
                  className="h-auto w-full"
                  priority
                />
              )}
            </div>
          </div>
          
          <h2 className="text-3xl font-bold text-white mb-4">{heroTitle}</h2>
          <p className="text-white/90 text-lg mb-6">{heroDescription}</p>
          
          <div className="flex justify-center space-x-3">
            <div className="w-3 h-3 rounded-full bg-white opacity-60"></div>
            <div className="w-3 h-3 rounded-full bg-white"></div>
            <div className="w-3 h-3 rounded-full bg-white opacity-60"></div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white/10 to-transparent"></div>
        <div className="absolute top-10 left-10 w-20 h-20 rounded-full bg-lavender/30 backdrop-blur-sm"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 rounded-full bg-babyBlue/30 backdrop-blur-sm"></div>
      </div>
    </div>
  );
};

export default AuthLayout;