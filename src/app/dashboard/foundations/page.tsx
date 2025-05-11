// src/app/dashboard/foundations/page.tsx
"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { DashboardSection } from '@/components/pages/dashboard';
import { useToast } from '@/contexts/ToastContext';
import {
    YayasanTable,
    YayasanFormModal,
    YayasanDeleteModal,
    YayasanDetailModal,
    YayasanHeader
} from '@/components/pages/yayasan';
import { useYayasan } from '@/hooks/useYayasan';
import { useAuth } from '@/contexts/AuthContext';
import { YayasanResponse, CreateYayasanParams, UpdateYayasanParams } from '@/services/yayasanService';

export default function FoundationsPage() {
    const {
        yayasans,
        isLoading,
        isSaving,
        fetchYayasans,
        createYayasan,
        updateYayasan,
        deleteYayasan,
        updateYayasanStatus
    } = useYayasan();

    const toast = useToast();
    const router = useRouter();
    const { hasPermission } = useAuth();

    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [selectedYayasan, setSelectedYayasan] = useState<YayasanResponse | null>(null);

    // Check if user has permission to access this page
    useEffect(() => {
        // For this example, only SUPERADMIN has access
        // You can adjust the permission as needed
        if (!hasPermission('SUPERADMIN')) {
            router.push('/dashboard');
            toast.error('Anda tidak memiliki akses ke halaman ini');
            return;
        }

        // Fetch yayasans on component mount
        fetchYayasans();
    }, [hasPermission, router, toast, fetchYayasans]);

    const handleAddYayasan = async (data: CreateYayasanParams) => {
        const success = await createYayasan(data);
        if (success) {
            setIsAddModalOpen(false);
        }
    };

    const handleEditYayasan = async (data: UpdateYayasanParams) => {
        if (!selectedYayasan) return;

        const success = await updateYayasan(selectedYayasan.id, data);
        if (success) {
            setIsEditModalOpen(false);
        }
    };

    const handleDeleteClick = (yayasan: YayasanResponse) => {
        setSelectedYayasan(yayasan);
        setIsDeleteModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (!selectedYayasan) return;

        const success = await deleteYayasan(selectedYayasan.id);
        if (success) {
            setIsDeleteModalOpen(false);
            setSelectedYayasan(null);
        }
    };

    const handleToggleStatus = async (id: number, newStatus: 'ACTIVE' | 'INACTIVE') => {
        await updateYayasanStatus(id, newStatus);
    };

    const handleViewDetails = (yayasan: YayasanResponse) => {
        setSelectedYayasan(yayasan);
        setIsDetailModalOpen(true);
    };

    const openEditModal = () => {
        setIsDetailModalOpen(false);
        setIsEditModalOpen(true);
    };

    // Calculate stats
    const activeYayasans = yayasans.filter(yayasan => yayasan.status === 'ACTIVE').length;
    const inactiveYayasans = yayasans.filter(yayasan => yayasan.status === 'INACTIVE').length;
    const totalPantis = yayasans.reduce((total, yayasan) => total + yayasan.pantiCount, 0);

    return (
        <div className="space-y-6">
            <YayasanHeader
                totalYayasans={yayasans.length}
                activeYayasans={activeYayasans}
                inactiveYayasans={inactiveYayasans}
                totalPantis={totalPantis}
                onAddClick={() => setIsAddModalOpen(true)}
            />

            <DashboardSection
                title="Daftar Yayasan"
                description="Kelola data yayasan untuk sistem BakuBantu"
            >
                <YayasanTable
                    yayasans={yayasans}
                    isLoading={isLoading}
                    onDelete={(id) => handleDeleteClick(yayasans.find(y => y.id === id)!)}
                    onEdit={(yayasan) => {
                        setSelectedYayasan(yayasan);
                        setIsEditModalOpen(true);
                    }}
                    onToggleStatus={handleToggleStatus}
                    onViewDetails={handleViewDetails}
                />
            </DashboardSection>

            {/* Add/Edit Yayasan Modal */}
            <YayasanFormModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onSubmit={handleAddYayasan}
                isSubmitting={isSaving}
            />

            {/* Edit Yayasan Modal */}
            <YayasanFormModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                onSubmit={handleEditYayasan}
                isSubmitting={isSaving}
                yayasan={selectedYayasan}
                isEditing={true}
            />

            {/* Delete Confirmation Modal */}
            <YayasanDeleteModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleConfirmDelete}
                yayasan={selectedYayasan}
                isLoading={isSaving}
            />

            {/* Detail Modal */}
            <YayasanDetailModal
                isOpen={isDetailModalOpen}
                onClose={() => setIsDetailModalOpen(false)}
                yayasan={selectedYayasan}
                onEdit={openEditModal}
            />
        </div>
    );
}