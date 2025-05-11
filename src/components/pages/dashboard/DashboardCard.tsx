// src/components/pages/dashboard/DashboardCard.tsx
import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface DashboardCardProps {
  title?: string;
  subtitle?: string;
  icon?: ReactNode;
  iconColor?: string;
  iconBgColor?: string;
  value?: string | number;
  trend?: {
    value: string;
    direction: 'up' | 'down' | 'neutral';
    label?: string;
  };
  className?: string;
  children?: ReactNode;
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  subtitle,
  icon,
  iconColor = 'text-primary-dark',
  iconBgColor = 'bg-primary-light/30',
  value,
  trend,
  className,
  children,
}) => {
  return (
    <div className={cn("bg-white rounded-lg shadow-sm border border-gray-100 p-6 transition-all hover:shadow-md", className)}>
      {(title || icon) && (
        <div className="flex justify-between items-start mb-4">
          {title && (
            <div>
              <p className="text-sm font-medium text-gray-500">{title}</p>
              {subtitle && <p className="text-xs text-gray-400 mt-0.5">{subtitle}</p>}
            </div>
          )}
          {icon && (
            <div className={cn("rounded-full p-3", iconBgColor)}>
              <div className={cn("h-6 w-6", iconColor)}>{icon}</div>
            </div>
          )}
        </div>
      )}
      
      {value && (
        <div className="mb-4">
          <p className="text-3xl font-bold text-gray-900">{value}</p>
          
          {trend && (
            <div className="mt-2 flex items-center">
              {trend.direction === 'up' && (
                <span className="text-green-500 flex items-center text-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                  </svg>
                  {trend.value}
                </span>
              )}
              
              {trend.direction === 'down' && (
                <span className="text-red-500 flex items-center text-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12 13a1 1 0 100 2h5a1 1 0 001-1V9a1 1 0 10-2 0v2.586l-4.293-4.293a1 1 0 00-1.414 0L8 9.586 3.707 5.293a1 1 0 00-1.414 1.414l5 5a1 1 0 001.414 0L11 9.414 14.586 13H12z" clipRule="evenodd" />
                  </svg>
                  {trend.value}
                </span>
              )}
              
              {trend.direction === 'neutral' && (
                <span className="text-gray-500 flex items-center text-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                  {trend.value}
                </span>
              )}
              
              {trend.label && <span className="text-gray-500 text-sm ml-2">{trend.label}</span>}
            </div>
          )}
        </div>
      )}
      
      {children}
    </div>
  );
};

export default DashboardCard;