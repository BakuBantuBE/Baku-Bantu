// src/components/pages/admin/AdminMobileView.tsx
import React from 'react';
import { AdminResponse } from '@/services/adminService';
import AdminListItem from './AdminListItem';

interface AdminMobileViewProps {
  admins: AdminResponse[];
  onDelete: (id: string) => void;
  onResetPassword: (id: string) => void;
  onToggleStatus: (id: string, newStatus: 'ACTIVE' | 'INACTIVE') => void;
}

const AdminMobileView: React.FC<AdminMobileViewProps> = ({
  admins,
  onDelete,
  onResetPassword,
  onToggleStatus
}) => {
  if (admins.length === 0) {
    return (
      <div className="p-8 text-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        <h3 className="mt-4 text-lg font-medium text-gray-900">Tidak ada admin</h3>
        <p className="mt-1 text-gray-500">Belum ada admin yang terdaftar saat ini</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {admins.map(admin => (
        <AdminListItem
          key={admin.id}
          admin={admin}
          onDelete={onDelete}
          onResetPassword={onResetPassword}
          showStatusToggle={false}
          onToggleStatus={onToggleStatus}
        />
      ))}
    </div>
  );
};

export default AdminMobileView;