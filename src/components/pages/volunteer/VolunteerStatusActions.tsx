// src/components/pages/volunteer/VolunteerStatusActions.tsx
import React, { useState } from 'react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/contexts/ToastContext';
import volunteerManagementService from '@/services/volunteerManagementService';

interface VolunteerStatusActionsProps {
  volunteerId: string;
  currentStatus: string;
  onStatusChange?: (newStatus: string) => void;
  showButtons?: boolean;
  className?: string;
}

const VolunteerStatusActions: React.FC<VolunteerStatusActionsProps> = ({
  volunteerId,
  currentStatus,
  onStatusChange,
  showButtons = true,
  className
}) => {
  const toast = useToast();
  const [isUpdating, setIsUpdating] = useState(false);
  
  const handleStatusChange = async (newStatus: 'ACTIVE' | 'PENDING' | 'INACTIVE') => {
    try {
      setIsUpdating(true);
      
      await volunteerManagementService.updateVolunteerStatus(volunteerId, newStatus);
      
      // Call the callback if provided
      if (onStatusChange) {
        onStatusChange(newStatus);
      }
      
      const statusText = newStatus === 'ACTIVE' ? 'Aktif' : 
                        newStatus === 'PENDING' ? 'Pending' : 'Tidak Aktif';
      toast.success(`Status relawan berhasil diubah menjadi ${statusText}`);
    } catch (error) {
      console.error('Error updating volunteer status:', error);
      toast.error('Gagal memperbarui status relawan');
    } finally {
      setIsUpdating(false);
    }
  };
  
  // Render status badge
  const renderStatus = () => {
    switch (currentStatus) {
      case 'ACTIVE':
        return <Badge variant="success">Aktif</Badge>;
      case 'PENDING':
        return <Badge variant="warning">Pending</Badge>;
      case 'INACTIVE':
        return <Badge variant="default">Tidak Aktif</Badge>;
      default:
        return <Badge variant="default">{currentStatus}</Badge>;
    }
  };
  
  return (
    <div className={`flex flex-col ${className || ''}`}>
      <div className="flex items-center">
        {renderStatus()}
      </div>
      
      {showButtons && (
        <div className="flex flex-wrap gap-2 mt-2">
          {currentStatus !== 'ACTIVE' && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleStatusChange('ACTIVE')}
              isLoading={isUpdating}
              disabled={isUpdating}
              className="text-xs px-2 py-1 h-auto text-green-700 border-green-300 hover:bg-green-50"
            >
              Aktifkan
            </Button>
          )}
          
          {currentStatus !== 'PENDING' && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleStatusChange('PENDING')}
              isLoading={isUpdating}
              disabled={isUpdating}
              className="text-xs px-2 py-1 h-auto text-yellow-700 border-yellow-300 hover:bg-yellow-50"
            >
              Pending
            </Button>
          )}
          
          {currentStatus !== 'INACTIVE' && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleStatusChange('INACTIVE')}
              isLoading={isUpdating}
              disabled={isUpdating}
              className="text-xs px-2 py-1 h-auto text-red-700 border-red-300 hover:bg-red-50"
            >
              Nonaktifkan
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default VolunteerStatusActions;