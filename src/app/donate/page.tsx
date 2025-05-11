// src/app/donate/page.tsx
"use client";

import React from 'react';
import { Header, Footer, CallToAction } from '@/components/common';
import HeroSection from '@/components/pages/donation/HeroSection';
import DonationOptions from '@/components/pages/donation/DonationOptions';
import ImpactSection from '@/components/pages/donation/ImpactSection';
import FAQSection from '@/components/pages/donation/FAQSection';

export default function DonatePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <HeroSection />
        <DonationOptions />
        <ImpactSection />
        <FAQSection />
        <CallToAction/>
      </main>
      <Footer />
    </div>
  );
}