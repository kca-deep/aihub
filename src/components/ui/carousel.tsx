'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { cn } from '@/lib/utils';

export interface CarouselItem {
  id: string;
  content: React.ReactNode;
  title?: string;
  description?: string;
}

export interface CarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  items: CarouselItem[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showDots?: boolean;
  showArrows?: boolean;
  showIndicators?: boolean;
  loop?: boolean;
  pauseOnHover?: boolean;
  variant?: 'default' | 'cards' | 'minimal';
  size?: 'sm' | 'md' | 'lg';
}

export const Carousel = React.forwardRef<HTMLDivElement, CarouselProps>(
  ({ 
    className, 
    items,
    autoPlay = false,
    autoPlayInterval = 5000,
    showDots = true,
    showArrows = true,
    showIndicators = true,
    loop = true,
    pauseOnHover = true,
    variant = 'default',
    size = 'md',
    ...props 
  }, ref) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    const nextSlide = useCallback(() => {
      setCurrentIndex((prevIndex) => {
        if (prevIndex === items.length - 1) {
          return loop ? 0 : prevIndex;
        }
        return prevIndex + 1;
      });
    }, [items.length, loop]);

    const prevSlide = useCallback(() => {
      setCurrentIndex((prevIndex) => {
        if (prevIndex === 0) {
          return loop ? items.length - 1 : prevIndex;
        }
        return prevIndex - 1;
      });
    }, [items.length, loop]);

    const goToSlide = useCallback((index: number) => {
      setCurrentIndex(index);
    }, []);

    // Auto-play functionality
    useEffect(() => {
      if (!autoPlay || isPaused) return;

      const interval = setInterval(() => {
        nextSlide();
      }, autoPlayInterval);

      return () => clearInterval(interval);
    }, [autoPlay, autoPlayInterval, isPaused, nextSlide]);

    const handleMouseEnter = () => {
      if (pauseOnHover) setIsPaused(true);
    };

    const handleMouseLeave = () => {
      if (pauseOnHover) setIsPaused(false);
    };

    const baseClasses = cn(
      'relative overflow-hidden',
      {
        'h-64': size === 'sm',
        'h-80': size === 'md',
        'h-96': size === 'lg',
      },
      className
    );

    const containerClasses = cn(
      'flex transition-transform duration-500 ease-out h-full',
      {
        'gap-4': variant === 'cards',
      }
    );

    const slideClasses = cn(
      'flex-shrink-0 transition-all duration-300',
      {
        'w-full': variant === 'default' || variant === 'minimal',
        'w-80': variant === 'cards',
      }
    );

    const arrowClasses = cn(
      'absolute top-1/2 -translate-y-1/2 z-10 p-2 rounded-full',
      'bg-surface-primary/80 backdrop-blur-sm border border-border-primary/50',
      'text-text-primary hover:text-brand-primary transition-colors duration-200',
      'hover:bg-surface-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/50',
      'disabled:opacity-50 disabled:cursor-not-allowed'
    );

    const dotClasses = cn(
      'w-2 h-2 rounded-full transition-all duration-200',
      'bg-surface-tertiary hover:bg-text-tertiary cursor-pointer'
    );

    const activeDotClasses = cn(
      'w-2 h-2 rounded-full transition-all duration-200',
      'bg-brand-primary'
    );

    return (
      <div 
        ref={ref} 
        className={baseClasses}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        {/* Carousel Container */}
        <div 
          className={containerClasses}
          style={{ 
            transform: `translateX(-${currentIndex * 100}%)`,
            width: `${items.length * 100}%`
          }}
        >
          {items.map((item, index) => (
            <div key={item.id} className={slideClasses}>
              {item.content}
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        {showArrows && items.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              className={cn(arrowClasses, 'left-4')}
              disabled={!loop && currentIndex === 0}
              aria-label="Previous slide"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={nextSlide}
              className={cn(arrowClasses, 'right-4')}
              disabled={!loop && currentIndex === items.length - 1}
              aria-label="Next slide"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}

        {/* Dots Indicator */}
        {showDots && items.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {items.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={index === currentIndex ? activeDotClasses : dotClasses}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}

        {/* Slide Counter */}
        {showIndicators && items.length > 1 && (
          <div className="absolute top-4 right-4 z-10">
            <span className="px-2 py-1 rounded-full text-xs font-medium bg-surface-primary/80 backdrop-blur-sm border border-border-primary/50 text-text-secondary">
              {currentIndex + 1} / {items.length}
            </span>
          </div>
        )}
      </div>
    );
  }
);

Carousel.displayName = 'Carousel'; 