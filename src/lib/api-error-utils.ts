// src/lib/api-error-utils.ts
import { AxiosError } from 'axios';

export interface ApiErrorResponse {
  message: string;
  errors?: Record<string, string>;
  status?: number;
}

/**
 * Extract error information from an API error
 * @param error The error from the API call
 * @returns Formatted error information
 */
export function extractApiError(error: unknown): ApiErrorResponse {
  // Default error response
  const defaultError: ApiErrorResponse = {
    message: 'An unexpected error occurred. Please try again.',
    status: 500
  };

  // If not an error object, return default
  if (!error) {
    return defaultError;
  }

  // Handle Axios errors
  if (error instanceof AxiosError) {
    // If we have a response with data
    if (error.response?.data) {
      const { message, errors } = error.response.data as any;
      return {
        message: message || error.message || defaultError.message,
        errors: errors || {},
        status: error.response.status
      };
    }
    
    // If we have a message but no response (like network error)
    if (error.message) {
      if (error.message.includes('Network Error')) {
        return {
          message: 'Unable to connect to the server. Please check your internet connection.',
          status: 0 // 0 means network error
        };
      }
      
      return {
        message: error.message,
        status: error.response?.status || 500
      };
    }
  }
  
  // Handle regular Error objects
  if (error instanceof Error) {
    return {
      message: error.message || defaultError.message,
      status: 500
    };
  }
  
  // If it's a string
  if (typeof error === 'string') {
    return {
      message: error,
      status: 500
    };
  }
  
  // Default fallback
  return defaultError;
}

/**
 * Convert validation errors object to a user-friendly error message
 * @param errors Validation errors object
 * @returns Formatted error message
 */
export function formatValidationErrors(errors?: Record<string, string>): string {
  if (!errors || Object.keys(errors).length === 0) {
    return '';
  }
  
  return Object.values(errors).join(', ');
}

/**
 * Handle API errors with a consistent approach
 * @param error The error from API call
 * @param toast Toast function for showing error messages
 * @param callback Optional callback for custom error handling
 */
export function handleApiError(
  error: unknown, 
  toast: { error: (message: string, title?: string) => void },
  callback?: (formattedError: ApiErrorResponse) => void
): ApiErrorResponse {
  const formattedError = extractApiError(error);
  
  // Show error toast
  toast.error(
    formattedError.errors ? formatValidationErrors(formattedError.errors) : formattedError.message,
    'Error'
  );
  
  // Execute callback if provided
  if (callback) {
    callback(formattedError);
  }
  
  return formattedError;
}