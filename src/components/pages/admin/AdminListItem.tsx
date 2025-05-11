// src/components/pages/admin/AdminListItem.tsx
import React from 'react';
import { AdminResponse } from '@/services/adminService';
import AdminStatusBadge from './AdminStatusBadge';
import { Button } from '@/components/ui/Button';
import { formatDate } from '@/lib/date-utils';

interface AdminListItemProps {
  admin: AdminResponse;
  onDelete: (id: string) => void;
  onResetPassword: (id: string) => void;
  onToggleStatus: (id: string, newStatus: 'ACTIVE' | 'INACTIVE') => void;
  showStatusToggle?: boolean;
}

const AdminListItem: React.FC<AdminListItemProps> = ({
  admin,
  onDelete,
  onResetPassword,
  onToggleStatus,
  showStatusToggle = false
}) => {
  const handleCopyEmail = (email: string) => {
    navigator.clipboard.writeText(email);
  };

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden bg-white hover:shadow-md transition-shadow">
      <div className="p-4 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div className="flex-1">
          <div className="flex flex-col">
            <h3 className="font-medium text-gray-800">{admin.volunteerInfo?.namaLengkap || 'Admin'}</h3>
            <p 
              className="text-sm text-gray-500 hover:text-babyBlue-dark cursor-pointer flex items-center gap-1"
              onClick={() => handleCopyEmail(admin.email)}
              title="Klik untuk menyalin"
            >
              {admin.email}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
              </svg>
            </p>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <AdminStatusBadge 
              status={admin.status}
              onClick={showStatusToggle ? () => onToggleStatus(admin.id, admin.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE') : undefined}
            />
            <span className="text-xs text-gray-500">
              {formatDate(admin.createdAt)}
            </span>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onResetPassword(admin.id)}
            className="text-babyBlue-dark border-babyBlue-light hover:bg-babyBlue-light/20 text-xs"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
            </svg>
            Reset Password
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onDelete(admin.id)}
            className="text-red-600 border-red-200 hover:bg-red-50 text-xs"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Hapus
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminListItem;