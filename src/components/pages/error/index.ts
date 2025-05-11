// src/components/pages/error/index.ts
/**
 * Export all error-related components for easy importing
 */

// Error page heroes
export { default as NotFoundHero } from './NotFoundHero';
export { default as ServerErrorHero } from './ServerErrorHero';

// Shared components used in error pages
export { default as SuggestedLinks } from './SuggestedLinks';

// Note: OfflinePage is imported directly from the app/offline folder
// Note: Global error page doesn't use these components to ensure it works independently