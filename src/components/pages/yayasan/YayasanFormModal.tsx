// src/components/pages/yayasan/YayasanFormModal.tsx
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/contexts/ToastContext';
import { YayasanResponse, KontakYayasan } from '@/services/yayasanService';

interface YayasanFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    namaYayasan: string;
    alamatYayasan: string;
    emailYayasan: string;
    kontakYayasan: KontakYayasan[];
  }) => Promise<void>;
  isSubmitting: boolean;
  yayasan?: YayasanResponse | null;
  isEditing?: boolean;
}

const YayasanFormModal: React.FC<YayasanFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  isSubmitting,
  yayasan,
  isEditing = false
}) => {
  const toast = useToast();
  const [namaYayasan, setNamaYayasan] = useState('');
  const [alamatYayasan, setAlamatYayasan] = useState('');
  const [emailYayasan, setEmailYayasan] = useState('');
  const [kontakYayasan, setKontakYayasan] = useState<KontakYayasan[]>([
    { jabatan: '', nama_kontak: '', nomor_telepon: '' }
  ]);
  
  const [errors, setErrors] = useState<{
    namaYayasan?: string;
    alamatYayasan?: string;
    emailYayasan?: string;
    kontakYayasan?: string;
  }>({});

  // Fill form with existing data when editing
  useEffect(() => {
    if (isEditing && yayasan) {
      setNamaYayasan(yayasan.namaYayasan);
      setAlamatYayasan(yayasan.alamatYayasan);
      setEmailYayasan(yayasan.emailYayasan);
      
      if (yayasan.kontakYayasan && yayasan.kontakYayasan.length > 0) {
        setKontakYayasan(yayasan.kontakYayasan);
      } else {
        setKontakYayasan([{ jabatan: '', nama_kontak: '', nomor_telepon: '' }]);
      }
    } else {
      // Reset form when not editing
      setNamaYayasan('');
      setAlamatYayasan('');
      setEmailYayasan('');
      setKontakYayasan([{ jabatan: '', nama_kontak: '', nomor_telepon: '' }]);
    }
    
    setErrors({});
  }, [isEditing, yayasan, isOpen]);

  const validateForm = () => {
    const newErrors: {
      namaYayasan?: string;
      alamatYayasan?: string;
      emailYayasan?: string;
      kontakYayasan?: string;
    } = {};
    
    // Nama Yayasan validation
    if (!namaYayasan) {
      newErrors.namaYayasan = 'Nama yayasan harus diisi';
    }
    
    // Alamat Yayasan validation
    if (!alamatYayasan) {
      newErrors.alamatYayasan = 'Alamat yayasan harus diisi';
    }
    
    // Email Yayasan validation
    if (!emailYayasan) {
      newErrors.emailYayasan = 'Email yayasan harus diisi';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailYayasan)) {
      newErrors.emailYayasan = 'Format email tidak valid';
    }
    
    // Kontak Yayasan validation
    const hasValidContact = kontakYayasan.some(
      kontak => kontak.jabatan && kontak.nama_kontak && kontak.nomor_telepon
    );
    
    if (!hasValidContact) {
      newErrors.kontakYayasan = 'Minimal satu kontak harus diisi lengkap';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleKontakChange = (index: number, field: keyof KontakYayasan, value: string) => {
    const updatedKontak = [...kontakYayasan];
    updatedKontak[index] = {
      ...updatedKontak[index],
      [field]: value
    };
    setKontakYayasan(updatedKontak);
  };

  const addKontak = () => {
    setKontakYayasan([...kontakYayasan, { jabatan: '', nama_kontak: '', nomor_telepon: '' }]);
  };

  const removeKontak = (index: number) => {
    if (kontakYayasan.length > 1) {
      const updatedKontak = kontakYayasan.filter((_, i) => i !== index);
      setKontakYayasan(updatedKontak);
    } else {
      toast.error('Minimal harus ada satu kontak');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    // Filter out empty contacts
    const filteredKontak = kontakYayasan.filter(
      kontak => kontak.jabatan && kontak.nama_kontak && kontak.nomor_telepon
    );
    
    await onSubmit({
      namaYayasan,
      alamatYayasan,
      emailYayasan,
      kontakYayasan: filteredKontak
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4 text-center">
        <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={onClose}></div>
        
        <div className="relative w-full max-w-2xl transform overflow-hidden rounded-lg bg-white p-6 text-left shadow-xl transition-all">
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
              {isEditing ? 'Edit Yayasan' : 'Tambah Yayasan Baru'}
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              {isEditing ? 'Perbarui informasi yayasan' : 'Tambahkan yayasan baru ke sistem'}
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Nama Yayasan"
              value={namaYayasan}
              onChange={(e) => setNamaYayasan(e.target.value)}
              placeholder="Masukkan nama yayasan"
              error={errors.namaYayasan}
              required
            />
            
            <Input
              label="Alamat Yayasan"
              value={alamatYayasan}
              onChange={(e) => setAlamatYayasan(e.target.value)}
              placeholder="Masukkan alamat lengkap yayasan"
              error={errors.alamatYayasan}
              required
            />
            
            <Input
              label="Email Yayasan"
              type="email"
              value={emailYayasan}
              onChange={(e) => setEmailYayasan(e.target.value)}
              placeholder="Masukkan email yayasan"
              error={errors.emailYayasan}
              required
              leftIcon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              }
            />
            
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  Kontak Yayasan
                </label>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={addKontak}
                  leftIcon={
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                  }
                >
                  Tambah Kontak
                </Button>
              </div>
              
              {errors.kontakYayasan && (
                <p className="mt-1 text-xs text-red-500">{errors.kontakYayasan}</p>
              )}
              
              <div className="space-y-4 mt-2">
                {kontakYayasan.map((kontak, index) => (
                  <div key={index} className="border border-gray-200 rounded-md p-4 relative">
                    {kontakYayasan.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeKontak(index)}
                        className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                    )}
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Input
                        label="Jabatan"
                        value={kontak.jabatan}
                        onChange={(e) => handleKontakChange(index, 'jabatan', e.target.value)}
                        placeholder="Contoh: Ketua"
                        required
                      />
                      
                      <Input
                        label="Nama Kontak"
                        value={kontak.nama_kontak}
                        onChange={(e) => handleKontakChange(index, 'nama_kontak', e.target.value)}
                        placeholder="Nama lengkap kontak"
                        required
                      />
                      
                      <Input
                        label="Nomor Telepon"
                        value={kontak.nomor_telepon}
                        onChange={(e) => handleKontakChange(index, 'nomor_telepon', e.target.value)}
                        placeholder="Contoh: 08123456789"
                        required
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
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
                {isEditing ? 'Simpan Perubahan' : 'Tambah Yayasan'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default YayasanFormModal;