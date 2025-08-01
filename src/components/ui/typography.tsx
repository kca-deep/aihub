import React from 'react';
import { cn } from '@/lib/utils';

/**
 * Typography 컴포넌트의 color 타입
 */
export type TypographyColor = 'primary' | 'secondary' | 'tertiary' | 'muted' | 'brand';

/**
 * Typography 컴포넌트의 weight 타입
 */
export type TypographyWeight = 'normal' | 'medium' | 'semibold' | 'bold';

/**
 * Heading 컴포넌트의 props 인터페이스
 */
export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  /** 제목의 레벨 (h1-h4) */
  as?: 'h1' | 'h2' | 'h3' | 'h4';
  /** 텍스트 색상 */
  color?: TypographyColor;
  /** 폰트 굵기 */
  weight?: TypographyWeight;
  /** 텍스트 정렬 */
  align?: 'left' | 'center' | 'right';
  /** 최대 너비 */
  maxWidth?: string;
}

/**
 * Text 컴포넌트의 props 인터페이스
 */
export interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  /** 텍스트의 크기 */
  size?: 'small' | 'medium' | 'large';
  /** 텍스트 색상 */
  color?: TypographyColor;
  /** 폰트 굵기 */
  weight?: TypographyWeight;
  /** 텍스트 정렬 */
  align?: 'left' | 'center' | 'right';
  /** 최대 너비 */
  maxWidth?: string;
  /** 줄 높이 */
  lineHeight?: 'tight' | 'normal' | 'relaxed';
}

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  size?: 'small' | 'medium' | 'large';
  color?: TypographyColor;
  weight?: TypographyWeight;
  align?: 'left' | 'center' | 'right';
  maxWidth?: string;
  lineHeight?: 'tight' | 'normal' | 'relaxed';
}

/**
 * Linear Design System 기반 Heading 컴포넌트
 * 
 * @example
 * ```tsx
 * <Heading as="h1" color="primary">
 *   Welcome to Linear
 * </Heading>
 * 
 * <Heading as="h2" color="secondary" align="center">
 *   Product Development
 * </Heading>
 * ```
 */
export const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, as = 'h2', color = 'primary', weight = 'semibold', align = 'left', maxWidth, children, ...props }, ref) => {
    const Component = as;
    
    const classes = cn(
      'font-primary',
      {
        // Size variants
        'text-h1': as === 'h1',
        'text-h2': as === 'h2',
        'text-h3': as === 'h3',
        'text-h4': as === 'h4',
        
        // Color variants
        'text-text-primary': color === 'primary',
        'text-text-secondary': color === 'secondary',
        'text-text-tertiary': color === 'tertiary',
        'text-text-muted': color === 'muted',
        'text-brand-primary': color === 'brand',
        
        // Weight variants
        'font-normal': weight === 'normal',
        'font-medium': weight === 'medium',
        'font-semibold': weight === 'semibold',
        'font-bold': weight === 'bold',
        
        // Alignment
        'text-left': align === 'left',
        'text-center': align === 'center',
        'text-right': align === 'right',
      },
      className
    );

    return (
      <Component
        ref={ref}
        className={classes}
        style={{ maxWidth }}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

/**
 * Linear Design System 기반 Text 컴포넌트
 * 
 * @example
 * ```tsx
 * <Text size="large" color="primary">
 *   This is a large text with primary color.
 * </Text>
 * 
 * <Text size="medium" color="secondary" align="center">
 *   This is medium text with secondary color and center alignment.
 * </Text>
 * ```
 */
export const Text = React.forwardRef<HTMLParagraphElement, TextProps>(
  ({ className, size = 'medium', color = 'primary', weight = 'normal', align = 'left', maxWidth, lineHeight = 'normal', children, ...props }, ref) => {
    const classes = cn(
      'font-primary',
      {
        // Size variants
        'text-body-small': size === 'small',
        'text-body-medium': size === 'medium',
        'text-body-large': size === 'large',
        
        // Color variants
        'text-text-primary': color === 'primary',
        'text-text-secondary': color === 'secondary',
        'text-text-tertiary': color === 'tertiary',
        'text-text-muted': color === 'muted',
        'text-brand-primary': color === 'brand',
        
        // Weight variants
        'font-normal': weight === 'normal',
        'font-medium': weight === 'medium',
        'font-semibold': weight === 'semibold',
        'font-bold': weight === 'bold',
        
        // Alignment
        'text-left': align === 'left',
        'text-center': align === 'center',
        'text-right': align === 'right',
        
        // Line height
        'leading-tight': lineHeight === 'tight',
        'leading-normal': lineHeight === 'normal',
        'leading-relaxed': lineHeight === 'relaxed',
      },
      className
    );

    return (
      <p
        ref={ref}
        className={classes}
        style={{ maxWidth }}
        {...props}
      >
        {children}
      </p>
    );
  }
);

/**
 * Linear Design System 기반 Label 컴포넌트
 * 
 * @example
 * ```tsx
 * <Label color="primary">
 *   Email Address
 * </Label>
 * ```
 */
export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, size = 'medium', color = 'primary', weight = 'normal', align = 'left', maxWidth, lineHeight = 'normal', children, ...props }, ref) => {
    const classes = cn(
      'font-primary',
      {
        // Size variants
        'text-body-small': size === 'small',
        'text-body-medium': size === 'medium',
        'text-body-large': size === 'large',
        
        // Color variants
        'text-text-primary': color === 'primary',
        'text-text-secondary': color === 'secondary',
        'text-text-tertiary': color === 'tertiary',
        'text-text-muted': color === 'muted',
        'text-brand-primary': color === 'brand',
        
        // Weight variants
        'font-normal': weight === 'normal',
        'font-medium': weight === 'medium',
        'font-semibold': weight === 'semibold',
        'font-bold': weight === 'bold',
        
        // Alignment
        'text-left': align === 'left',
        'text-center': align === 'center',
        'text-right': align === 'right',
        
        // Line height
        'leading-tight': lineHeight === 'tight',
        'leading-normal': lineHeight === 'normal',
        'leading-relaxed': lineHeight === 'relaxed',
      },
      className
    );

    return (
      <label
        ref={ref}
        className={classes}
        style={{ maxWidth }}
        {...props}
      >
        {children}
      </label>
    );
  }
);

Heading.displayName = 'Heading';
Text.displayName = 'Text';
Label.displayName = 'Label'; 