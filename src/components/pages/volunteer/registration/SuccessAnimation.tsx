// src/components/pages/volunteer/registration/SuccessAnimation.tsx
import { motion } from 'framer-motion';

const SuccessAnimation = () => {
  // Animation variants
  const successAnimation = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { 
        type: "spring",
        stiffness: 200,
        damping: 15
      }
    }
  };

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white p-8 rounded-2xl shadow-2xl text-center w-11/12 max-w-md"
        variants={successAnimation}
        initial="hidden"
        animate="visible"
      >
        <div className="mb-6 inline-flex justify-center">
          <div className="rounded-full bg-green-100 p-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-green-600" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
        <h2 className="text-2xl font-bold mb-2">Pendaftaran Berhasil!</h2>
        <p className="text-gray-600 mb-6">Terima kasih telah mendaftar sebagai relawan. Kami akan menghubungi Anda segera.</p>
        <motion.div 
          className="h-2 bg-gray-200 rounded-full overflow-hidden mb-6"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 1.5 }}
        >
          <motion.div 
            className="h-full bg-gradient-to-r from-babyBlue to-green-500"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.5 }}
          />
        </motion.div>
        <p className="text-sm text-gray-500">Mengalihkan ke halaman sukses...</p>
      </motion.div>
    </motion.div>
  );
};

export default SuccessAnimation;