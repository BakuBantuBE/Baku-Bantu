// src/services/api/auth-api.ts
import { api } from '@/lib/http-client';
import { LoginCredentials, LoginResponse, User } from '@/services/auth';

/**
 * Authentication API service
 * Contains all authentication-related API calls
 */
export const authApi = {
  /**
   * Login user
   * @param credentials Email and password
   */
  login: (credentials: LoginCredentials) => {
    return api.post<LoginResponse>('/auth/login', credentials);
  },

  /**
   * Get current user profile
   * Requires authentication
   */
  getProfile: () => {
    return api.get<{ user: User }>('/auth/profile');
  },

  /**
   * Refresh token
   * @param refreshToken The refresh token
   */
  refreshToken: (refreshToken: string) => {
    return api.post<{ token: string; refreshToken: string }>('/auth/refresh-token', { refreshToken });
  },

  /**
   * Request password reset
   * @param email User's email
   */
  requestPasswordReset: (email: string) => {
    return api.post<{ message: string }>('/auth/forgot-password', { email });
  },

  /**
   * Reset password with token
   * @param token Reset token from email
   * @param newPassword New password
   */
  resetPassword: (token: string, newPassword: string) => {
    return api.post<{ message: string }>('/auth/reset-password', {
      token,
      newPassword,
    });
  },

  /**
   * Change password (when logged in)
   * @param currentPassword Current password
   * @param newPassword New password
   */
  changePassword: (currentPassword: string, newPassword: string) => {
    return api.post<{ message: string }>('/auth/change-password', {
      currentPassword,
      newPassword,
    });
  },

  /**
   * Logout (server-side - if needed)
   * This is primarily for invalidating the token on the server
   */
  logout: () => {
    return api.post<{ message: string }>('/auth/logout');
  }
};