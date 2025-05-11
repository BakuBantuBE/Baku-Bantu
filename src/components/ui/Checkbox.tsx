// src/components/ui/Checkbox.tsx
import { InputHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  description?: string;
  error?: string;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, description, error, id, ...props }, ref) => {
    const checkboxId = id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;
    
    return (
      <div className="flex">
        <div className="flex items-center h-5">
          <input
            id={checkboxId}
            ref={ref}
            type="checkbox"
            className={cn(
              "h-4 w-4 rounded border-gray-300 text-babyBlue-dark focus:ring-babyBlue transition-colors",
              error ? "border-red-500 focus:ring-red-500" : "",
              props.disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
              className
            )}
            {...props}
          />
        </div>
        {(label || description) && (
          <div className="ml-2">
            {label && (
              <label 
                htmlFor={checkboxId} 
                className={cn(
                  "block text-sm font-medium",
                  props.disabled ? "text-gray-500" : "text-gray-700",
                  error ? "text-red-500" : ""
                )}
              >
                {label}
              </label>
            )}
            {description && (
              <p className={cn(
                "text-xs",
                props.disabled ? "text-gray-400" : "text-gray-500"
              )}>
                {description}
              </p>
            )}
            {error && (
              <p className="mt-1 text-xs text-red-500">{error}</p>
            )}
          </div>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';

export { Checkbox };