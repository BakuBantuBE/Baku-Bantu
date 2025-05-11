// src/services/api.ts
/**
 * This file contains base API configuration and utility functions
 * for making HTTP requests to the backend.
 */

/**
 * Base API configuration including endpoints and common headers
 */
export const API_CONFIG = {
  baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || 'https://www.be-bakubantusulut.org',
    endpoints: {
      volunteers: {
        register: '/volunteers/register',
        getWilayah: '/wilayah/active',
        active: '/volunteers/active' 
      }
    },
    headers: {
      'Content-Type': 'application/json',
    }
  };
  
  /**
   * Custom error class for API related errors
   */
  export class ApiError extends Error {
    status: number;
    data: any;
  
    constructor(message: string, status: number, data?: any) {
      super(message);
      this.name = 'ApiError';
      this.status = status;
      this.data = data;
    }
  }
  
  /**
   * Generic function to handle API responses
   */
  export async function handleApiResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
      } catch (e) {
        errorData = { message: 'An unknown error occurred' };
      }
      
      throw new ApiError(
        errorData.message || `API request failed with status ${response.status}`,
        response.status,
        errorData
      );
    }
    
    try {
      return await response.json() as T;
    } catch (error) {
      throw new ApiError('Failed to parse response data', 500);
    }
  }
  
  /**
   * Generic fetch utility with error handling
   */
  export async function fetchApi<T = any>(
    endpoint: string,
    options: RequestInit = {},
    customBaseUrl?: string
  ): Promise<T> {
    const baseUrl = customBaseUrl || API_CONFIG.baseUrl;
    const url = `${baseUrl}${endpoint}`;
    
    const response = await fetch(url, {
      ...options,
      headers: {
        ...API_CONFIG.headers,
        ...options.headers,
      },
    });
    
    return handleApiResponse<T>(response);
  }