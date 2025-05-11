// src/services/adminService.ts
import { api } from '@/lib/http-client';
import { VolunteerResponse } from '@/services/volunteerService';

export interface AdminResponse {
  id: string;
  email: string;
  role: 'ADMIN' | 'SUPERADMIN';
  status: 'ACTIVE' | 'INACTIVE';
  createdAt: string;
  updatedAt: string;
  volunteerInfo?: VolunteerInfo | null;
}

interface VolunteerInfo {
  id: string;
  namaLengkap: string;
  email: string;
  profileImage?: string;
  wilayah?: {
    id: number;
    nama: string;
  }
}

export interface CreateAdminParams {
  volunteerId: string;
  role: 'ADMIN' | 'SUPERADMIN';
}

// Interface for add admin from volunteer response
export interface AddAdminResponse {
  message: string;
  data: {
    admin: AdminResponse;
    volunteer: VolunteerResponse;
  };
}

// Interface for reset password response
export interface ResetPasswordResponse {
  message: string;
  data: AdminResponse;
}

export const adminService = {
  /**
   * Get all admins
   */
  getAllAdmins: () => {
    return api.get<{ message: string; data: AdminResponse[] }>('/admin');
  },

  /**
   * Get active volunteers
   */
  getActiveVolunteers: () => {
    return api.get<{ message: string; data: VolunteerResponse[] }>('/volunteers/active');
  },

  /**
   * Create a new admin from volunteer
   * @param volunteerId Volunteer ID
   * @param role Admin role
   */
  createAdmin: (data: CreateAdminParams) => {
    return api.post<AddAdminResponse>(`/admin/${data.volunteerId}`, { 
      role: data.role 
    });
  },

  /**
   * Delete an admin
   * @param id Admin ID
   */
  deleteAdmin: (id: string) => {
    return api.delete<{ message: string }>(`/admin/${id}`);
  },

  /**
   * Reset admin password
   * @param id Admin ID
   */
  resetPassword: (id: string) => {
    return api.post<ResetPasswordResponse>(`/admin/${id}/reset-password`, {});
  },

  /**
   * Update admin status
   * @param id Admin ID
   * @param status New status
   */
  updateStatus: (id: string, status: 'ACTIVE' | 'INACTIVE') => {
    return api.patch<{ message: string }>(`/admin/${id}/status`, { status });
  }
};

export default adminService;