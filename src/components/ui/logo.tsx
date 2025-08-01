import React from 'react';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'white' | 'brand';
}

export const Logo: React.FC<LogoProps> = ({ 
  className, 
  size = 'md', 
  variant = 'default' 
}) => {
  const sizeClasses = {
    sm: 'h-6',
    md: 'h-8',
    lg: 'h-12'
  };

  const variantClasses = {
    default: 'text-text-primary',
    white: 'text-white',
    brand: 'text-brand-primary'
  };

  return (
    <div className={cn('flex items-center space-x-2', className)}>
      {/* KCA Text Logo */}
      <div className="flex flex-col">
        <span className={cn('font-bold text-lg leading-tight', variantClasses[variant])}>
          KCA AI LAB
        </span>
        <span className={cn('text-xs leading-tight opacity-70', variantClasses[variant])}>
          Innovation Hub
        </span>
      </div>
    </div>
  );
};

export default Logo; 