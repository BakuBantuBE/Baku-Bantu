// src/components/pages/admin/AdminStatusBadge.tsx
import React from 'react';
import { Badge } from '@/components/ui/Badge';

interface AdminStatusBadgeProps {
  status: string;
  onClick?: () => void;
  className?: string;
}

const AdminStatusBadge: React.FC<AdminStatusBadgeProps> = ({
  status,
  onClick,
  className = ''
}) => {
  const isClickable = !!onClick;

  switch (status) {
    case 'ACTIVE':
      return (
        <Badge 
          variant="success" 
          className={`${className} ${isClickable ? 'cursor-pointer hover:bg-green-100' : ''}`}
          onClick={onClick}
        >
          <span className="flex items-center">
            <span className="h-1.5 w-1.5 rounded-full bg-green-600 mr-1.5"></span>
            Aktif
          </span>
        </Badge>
      );
    case 'INACTIVE':
      return (
        <Badge 
          variant="default" 
          className={`${className} ${isClickable ? 'cursor-pointer hover:bg-gray-200' : ''}`}
          onClick={onClick}
        >
          <span className="flex items-center">
            <span className="h-1.5 w-1.5 rounded-full bg-gray-500 mr-1.5"></span>
            Tidak Aktif
          </span>
        </Badge>
      );
    default:
      return (
        <Badge 
          variant="default" 
          className={className}
        >
          {status}
        </Badge>
      );
  }
};

export default AdminStatusBadge;