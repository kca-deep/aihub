import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export type ImageCardVariant = 'default' | 'elevated' | 'glass' | 'overlay';
export type ImageCardSize = 'sm' | 'md' | 'lg';

export interface ImageCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: ImageCardVariant;
  size?: ImageCardSize;
  image: {
    src: string;
    alt: string;
    width?: number;
    height?: number;
  };
  title?: string;
  description?: string;
  badge?: string;
  hoverable?: boolean;
  clickable?: boolean;
  overlay?: boolean;
  aspectRatio?: 'square' | 'video' | 'wide' | 'tall';
  loading?: 'lazy' | 'eager';
}

export const ImageCard = React.forwardRef<HTMLDivElement, ImageCardProps>(
  ({ 
    className, 
    variant = 'default', 
    size = 'md',
    image,
    title,
    description,
    badge,
    hoverable = false,
    clickable = false,
    overlay = false,
    aspectRatio = 'video',
    loading = 'lazy',
    ...props 
  }, ref) => {
    const baseClasses = cn(
      'relative overflow-hidden rounded-lg transition-all duration-300',
      {
        // Size variants
        'w-64 h-48': size === 'sm',
        'w-80 h-60': size === 'md',
        'w-96 h-72': size === 'lg',
        
        // Aspect ratio
        'aspect-square': aspectRatio === 'square',
        'aspect-video': aspectRatio === 'video',
        'aspect-[16/9]': aspectRatio === 'wide',
        'aspect-[4/5]': aspectRatio === 'tall',
        
        // Variants
        'bg-surface-primary border border-border-primary': variant === 'default',
        'bg-surface-primary shadow-linear-md border border-border-primary': variant === 'elevated',
        'bg-surface-primary/50 backdrop-blur-md border border-border-primary/50': variant === 'glass',
        'bg-surface-primary': variant === 'overlay',
        
        // Interactive states
        'hover:shadow-linear-lg hover:-translate-y-1': hoverable,
        'cursor-pointer': clickable,
      },
      className
    );

    const imageClasses = cn(
      'object-cover transition-transform duration-300',
      {
        'group-hover:scale-105': hoverable,
      }
    );

    const overlayClasses = cn(
      'absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent',
      'flex flex-col justify-end p-4'
    );

    return (
      <div 
        ref={ref} 
        className={cn(baseClasses, hoverable && 'group')} 
        {...props}
      >
        {/* Badge */}
        {badge && (
          <div className="absolute top-3 left-3 z-10">
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-brand-primary/20 text-brand-primary border border-brand-primary/30">
              {badge}
            </span>
          </div>
        )}

        {/* Image */}
        <div className="relative w-full h-full">
          <Image
            src={image.src}
            alt={image.alt}
            className={imageClasses}
            loading={loading}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>

        {/* Overlay with content */}
        {(overlay || title || description) && (
          <div className={overlay ? overlayClasses : 'absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent'}>
            {title && (
              <h3 className="text-text-primary font-semibold text-sm mb-1 line-clamp-2">
                {title}
              </h3>
            )}
            {description && (
              <p className="text-text-secondary text-xs line-clamp-2">
                {description}
              </p>
            )}
          </div>
        )}
      </div>
    );
  }
);

ImageCard.displayName = 'ImageCard'; 