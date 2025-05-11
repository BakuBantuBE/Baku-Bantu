// src/components/pages/volunteer/VolunteerEditForm.tsx
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Select';
import { FileInput } from '@/components/ui/FileInput';
import { useToast } from '@/contexts/ToastContext';
import { getWilayahList } from '@/services/volunteerService';
import { Loading } from '@/components/ui/Loading';
import { VolunteerResponse } from '@/services/volunteerService';
import { objectToFormData } from '@/lib/form-utils';
import { VolunteerFormData } from '@/lib/validations/volunteer-schema';

interface VolunteerEditFormProps {
  volunteer: VolunteerResponse;
  onSubmit: (updatedData: any) => Promise<void>;
  isSubmitting: boolean;
}

// Extended interface for the volunteer edit form
// Includes additional fields not in the registration form
interface ExtendedVolunteerData extends Omit<VolunteerFormData, 'wilayahId'> {
  wilayahId: string | number;
  status: string;
  jabatan: string;
}

const VolunteerEditForm: React.FC<VolunteerEditFormProps> = ({
  volunteer,
  onSubmit,
  isSubmitting
}) => {
  const toast = useToast();
  const [formData, setFormData] = useState<ExtendedVolunteerData>({
    namaLengkap: '',
    jenisKelamin: 'MALE',
    tempatLahir: '',
    tanggalLahir: '',
    alamatDomisili: '',
    kewarganegaraan: 'INDONESIA',
    nomorHP: '',
    email: '',
    wilayahId: '',
    profileImage: null,
    status: '',
    jabatan: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [wilayahOptions, setWilayahOptions] = useState<{ value: string; label: string }[]>([]);
  const [isLoadingWilayah, setIsLoadingWilayah] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [originalData, setOriginalData] = useState<ExtendedVolunteerData | null>(null);

  // Initialize form data with volunteer data
  useEffect(() => {
    if (volunteer) {
      const birthDate = volunteer.tanggalLahir ? new Date(volunteer.tanggalLahir).toISOString().split('T')[0] : '';
      
      const initialData: ExtendedVolunteerData = {
        namaLengkap: volunteer.namaLengkap || '',
        jenisKelamin: (volunteer.jenisKelamin as 'MALE' | 'FEMALE') || 'MALE',
        tempatLahir: volunteer.tempatLahir || '',
        tanggalLahir: birthDate,
        alamatDomisili: volunteer.alamatDomisili || '',
        kewarganegaraan: (volunteer.kewarganegaraan as 'INDONESIA' | 'ASING') || 'INDONESIA',
        nomorHP: volunteer.nomorHP || '',
        email: volunteer.email || '',
        wilayahId: volunteer.wilayahId || '',
        profileImage: null,
        status: volunteer.status || '',
        jabatan: volunteer.jabatan || ''
      };
      
      setFormData(initialData);
      setOriginalData(initialData);
    }
  }, [volunteer]);

  // Fetch wilayah options on mount
  useEffect(() => {
    fetchWilayahOptions();
  }, []);

  // Check for changes in form data
  useEffect(() => {
    if (!originalData) return;
    
    const checkChanges = () => {
      return Object.keys(formData).some(key => {
        if (key === 'profileImage') return false; // Handle profileImage separately
        // @ts-ignore - This is safe since we're iterating over the keys
        return formData[key] !== originalData[key];
      }) || profileImage !== null;
    };
    
    setHasChanges(checkChanges());
  }, [formData, originalData, profileImage]);

  const fetchWilayahOptions = async () => {
    try {
      setIsLoadingWilayah(true);
      const response = await getWilayahList();
      
      if (response.success && response.data) {
        const options = response.data.map(wilayah => ({
          value: wilayah.id.toString(),
          label: wilayah.nama
        }));
        setWilayahOptions(options);
      } else {
        toast.error('Gagal memuat data wilayah');
      }
    } catch (error) {
      console.error('Error fetching wilayah:', error);
      toast.error('Terjadi kesalahan saat memuat data wilayah');
    } finally {
      setIsLoadingWilayah(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    setFormData(prev => {
      if (name === 'jenisKelamin') {
        // Type assertion for union type fields
        return { ...prev, [name]: value as 'MALE' | 'FEMALE' };
      } else if (name === 'kewarganegaraan') {
        return { ...prev, [name]: value as 'INDONESIA' | 'ASING' };
      } else {
        return { ...prev, [name]: value };
      }
    });
    
    // Clear error when field is changed
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleFileChange = (file: File | null) => {
    setProfileImage(file);
    
    // Update formData.profileImage as well to maintain consistency
    setFormData(prev => ({
      ...prev,
      profileImage: file
    }));
    
    // Clear error when file is changed
    if (errors.profileImage) {
      setErrors(prev => ({ ...prev, profileImage: '' }));
    }
  };

  const resetForm = () => {
    if (originalData) {
      setFormData(originalData);
    }
    setProfileImage(null);
    setErrors({});
    setHasChanges(false);
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    // Basic validation
    if (!formData.namaLengkap.trim()) {
      newErrors.namaLengkap = 'Nama lengkap harus diisi';
    }
    
    if (!formData.jenisKelamin) {
      newErrors.jenisKelamin = 'Jenis kelamin harus dipilih';
    }
    
    if (!formData.tempatLahir.trim()) {
      newErrors.tempatLahir = 'Tempat lahir harus diisi';
    }
    
    if (!formData.tanggalLahir) {
      newErrors.tanggalLahir = 'Tanggal lahir harus diisi';
    }
    
    if (!formData.alamatDomisili.trim()) {
      newErrors.alamatDomisili = 'Alamat domisili harus diisi';
    }
    
    if (!formData.nomorHP.trim()) {
      newErrors.nomorHP = 'Nomor HP harus diisi';
    } else if (!/^[0-9]{8,15}$/.test(formData.nomorHP)) {
      newErrors.nomorHP = 'Nomor HP tidak valid (8-15 digit)';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email harus diisi';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = 'Format email tidak valid';
      }
    }
    
    if (!formData.wilayahId) {
      newErrors.wilayahId = 'Wilayah harus dipilih';
    }
    
    if (!formData.status) {
      newErrors.status = 'Status harus dipilih';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Form berisi kesalahan. Silakan periksa kembali.');
      return;
    }
    
    try {
      // Create updated data object
      const updatedData = { ...formData };
      
      // Include profile image if it exists
      if (profileImage) {
        updatedData.profileImage = profileImage;
      }
      
      // Call the onSubmit callback with the updated data
      await onSubmit(updatedData);
      
      // Update original data after successful submission
      setOriginalData(formData);
      setProfileImage(null);
      setHasChanges(false);
    } catch (error) {
      console.error('Error updating volunteer:', error);
      toast.error('Gagal memperbarui data relawan');
    }
  };
  
  return (
    <div>
      {isLoadingWilayah ? (
        <div className="flex justify-center py-8">
          <Loading size="md" text="Memuat data wilayah..." />
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <Input
                label="Nama Lengkap"
                name="namaLengkap"
                value={formData.namaLengkap}
                onChange={handleChange}
                placeholder="Masukkan nama lengkap"
                error={errors.namaLengkap}
              />
              
              <Select
                label="Jenis Kelamin"
                name="jenisKelamin"
                value={formData.jenisKelamin}
                onChange={handleChange}
                options={[
                  { value: 'MALE', label: 'Laki-laki' },
                  { value: 'FEMALE', label: 'Perempuan' }
                ]}
                error={errors.jenisKelamin}
              />
              
              <Input
                label="Tempat Lahir"
                name="tempatLahir"
                value={formData.tempatLahir}
                onChange={handleChange}
                placeholder="Masukkan tempat lahir"
                error={errors.tempatLahir}
              />
              
              <Input
                label="Tanggal Lahir"
                name="tanggalLahir"
                type="date"
                value={formData.tanggalLahir}
                onChange={handleChange}
                error={errors.tanggalLahir}
              />
              
              <Input
                label="Alamat Domisili"
                name="alamatDomisili"
                value={formData.alamatDomisili}
                onChange={handleChange}
                placeholder="Masukkan alamat domisili"
                error={errors.alamatDomisili}
              />
              
              <Select
                label="Kewarganegaraan"
                name="kewarganegaraan"
                value={formData.kewarganegaraan}
                onChange={handleChange}
                options={[
                  { value: 'INDONESIA', label: 'Indonesia' },
                  { value: 'ASING', label: 'Asing' }
                ]}
                error={errors.kewarganegaraan}
              />
            </div>
            
            <div className="space-y-4">
              <Input
                label="Nomor HP"
                name="nomorHP"
                type="tel"
                value={formData.nomorHP}
                onChange={handleChange}
                placeholder="Masukkan nomor HP"
                error={errors.nomorHP}
              />
              
              <Input
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Masukkan alamat email"
                error={errors.email}
              />
              
              <Select
                label="Wilayah"
                name="wilayahId"
                value={formData.wilayahId.toString()}
                onChange={handleChange}
                options={wilayahOptions}
                error={errors.wilayahId}
                helperText="Pilih wilayah kegiatan relawan"
              />
              
              <Select
                label="Status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                options={[
                  { value: 'ACTIVE', label: 'Aktif' },
                  { value: 'PENDING', label: 'Pending' },
                  { value: 'INACTIVE', label: 'Tidak Aktif' }
                ]}
                error={errors.status}
              />
              
              <Input
                label="Jabatan"
                name="jabatan"
                value={formData.jabatan}
                onChange={handleChange}
                placeholder="Masukkan jabatan (opsional)"
                error={errors.jabatan}
              />
              
              <FileInput
                label="Foto Profil (Opsional)"
                showPreview={true}
                previewUrl={profileImage ? URL.createObjectURL(profileImage) : volunteer?.profileImage || null}
                onFileChange={handleFileChange}
                buttonLabel="Ganti Foto"
                acceptedFileTypes="image/jpeg,image/png,image/jpg"
                maxSizeMB={2}
                error={errors.profileImage}
                helperText="Format: JPG, JPEG, PNG. Maks: 2MB"
              />
            </div>
          </div>
          
          <div className="flex justify-end gap-3">
            {hasChanges && (
              <Button
                type="button"
                variant="outline"
                onClick={resetForm}
              >
                Batal
              </Button>
            )}
            <Button
              type="submit"
              variant="primary"
              isLoading={isSubmitting}
              disabled={isSubmitting || !hasChanges}
            >
              Simpan Perubahan
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default VolunteerEditForm;