import React from 'react';
import { cn } from '@/lib/utils';
import { designTokens } from '@/lib/design-tokens';
import { StandardComponentProps, setDisplayName } from '@/lib/component-types';
import { getButtonA11yProps, createKeyboardHandler, KEYS } from '@/lib/accessibility';

/**
 * Button 컴포넌트의 variant 타입
 */
export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success';

/**
 * Button 컴포넌트의 size 타입
 */
export type ButtonSize = 'sm' | 'md' | 'lg';

/**
 * Button 컴포넌트의 props 인터페이스
 */
export interface ButtonProps 
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'size'> {
  /** 버튼의 변형 */
  variant?: ButtonVariant;
  /** 버튼의 크기 */
  size?: ButtonSize;
  /** 아이콘 (왼쪽) */
  leftIcon?: React.ReactNode;
  /** 아이콘 (오른쪽) */
  rightIcon?: React.ReactNode;
  /** 전체 너비 사용 여부 */
  fullWidth?: boolean;
  /** 로딩 상태 */
  loading?: boolean;
  /** 버튼 클릭 시 이벤트 핸들러 */
  onPress?: () => void;
  /** 테스트 ID */
  'data-testid'?: string;
  /** 접근성 라벨 */
  'aria-label'?: string;
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
      size = 'md',
      loading = false,
      disabled,
      leftIcon,
      rightIcon,
      fullWidth = false,
      onPress,
      onClick,
      onKeyDown,
      children,
      'data-testid': testId,
      'aria-label': ariaLabel,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;
    const tokens = designTokens.component.button;
    
    // 접근성 속성 생성
    const a11yProps = getButtonA11yProps({
      disabled: isDisabled,
      label: ariaLabel,
    });
    
    // 키보드 이벤트 핸들러
    const handleKeyDown = createKeyboardHandler({
      Enter: onPress,
      Space: onPress,
    });
    
    // 클릭 이벤트 핸들러
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      if (!isDisabled) {
        onClick?.(event);
        onPress?.();
      }
    };
    
    const baseClasses = cn(
      // Base styles
      'inline-flex items-center justify-center font-medium transition-all',
      'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
      'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
      
      // Size variants using design tokens
      {
        'h-8 px-3 text-sm rounded-md': size === 'sm',
        'h-10 px-6 text-sm rounded-md': size === 'md', 
        'h-12 px-8 text-base rounded-lg': size === 'lg',
      },
      
      // Width
      {
        'w-full': fullWidth,
      },
      
      // Variant styles using design tokens
      {
        // Primary variant
        'bg-brand-primary text-white hover:bg-brand-primary/90 focus-visible:ring-brand-primary/50 shadow-sm': variant === 'primary',
        
        // Secondary variant  
        'bg-surface-primary text-text-primary border border-border-primary hover:bg-surface-secondary hover:border-border-secondary focus-visible:ring-brand-primary/50': variant === 'secondary',
        
        // Outline variant
        'bg-transparent text-text-primary border border-border-primary hover:bg-surface-secondary hover:border-border-secondary focus-visible:ring-brand-primary/50': variant === 'outline',
        
        // Ghost variant
        'bg-transparent text-text-primary hover:bg-surface-primary focus-visible:ring-brand-primary/50': variant === 'ghost',
        
        // Danger variant
        'bg-red-500 text-white hover:bg-red-600 focus-visible:ring-red-500/50 shadow-sm': variant === 'danger',
        
        // Success variant
        'bg-green-500 text-white hover:bg-green-600 focus-visible:ring-green-500/50 shadow-sm': variant === 'success',
      },
      
      className
    );

    return (
      <button 
        ref={ref} 
        className={baseClasses} 
        disabled={isDisabled}
        onClick={handleClick}
        onKeyDown={(e) => {
          handleKeyDown(e);
          onKeyDown?.(e);
        }}
        data-testid={testId}
        {...a11yProps}
        {...props}
      >
        {loading && (
          <svg 
            className="animate-spin -ml-1 mr-2 h-4 w-4" 
            fill="none" 
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle 
              className="opacity-25" 
              cx="12" 
              cy="12" 
              r="10" 
              stroke="currentColor" 
              strokeWidth="4"
            />
            <path 
              className="opacity-75" 
              fill="currentColor" 
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {!loading && leftIcon && (
          <span className="mr-2 flex-shrink-0" aria-hidden="true">{leftIcon}</span>
        )}
        <span className="flex items-center">
          {loading ? 'Loading...' : children}
        </span>
        {!loading && rightIcon && (
          <span className="ml-2 flex-shrink-0" aria-hidden="true">{rightIcon}</span>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

setDisplayName(Button, 'Button');

// 버튼 컴포넌트의 기본 props
Button.defaultProps = {
  variant: 'primary',
  size: 'md',
  loading: false,
  disabled: false,
  fullWidth: false,
}; 