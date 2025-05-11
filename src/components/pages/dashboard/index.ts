// src/components/pages/dashboard/index.ts
export { default as DashboardHeader } from './DashboardHeader';
export { default as DashboardSidebar } from './DashboardSidebar';
export { default as DashboardCard } from './DashboardCard';
export { default as DashboardSection } from './DashboardSection';
export { default as DashboardTable } from './DashboardTable';
export { default as DashboardActivity } from './DashboardActivity';
export { default as DashboardStats } from './DashboardStats';
export { default as DashboardFilter } from './DashboardFilter';
export { default as DashboardMobileMenu } from './DashboardMobileMenu';

// Export types that might be used across different components
export type { ActivityItem } from './DashboardActivity';
export type { FilterOption } from './DashboardFilter';
export type { StatItem } from './DashboardStats';