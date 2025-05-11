// src/services/volunteer.ts
import { VolunteerFormData } from '@/lib/validations/volunteer-schema';
import { fetchApi, API_CONFIG, ApiError } from './api';

// Interface untuk response dari API
interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  errors?: Record<string, string>;
}

/**
 * Service untuk mengirimkan data pendaftaran relawan ke API
 */
export async function registerVolunteer(formData: VolunteerFormData): Promise<ApiResponse> {
  try {
    // Buat FormData object untuk mengirim file
    const apiFormData = new FormData();
    
    // Tambahkan semua field ke FormData
    Object.entries(formData).forEach(([key, value]) => {
      if (key === 'profileImage' && value) {
        apiFormData.append(key, value as File);
      } else if (value !== null && value !== undefined) {
        apiFormData.append(key, String(value));
      }
    });

    const response = await fetch(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.volunteers.register}`, {
      method: 'POST',
      body: apiFormData
    });

    const data = await response.json();
    
    if (!response.ok) {
      return {
        success: false,
        message: data.message || 'Terjadi kesalahan saat mendaftar',
        errors: data.errors
      };
    }

    return {
      success: true,
      message: data.message || 'Pendaftaran relawan berhasil',
      data: data.data
    };

  } catch (error) {
    console.error('Error registering volunteer:', error);
    
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Terjadi kesalahan saat mendaftar',
    };
  }
}

/**
 * Service untuk mendapatkan daftar wilayah dari API
 */
export async function getWilayahList(): Promise<ApiResponse<{ id: string; nama: string }[]>> {
  try {
    const response = await fetchApi<{
      message: string;
      data: { id: string; nama: string }[];
    }>(`${API_CONFIG.endpoints.volunteers.getWilayah}`);

    return {
      success: true,
      message: 'Berhasil mendapatkan daftar wilayah',
      data: response.data
    };

  } catch (error) {
    if (error instanceof ApiError) {
      return {
        success: false,
        message: error.message,
        errors: error.data?.errors
      };
    }

    return {
      success: false,
      message: error instanceof Error ? error.message : 'Terjadi kesalahan saat mengambil data wilayah',
      data: []
    };
  }
}