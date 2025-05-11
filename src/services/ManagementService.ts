// src/services/volunteerManagementService.ts
import { api } from '@/lib/http-client';
import { VolunteerResponse } from '@/services/volunteerService';

/**
 * Service for volunteer management functionality
 * Contains methods for admin operations on volunteers
 */
export const volunteerManagementService = {
  /**
   * Get all volunteers
   */
  getAllVolunteers: () => {
    return api.get<{ message: string; data: VolunteerResponse[] }>('/volunteers');
  },

  /**
   * Get volunteer by ID
   * @param id Volunteer ID
   */
  getVolunteerById: (id: string) => {
    return api.get<{ message: string; data: VolunteerResponse }>(`/volunteers/${id}`);
  },

  /**
   * Update volunteer
   * @param id Volunteer ID
   * @param data Updated volunteer data as FormData
   */
  updateVolunteer: (id: string, data: globalThis.FormData) => {
    return api.put<{ message: string; data: VolunteerResponse }>(`/volunteers/${id}`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  /**
   * Update volunteer status
   * @param id Volunteer ID
   * @param status New status (ACTIVE, PENDING, INACTIVE)
   */
  updateVolunteerStatus: (id: string, status: 'ACTIVE' | 'PENDING' | 'INACTIVE') => {
    return api.patch<{ message: string }>(`/volunteers/${id}/status`, { status });
  },

  /**
   * Add new volunteer (for admin)
   * @param data Volunteer data as FormData
   */
  addVolunteer: (data: globalThis.FormData) => {
    return api.post<{ message: string; data: VolunteerResponse }>('/volunteers', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  /**
   * Get volunteers statistics
   */
  getVolunteerStats: () => {
    return api.get<{
      message: string;
      data: {
        total: number;
        active: number;
        pending: number;
        inactive: number;
        maleCount: number;
        femaleCount: number;
      };
    }>('/volunteers/stats');
  },

  /**
   * Get volunteers by wilayah (region)
   * @param wilayahId Wilayah/Region ID
   */
  getVolunteersByWilayah: (wilayahId: number) => {
    return api.get<{ message: string; data: VolunteerResponse[] }>(`/volunteers/wilayah/${wilayahId}`);
  }
};

export default volunteerManagementService;