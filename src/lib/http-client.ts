// src/lib/http-client.ts
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { getToken } from '@/services/auth';

// Base API URL
const API_BASE_URL = 'https://www.be-bakubantusulut.org';

/**
 * Create and configure an Axios instance
 */
const createAxiosInstance = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    },
    timeout: 30000, // 30 seconds timeout
  });

  // Request interceptor to add auth token
  instance.interceptors.request.use(
    (config) => {
      const token = getToken();
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Response interceptor for error handling
  instance.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      // Handle specific error cases
      if (error.response) {
        // Server responded with a status code outside of 2xx range
        console.error('API Error:', error.response.data);
        
        // Handle 401 Unauthorized - token expired or invalid
        if (error.response.status === 401) {
          // You can trigger logout or refresh token logic here
          console.warn('Authentication error - redirecting to login');
          // If implementing refresh token logic, do it here
        }
      } else if (error.request) {
        // No response received
        console.error('No response received:', error.request);
      } else {
        // Error in setting up the request
        console.error('Request error:', error.message);
      }
      
      return Promise.reject(error);
    }
  );

  return instance;
};

// Create and export the axios instance
export const httpClient = createAxiosInstance();

/**
 * Generic API request function with typed response
 */
export async function apiRequest<T = any>(
  config: AxiosRequestConfig
): Promise<T> {
  try {
    const response: AxiosResponse<T> = await httpClient(config);
    return response.data;
  } catch (error) {
    throw error;
  }
}

/**
 * Convenience methods for common HTTP operations
 */
export const api = {
  get: <T = any>(url: string, config?: AxiosRequestConfig) => 
    apiRequest<T>({ ...config, method: 'GET', url }),
  
  post: <T = any>(url: string, data?: any, config?: AxiosRequestConfig) => 
    apiRequest<T>({ ...config, method: 'POST', url, data }),
  
  put: <T = any>(url: string, data?: any, config?: AxiosRequestConfig) => 
    apiRequest<T>({ ...config, method: 'PUT', url, data }),
  
  patch: <T = any>(url: string, data?: any, config?: AxiosRequestConfig) => 
    apiRequest<T>({ ...config, method: 'PATCH', url, data }),
  
  delete: <T = any>(url: string, config?: AxiosRequestConfig) => 
    apiRequest<T>({ ...config, method: 'DELETE', url }),
};