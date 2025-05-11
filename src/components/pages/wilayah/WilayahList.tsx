// src/components/pages/wilayah/WilayahList.tsx
import { useState } from 'react';
import { DashboardTable } from '@/components/pages/dashboard';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Tooltip } from '@/components/ui/Tooltip';
import { formatDate } from '@/lib/date-utils';
import { EditWilayahModal } from './EditWilayahModal';

interface Wilayah {
  id: number;
  nama: string;
  createdAt: string;
  updatedAt: string;
  status: 'ACTIVE' | 'INACTIVE';
  volunteersCount: number;
  totalCount: number;
}

interface WilayahListProps {
  wilayahList: Wilayah[];
  isLoading: boolean;
  onRefresh: () => void;
  onDelete: (wilayah: Wilayah) => void;
}

export const WilayahList: React.FC<WilayahListProps> = ({
  wilayahList,
  isLoading,
  onRefresh,
  onDelete,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedWilayah, setSelectedWilayah] = useState<Wilayah | null>(null);

  const handleEdit = (wilayah: Wilayah) => {
    setSelectedWilayah(wilayah);
    setIsEditModalOpen(true);
  };

  const handleEditModalClose = (refresh: boolean = false) => {
    setIsEditModalOpen(false);
    setSelectedWilayah(null);
    if (refresh) {
      onRefresh();
    }
  };

  const columns = [
    {
      header: 'ID',
      accessor: (wilayah: Wilayah) => wilayah.id,
      className: 'w-16',
    },
    {
      header: 'Nama Wilayah',
      accessor: (wilayah: Wilayah) => wilayah.nama,
    },
    {
      header: 'Status',
      accessor: (wilayah: Wilayah) => (
        <Badge
          variant={wilayah.status === 'ACTIVE' ? 'success' : 'danger'}
        >
          {wilayah.status}
        </Badge>
      ),
    },
    {
      header: 'Jumlah Relawan',
      accessor: (wilayah: Wilayah) => (
        <span className="font-medium">{wilayah.volunteersCount}</span>
      ),
    },
    {
      header: 'Tanggal Dibuat',
      accessor: (wilayah: Wilayah) => formatDate(wilayah.createdAt),
    },
    {
      header: 'Aksi',
      accessor: (wilayah: Wilayah) => (
        <div className="flex space-x-2">
          <Tooltip content="Edit wilayah" position="top">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleEdit(wilayah)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
            </Button>
          </Tooltip>
          <Tooltip content="Hapus wilayah" position="top">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(wilayah)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </Button>
          </Tooltip>
        </div>
      ),
      className: 'w-24',
    },
  ];

  return (
    <>
      <DashboardTable
        columns={columns}
        data={wilayahList}
        keyExtractor={(item) => item.id.toString()}
        searchable={true}
        searchPlaceholder="Cari wilayah..."
        emptyState={{
          title: "Tidak ada wilayah",
          message: "Tidak ada wilayah yang terdaftar saat ini",
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          ),
          action: {
            label: "Tambah Wilayah",
            onClick: () => document.getElementById('add-wilayah-button')?.click(),
          },
        }}
        loading={isLoading}
      />
      
      {/* Edit Wilayah Modal */}
      <EditWilayahModal
        isOpen={isEditModalOpen}
        onClose={handleEditModalClose}
        wilayah={selectedWilayah}
      />
    </>
  );
};