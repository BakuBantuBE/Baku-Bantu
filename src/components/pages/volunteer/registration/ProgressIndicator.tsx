// src/components/pages/volunteer/registration/ProgressIndicator.tsx
import { motion } from 'framer-motion';

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps?: number;
}

const ProgressIndicator = ({ currentStep, totalSteps = 3 }: ProgressIndicatorProps) => {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {Array.from({ length: totalSteps }).map((_, index) => {
          const step = index + 1;
          return (
            <div 
              key={step} 
              className={`flex flex-col items-center ${
                step <= currentStep 
                  ? 'text-gray-800' 
                  : 'text-gray-400'
              }`}
            >
              <div 
                className={`w-12 h-12 rounded-full ${
                  step < currentStep 
                    ? 'bg-babyBlue-light' 
                    : step === currentStep 
                      ? 'bg-white border-2 border-babyBlue shadow-md' 
                      : 'bg-gray-100 border border-gray-200'
                } flex items-center justify-center mb-2 transition-all duration-300`}
              >
                {step < currentStep ? (
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 15, delay: 0.2 }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-babyBlue-dark" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </motion.div>
                ) : (
                  <span className={step === currentStep ? 'text-babyBlue-dark font-semibold' : 'text-gray-400'}>
                    {step}
                  </span>
                )}
              </div>
              <motion.span 
                className="text-sm font-medium text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                {step === 1 ? 'Informasi Pribadi' : step === 2 ? 'Kontak' : 'Foto Profil'}
              </motion.span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressIndicator;