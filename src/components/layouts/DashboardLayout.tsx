// src/components/layouts/DashboardLayout.tsx
"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated, getUser } from '@/services/auth';
import DashboardHeader from '@/components/pages/dashboard/DashboardHeader';
import DashboardSidebar from '@/components/pages/dashboard/DashboardSidebar';
import { Loading } from '@/components/ui/Loading';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    // Check if user is authenticated
    if (!isAuthenticated()) {
      router.push('/login');
    } else {
      const userData = getUser();
      setUser(userData);
      setLoading(false);
    }
  }, [router]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loading size="lg" text="Loading dashboard..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader 
        user={user} 
        toggleSidebar={toggleSidebar} 
        sidebarOpen={sidebarOpen} 
      />
      <div className="flex">
        <DashboardSidebar 
          userRole={user?.role} 
          isOpen={sidebarOpen} 
          toggleSidebar={toggleSidebar} 
        />
        <main className={`flex-1 transition-all duration-300 p-4 md:p-6 ${sidebarOpen ? 'md:ml-64' : 'md:ml-20'}`}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;