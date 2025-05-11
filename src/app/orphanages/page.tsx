// src/app/orphanages/page.tsx
"use client";

import React from 'react';
import { Header, Footer, CallToAction } from '@/components/common';
import { 
  OrphanageHero, 
  OrphanageFilter, 
  OrphanageGrid, 
  OrphanageRegister 
} from '@/components/pages/orphanages';
import { useOrphanages } from '@/hooks/useOrphanages';

export default function OrphanagesPage() {
  const { 
    filteredOrphanages, 
    currentPage, 
    totalPages, 
    isLoading, 
    error,
    searchTerm, 
    selectedRegion, 
    selectedYayasan,
    handleSearchChange, 
    handleRegionChange, 
    handleYayasanChange,
    resetFilters,
    handlePageChange
  } = useOrphanages();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-1">
        <OrphanageHero />
        
        <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <OrphanageFilter 
            searchTerm={searchTerm}
            selectedRegion={selectedRegion}
            selectedYayasan={selectedYayasan}
            onSearchChange={handleSearchChange}
            onRegionChange={handleRegionChange}
            onYayasanChange={handleYayasanChange}
            onResetFilters={resetFilters}
          />
          
          {error ? (
            <div className="min-h-[400px] flex items-center justify-center">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{error}</h3>
                <p className="text-gray-600 mb-4">Silakan coba kembali dalam beberapa saat.</p>
              </div>
            </div>
          ) : (
            <OrphanageGrid 
              orphanages={filteredOrphanages}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              isLoading={isLoading}
            />
          )}
        </section>
        
        <OrphanageRegister />
        <CallToAction />
      </main>
      
      <Footer />
    </div>
  );
}