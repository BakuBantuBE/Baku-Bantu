// src/components/pages/dashboard/DashboardFilter.tsx
import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';

export interface FilterOption {
  id: string;
  label: string;
  type: 'select' | 'input' | 'date' | 'checkbox' | 'radio';
  placeholder?: string;
  options?: Array<{ value: string; label: string }>;
  value?: string | number | boolean;
  onChange: (value: string | number | boolean) => void;
}

interface DashboardFilterProps {
  filters: FilterOption[];
  onReset?: () => void;
  onApply?: () => void;
  className?: string;
  compact?: boolean;
  title?: string;
  showTitle?: boolean;
}

const DashboardFilter: React.FC<DashboardFilterProps> = ({
  filters,
  onReset,
  onApply,
  className,
  compact = false,
  title = 'Filter',
  showTitle = true,
}) => {
  return (
    <div className={cn(
      "bg-white rounded-lg shadow-sm border border-gray-100",
      compact ? "p-4" : "p-6",
      className
    )}>
      {showTitle && (
        <div className={cn("flex justify-between items-center", compact ? "mb-3" : "mb-5")}>
          <h3 className={cn("font-medium text-gray-900", compact ? "text-sm" : "text-base")}>
            {title}
          </h3>
          {onReset && (
            <button
              onClick={onReset}
              className="text-xs text-gray-500 hover:text-gray-700"
            >
              Reset
            </button>
          )}
        </div>
      )}
      
      <div className={cn(
        "grid gap-4",
        compact 
          ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" 
          : "grid-cols-1"
      )}>
        {filters.map((filter) => (
          <div key={filter.id} className="space-y-1.5">
            <label
              htmlFor={filter.id}
              className="block text-sm font-medium text-gray-700"
            >
              {filter.label}
            </label>
            
            {filter.type === 'select' && filter.options && (
              <Select
                id={filter.id}
                options={filter.options}
                value={filter.value as string}
                onChange={(e) => filter.onChange(e.target.value)}
                fullWidth
              />
            )}
            
            {filter.type === 'input' && (
              <Input
                id={filter.id}
                type="text"
                placeholder={filter.placeholder}
                value={filter.value as string}
                onChange={(e) => filter.onChange(e.target.value)}
                fullWidth
              />
            )}
            
            {filter.type === 'date' && (
              <Input
                id={filter.id}
                type="date"
                value={filter.value as string}
                onChange={(e) => filter.onChange(e.target.value)}
                fullWidth
              />
            )}
            
            {filter.type === 'checkbox' && (
              <div className="flex items-center h-5 mt-3">
                <input
                  id={filter.id}
                  type="checkbox"
                  checked={filter.value as boolean}
                  onChange={(e) => filter.onChange(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-babyBlue-dark focus:ring-babyBlue transition-colors"
                />
                <label htmlFor={filter.id} className="ml-2 text-sm text-gray-600">
                  {filter.placeholder || filter.label}
                </label>
              </div>
            )}
            
            {filter.type === 'radio' && filter.options && (
              <div className="space-y-2 mt-2">
                {filter.options.map((option) => (
                  <div key={option.value} className="flex items-center">
                    <input
                      id={`${filter.id}-${option.value}`}
                      name={filter.id}
                      type="radio"
                      checked={filter.value === option.value}
                      onChange={() => filter.onChange(option.value)}
                      className="h-4 w-4 border-gray-300 text-babyBlue-dark focus:ring-babyBlue"
                    />
                    <label
                      htmlFor={`${filter.id}-${option.value}`}
                      className="ml-2 text-sm text-gray-600"
                    >
                      {option.label}
                    </label>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      
      {onApply && !compact && (
        <div className="mt-6 flex justify-end">
          {onReset && (
            <Button
              variant="outline"
              onClick={onReset}
              className="mr-2"
            >
              Reset
            </Button>
          )}
          <Button
            variant="primary"
            onClick={onApply}
          >
            Terapkan Filter
          </Button>
        </div>
      )}
    </div>
  );
};

export default DashboardFilter;