// src/components/pages/orphanages/OrphanageFilter.tsx
"use client";

import React from 'react';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { OrphanageFilterProps } from '@/types/orphanage';
import { useOrphanages } from '@/hooks/useOrphanages';

const OrphanageFilter: React.FC<OrphanageFilterProps> = ({
  searchTerm,
  selectedRegion,
  selectedYayasan,
  onSearchChange,
  onRegionChange,
  onYayasanChange,
  onResetFilters
}) => {
  const { wilayahs, yayasans } = useOrphanages();
  
  // Map wilayahs to options
  const regionOptions = [
    { value: '', label: 'Semua Wilayah' },
    ...wilayahs.map(wilayah => ({ value: String(wilayah.id), label: wilayah.nama }))
  ];
  
  // Map yayasans to options
  const yayasanOptions = [
    { value: '', label: 'Semua Yayasan' },
    ...yayasans.map(yayasan => ({ value: String(yayasan.id), label: yayasan.namaYayasan }))
  ];

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Search Input */}
        <div className="md:col-span-2">
          <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
            Cari Panti Asuhan
          </label>
          <div className="relative">
            <input
              type="text"
              id="search"
              placeholder="Masukkan nama panti asuhan..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full h-10 pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-babyBlue focus:border-transparent"
            />
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>
        
        {/* Region Filter */}
        <div>
          <Select
            label="Wilayah"
            options={regionOptions}
            value={selectedRegion ? String(selectedRegion) : ''}
            onChange={(e) => onRegionChange(e.target.value ? Number(e.target.value) : null)}
          />
        </div>
        
        {/* Yayasan Filter */}
        <div>
          <Select
            label="Yayasan Pengelola"
            options={yayasanOptions}
            value={selectedYayasan ? String(selectedYayasan) : ''}
            onChange={(e) => onYayasanChange(e.target.value ? Number(e.target.value) : null)}
          />
        </div>
        
        {/* Reset Button (For Mobile) */}
        <div className="md:hidden mt-2">
          <Button 
            variant="outline"
            size="full"
            onClick={onResetFilters}
            leftIcon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            }
          >
            Reset Filter
          </Button>
        </div>
      </div>
      
      {/* Active Filters and Reset Button (Desktop) */}
      <div className="hidden md:flex justify-between items-center mt-6 pt-4 border-t border-gray-100">
        <div className="flex flex-wrap items-center gap-2">
          {searchTerm && (
            <div className="bg-babyBlue-light/20 text-babyBlue-dark px-3 py-1 rounded-full text-sm flex items-center">
              <span>Pencarian: {searchTerm}</span>
              <button 
                onClick={() => onSearchChange('')}
                className="ml-2 hover:text-red-500"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          )}
          
          {selectedRegion !== null && (
            <div className="bg-lavender-light/20 text-lavender-dark px-3 py-1 rounded-full text-sm flex items-center">
              <span>Wilayah: {wilayahs.find(w => w.id === selectedRegion)?.nama}</span>
              <button 
                onClick={() => onRegionChange(null)}
                className="ml-2 hover:text-red-500"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          )}
          
          {selectedYayasan !== null && (
            <div className="bg-mango-light/20 text-mango-dark px-3 py-1 rounded-full text-sm flex items-center">
              <span>Yayasan: {yayasans.find(y => y.id === selectedYayasan)?.namaYayasan}</span>
              <button 
                onClick={() => onYayasanChange(null)}
                className="ml-2 hover:text-red-500"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          )}
        </div>
        
        {(searchTerm || selectedRegion !== null || selectedYayasan !== null) && (
          <Button 
            variant="outline"
            onClick={onResetFilters}
            leftIcon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            }
          >
            Reset Filter
          </Button>
        )}
      </div>
    </div>
  );
};

export default OrphanageFilter;