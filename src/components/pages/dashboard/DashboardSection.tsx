// src/components/pages/dashboard/DashboardSection.tsx
import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

interface DashboardSectionProps {
  title: string;
  description?: string;
  className?: string;
  children: ReactNode;
  action?: {
    label: string;
    onClick: () => void;
    variant?: 'primary' | 'secondary' | 'outline';
    icon?: ReactNode;
  };
  collapsible?: boolean;
}

const DashboardSection: React.FC<DashboardSectionProps> = ({
  title,
  description,
  className,
  children,
  action,
  collapsible = false,
}) => {
  const [isCollapsed, setIsCollapsed] = React.useState(false);

  const toggleCollapse = () => {
    if (collapsible) {
      setIsCollapsed(!isCollapsed);
    }
  };

  return (
    <div className={cn("bg-white rounded-lg shadow-sm border border-gray-100 mb-6", className)}>
      <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
        <div>
          <div className="flex items-center">
            <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
            
            {collapsible && (
              <button 
                onClick={toggleCollapse}
                className="ml-2 text-gray-400 hover:text-gray-600"
              >
                {isCollapsed ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
            )}
          </div>
          {description && <p className="text-sm text-gray-500 mt-1">{description}</p>}
        </div>
        
        {action && (
          <Button
            variant={action.variant || 'primary'}
            onClick={action.onClick}
            leftIcon={action.icon}
            size="sm"
          >
            {action.label}
          </Button>
        )}
      </div>
      
      <div className={cn("transition-all duration-300 overflow-hidden", isCollapsed ? "max-h-0" : "max-h-[9999px]")}>
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardSection;