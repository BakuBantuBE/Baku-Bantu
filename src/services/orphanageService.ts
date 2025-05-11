// src/services/orphanageService.ts (Extended)
import { api } from '@/lib/http-client';

export interface Orphanage {
  id: number;
  namaPanti: string;
  fotoUtama: string | null;
  deskripsiSingkat: string;
  jumlahAnak: number;
  status: 'ACTIVE' | 'INACTIVE' | 'PENDING';
  yayasanId: number;
  wilayahId: number;
  createdAt: string;
  updatedAt: string;
  yayasan?: {
    id: number;
    namaYayasan: string;
    kontakYayasan: {
      jabatan: string;
      nama_kontak: string;
      nomor_telepon: string;
    }[];
  };
  wilayah?: {
    id: number;
    nama: string;
    provinsi: string | null;
  };
  detailPanti?: OrphanageDetail;
}

export interface OrphanageDetail {
  id: number;
  fokusPelayanan: string;
  alamatLengkap: string;
  deskripsiLengkap: string;
  jumlahPengasuh: number;
  jumlahPenghuni: {
    laki_laki: number;
    perempuan: number;
  };
  kategoriKebutuhan: string[];
  sumbanganDiterima: string[];
  pantiId: number;
  createdAt: string;
  updatedAt: string;
}

export interface OrphanageDetailResponse {
  status: string;
  data: {
    panti: Orphanage;
  };
}

export interface CreateOrphanageParams {
  namaPanti: string;
  deskripsiSingkat: string;
  fokusPelayanan: string;
  jumlahAnak: number;
  status: 'ACTIVE' | 'INACTIVE' | 'PENDING';
  yayasanId: number;
  wilayahId: number;
  fotoUtama?: File;
}

export interface UpdateOrphanageDetailParams {
  fokusPelayanan: string;
  alamatLengkap: string;
  deskripsiLengkap: string;
  jumlahPengasuh: number;
  jumlahPenghuni: {
    laki_laki: number;
    perempuan: number;
  };
  kategoriKebutuhan: string[];
  sumbanganDiterima: string[];
}

export const orphanageService = {
  /**
   * Get all orphanages
   */
  getAllOrphanages: () => {
    return api.get<{ message: string; data: Orphanage[] }>('/panti');
  },

  /**
   * Get all active orphanages
   */
  getActiveOrphanages: () => {
    return api.get<{ message: string; data: Orphanage[] }>('/panti/active');
  },

  /**
   * Get orphanage by ID
   * @param id Orphanage ID
   */
  getOrphanageById: (id: number) => {
    return api.get<OrphanageDetailResponse>(`/panti/${id}`);
  },

  /**
   * Get orphanage detail by ID
   * @param id Orphanage ID
   */
  getOrphanageDetailById: (id: number) => {
    return api.get<{ message: string; data: OrphanageDetail }>(`/panti/detail/${id}`);
  },

  /**
   * Get active wilayah list
   */
  getActiveWilayah: () => {
    return api.get<{ message: string; data: { id: number; nama: string; status: string }[] }>('/wilayah/active');
  },

  /**
   * Get active yayasan list
   */
  getActiveYayasan: () => {
    return api.get<{ message: string; data: { id: number; namaYayasan: string; status: string }[] }>('/yayasan/active');
  },

  /**
   * Create a new orphanage
   * @param data Orphanage data as FormData
   */
  createOrphanage: (data: FormData) => {
    return api.post<{ 
      message: string; 
      data: Orphanage & { 
        detailPanti: OrphanageDetail 
      } 
    }>('/panti', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  /**
   * Update orphanage detail
   * @param id Orphanage ID
   * @param data Updated orphanage detail data
   */
  updateOrphanageDetail: (id: number, data: UpdateOrphanageDetailParams) => {
    return api.put<{ message: string; data: OrphanageDetail }>(`/panti/${id}/detail`, data);
  },

  /**
   * Update an orphanage
   * @param id Orphanage ID
   * @param data Updated orphanage data as FormData
   */
  updateOrphanage: (id: number, data: FormData) => {
    return api.put<{ message: string; data: Orphanage }>(`/panti/${id}`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  /**
   * Update orphanage status
   * @param id Orphanage ID
   * @param status New status
   */
  updateOrphanageStatus: (id: number, status: 'ACTIVE' | 'INACTIVE' | 'PENDING') => {
    return api.patch<{ message: string }>(`/panti/${id}/status`, { status });
  },

  /**
   * Delete an orphanage
   * @param id Orphanage ID
   */
  deleteOrphanage: (id: number) => {
    return api.delete<{ message: string }>(`/panti/${id}`);
  }
};

export default orphanageService;