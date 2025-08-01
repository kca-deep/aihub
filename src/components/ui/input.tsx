import React from 'react';
import { cn } from '@/lib/utils';

// Input Component
export type InputVariant = 'default' | 'outlined' | 'filled';
export type InputSize = 'sm' | 'md' | 'lg';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  variant?: InputVariant;
  size?: InputSize;
  error?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ 
    className, 
    variant = 'default', 
    size = 'md',
    error = false,
    leftIcon,
    rightIcon,
    fullWidth = false,
    disabled,
    ...props 
  }, ref) => {
    const baseClasses = cn(
      'flex items-center w-full font-primary transition-all duration-200',
      'border border-border-primary rounded-lg',
      'placeholder:text-text-tertiary',
      'focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      {
        // Size variants
        'px-3 py-1.5 text-sm': size === 'sm',
        'px-4 py-2 text-sm': size === 'md',
        'px-5 py-3 text-base': size === 'lg',
        
        // Width
        'w-full': fullWidth,
        
        // Variant styles
        'bg-surface-primary text-text-primary': variant === 'default',
        'bg-transparent text-text-primary border-2': variant === 'outlined',
        'bg-surface-secondary text-text-primary': variant === 'filled',
        
        // Error state
        'border-red-500 focus:ring-red-500/50 focus:border-red-500': error,
      },
      className
    );

    const iconClasses = cn(
      'flex-shrink-0',
      {
        'text-text-tertiary': !error,
        'text-red-500': error,
      }
    );

    return (
      <div className={cn('relative', fullWidth && 'w-full')}>
        {leftIcon && (
          <div className={cn(iconClasses, 'absolute left-3 top-1/2 -translate-y-1/2')}>
            {leftIcon}
          </div>
        )}
        <input
          ref={ref}
          className={cn(
            baseClasses,
            leftIcon && 'pl-10',
            rightIcon && 'pr-10'
          )}
          disabled={disabled}
          {...props}
        />
        {rightIcon && (
          <div className={cn(iconClasses, 'absolute right-3 top-1/2 -translate-y-1/2')}>
            {rightIcon}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

// Textarea Component
export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  variant?: InputVariant;
  size?: InputSize;
  error?: boolean;
  autoResize?: boolean;
  fullWidth?: boolean;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ 
    className, 
    variant = 'default', 
    size = 'md',
    error = false,
    autoResize = false,
    fullWidth = false,
    disabled,
    ...props 
  }, ref) => {
    const baseClasses = cn(
      'w-full font-primary transition-all duration-200 resize-none',
      'border border-border-primary rounded-lg',
      'placeholder:text-text-tertiary',
      'focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      {
        // Size variants
        'px-3 py-2 text-sm min-h-[80px]': size === 'sm',
        'px-4 py-3 text-sm min-h-[100px]': size === 'md',
        'px-5 py-4 text-base min-h-[120px]': size === 'lg',
        
        // Width
        'w-full': fullWidth,
        
        // Variant styles
        'bg-surface-primary text-text-primary': variant === 'default',
        'bg-transparent text-text-primary border-2': variant === 'outlined',
        'bg-surface-secondary text-text-primary': variant === 'filled',
        
        // Error state
        'border-red-500 focus:ring-red-500/50 focus:border-red-500': error,
      },
      className
    );

    const handleResize = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (autoResize) {
        e.target.style.height = 'auto';
        e.target.style.height = `${e.target.scrollHeight}px`;
      }
    };

    return (
      <textarea
        ref={ref}
        className={baseClasses}
        onChange={handleResize}
        disabled={disabled}
        {...props}
      />
    );
  }
);

Textarea.displayName = 'Textarea';

// Checkbox Component
export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  error?: boolean;
  fullWidth?: boolean;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ 
    className, 
    size = 'md',
    label,
    error = false,
    fullWidth = false,
    disabled,
    ...props 
  }, ref) => {
    const checkboxClasses = cn(
      'flex items-center',
      {
        'w-full': fullWidth,
      },
      className
    );

    const inputClasses = cn(
      'appearance-none rounded border transition-all duration-200',
      'focus:outline-none focus:ring-2 focus:ring-brand-primary/50',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      {
        // Size variants
        'w-4 h-4': size === 'sm',
        'w-5 h-5': size === 'md',
        'w-6 h-6': size === 'lg',
        
        // Default state
        'border-border-primary bg-surface-primary': !error,
        
        // Error state
        'border-red-500': error,
      }
    );

    const checkmarkClasses = cn(
      'absolute inset-0 flex items-center justify-center text-white',
      {
        'text-xs': size === 'sm',
        'text-sm': size === 'md',
        'text-base': size === 'lg',
      }
    );

    return (
      <label className={checkboxClasses}>
        <div className="relative">
          <input
            ref={ref}
            type="checkbox"
            className={inputClasses}
            disabled={disabled}
            {...props}
          />
          <div className={checkmarkClasses}>
            <svg className="w-full h-full" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
        {label && (
          <span className={cn(
            'ml-3 text-text-primary font-medium',
            {
              'text-sm': size === 'sm',
              'text-base': size === 'md',
              'text-lg': size === 'lg',
            }
          )}>
            {label}
          </span>
        )}
      </label>
    );
  }
);

