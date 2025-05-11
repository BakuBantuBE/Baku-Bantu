// src/components/pages/dashboard/DashboardStats.tsx
import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export interface StatItem {
  title: string;
  value: string | number;
  icon?: ReactNode;
  iconColor?: string;
  iconBgColor?: string;
  change?: {
    value: string;
    direction: 'up' | 'down' | 'neutral';
    label?: string;
  };
}

interface DashboardStatsProps {
  stats: StatItem[];
  cols?: 1 | 2 | 3 | 4;
  className?: string;
}

const DashboardStats: React.FC<DashboardStatsProps> = ({
  stats,
  cols = 4,
  className,
}) => {
  const getColClass = () => {
    switch (cols) {
      case 1:
        return 'grid-cols-1';
      case 2:
        return 'grid-cols-1 md:grid-cols-2';
      case 3:
        return 'grid-cols-1 md:grid-cols-3';
      case 4:
      default:
        return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4';
    }
  };

  return (
    <div className={cn(`grid ${getColClass()} gap-4 md:gap-6`, className)}>
      {stats.map((stat, index) => (
        <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 transition-all hover:shadow-md">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">{stat.title}</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
            </div>
            {stat.icon && (
              <div className={cn("rounded-full p-3", stat.iconBgColor || "bg-babyBlue-light/30")}>
                <div className={cn("h-6 w-6", stat.iconColor || "text-babyBlue-dark")}>
                  {stat.icon}
                </div>
              </div>
            )}
          </div>
          
          {stat.change && (
            <div className="mt-4 flex items-center">
              {stat.change.direction === 'up' && (
                <span className="text-green-500 flex items-center text-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                  </svg>
                  {stat.change.value}
                </span>
              )}
              
              {stat.change.direction === 'down' && (
                <span className="text-red-500 flex items-center text-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12 13a1 1 0 100 2h5a1 1 0 001-1V9a1 1 0 10-2 0v2.586l-4.293-4.293a1 1 0 00-1.414 0L8 9.586 3.707 5.293a1 1 0 00-1.414 1.414l5 5a1 1 0 001.414 0L11 9.414 14.586 13H12z" clipRule="evenodd" />
                  </svg>
                  {stat.change.value}
                </span>
              )}
              
              {stat.change.direction === 'neutral' && (
                <span className="text-gray-500 flex items-center text-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                  {stat.change.value}
                </span>
              )}
              
              {stat.change.label && <span className="text-gray-500 text-sm ml-2">{stat.change.label}</span>}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;