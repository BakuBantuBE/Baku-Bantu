// src/hooks/useOrphanages.ts
import { useState, useEffect, useMemo } from 'react';
import orphanageService from '@/services/orphanageService';
import { Orphanage, Wilayah, Yayasan } from '@/types/orphanage';
import { useToast } from '@/contexts/ToastContext';
import { handleApiError } from '@/lib/api-error-utils';

// Define constants
const ITEMS_PER_PAGE = 9;

export function useOrphanages() {
  const [orphanages, setOrphanages] = useState<Orphanage[]>([]);
  const [wilayahs, setWilayahs] = useState<Wilayah[]>([]);
  const [yayasans, setYayasans] = useState<Yayasan[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<number | null>(null);
  const [selectedYayasan, setSelectedYayasan] = useState<number | null>(null);
  const toast = useToast();

  // Fetch orphanages, wilayahs, and yayasans data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        
        // Fetch orphanages data
        const orphanagesResponse = await orphanageService.getActiveOrphanages();
        setOrphanages(orphanagesResponse.data as unknown as Orphanage[]);
        
        // Fetch wilayahs data
        const wilayahsResponse = await orphanageService.getActiveWilayah();
        // Use type assertion to make TypeScript happy without changing the data
        setWilayahs(wilayahsResponse.data as unknown as Wilayah[]);
        
        // Fetch yayasans data
        const yayasansResponse = await orphanageService.getActiveYayasan();
        // Use type assertion to make TypeScript happy without changing the data
        setYayasans(yayasansResponse.data as unknown as Yayasan[]);
        
        setError(null);
      } catch (err) {
        handleApiError(err, toast);
        setError('Gagal memuat data. Silakan coba lagi nanti.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [toast]);

  // Filter orphanages based on search term and filters
  const filteredOrphanages = useMemo(() => {
    return orphanages.filter(orphanage => {
      // Filter by search term
      const matchesSearch = searchTerm 
        ? orphanage.namaPanti.toLowerCase().includes(searchTerm.toLowerCase()) 
        : true;
      
      // Filter by region
      const matchesRegion = selectedRegion !== null
        ? orphanage.wilayahId === selectedRegion
        : true;
      
      // Filter by yayasan
      const matchesYayasan = selectedYayasan !== null
        ? orphanage.yayasanId === selectedYayasan
        : true;
      
      return matchesSearch && matchesRegion && matchesYayasan;
    });
  }, [orphanages, searchTerm, selectedRegion, selectedYayasan]);

  // Calculate total pages
  const totalPages = Math.max(1, Math.ceil(filteredOrphanages.length / ITEMS_PER_PAGE));

  // Get current page items
  const currentItems = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredOrphanages.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredOrphanages, currentPage]);

  // Reset filters
  const resetFilters = () => {
    setSearchTerm('');
    setSelectedRegion(null);
    setSelectedYayasan(null);
    setCurrentPage(1);
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top of the list
    window.scrollTo({
      top: document.getElementById('orphanage-grid')?.offsetTop || 0,
      behavior: 'smooth'
    });
  };

  // Handle search change
  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1); // Reset to first page when search changes
  };

  // Handle region change
  const handleRegionChange = (value: number | null) => {
    setSelectedRegion(value);
    setCurrentPage(1); // Reset to first page when filters change
  };

  // Handle yayasan change
  const handleYayasanChange = (value: number | null) => {
    setSelectedYayasan(value);
    setCurrentPage(1); // Reset to first page when filters change
  };

  return {
    orphanages,
    filteredOrphanages: currentItems,
    wilayahs,
    yayasans,
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
  };
}