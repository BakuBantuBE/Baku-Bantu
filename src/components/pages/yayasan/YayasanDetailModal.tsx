// src/components/pages/yayasan/YayasanDetailModal.tsx
import React from 'react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { formatDate } from '@/lib/date-utils';
import { YayasanResponse } from '@/services/yayasanService';

interface YayasanDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  yayasan: YayasanResponse | null;
  onEdit: () => void;
}

const YayasanDetailModal: React.FC<YayasanDetailModalProps> = ({
  isOpen,
  onClose,
  yayasan,
  onEdit
}) => {
  if (!isOpen || !yayasan) return null;

  // Render status badge
  const renderStatus = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return <Badge variant="success">Aktif</Badge>;
      case 'INACTIVE':
        return <Badge variant="default">Tidak Aktif</Badge>;
      default:
        return <Badge variant="default">{status}</Badge>;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4 text-center">
        <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={onClose}></div>
        
        <div className="relative w-full max-w-3xl transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all">
          {/* Header */}
          <div className="bg-babyBlue-light px-6 py-4 border-b border-babyBlue-dark/20">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium text-babyBlue-dark">
                Detail Yayasan
              </h3>
              <button 
                onClick={onClose} 
                className="text-gray-400 hover:text-gray-500 focus:outline-none"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
          
          {/* Content */}
          <div className="p-6">
            <div className="mb-6 flex justify-between items-start">
              <div>
                <h2 className="text-xl font-bold text-gray-900">{yayasan.namaYayasan}</h2>
                <div className="mt-1 flex items-center space-x-2">
                  {renderStatus(yayasan.status)}
                  <span className="text-sm text-gray-500">
                    Terdaftar pada {formatDate(yayasan.createdAt)}
                  </span>
                </div>
              </div>
              <Badge variant="primary" className="text-sm px-3 py-1">
                {yayasan.pantiCount} Panti Asuhan
              </Badge>
            </div>
            
            {/* Information Sections */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-6">
                {/* Contact Information */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">Informasi Kontak</h4>
                  <div className="space-y-2">
                    <div className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 mr-3 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M14.243 5.757a6 6 0 10-8.486 8.486l4.243 4.243 4.243-4.243a6 6 0 000-8.486zm-1.414 7.071l-3.536 3.536-3.536-3.536a4 4 0 115.657-5.657 4 4 0 010 5.657z" clipRule="evenodd" />
                      </svg>
                      <div>
                        <p className="text-sm text-gray-600">Alamat:</p>
                        <p className="font-medium text-gray-800">{yayasan.alamatYayasan}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 mr-3 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                      <div>
                        <p className="text-sm text-gray-600">Email:</p>
                        <p className="font-medium text-gray-800">{yayasan.emailYayasan}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Right Column */}
              <div>
                {/* Contact People */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">Kontak Pengelola</h4>
                  {yayasan.kontakYayasan && yayasan.kontakYayasan.length > 0 ? (
                    <div className="space-y-4 max-h-60 overflow-y-auto pr-2">
                      {yayasan.kontakYayasan.map((kontak, index) => (
                        <div key={index} className="flex items-start border-b border-gray-200 pb-3 last:border-0 last:pb-0">
                          <div className="h-9 w-9 rounded-full bg-lavender-light flex items-center justify-center text-lavender-dark mr-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <div>
                            <p className="font-medium text-gray-800">{kontak.nama_kontak}</p>
                            <p className="text-xs text-gray-500 mt-0.5">{kontak.jabatan}</p>
                            <p className="text-sm text-gray-600 mt-1">{kontak.nomor_telepon}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-sm">Tidak ada kontak tersedia</p>
                  )}
                </div>
              </div>
            </div>
            
            {/* Orphanage List */}
            {yayasan.pantis && yayasan.pantis.length > 0 && (
              <div className="mt-6">
                <h4 className="text-sm font-semibold text-gray-700 mb-3">Daftar Panti Asuhan</h4>
                <div className="bg-gray-50 p-4 rounded-lg max-h-60 overflow-y-auto">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {yayasan.pantis.map((panti) => (
                      <div 
                        key={panti.id} 
                        className="p-3 bg-white rounded border border-gray-200 hover:border-babyBlue transition-colors"
                      >
                        <p className="font-medium text-gray-800">{panti.namaPanti}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Footer */}
          <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose}
            >
              Tutup
            </Button>
            <Button 
              type="button" 
              variant="primary" 
              onClick={onEdit}
              leftIcon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
              }
            >
              Edit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YayasanDetailModal;