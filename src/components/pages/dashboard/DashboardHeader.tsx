// src/components/pages/dashboard/DashboardHeader.tsx
"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { User } from '@/services/auth';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

interface DashboardHeaderProps {
  user: User | null;
  toggleSidebar: () => void;
  sidebarOpen: boolean;
}

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ 
  user, 
  toggleSidebar,
  sidebarOpen 
}) => {
  const { logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  
  // Mock notifications - in a real app, these would come from an API
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'Panti Asuhan Baru',
      message: 'Panti Asuhan Kasih Sayang telah ditambahkan',
      time: '10 menit yang lalu',
      read: false
    },
    {
      id: '2',
      title: 'Relawan Baru',
      message: 'Siti Rahayu telah mendaftar sebagai relawan',
      time: '1 jam yang lalu',
      read: false
    },
    {
      id: '3',
      title: 'Pengumuman Sistem',
      message: 'Pembaruan sistem akan dilakukan pada 20 April 2025',
      time: '1 hari yang lalu',
      read: true
    }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const getPageTitle = () => {
    if (pathname === '/dashboard') return 'Dashboard';
    if (pathname?.includes('/dashboard/orphanages')) return 'Panti Asuhan';
    if (pathname?.includes('/dashboard/volunteers')) return 'Relawan';
    if (pathname?.includes('/dashboard/blog')) return 'Blog';
    if (pathname?.includes('/dashboard/programs')) return 'Program';
    if (pathname?.includes('/dashboard/regions')) return 'Wilayah';
    if (pathname?.includes('/dashboard/admins')) return 'Admin';
    return 'Dashboard';
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
      <div className="px-4 sm:px-6">
        <div className="flex justify-between items-center h-16">
          {/* Left side - Logo and toggle button */}
          <div className="flex items-center">
            <button
              onClick={toggleSidebar}
              className="text-gray-500 focus:outline-none focus:ring-2 focus:ring-babyBlue-dark focus:ring-offset-2 rounded-md"
            >
              {sidebarOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
            
            <div className="hidden md:flex items-center ml-4">
              <Link href="/dashboard" className="flex items-center">
                <h1 className="text-xl font-medium text-gray-900">
                  baku<span className="font-bold text-babyBlue-dark">bantu</span>
                </h1>
              </Link>
            </div>
            
            <div className="md:hidden ml-4">
              <h1 className="text-lg font-medium text-gray-800">
                {getPageTitle()}
              </h1>
            </div>
          </div>

          {/* Desktop view - Page title (only on desktop) */}
          <div className="hidden md:flex items-center">
            <h1 className="text-xl font-medium text-gray-800">
              {getPageTitle()}
            </h1>
          </div>

          {/* Right side - Notification and User menu */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <div className="relative">
              <button
                type="button"
                className="p-1.5 rounded-full text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-babyBlue"
                onClick={() => {
                  setIsNotificationOpen(!isNotificationOpen);
                  if (isProfileOpen) setIsProfileOpen(false);
                }}
              >
                <span className="sr-only">View notifications</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                {unreadCount > 0 && (
                  <span className="absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notifications Dropdown */}
              {isNotificationOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg z-10 border border-gray-200 max-h-96 overflow-y-auto">
                  <div className="p-3 border-b border-gray-200 flex justify-between items-center">
                    <h3 className="font-medium text-gray-800">Notifikasi</h3>
                    <button
                      onClick={markAllAsRead}
                      className="text-xs text-babyBlue hover:text-babyBlue-dark"
                    >
                      Tandai semua dibaca
                    </button>
                  </div>
                  <div className="divide-y divide-gray-200">
                    {notifications.length > 0 ? (
                      notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`p-3 hover:bg-gray-50 ${!notification.read ? 'bg-blue-50' : ''}`}
                        >
                          <div className="flex">
                            <div className="flex-shrink-0 mr-3">
                              <div className={`h-8 w-8 rounded-full flex items-center justify-center ${!notification.read ? 'bg-babyBlue-light text-babyBlue-dark' : 'bg-gray-100 text-gray-600'}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                  <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                                </svg>
                              </div>
                            </div>
                            <div className="flex-1 overflow-hidden">
                              <p className="text-sm font-medium text-gray-800 truncate">
                                {notification.title}
                              </p>
                              <p className="text-xs text-gray-600 truncate mt-1">
                                {notification.message}
                              </p>
                              <p className="text-xs text-gray-500 mt-1">
                                {notification.time}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="p-6 text-center">
                        <p className="text-gray-500">Tidak ada notifikasi</p>
                      </div>
                    )}
                  </div>
                  <div className="p-2 border-t border-gray-200">
                    <button className="w-full py-2 text-xs text-gray-600 hover:text-babyBlue-dark hover:bg-gray-50 rounded-md">
                      Lihat semua notifikasi
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Profile Dropdown */}
            <div className="relative">
              <div className="flex items-center">
                <button
                  type="button"
                  className="flex items-center space-x-3 text-gray-700 hover:text-gray-900 focus:outline-none"
                  onClick={() => {
                    setIsProfileOpen(!isProfileOpen);
                    if (isNotificationOpen) setIsNotificationOpen(false);
                  }}
                >
                  <div className="hidden md:flex md:flex-col md:items-end">
                    <span className="text-sm font-medium">{user?.username || 'Admin'}</span>
                    <span className="text-xs text-gray-500">{user?.role || 'ADMIN'}</span>
                  </div>
                  <div className="h-8 w-8 rounded-full bg-babyBlue-light flex items-center justify-center text-babyBlue-dark font-medium">
                    {user?.username?.charAt(0) || 'A'}
                  </div>
                </button>
              </div>

              {/* Dropdown Menu */}
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200">
                  <div className="px-4 py-3 border-b border-gray-200">
                    <p className="text-sm font-medium text-gray-800">{user?.username || 'Admin'}</p>
                    <p className="text-xs text-gray-500 truncate mt-1">{user?.email || 'admin@bakubantu.id'}</p>
                    <Badge 
                      variant="primary"
                      className="mt-2 text-xs"
                    >
                      {user?.role || 'ADMIN'}
                    </Badge>
                  </div>
                  <Link 
                    href="/dashboard/profile" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    Profil Saya
                  </Link>
                  <Link 
                    href="/dashboard/settings" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    Pengaturan
                  </Link>
                  <div className="border-t border-gray-200"></div>
                  <button
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    onClick={handleLogout}
                  >
                    Keluar
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;