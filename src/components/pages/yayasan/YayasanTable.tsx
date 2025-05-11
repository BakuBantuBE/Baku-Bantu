// src/components/pages/yayasan/YayasanTable.tsx
import React from 'react';
import { DashboardTable } from '@/components/pages/dashboard';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { useToast } from '@/contexts/ToastContext';
import { formatDate } from '@/lib/date-utils';
import { YayasanResponse } from '@/services/yayasanService';

interface YayasanTableProps {
  yayasans: YayasanResponse[];
  isLoading: boolean;
  onDelete: (id: number) => void;
  onEdit: (yayasan: YayasanResponse) => void;
  onToggleStatus: (id: number, newStatus: 'ACTIVE' | 'INACTIVE') => void;
  onViewDetails: (yayasan: YayasanResponse) => void;
}

const YayasanTable: React.FC<YayasanTableProps> = ({ 
  yayasans, 
  isLoading,
  onDelete,
  onEdit,
  onToggleStatus,
  onViewDetails
}) => {
  const toast = useToast();

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

  const columns = [
    {
      header: 'Nama Yayasan',
      accessor: (yayasan: YayasanResponse) => (
        <div>
          <div className="font-medium">{yayasan.namaYayasan}</div>
          <div className="text-sm text-gray-500 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span 
              className="hover:text-babyBlue-dark cursor-pointer"
              onClick={() => handleCopyEmail(yayasan.emailYayasan)}
              title="Klik untuk menyalin"
            >
              {yayasan.emailYayasan}
            </span>
          </div>
        </div>
      )
    },
    {
      header: 'Alamat',
      accessor: (yayasan: YayasanResponse) => (
        <div className="max-w-xs truncate" title={yayasan.alamatYayasan}>
          {yayasan.alamatYayasan}
        </div>
      )
    },
    {
      header: 'Panti Asuhan',
      accessor: (yayasan: YayasanResponse) => (
        <div className="text-center">
          <Badge variant="primary" className="px-3 py-1">
            {yayasan.pantiCount}
          </Badge>
        </div>
      )
    },
    {
      header: 'Status',
      accessor: (yayasan: YayasanResponse) => renderStatus(yayasan.status)
    },
    {
      header: 'Terdaftar',
      accessor: (yayasan: YayasanResponse) => (
        <div className="text-sm text-gray-500">
          {formatDate(yayasan.createdAt)}
        </div>
      )
    },
    {
      header: 'Kontak',
      accessor: (yayasan: YayasanResponse) => (
        <div>
          {yayasan.kontakYayasan && yayasan.kontakYayasan.length > 0 ? (
            <div className="text-sm">
              <div className="font-medium">{yayasan.kontakYayasan[0].nama_kontak}</div>
              <div className="text-gray-500">{yayasan.kontakYayasan[0].jabatan}</div>
              <div className="text-gray-500">
                {yayasan.kontakYayasan[0].nomor_telepon}
              </div>
              {yayasan.kontakYayasan.length > 1 && (
                <div className="text-xs text-babyBlue-dark mt-1">
                  +{yayasan.kontakYayasan.length - 1} kontak lainnya
                </div>
              )}
            </div>
          ) : (
            <span className="text-gray-400 text-sm">Tidak ada kontak</span>
          )}
        </div>
      )
    },
    {
      header: 'Aksi',
      accessor: (yayasan: YayasanResponse) => (
        <div className="flex space-x-2 justify-end">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onViewDetails(yayasan)}
            className="text-xs"
          >
            Detail
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => onToggleStatus(yayasan.id, yayasan.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE')}
            className="text-xs"
          >
            {yayasan.status === 'ACTIVE' ? 'Nonaktifkan' : 'Aktifkan'}
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(yayasan)}
            className="text-babyBlue-dark border-babyBlue-light hover:bg-babyBlue-light/20 text-xs"
          >
            Edit
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => onDelete(yayasan.id)}
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
    title: 'Tidak ada yayasan',
    message: 'Belum ada yayasan yang terdaftar saat ini',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    )
  };

  return (
    <DashboardTable
      columns={columns}
      data={yayasans}
      keyExtractor={(yayasan) => yayasan.id.toString()}
      emptyState={emptyState}
      loading={isLoading}
      searchable={true}
      searchPlaceholder="Cari yayasan..."
    />
  );
};

export default YayasanTable;