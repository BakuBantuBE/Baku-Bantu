// src/hooks/useYayasan.ts
import { useState, useCallback } from 'react';
import { useToast } from '@/contexts/ToastContext';
import yayasanService, { 
  YayasanResponse, 
  CreateYayasanParams, 
  UpdateYayasanParams 
} from '@/services/yayasanService';
import { handleApiError } from '@/lib/api-error-utils';

interface UseYayasanReturn {
  yayasans: YayasanResponse[];
  currentYayasan: YayasanResponse | null;
  isLoading: boolean;
  isSaving: boolean;
  fetchYayasans: () => Promise<YayasanResponse[]>;
  fetchYayasanById: (id: number) => Promise<YayasanResponse | null>;
  createYayasan: (data: CreateYayasanParams) => Promise<boolean>;
  updateYayasan: (id: number, data: UpdateYayasanParams) => Promise<boolean>;
  deleteYayasan: (id: number) => Promise<boolean>;
  updateYayasanStatus: (id: number, status: 'ACTIVE' | 'INACTIVE') => Promise<boolean>;
}

export function useYayasan(): UseYayasanReturn {
  const [yayasans, setYayasans] = useState<YayasanResponse[]>([]);
  const [currentYayasan, setCurrentYayasan] = useState<YayasanResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const toast = useToast();

  const fetchYayasans = useCallback(async (): Promise<YayasanResponse[]> => {
    try {
      setIsLoading(true);
      const response = await yayasanService.getAllYayasan();
      setYayasans(response.data);
      return response.data;
    } catch (error) {
      handleApiError(error, toast);
      return [];
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  const fetchYayasanById = useCallback(async (id: number): Promise<YayasanResponse | null> => {
    try {
      setIsLoading(true);
      const response = await yayasanService.getYayasanById(id);
      setCurrentYayasan(response.data);
      return response.data;
    } catch (error) {
      handleApiError(error, toast);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  const createYayasan = useCallback(async (data: CreateYayasanParams): Promise<boolean> => {
    try {
      setIsSaving(true);
      const response = await yayasanService.createYayasan(data);
      
      // Update local state
      setYayasans(prev => [...prev, response.data]);
      
      toast.success('Yayasan berhasil ditambahkan');
      return true;
    } catch (error) {
      handleApiError(error, toast);
      return false;
    } finally {
      setIsSaving(false);
    }
  }, [toast]);

  const updateYayasan = useCallback(async (id: number, data: UpdateYayasanParams): Promise<boolean> => {
    try {
      setIsSaving(true);
      const response = await yayasanService.updateYayasan(id, data);
      
      // Update local state
      if (currentYayasan && currentYayasan.id === id) {
        setCurrentYayasan(response.data);
      }
      
      setYayasans(prev => 
        prev.map(yayasan => yayasan.id === id ? response.data : yayasan)
      );
      
      toast.success('Yayasan berhasil diperbarui');
      return true;
    } catch (error) {
      handleApiError(error, toast);
      return false;
    } finally {
      setIsSaving(false);
    }
  }, [currentYayasan, toast]);

  const deleteYayasan = useCallback(async (id: number): Promise<boolean> => {
    try {
      setIsSaving(true);
      await yayasanService.deleteYayasan(id);
      
      // Update local state
      setYayasans(prev => prev.filter(yayasan => yayasan.id !== id));
      
      if (currentYayasan && currentYayasan.id === id) {
        setCurrentYayasan(null);
      }
      
      toast.success('Yayasan berhasil dihapus');
      return true;
    } catch (error) {
      handleApiError(error, toast);
      return false;
    } finally {
      setIsSaving(false);
    }
  }, [currentYayasan, toast]);

  const updateYayasanStatus = useCallback(async (id: number, status: 'ACTIVE' | 'INACTIVE'): Promise<boolean> => {
    try {
      setIsSaving(true);
      await yayasanService.updateYayasanStatus(id, status);
      
      // Update local state
      if (currentYayasan && currentYayasan.id === id) {
        setCurrentYayasan({
          ...currentYayasan,
          status
        });
      }
      
      setYayasans(prev => 
        prev.map(yayasan => yayasan.id === id ? { ...yayasan, status } : yayasan)
      );
      
      const statusText = status === 'ACTIVE' ? 'aktif' : 'tidak aktif';
      toast.success(`Status yayasan berhasil diubah menjadi ${statusText}`);
      return true;
    } catch (error) {
      handleApiError(error, toast);
      return false;
    } finally {
      setIsSaving(false);
    }
  }, [currentYayasan, toast]);

  return {
    yayasans,
    currentYayasan,
    isLoading,
    isSaving,
    fetchYayasans,
    fetchYayasanById,
    createYayasan,
    updateYayasan,
    deleteYayasan,
    updateYayasanStatus
  };
}

export default useYayasan;