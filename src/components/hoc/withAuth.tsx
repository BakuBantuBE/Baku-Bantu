// src/components/hoc/withAuth.tsx
"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ComponentType } from 'react';
import { isAuthenticated, hasPermission } from '@/services/auth';
import { Loading } from '@/components/ui/Loading';
import { useToast } from '@/contexts/ToastContext';

interface WithAuthOptions {
  requiredRole?: 'ADMIN' | 'SUPERADMIN';
  redirectTo?: string;
}

/**
 * HOC for protecting routes that require authentication
 * @param Component Component to wrap with authentication
 * @param options Authentication options
 * @returns Protected component
 */
export function withAuth<T extends object>(
  Component: ComponentType<T>,
  options: WithAuthOptions = {}
) {
  const { requiredRole, redirectTo = '/login' } = options;

  const AuthenticatedComponent = (props: T) => {
    const router = useRouter();
    const toast = useToast();
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [isChecking, setIsChecking] = useState(true);

    useEffect(() => {
      const checkAuth = () => {
        // Check if user is authenticated
        if (!isAuthenticated()) {
          toast.error('Please log in to access this page');
          router.push(redirectTo);
          return;
        }

        // If a specific role is required, check permissions
        if (requiredRole && !hasPermission(requiredRole)) {
          toast.error('You do not have permission to access this page');
          router.push('/dashboard'); // Redirect to dashboard instead of login
          return;
        }

        // User is authenticated and authorized
        setIsAuthorized(true);
        setIsChecking(false);
      };

      checkAuth();
    }, [router, toast]);

    if (isChecking) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <Loading size="lg" text="Verifying your access..." />
        </div>
      );
    }

    if (!isAuthorized) {
      return null; // This prevents flickering during redirect
    }

    return <Component {...props} />;
  };

  // Set display name for debugging
  const componentName = Component.displayName || Component.name || 'Component';
  AuthenticatedComponent.displayName = `withAuth(${componentName})`;

  return AuthenticatedComponent;
}