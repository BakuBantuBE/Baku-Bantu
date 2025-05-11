// src/components/ui/FileInput.tsx
import { useState, useRef, forwardRef, InputHTMLAttributes, ReactNode } from 'react';
import Image from 'next/image';

// Helper function that will always return a string
const cn = (...classes: (string | boolean | undefined)[]) => {
  return classes.filter(cls => typeof cls === 'string' && cls).join(' ');
};

export interface FileInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  showPreview?: boolean;
  previewUrl?: string | null;
  onFileChange?: (file: File | null) => void;
  buttonLabel?: string;
  buttonIcon?: ReactNode;
  clearButtonLabel?: string;
  acceptedFileTypes?: string;
  maxSizeMB?: number;
  className?: string;
}

const FileInput = forwardRef<HTMLInputElement, FileInputProps>(
  ({
    label,
    error,
    helperText,
    showPreview = true,
    previewUrl,
    onFileChange,
    buttonLabel = 'Pilih File',
    buttonIcon,
    clearButtonLabel = 'Hapus',
    acceptedFileTypes = 'image/jpeg,image/png,image/jpg',
    maxSizeMB = 2,
    className,
    ...props
  }, ref) => {
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [localPreviewUrl, setLocalPreviewUrl] = useState<string | null>(previewUrl || null);
    
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0] || null;
      if (file) {
        // Validasi ukuran file
        if (file.size > maxSizeMB * 1024 * 1024) {
          if (onFileChange) onFileChange(null);
          return;
        }
        
        // Validasi tipe file
        if (acceptedFileTypes && !acceptedFileTypes.split(',').includes(file.type)) {
          if (onFileChange) onFileChange(null);
          return;
        }
        
        // Create preview URL
        const reader = new FileReader();
        reader.onloadend = () => {
          setLocalPreviewUrl(reader.result as string);
        };
        reader.readAsDataURL(file);
        
        if (onFileChange) onFileChange(file);
      }
    };
    
    const handleButtonClick = () => {
      fileInputRef.current?.click();
    };
    
    const handleClearFile = () => {
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      setLocalPreviewUrl(null);
      if (onFileChange) onFileChange(null);
    };
    
    return (
      <div className={cn("w-full", className || "")}>
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            {label}
          </label>
        )}
        
        {showPreview && localPreviewUrl && (
          <div className="mb-4 relative">
            <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-2 border-gray-200">
              <Image
                src={localPreviewUrl}
                alt="File preview"
                fill
                className="object-cover"
              />
            </div>
            <button
              type="button"
              onClick={handleClearFile}
              className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 shadow-sm hover:bg-red-600 transition-colors"
              aria-label={clearButtonLabel}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        )}
        
        <div className="flex items-center">
          <input
            type="file"
            ref={(input) => {
              if (typeof ref === 'function') {
                ref(input);
              } else if (ref) {
                ref.current = input;
              }
              fileInputRef.current = input;
            }}
            className="hidden"
            onChange={handleFileChange}
            accept={acceptedFileTypes}
            {...props}
          />
          
          <button
            type="button"
            onClick={handleButtonClick}
            className={cn(
              "flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium",
              "bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-babyBlue",
              localPreviewUrl ? "flex-1" : "w-full"
            )}
          >
            {buttonIcon && <span className="mr-2">{buttonIcon}</span>}
            {localPreviewUrl ? 'Ganti File' : buttonLabel}
          </button>
          
          {localPreviewUrl && (
            <button
              type="button"
              onClick={handleClearFile}
              className="ml-2 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
            >
              {clearButtonLabel}
            </button>
          )}
        </div>
        
        {error && (
          <p className="mt-1.5 text-sm text-red-500 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {error}
          </p>
        )}
        
        {helperText && !error && (
          <p className="mt-1.5 text-xs text-gray-500">{helperText}</p>
        )}
      </div>
    );
  }
);

FileInput.displayName = 'FileInput';

export { FileInput };