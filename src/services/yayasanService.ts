// src/services/yayasanService.ts
import { api } from '@/lib/http-client';

export interface KontakYayasan {
  jabatan: string;
  nama_kontak: string;
  nomor_telepon: string;
}

export interface PantiItem {
  id: number;
  namaPanti: string;
}

export interface YayasanResponse {
  id: number;
  namaYayasan: string;
  alamatYayasan: string;
  emailYayasan: string;
  kontakYayasan: KontakYayasan[];
  createdAt: string;
  updatedAt: string;
  status: 'ACTIVE' | 'INACTIVE';
  pantis: PantiItem[];
  pantiCount: number;
}

export interface CreateYayasanParams {
  namaYayasan: string;
  alamatYayasan: string;
  emailYayasan: string;
  kontakYayasan: KontakYayasan[];
}

export interface UpdateYayasanParams {
  namaYayasan?: string;
  alamatYayasan?: string;
  emailYayasan?: string;
  kontakYayasan?: KontakYayasan[];
  status?: 'ACTIVE' | 'INACTIVE';
}

/**
 * Service for foundation related API calls
 */
export const yayasanService = {
  /**
   * Get all foundations
   */
  getAllYayasan: () => {
    return api.get<{ message: string; data: YayasanResponse[] }>('/yayasan');
  },

  /**
   * Get foundation by ID
   * @param id Foundation ID
   */
  getYayasanById: (id: number) => {
    return api.get<{ message: string; data: YayasanResponse }>(`/yayasan/${id}`);
  },

  /**
   * Create a new foundation
   * @param data Foundation data
   */
  createYayasan: (data: CreateYayasanParams) => {
    return api.post<{ message: string; data: YayasanResponse }>('/yayasan', data);
  },

  /**
   * Update a foundation
   * @param id Foundation ID
   * @param data Updated foundation data
   */
  updateYayasan: (id: number, data: UpdateYayasanParams) => {
    return api.put<{ message: string; data: YayasanResponse }>(`/yayasan/${id}`, data);
  },

  /**
   * Delete a foundation
   * @param id Foundation ID
   */
  deleteYayasan: (id: number) => {
    return api.delete<{ message: string }>(`/yayasan/${id}`);
  },

  /**
   * Update foundation status
   * @param id Foundation ID
   * @param status New status (ACTIVE or INACTIVE)
   */
  updateYayasanStatus: (id: number, status: 'ACTIVE' | 'INACTIVE') => {
    return api.patch<{ message: string }>(`/yayasan/${id}/status`, { status });
  },
  
  /**
   * Get active foundations
   */
  getActiveYayasan: () => {
    return api.get<{ message: string; data: YayasanResponse[] }>('/yayasan/active');
  }
};

export default yayasanService;