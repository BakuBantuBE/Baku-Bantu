// src/components/dashboard/LogoutButton.tsx
"use client";

import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/Button';

interface LogoutButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  className?: string;
}

const LogoutButton = ({ variant = 'outline', className }: LogoutButtonProps) => {
  const { logout } = useAuth();

  return (
    <Button
      variant={variant}
      onClick={logout}
      className={className}
      rightIcon={
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M3 3a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V7.414a1 1 0 00-.293-.707L11.414 2.414A1 1 0 0010.707 2H4a1 1 0 00-1 1zm9.293 1.707a1 1 0 01.707.293l4 4a1 1 0 01.293.707V19a1 1 0 01-1 1H3a1 1 0 01-1-1V3a1 1 0 011-1h9v2.586a1 1 0 01-.293.707L7.414 9.586a1 1 0 11-1.414-1.414L9.586 4.586A1 1 0 0110.293 4z"
            clipRule="evenodd"
          />
        </svg>
      }
    >
      Logout
    </Button>
  );
};

export default LogoutButton;