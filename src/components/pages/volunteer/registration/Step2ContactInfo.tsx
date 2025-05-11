// src/components/pages/volunteer/registration/Step2ContactInfo.tsx
import { motion } from 'framer-motion';
import { VolunteerFormData } from '@/lib/validations/volunteer-schema';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Tooltip } from '@/components/ui/Tooltip';
import { Wilayah } from '@/services/volunteerService';

interface Step2Props {
  formData: VolunteerFormData;
  errors: Partial<Record<keyof VolunteerFormData, string>>;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleNextStep: () => void;
  handlePrevStep: () => void;
  wilayahList: Wilayah[];
  isLoadingWilayah: boolean;
}

const Step2ContactInfo = ({ 
  formData, 
  errors, 
  handleInputChange, 
  handleNextStep, 
  handlePrevStep,
  wilayahList,
  isLoadingWilayah
}: Step2Props) => {
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
      key="step2"
      variants={fadeIn}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className="bg-gradient-to-r from-poppy-light/20 to-mango-light/20 p-6 rounded-xl mb-6">
        <h3 className="text-lg font-medium text-gray-800 mb-2 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-poppy" viewBox="0 0 20 20" fill="currentColor">
            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
          </svg>
          Informasi Kontak
        </h3>
        <p className="text-gray-600 text-sm">Langkah 2 dari 3: Informasi kontak untuk komunikasi dengan Anda</p>
      </div>

      <div className="group">
        <Input
          label="Nomor HP"
          name="nomorHP"
          value={formData.nomorHP}
          onChange={handleInputChange}
          placeholder="Contoh: 081234567890"
          error={errors.nomorHP}
          required
          className="transition-all duration-300 group-hover:shadow-md"
          leftIcon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
          }
        />
        {formData.nomorHP && !errors.nomorHP && (
          <motion.div 
            className="flex items-center text-green-600 mt-1 text-xs"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Nomor HP valid
          </motion.div>
        )}
      </div>
      
      <div className="group">
        <Input
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="Contoh: nama@email.com"
          error={errors.email}
          required
          className="transition-all duration-300 group-hover:shadow-md"
          leftIcon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
          }
        />
        {formData.email && !errors.email && (
          <motion.div 
            className="flex items-center text-green-600 mt-1 text-xs"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Email valid
          </motion.div>
        )}
      </div>
      
      <div className="group relative">
        <label className="block text-sm font-medium text-gray-700 mb-1.5 flex items-center">
          Wilayah <span className="text-red-500">*</span>
          <Tooltip content="Pilih wilayah tempat Anda akan melakukan kegiatan relawan">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
            </svg>
          </Tooltip>
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
          </div>
          {isLoadingWilayah ? (
            <div className="h-10 w-full rounded-xl border border-gray-300 bg-gray-50 pl-10 pr-4 py-2 text-sm shadow-sm flex items-center transition-all">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-babyBlue" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span className="text-gray-500">Memuat data wilayah...</span>
            </div>
          ) : (
            <select
              name="wilayahId"
              className={`h-10 w-full rounded-xl border ${errors.wilayahId ? 'border-red-500' : 'border-gray-300'} bg-white pl-10 pr-4 py-2 text-sm shadow-sm focus:border-babyBlue focus:outline-none focus:ring-1 focus:ring-babyBlue transition-all duration-300 group-hover:shadow-md`}
              value={formData.wilayahId}
              onChange={handleInputChange}
              required
            >
              <option value="">Pilih Wilayah</option>
              {wilayahList.map(wilayah => (
                <option key={wilayah.id} value={wilayah.id}>{wilayah.nama}</option>
              ))}
            </select>
          )}
        </div>
        {errors.wilayahId && (
          <motion.p 
            className="mt-1.5 text-sm text-red-500 flex items-center"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {errors.wilayahId}
          </motion.p>
        )}
      </div>
      
      {/* Tips untuk kontak */}
      <div className="my-6 bg-babyBlue-light/20 p-4 rounded-xl border border-babyBlue-light/40">
        <div className="flex items-start">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-babyBlue-dark mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          <div>
            <h4 className="font-medium text-babyBlue-dark text-sm">Tips</h4>
            <p className="text-sm text-gray-600 mt-1">
              Pastikan alamat email dan nomor HP Anda aktif. Tim kami akan menghubungi Anda melalui kontak ini untuk proses selanjutnya.
            </p>
          </div>
        </div>
      </div>
      
      <div className="flex justify-between space-x-4 pt-6">
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
            type="button" 
            variant="primary" 
            onClick={handleNextStep}
            className="bg-gradient-to-r from-poppy to-poppy-dark shadow-lg"
          >
            Lanjutkan
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Step2ContactInfo;