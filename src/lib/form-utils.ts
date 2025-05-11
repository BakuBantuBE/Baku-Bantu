// src/lib/form-utils.ts
/**
 * Convert an object to FormData
 * @param data Object with form data
 * @returns FormData object
 */
export function objectToFormData(data: Record<string, any>): FormData {
    const formData = new FormData();
    
    Object.entries(data).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        // Handle File objects
        if (value && typeof value === 'object' && 'name' in value && 'size' in value && 'type' in value) {
          // This is a safer check for a File object
          formData.append(key, value as File);
        } 
        // Handle arrays
        else if (Array.isArray(value)) {
          value.forEach((item, index) => {
            formData.append(`${key}[${index}]`, item);
          });
        } 
        // Handle Date objects
        else if (value && typeof value === 'object' && value.constructor === Date) {
          formData.append(key, value.toISOString());
        } 
        // Handle objects (convert to JSON string)
        else if (value && typeof value === 'object') {
          formData.append(key, JSON.stringify(value));
        } 
        // Handle other primitive types
        else {
          formData.append(key, String(value));
        }
      }
    });
    
    return formData;
  }
  
  /**
   * Extract specific fields from a form data object
   * @param data Source object
   * @param fields Array of field names to extract
   * @returns New object with only the specified fields
   */
  export function extractFormFields<T extends object>(data: T, fields: (keyof T)[]): Partial<T> {
    return fields.reduce((result, field) => {
      if (field in data) {
        result[field] = data[field];
      }
      return result;
    }, {} as Partial<T>);
  }
  
  /**
   * Check if a form has been modified compared to its original values
   * @param original Original form data
   * @param current Current form data
   * @returns Boolean indicating if the form has been modified
   */
  export function isFormModified<T extends Record<string, any>>(
    original: T, 
    current: T
  ): boolean {
    const keys = Object.keys(current) as (keyof T)[];
    
    return keys.some(key => {
      // Skip File objects, they are always considered modified
      if (current[key] && typeof current[key] === 'object' && 
          'name' in current[key] && 'size' in current[key] && 'type' in current[key]) {
        return true;
      }
      
      // For arrays, check if they are different
      if (Array.isArray(current[key]) && Array.isArray(original[key])) {
        if (current[key].length !== original[key].length) {
          return true;
        }
        
        return current[key].some((item: any, index: number) => item !== original[key][index]);
      }
      
      // For dates, convert to ISO string before comparison
      if (current[key] && typeof current[key] === 'object' && current[key].constructor === Date &&
          original[key] && typeof original[key] === 'object' && original[key].constructor === Date) {
        return (current[key] as Date).toISOString() !== (original[key] as Date).toISOString();
      }
      
      // For objects, stringify them for comparison
      if (
        current[key] && typeof current[key] === 'object' && current[key] !== null && 
        original[key] && typeof original[key] === 'object' && original[key] !== null
      ) {
        return JSON.stringify(current[key]) !== JSON.stringify(original[key]);
      }
      
      // For primitive types, just compare
      return current[key] !== original[key];
    });
  }
  
  /**
   * Reset form data to its original values
   * @param originalData Original form data
   * @param setFormData State setter function
   */
  export function resetForm<T>(
    originalData: T, 
    setFormData: (data: T) => void
  ): void {
    setFormData({ ...originalData });
  }