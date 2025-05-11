// src/contexts/AuthContext.tsx
"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { User, getUser, isAuthenticated, logout as logoutService } from '@/services/auth';
import { useToast } from './ToastContext';
import { Loading } from '@/components/ui/Loading';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (token: string, userData: User) => void;
  logout: () => void;
  hasPermission: (role: 'ADMIN' | 'SUPERADMIN') => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [authStatus, setAuthStatus] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const toast = useToast();

  // Check authentication on mount and path changes
  useEffect(() => {
    const checkAuth = () => {
      setIsLoading(true);
      
      if (isAuthenticated()) {
        const userData = getUser();
        setUser(userData);
        setAuthStatus(true);
      } else {
        setUser(null);
        setAuthStatus(false);
        
        // Redirect to login if accessing protected route
        if (pathname?.startsWith('/dashboard')) {
          router.push('/login');
        }
      }
      
      setIsLoading(false);
    };

    checkAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const handleLogin = (token: string, userData: User) => {
    // Store auth data
    localStorage.setItem('auth_token', token);
    localStorage.setItem('user_info', JSON.stringify(userData));
    
    // Also set a cookie for the middleware
    document.cookie = `auth_token=${token}; path=/; max-age=86400; SameSite=Strict`;
    
    setUser(userData);
    setAuthStatus(true);
  };

  const handleLogout = () => {
    // Use the logout service
    logoutService();
    
    // Update state
    setUser(null);
    setAuthStatus(false);
    
    // Show success message
    toast.success('You have been successfully logged out');
    
    // Redirect to login
    router.push('/login');
  };

  const checkPermission = (requiredRole: 'ADMIN' | 'SUPERADMIN'): boolean => {
    if (!user) return false;
    
    // SUPERADMIN has access to everything
    if (user.role === 'SUPERADMIN') return true;
    
    // ADMIN only has access to ADMIN level permissions
    if (user.role === 'ADMIN' && requiredRole === 'ADMIN') return true;
    
    return false;
  };
  
  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: authStatus,
        login: handleLogin,
        logout: handleLogout,
        hasPermission: checkPermission,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}