// src/hooks/useLogin.ts
import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { login as authLogin, LoginCredentials, setAuthData } from '@/services/auth';
import { useToast } from '@/contexts/ToastContext';
import { useAuth } from '@/contexts/AuthContext';
import { handleApiError } from '@/lib/api-error-utils';

interface LoginHookReturn {
  isLoading: boolean;
  error: string | null;
  login: (credentials: LoginCredentials, rememberMe?: boolean) => Promise<boolean>;
  clearError: () => void;
}

/**
 * Hook for handling login functionality
 * @returns Login functions and state
 */
export function useLogin(): LoginHookReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const toast = useToast();
  const { login: contextLogin } = useAuth();

  const login = useCallback(
    async (credentials: LoginCredentials, rememberMe = false): Promise<boolean> => {
      try {
        setIsLoading(true);
        setError(null);

        // Validate inputs
        if (!credentials.email?.trim()) {
          setError('Email is required');
          toast.error('Email is required');
          return false;
        }

        if (!credentials.password) {
          setError('Password is required');
          toast.error('Password is required');
          return false;
        }

        // Call the login API
        const response = await authLogin(credentials);
        
        // Update the auth context
        contextLogin(response.data.token, response.data.user);
        
        // Also set the auth data directly
        setAuthData(response.data.token, response.data.user);
        
        // If remember me is checked, store a longer cookie
        if (rememberMe) {
          // 30 days expiry
          document.cookie = `auth_token=${response.data.token}; path=/; max-age=2592000; SameSite=Strict`;
        }
        
        // Show success message
        toast.success('Login successful!', 'Welcome back');
        
        return true;
      } catch (err) {
        // Use our error handling utility
        const formattedError = handleApiError(err, toast, (errorInfo) => {
          // Set the error message for the form
          setError(errorInfo.message);
        });
        
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [contextLogin, toast]
  );

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    isLoading,
    error,
    login,
    clearError,
  };
}