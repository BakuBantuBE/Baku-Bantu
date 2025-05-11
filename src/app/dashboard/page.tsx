// src/app/dashboard/page.tsx
"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { DashboardStats, DashboardSection, DashboardActivity, DashboardTable } from '@/components/pages/dashboard';
import { Button } from '@/components/ui/Button';
import { isAuthenticated, getUser } from '@/services/auth';

// Types for dashboard items
interface DashboardStat {
  title: string;
  value: number;
  icon: React.ReactNode;
  change: string;
  direction: 'up' | 'down' | 'neutral';
  label?: string;
}

interface RecentActivity {
  id: string;
  title: string;
  description: string;
  user: {
    name: string;
    avatar?: string;
  };
  timestamp: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);
  
  // Mock statistics data - in a real app, this would come from an API
  const [stats, setStats] = useState<DashboardStat[]>([
    {
      title: 'Total Panti Asuhan',
      value: 42,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
          <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
        </svg>
      ),
      change: '+12%',
      direction: 'up',
      label: 'dari bulan lalu'
    },
    {
      title: 'Relawan Aktif',
      value: 156,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
          <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
        </svg>
      ),
      change: '+7%',
      direction: 'up',
      label: 'dari bulan lalu'
    },
    {
      title: 'Program Aktif',
      value: 24,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
          <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
        </svg>
      ),
      change: '+20%',
      direction: 'up',
      label: 'dari bulan lalu'
    },
    {
      title: 'Blog Posts',
      value: 87,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z" clipRule="evenodd" />
          <path d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V7z" />
        </svg>
      ),
      change: '+5%',
      direction: 'up',
      label: 'dari bulan lalu'
    }
  ]);

  // Mock recent activities - in a real app, these would come from an API
  const [recentActivities, setRecentActivities] = useState<RecentActivity[]>([
    {
      id: '1',
      title: 'Menambahkan panti asuhan baru',
      description: 'Panti Asuhan Kasih Sayang telah ditambahkan ke database',
      user: {
        name: 'Ahmad Fauzi',
        avatar: '/images/avatars/ahmad.jpg'
      },
      timestamp: '2 jam yang lalu'
    },
    {
      id: '2',
      title: 'Memperbarui program',
      description: 'Program Bantuan Pendidikan 2025 telah diperbarui dengan target baru',
      user: {
        name: 'Siti Rahayu',
        avatar: '/images/avatars/siti.jpg'
      },
      timestamp: '5 jam yang lalu'
    },
    {
      id: '3',
      title: 'Mendaftarkan relawan',
      description: 'Budi Santoso telah ditambahkan sebagai relawan medis',
      user: {
        name: 'Admin User',
        avatar: '/images/avatars/admin.jpg'
      },
      timestamp: '1 hari yang lalu'
    },
    {
      id: '4',
      title: 'Mempublikasikan artikel blog',
      description: 'Artikel "Pentingnya Pendidikan untuk Anak Panti" telah dipublikasikan',
      user: {
        name: 'Dewi Lestari',
        avatar: '/images/avatars/dewi.jpg'
      },
      timestamp: '1 hari yang lalu'
    },
    {
      id: '5',
      title: 'Menambahkan wilayah baru',
      description: 'Wilayah Kalimantan Timur telah ditambahkan ke dalam sistem',
      user: {
        name: 'Rudi Hartono',
        avatar: '/images/avatars/rudi.jpg'
      },
      timestamp: '2 hari yang lalu'
    }
  ]);

  // Mock upcoming events - in a real app, these would come from an API
  const [upcomingEvents, setUpcomingEvents] = useState([
    {
      id: '1',
      name: 'Sehari bersama Anak-anak Luar Biasa',
      date: '2025-04-20',
      location: 'Panti Asuhan Kasih Sayang, Jakarta',
      status: 'upcoming'
    },
    {
      id: '2',
      name: 'Seminar: Merawat Anak-anak dengan Autisme',
      date: '2025-04-25',
      location: 'Hotel Grand Melia, Jakarta',
      status: 'upcoming'
    },
    {
      id: '3',
      name: 'Donor Darah Bersama',
      date: '2025-05-01',
      location: 'Mal Central Park, Jakarta',
      status: 'upcoming'
    }
  ]);

  useEffect(() => {
    // Get user data on component mount
    const userData = getUser();
    setUser(userData);
  }, []);

  // Format date for display
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  // Convert the activities to the format needed by DashboardActivity
  const activityItems = recentActivities.map(activity => ({
    id: activity.id,
    title: activity.title,
    description: activity.description,
    timestamp: activity.timestamp,
    user: activity.user,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
      </svg>
    ),
    iconColor: 'text-babyBlue-dark',
    iconBgColor: 'bg-babyBlue-light/30',
    action: {
      label: 'Lihat',
      onClick: () => console.log(`View activity ${activity.id}`)
    }
  }));

  // Convert stats for DashboardStats component
  const statsItems = stats.map(stat => ({
    title: stat.title,
    value: stat.value,
    icon: stat.icon,
    iconColor: 'text-babyBlue-dark',
    iconBgColor: 'bg-babyBlue-light/30',
    change: {
      value: stat.change,
      direction: stat.direction,
      label: stat.label
    }
  }));

  return (
    <div className="space-y-6">
      {/* Welcome header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">
            Selamat datang kembali, {user?.username || 'Admin'}!
          </p>
        </div>
        <div className="flex space-x-2 w-full md:w-auto">
          <Button 
            variant="outline" 
            leftIcon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            }
            className="flex-1 md:flex-initial"
          >
            Tambah Data
          </Button>
          <Button 
            variant="primary" 
            leftIcon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            }
            className="flex-1 md:flex-initial"
          >
            Refresh Data
          </Button>
        </div>
      </div>

      {/* Stats overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {statsItems.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 transition-all hover:shadow-md">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
              </div>
              <div className={stat.iconBgColor + " rounded-full p-3"}>
                <div className={stat.iconColor + " h-6 w-6"}>{stat.icon}</div>
              </div>
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
                
                {stat.change.label && <span className="text-gray-500 text-sm ml-2">{stat.change.label}</span>}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Activities column */}
        <div className="col-span-1 lg:col-span-2 space-y-6">
          {/* Recent Activities */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100">
            <div className="px-6 py-4 border-b border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900">Aktivitas Terbaru</h3>
            </div>
            <div className="divide-y divide-gray-100">
              {activityItems.slice(0, 4).map((activity) => (
                <div key={activity.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start">
                    <div className={activity.iconBgColor + " rounded-full p-2 mr-4"}>
                      <div className={activity.iconColor + " h-5 w-5"}>
                        {activity.icon}
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-800 font-medium">
                        {activity.title}
                      </p>
                      <p className="text-gray-600 text-sm mt-1">
                        {activity.description}
                      </p>
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
                    <Button variant="ghost" size="sm" onClick={activity.action.onClick}>
                      {activity.action.label}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <div className="px-6 py-3 border-t border-gray-100 text-center">
              <Button variant="link">
                Lihat semua aktivitas
              </Button>
            </div>
          </div>
          
          {/* Upcoming Events */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Acara Mendatang</h3>
                <p className="text-sm text-gray-500 mt-1">Jadwal acara yang akan datang dalam beberapa hari ke depan</p>
              </div>
              <Button
                variant="outline"
                size="sm"
              >
                Lihat Semua
              </Button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Nama Acara
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tanggal
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Lokasi
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {upcomingEvents.map((event) => (
                    <tr key={event.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {event.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(event.date)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {event.location}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                          Akan Datang
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          leftIcon={
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                              <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                            </svg>
                          }
                        >
                          Detail
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        
        {/* Right sidebar column */}
        <div className="col-span-1 space-y-6">
          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100">
            <div className="px-6 py-4 border-b border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900">Aksi Cepat</h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 gap-3">
                <Button 
                  variant="primary" 
                  leftIcon={
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                    </svg>
                  }
                >
                  Tambah Panti Asuhan
                </Button>
                <Button 
                  variant="secondary" 
                  leftIcon={
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                    </svg>
                  }
                >
                  Tambah Relawan
                </Button>
                <Button 
                  variant="accent" 
                  leftIcon={
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z" clipRule="evenodd" />
                      <path d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V7z" />
                    </svg>
                  }
                >
                  Tambah Artikel
                </Button>
                <Button 
                  variant="outline" 
                  leftIcon={
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
                    </svg>
                  }
                >
                  Tambah Program
                </Button>
              </div>
            </div>
          </div>
          
          {/* Recent Reports */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100">
            <div className="px-6 py-4 border-b border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900">Laporan Terakhir</h3>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center p-3 bg-gray-50 rounded-md">
                <div className="mr-4 rounded-full bg-lavender-light p-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-lavender-dark" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm2 10a1 1 0 10-2 0v3a1 1 0 102 0v-3zm2-3a1 1 0 011 1v5a1 1 0 11-2 0v-5a1 1 0 011-1zm4-1a1 1 0 10-2 0v6a1 1 0 102 0V8z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-gray-800">Laporan Keuangan</h3>
                  <p className="text-xs text-gray-500">April 2025</p>
                </div>
                <Button variant="ghost" size="sm">
                  Lihat
                </Button>
              </div>
              
              <div className="flex items-center p-3 bg-gray-50 rounded-md">
                <div className="mr-4 rounded-full bg-babyBlue-light p-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-babyBlue-dark" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
                    <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-gray-800">Statistik Relawan</h3>
                  <p className="text-xs text-gray-500">Triwulan 1 2025</p>
                </div>
                <Button variant="ghost" size="sm">
                  Lihat
                </Button>
              </div>
              
              <div className="flex items-center p-3 bg-gray-50 rounded-md">
                <div className="mr-4 rounded-full bg-mango-light p-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-mango-dark" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zm6-4a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zm6-3a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-gray-800">Perkembangan Program</h3>
                  <p className="text-xs text-gray-500">Q1 2025</p>
                </div>
                <Button variant="ghost" size="sm">
                  Lihat
                </Button>
              </div>
            </div>
          </div>
          
          {/* Calendar Widget */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100">
            <div className="px-6 py-4 border-b border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900">Kalender</h3>
            </div>
            <div className="p-6">
              <div className="text-center text-gray-500 text-sm mb-2">April 2025</div>
              <div className="grid grid-cols-7 gap-1 mb-2">
                {['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'].map((day, i) => (
                  <div key={i} className="text-center text-xs text-gray-500">{day}</div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-1">
                {[...Array(30)].map((_, i) => {
                  const day = i + 1;
                  const isToday = day === 18; // Assuming today is the 18th
                  const hasEvent = [5, 12, 18, 25].includes(day);
                  
                  return (
                    <div
                      key={day}
                      className={`
                        h-8 w-8 flex items-center justify-center text-sm rounded-full mx-auto
                        ${isToday ? 'bg-babyBlue-dark text-white' : hasEvent ? 'border border-babyBlue' : ''}
                        ${hasEvent && !isToday ? 'text-babyBlue-dark' : !isToday ? 'text-gray-700' : ''}
                        hover:bg-gray-100 cursor-pointer transition-colors
                      `}
                    >
                      {day}
                    </div>
                  );
                })}
              </div>
              <div className="mt-4 text-center">
                <Button variant="link" size="sm">Lihat semua acara</Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* System Health Metrics */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-900">Status Sistem</h3>
          <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">Semua Sistem Aktif</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">Penggunaan Ruang Disk</span>
              <span className="text-xs font-medium text-gray-500">42% dari 100GB</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div className="bg-babyBlue h-2.5 rounded-full" style={{ width: '42%' }}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">Penggunaan CPU</span>
              <span className="text-xs font-medium text-gray-500">28% dari 100%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '28%' }}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">Penggunaan Memori</span>
              <span className="text-xs font-medium text-gray-500">65% dari 16GB</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div className="bg-yellow-500 h-2.5 rounded-full" style={{ width: '65%' }}></div>
            </div>
          </div>
        </div>
        <div className="px-6 py-4 border-t border-gray-100 text-center">
          <span className="text-xs text-gray-500">Pembaruan terakhir: 18 April 2025, 10:15 WIB</span>
        </div>
      </div>
    </div>
  );
}