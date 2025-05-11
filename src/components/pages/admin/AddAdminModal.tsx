// src/components/pages/admin/AddAdminModal.tsx
import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Select';
import { VolunteerResponse } from '@/services/volunteerService';
import { AdminResponse } from '@/services/adminService';

interface AddAdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (volunteerId: string, role: 'ADMIN' | 'SUPERADMIN') => Promise<void>;
  isSubmitting: boolean;
  activeVolunteers: VolunteerResponse[];
  existingAdmins: AdminResponse[];
}

const AddAdminModal: React.FC<AddAdminModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  isSubmitting,
  activeVolunteers,
  existingAdmins
}) => {
  const [volunteerId, setVolunteerId] = useState('');
  const [role, setRole] = useState<'ADMIN' | 'SUPERADMIN'>('ADMIN');
  const [errors, setErrors] = useState<{
    volunteerId?: string;
  }>({});

  // Filter out volunteers who are already admins
  const availableVolunteers = useMemo(() => {
    // Get all email addresses of existing admins
    const adminEmails = existingAdmins.map(admin => admin.email.toLowerCase());
    
    // Filter out volunteers whose emails are in the adminEmails array
    return activeVolunteers.filter(volunteer => 
      !adminEmails.includes(volunteer.email.toLowerCase())
    );
  }, [activeVolunteers, existingAdmins]);

  // Create options for volunteer select
  const volunteerOptions = useMemo(() => {
    const defaultOption = { value: '', label: '-- Pilih Relawan --' };
    const options = availableVolunteers.map(volunteer => ({
      value: volunteer.id,
      label: `${volunteer.namaLengkap} - ${volunteer.email}`
    }));
    
    return [defaultOption, ...options];
  }, [availableVolunteers]);

  const validateForm = () => {
    const newErrors: {
      volunteerId?: string;
    } = {};
    
    // Volunteer selection validation
    if (!volunteerId) {
      newErrors.volunteerId = 'Relawan harus dipilih';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    await onSubmit(volunteerId, role);
    
    // Clear form
    setVolunteerId('');
    setRole('ADMIN');
    setErrors({});
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4 text-center">
        <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={onClose}></div>
        
        <div className="relative w-full max-w-md transform overflow-hidden rounded-lg bg-white p-6 text-left shadow-xl transition-all">
          <div className="absolute top-4 right-4">
            <button 
              onClick={onClose} 
              className="text-gray-400 hover:text-gray-500 focus:outline-none"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Tambah Admin Baru
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Jadikan relawan aktif sebagai admin
            </p>
          </div>
          
          {availableVolunteers.length === 0 ? (
            <div className="py-4 text-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">Tidak ada relawan tersedia</h3>
              <p className="mt-1 text-sm text-gray-500">
                Semua relawan aktif sudah menjadi admin.
              </p>
              <div className="mt-6">
                <Button type="button" variant="primary" onClick={onClose}>
                  Tutup
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="volunteerId" className="block text-sm font-medium text-gray-700">
                  Pilih Relawan
                </label>
                <Select
                  id="volunteerId"
                  value={volunteerId}
                  onChange={(e) => setVolunteerId(e.target.value)}
                  options={volunteerOptions}
                  error={errors.volunteerId}
                />
                {errors.volunteerId && (
                  <p className="mt-1 text-xs text-red-500">{errors.volunteerId}</p>
                )}
              </div>
              
              <Select
                label="Role"
                value={role}
                onChange={(e) => setRole(e.target.value as 'ADMIN' | 'SUPERADMIN')}
                options={[
                  { value: 'ADMIN', label: 'Admin' },
                  { value: 'SUPERADMIN', label: 'Super Admin' }
                ]}
              />
              
              <div className="mt-6 flex justify-end space-x-3">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={onClose}
                >
                  Batal
                </Button>
                <Button 
                  type="submit" 
                  variant="primary" 
                  isLoading={isSubmitting}
                  disabled={isSubmitting}
                >
                  Jadikan Admin
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddAdminModal;