// src/app/not-found.tsx
"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Header, Footer } from '@/components/common';
import { Button } from '@/components/ui/Button';
import NotFoundHero from '@/components/pages/error/NotFoundHero';
import SuggestedLinks from '@/components/pages/error/SuggestedLinks';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <NotFoundHero />
        <SuggestedLinks />
      </main>
      <Footer />
    </div>
  );
}