// src/lib/date-utils.ts

/**
 * Format a date string to a human-readable format
 * @param dateString Date string in ISO format
 * @param options Intl.DateTimeFormatOptions
 * @returns Formatted date string
 */
export function formatDate(
    dateString: string,
    options: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    }
  ): string {
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat('id-ID', options).format(date);
    } catch (error) {
      console.error('Error formatting date:', error);
      return dateString || '-';
    }
  }
  
  /**
   * Format a date string to a time string
   * @param dateString Date string in ISO format
   * @returns Formatted time string
   */
  export function formatTime(dateString: string): string {
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat('id-ID', {
        hour: '2-digit',
        minute: '2-digit',
      }).format(date);
    } catch (error) {
      console.error('Error formatting time:', error);
      return '-';
    }
  }
  
  /**
   * Format a date string to include both date and time
   * @param dateString Date string in ISO format
   * @returns Formatted date and time string
   */
  export function formatDateTime(dateString: string): string {
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat('id-ID', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }).format(date);
    } catch (error) {
      console.error('Error formatting date and time:', error);
      return dateString || '-';
    }
  }
  
  /**
   * Get a relative time string (e.g., "2 hours ago")
   * @param dateString Date string in ISO format
   * @returns Relative time string
   */
  export function getRelativeTime(dateString: string): string {
    try {
      const date = new Date(dateString);
      const now = new Date();
      
      const rtf = new Intl.RelativeTimeFormat('id-ID', { numeric: 'auto' });
      const diffInSeconds = Math.floor((date.getTime() - now.getTime()) / 1000);
      
      if (Math.abs(diffInSeconds) < 60) {
        return rtf.format(diffInSeconds, 'second');
      }
      
      const diffInMinutes = Math.floor(diffInSeconds / 60);
      if (Math.abs(diffInMinutes) < 60) {
        return rtf.format(diffInMinutes, 'minute');
      }
      
      const diffInHours = Math.floor(diffInMinutes / 60);
      if (Math.abs(diffInHours) < 24) {
        return rtf.format(diffInHours, 'hour');
      }
      
      const diffInDays = Math.floor(diffInHours / 24);
      if (Math.abs(diffInDays) < 30) {
        return rtf.format(diffInDays, 'day');
      }
      
      const diffInMonths = Math.floor(diffInDays / 30);
      if (Math.abs(diffInMonths) < 12) {
        return rtf.format(diffInMonths, 'month');
      }
      
      const diffInYears = Math.floor(diffInDays / 365);
      return rtf.format(diffInYears, 'year');
    } catch (error) {
      console.error('Error calculating relative time:', error);
      return dateString || '-';
    }
  }