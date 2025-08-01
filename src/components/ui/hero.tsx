import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Button } from './button';
import { Heading, Text } from './typography';
import { Badge } from './badge';

export type HeroVariant = 'centered' | 'left' | 'right' | 'split';
export type HeroSize = 'sm' | 'md' | 'lg' | 'xl';

export interface HeroAction {
  label: string;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'default' | 'large';
}

export interface HeroBadge {
  text: string;
  variant?: 'default' | 'brand' | 'success' | 'warning' | 'error' | 'outline';
}

export interface HeroStat {
  value: string;
  label: string;
}

export interface HeroProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: HeroVariant;
  size?: HeroSize;
  title: string;
  subtitle?: string;
  description?: string;
  primaryAction?: HeroAction;
  secondaryAction?: HeroAction;
  badge?: HeroBadge;
  stats?: HeroStat[];
  backgroundVideo?: {
    src: string | string[];
    poster?: string;
    muted?: boolean;
    loop?: boolean;
    autoplay?: boolean;
    crossfade?: boolean;
    interval?: number;
  };
  backgroundImage?: string;
  overlay?: boolean;
  overlayOpacity?: number;
}

export const Hero = React.forwardRef<HTMLDivElement, HeroProps>(
  ({
    className,
    variant = 'centered',
    size = 'md',
    title,
    subtitle,
    description,
    primaryAction,
    secondaryAction,
    badge,
    stats,
    backgroundVideo,
    backgroundImage,
    overlay = false,
    overlayOpacity = 0.3,
    ...props
  }, ref) => {
    const [videoLoaded, setVideoLoaded] = React.useState(false);
    const [videoError, setVideoError] = React.useState(false);
    const [currentVideoIndex, setCurrentVideoIndex] = React.useState(0);
    const videoRef = React.useRef<HTMLVideoElement>(null);
    
    // 여러 비디오 처리
    const videoSources = Array.isArray(backgroundVideo?.src) 
      ? backgroundVideo.src 
      : [backgroundVideo?.src].filter(Boolean);
    
    const currentVideoSrc = videoSources[currentVideoIndex];

    // 비디오 소스 변경 시 재로드
    React.useEffect(() => {
      if (videoRef.current && currentVideoSrc) {
        const video = videoRef.current;
        video.src = currentVideoSrc;
        video.load();
        setVideoLoaded(false);
        setVideoError(false);
      }
    }, [currentVideoIndex, currentVideoSrc]);

    // 비디오 로드 후 재생 보장
    React.useEffect(() => {
      if (videoLoaded && videoRef.current) {
        const video = videoRef.current;
        video.play().catch(() => {
          // 자동 재생이 실패하면 사용자 상호작용 후 재생
          const handleUserInteraction = () => {
            video.play().catch(() => {});
            document.removeEventListener('click', handleUserInteraction);
            document.removeEventListener('keydown', handleUserInteraction);
          };
          document.addEventListener('click', handleUserInteraction);
          document.addEventListener('keydown', handleUserInteraction);
        });
      }
    }, [videoLoaded]);
    const containerClasses = cn(
      'relative overflow-hidden',
      {
        'min-h-[60vh]': size === 'sm',
        'min-h-[70vh]': size === 'md',
        'min-h-[80vh]': size === 'lg',
        'min-h-[90vh]': size === 'xl',
      },
      className
    );

    const contentClasses = cn(
      'relative z-20 flex flex-col justify-center',
      {
        'items-center text-center': variant === 'centered',
        'items-start text-left': variant === 'left',
        'items-end text-right': variant === 'right',
        'items-center text-center lg:items-start lg:text-left': variant === 'split',
      },
      {
        'min-h-[60vh]': size === 'sm',
        'min-h-[70vh]': size === 'md',
        'min-h-[80vh]': size === 'lg',
        'min-h-[90vh]': size === 'xl',
      }
    );

    const contentContainerClasses = cn(
      'container-linear',
      {
        'max-w-4xl': variant === 'centered',
        'max-w-3xl': variant === 'left' || variant === 'right',
        'max-w-6xl': variant === 'split',
      }
    );

    const titleClasses = cn(
      'font-bold tracking-tight',
      {
        'text-3xl md:text-4xl lg:text-5xl': size === 'sm',
        'text-4xl md:text-5xl lg:text-6xl': size === 'md',
        'text-5xl md:text-6xl lg:text-7xl': size === 'lg',
        'text-6xl md:text-7xl lg:text-8xl': size === 'xl',
      }
    );

    const subtitleClasses = cn(
      'text-text-secondary',
      {
        'text-lg md:text-xl': size === 'sm',
        'text-xl md:text-2xl': size === 'md',
        'text-2xl md:text-3xl': size === 'lg',
        'text-3xl md:text-4xl': size === 'xl',
      }
    );

    const descriptionClasses = cn(
      'text-text-secondary mt-4',
      {
        'text-base md:text-lg max-w-2xl': size === 'sm',
        'text-lg md:text-xl max-w-3xl': size === 'md',
        'text-xl md:text-2xl max-w-4xl': size === 'lg',
        'text-2xl md:text-3xl max-w-5xl': size === 'xl',
      }
    );

    const actionsClasses = cn(
      'flex flex-col sm:flex-row gap-4 mt-8',
      {
        'justify-center': variant === 'centered',
        'justify-start': variant === 'left',
        'justify-end': variant === 'right',
        'justify-center lg:justify-start': variant === 'split',
      }
    );

    const statsClasses = cn(
      'grid grid-cols-1 sm:grid-cols-3 gap-8 mt-12',
      {
        'max-w-2xl mx-auto': variant === 'centered',
        'max-w-2xl': variant === 'left' || variant === 'right',
        'max-w-3xl mx-auto lg:mx-0': variant === 'split',
      }
    );

    return (
      <div ref={ref} className={containerClasses} {...props}>
        {/* Background Video */}
        {backgroundVideo && (
          <div className="absolute inset-0 w-full h-full z-0">
                         <video
               ref={videoRef}
               className="w-full h-full object-cover"
               src={currentVideoSrc}
               poster={backgroundVideo.poster}
               muted={backgroundVideo.muted ?? true}
               loop={false}
               autoPlay={backgroundVideo.autoplay ?? true}
               playsInline
               preload="metadata"
               onLoadedData={() => setVideoLoaded(true)}
               onError={() => setVideoError(true)}
                             onEnded={(e) => {
                 // 비디오가 끝나면 다음 비디오로 전환
                 if (videoSources.length > 1) {
                   setCurrentVideoIndex((prevIndex) => 
                     (prevIndex + 1) % videoSources.length
                   );
                 } else {
                   // 단일 비디오인 경우 다시 재생
                   const video = e.target as HTMLVideoElement;
                   if (video) {
                     video.currentTime = 0;
                     video.play().catch(() => {
                       setTimeout(() => {
                         video.play().catch(() => {});
                       }, 100);
                     });
                   }
                 }
               }}
            />
          </div>
        )}

        {/* Background Image */}
        {(backgroundImage && !backgroundVideo) || (backgroundVideo && videoError) && (
          <div 
            className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat z-0"
            style={{ backgroundImage: `url(${backgroundImage || backgroundVideo?.poster})` }}
          />
        )}

        {/* Overlay */}
        {overlay && (
          <div 
            className="absolute inset-0 bg-background-primary z-10"
            style={{ opacity: overlayOpacity }}
          />
        )}

        {/* Content */}
        <div className={contentClasses}>
          <div className={contentContainerClasses}>
            {/* Badge */}
            {badge && (
              <div className="mb-6">
                <Badge variant={badge.variant || 'brand'} size="lg">
                  {badge.text}
                </Badge>
              </div>
            )}

            {/* Title */}
            <Heading as="h1" className={titleClasses}>
              {title}
            </Heading>

            {/* Subtitle */}
            {subtitle && (
              <Text className={subtitleClasses}>
                {subtitle}
              </Text>
            )}

            {/* Description */}
            {description && (
              <Text className={descriptionClasses}>
                {description}
              </Text>
            )}

            {/* Actions */}
            {(primaryAction || secondaryAction) && (
              <div className={actionsClasses}>
                {primaryAction && (
                  primaryAction.href ? (
                    <Link href={primaryAction.href}>
                      <Button
                        variant={primaryAction.variant || 'primary'}
                        size={primaryAction.size || 'large'}
                        onClick={primaryAction.onClick}
                      >
                        {primaryAction.label}
                      </Button>
                    </Link>
                  ) : (
                    <Button
                      variant={primaryAction.variant || 'primary'}
                      size={primaryAction.size || 'large'}
                      onClick={primaryAction.onClick}
                    >
                      {primaryAction.label}
                    </Button>
                  )
                )}
                {secondaryAction && (
                  secondaryAction.href ? (
                    <Link href={secondaryAction.href}>
                      <Button
                        variant={secondaryAction.variant || 'secondary'}
                        size={secondaryAction.size || 'large'}
                        onClick={secondaryAction.onClick}
                      >
                        {secondaryAction.label}
                      </Button>
                    </Link>
                  ) : (
                    <Button
                      variant={secondaryAction.variant || 'secondary'}
                      size={secondaryAction.size || 'large'}
                      onClick={secondaryAction.onClick}
                    >
                      {secondaryAction.label}
                    </Button>
                  )
                )}
              </div>
            )}

            {/* Stats */}
            {stats && stats.length > 0 && (
              <div className={statsClasses}>
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl font-bold text-brand-primary">
                      {stat.value}
                    </div>
                    <div className="text-sm text-text-secondary mt-1">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
);

Hero.displayName = 'Hero'; 