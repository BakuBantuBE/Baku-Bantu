// src/components/ui/Loading.tsx
import React from 'react';
import { cn } from '@/lib/utils';

interface LoadingProps {
  size?: 'xs' | 'sm' | 'md' | 'lg';
  color?: 'primary' | 'secondary' | 'accent' | 'white';
  text?: string;
  center?: boolean;
  fullScreen?: boolean;
}

export const Loading = ({ 
  size = 'md', 
  color = 'primary', 
  text, 
  center = false,
  fullScreen = false 
}: LoadingProps) => {
  // Size mapping
  const sizeClasses = {
    xs: 'h-3 w-3 border-2',
    sm: 'h-5 w-5 border-2',
    md: 'h-8 w-8 border-3',
    lg: 'h-12 w-12 border-4',
  };

  // Color mapping - using your brand colors
  const colorClasses = {
    primary: 'border-babyBlue-dark border-t-transparent',
    secondary: 'border-lavender-dark border-t-transparent',
    accent: 'border-poppy-dark border-t-transparent',
    white: 'border-white border-t-transparent',
  };

  const textColors = {
    primary: 'text-babyBlue-dark',
    secondary: 'text-lavender-dark',
    accent: 'text-poppy-dark',
    white: 'text-white',
  };

  return (
    <div className={cn(
      "flex flex-col items-center justify-center",
      center && "mx-auto",
      fullScreen && "fixed inset-0 bg-white/80 backdrop-blur-sm z-50"
    )}>
      <div
        className={cn(
          "rounded-full border-solid animate-spin",
          sizeClasses[size],
          colorClasses[color]
        )}
        aria-hidden="true"
      />
      {text && (
        <p className={cn("mt-3 text-sm font-medium", textColors[color])}>
          {text}
        </p>
      )}
    </div>
  );
};