'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Button } from './button';
import { Heading, Text } from './typography';

export type NavigationVariant = 'default' | 'transparent' | 'solid';
export type NavigationSize = 'sm' | 'md' | 'lg';

export interface NavigationItem {
  label: string;
  href: string;
  external?: boolean;
  onClick?: () => void;
  children?: NavigationItem[];
}

export interface NavigationProps extends React.HTMLAttributes<HTMLElement> {
  variant?: NavigationVariant;
  size?: NavigationSize;
  logo?: React.ReactNode | {
    text?: string;
    image?: string;
    href?: string;
  } | null;
  items?: NavigationItem[];
  actions?: {
    primary?: {
      label: string;
      href?: string;
      onClick?: () => void;
    };
    secondary?: {
      label: string;
      href?: string;
      onClick?: () => void;
    };
  };
  transparent?: boolean;
  sticky?: boolean;
  showOnScroll?: boolean;
  className?: string;
}

export const Navigation = React.forwardRef<HTMLElement, NavigationProps>(
  ({
    className,
    variant = 'default',
    size = 'md',
    logo = { text: 'KCA AI LAB' },
    items = [],
    actions,
    transparent = false,
    sticky = false,
    showOnScroll = false,
    ...props
  }, ref) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

    // Scroll effect
    useEffect(() => {
      if (!showOnScroll) return;

      const handleScroll = () => {
        setIsScrolled(window.scrollY > 10);
      };

      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }, [showOnScroll]);

    // Close mobile menu on escape
    useEffect(() => {
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setIsMobileMenuOpen(false);
          setActiveDropdown(null);
        }
      };

      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }, []);

    const baseClasses = cn(
      'w-full transition-all duration-300',
      {
        'sticky top-0 z-50': sticky,
        'bg-transparent': transparent && !isScrolled,
        'bg-surface-primary/95 backdrop-blur-md border-b border-border-primary': 
          !transparent || isScrolled,
      },
      className
    );

    const containerClasses = cn(
      'container-linear',
      {
        'h-16': size === 'sm',
        'h-20': size === 'md',
        'h-24': size === 'lg',
      }
    );

    const navClasses = cn(
      'flex items-center justify-between h-full',
      {
        'px-4': size === 'sm',
        'px-6': size === 'md',
        'px-8': size === 'lg',
      }
    );

    const logoClasses = cn(
      'flex items-center space-x-2',
      {
        'text-lg': size === 'sm',
        'text-xl': size === 'md',
        'text-2xl': size === 'lg',
      }
    );

    const desktopMenuClasses = cn(
      'hidden lg:flex items-center space-x-8',
      {
        'text-sm': size === 'sm',
        'text-base': size === 'md',
        'text-lg': size === 'lg',
      }
    );

    const mobileMenuClasses = cn(
      'fixed inset-0 z-50 lg:hidden',
      {
        'pointer-events-none opacity-0': !isMobileMenuOpen,
        'pointer-events-auto opacity-100': isMobileMenuOpen,
      }
    );

    const mobileMenuOverlayClasses = cn(
      'absolute inset-0 bg-background-primary/80 backdrop-blur-sm transition-opacity duration-300',
      {
        'opacity-0': !isMobileMenuOpen,
        'opacity-100': isMobileMenuOpen,
      }
    );

    const mobileMenuContentClasses = cn(
      'absolute bottom-0 left-0 right-0 bg-surface-primary border-t border-border-primary transform transition-transform duration-300 rounded-t-2xl',
      {
        'translate-y-full': !isMobileMenuOpen,
        'translate-y-0': isMobileMenuOpen,
      }
    );

    const renderNavigationItem = (item: NavigationItem, index: number) => {
      const hasChildren = item.children && item.children.length > 0;
      const isActive = activeDropdown === item.label;

      return (
        <div key={index} className="relative group">
          {hasChildren ? (
            <div className="relative">
              <button
                className={cn(
                  'flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors duration-200',
                  'text-text-secondary hover:text-text-primary',
                  'hover:bg-surface-secondary/50'
                )}
                onClick={() => setActiveDropdown(isActive ? null : item.label)}
              >
                <span>{item.label}</span>
                <svg
                  className={cn(
                    'w-4 h-4 transition-transform duration-200',
                    { 'rotate-180': isActive }
                  )}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Desktop Dropdown */}
              <div className="hidden group-hover:block absolute top-full left-0 mt-2 w-48 bg-surface-primary border border-border-primary rounded-lg shadow-lg">
                <div className="py-2">
                  {item.children?.map((child, childIndex) => (
                    <Link
                      key={childIndex}
                      href={child.href}
                      className="block px-4 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-surface-secondary/50 transition-colors duration-200"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Mobile Dropdown */}
              {isActive && (
                <div className="lg:hidden absolute top-full left-0 mt-2 w-48 bg-surface-secondary border border-border-primary rounded-lg shadow-lg z-10">
                  <div className="py-2">
                    {item.children?.map((child, childIndex) => (
                      <Link
                        key={childIndex}
                        href={child.href}
                        className="block px-4 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-surface-tertiary/50 transition-colors duration-200"
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          setActiveDropdown(null);
                        }}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            item.onClick ? (
              <button
                onClick={item.onClick}
                className="px-3 py-2 rounded-lg transition-colors duration-200 text-text-secondary hover:text-text-primary hover:bg-surface-secondary/50"
              >
                {item.label}
              </button>
            ) : (
              <Link
                href={item.href}
                className="px-3 py-2 rounded-lg transition-colors duration-200 text-text-secondary hover:text-text-primary hover:bg-surface-secondary/50"
                target={item.external ? '_blank' : undefined}
                rel={item.external ? 'noopener noreferrer' : undefined}
              >
                {item.label}
              </Link>
            )
          )}
        </div>
      );
    };

    return (
      <nav ref={ref} className={baseClasses} {...props}>
        <div className={containerClasses}>
          <div className={navClasses}>
            {/* Logo */}
            <div className={logoClasses}>
              {React.isValidElement(logo) ? (
                <Link href="/">
                  {logo}
                </Link>
              ) : logo && typeof logo === 'object' && logo !== null && 'image' in logo && typeof logo.image === 'string' && logo.image ? (
                <Link href="/">
                  <img src={logo.image} alt={logo.text || 'Logo'} className="h-8 w-auto" />
                </Link>
              ) : logo && typeof logo === 'object' && logo !== null && 'text' in logo && typeof logo.text === 'string' && logo.text ? (
                <Link href={logo.href || '/'}>
                  <Heading as="h1" className="font-bold">
                    {logo.text}
                  </Heading>
                </Link>
              ) : (
                <Link href="/">
                  <Heading as="h1" className="font-bold">
                    KCA AI LAB
                  </Heading>
                </Link>
              )}
            </div>

            {/* Desktop Navigation */}
            <div className={desktopMenuClasses}>
              {items.map((item, index) => renderNavigationItem(item, index))}
            </div>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center space-x-4">
              {actions?.secondary && (
                <Button
                  variant="ghost"
                  size={size === 'sm' ? 'sm' : 'md'}
                  onClick={actions.secondary.onClick}
                >
                  {actions.secondary.label}
                </Button>
              )}
              {actions?.primary && (
                <Button
                  variant="ghost"
                  size={size === 'sm' ? 'sm' : 'md'}
                  onClick={actions.primary.onClick}
                >
                  {actions.primary.label}
                </Button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-surface-secondary/50 transition-colors duration-200"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className={mobileMenuClasses}>
            <div
              className={mobileMenuOverlayClasses}
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <div className={mobileMenuContentClasses}>
                          <div className="flex flex-col max-h-[80vh]">
              {/* Mobile Menu Header */}
              <div className="flex items-center justify-between p-6 border-b border-border-primary">
                <div className={logoClasses}>
                  {React.isValidElement(logo) ? (
                    logo
                  ) : logo && typeof logo === 'object' && logo !== null && 'image' in logo && typeof logo.image === 'string' && logo.image ? (
                    <img src={logo.image} alt={logo.text || 'Logo'} className="h-8 w-auto" />
                  ) : logo && typeof logo === 'object' && logo !== null && 'text' in logo && typeof logo.text === 'string' && logo.text ? (
                    <Heading as="h1" className="text-brand-primary font-bold">
                      {logo.text}
                    </Heading>
                  ) : (
                    <Heading as="h1" className="text-brand-primary font-bold">
                      KCA AI LAB
                    </Heading>
                  )}
                </div>
                <button
                  className="p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-surface-secondary/50 transition-colors duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Mobile Menu Items */}
              <div className="flex-1 overflow-y-auto p-6">
                <div className="space-y-2">
                  {items.map((item, index) => {
                    const hasChildren = item.children && item.children.length > 0;
                    const isActive = activeDropdown === item.label;

                    return (
                      <div key={index} className="relative">
                        {hasChildren ? (
                          <div className="relative">
                            <button
                              className={cn(
                                'flex items-center justify-between w-full px-3 py-2 rounded-lg transition-colors duration-200',
                                'text-text-secondary hover:text-text-primary',
                                'hover:bg-surface-secondary/50'
                              )}
                              onClick={() => setActiveDropdown(isActive ? null : item.label)}
                            >
                              <span>{item.label}</span>
                              <svg
                                className={cn(
                                  'w-4 h-4 transition-transform duration-200',
                                  { 'rotate-180': isActive }
                                )}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                            </button>

                            {/* Mobile Dropdown */}
                            {isActive && (
                              <div className="mt-2 ml-4 bg-surface-secondary border border-border-primary rounded-lg shadow-lg">
                                <div className="py-2">
                                  {item.children?.map((child, childIndex) => (
                                    <Link
                                      key={childIndex}
                                      href={child.href}
                                      className="block px-4 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-surface-tertiary/50 transition-colors duration-200"
                                      onClick={() => {
                                        setIsMobileMenuOpen(false);
                                        setActiveDropdown(null);
                                      }}
                                    >
                                      {child.label}
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        ) : (
                          item.onClick ? (
                            <button
                              onClick={() => {
                                item.onClick?.();
                                setIsMobileMenuOpen(false);
                              }}
                              className="w-full text-left px-3 py-2 rounded-lg transition-colors duration-200 text-text-secondary hover:text-text-primary hover:bg-surface-secondary/50"
                            >
                              {item.label}
                            </button>
                          ) : (
                            <Link
                              href={item.href}
                              className="block px-3 py-2 rounded-lg transition-colors duration-200 text-text-secondary hover:text-text-primary hover:bg-surface-secondary/50"
                              target={item.external ? '_blank' : undefined}
                              rel={item.external ? 'noopener noreferrer' : undefined}
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              {item.label}
                            </Link>
                          )
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Mobile Menu Actions */}
              {actions && (
                <div className="p-6 border-t border-border-primary space-y-3">
                  {actions.secondary && (
                    <Button
                      variant="ghost"
                      fullWidth
                      onClick={actions.secondary.onClick}
                    >
                      {actions.secondary.label}
                    </Button>
                  )}
                  {actions.primary && (
                    <Button
                      fullWidth
                      onClick={actions.primary.onClick}
                    >
                      {actions.primary.label}
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
        )}
      </nav>
    );
  }
);

Navigation.displayName = 'Navigation'; 