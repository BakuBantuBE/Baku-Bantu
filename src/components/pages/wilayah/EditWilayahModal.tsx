// src/components/pages/wilayah/EditWilayahModal.tsx
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { useToast } from '@/contexts/ToastContext';
import { updateWilayah } from '@/services/wilayah';

interface Wilayah {
  id: number;
  nama: string;
  createdAt: string;
  updatedAt: string;
  status: 'ACTIVE' | 'INACTIVE';
  volunteersCount: number;
  totalCount: number;
}

interface EditWilayahModalProps {
  isOpen: boolean;
  onClose: (refresh?: boolean) => void;
  wilayah: Wilayah | null;
}

export const EditWilayahModal: React.FC<EditWilayahModalProps> = ({
  isOpen,
  onClose,
  wilayah,
}) => {
  const [wilayahName, setWilayahName] = useState('');
  const [status, setStatus] = useState<'ACTIVE' | 'INACTIVE'>('ACTIVE');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [nameError, setNameError] = useState('');
  const toast = useToast();

  useEffect(() => {
    if (wilayah) {
      setWilayahName(wilayah.nama);
      setStatus(wilayah.status);
    }
  }, [wilayah]);

  if (!isOpen || !wilayah) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset errors
    setNameError('');
    setError('');
    
    // Validate form
    let isValid = true;
    
    if (!wilayahName.trim()) {
      setNameError('Nama wilayah harus diisi');
      isValid = false;
    }

    if (!isValid) return;

    setIsSubmitting(true);

    try {
      // Call the API to update wilayah
      const response = await updateWilayah(wilayah.id, wilayahName, status);
      
      if (response.success) {
        toast.success('Wilayah berhasil diperbarui');
        onClose(true); // Close modal and refresh data
      } else {
        setError(response.message || 'Gagal memperbarui wilayah');
        toast.error(response.message || 'Gagal memperbarui wilayah');
      }
    } catch (error) {
      console.error('Error updating wilayah:', error);
      setError('Terjadi kesalahan saat memperbarui wilayah');
      toast.error('Terjadi kesalahan saat memperbarui wilayah');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Edit Wilayah</h2>
          <button
            onClick={() => onClose()}
            className="text-gray-400 hover:text-gray-500"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <Input
              label="Nama Wilayah"
              placeholder="Masukkan nama wilayah"
              value={wilayahName}
              onChange={(e) => setWilayahName(e.target.value)}
              error={nameError}
              autoFocus
            />
          </div>

          <div className="mb-4">
            <Select
              label="Status"
              options={[
                { value: 'ACTIVE', label: 'Aktif' },
                { value: 'INACTIVE', label: 'Tidak Aktif' },
              ]}
              value={status}
              onChange={(e) => setStatus(e.target.value as 'ACTIVE' | 'INACTIVE')}
            />
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm">
              {error}
            </div>
          )}

          <div className="flex justify-end space-x-3 mt-6">
            <Button
              variant="outline"
              type="button"
              onClick={() => onClose()}
              disabled={isSubmitting}
            >
              Batal
            </Button>
            <Button
              variant="primary"
              type="submit"
              isLoading={isSubmitting}
            >
              Simpan
            </Button>
          </div>
        </form>
      </div>
    </div>
  )};