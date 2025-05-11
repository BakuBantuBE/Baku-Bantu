// src/components/pages/admin/AdminHeader.tsx
import React from 'react';
import { Button } from '@/components/ui/Button';

interface AdminHeaderProps {
  totalAdmins: number;
  activeAdmins: number;
  inactiveAdmins: number;
  onAddClick: () => void;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({
  totalAdmins,
  activeAdmins,
  inactiveAdmins,
  onAddClick
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Admin Management</h1>
          <p className="text-gray-500 mt-1">
            Kelola akun admin untuk sistem BakuBantu
          </p>
          <div className="flex gap-4 mt-3">
            <div>
              <span className="text-2xl font-bold text-gray-900">{totalAdmins}</span>
              <p className="text-xs text-gray-500">Total Admin</p>
            </div>
            <div>
              <span className="text-2xl font-bold text-green-600">{activeAdmins}</span>
              <p className="text-xs text-gray-500">Aktif</p>
            </div>
            <div>
              <span className="text-2xl font-bold text-gray-500">{inactiveAdmins}</span>
              <p className="text-xs text-gray-500">Tidak Aktif</p>
            </div>
          </div>
        </div>
        <div>
          <Button
            variant="primary"
            onClick={onAddClick}
            leftIcon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
            }
          >
            Tambah Admin
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;