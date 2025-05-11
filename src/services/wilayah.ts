// src/services/wilayah.ts
import { fetchApi, API_CONFIG, ApiError } from './api';
import { api } from '@/lib/http-client';

/**
 * Interface for API response
 */
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  errors?: Record<string, string>;
}

/**
 * Interface for Wilayah data structure
 */
export interface Wilayah {
  id: number;
  nama: string;
  createdAt: string;
  updatedAt: string;
  status: 'ACTIVE' | 'INACTIVE';
  volunteersCount: number;
  totalCount: number;
}

/**
 * Fetch all wilayah from the API
 */
export async function fetchWilayahList(): Promise<ApiResponse<Wilayah[]>> {
  try {
    // Update API_CONFIG if needed
    const endpoint = '/wilayah';
    
    const response = await api.get<{
      message: string;
      data: Wilayah[];
    }>(endpoint);
    
    return {
      success: true,
      message: response.message || 'Wilayah fetched successfully',
      data: response.data
    };
  } catch (error) {
    console.error('Error fetching wilayah:', error);
    
    if (error instanceof ApiError) {
      return {
        success: false,
        message: error.message,
        errors: error.data?.errors
      };
    }
    
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to fetch wilayah list',
      data: []
    };
  }
}

/**
 * Add a new wilayah
 * @param nama Name of the wilayah to add
 * @param status Status of the wilayah (ACTIVE or INACTIVE)
 */
export async function addWilayah(nama: string, status: 'ACTIVE' | 'INACTIVE' = 'ACTIVE'): Promise<ApiResponse> {
  try {
    const endpoint = '/wilayah';
    
    const response = await api.post(endpoint, { 
      nama,
      status
    });
    
    return {
      success: true,
      message: 'Wilayah berhasil ditambahkan',
      data: response
    };
  } catch (error) {
    console.error('Error adding wilayah:', error);
    
    if (error instanceof ApiError) {
      return {
        success: false,
        message: error.message,
        errors: error.data?.errors
      };
    }
    
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Gagal menambahkan wilayah',
    };
  }
}

/**
 * Delete a wilayah
 * @param id ID of the wilayah to delete
 */
export async function deleteWilayah(id: number): Promise<ApiResponse> {
  try {
    const endpoint = `/wilayah/${id}`;
    
    const response = await api.delete(endpoint);
    
    return {
      success: true,
      message: 'Wilayah deleted successfully',
      data: response
    };
  } catch (error) {
    console.error('Error deleting wilayah:', error);
    
    if (error instanceof ApiError) {
      return {
        success: false,
        message: error.message,
        errors: error.data?.errors
      };
    }
    
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to delete wilayah',
    };
  }
}

/**
 * Update a wilayah
 * @param id ID of the wilayah to update
 * @param nama New name for the wilayah
 * @param status New status for the wilayah (ACTIVE or INACTIVE)
 */
export async function updateWilayah(
  id: number, 
  nama: string, 
  status?: 'ACTIVE' | 'INACTIVE'
): Promise<ApiResponse> {
  try {
    const endpoint = `/wilayah/${id}`;
    
    // Only include status in the payload if it's provided
    const payload: { nama: string; status?: 'ACTIVE' | 'INACTIVE' } = { nama };
    if (status) {
      payload.status = status;
    }
    
    const response = await api.put(endpoint, payload);
    
    return {
      success: true,
      message: 'Wilayah berhasil diperbarui',
      data: response
    };
  } catch (error) {
    console.error('Error updating wilayah:', error);
    
    if (error instanceof ApiError) {
      return {
        success: false,
        message: error.message,
        errors: error.data?.errors
      };
    }
    
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Gagal memperbarui wilayah',
    };
  }
}