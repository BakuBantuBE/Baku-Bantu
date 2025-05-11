// src/app/register/volunteer/page.tsx
"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { AnimatePresence } from 'framer-motion';
import { useToast } from '@/contexts/ToastContext';
import AuthLayout from '@/components/layouts/AuthLayout';
import { 
  VolunteerFormData, 
  validateStep1, 
  validateStep2, 
  validateProfilePicture,
  prepareFormDataForSubmission
} from '@/lib/validations/volunteer-schema';
import { registerVolunteer, getWilayahList, Wilayah } from '@/services/volunteerService';

// Import step components
import {
  Step1PersonalInfo,
  Step2ContactInfo,
  Step3ProfilePicture,
  ProgressIndicator,
  SuccessAnimation
} from '@/components/pages/volunteer/registration';

export default function VolunteerRegistrationPage() {
  const router = useRouter();
  const toast = useToast();
  
  // UI state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);
  
  // Data state
  const [wilayahList, setWilayahList] = useState<Wilayah[]>([]);
  const [isLoadingWilayah, setIsLoadingWilayah] = useState(true);
  const [errors, setErrors] = useState<Partial<Record<keyof VolunteerFormData, string>>>({});
  const [retryCount, setRetryCount] = useState(0);
  
  // Initialize form data with wilayahId as number (empty/null initially)
  const [formData, setFormData] = useState<VolunteerFormData>({
    namaLengkap: '',
    jenisKelamin: 'MALE',
    tempatLahir: '',
    tanggalLahir: '',
    alamatDomisili: '', 
    kewarganegaraan: 'INDONESIA',
    nomorHP: '',
    email: '',
    wilayahId: '', // Start with empty string, will be converted to number before submission
    profileImage: null
  });

  // Fetch wilayah data when component mounts
  useEffect(() => {
    let isMounted = true;

    async function fetchWilayah() {
      if (!isMounted || retryCount >= 2) return;
      
      setIsLoadingWilayah(true);
      try {
        const response = await getWilayahList();
        if (!isMounted) return;

        if (response.success && response.data) {
          setWilayahList(response.data);
        } else {
          toast.error(response.message || 'Gagal mengambil data wilayah');
          setRetryCount(prev => prev + 1);
        }
      } catch (error) {
        if (!isMounted) return;
        toast.error('Terjadi kesalahan saat memuat data wilayah');
        console.error('Error fetching wilayah:', error);
        setRetryCount(prev => prev + 1);
      } finally {
        if (isMounted) {
          setIsLoadingWilayah(false);
        }
      }
    }
    
    fetchWilayah();

    return () => {
      isMounted = false;
    };
  }, [toast, retryCount]);

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Handle special case for wilayahId to ensure it's stored as a number
    if (name === 'wilayahId') {
      setFormData(prev => ({
        ...prev,
        [name]: value // Keep as string in the form, but convert before API call
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    
    // Clear error when field is edited
    if (errors[name as keyof VolunteerFormData]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };
  
  // Handle file upload
  const handleFileUpload = (file: File | null) => {
    if (file) {
      const error = validateProfilePicture(file);
      
      if (error) {
        setErrors(prev => ({
          ...prev,
          profileImage: error
        }));
        return;
      }
      
      setFormData(prev => ({
        ...prev,
        profileImage: file
      }));
      
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
      
      // Clear error
      setErrors(prev => ({
        ...prev,
        profileImage: undefined
      }));
    } else {
      // If file is removed
      setFormData(prev => ({
        ...prev,
        profileImage: null
      }));
      setPreviewUrl(null);
    }
  };
  
  // Validate form step
  const validateStep = (step: number): boolean => {
    let newErrors = {};
    
    if (step === 1) {
      newErrors = validateStep1(formData);
    } else if (step === 2) {
      newErrors = validateStep2(formData);
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Handle next step
  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      toast.error('Mohon perbaiki kesalahan pada formulir');
    }
  };
  
  // Handle previous step
  const handlePrevStep = () => {
    setCurrentStep(prev => prev - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateStep(currentStep)) {
      toast.error('Mohon perbaiki kesalahan pada formulir');
      return;
    }
    
    const profilePictureError = validateProfilePicture(formData.profileImage);
    if (profilePictureError) {
      setErrors(prev => ({
        ...prev,
        profileImage: profilePictureError
      }));
      toast.error(profilePictureError);
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Prepare form data - ensure wilayahId is a number
      const processedFormData = prepareFormDataForSubmission(formData) as VolunteerFormData;
      
      // Send data to API
      const response = await registerVolunteer(processedFormData);
      
      if (response.success) {
        // Show success animation
        setShowSuccessAnimation(true);
        
        // Set session storage for success page
        sessionStorage.setItem('volunteer_registered', 'true');
        if (response.data?.id) {
          sessionStorage.setItem('volunteer_id', response.data.id);
        }
        
        toast.success(response.message || 'Pendaftaran relawan berhasil! Silakan tunggu konfirmasi dari admin.');
        
        // Redirect to success page with delay to show animation
        setTimeout(() => {
          router.push('/volunteer/success');
        }, 2000);
      } else {
        // Handle API errors
        if (response.errors) {
          setErrors(response.errors);
        }
        
        toast.error(response.message || 'Terjadi kesalahan saat mendaftar. Silakan coba lagi.');
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Terjadi kesalahan saat mendaftar. Silakan coba lagi.');
      setIsSubmitting(false);
    }
  };

  // Render current step
  const renderCurrentStep = () => {
    switch(currentStep) {
      case 1:
        return (
          <Step1PersonalInfo 
            formData={formData} 
            errors={errors} 
            handleInputChange={handleInputChange} 
            handleNextStep={handleNextStep} 
          />
        );
      case 2:
        return (
          <Step2ContactInfo 
            formData={formData}
            errors={errors}
            handleInputChange={handleInputChange}
            handleNextStep={handleNextStep}
            handlePrevStep={handlePrevStep}
            wilayahList={wilayahList}
            isLoadingWilayah={isLoadingWilayah}
          />
        );
      case 3:
        return (
          <Step3ProfilePicture 
            formData={formData}
            errors={errors}
            handlePrevStep={handlePrevStep}
            handleSubmit={handleSubmit}
            handleFileUpload={handleFileUpload}
            previewUrl={previewUrl}
            isSubmitting={isSubmitting}
          />
        );
      default:
        return null;
    }
  };
  
  return (
    <AuthLayout
      title="Daftar Relawan"
      subtitle="Bergabunglah dengan kami dan jadilah bagian dari perubahan positif"
      heroTitle="Jadilah penyambung kebaikan"
      heroDescription="Dengan menjadi relawan, Anda dapat membantu kami mewujudkan misi untuk membantu mereka yang membutuhkan"
      imageSrc="/images/logo_kecil_01.png"
      imageAlt="Relawan BakuBantu"
    >
      {/* Success animation */}
      <AnimatePresence>
        {showSuccessAnimation && <SuccessAnimation />}
      </AnimatePresence>
      
      {/* Progress indicator */}
      <ProgressIndicator currentStep={currentStep} />

      <form onSubmit={(e) => { e.preventDefault(); handleSubmit(e); }} className="space-y-6 bg-white p-6 rounded-xl shadow-lg border border-gray-100">
        <AnimatePresence mode="wait">
          {renderCurrentStep()}
        </AnimatePresence>
      </form>

      <p className="mt-8 text-center text-sm text-gray-600">
        Sudah memiliki akun?{' '}
        <Link href="/login" className="font-medium text-babyBlue-dark hover:text-babyBlue transition-colors">
          Masuk di sini
        </Link>
      </p>
    </AuthLayout>
  );
}