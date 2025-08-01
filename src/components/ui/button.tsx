import React from 'react';
import { cn } from '@/lib/utils';

/**
 * Button 컴포넌트의 variant 타입
 */
export type ButtonVariant = 'primary' | 'secondary' | 'ghost';

/**
 * Button 컴포넌트의 size 타입
 */
export type ButtonSize = 'sm' | 'default' | 'large';

/**
 * Button 컴포넌트의 props 인터페이스
 */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** 버튼의 스타일 변형 */
  variant?: ButtonVariant;
  /** 버튼의 크기 */
  size?: ButtonSize;
  /** 로딩 상태 */
  loading?: boolean;
  /** 아이콘 (왼쪽) */
  leftIcon?: React.ReactNode;
  /** 아이콘 (오른쪽) */
  rightIcon?: React.ReactNode;
  /** 전체 너비 사용 여부 */
  fullWidth?: boolean;
}

/**
 * Linear Design System 기반 Button 컴포넌트
 * 
 * @example
 * ```tsx
 * <Button variant="primary" size="large">
 *   Get Started
 * </Button>
 * 
 * <Button variant="secondary" leftIcon={<Icon />}>
 *   Learn More
 * </Button>
 * ```
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'default',
      loading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const baseClasses = cn(
      // Base styles
      'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed',
      
      // Size variants
      {
        'px-4 py-2 text-sm': size === 'sm',
        'px-6 py-3 text-sm': size === 'default',
        'px-8 py-4 text-base': size === 'large',
      },
      
      // Width
      {
        'w-full': fullWidth,
      },
      
      // Variant styles
      {
        // Primary variant
        'bg-[#5E6AD2] text-white hover:bg-[#5E6AD2]/90 focus:ring-[#5E6AD2]/50 shadow-sm': variant === 'primary',
        
        // Secondary variant
        'bg-surface-secondary text-text-primary border border-border-primary hover:bg-surface-tertiary hover:border-border-secondary focus:ring-brand-primary/50': variant === 'secondary',
        
        // Ghost variant
        'bg-transparent text-text-primary hover:bg-surface-secondary focus:ring-brand-primary/50': variant === 'ghost',
      },
      
      className
    );

    return (
      <button ref={ref} className={baseClasses} disabled={disabled || loading} {...props}>
        {loading && (
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        )}
        {!loading && leftIcon && (
          <span className="mr-2 flex-shrink-0">{leftIcon}</span>
        )}
        <span className="flex items-center">{children}</span>
        {!loading && rightIcon && (
          <span className="ml-2 flex-shrink-0">{rightIcon}</span>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button'; 