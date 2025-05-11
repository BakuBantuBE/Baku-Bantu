// src/components/pages/admin/AdminsTable.tsx
import React, { useState } from 'react';
import { DashboardTable } from '@/components/pages/dashboard';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { useToast } from '@/contexts/ToastContext';
import { formatDate } from '@/lib/date-utils';
import { AdminResponse } from '@/services/adminService';

interface AdminsTableProps {
  admins: AdminResponse[];
  isLoading: boolean;
  onDelete: (id: string) => void;
  onResetPassword: (id: string) => void;
  onToggleStatus: (id: string, newStatus: 'ACTIVE' | 'INACTIVE') => void;
}

const AdminsTable: React.FC<AdminsTableProps> = ({ 
  admins, 
  isLoading,
  onDelete,
  onResetPassword
}) => {
  const toast = useToast();
  const [searchQuery] = useState('');

  // Filter admins based on search query
  const filteredAdmins = admins.filter(admin => {
    if (!searchQuery) return true;
    
    const query = searchQuery.toLowerCase();
    return (
      admin.email.toLowerCase().includes(query) ||
      (admin.volunteerInfo?.namaLengkap?.toLowerCase().includes(query))
    );
  });

  const handleCopyEmail = (email: string) => {
    navigator.clipboard.writeText(email).then(() => {
      toast.success('Email berhasil disalin');
    }).catch(err => {
      console.error('Failed to copy text: ', err);
      toast.error('Gagal menyalin email');
    });
  };

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

  const renderRole = (role: string) => {
    switch (role) {
      case 'SUPERADMIN':
        return <Badge variant="accent">Super Admin</Badge>;
      case 'ADMIN':
        return <Badge variant="primary">Admin</Badge>;
      default:
        return <Badge variant="default">{role}</Badge>;
    }
  };

  const columns = [
    {
      header: 'Admin',
      accessor: (admin: AdminResponse) => (
        <div>
          <div className="font-medium">{admin.volunteerInfo?.namaLengkap || 'Admin'}</div>
          <div 
            className="text-sm text-gray-500 hover:text-babyBlue-dark cursor-pointer"
            onClick={() => handleCopyEmail(admin.email)}
            title="Klik untuk menyalin"
          >
            {admin.email}
          </div>
        </div>
      )
    },
    {
      header: 'Role',
      accessor: (admin: AdminResponse) => renderRole(admin.role)
    },
    {
      header: 'Status',
      accessor: (admin: AdminResponse) => renderStatus(admin.status)
    },
    {
      header: 'Terdaftar',
      accessor: (admin: AdminResponse) => (
        <div className="text-sm text-gray-500">
          {formatDate(admin.createdAt)}
        </div>
      )
    },
    {
      header: 'Aksi',
      accessor: (admin: AdminResponse) => (
        <div className="flex space-x-2 justify-end">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onResetPassword(admin.id)}
            className="text-babyBlue-dark border-babyBlue-light hover:bg-babyBlue-light/20 text-xs"
          >
            Reset Password
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => onDelete(admin.id)}
            className="text-red-600 border-red-200 hover:bg-red-50 text-xs"
          >
            Hapus
          </Button>
        </div>
      ),
      className: 'text-right'
    }
  ];

  // Empty state config
  const emptyState = {
    title: 'Tidak ada admin',
    message: 'Belum ada admin yang terdaftar saat ini',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    )
  };

  return (
    <DashboardTable
      columns={columns}
      data={filteredAdmins}
      keyExtractor={(admin) => admin.id}
      emptyState={emptyState}
      loading={isLoading}
      searchable={true}
      searchPlaceholder="Cari admin..."
    />
  );
};

export default AdminsTable;