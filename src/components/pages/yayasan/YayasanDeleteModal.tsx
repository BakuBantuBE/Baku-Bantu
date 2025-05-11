// src/components/pages/yayasan/YayasanDeleteModal.tsx
import React from 'react';
import { Button } from '@/components/ui/Button';
import { YayasanResponse } from '@/services/yayasanService';

interface YayasanDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  yayasan: YayasanResponse | null;
  isLoading?: boolean;
}

const YayasanDeleteModal: React.FC<YayasanDeleteModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  yayasan,
  isLoading = false
}) => {
  if (!isOpen || !yayasan) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4 text-center">
        <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={onClose}></div>
        
        <div className="relative w-full max-w-md transform overflow-hidden rounded-lg bg-white p-6 text-left shadow-xl transition-all">
          <div className="mb-4">
            <div className="flex items-center">
              <div className="mr-3 flex-shrink-0 bg-red-100 rounded-full p-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Konfirmasi Hapus
              </h3>
            </div>
            <p className="mt-3 text-sm text-gray-500">
              Apakah Anda yakin ingin menghapus yayasan <span className="font-semibold text-gray-700">{yayasan.namaYayasan}</span>?
            </p>
            
            {yayasan.pantis && yayasan.pantis.length > 0 && (
              <div className="mt-4 bg-yellow-50 p-3 rounded-md border border-yellow-100">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-yellow-800">Perhatian</h3>
                    <div className="mt-1 text-sm text-yellow-700">
                      <p>
                        Yayasan ini memiliki {yayasan.pantiCount} panti asuhan terkait. Menghapus yayasan ini dapat mempengaruhi data panti asuhan.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div className="mt-5 flex justify-end space-x-3">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose}
              disabled={isLoading}
            >
              Batal
            </Button>
            <Button 
              type="button" 
              variant="accent" 
              onClick={onConfirm}
              isLoading={isLoading}
              disabled={isLoading}
            >
              Hapus
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YayasanDeleteModal;