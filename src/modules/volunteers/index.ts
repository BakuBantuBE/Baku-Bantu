// src/modules/volunteers/index.ts
/**
 * Volunteers Module Index
 * 
 * This file serves as the entry point for the volunteers module, exposing
 * all components, hooks, and utilities related to volunteer management.
 */

// Components
export * from '@/components/pages/volunteer';

// Hooks
export { default as useVolunteer } from '@/hooks/useVolunteer';

// Services
export { default as volunteerManagementService } from '@/services/volunteerManagementService';

// Types
export type { VolunteerResponse } from '@/services/volunteerService';