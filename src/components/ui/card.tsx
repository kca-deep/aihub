import React from 'react';
import { cn } from '@/lib/utils';

/**
 * Card 컴포넌트의 variant 타입
 */
export type CardVariant = 'default' | 'elevated' | 'outlined' | 'glass';

/**
 * Card 컴포넌트의 props 인터페이스
 */
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 카드의 스타일 변형 */
  variant?: CardVariant;
  /** 패딩 크기 */
  padding?: 'none' | 'sm' | 'md' | 'lg';
  /** 호버 효과 사용 여부 */
  hoverable?: boolean;
  /** 클릭 가능 여부 */
  clickable?: boolean;
  /** 그림자 효과 */
  shadow?: 'none' | 'sm' | 'md' | 'lg';
}

/**
 * Card Header 컴포넌트의 props 인터페이스
 */
export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 헤더의 정렬 */
  align?: 'start' | 'center' | 'end';
}

/**
 * Card Content 컴포넌트의 props 인터페이스
 */
export interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 콘텐츠의 패딩 */
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

/**
 * Card Footer 컴포넌트의 props 인터페이스
 */
export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 푸터의 정렬 */
  align?: 'start' | 'center' | 'end';
}

/**
 * Linear Design System 기반 Card 컴포넌트
 * 
 * @example
 * ```tsx
 * <Card variant="elevated" hoverable>
 *   <CardHeader>
 *     <h3>Card Title</h3>
 *   </CardHeader>
 *   <CardContent>
 *     <p>Card content goes here...</p>
 *   </CardContent>
 *   <CardFooter>
 *     <Button>Action</Button>
 *   </CardFooter>
 * </Card>
 * ```
 */
export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      variant = 'default',
      padding = 'md',
      hoverable = false,
      clickable = false,
      shadow = 'none',
      children,
      ...props
    },
    ref
  ) => {
    const baseClasses = cn(
      // 기본 스타일
      'bg-surface-primary border border-border-primary rounded-lg',
      'transition-all duration-200',
      
      // 패딩 스타일
      padding === 'none' && 'p-0',
      padding === 'sm' && 'p-4',
      padding === 'md' && 'p-6',
      padding === 'lg' && 'p-8',
      
      // 변형별 스타일
      variant === 'default' && 'bg-surface-primary',
      variant === 'elevated' && [
        'bg-surface-primary shadow-md',
        'border-border-primary/50'
      ],
      variant === 'outlined' && [
        'bg-transparent border-2 border-border-primary',
        'backdrop-blur-sm'
      ],
      variant === 'glass' && [
        'bg-surface-primary/50 backdrop-blur-md',
        'border border-border-primary/50'
      ],
      
      // 그림자 스타일
      shadow === 'sm' && 'shadow-sm',
      shadow === 'md' && 'shadow-md',
      shadow === 'lg' && 'shadow-lg',
      
      // 호버 효과
      hoverable && [
        'hover:bg-surface-secondary hover:border-border-primary/80',
        'hover:shadow-md hover:-translate-y-1',
        'cursor-pointer'
      ],
      
      // 클릭 가능 스타일
      clickable && 'cursor-pointer active:scale-95',
      
      className
    );

    return (
      <div
        ref={ref}
        className={baseClasses}
        {...props}
      >
        {children}
      </div>
    );
  }
);

/**
 * Card Header 컴포넌트
 */
export const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  (
    {
      className,
      align = 'start',
      children,
      ...props
    },
    ref
  ) => {
    const baseClasses = cn(
      'flex flex-col gap-2',
      align === 'start' && 'items-start',
      align === 'center' && 'items-center',
      align === 'end' && 'items-end',
      className
    );

    return (
      <div
        ref={ref}
        className={baseClasses}
        {...props}
      >
        {children}
      </div>
    );
  }
);

/**
 * Card Content 컴포넌트
 */
export const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  (
    {
      className,
      padding = 'none',
      children,
      ...props
    },
    ref
  ) => {
    const baseClasses = cn(
      'flex-1',
      padding === 'sm' && 'p-4',
      padding === 'md' && 'p-6',
      padding === 'lg' && 'p-8',
      className
    );

    return (
      <div
        ref={ref}
        className={baseClasses}
        {...props}
      >
        {children}
      </div>
    );
  }
);

/**
 * Card Footer 컴포넌트
 */
export const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  (
    {
      className,
      align = 'start',
      children,
      ...props
    },
    ref
  ) => {
    const baseClasses = cn(
      'flex gap-2',
      align === 'start' && 'justify-start',
      align === 'center' && 'justify-center',
      align === 'end' && 'justify-end',
      className
    );

    return (
      <div
        ref={ref}
        className={baseClasses}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';
CardHeader.displayName = 'CardHeader';
CardContent.displayName = 'CardContent';
CardFooter.displayName = 'CardFooter'; 