// src/components/pages/about/VolunteerList.tsx
"use client";

import React, { useEffect, useState, useMemo } from 'react';
import Image from 'next/image';
import { getActiveVolunteers, VolunteerResponse, Wilayah } from '@/services/volunteerService';
import { Loading } from '@/components/ui/Loading';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils';

/**
 * Types for component props
 */
interface VolunteerCardProps {
  volunteer: VolunteerResponse;
  className?: string;
}

interface FilterProps {
  wilayahs: Wilayah[];
  selectedWilayah: string | number | null;
  onWilayahChange: (id: string | number | null) => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

/**
 * Hierarchy order for positions
 * 1. Lead Coordinator
 * 2. Procurement Officer
 * 3. Communication Officer  
 * 4. Administration Officer
 * 5. Psychosocial Program Officer
 * 6. Government Relations Officer
 * 7. Finance Officer
 * 8. Software Development Volunteer
 * 9. Volunteer
 */
const POSITION_HIERARCHY: { [key: string]: number } = {
  'Lead Coordinator': 1,
  'Procurement Officer': 2,
  'Communication Officer': 3,
  'Administration Officer': 4,
  'Psychosocial Program Officer': 5,
  'Government Relations Officer': 6,
  'Finance Officer': 7,
  'Software Development Volunteer': 8,
  'Volunteer': 9,
  // Default value for unknown positions
  'default': 99
};

/**
 * Function to get position order
 */
const getPositionOrder = (jabatan: string | null | undefined): number => {
  if (!jabatan) return POSITION_HIERARCHY['default'];
  
  // Check for exact match first
  if (jabatan in POSITION_HIERARCHY) {
    return POSITION_HIERARCHY[jabatan];
  }
  
  // Check for partial matches (case insensitive)
  const jabatanLower = jabatan.toLowerCase();
  for (const [key, value] of Object.entries(POSITION_HIERARCHY)) {
    if (key.toLowerCase().includes(jabatanLower) || jabatanLower.includes(key.toLowerCase())) {
      return value;
    }
  }
  
  return POSITION_HIERARCHY['default'];
};

/**
 * Individual volunteer card component
 */
const VolunteerCard: React.FC<VolunteerCardProps> = ({ volunteer, className }) => {
  // Handle gender display
  const gender = volunteer.jenisKelamin === 'MALE' ? 'Laki-laki' : 'Perempuan';
  // Handle missing profile image
  const imageUrl = volunteer.profileImage || '/images/default-profile.jpg';
  // Get position order for badge styling
  const positionOrder = getPositionOrder(volunteer.jabatan);
  
  return (
    <div className={cn("group", className)}>
      <div className="bg-white rounded-xl overflow-hidden shadow-lg transition-all duration-300 transform group-hover:-translate-y-2 group-hover:shadow-xl">
        {/* Volunteer image with overlay */}
        <div className="rounded-t-xl overflow-hidden aspect-square relative">
          <Image 
            src={imageUrl} 
            alt={volunteer.namaLengkap}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
            <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 flex justify-center space-x-3">
              <a href={`mailto:${volunteer.email}`} aria-label={`Email ${volunteer.namaLengkap}`} className="w-8 h-8 rounded-full bg-white/80 flex items-center justify-center text-gray-800 hover:bg-babyBlue hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </a>
              <a href={`tel:${volunteer.nomorHP}`} aria-label={`Call ${volunteer.namaLengkap}`} className="w-8 h-8 rounded-full bg-white/80 flex items-center justify-center text-gray-800 hover:bg-forest hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
        
        {/* Volunteer information */}
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 text-center">{volunteer.namaLengkap}</h3>
          
          {volunteer.jabatan && (
            <div className="flex items-center justify-center gap-2 mb-3">
              <p className="text-sm text-gray-600">{volunteer.jabatan}</p>
              {positionOrder <= 7 && (
                <div className="inline-flex items-center">
                  <span className="text-orange-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </span>
                </div>
              )}
            </div>
          )}
          
          <div className="space-y-2 mt-4 text-sm">
            {volunteer.wilayah && (
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-babyBlue-dark mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-gray-600 truncate">{volunteer.wilayah.nama}</span>
              </div>
            )}
            
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-babyBlue-dark mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span className="text-gray-600">{gender}</span>
            </div>
            
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-babyBlue-dark mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span className="text-gray-600 truncate">{volunteer.alamatDomisili}</span>
            </div>
          </div>
          
          {volunteer.status && (
            <div className="mt-4 flex justify-center">
              <Badge 
                variant={volunteer.status === 'ACTIVE' ? 'primary' : 'default'}
                className="uppercase text-xs"
              >
                {volunteer.status}
              </Badge>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

/**
 * Filter component for volunteer list
 */
const FilterControls: React.FC<FilterProps> = ({ 
  wilayahs, 
  selectedWilayah, 
  onWilayahChange, 
  searchTerm, 
  onSearchChange 
}) => {
  return (
    <div className="mb-10">
      <div className="m-6">
        <div className="relative max-w-md mx-auto">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Cari berdasarkan nama atau jabatan..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-babyBlue focus:border-transparent"
          />
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>
      
      <div>
        <div className="flex flex-wrap justify-center gap-2">
          <button
            onClick={() => onWilayahChange(null)}
            className={cn(
              "px-3 py-1.5 text-sm rounded-md transition-colors",
              selectedWilayah === null
                ? "bg-babyBlue text-white shadow-sm"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            )}
          >
            Semua Wilayah
          </button>
          
          {wilayahs.map((wilayah) => (
            <button
              key={wilayah.id}
              onClick={() => onWilayahChange(wilayah.id)}
              className={cn(
                "px-3 py-1.5 text-sm rounded-md transition-colors",
                selectedWilayah === wilayah.id
                  ? "bg-babyBlue text-white shadow-sm"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              )}
            >
              {wilayah.nama}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

/**
 * Stats component to display volunteer statistics
 */
interface StatsProps {
  volunteers: VolunteerResponse[];
}

const VolunteerStats: React.FC<StatsProps> = ({ volunteers }) => {
  // Calculate stats
  const totalVolunteers = volunteers.length;
  const maleCount = volunteers.filter(v => v.jenisKelamin === 'MALE').length;
  const femaleCount = volunteers.filter(v => v.jenisKelamin === 'FEMALE').length;
  
  // Get unique cities
  const uniqueCities = [...new Set(volunteers.map(v => v.alamatDomisili))].length;
  
  // Count leadership positions (only ranks 1-7, excluding Software Development Volunteer and regular Volunteer)
  const leadershipCount = volunteers.filter(v => 
    v.jabatan && getPositionOrder(v.jabatan) <= 7
  ).length;
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mt-12">
      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Total Relawan</p>
            <p className="text-3xl font-bold text-babyBlue-dark">{totalVolunteers}</p>
          </div>
          <div className="bg-babyBlue-light/30 p-3 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-babyBlue-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Posisi Kepemimpinan</p>
            <p className="text-3xl font-bold text-poppy-dark">{leadershipCount}</p>
          </div>
          <div className="bg-poppy-light/30 p-3 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-poppy-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Laki-laki</p>
            <p className="text-3xl font-bold text-forest-dark">{maleCount}</p>
          </div>
          <div className="bg-forest-light/30 p-3 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-forest-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Perempuan</p>
            <p className="text-3xl font-bold text-lavender-dark">{femaleCount}</p>
          </div>
          <div className="bg-lavender-light/30 p-3 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-lavender-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Kota</p>
            <p className="text-3xl font-bold text-mango-dark">{uniqueCities}</p>
          </div>
          <div className="bg-mango-light/30 p-3 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-mango-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Main volunteer list component
 */
const VolunteerList: React.FC = () => {
  // State management
  const [volunteers, setVolunteers] = useState<VolunteerResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedWilayah, setSelectedWilayah] = useState<string | number | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Fetch volunteer data
  useEffect(() => {
    const fetchVolunteers = async () => {
      try {
        setLoading(true);
        const response = await getActiveVolunteers();
        
        if (response.success && response.data) {
          setVolunteers(response.data);
          setError(null);
        } else {
          setError(response.message || 'Failed to fetch volunteers');
        }
      } catch (err) {
        setError('An unexpected error occurred');
        console.error('Error fetching volunteers:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchVolunteers();
  }, []);

  // Extract unique wilayahs for filtering - using useMemo for performance
  const uniqueWilayahs = useMemo(() => {
    if (!volunteers.length) return [];
    
    // Create a Map to ensure uniqueness by ID
    const wilayahMap = new Map<string | number, Wilayah>();
    
    volunteers.forEach(volunteer => {
      if (volunteer.wilayah) {
        wilayahMap.set(volunteer.wilayah.id, volunteer.wilayah);
      }
    });
    
    // Convert Map to array and sort alphabetically
    return Array.from(wilayahMap.values())
      .sort((a, b) => a.nama.localeCompare(b.nama));
  }, [volunteers]);

  // Filter and sort volunteers based on search, wilayah, and position hierarchy
  const filteredAndSortedVolunteers = useMemo(() => {
    let filtered = volunteers.filter(volunteer => {
      // Filter by wilayah if selected
      const matchesWilayah = selectedWilayah === null || 
        (volunteer.wilayah && volunteer.wilayah.id === selectedWilayah);
      
      // Filter by search term
      const matchesSearch = searchTerm === '' || 
        volunteer.namaLengkap.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (volunteer.jabatan && volunteer.jabatan.toLowerCase().includes(searchTerm.toLowerCase()));
      
      return matchesWilayah && matchesSearch;
    });

    // Sort by position hierarchy, then by name
    return filtered.sort((a, b) => {
      const orderA = getPositionOrder(a.jabatan);
      const orderB = getPositionOrder(b.jabatan);
      
      // Primary sort: by position hierarchy
      if (orderA !== orderB) {
        return orderA - orderB;
      }
      
      // Secondary sort: alphabetically by name if same position order
      return a.namaLengkap.localeCompare(b.namaLengkap);
    });
  }, [volunteers, selectedWilayah, searchTerm]);

  return (
    <section className="py-20 bg-gray-50 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute left-0 top-0 w-72 h-72 bg-babyBlue/10 rounded-full blur-3xl"></div>
      <div className="absolute right-0 bottom-0 w-72 h-72 bg-lavender/10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-6 relative">
        {/* Section header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center mb-4">
            <div className="w-12 h-px bg-poppy mr-4"></div>
            <p className="text-sm uppercase tracking-wider font-semibold text-poppy">TIM KAMI</p>
            <div className="w-12 h-px bg-poppy ml-4"></div>
          </div>
          <h2 className="text-4xl font-bold mb-4 text-gray-900">Relawan Aktif</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Para relawan kami adalah individu-individu luar biasa yang berkomitmen untuk menciptakan 
            dampak positif di Sulawesi Utara melalui identifikasi kebutuhan dan respons sosial.
          </p>
        </div>
        
        {/* Loading state */}
        {loading && (
          <div className="flex justify-center py-20">
            <Loading size="lg" text="Memuat data relawan..." />
          </div>
        )}
        
        {/* Error state */}
        {!loading && error && (
          <div className="text-center py-12 bg-white rounded-lg shadow-md">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{error}</h3>
            <p className="text-gray-600 mb-4">Silakan coba kembali dalam beberapa saat.</p>
          </div>
        )}
        
        {/* Content when data is loaded */}
        {!loading && !error && volunteers.length > 0 && (
          <>
            {/* Stats */}
            <VolunteerStats volunteers={volunteers} />
            
            {/* Filter controls */}
            <FilterControls
              wilayahs={uniqueWilayahs}
              selectedWilayah={selectedWilayah}
              onWilayahChange={setSelectedWilayah}
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
            />
            
            {/* Volunteer grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredAndSortedVolunteers.map((volunteer) => (
                <VolunteerCard 
                  key={volunteer.id} 
                  volunteer={volunteer} 
                />
              ))}
            </div>
            
            {/* Empty state */}
            {filteredAndSortedVolunteers.length === 0 && (
              <div className="text-center py-10 bg-white rounded-lg shadow-sm">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-yellow-100 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Tidak ditemukan relawan</h3>
                <p className="text-gray-600">Silakan coba dengan kata kunci atau filter yang berbeda.</p>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default VolunteerList;