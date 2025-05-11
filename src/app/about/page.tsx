// src/app/about/page.tsx
"use client";

import React from 'react';
import { Header, Footer ,CallToAction} from '@/components/common';
import {
  AboutHero,
  VideoSection,
  MissionVision,
  TeamSection
} from '@/components/pages/about';

/**
 * About Page Component
 * Uses modular components for better organization and maintainability
 */
export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <AboutHero />
        <VideoSection />
        <MissionVision />
        <TeamSection />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
}