// src/app/what-we-do/page.tsx
"use client";

import React from 'react';
import { Header, Footer,CallToAction } from '@/components/common';
import HeroSection from '@/components/pages/what-we-do/HeroSection';
import ServicesSection from '@/components/pages/what-we-do/ServicesSection';
import ImpactSection from '@/components/pages/what-we-do/ImpactSection';
import ProcessSection from '@/components/pages/what-we-do/ProcessSection';



export default function WhatWeDoPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <HeroSection />
        <ServicesSection />
        <ImpactSection />
        <ProcessSection />
        <CallToAction/>
      </main>
      <Footer />
    </div>
  );
}