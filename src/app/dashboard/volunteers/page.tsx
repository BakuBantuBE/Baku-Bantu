// src/app/dashboard/volunteers/page.tsx
"use client";

import { useState, useEffect } from 'react';
import { DashboardSection, DashboardStats } from '@/components/pages/dashboard';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/contexts/ToastContext';
import { VolunteersTable, VolunteerStats, AddVolunteerModal } from '@/components/pages/volunteer';
import useVolunteer from '@/hooks/useVolunteer';
import { registerVolunteer } from '@/services/volunteerService';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

export default function VolunteersPage() {
  const { 
    volunteers, 
    isLoading, 
    fetchVolunteers,
    addVolunteer 
  } = useVolunteer();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();
  const router = useRouter();
  const { hasPermission } = useAuth();

  // Check if user has permission to access this page
  useEffect(() => {
    if (!hasPermission('ADMIN')) {
      router.push('/dashboard');
      toast.error('Anda tidak memiliki akses ke halaman ini');
      return;
    }
    
    // Fetch volunteers on component mount
    fetchVolunteers();
  }, [fetchVolunteers, hasPermission, router, toast]);

  // Handle adding a new volunteer
  const handleAddVolunteer = async (formData: FormData) => {
    try {
      setIsSubmitting(true);
      
      // Use the register endpoint instead of the admin endpoint
      // This is the key fix for the "Route not found" error
      const response = await registerVolunteer({
        namaLengkap: formData.get('namaLengkap') as string,
        jenisKelamin: formData.get('jenisKelamin') as 'MALE' | 'FEMALE',
        tempatLahir: formData.get('tempatLahir') as string,
        tanggalLahir: formData.get('tanggalLahir') as string,
        alamatDomisili: formData.get('alamatDomisili') as string,
        kewarganegaraan: formData.get('kewarganegaraan') as 'INDONESIA' | 'ASING',
        nomorHP: formData.get('nomorHP') as string,
        email: formData.get('email') as string,
        wilayahId: Number(formData.get('wilayahId')),
        profileImage: formData.get('profileImage') as File
      });
      
      if (response.success) {
        toast.success('Relawan baru berhasil ditambahkan');
        setIsAddModalOpen(false);
        fetchVolunteers(); // Refresh the volunteer list
      } else {
        toast.error(response.message || 'Gagal menambahkan relawan');
      }
    } catch (error) {
      console.error('Error adding volunteer:', error);
      toast.error('Terjadi kesalahan saat menambahkan relawan');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manajemen Relawan</h1>
          <p className="text-gray-600 mt-1">
            Kelola data relawan yang terdaftar di BakuBantu
          </p>
        </div>
        <Button 
          variant="primary"
          onClick={() => setIsAddModalOpen(true)}
          leftIcon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
          }
        >
          Tambah Relawan
        </Button>
      </div>

      {/* Stats Section */}
      <VolunteerStats volunteers={volunteers} />

      {/* Volunteers Table Section */}
      <DashboardSection
        title="Daftar Relawan"
        description="Informasi detail tentang relawan yang terdaftar"
      >
        <VolunteersTable 
          volunteers={volunteers}
          isLoading={isLoading}
          onRefresh={fetchVolunteers}
        />
      </DashboardSection>

      {/* Add Volunteer Modal */}
      <AddVolunteerModal 
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSuccess={handleAddVolunteer}
      />
    </div>
  );
}