Checkbox.displayName = 'Checkbox';

// Radio Component
export interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  error?: boolean;
  fullWidth?: boolean;
}

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  ({ 
    className, 
    size = 'md',
    label,
    error = false,
    fullWidth = false,
    disabled,
    ...props 
  }, ref) => {
    const radioClasses = cn(
      'flex items-center',
      {
        'w-full': fullWidth,
      },
      className
    );

    const inputClasses = cn(
      'appearance-none rounded-full border transition-all duration-200',
      'focus:outline-none focus:ring-2 focus:ring-brand-primary/50',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      {
        // Size variants
        'w-4 h-4': size === 'sm',
        'w-5 h-5': size === 'md',
        'w-6 h-6': size === 'lg',
        
        // Default state
        'border-border-primary bg-surface-primary': !error,
        
        // Error state
        'border-red-500': error,
      }
    );

    const dotClasses = cn(
      'absolute inset-0 flex items-center justify-center',
      {
        'scale-0': !props.checked,
        'scale-100': props.checked,
      }
    );

    const innerDotClasses = cn(
      'rounded-full bg-brand-primary',
      {
        'w-2 h-2': size === 'sm',
        'w-2.5 h-2.5': size === 'md',
        'w-3 h-3': size === 'lg',
      }
    );

    return (
      <label className={radioClasses}>
        <div className="relative">
          <input
            ref={ref}
            type="radio"
            className={inputClasses}
            disabled={disabled}
            {...props}
          />
          <div className={dotClasses}>
            <div className={innerDotClasses} />
          </div>
        </div>
        {label && (
          <span className={cn(
            'ml-3 text-text-primary font-medium',
            {
              'text-sm': size === 'sm',
              'text-base': size === 'md',
              'text-lg': size === 'lg',
            }
          )}>
            {label}
          </span>
        )}
      </label>
    );
  }
);

Radio.displayName = 'Radio';

// Select Component
export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  size?: 'sm' | 'md' | 'lg';
  variant?: InputVariant;
  error?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ 
    className, 
    size = 'md',
    variant = 'default',
    error = false,
    fullWidth = false,
    leftIcon,
    rightIcon,
    disabled,
    children,
    ...props 
  }, ref) => {
    const baseClasses = cn(
      'flex items-center w-full font-primary transition-all duration-200',
      'border border-border-primary rounded-lg',
      'focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      {
        // Size variants
        'px-3 py-1.5 text-sm': size === 'sm',
        'px-4 py-2 text-sm': size === 'md',
        'px-5 py-3 text-base': size === 'lg',
        
        // Width
        'w-full': fullWidth,
        
        // Variant styles
        'bg-surface-primary text-text-primary': variant === 'default',
        'bg-transparent text-text-primary border-2': variant === 'outlined',
        'bg-surface-secondary text-text-primary': variant === 'filled',
        
        // Error state
        'border-red-500 focus:ring-red-500/50 focus:border-red-500': error,
      },
      className
    );

    const iconClasses = cn(
      'flex-shrink-0',
      {
        'text-text-tertiary': !error,
        'text-red-500': error,
      }
    );

    return (
      <div className={cn('relative', fullWidth && 'w-full')}>
        {leftIcon && (
          <div className={cn(iconClasses, 'absolute left-3 top-1/2 -translate-y-1/2')}>
            {leftIcon}
          </div>
        )}
        <select
          ref={ref}
          className={cn(
            baseClasses,
            leftIcon && 'pl-10',
            rightIcon && 'pr-10'
          )}
          disabled={disabled}
          {...props}
        >
          {children}
        </select>
        {rightIcon && (
          <div className={cn(iconClasses, 'absolute right-3 top-1/2 -translate-y-1/2')}>
            {rightIcon}
          </div>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select'; 