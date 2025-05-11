// src/components/pages/admin/PasswordResetModal.tsx
import React from 'react';
import { Button } from '@/components/ui/Button';

interface PasswordResetModalProps {
  isOpen: boolean;
  onClose: () => void;
  // Removed unused resetSuccess prop
}

const PasswordResetModal: React.FC<PasswordResetModalProps> = ({
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4 text-center">
        <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={onClose}></div>
        
        <div className="relative w-full max-w-md transform overflow-hidden rounded-lg bg-white p-6 text-left shadow-xl transition-all">
          <div className="mb-4">
            <div className="flex items-center">
              <div className="mr-3 flex-shrink-0 bg-green-100 rounded-full p-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Password Berhasil Direset
              </h3>
            </div>
            <p className="mt-3 text-sm text-gray-500">
              Password admin telah berhasil direset ke password default.
            </p>
          </div>
          
          <div className="mb-4 mt-4">
            <p className="text-sm text-gray-600">
              Password telah diganti dengan password default yang aman. Admin dapat mengubah passwordnya setelah login.
            </p>
          </div>
          
          <div className="mt-5 flex justify-end">
            <Button 
              type="button" 
              variant="primary" 
              onClick={onClose}
            >
              Tutup
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordResetModal;