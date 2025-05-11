// src/app/orphanages/[id]/page.tsx
"use client";

import React from 'react';
import { Header, Footer, CallToAction } from '@/components/common';
import {
  OrphanageHero,
  OrphanageDetails,
  OrphanageNeeds,
  OrphanageDonation,
  OrphanageContact,
  OrphanageDisclaimer
} from '@/components/pages/orphanages/detail';
import { useOrphanageDetail } from '@/hooks/useOrphanageDetail';
import { Loading } from '@/components/ui/Loading';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function OrphanageDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  
  const { orphanage, isLoading, error } = useOrphanageDetail(id);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <Loading size="lg" text="Memuat informasi panti asuhan..." />
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center max-w-lg px-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-red-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{error}</h3>
            <p className="text-gray-600 mb-6">
              Terjadi kesalahan saat memuat informasi panti asuhan. Silakan coba kembali dalam beberapa saat.
            </p>
            <Link href="/orphanages">
              <Button variant="primary">Kembali ke Daftar Panti Asuhan</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!orphanage) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center max-w-lg px-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-yellow-100 mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-yellow-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Panti Asuhan Tidak Ditemukan</h3>
            <p className="text-gray-600 mb-6">
              Maaf, panti asuhan yang Anda cari tidak ditemukan atau mungkin telah dihapus.
            </p>
            <Link href="/orphanages">
              <Button variant="primary">Kembali ke Daftar Panti Asuhan</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1">
        <OrphanageHero orphanage={orphanage} />
        <OrphanageDetails orphanage={orphanage} />
        <OrphanageNeeds orphanage={orphanage} />
        <OrphanageDonation orphanage={orphanage} />
        <OrphanageContact orphanage={orphanage} />
        <OrphanageDisclaimer orphanage={orphanage} />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
}