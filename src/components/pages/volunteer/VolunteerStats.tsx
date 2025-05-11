// src/components/pages/volunteer/VolunteerStats.tsx
import React, { useMemo } from 'react';
import { DashboardStats, StatItem } from '@/components/pages/dashboard';
import { VolunteerResponse } from '@/services/volunteerService';

interface VolunteerStatsProps {
  volunteers: VolunteerResponse[];
}

const VolunteerStats: React.FC<VolunteerStatsProps> = ({ volunteers }) => {
  const stats = useMemo(() => {
    // Count volunteers by status
    const totalCount = volunteers.length;
    const activeCount = volunteers.filter(v => v.status === 'ACTIVE').length;
    const pendingCount = volunteers.filter(v => v.status === 'PENDING').length;
    const inactiveCount = volunteers.filter(v => v.status === 'INACTIVE').length;
    
    // Count volunteers by gender
    const maleCount = volunteers.filter(v => v.jenisKelamin === 'MALE').length;
    const femaleCount = volunteers.filter(v => v.jenisKelamin === 'FEMALE').length;
    
    // Calculate percentages for visual representation
    const activePercentage = totalCount > 0 ? Math.round((activeCount / totalCount) * 100) : 0;
    const pendingPercentage = totalCount > 0 ? Math.round((pendingCount / totalCount) * 100) : 0;
    
    // Calculate male/female ratio percentage
    const malePercentage = totalCount > 0 ? Math.round((maleCount / totalCount) * 100) : 0;
    const femalePercentage = totalCount > 0 ? Math.round((femaleCount / totalCount) * 100) : 0;

    const statItems: StatItem[] = [
      {
        title: 'Total Relawan',
        value: totalCount,
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        ),
        iconColor: 'text-babyBlue-dark',
        iconBgColor: 'bg-babyBlue-light/30',
      },
      {
        title: 'Relawan Aktif',
        value: `${activeCount} (${activePercentage}%)`,
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        ),
        iconColor: 'text-forest-dark',
        iconBgColor: 'bg-forest-light/30',
        change: {
          value: `${activePercentage}%`,
          direction: 'up',
          label: 'dari total'
        }
      },
      {
        title: 'Relawan Menunggu',
        value: `${pendingCount} (${pendingPercentage}%)`,
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        ),
        iconColor: 'text-mango-dark',
        iconBgColor: 'bg-mango-light/30',
        change: {
          value: `${pendingPercentage}%`,
          direction: pendingPercentage > 30 ? 'down' : 'neutral',
          label: 'dari total'
        }
      },
      {
        title: 'Distribusi Gender',
        value: `${maleCount}/${femaleCount}`,
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        ),
        iconColor: 'text-lavender-dark',
        iconBgColor: 'bg-lavender-light/30',
        change: {
          value: `${malePercentage}/${femalePercentage}`,
          direction: 'neutral',
          label: 'laki/perempuan'
        }
      },
    ];

    return statItems;
  }, [volunteers]);

  return <DashboardStats stats={stats} />;
};

export default VolunteerStats;