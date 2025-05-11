// src/hooks/useAdmin.ts
import { useState, useCallback, useEffect } from 'react';
import { useToast } from '@/contexts/ToastContext';
import adminService, { AdminResponse, CreateAdminParams } from '@/services/adminService';
import { VolunteerResponse } from '@/services/volunteerService';
import { handleApiError } from '@/lib/api-error-utils';

interface UseAdminReturn {
  admins: AdminResponse[];
  activeVolunteers: VolunteerResponse[];
  isLoading: boolean;
  isSaving: boolean;
  fetchAdmins: () => Promise<AdminResponse[]>;
  fetchActiveVolunteers: () => Promise<VolunteerResponse[]>;
  createAdmin: (data: CreateAdminParams) => Promise<boolean>;
  deleteAdmin: (id: string) => Promise<boolean>;
  resetPassword: (id: string) => Promise<boolean>;
  updateStatus: (id: string, status: 'ACTIVE' | 'INACTIVE') => Promise<boolean>;
}

export function useAdmin(): UseAdminReturn {
  const [admins, setAdmins] = useState<AdminResponse[]>([]);
  const [activeVolunteers, setActiveVolunteers] = useState<VolunteerResponse[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const toast = useToast();
  
  const fetchAdmins = useCallback(async (): Promise<AdminResponse[]> => {
    try {
      setIsLoading(true);
      const response = await adminService.getAllAdmins();
      setAdmins(response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching admins:", error);
      handleApiError(error, toast);
      return [];
    } finally {
      setIsLoading(false);
    }
  }, [toast]);
  
  const fetchActiveVolunteers = useCallback(async (): Promise<VolunteerResponse[]> => {
    try {
      setIsLoading(true);
      const response = await adminService.getActiveVolunteers();
      setActiveVolunteers(response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching active volunteers:", error);
      handleApiError(error, toast);
      return [];
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  // Load active volunteers when the hook is first used
  useEffect(() => {
    fetchActiveVolunteers();
  }, [fetchActiveVolunteers]);

  const createAdmin = useCallback(async (data: CreateAdminParams): Promise<boolean> => {
    try {
      setIsSaving(true);
      const response = await adminService.createAdmin(data);
      
      // Update local state
      setAdmins(prev => [...prev, response.data.admin]);
      
      toast.success(response.message || 'Relawan berhasil dijadikan admin');
      return true;
    } catch (error) {
      handleApiError(error, toast);
      return false;
    } finally {
      setIsSaving(false);
    }
  }, [toast]);

  const deleteAdmin = useCallback(async (id: string): Promise<boolean> => {
    try {
      setIsSaving(true);
      await adminService.deleteAdmin(id);
      
      // Update local state
      setAdmins(prev => prev.filter(admin => admin.id !== id));
      
      toast.success('Admin berhasil dihapus');
      return true;
    } catch (error) {
      handleApiError(error, toast);
      return false;
    } finally {
      setIsSaving(false);
    }
  }, [toast]);

  const resetPassword = useCallback(async (id: string): Promise<boolean> => {
    try {
      setIsSaving(true);
      const response = await adminService.resetPassword(id);
      
      // Update the admin in our local state if needed
      const updatedAdmin = response.data;
      setAdmins(prev => 
        prev.map(admin => admin.id === id ? updatedAdmin : admin)
      );
      
      // Show success message
      toast.success(response.message || 'Password admin berhasil direset ke default');
      return true;
    } catch (error) {
      handleApiError(error, toast);
      return false;
    } finally {
      setIsSaving(false);
    }
  }, [toast]);

  const updateStatus = useCallback(async (id: string, status: 'ACTIVE' | 'INACTIVE'): Promise<boolean> => {
    try {
      setIsSaving(true);
      await adminService.updateStatus(id, status);
      
      // Update local state
      setAdmins(prev => 
        prev.map(admin => admin.id === id ? { ...admin, status } : admin)
      );
      
      const statusText = status === 'ACTIVE' ? 'aktif' : 'tidak aktif';
      toast.success(`Status admin berhasil diubah menjadi ${statusText}`);
      return true;
    } catch (error) {
      handleApiError(error, toast);
      return false;
    } finally {
      setIsSaving(false);
    }
  }, [toast]);

  return {
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
  };
}

export default useAdmin;