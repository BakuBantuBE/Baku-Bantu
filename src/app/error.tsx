// src/app/error.tsx
"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Header, Footer } from '@/components/common';
import { Button } from '@/components/ui/Button';
import ServerErrorHero from '@/components/pages/error/ServerErrorHero';
import SuggestedLinks from '@/components/pages/error/SuggestedLinks';

interface ErrorPageProps {
  error: Error;
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <ServerErrorHero error={error} reset={reset} />
        <SuggestedLinks />
      </main>
      <Footer />
    </div>
  );
}