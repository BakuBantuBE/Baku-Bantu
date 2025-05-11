// src/app/dashboard/layout.tsx
"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated, getUser } from '@/services/auth';
import { DashboardHeader, DashboardSidebar } from '@/components/pages/dashboard';
import { Loading } from '@/components/ui/Loading';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if user is authenticated
    if (!isAuthenticated()) {
      router.push('/login');
    } else {
      const userData = getUser();
      setUser(userData);
      setLoading(false);
    }
    
    // Check if device is mobile
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
      // On larger screens, default to open sidebar
      if (window.innerWidth >= 768) {
        setSidebarOpen(true);
      }
    };
    
    // Initial check
    checkIfMobile();
    
    // Listen for resize events
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
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
        <main 
          className={`
            flex-1 transition-all duration-300 p-4 md:p-6
            ${isMobile 
              ? '' 
              : sidebarOpen 
                ? 'md:ml-64' 
                : 'md:ml-20'
            }
          `}
        >
          {children}
        </main>
      </div>
    </div>
  );
}