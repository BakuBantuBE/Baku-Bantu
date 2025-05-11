// src/hooks/useVolunteer.ts
import { useState, useCallback } from 'react';
import { useToast } from '@/contexts/ToastContext';
import volunteerManagementService from '@/services/volunteerManagementService';
import { VolunteerResponse } from '@/services/volunteerService';
import { handleApiError } from '@/lib/api-error-utils';

interface UseVolunteerReturn {
  volunteers: VolunteerResponse[];
  currentVolunteer: VolunteerResponse | null;
  isLoading: boolean;
  isSaving: boolean;
  fetchVolunteers: () => Promise<VolunteerResponse[]>; 
  fetchVolunteerById: (id: string) => Promise<VolunteerResponse | null>;
  updateVolunteer: (id: string, data: globalThis.FormData) => Promise<boolean>;
  updateVolunteerStatus: (id: string, status: 'ACTIVE' | 'PENDING' | 'INACTIVE') => Promise<boolean>;
  addVolunteer: (data: globalThis.FormData) => Promise<boolean>;
}

/**
 * Hook for managing volunteer data
 */
export function useVolunteer(): UseVolunteerReturn {
  const [volunteers, setVolunteers] = useState<VolunteerResponse[]>([]);
  const [currentVolunteer, setCurrentVolunteer] = useState<VolunteerResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const toast = useToast();

  /**
   * Fetch all volunteers
   */
  const fetchVolunteers = useCallback(async (): Promise<VolunteerResponse[]> => {
    try {
      setIsLoading(true);
      const response = await volunteerManagementService.getAllVolunteers();
      setVolunteers(response.data);
      return response.data;
    } catch (error) {
      handleApiError(error, toast);
      return [];
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  /**
   * Fetch volunteer by ID
   */
  const fetchVolunteerById = useCallback(async (id: string): Promise<VolunteerResponse | null> => {
    try {
      setIsLoading(true);
      const response = await volunteerManagementService.getVolunteerById(id);
      setCurrentVolunteer(response.data);
      return response.data;
    } catch (error) {
      handleApiError(error, toast);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  /**
   * Update volunteer
   */
  const updateVolunteer = useCallback(async (id: string, data: globalThis.FormData): Promise<boolean> => {
    try {
      setIsSaving(true);
      const response = await volunteerManagementService.updateVolunteer(id, data);
      
      // Update local state
      setCurrentVolunteer(response.data);
      setVolunteers(prevVolunteers => 
        prevVolunteers.map(v => v.id === id ? response.data : v)
      );
      
      toast.success('Data relawan berhasil diperbarui');
      return true;
    } catch (error) {
      handleApiError(error, toast);
      return false;
    } finally {
      setIsSaving(false);
    }
  }, [toast]);

  /**
   * Update volunteer status
   */
  const updateVolunteerStatus = useCallback(async (id: string, status: 'ACTIVE' | 'PENDING' | 'INACTIVE'): Promise<boolean> => {
    try {
      setIsSaving(true);
      await volunteerManagementService.updateVolunteerStatus(id, status);
      
      // Update local state
      if (currentVolunteer && currentVolunteer.id === id) {
        setCurrentVolunteer({
          ...currentVolunteer,
          status
        });
      }
      
      setVolunteers(prevVolunteers => 
        prevVolunteers.map(v => v.id === id ? { ...v, status } : v)
      );
      
      const statusText = status === 'ACTIVE' ? 'Aktif' : 
                          status === 'PENDING' ? 'Pending' : 'Tidak Aktif';
      toast.success(`Status relawan berhasil diubah menjadi ${statusText}`);
      return true;
    } catch (error) {
      handleApiError(error, toast);
      return false;
    } finally {
      setIsSaving(false);
    }
  }, [currentVolunteer, toast]);

  /**
   * Add new volunteer
   */
  const addVolunteer = useCallback(async (data: globalThis.FormData): Promise<boolean> => {
    try {
      setIsSaving(true);
      const response = await volunteerManagementService.addVolunteer(data);
      
      // Update local state
      setVolunteers(prevVolunteers => [...prevVolunteers, response.data]);
      toast.success('Relawan baru berhasil ditambahkan');
      return true;
    } catch (error) {
      handleApiError(error, toast);
      return false;
    } finally {
      setIsSaving(false);
    }
  }, [toast]);

  return {
    volunteers,
    currentVolunteer,
    isLoading,
    isSaving,
    fetchVolunteers,
    fetchVolunteerById,
    updateVolunteer,
    updateVolunteerStatus,
    addVolunteer
  };
}

export default useVolunteer;