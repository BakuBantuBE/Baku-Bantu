// src/components/pages/dashboard/DashboardActivity.tsx
import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

export interface ActivityItem {
  id: string;
  title: string;
  description?: string;
  icon?: ReactNode;
  iconColor?: string;
  iconBgColor?: string;
  timestamp: string;
  user?: {
    name: string;
    avatar?: string;
  };
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface DashboardActivityProps {
  activities: ActivityItem[];
  title?: string;
  emptyMessage?: string;
  className?: string;
  viewAllLink?: string;
}

const DashboardActivity: React.FC<DashboardActivityProps> = ({
  activities,
  title = 'Aktivitas Terbaru',
  emptyMessage = 'Belum ada aktivitas terbaru',
  className,
  viewAllLink,
}) => {
  if (activities.length === 0) {
    return (
      <div className={cn("bg-white rounded-lg shadow-sm border border-gray-100 p-6", className)}>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
        <div className="py-12 text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="mt-4 text-gray-500">{emptyMessage}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("bg-white rounded-lg shadow-sm border border-gray-100", className)}>
      <div className="px-6 py-4 border-b border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      </div>
      <div className="divide-y divide-gray-100">
        {activities.map((activity) => (
          <div key={activity.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
            <div className="flex items-start">
              {activity.icon && (
                <div className={cn("rounded-full p-2 mr-4", activity.iconBgColor || "bg-babyBlue-light")}>
                  <div className={cn("h-5 w-5", activity.iconColor || "text-babyBlue-dark")}>
                    {activity.icon}
                  </div>
                </div>
              )}
              <div className="flex-1">
                <p className="text-gray-800 font-medium">
                  {activity.title}
                </p>
                {activity.description && (
                  <p className="text-gray-600 text-sm mt-1">
                    {activity.description}
                  </p>
                )}
                <div className="flex items-center mt-2 text-xs text-gray-500">
                  {activity.user && (
                    <>
                      <span>{activity.user.name}</span>
                      <span className="mx-2">•</span>
                    </>
                  )}
                  <span>{activity.timestamp}</span>
                </div>
              </div>
              {activity.action && (
                <Button variant="ghost" size="sm" onClick={activity.action.onClick}>
                  {activity.action.label}
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
      {viewAllLink && (
        <div className="px-6 py-3 border-t border-gray-100 text-center">
          <Button variant="link" onClick={() => window.location.href = viewAllLink}>
            Lihat semua aktivitas
          </Button>
        </div>
      )}
    </div>
  );
};

export default DashboardActivity;