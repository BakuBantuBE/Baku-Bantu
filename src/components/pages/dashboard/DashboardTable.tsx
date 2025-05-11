// src/components/pages/dashboard/DashboardTable.tsx
import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

interface Column<T> {
  header: string;
  accessor: keyof T | ((item: T) => ReactNode);
  className?: string;
}

interface DashboardTableProps<T> {
  columns: Column<T>[];
  data: T[];
  keyExtractor: (item: T) => string | number;
  className?: string;
  searchable?: boolean;
  searchPlaceholder?: string;
  emptyState?: {
    title?: string;
    message?: string;
    icon?: ReactNode;
    action?: {
      label: string;
      onClick: () => void;
    };
  };
  pagination?: {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    totalItems?: number;
    itemsPerPage?: number;
  };
  loading?: boolean;
}

function DashboardTable<T>({
  columns,
  data,
  keyExtractor,
  className,
  searchable = false,
  searchPlaceholder = "Cari...",
  emptyState = {
    title: "Tidak ada data",
    message: "Tidak ada data yang tersedia saat ini",
  },
  pagination,
  loading = false,
}: DashboardTableProps<T>) {
  const [searchTerm, setSearchTerm] = React.useState('');

  // Basic client-side filtering when searchable is true
  const filteredData = React.useMemo(() => {
    if (!searchable || !searchTerm.trim()) {
      return data;
    }

    return data.filter((item) => {
      return Object.entries(item as Record<string, any>).some(([key, value]) => {
        if (typeof value === 'string') {
          return value.toLowerCase().includes(searchTerm.toLowerCase());
        }
        if (typeof value === 'number') {
          return value.toString().includes(searchTerm);
        }
        return false;
      });
    });
  }, [data, searchTerm, searchable]);

  return (
    <div className={cn("bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden", className)}>
      {/* Search bar */}
      {searchable && (
        <div className="p-4 border-b border-gray-100">
          <Input
            placeholder={searchPlaceholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            leftIcon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            }
          />
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column, index) => (
                <th
                  key={index}
                  scope="col"
                  className={cn(
                    "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
                    column.className
                  )}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan={columns.length} className="px-6 py-16 text-center">
                  <div className="flex flex-col items-center justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-babyBlue"></div>
                    <span className="mt-4 text-sm text-gray-500">Memuat data...</span>
                  </div>
                </td>
              </tr>
            ) : filteredData.length > 0 ? (
              filteredData.map((item) => (
                <tr key={keyExtractor(item)} className="hover:bg-gray-50">
                  {columns.map((column, colIndex) => (
                    <td
                      key={colIndex}
                      className={cn("px-6 py-4 whitespace-nowrap", column.className)}
                    >
                      {typeof column.accessor === 'function'
                        ? column.accessor(item)
                        : (item[column.accessor] as ReactNode)}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="px-6 py-12 text-center">
                  <div className="flex flex-col items-center justify-center">
                    {emptyState.icon ? (
                      emptyState.icon
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    )}
                    <h3 className="mt-4 text-lg font-medium text-gray-900">{emptyState.title}</h3>
                    <p className="mt-1 text-gray-500">{emptyState.message}</p>
                    {emptyState.action && (
                      <div className="mt-6">
                        <Button variant="primary" onClick={emptyState.action.onClick}>
                          {emptyState.action.label}
                        </Button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pagination && filteredData.length > 0 && (
        <div className="flex items-center justify-between px-6 py-3 bg-white border-t border-gray-200">
          <div className="text-sm text-gray-500">
            {pagination.totalItems && pagination.itemsPerPage && (
              <>
                Menampilkan{' '}
                <span className="font-medium">
                  {Math.min(
                    (pagination.currentPage - 1) * pagination.itemsPerPage + 1,
                    pagination.totalItems
                  )}
                </span>{' '}
                hingga{' '}
                <span className="font-medium">
                  {Math.min(
                    pagination.currentPage * pagination.itemsPerPage,
                    pagination.totalItems
                  )}
                </span>{' '}
                dari <span className="font-medium">{pagination.totalItems}</span> data
              </>
            )}
          </div>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => pagination.onPageChange(pagination.currentPage - 1)}
              disabled={pagination.currentPage <= 1}
            >
              Sebelumnya
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => pagination.onPageChange(pagination.currentPage + 1)}
              disabled={pagination.currentPage >= pagination.totalPages}
            >
              Selanjutnya
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default DashboardTable;