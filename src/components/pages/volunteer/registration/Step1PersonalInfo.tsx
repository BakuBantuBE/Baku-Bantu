// src/components/pages/volunteer/registration/Step1PersonalInfo.tsx
import { motion } from 'framer-motion';
import { VolunteerFormData } from '@/lib/validations/volunteer-schema';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Tooltip } from '@/components/ui/Tooltip';

interface Step1Props {
  formData: VolunteerFormData;
  errors: Partial<Record<keyof VolunteerFormData, string>>;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleNextStep: () => void;
}

const Step1PersonalInfo = ({ formData, errors, handleInputChange, handleNextStep }: Step1Props) => {
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
      key="step1"
      variants={fadeIn}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className="bg-gradient-to-r from-babyBlue-light/20 to-lavender-light/20 p-6 rounded-xl mb-6">
        <h3 className="text-lg font-medium text-gray-800 mb-2 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-babyBlue-dark" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 2a1 1 0 00-1 1v1a1 1 0 002 0V3a1 1 0 00-1-1zM4 4h3a3 3 0 006 0h3a2 2 0 012 2v9a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm2.5 7a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm2.45 4a2.5 2.5 0 10-4.9 0h4.9zM12 9a1 1 0 100 2h3a1 1 0 100-2h-3zm-1 4a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1z" clipRule="evenodd" />
          </svg>
          Informasi Pribadi
        </h3>
        <p className="text-gray-600 text-sm">Langkah 1 dari 3: Informasi dasar untuk identitas Anda sebagai relawan</p>
      </div>

      <div className="group">
        <Input
          label="Nama Lengkap"
          name="namaLengkap"
          value={formData.namaLengkap}
          onChange={handleInputChange}
          placeholder="Contoh: Budi Santoso"
          error={errors.namaLengkap}
          required
          className="transition-all duration-300 group-hover:shadow-md"
          leftIcon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
          }
        />
        {formData.namaLengkap && !errors.namaLengkap && (
          <motion.div 
            className="flex items-center text-green-600 mt-1 text-xs"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Nama lengkap valid
          </motion.div>
        )}
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Jenis Kelamin <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-2 gap-4">
          <div 
            className={`border rounded-xl p-4 flex items-center space-x-3 cursor-pointer transition-all ${
              formData.jenisKelamin === 'MALE' 
                ? 'border-babyBlue bg-babyBlue-light/20 shadow-md' 
                : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
            }`}
            onClick={() => handleInputChange({ 
              target: { name: 'jenisKelamin', value: 'MALE' } 
            } as React.ChangeEvent<HTMLSelectElement>)}
          >
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
              formData.jenisKelamin === 'MALE' ? 'border-babyBlue' : 'border-gray-400'
            }`}>
              {formData.jenisKelamin === 'MALE' && (
                <motion.div 
                  className="w-3 h-3 rounded-full bg-babyBlue" 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 15 }}
                />
              )}
            </div>
            <div>
              <span className="font-medium">Laki-laki</span>
              <p className="text-xs text-gray-500">Pilih jika Anda adalah laki-laki</p>
            </div>
          </div>
          
          <div 
            className={`border rounded-xl p-4 flex items-center space-x-3 cursor-pointer transition-all ${
              formData.jenisKelamin === 'FEMALE' 
                ? 'border-lavender bg-lavender-light/20 shadow-md' 
                : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
            }`}
            onClick={() => handleInputChange({ 
              target: { name: 'jenisKelamin', value: 'FEMALE' } 
            } as React.ChangeEvent<HTMLSelectElement>)}
          >
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
              formData.jenisKelamin === 'FEMALE' ? 'border-lavender' : 'border-gray-400'
            }`}>
              {formData.jenisKelamin === 'FEMALE' && (
                <motion.div 
                  className="w-3 h-3 rounded-full bg-lavender" 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 15 }}
                />
              )}
            </div>
            <div>
              <span className="font-medium">Perempuan</span>
              <p className="text-xs text-gray-500">Pilih jika Anda adalah perempuan</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="group">
          <Input
            label="Tempat Lahir"
            name="tempatLahir"
            value={formData.tempatLahir}
            onChange={handleInputChange}
            placeholder="Contoh: Jakarta"
            error={errors.tempatLahir}
            required
            className="transition-all duration-300 group-hover:shadow-md"
            leftIcon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
            }
          />
        </div>
        
        <div className="group">
          <Input
            label="Tanggal Lahir"
            type="date"
            name="tanggalLahir"
            value={formData.tanggalLahir}
            onChange={handleInputChange}
            error={errors.tanggalLahir}
            helperText="Usia minimal 17 tahun"
            required
            className="transition-all duration-300 group-hover:shadow-md"
            leftIcon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
            }
          />
        </div>
      </div>
      
      <div className="relative group">
        <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
          Alamat Domisili <span className="text-red-500">*</span>
          <Tooltip content="Isi dengan alamat tempat tinggal Anda saat ini">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
            </svg>
          </Tooltip>
        </label>
        <textarea
          name="alamatDomisili"
          rows={4}
          className={`w-full rounded-xl border ${errors.alamatDomisili ? 'border-red-500' : 'border-gray-300'} bg-white px-4 py-3 text-sm shadow-sm focus:border-babyBlue focus:outline-none focus:ring-1 focus:ring-babyBlue transition-all duration-300 group-hover:shadow-md`}
          value={formData.alamatDomisili}
          onChange={handleInputChange}
          placeholder="Contoh: Jl. Sudirman No. 123, RT 01/RW 02, Kelurahan Setiabudi, Kecamatan Setiabudi, Jakarta Selatan, DKI Jakarta, 12910"
          required
        />
        {errors.alamatDomisili && (
          <motion.p 
            className="mt-1.5 text-sm text-red-500 flex items-center"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {errors.alamatDomisili}
          </motion.p>
        )}
      </div>
      
      <div className="group">
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          Kewarganegaraan
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z" clipRule="evenodd" />
            </svg>
          </div>
          <select
            name="kewarganegaraan"
            className="h-10 w-full rounded-xl border border-gray-300 bg-white pl-10 pr-4 py-2 text-sm shadow-sm focus:border-babyBlue focus:outline-none focus:ring-1 focus:ring-babyBlue transition-all duration-300 group-hover:shadow-md"
            value={formData.kewarganegaraan}
            onChange={handleInputChange}
          >
            <option value="INDONESIA">WNI (Warga Negara Indonesia)</option>
            <option value="ASING">WNA (Warga Negara Asing)</option>
          </select>
        </div>
      </div>
      
      <div className="pt-6">
        <motion.div 
          className="flex justify-center"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button 
            type="button" 
            variant="primary" 
            size="full" 
            onClick={handleNextStep}
            className="bg-gradient-to-r from-babyBlue to-babyBlue-dark shadow-lg"
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

export default Step1PersonalInfo;