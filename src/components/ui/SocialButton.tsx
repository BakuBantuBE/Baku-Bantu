// src/components/ui/SocialButton.tsx
import { ButtonHTMLAttributes, ReactNode } from 'react';

// Helper function that will always return a string
const cn = (...classes: (string | boolean | undefined)[]) => {
  return classes.filter(cls => typeof cls === 'string' && cls).join(' ');
};

export interface SocialButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode;
  provider: 'facebook' | 'google' | 'apple' | 'twitter';
  children?: ReactNode;
}

const SocialButton = ({
  className,
  icon,
  provider,
  children,
  ...props
}: SocialButtonProps) => {
  // Provider-specific styling
  const providerClasses = {
    facebook: "hover:bg-blue-50",
    google: "hover:bg-red-50",
    apple: "hover:bg-gray-50",
    twitter: "hover:bg-blue-50"
  };
  
  // Provider-specific ring colors
  const ringClasses = {
    facebook: "focus:ring-blue-500",
    google: "focus:ring-red-500",
    apple: "focus:ring-gray-800",
    twitter: "focus:ring-blue-400" 
  };

  return (
    <button
      className={cn(
        "flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-all",
        providerClasses[provider],
        ringClasses[provider],
        "focus:outline-none focus:ring-2 focus:ring-offset-2",
        "hover:shadow",
        className || ""
      )}
      {...props}
    >
      <span className="flex items-center justify-center">
        {icon}
        {children && <span className="ml-2">{children}</span>}
      </span>
    </button>
  );
};

export { SocialButton };