// src/components/pages/volunteer/AddVolunteerModal.tsx
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Select';
import { FileInput } from '@/components/ui/FileInput';
import { useToast } from '@/contexts/ToastContext';
import { getWilayahList } from '@/services/volunteerService';
import { Wilayah } from '@/services/volunteerService';
import { VolunteerFormData, validateStep1, validateStep2, validateProfilePicture } from '@/lib/validations/volunteer-schema';

// Import the progress indicator and steps
import { 
  ProgressIndicator, 
  Step1PersonalInfo, 
  Step2ContactInfo, 
  Step3ProfilePicture 
} from '@/components/pages/volunteer/registration';

interface AddVolunteerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (formData: FormData) => void;
}

const AddVolunteerModal: React.FC<AddVolunteerModalProps> = ({
  isOpen,
  onClose,
  onSuccess
}) => {
  const toast = useToast();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<VolunteerFormData>({
    namaLengkap: '',
    jenisKelamin: 'MALE',
    tempatLahir: '',
    tanggalLahir: '',
    alamatDomisili: '',
    kewarganegaraan: 'INDONESIA',
    nomorHP: '',
    email: '',
    wilayahId: '',
    profileImage: null
  });
  
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [wilayahList, setWilayahList] = useState<Wilayah[]>([]);
  const [isLoadingWilayah, setIsLoadingWilayah] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Reset form on open/close
  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setFormData({
        namaLengkap: '',
        jenisKelamin: 'MALE',
        tempatLahir: '',
        tanggalLahir: '',
        alamatDomisili: '',
        kewarganegaraan: 'INDONESIA',
        nomorHP: '',
        email: '',
        wilayahId: '',
        profileImage: null
      });
      setProfileImage(null);
      setPreviewUrl(null);
      setErrors({});
    }
  }, [isOpen]);

  // Fetch wilayah options on mount
  useEffect(() => {
    if (isOpen) {
      fetchWilayahList();
    }
  }, [isOpen]);

  const fetchWilayahList = async () => {
    try {
      setIsLoadingWilayah(true);
      const response = await getWilayahList();
      
      if (response.success && response.data) {
        setWilayahList(response.data);
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when field is changed
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleFileUpload = (file: File | null) => {
    setProfileImage(file);
    setFormData(prev => ({ ...prev, profileImage: file }));
    
    // Generate preview URL
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    } else {
      setPreviewUrl(null);
    }
    
    // Clear error when file is changed
    if (errors.profileImage) {
      setErrors(prev => ({ ...prev, profileImage: '' }));
    }
  };

  const validateCurrentStep = (): boolean => {
    let currentErrors: Record<string, string> = {};
    
    if (step === 1) {
      currentErrors = validateStep1(formData);
    } else if (step === 2) {
      currentErrors = validateStep2(formData);
    } else if (step === 3) {
      // Profile image is optional for admin adding volunteers
      if (profileImage) {
        const profileImageError = validateProfilePicture(profileImage);
        if (profileImageError) {
          currentErrors.profileImage = profileImageError;
        }
      }
    }
    
    setErrors(currentErrors);
    return Object.keys(currentErrors).length === 0;
  };

  const handleNextStep = () => {
    if (validateCurrentStep()) {
      setStep(prev => prev + 1);
    } else {
      toast.error('Form berisi kesalahan. Silakan periksa kembali.');
    }
  };

  const handlePrevStep = () => {
    setStep(prev => prev - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateCurrentStep()) {
      toast.error('Form berisi kesalahan. Silakan periksa kembali.');
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      // Create FormData object
      const submitFormData = new FormData();
      
      // Add all fields to FormData
      Object.entries(formData).forEach(([key, value]) => {
        if (key === 'profileImage') {
          if (profileImage) {
            submitFormData.append(key, profileImage);
          }
        } else if (value !== null && value !== undefined) {
          submitFormData.append(key, String(value));
        }
      });
      
      // Call the onSuccess callback with the form data
      onSuccess(submitFormData);
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Gagal menambahkan relawan');
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="relative w-full max-w-4xl bg-white rounded-xl shadow-xl p-6 md:p-8">
          {/* Close button */}
          <button 
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-500"
            onClick={onClose}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Tambah Relawan Baru</h2>
            <p className="text-sm text-gray-500 mt-1">
              Isi formulir berikut untuk menambahkan relawan baru ke dalam sistem
            </p>
          </div>
          
          <ProgressIndicator currentStep={step} totalSteps={3} />
          
          <form onSubmit={handleSubmit}>
            {step === 1 && (
              <Step1PersonalInfo
                formData={formData}
                errors={errors}
                handleInputChange={handleInputChange}
                handleNextStep={handleNextStep}
              />
            )}
            
            {step === 2 && (
              <Step2ContactInfo
                formData={formData}
                errors={errors}
                handleInputChange={handleInputChange}
                handleNextStep={handleNextStep}
                handlePrevStep={handlePrevStep}
                wilayahList={wilayahList}
                isLoadingWilayah={isLoadingWilayah}
              />
            )}
            
            {step === 3 && (
              <Step3ProfilePicture
                formData={formData}
                errors={errors}
                handlePrevStep={handlePrevStep}
                handleSubmit={handleSubmit}
                handleFileUpload={handleFileUpload}
                previewUrl={previewUrl}
                isSubmitting={isSubmitting}
              />
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddVolunteerModal;