// src/services/volunteerService.ts
import { fetchApi, API_CONFIG, ApiError } from './api';
import { VolunteerFormData, prepareFormDataForSubmission } from '@/lib/validations/volunteer-schema';

/**
 * Types for API responses
 */
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  errors?: Record<string, string>;
}

export interface VolunteerResponse {
  id: string;
  namaLengkap: string;
  jenisKelamin: string;
  tempatLahir: string;
  tanggalLahir: string;
  alamatDomisili: string;
  kewarganegaraan: string;
  nomorHP: string;
  email: string;
  wilayahId: number; // Changed to number to match database
  profileImage?: string;
  jabatan?: string;
  status?: string;
  createdAt: string;
  updatedAt: string;
  wilayah?: Wilayah;
}

export interface Wilayah {
  id: number; // Changed to number to match database
  nama: string;
}

export interface ActiveVolunteersResponse {
  message: string;
  data: VolunteerResponse[];
}

/**
 * Register a new volunteer
 * @param formData - The volunteer registration form data
 */
export async function registerVolunteer(formData: VolunteerFormData): Promise<ApiResponse<VolunteerResponse>> {
  try {
    // Create FormData object for file uploads
    const apiFormData = new FormData();
    
    // Process the form data to ensure proper types
    const processedData = prepareFormDataForSubmission(formData);
    
    // Add all fields to FormData
    Object.entries(processedData).forEach(([key, value]) => {
      if (key === 'profileImage' && value instanceof File) {
        apiFormData.append(key, value);
      } else if (value !== null && value !== undefined) {
        // Convert wilayahId to string explicitly for FormData
        if (key === 'wilayahId') {
          apiFormData.append(key, String(value));
        } else {
          apiFormData.append(key, String(value));
        }
      }
    });
    
    // Make the API request
    const response = await fetch(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.volunteers.register}`, {
      method: 'POST',
      body: apiFormData,
      // Don't set Content-Type header when using FormData, the browser will set it with the boundary
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      return {
        success: false,
        message: data.message || 'Failed to register volunteer',
        errors: data.errors
      };
    }
    
    return {
      success: true,
      message: data.message || 'Volunteer registered successfully',
      data: data.data
    };
  } catch (error) {
    console.error('Error registering volunteer:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'An unknown error occurred'
    };
  }
}

/**
 * Get list of wilayah (regions)
 */
export async function getWilayahList(): Promise<ApiResponse<Wilayah[]>> {
  try {
    const response = await fetchApi<{
      message: string;
      data: Wilayah[];
    }>(`${API_CONFIG.endpoints.volunteers.getWilayah}`);
    
    return {
      success: true,
      message: 'Wilayah fetched successfully',
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
      message: error instanceof Error ? error.message : 'Failed to fetch wilayah list',
      data: []
    };
  }
}

/**
 * Get list of active volunteers
 * Uses the same fetchApi utility as other API calls for consistency
 */
export async function getActiveVolunteers(): Promise<ApiResponse<VolunteerResponse[]>> {
  try {
    // Update API_CONFIG with active volunteers endpoint if not already defined
    const endpoint = API_CONFIG.endpoints.volunteers.active || '/volunteers/active';
    
    const response = await fetchApi<ActiveVolunteersResponse>(endpoint);
    
    return {
      success: true,
      message: response.message || 'Active volunteers fetched successfully',
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
      message: error instanceof Error ? error.message : 'Failed to fetch active volunteers',
      data: []
    };
  }
}