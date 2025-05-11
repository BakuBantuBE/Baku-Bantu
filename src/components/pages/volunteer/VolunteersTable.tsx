// src/components/pages/volunteer/VolunteersTable.tsx
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useToast } from '@/contexts/ToastContext';
import { DashboardTable } from '@/components/pages/dashboard';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { VolunteerResponse } from '@/services/volunteerService';
import { formatDate } from '@/lib/date-utils';
import VolunteerStatusActions from './VolunteerStatusActions';

interface VolunteersTableProps {
  volunteers: VolunteerResponse[];
  isLoading: boolean;
  onRefresh: () => void;
}

const VolunteersTable: React.FC<VolunteersTableProps> = ({ 
  volunteers, 
  isLoading,
  onRefresh
}) => {
  const router = useRouter();
  const toast = useToast();
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [wilayahFilter, setWilayahFilter] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredVolunteers, setFilteredVolunteers] = useState<VolunteerResponse[]>(volunteers);
  
  // Extract unique wilayah options from volunteers data
  const wilayahOptions = React.useMemo(() => {
    const uniqueWilayah = new Set<string>();
    
    volunteers.forEach(volunteer => {
      if (volunteer.wilayah?.nama) {
        uniqueWilayah.add(volunteer.wilayah.nama);
      }
    });
    
    const options = Array.from(uniqueWilayah).map(nama => ({
      value: nama,
      label: nama
    }));
    
    // Add "All" option at the beginning
    return [{ value: '', label: 'Semua Wilayah' }, ...options];
  }, [volunteers]);
  
  // Update filtered volunteers when main volunteers list changes
  useEffect(() => {
    setFilteredVolunteers(volunteers);
  }, [volunteers]);
  
  // Filter volunteers based on selected filters and search query
  useEffect(() => {
    const filtered = volunteers.filter(volunteer => {
      // Status filter
      if (statusFilter && volunteer.status !== statusFilter) {
        return false;
      }
      
      // Wilayah filter
      if (wilayahFilter && volunteer.wilayah?.nama !== wilayahFilter) {
        return false;
      }
      
      // Search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          volunteer.namaLengkap.toLowerCase().includes(query) ||
          volunteer.email.toLowerCase().includes(query) ||
          volunteer.nomorHP.includes(query) ||
          (volunteer.wilayah?.nama && volunteer.wilayah.nama.toLowerCase().includes(query))
        );
      }
      
      return true;
    });
    
    setFilteredVolunteers(filtered);
  }, [volunteers, statusFilter, wilayahFilter, searchQuery]);

  const handleEditVolunteer = (id: string) => {
    router.push(`/dashboard/volunteers/${id}`);
  };
  
  const handleCopyVolunteerInfo = (volunteer: VolunteerResponse) => {
    const info = `
Nama: ${volunteer.namaLengkap}
Email: ${volunteer.email}
No. HP: ${volunteer.nomorHP}
Wilayah: ${volunteer.wilayah?.nama || '-'}
Status: ${volunteer.status || 'PENDING'}
    `.trim();
    
    navigator.clipboard.writeText(info).then(() => {
      toast.success('Informasi relawan berhasil disalin');
    }).catch(err => {
      console.error('Failed to copy text: ', err);
      toast.error('Gagal menyalin informasi');
    });
  };

  const handleStatusChange = (volunteerId: string, newStatus: string) => {
    // Update the status in the local data
    const updatedVolunteers = volunteers.map(volunteer => {
      if (volunteer.id === volunteerId) {
        return { ...volunteer, status: newStatus };
      }
      return volunteer;
    });
    
    // For immediate UI feedback, update the local state
    setFilteredVolunteers(
      filteredVolunteers.map(volunteer => {
        if (volunteer.id === volunteerId) {
          return { ...volunteer, status: newStatus };
        }
        return volunteer;
      })
    );
    
    // Refresh the data to get the updated version from the server
    onRefresh();
  };
  
  const renderStatus = (volunteer: VolunteerResponse) => {
    return (
      <VolunteerStatusActions
        volunteerId={volunteer.id}
        currentStatus={volunteer.status || 'PENDING'}
        onStatusChange={(newStatus) => handleStatusChange(volunteer.id, newStatus)}
        showButtons={false}
      />
    );
  };

  const columns = [
    {
      header: 'Relawan',
      accessor: (volunteer: VolunteerResponse) => (
        <div className="flex items-center">
          <div className="h-10 w-10 flex-shrink-0">
            {volunteer.profileImage ? (
              <div className="relative h-10 w-10 rounded-full overflow-hidden">
                <Image
                  src={volunteer.profileImage}
                  alt={volunteer.namaLengkap}
                  className="object-cover"
                  fill
                />
              </div>
            ) : (
              <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500 font-medium">
                  {volunteer.namaLengkap.charAt(0)}
                </span>
              </div>
            )}
          </div>
          <div className="ml-4">
            <div className="font-medium text-gray-900">{volunteer.namaLengkap}</div>
            <div className="text-sm text-gray-500">{volunteer.email}</div>
          </div>
        </div>
      )
    },
    {
      header: 'Wilayah',
      accessor: (volunteer: VolunteerResponse) => (
        <div className="text-sm text-gray-900">
          {volunteer.wilayah?.nama || '-'}
        </div>
      )
    },
    {
      header: 'Gender',
      accessor: (volunteer: VolunteerResponse) => (
        <div className="text-sm text-gray-900">
          {volunteer.jenisKelamin === 'MALE' ? 'Laki-laki' : 'Perempuan'}
        </div>
      )
    },
    {
      header: 'No. HP',
      accessor: (volunteer: VolunteerResponse) => (
        <div className="text-sm text-gray-900">
          {volunteer.nomorHP}
        </div>
      )
    },
    {
      header: 'Status',
      accessor: (volunteer: VolunteerResponse) => renderStatus(volunteer)
    },
    {
      header: 'Terdaftar',
      accessor: (volunteer: VolunteerResponse) => (
        <div className="text-sm text-gray-500">
          {formatDate(volunteer.createdAt)}
        </div>
      )
    },
    {
      header: 'Aksi',
      accessor: (volunteer: VolunteerResponse) => (
        <div className="flex justify-end">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleEditVolunteer(volunteer.id)}
            className="text-babyBlue-dark border-babyBlue-light hover:bg-babyBlue-light/20"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
            Edit
          </Button>
        </div>
      ),
      className: 'text-right'
    }
  ];

  // Empty state config
  const emptyState = {
    title: 'Tidak ada relawan',
    message: 'Belum ada relawan yang terdaftar saat ini',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
      </svg>
    ),
    action: {
      label: 'Refresh Data',
      onClick: onRefresh
    }
  };

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-col md:flex-row md:items-end gap-4">
        <div className="w-full md:w-1/4">
          <Select
            label="Status"
            options={[
              { value: '', label: 'Semua Status' },
              { value: 'ACTIVE', label: 'Aktif' },
              { value: 'PENDING', label: 'Pending' },
              { value: 'INACTIVE', label: 'Tidak Aktif' }
            ]}
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          />
        </div>
        <div className="w-full md:w-1/4">
          <Select
            label="Wilayah"
            options={wilayahOptions}
            value={wilayahFilter}
            onChange={(e) => setWilayahFilter(e.target.value)}
          />
        </div>
        <div className="w-full md:w-1/2">
          <Input
            placeholder="Cari relawan..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            leftIcon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            }
          />
        </div>
      </div>

      {/* Table */}
      <DashboardTable
        columns={columns}
        data={filteredVolunteers}
        keyExtractor={(volunteer) => volunteer.id}
        emptyState={emptyState}
        loading={isLoading}
        pagination={
          filteredVolunteers.length > 0
            ? {
                currentPage: 1,
                totalPages: 1,
                onPageChange: () => {},
                totalItems: filteredVolunteers.length,
                itemsPerPage: filteredVolunteers.length
              }
            : undefined
        }
      />
    </div>
  );
};

export default VolunteersTable;