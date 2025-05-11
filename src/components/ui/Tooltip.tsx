// src/components/ui/Tooltip.tsx
import React, { useState, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TooltipProps {
  content: string | ReactNode;
  children: ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;
  className?: string;
}

export const Tooltip = ({
  content,
  children,
  position = 'top',
  delay = 300,
  className = '',
}: TooltipProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  const showTooltip = () => {
    if (timer) clearTimeout(timer);
    const newTimer = setTimeout(() => {
      setIsVisible(true);
    }, delay);
    setTimer(newTimer);
  };

  const hideTooltip = () => {
    if (timer) clearTimeout(timer);
    setIsVisible(false);
  };

  // Calculate position styles
  const getPositionStyles = () => {
    switch (position) {
      case 'top':
        return {
          bottom: '100%',
          left: '50%',
          transform: 'translateX(-50%)',
          marginBottom: '8px',
        };
      case 'bottom':
        return {
          top: '100%',
          left: '50%',
          transform: 'translateX(-50%)',
          marginTop: '8px',
        };
      case 'left':
        return {
          right: '100%',
          top: '50%',
          transform: 'translateY(-50%)',
          marginRight: '8px',
        };
      case 'right':
        return {
          left: '100%',
          top: '50%',
          transform: 'translateY(-50%)',
          marginLeft: '8px',
        };
      default:
        return {
          bottom: '100%',
          left: '50%',
          transform: 'translateX(-50%)',
          marginBottom: '8px',
        };
    }
  };

  return (
    <div
      className={`inline-block relative ${className}`}
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      onFocus={showTooltip}
      onBlur={hideTooltip}
    >
      <div className="cursor-help">{children}</div>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            className="absolute z-50"
            style={getPositionStyles()}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
          >
            <div className="bg-gray-800 text-white text-xs px-3 py-2 rounded shadow-lg min-w-max max-w-xs">
              {content}
              
              {/* Arrow */}
              <div
                className={`absolute w-2 h-2 bg-gray-800 transform rotate-45 ${
                  position === 'top'
                    ? 'bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2'
                    : position === 'bottom'
                    ? 'top-0 left-1/2 -translate-x-1/2 -translate-y-1/2'
                    : position === 'left'
                    ? 'right-0 top-1/2 translate-x-1/2 -translate-y-1/2'
                    : 'left-0 top-1/2 -translate-x-1/2 -translate-y-1/2'
                }`}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};