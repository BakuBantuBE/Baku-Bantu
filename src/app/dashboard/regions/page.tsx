// src/app/dashboard/regions/page.tsx
"use client";

import { useEffect, useState } from 'react';
import { DashboardSection, DashboardTable } from '@/components/pages/dashboard';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/contexts/ToastContext';
import { WilayahList, AddWilayahModal } from '@/components/pages/wilayah';
import { fetchWilayahList, deleteWilayah } from '@/services/wilayah';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

export interface Wilayah {
  id: number;
  nama: string;
  createdAt: string;
  updatedAt: string;
  status: 'ACTIVE' | 'INACTIVE';
  volunteersCount: number;
  totalCount: number;
}

export default function RegionsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [wilayahList, setWilayahList] = useState<Wilayah[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [deleteConfirmModalOpen, setDeleteConfirmModalOpen] = useState(false);
  const [wilayahToDelete, setWilayahToDelete] = useState<Wilayah | null>(null);
  const toast = useToast();
  const { hasPermission } = useAuth();
  const router = useRouter();

  // Check if user has permission to access this page
  useEffect(() => {
    if (!hasPermission('SUPERADMIN')) {
      router.push('/dashboard');
      toast.error('Anda tidak memiliki akses ke halaman ini');
      return;
    }
    
    // Fetch wilayah list on component mount
    loadWilayahData();
  }, [hasPermission, router, toast]);

  // This effect was moved to the permission check useEffect

  // Function to load wilayah data
  const loadWilayahData = async () => {
    setIsLoading(true);
    try {
      const response = await fetchWilayahList();
      if (response.success && response.data) {
        setWilayahList(response.data);
      } else {
        toast.error(response.message || 'Failed to fetch regions');
      }
    } catch (error) {
      console.error('Error fetching wilayah:', error);
      toast.error('Terjadi kesalahan saat mengambil data wilayah');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle delete wilayah
  const handleDelete = async (wilayah: Wilayah) => {
    setWilayahToDelete(wilayah);
    setDeleteConfirmModalOpen(true);
  };

  // Confirm delete wilayah
  const confirmDelete = async () => {
    if (!wilayahToDelete) return;
    
    try {
      const response = await deleteWilayah(wilayahToDelete.id);
      if (response.success) {
        toast.success('Wilayah berhasil dihapus');
        loadWilayahData(); // Reload the wilayah list
      } else {
        toast.error(response.message || 'Gagal menghapus wilayah');
      }
    } catch (error) {
      console.error('Error deleting wilayah:', error);
      toast.error('Terjadi kesalahan saat menghapus wilayah');
    } finally {
      setDeleteConfirmModalOpen(false);
      setWilayahToDelete(null);
    }
  };

  // Handle modal close
  const handleModalClose = (refresh: boolean = false) => {
    setIsAddModalOpen(false);
    if (refresh) {
      loadWilayahData();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Wilayah</h1>
        <Button 
          variant="primary"
          onClick={() => setIsAddModalOpen(true)}
          leftIcon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
          }
        >
          Tambah Wilayah
        </Button>
      </div>

      <DashboardSection
        title="Daftar Wilayah"
        description="Kelola wilayah untuk relawan dan panti asuhan"
      >
        <WilayahList 
          wilayahList={wilayahList}
          isLoading={isLoading}
          onRefresh={loadWilayahData}
          onDelete={handleDelete}
        />
      </DashboardSection>

      {/* Add Wilayah Modal */}
      <AddWilayahModal 
        isOpen={isAddModalOpen}
        onClose={handleModalClose}
      />

      {/* Delete Confirmation Modal */}
      {deleteConfirmModalOpen && wilayahToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Konfirmasi Hapus</h2>
            <p className="text-gray-600 mb-6">
              Apakah Anda yakin ingin menghapus wilayah <span className="font-semibold">{wilayahToDelete.nama}</span>?
              {wilayahToDelete.volunteersCount > 0 && (
                <span className="block mt-2 text-red-500">
                  Wilayah ini memiliki {wilayahToDelete.volunteersCount} relawan terdaftar.
                </span>
              )}
            </p>
            <div className="flex justify-end space-x-3">
              <Button 
                variant="outline" 
                onClick={() => setDeleteConfirmModalOpen(false)}
              >
                Batal
              </Button>
              <Button 
                variant="accent" 
                onClick={confirmDelete}
              >
                Hapus
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}