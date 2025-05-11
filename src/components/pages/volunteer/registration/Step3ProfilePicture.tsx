// src/components/pages/volunteer/registration/Step3ProfilePicture.tsx
import { motion } from 'framer-motion';
import { VolunteerFormData } from '@/lib/validations/volunteer-schema';
import { Button } from '@/components/ui/Button';
import { FileInput } from '@/components/ui/FileInput';

interface Step3Props {
  formData: VolunteerFormData;
  errors: Partial<Record<keyof VolunteerFormData, string>>;
  handlePrevStep: () => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  handleFileUpload: (file: File | null) => void;
  previewUrl: string | null;
  isSubmitting: boolean;
}

const Step3ProfilePicture = ({
  formData,
  errors,
  handlePrevStep,
  handleSubmit,
  handleFileUpload,
  previewUrl,
  isSubmitting
}: Step3Props) => {
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.3 }
    }
  };

  return (
    <motion.div 
      className="space-y-6"
      key="step3"
      variants={fadeIn}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className="bg-gradient-to-r from-forest-light/20 to-mango-light/20 p-6 rounded-xl mb-6">
        <h3 className="text-lg font-medium text-gray-800 mb-2 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-forest" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
          </svg>
          Foto Profil
        </h3>
        <p className="text-gray-600 text-sm">Langkah 3 dari 3: Unggah foto profil Anda</p>
      </div>

      <div className="text-center">
        <div className="mb-10 max-w-md mx-auto">
          <FileInput
            label=""
            showPreview
            previewUrl={previewUrl}
            onFileChange={handleFileUpload}
            buttonLabel={previewUrl ? "Ganti Foto" : "Pilih Foto"}
            buttonIcon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
              </svg>
            }
            error={errors.profileImage}
            helperText="Upload foto formal dengan latar polos. Ukuran maksimal 2MB (format: JPG, JPEG, PNG)"
            acceptedFileTypes="image/jpeg,image/png,image/jpg"
            maxSizeMB={2}
            className="mx-auto"
          />
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 mb-6">
          <h4 className="font-medium text-lg mb-4">Panduan Foto Profil</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="aspect-square rounded-lg bg-green-50 flex items-center justify-center mb-2 p-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="text-xs text-gray-600">Wajah terlihat jelas</p>
            </div>
            <div className="text-center">
              <div className="aspect-square rounded-lg bg-green-50 flex items-center justify-center mb-2 p-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="text-xs text-gray-600">Latar polos</p>
            </div>
            <div className="text-center">
              <div className="aspect-square rounded-lg bg-red-50 flex items-center justify-center mb-2 p-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="text-xs text-gray-600">Jangan gunakan filter</p>
            </div>
            <div className="text-center">
              <div className="aspect-square rounded-lg bg-red-50 flex items-center justify-center mb-2 p-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="text-xs text-gray-600">Hindari foto selfie</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 mb-6">
        <div className="flex items-start">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mt-0.5 mr-3" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          <div>
            <h4 className="text-sm font-medium text-blue-800">Perhatian</h4>
            <p className="mt-1 text-sm text-blue-700">
              Dengan mendaftar sebagai relawan, Anda setuju untuk mematuhi peraturan dan ketentuan yang berlaku di BakuBantu. Admin akan memverifikasi data Anda sebelum status relawan aktif.
            </p>
          </div>
        </div>
      </div>
      
      <div className="flex justify-between space-x-4 pt-4">
        <motion.div 
          whileHover={{ scale: 1.02, x: -5 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button 
            type="button" 
            variant="outline" 
            onClick={handlePrevStep}
            className="border-gray-300 hover:border-gray-400"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Kembali
          </Button>
        </motion.div>
        <motion.div 
          whileHover={{ scale: 1.02, x: 5 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button 
            type="submit" 
            variant="primary" 
            onClick={handleSubmit}
            isLoading={isSubmitting}
            disabled={isSubmitting}
            className="bg-gradient-to-r from-forest to-forest-dark shadow-lg"
          >
            {isSubmitting ? 'Mendaftar...' : 'Daftar Sekarang'}
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Step3ProfilePicture;