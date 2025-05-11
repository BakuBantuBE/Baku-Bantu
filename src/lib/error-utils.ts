// src/lib/error-utils.ts
import { redirect } from 'next/navigation';

/**
 * HTTP Error codes and their descriptions
 */
export const HTTP_ERRORS = {
  400: 'Bad Request',
  401: 'Unauthorized',
  403: 'Forbidden',
  404: 'Not Found',
  500: 'Internal Server Error',
  502: 'Bad Gateway',
  503: 'Service Unavailable',
  504: 'Gateway Timeout',
};

/**
 * Handle error with proper redirection based on error type
 * @param error Any error object
 */
export function handleError(error: unknown): void {
  console.error('Error caught by error-utils:', error);
  
  // If error is a Response (fetch API)
  if (error instanceof Response) {
    if (error.status === 404) {
      redirect('/not-found');
    } else {
      redirect('/error');
    }
  }
  
  // If error has a status code property
  if (typeof error === 'object' && error !== null && 'status' in error) {
    const statusCode = (error as { status: number }).status;
    
    if (statusCode === 404) {
      redirect('/not-found');
    } else {
      redirect('/error');
    }
  }
  
  // For network errors (offline)
  if (error instanceof Error && 
      (error.message.includes('network') || 
       error.message.includes('failed to fetch') || 
       error.message.includes('offline'))) {
    redirect('/offline');
  }
  
  // Default case - generic error page
  redirect('/error');
}

/**
 * Logs error details in development environment
 * @param error Any error object
 * @param context Optional context information
 */
export function logErrorDetails(error: unknown, context: string = 'Unknown'): void {
  if (process.env.NODE_ENV !== 'production') {
    console.group(`Error in ${context}:`);
    console.error(error);
    
    if (error instanceof Error) {
      console.error('Message:', error.message);
      console.error('Stack:', error.stack);
    }
    
    console.groupEnd();
  }
}

/**
 * Check if user is offline
 */
export function isOffline(): boolean {
  return typeof navigator !== 'undefined' && !navigator.onLine;
}