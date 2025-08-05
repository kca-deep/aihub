'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// Global state to manage active mobile menu
let activeMobileMenuId: string | null = null;
const mobileMenuCallbacks = new Map<string, () => void>();
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
  icon?: React.ReactNode;
  badge?: string | number;
  category?: string;
  description?: string;
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
  enableMobileSearch?: boolean;
  currentPath?: string;
  mobileMenuVariant?: 'default' | 'categorized' | 'compact';
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
    enableMobileSearch = false,
    currentPath = '',
    mobileMenuVariant = 'default',
    ...props
  }, ref) => {
    // Generate unique ID for this navigation instance
    const navigationId = React.useId();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const [isAnimating, setIsAnimating] = useState(false);
    const [mobileSearchQuery, setMobileSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState<string | null>(null);
    const mobileMenuRef = useRef<HTMLDivElement>(null);
    const hamburgerRef = useRef<HTMLButtonElement>(null);
    const searchInputRef = useRef<HTMLInputElement>(null);
    const touchStartY = useRef<number>(0);
    const touchEndY = useRef<number>(0);

    // Scroll effect
    useEffect(() => {
      if (!showOnScroll) return;

      const handleScroll = () => {
        setIsScrolled(window.scrollY > 10);
      };

      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }, [showOnScroll]);

    // Close mobile menu on escape and outside click
    useEffect(() => {
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setIsMobileMenuOpen(false);
          setActiveDropdown(null);
        }
      };

      const handleOutsideClick = (e: MouseEvent) => {
        if (
          mobileMenuRef.current && 
          !mobileMenuRef.current.contains(e.target as Node) &&
          hamburgerRef.current &&
          !hamburgerRef.current.contains(e.target as Node)
        ) {
          setIsMobileMenuOpen(false);
          setActiveDropdown(null);
        }
      };

      // Prevent body scroll when mobile menu is open
      if (isMobileMenuOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }

      document.addEventListener('keydown', handleEscape);
      document.addEventListener('mousedown', handleOutsideClick);
      
      return () => {
        document.removeEventListener('keydown', handleEscape);
        document.removeEventListener('mousedown', handleOutsideClick);
        document.body.style.overflow = '';
      };
    }, [isMobileMenuOpen]);

    // Close mobile menu when window is resized to desktop
    useEffect(() => {
      const handleResize = () => {
        if (window.innerWidth >= 1024) {
          setIsMobileMenuOpen(false);
          setActiveDropdown(null);
        }
      };

      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Swipe gesture handlers
    const handleTouchStart = useCallback((e: React.TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    }, []);

    const handleTouchMove = useCallback((e: React.TouchEvent) => {
      touchEndY.current = e.touches[0].clientY;
    }, []);

    const handleTouchEnd = useCallback(() => {
      if (!touchStartY.current || !touchEndY.current) return;
      
      const swipeDistance = touchStartY.current - touchEndY.current;
      const minSwipeDistance = 50;
      
      if (swipeDistance > minSwipeDistance && isMobileMenuOpen) {
        // Swipe up to close
        setIsMobileMenuOpen(false);
        setActiveDropdown(null);
      }
      
      touchStartY.current = 0;
      touchEndY.current = 0;
    }, [isMobileMenuOpen]);

    // Keyboard navigation for mobile menu
    const handleMobileMenuKeyDown = useCallback((e: React.KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMobileMenuOpen(false);
        setActiveDropdown(null);
      }
    }, []);

    const toggleMobileMenu = useCallback(() => {
      if (isAnimating) return;
      
      setIsAnimating(true);
      
      if (!isMobileMenuOpen) {
        // Close any other open mobile menus
        if (activeMobileMenuId && activeMobileMenuId !== navigationId) {
          const closeCallback = mobileMenuCallbacks.get(activeMobileMenuId);
          if (closeCallback) {
            closeCallback();
          }
        }
        
        // Open this menu
        activeMobileMenuId = navigationId;
        setIsMobileMenuOpen(true);
      } else {
        // Close this menu
        activeMobileMenuId = null;
        setIsMobileMenuOpen(false);
        setActiveDropdown(null);
      }
      
      // Reset animation flag after transition
      setTimeout(() => {
        setIsAnimating(false);
      }, 300);
    }, [isMobileMenuOpen, isAnimating, navigationId]);

    const closeMobileMenu = useCallback(() => {
      if (isAnimating) return;
      
      setIsAnimating(true);
      setIsMobileMenuOpen(false);
      setActiveDropdown(null);
      setMobileSearchQuery('');
      setActiveCategory(null);
      
      // Clear global state if this was the active menu
      if (activeMobileMenuId === navigationId) {
        activeMobileMenuId = null;
      }
      
      // Reset animation flag after transition
      setTimeout(() => {
        setIsAnimating(false);
      }, 300);
    }, [isAnimating, navigationId]);

    // Register/unregister close callback
    useEffect(() => {
      mobileMenuCallbacks.set(navigationId, closeMobileMenu);
      
      return () => {
        mobileMenuCallbacks.delete(navigationId);
        // Clean up global state if this was the active menu
        if (activeMobileMenuId === navigationId) {
          activeMobileMenuId = null;
        }
      };
    }, [navigationId, closeMobileMenu]);

    // Filter items based on search and category
    const filteredItems = useMemo(() => {
      let filtered = items;
      
      // Filter by search query
      if (mobileSearchQuery.trim()) {
        const query = mobileSearchQuery.toLowerCase();
        filtered = filtered.filter(item => 
          item.label.toLowerCase().includes(query) ||
          item.description?.toLowerCase().includes(query) ||
          item.children?.some(child => 
            child.label.toLowerCase().includes(query) ||
            child.description?.toLowerCase().includes(query)
          )
        );
      }
      
      // Filter by category
      if (activeCategory) {
        filtered = filtered.filter(item => item.category === activeCategory);
      }
      
      return filtered;
    }, [items, mobileSearchQuery, activeCategory]);

    // Get unique categories
    const categories = useMemo(() => {
      const cats = new Set<string>();
      items.forEach(item => {
        if (item.category) cats.add(item.category);
      });
      return Array.from(cats);
    }, [items]);

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
        'pointer-events-none': !isMobileMenuOpen && !isAnimating,
        'pointer-events-auto': isMobileMenuOpen || isAnimating,
      }
    );

    const mobileMenuOverlayClasses = cn(
      'absolute inset-0 bg-background-primary/90 backdrop-blur-md transition-all duration-300 ease-out',
      {
        'opacity-0': !isMobileMenuOpen,
        'opacity-100': isMobileMenuOpen,
      }
    );

    const mobileMenuContentClasses = cn(
      'absolute bottom-0 left-0 right-0 bg-surface-primary border-t border-border-primary transform transition-all duration-300 ease-out rounded-t-2xl max-h-[90vh] overflow-hidden min-h-[300px]',
      {
        'translate-y-full opacity-0 scale-95': !isMobileMenuOpen,
        'translate-y-0 opacity-100 scale-100': isMobileMenuOpen,
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
              <div className="hidden group-hover:block absolute top-full left-0 mt-2 w-48 bg-surface-primary border border-border-primary rounded-lg shadow-lg z-10">
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
                        onClick={closeMobileMenu}
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

    // Enhanced mobile menu item renderer
    const renderEnhancedMobileItem = useCallback((item: NavigationItem, index: number) => {
      const hasChildren = item.children && item.children.length > 0;
      const isActive = activeDropdown === item.label;
      const isCurrentPage = currentPath === item.href;
      
      return (
        <div key={index} className="relative">
          {hasChildren ? (
            <div className="relative">
              <button
                className={cn(
                  'flex items-center justify-between w-full px-4 py-3 rounded-lg transition-all duration-200 min-h-[44px] group',
                  'text-text-secondary hover:text-text-primary',
                  'hover:bg-surface-secondary/50 focus:outline-none focus:ring-2 focus:ring-brand-primary/20',
                  {
                    'bg-brand-primary/10 text-brand-primary': isCurrentPage,
                    'bg-surface-secondary/30': isActive,
                  }
                )}
                onClick={() => setActiveDropdown(isActive ? null : item.label)}
                aria-expanded={isActive}
              >
                <div className="flex items-center space-x-3">
                  {item.icon && (
                    <div className="w-5 h-5 text-text-tertiary group-hover:text-text-secondary transition-colors">
                      {item.icon}
                    </div>
                  )}
                  <div className="text-left">
                    <div className="font-medium flex items-center space-x-2">
                      <span>{item.label}</span>
                      {item.badge && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-brand-primary/20 text-brand-primary">
                          {item.badge}
                        </span>
                      )}
                    </div>
                    {item.description && (
                      <div className="text-xs text-text-tertiary mt-0.5">
                        {item.description}
                      </div>
                    )}
                  </div>
                </div>
                <svg
                  className={cn(
                    'w-4 h-4 transition-transform duration-200 text-text-tertiary',
                    { 'rotate-180': isActive }
                  )}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Enhanced Mobile Dropdown */}
              <div className={cn(
                'overflow-hidden transition-all duration-300 ease-out',
                {
                  'max-h-0 opacity-0': !isActive,
                  'max-h-96 opacity-100': isActive,
                }
              )}>
                <div className="mt-2 ml-4 bg-surface-secondary/50 border border-border-primary rounded-lg shadow-sm">
                  <div className="py-2">
                    {item.children?.map((child, childIndex) => (
                      <Link
                        key={childIndex}
                        href={child.href}
                        className={cn(
                          'flex items-center px-4 py-2 text-sm transition-colors duration-200',
                          'text-text-secondary hover:text-text-primary hover:bg-surface-tertiary/50',
                          {
                            'bg-brand-primary/10 text-brand-primary': currentPath === child.href,
                          }
                        )}
                        onClick={closeMobileMenu}
                      >
                        {child.icon && (
                          <div className="w-4 h-4 mr-3 text-text-tertiary">
                            {child.icon}
                          </div>
                        )}
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <span>{child.label}</span>
                            {child.badge && (
                              <span className="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-brand-primary/20 text-brand-primary">
                                {child.badge}
                              </span>
                            )}
                          </div>
                          {child.description && (
                            <div className="text-xs text-text-tertiary mt-0.5">
                              {child.description}
                            </div>
                          )}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            item.onClick ? (
              <button
                onClick={() => {
                  item.onClick?.();
                  closeMobileMenu();
                }}
                className={cn(
                  'w-full text-left px-4 py-3 rounded-lg transition-all duration-200 min-h-[44px] flex items-center space-x-3 group',
                  'text-text-secondary hover:text-text-primary hover:bg-surface-secondary/50',
                  'focus:outline-none focus:ring-2 focus:ring-brand-primary/20',
                  {
                    'bg-brand-primary/10 text-brand-primary': isCurrentPage,
                  }
                )}
              >
                {item.icon && (
                  <div className="w-5 h-5 text-text-tertiary group-hover:text-text-secondary transition-colors">
                    {item.icon}
                  </div>
                )}
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">{item.label}</span>
                    {item.badge && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-brand-primary/20 text-brand-primary">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  {item.description && (
                    <div className="text-xs text-text-tertiary mt-0.5">
                      {item.description}
                    </div>
                  )}
                </div>
              </button>
            ) : (
              <Link
                href={item.href}
                className={cn(
                  'block px-4 py-3 rounded-lg transition-all duration-200 min-h-[44px] flex items-center space-x-3 group',
                  'text-text-secondary hover:text-text-primary hover:bg-surface-secondary/50',
                  'focus:outline-none focus:ring-2 focus:ring-brand-primary/20',
                  {
                    'bg-brand-primary/10 text-brand-primary': isCurrentPage,
                  }
                )}
                target={item.external ? '_blank' : undefined}
                rel={item.external ? 'noopener noreferrer' : undefined}
                onClick={closeMobileMenu}
              >
                {item.icon && (
                  <div className="w-5 h-5 text-text-tertiary group-hover:text-text-secondary transition-colors flex-shrink-0">
                    {item.icon}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium truncate">{item.label}</span>
                    {item.badge && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-brand-primary/20 text-brand-primary flex-shrink-0">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  {item.description && (
                    <div className="text-xs text-text-tertiary mt-0.5 truncate">
                      {item.description}
                    </div>
                  )}
                </div>
                {item.external && (
                  <svg className="w-4 h-4 text-text-tertiary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                )}
              </Link>
            )
          )}
        </div>
      );
    }, [activeDropdown, currentPath, closeMobileMenu]);

    // Memoized mobile menu items
    const mobileMenuItems = useMemo(() => {
      return filteredItems.map((item, index) => renderEnhancedMobileItem(item, index));
    }, [filteredItems, renderEnhancedMobileItem]);

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
                  <Image src={logo.image} alt={logo.text || 'Logo'} width={32} height={32} className="h-8 w-auto" />
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
                actions.secondary.href ? (
                  <Link href={actions.secondary.href}>
                    <Button
                      variant="ghost"
                      size={size === 'sm' ? 'sm' : 'md'}
                      onClick={actions.secondary.onClick}
                    >
                      {actions.secondary.label}
                    </Button>
                  </Link>
                ) : (
                  <Button
                    variant="ghost"
                    size={size === 'sm' ? 'sm' : 'md'}
                    onClick={actions.secondary.onClick}
                  >
                    {actions.secondary.label}
                  </Button>
                )
              )}
              {actions?.primary && (
                actions.primary.href ? (
                  <Link href={actions.primary.href}>
                    <Button
                      variant="primary"
                      size={size === 'sm' ? 'sm' : 'md'}
                      onClick={actions.primary.onClick}
                    >
                      {actions.primary.label}
                    </Button>
                  </Link>
                ) : (
                  <Button
                    variant="primary"
                    size={size === 'sm' ? 'sm' : 'md'}
                    onClick={actions.primary.onClick}
                  >
                    {actions.primary.label}
                  </Button>
                )
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              ref={hamburgerRef}
              className="lg:hidden p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-surface-secondary/50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-brand-primary/20"
              onClick={toggleMobileMenu}
              aria-label={isMobileMenuOpen ? "Close mobile menu" : "Open mobile menu"}
              aria-expanded={isMobileMenuOpen}
              disabled={isAnimating}
            >
              <svg
                className="w-6 h-6 transition-transform duration-200"
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

        {/* Mobile Menu - Only render if this menu is open */}
        {isMobileMenuOpen && (
          <div className={mobileMenuClasses}>
          <div
            className={mobileMenuOverlayClasses}
            onClick={closeMobileMenu}
          />
          <div 
            ref={mobileMenuRef} 
            className={mobileMenuContentClasses}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onKeyDown={handleMobileMenuKeyDown}
            tabIndex={isMobileMenuOpen ? 0 : -1}
          >
            <div className="flex flex-col h-full">
              {/* Mobile Menu Header */}
              <div className="flex items-center justify-between p-6 border-b border-border-primary bg-surface-primary">
                {/* Drag Handle */}
                <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-border-primary rounded-full opacity-60"></div>
                
                <div className={logoClasses}>
                  {React.isValidElement(logo) ? (
                    logo
                  ) : logo && typeof logo === 'object' && logo !== null && 'image' in logo && typeof logo.image === 'string' && logo.image ? (
                    <Image src={logo.image} alt={logo.text || 'Logo'} width={32} height={32} className="h-8 w-auto" />
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
                  className="p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-surface-secondary/50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-brand-primary/20"
                  onClick={closeMobileMenu}
                  aria-label="Close mobile menu"
                  disabled={isAnimating}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Mobile Menu Items */}
              <div className="flex-1 overflow-y-auto p-6 min-h-0">
                {/* Search Bar */}
                {enableMobileSearch && (
                  <div className="mb-4">
                    <div className="relative">
                      <input
                        ref={searchInputRef}
                        type="text"
                        placeholder="메뉴 검색..."
                        value={mobileSearchQuery}
                        onChange={(e) => setMobileSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-surface-secondary border border-border-primary rounded-lg text-text-primary placeholder-text-tertiary focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary"
                      />
                      <svg 
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text-tertiary"
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                      {mobileSearchQuery && (
                        <button
                          onClick={() => setMobileSearchQuery('')}
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 text-text-tertiary hover:text-text-secondary"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      )}
                    </div>
                  </div>
                )}

                {/* Category Filter */}
                {mobileMenuVariant === 'categorized' && categories.length > 0 && (
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => setActiveCategory(null)}
                        className={cn(
                          'px-3 py-1.5 rounded-full text-sm font-medium transition-colors',
                          {
                            'bg-brand-primary text-white': !activeCategory,
                            'bg-surface-secondary text-text-secondary hover:bg-surface-tertiary': activeCategory,
                          }
                        )}
                      >
                        전체
                      </button>
                      {categories.map((category) => (
                        <button
                          key={category}
                          onClick={() => setActiveCategory(category)}
                          className={cn(
                            'px-3 py-1.5 rounded-full text-sm font-medium transition-colors',
                            {
                              'bg-brand-primary text-white': activeCategory === category,
                              'bg-surface-secondary text-text-secondary hover:bg-surface-tertiary': activeCategory !== category,
                            }
                          )}
                        >
                          {category}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Menu Items */}
                <div className="space-y-2 pb-4">
                  {mobileMenuItems.length > 0 ? (
                    mobileMenuItems
                  ) : (
                    <div className="text-center py-8 text-text-tertiary">
                      <svg className="w-12 h-12 mx-auto mb-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                      <p className="text-sm">검색 결과가 없습니다</p>
                      {mobileSearchQuery && (
                        <button
                          onClick={() => setMobileSearchQuery('')}
                          className="mt-2 text-xs text-brand-primary hover:underline"
                        >
                          검색 초기화
                        </button>
                      )}
                    </div>
                  )}
                </div>
                
                {/* Debug: Enhanced info */}
                {process.env.NODE_ENV === 'development' && (
                  <div className="mt-4 p-2 bg-surface-secondary rounded text-xs text-text-tertiary">
                    메뉴 아이템 수: {items.length}개 (필터링됨: {filteredItems.length}개)
                    <br />
                    메뉴 상태: {isMobileMenuOpen ? '열림' : '닫힘'}
                    <br />
                    애니메이션 상태: {isAnimating ? '진행중' : '완료'}
                    <br />
                    검색어: &quot;{mobileSearchQuery}&quot;
                    <br />
                    활성 카테고리: {activeCategory || '없음'}
                    <br />
                    메뉴 변형: {mobileMenuVariant}
                  </div>
                )}
              </div>

              {/* Mobile Menu Actions */}
              {actions && (
                <div className="p-6 border-t border-border-primary space-y-3 bg-surface-primary">
                  {actions.secondary && (
                    actions.secondary.href ? (
                      <Link
                        href={actions.secondary.href}
                        className="w-full block"
                      >
                        <Button
                          variant="ghost"
                          fullWidth
                          onClick={() => {
                            actions.secondary?.onClick?.();
                            closeMobileMenu();
                          }}
                        >
                          {actions.secondary.label}
                        </Button>
                      </Link>
                    ) : (
                      <Button
                        variant="ghost"
                        fullWidth
                        onClick={() => {
                          actions.secondary?.onClick?.();
                          closeMobileMenu();
                        }}
                      >
                        {actions.secondary.label}
                      </Button>
                    )
                  )}
                  {actions.primary && (
                    actions.primary.href ? (
                      <Link
                        href={actions.primary.href}
                        className="w-full block"
                      >
                        <Button
                          fullWidth
                          onClick={() => {
                            actions.primary?.onClick?.();
                            closeMobileMenu();
                          }}
                        >
                          {actions.primary.label}
                        </Button>
                      </Link>
                    ) : (
                      <Button
                        fullWidth
                        onClick={() => {
                          actions.primary?.onClick?.();
                          closeMobileMenu();
                        }}
                      >
                        {actions.primary.label}
                      </Button>
                    )
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