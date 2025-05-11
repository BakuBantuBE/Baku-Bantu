// src/components/pages/contact/SuccessMessage.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';

interface SuccessMessageProps {
  onReset: () => void;
}

const SuccessMessage: React.FC<SuccessMessageProps> = ({ onReset }) => {
  // Animation variants
  const containerAnimation = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.9,
      transition: { duration: 0.3 }
    }
  };

  const itemAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <motion.div 
      className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 text-center"
      variants={containerAnimation}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.div 
        className="mb-6 inline-flex justify-center"
        variants={itemAnimation}
      >
        <div className="relative">
          <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-600" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
          <motion.div 
            className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-babyBlue flex items-center justify-center text-white"
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.2, 1] }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
            </svg>
          </motion.div>
        </div>
      </motion.div>
      
      <motion.h3 
        className="text-2xl font-bold text-gray-900 mb-3"
        variants={itemAnimation}
      >
        Pesan Terkirim!
      </motion.h3>
      
      <motion.p 
        className="text-gray-600 mb-8"
        variants={itemAnimation}
      >
        Terima kasih telah menghubungi kami. Pesan Anda telah berhasil terkirim dan akan kami proses segera.
        Kami akan menghubungi Anda kembali melalui email atau telepon yang telah Anda berikan.
      </motion.p>
      
      <motion.div 
        className="w-full h-2 bg-gray-100 rounded-full mb-8 overflow-hidden"
        variants={itemAnimation}
      >
        <motion.div 
          className="h-full bg-gradient-to-r from-babyBlue to-green-500"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 2 }}
        />
      </motion.div>
      
      <motion.div
        className="flex justify-center space-x-4"
        variants={itemAnimation}
      >
        <Button 
          variant="primary" 
          onClick={onReset}
        >
          Kirim Pesan Lain
        </Button>
        
        <Button 
          variant="outline" 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          Kembali ke Atas
        </Button>
      </motion.div>
      
      <motion.p 
        className="mt-6 text-sm text-gray-500"
        variants={itemAnimation}
      >
        ID Referensi: #{Math.random().toString(36).substr(2, 9).toUpperCase()}
      </motion.p>
    </motion.div>
  );
};

export default SuccessMessage;