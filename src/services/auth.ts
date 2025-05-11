// src/services/auth.ts
import { authApi } from '@/services/api/auth-api';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface User {
  id: string;
  email: string;
  role: 'ADMIN' | 'SUPERADMIN';
  status: string;
  username?: string;
  profileImage?: string | null;
  region?: string;
  createdAt?: string;
  updatedAt?: string;
  createdBy?: string | null;
}

export interface LoginResponse {
  message: string;
  data: {
    user: User;
    token: string;
  };
}

/**
 * Login function using the real API
 * @param credentials Email and password
 * @returns Promise with login response
 */
export async function login(credentials: LoginCredentials): Promise<LoginResponse> {
  try {
    return await authApi.login(credentials);
  } catch (error: any) {
    console.error('Login error:', error);
    // Extract error message from API response if available
    const errorMessage = error.response?.data?.message || 'Login failed. Please check your credentials.';
    throw new Error(errorMessage);
  }
}

/**
 * Logout function - clears all authentication data
 */
export function logout(): void {
  // Clear localStorage
  localStorage.removeItem('auth_token');
  localStorage.removeItem('user_info');
  
  // Clear the cookie
  document.cookie = 'auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Strict';
}

/**
 * Check if user is authenticated
 * @returns boolean indicating authentication status
 */
export function isAuthenticated(): boolean {
  // Check if we're in a browser environment
  if (typeof window === 'undefined') {
    return false;
  }
  return !!localStorage.getItem('auth_token');
}

/**
 * Get authentication token
 * @returns string | null
 */
export function getToken(): string | null {
  // Check if we're in a browser environment
  if (typeof window === 'undefined') {
    return null;
  }
  return localStorage.getItem('auth_token');
}

/**
 * Get user data from localStorage
 * @returns User | null
 */
export function getUser(): User | null {
  // Check if we're in a browser environment
  if (typeof window === 'undefined') {
    return null;
  }
  
  try {
    const userJson = localStorage.getItem('user_info');
    if (!userJson) return null;
    return JSON.parse(userJson);
  } catch (error) {
    console.error('Error parsing user info:', error);
    return null;
  }
}

/**
 * Set authentication data in localStorage and cookies
 * @param token JWT token
 * @param user User data
 */
export function setAuthData(token: string, user: User): void {
  // Store in localStorage for client-side access
  localStorage.setItem('auth_token', token);
  localStorage.setItem('user_info', JSON.stringify(user));
  
  // Also set a cookie for the middleware
  document.cookie = `auth_token=${token}; path=/; max-age=86400; SameSite=Strict`;
}

/**
 * Check if user has required permission
 * @param requiredRole ADMIN or SUPERADMIN
 * @returns boolean
 */
export function hasPermission(requiredRole: 'ADMIN' | 'SUPERADMIN'): boolean {
  const user = getUser();
  if (!user) return false;
  
  // SUPERADMIN has access to everything
  if (user.role === 'SUPERADMIN') return true;
  
  // ADMIN only has access to ADMIN level permissions
  if (user.role === 'ADMIN' && requiredRole === 'ADMIN') return true;
  
  return false;
}