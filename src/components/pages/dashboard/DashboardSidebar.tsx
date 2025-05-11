// src/components/pages/dashboard/DashboardSidebar.tsx
"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import Image from 'next/image';

// Navigation item interface
interface NavItem {
  name: string;
  href: string;
  icon: React.ReactNode;
  roles: string[];
  badge?: {
    text: string;
    variant: 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'danger';
  };
}

// Main component props
interface DashboardSidebarProps {
  userRole?: string;
  isOpen: boolean;
  toggleSidebar: () => void;
}

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({ 
  userRole = 'ADMIN',
  isOpen,
  toggleSidebar
}) => {
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);

  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isMobile && isOpen && !target.closest('[data-sidebar]')) {
        toggleSidebar();
      }
    };

    if (isMobile && isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobile, isOpen, toggleSidebar]);

  // Main navigation items
  const mainNavigation: NavItem[] = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
          <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
        </svg>
      ),
      roles: ['ADMIN', 'SUPERADMIN'],
    },
    {
      name: 'Panti Asuhan',
      href: '/dashboard/orphanages',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
        </svg>
      ),
      roles: ['ADMIN', 'SUPERADMIN']
    },
    {
      name: 'Relawan',
      href: '/dashboard/volunteers',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
        </svg>
      ),
      roles: ['ADMIN', 'SUPERADMIN']
    }
  ];

  // Admin-specific navigation items
  const adminNavigation: NavItem[] = [
    {
      name: 'Wilayah',
      href: '/dashboard/regions',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
        </svg>
      ),
      roles: ['SUPERADMIN'],
    },
    {
      name: 'Yayasan',
      href: '/dashboard/foundations',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
        </svg>
      ),
      roles: ['SUPERADMIN'],
    },
    {
      name: 'Admin',
      href: '/dashboard/admins',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
        </svg>
      ),
      roles: ['SUPERADMIN'],
    },
  ];

  // Settings navigation
  const settingsNavigation: NavItem[] = [
    {
      name: 'Pengaturan',
      href: '/dashboard/settings',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
        </svg>
      ),
      roles: ['ADMIN', 'SUPERADMIN'],
    }
  ];

  // Filter navigation items based on user role
  const filteredMainNav = mainNavigation.filter(item => item.roles.includes(userRole));
  const filteredAdminNav = adminNavigation.filter(item => item.roles.includes(userRole));
  const filteredSettingsNav = settingsNavigation.filter(item => item.roles.includes(userRole));

  // Calculate sidebar classes based on state
  const sidebarClasses = cn(
    "fixed h-screen bg-white z-30 border-r border-gray-200 transition-all duration-300 overflow-y-auto",
    isMobile 
      ? isOpen 
        ? "left-0 w-64 shadow-lg" 
        : "-left-64 w-64"
      : isOpen 
        ? "left-0 w-64" 
        : "left-0 w-20"
  );

  // Create backdrop for mobile sidebar
  const backdrop = isMobile && isOpen ? (
    <div 
      className="fixed inset-0 bg-black/30 z-20 transition-opacity duration-300"
      onClick={toggleSidebar}
    />
  ) : null;

  // Navigation link component to reduce repetition
  const NavLink = ({ item }: { item: NavItem }) => {
    const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`);
    
    return (
      <li>
        <Link
          href={item.href}
          className={cn(
            "flex items-center rounded-md px-4 py-3 text-sm font-medium transition-colors relative",
            isActive
              ? "bg-babyBlue-light text-babyBlue-dark"
              : "text-gray-700 hover:bg-gray-100",
            (!isMobile && !isOpen) && "justify-center px-2"
          )}
        >
          <span className={(!isMobile && !isOpen) ? "" : "mr-3"}>{item.icon}</span>
          {(isMobile || isOpen) && <span>{item.name}</span>}
          

        </Link>
      </li>
    );
  };

  return (
    <>
      {backdrop}
      <aside 
        className={sidebarClasses}
        data-sidebar="true"
      >
        {/* Sidebar Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            {(!isMobile || isOpen) && (
              <Link href="/" className="flex items-center">
                <div className="relative h-8 w-8 mr-2">
                  <Image 
                    src="/images/logo_01.png" 
                    alt="bakubantu logo"
                    fill
                    className="object-contain p-1"
                  />
                </div>
                <h2 className="text-xl font-medium text-gray-900">
                  baku<span className="font-bold text-babyBlue-dark">bantu</span>
                </h2>
              </Link>
            )}
            
            {/* Toggle button */}
            {!isMobile ? (
              <button 
                onClick={toggleSidebar} 
                className="rounded-full p-1 hover:bg-gray-100"
                aria-label={isOpen ? "Collapse sidebar" : "Expand sidebar"}
              >
                {isOpen ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                  </svg>
                )}
              </button>
            ) : isOpen && (
              <button 
                onClick={toggleSidebar} 
                className="rounded-full p-1 hover:bg-gray-100"
                aria-label="Close sidebar"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="p-4">
          {/* Main Navigation */}
          <ul className="space-y-2">
            {filteredMainNav.map((item) => (
              <NavLink key={item.name} item={item} />
            ))}
          </ul>
          
          {/* Admin Navigation Section (if user has SUPERADMIN role) */}
          {filteredAdminNav.length > 0 && (
            <>
              <div className="h-px bg-gray-200 mx-2 my-4"></div>
              <div className={(!isMobile && !isOpen) ? "px-2" : "px-4"}>
                {(isMobile || isOpen) && (
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                    Admin
                  </p>
                )}
                <ul className="space-y-2">
                  {filteredAdminNav.map((item) => (
                    <NavLink key={item.name} item={item} />
                  ))}
                </ul>
              </div>
            </>
          )}
          
          {/* Settings Section */}
          <div className="h-px bg-gray-200 mx-2 my-4"></div>
          <div className={(!isMobile && !isOpen) ? "px-2" : "px-4"}>
            <ul className="space-y-2">
              {filteredSettingsNav.map((item) => (
                <NavLink key={item.name} item={item} />
              ))}
            </ul>
          </div>
        </nav>
        
        {/* User section at bottom */}
        {(isOpen || isMobile) && (
          <div className="border-t border-gray-200 p-4 mt-auto">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-babyBlue-light flex items-center justify-center text-babyBlue-dark text-lg font-medium mr-3">
                A
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  Admin User
                </p>
                <p className="text-xs text-gray-500 truncate">
                  admin@bakubantu.id
                </p>
              </div>
            </div>
          </div>
        )}
      </aside>
    </>
  );
};

export default DashboardSidebar;