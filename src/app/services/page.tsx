// src/app/services/page.tsx
"use client";

import React from 'react';
import { Header, Footer } from '@/components/common';
import HeroSection from '@/components/pages/services/HeroSection';
import MainServicesSection from '@/components/pages/services/MainServicesSection';
import ServiceApproachSection from '@/components/pages/services/ServiceApproachSection';
import ServiceComparisonSection from '@/components/pages/services/ServiceComparisonSection';
import EligibilitySection from '@/components/pages/services/EligibilitySection';

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <HeroSection />
        {/* <MainServicesSection /> */}
        <ServiceApproachSection />
        <EligibilitySection />
        <ServiceComparisonSection />
      </main>
      <Footer />
    </div>
  );
}