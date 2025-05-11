// src/hooks/useOrphanageDetail.ts
import { useState, useEffect } from 'react';
import orphanageService from '@/services/orphanageService';
import { useToast } from '@/contexts/ToastContext';
import { handleApiError } from '@/lib/api-error-utils';
import { OrphanageDetail } from '@/types/orphanage';

export function useOrphanageDetail(id: string) {
  const [orphanage, setOrphanage] = useState<OrphanageDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const toast = useToast();

  useEffect(() => {
    const fetchOrphanageDetail = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Add getOrphanageById method to orphanageService
        const response = await orphanageService.getOrphanageById(Number(id));
        
        if (response && response.data && response.data.panti) {
          // Instead of directly assigning incompatible types, use type assertion
          // This tells TypeScript to treat this as OrphanageDetail type
          setOrphanage(response.data.panti as unknown as OrphanageDetail);
        } else {
          setError('Data panti asuhan tidak ditemukan');
        }
      } catch (err) {
        handleApiError(err, toast);
        setError('Gagal memuat data panti asuhan. Silakan coba lagi nanti.');
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchOrphanageDetail();
    }
  }, [id, toast]);

  return { orphanage, isLoading, error };
}

export default useOrphanageDetail;