// src/app/dashboard/volunteers/[id]/page.tsx
"use client";

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Image from 'next/image';
import { DashboardSection } from '@/components/pages/dashboard';
import VolunteerEditForm from '@/components/pages/volunteer/VolunteerEditForm';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Loading } from '@/components/ui/Loading';
import { useToast } from '@/contexts/ToastContext';
import { formatDate } from '@/lib/date-utils';
import volunteerManagementService from '@/services/volunteerManagementService';
import { VolunteerResponse } from '@/services/volunteerService';
import { objectToFormData } from '@/lib/form-utils';

export default function VolunteerDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  // id is already extracted above from useParams()
  const router = useRouter();
  const toast = useToast();
  const [volunteer, setVolunteer] = useState<VolunteerResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (id) {
      fetchVolunteerDetails(id);
    }
  }, [id]);

  const fetchVolunteerDetails = async (volunteerId: string) => {
    try {
      setIsLoading(true);
      const response = await volunteerManagementService.getVolunteerById(volunteerId);
      setVolunteer(response.data);
    } catch (error) {
      console.error('Error fetching volunteer:', error);
      toast.error('Gagal memuat data relawan');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateVolunteer = async (updatedData: any) => {
    try {
      setIsSubmitting(true);
      
      // Convert updated data to FormData
      const formData = objectToFormData(updatedData);
      
      const response = await volunteerManagementService.updateVolunteer(id, formData);
      
      // Update the local state with the response data
      setVolunteer(response.data);
      
      toast.success('Data relawan berhasil diperbarui');
    } catch (error) {
      console.error('Error updating volunteer:', error);
      toast.error('Gagal memperbarui data relawan');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    router.push('/dashboard/volunteers');
  };

  const renderStatus = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return <Badge variant="success">Aktif</Badge>;
      case 'PENDING':
        return <Badge variant="warning">Pending</Badge>;
      case 'INACTIVE':
        return <Badge variant="default">Tidak Aktif</Badge>;
      default:
        return <Badge variant="default">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header with Back Button */}
      <div className="flex items-center space-x-3 mb-6">
        <Button 
          variant="outline" 
          onClick={handleBack}
          className="px-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
        </Button>
        <h1 className="text-2xl font-bold text-gray-900">Detail Relawan</h1>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <Loading size="lg" text="Memuat data relawan..." />
        </div>
      ) : volunteer ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Volunteer Profile Card */}
          <Card className="lg:col-span-1">
            <CardContent className="p-6">
              <div className="flex flex-col items-center">
                <div className="relative h-32 w-32 rounded-full overflow-hidden border-4 border-white shadow-md mb-4">
                  {volunteer.profileImage ? (
                    <Image
                      src={volunteer.profileImage}
                      alt={volunteer.namaLengkap}
                      className="object-cover"
                      fill
                    />
                  ) : (
                    <div className="bg-gray-200 h-full w-full flex items-center justify-center">
                      <span className="text-3xl font-medium text-gray-500">
                        {volunteer.namaLengkap.charAt(0)}
                      </span>
                    </div>
                  )}
                </div>
                
                <h2 className="text-xl font-bold text-gray-900 text-center">
                  {volunteer.namaLengkap}
                </h2>
                
                <p className="text-gray-500 mb-2">{volunteer.email}</p>
                
                <div className="mb-4">
                  {renderStatus(volunteer.status || 'PENDING')}
                </div>
                
                <div className="w-full border-t border-gray-200 pt-4 mt-2">
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-500">Jabatan</p>
                      <p className="font-medium">{volunteer.jabatan || 'Relawan'}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-500">Wilayah</p>
                      <p className="font-medium">{volunteer.wilayah?.nama || '-'}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-500">Nomor HP</p>
                      <p className="font-medium">{volunteer.nomorHP}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-500">Terdaftar Sejak</p>
                      <p className="font-medium">{formatDate(volunteer.createdAt)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Volunteer Edit Form */}
          <div className="lg:col-span-2">
            <DashboardSection
              title="Informasi Relawan"
              description="Edit informasi relawan di bawah ini."
            >
              <VolunteerEditForm 
                volunteer={volunteer}
                onSubmit={handleUpdateVolunteer}
                isSubmitting={isSubmitting}
              />
            </DashboardSection>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 px-4 bg-white rounded-lg shadow">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="mt-4 text-lg font-medium text-gray-900">Relawan tidak ditemukan</h3>
          <p className="mt-1 text-gray-500">Relawan dengan ID tersebut tidak ditemukan atau telah dihapus.</p>
          <Button 
            variant="primary" 
            className="mt-6"
            onClick={handleBack}
          >
            Kembali ke Daftar Relawan
          </Button>
        </div>
      )}
    </div>
  );
}