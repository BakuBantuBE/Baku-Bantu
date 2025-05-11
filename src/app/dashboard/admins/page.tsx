// src/app/dashboard/admins/page.tsx
"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { DashboardSection } from '@/components/pages/dashboard';
import { useToast } from '@/contexts/ToastContext';
import { 
  AdminsTable, 
  AddAdminModal, 
  DeleteConfirmModal, 
  PasswordResetModal,
  AdminMobileView,
  AdminHeader
} from '@/components/pages/admin';
import { useAdmin } from '@/hooks/useAdmin';
import { useAuth } from '@/contexts/AuthContext';

export default function AdminsPage() {
  const {
    admins,
    activeVolunteers,
    isLoading,
    isSaving,
    fetchAdmins,
    fetchActiveVolunteers,
    createAdmin,
    deleteAdmin,
    resetPassword,
    updateStatus
  } = useAdmin();
  
  const toast = useToast();
  const router = useRouter();
  const { hasPermission } = useAuth();
  
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [adminToDelete, setAdminToDelete] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Check screen size for responsive design
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    handleResize();
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Check if user has permission to access this page
  useEffect(() => {
    if (!hasPermission('SUPERADMIN')) {
      router.push('/dashboard');
      toast.error('Anda tidak memiliki akses ke halaman ini');
      return;
    }
    
    // Fetch admins and active volunteers on component mount
    const loadData = async () => {
      try {
        await Promise.all([
          fetchAdmins(),
          fetchActiveVolunteers()
        ]);
      } catch (error) {
        console.error("Error loading data:", error);
        toast.error("Gagal memuat data. Silakan coba lagi.");
      }
    };
    
    loadData();
  }, [hasPermission, router, toast, fetchAdmins, fetchActiveVolunteers]);

  const handleAddAdmin = async (volunteerId: string, role: 'ADMIN' | 'SUPERADMIN') => {
    const success = await createAdmin({ volunteerId, role });
    if (success) {
      setIsAddModalOpen(false);
      
      // Refresh data after adding admin
      fetchAdmins();
      fetchActiveVolunteers();
    }
  };

  const handleDeleteClick = (id: string) => {
    setAdminToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!adminToDelete) return;
    
    const success = await deleteAdmin(adminToDelete);
    if (success) {
      setIsDeleteModalOpen(false);
      setAdminToDelete(null);
    }
  };

  const handleResetPassword = async (id: string) => {
    const success = await resetPassword(id);
    if (success) {
      setIsResetModalOpen(true);
    }
  };

  const handleToggleStatus = async (id: string, newStatus: 'ACTIVE' | 'INACTIVE') => {
    await updateStatus(id, newStatus);
  };

  // Calculate stats
  const activeAdmins = admins.filter(admin => admin.status === 'ACTIVE').length;
  const inactiveAdmins = admins.filter(admin => admin.status === 'INACTIVE').length;

  return (
    <div className="space-y-6">
      <AdminHeader
        totalAdmins={admins.length}
        activeAdmins={activeAdmins}
        inactiveAdmins={inactiveAdmins}
        onAddClick={() => setIsAddModalOpen(true)}
      />

      <DashboardSection
        title="Daftar Admin"
        description="Kelola akun admin untuk sistem BakuBantu"
      >
        {isMobile ? (
          <AdminMobileView
            admins={admins}
            onDelete={handleDeleteClick}
            onResetPassword={handleResetPassword}
            onToggleStatus={handleToggleStatus}
          />
        ) : (
          <AdminsTable 
            admins={admins}
            isLoading={isLoading}
            onDelete={handleDeleteClick}
            onResetPassword={handleResetPassword}
            onToggleStatus={handleToggleStatus}
          />
        )}
      </DashboardSection>

      {/* Add Admin Modal with Filtered Active Volunteers */}
      <AddAdminModal 
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddAdmin}
        isSubmitting={isSaving}
        activeVolunteers={activeVolunteers}
        existingAdmins={admins}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal 
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        isLoading={isSaving}
      />

      {/* Password Reset Success Modal */}
      <PasswordResetModal 
        isOpen={isResetModalOpen}
        onClose={() => setIsResetModalOpen(false)}
      />
    </div>
  );
}