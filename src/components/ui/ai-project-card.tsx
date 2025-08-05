'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Card, CardContent } from './card';
import { Heading, Text } from './typography';
import { Button } from './button';
import { AIProject } from '@/lib/ai-projects';
import { AIImageGenerator } from './ai-image-generator';

export interface AIProjectCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
  project: AIProject;
  variant?: 'default' | 'featured' | 'minimal';
  onClick?: (project: AIProject) => void;
  showTags?: boolean;
  showTeam?: boolean;
  showResults?: boolean;
  onImageGenerated?: (projectId: string, imageUrl: string) => void;
}

export const AIProjectCard = React.forwardRef<HTMLDivElement, AIProjectCardProps>(
  ({ 
    className, 
    project, 
    variant = 'default', 
    onClick,
    showTags = true,
    showTeam = false,
    showResults = false,
    onImageGenerated,
    ...props 
  }, ref) => {
    const [showImageGenerator, setShowImageGenerator] = useState(false);
    const [generatedImageUrl, setGeneratedImageUrl] = useState<string>('');
    const [imageGenerationError, setImageGenerationError] = useState<string | null>(null);

    const handleClick = () => {
      onClick?.(project);
    };

    const handleImageGenerated = (imageUrl: string) => {
      setGeneratedImageUrl(imageUrl);
      onImageGenerated?.(project.id, imageUrl);
      setShowImageGenerator(false);
      setImageGenerationError(null);
    };

    const handleImageGenerationError = (error: string) => {
      setImageGenerationError(error);
      console.error('Image generation error:', error);
    };

    const baseClasses = cn(
      'group relative overflow-hidden transition-all duration-300',
      'bg-surface-primary border border-border-primary rounded-lg',
      'hover:border-brand-primary/50 hover:shadow-lg',
      {
        'cursor-pointer': onClick,
        'ring-2 ring-brand-primary/20': project.featured && variant === 'featured',
      },
      className
    );

    const imageClasses = cn(
      'relative w-full transition-transform duration-300',
      {
        'h-48': variant === 'default',
        'h-64': variant === 'featured',
        'h-32': variant === 'minimal',
      }
    );

    const contentClasses = cn(
      'p-4',
      {
        'p-6': variant === 'featured',
        'p-3': variant === 'minimal',
      }
    );

    const getDifficultyColor = (difficulty: string) => {
      switch (difficulty) {
        case 'Beginner':
          return 'bg-green-500/20 text-green-400 border-green-500/30';
        case 'Intermediate':
          return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
        case 'Advanced':
          return 'bg-red-500/20 text-red-400 border-red-500/30';
        default:
          return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
      }
    };

    const getStatusColor = (status: string) => {
      switch (status) {
        case 'Completed':
          return 'bg-green-500/20 text-green-400 border-green-500/30';
        case 'In Progress':
          return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
        case 'Planning':
          return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
        default:
          return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
      }
    };

    const hasImage = project.thumbnail && project.thumbnail !== '';

    return (
      <Card ref={ref} className={baseClasses} onClick={handleClick} {...props}>
        {/* Featured Badge */}
        {project.featured && variant === 'featured' && (
          <div className="absolute top-3 left-3 z-10">
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-brand-primary/20 text-brand-primary border border-brand-primary/30">
              Featured
            </span>
          </div>
        )}

        {/* Thumbnail */}
        <div className={imageClasses}>
          {hasImage ? (
            <Image
              src={project.thumbnail}
              alt={project.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full bg-surface-secondary flex items-center justify-center">
              <div 
                className="text-center" 
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  (e.nativeEvent as Event).stopImmediatePropagation();
                }}
                onMouseDown={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  (e.nativeEvent as Event).stopImmediatePropagation();
                }}
                onMouseUp={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  (e.nativeEvent as Event).stopImmediatePropagation();
                }}
              >
                <div className="text-4xl mb-2">🎨</div>
                <Text size="small" className="text-text-secondary mb-2">
                  이미지 없음
                </Text>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    (e.nativeEvent as Event).stopImmediatePropagation();
                    setShowImageGenerator(true);
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    (e.nativeEvent as Event).stopImmediatePropagation();
                  }}
                  onMouseUp={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    (e.nativeEvent as Event).stopImmediatePropagation();
                  }}
                  className="text-xs"
                >
                  AI 이미지 생성
                </Button>
              </div>
            </div>
          )}
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          {/* Category Badge */}
          <div className="absolute top-3 right-3">
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-surface-primary/90 text-text-primary border border-border-primary">
              {project.category}
            </span>
          </div>

          {/* Difficulty Badge */}
          <div className="absolute bottom-3 left-3">
            <span className={cn(
              'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border',
              getDifficultyColor(project.difficulty)
            )}>
              {project.difficulty}
            </span>
          </div>

          {/* Status Badge */}
          <div className="absolute bottom-3 right-3">
            <span className={cn(
              'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border',
              getStatusColor(project.status)
            )}>
              {project.status}
            </span>
          </div>

          {/* AI 이미지 재생성 버튼 (이미지가 있을 때) */}
          {hasImage && (
            <div 
              className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200" 
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                (e.nativeEvent as Event).stopImmediatePropagation();
              }}
              onMouseDown={(e) => {
                e.preventDefault();
                e.stopPropagation();
                (e.nativeEvent as Event).stopImmediatePropagation();
              }}
              onMouseUp={(e) => {
                e.preventDefault();
                e.stopPropagation();
                (e.nativeEvent as Event).stopImmediatePropagation();
              }}
            >
              <Button
                variant="outline"
                size="sm"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  (e.nativeEvent as Event).stopImmediatePropagation();
                  setShowImageGenerator(true);
                }}
                onMouseDown={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  (e.nativeEvent as Event).stopImmediatePropagation();
                }}
                onMouseUp={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  (e.nativeEvent as Event).stopImmediatePropagation();
                }}
                className="bg-surface-primary/90 text-text-primary border-border-primary"
              >
                🎨 재생성
              </Button>
            </div>
          )}
        </div>

        {/* AI 이미지 생성기 모달 */}
        {showImageGenerator && (
          <div 
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" 
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              (e.nativeEvent as Event).stopImmediatePropagation();
            }}
            onMouseDown={(e) => {
              e.preventDefault();
              e.stopPropagation();
              (e.nativeEvent as Event).stopImmediatePropagation();
            }}
            onMouseUp={(e) => {
              e.preventDefault();
              e.stopPropagation();
              (e.nativeEvent as Event).stopImmediatePropagation();
            }}
          >
            <div 
              className="bg-surface-primary rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto" 
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                (e.nativeEvent as Event).stopImmediatePropagation();
              }}
              onMouseDown={(e) => {
                e.preventDefault();
                e.stopPropagation();
                (e.nativeEvent as Event).stopImmediatePropagation();
              }}
              onMouseUp={(e) => {
                e.preventDefault();
                e.stopPropagation();
                (e.nativeEvent as Event).stopImmediatePropagation();
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <Heading as="h3">AI 이미지 생성</Heading>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    (e.nativeEvent as Event).stopImmediatePropagation();
                    setShowImageGenerator(false);
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    (e.nativeEvent as Event).stopImmediatePropagation();
                  }}
                  onMouseUp={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    (e.nativeEvent as Event).stopImmediatePropagation();
                  }}
                >
                  ✕
                </Button>
              </div>
              
              <AIImageGenerator
                type="project"
                title={project.title}
                description={project.description}
                techStack={project.tags}
                onImageGenerated={handleImageGenerated}
                onError={handleImageGenerationError}
                className="w-full"
              />
            </div>
          </div>
        )}

        {/* Content */}
        <CardContent className={contentClasses}>
          {/* Title and Description */}
          <div className="space-y-2">
            <Heading as="h3" className="line-clamp-2 group-hover:text-brand-primary transition-colors duration-200">
              {project.title}
            </Heading>
            <Text color="secondary" className="line-clamp-2">
              {project.description}
            </Text>
          </div>

          {/* Tags */}
          {showTags && project.tags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1">
              {project.tags.slice(0, 3).map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-surface-secondary text-text-secondary border border-border-primary"
                >
                  {tag}
                </span>
              ))}
              {project.tags.length > 3 && (
                <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-surface-secondary text-text-secondary border border-border-primary">
                  +{project.tags.length - 3}
                </span>
              )}
            </div>
          )}

          {/* Team Members */}
          {showTeam && project.team.length > 0 && (
            <div className="mt-3">
              <Text size="small" color="secondary" className="mb-2">Team</Text>
              <div className="flex -space-x-2">
                {project.team.slice(0, 3).map((member, index) => (
                  <div key={index} className="relative">
                    {member.avatar ? (
                      <Image
                        src={member.avatar}
                        alt={member.name}
                        width={32}
                        height={32}
                        className="rounded-full border-2 border-surface-primary"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-surface-secondary border-2 border-surface-primary flex items-center justify-center">
                        <Text size="small" className="text-text-secondary">
                          {member.name.charAt(0)}
                        </Text>
                      </div>
                    )}
                  </div>
                ))}
                {project.team.length > 3 && (
                  <div className="w-8 h-8 rounded-full bg-surface-secondary border-2 border-surface-primary flex items-center justify-center">
                    <Text size="small" className="text-text-secondary">
                      +{project.team.length - 3}
                    </Text>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Results */}
          {showResults && project.results.length > 0 && (
            <div className="mt-3">
              <Text size="small" color="secondary" className="mb-2">Key Results</Text>
              <div className="grid grid-cols-3 gap-2">
                {project.results.slice(0, 3).map((result, index) => (
                  <div key={index} className="text-center">
                    <Text size="small" className="font-medium text-brand-primary">
                      {result.value}
                    </Text>
                    <Text size="small" color="secondary" className="line-clamp-1">
                      {result.metric}
                    </Text>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Button */}
          {variant !== 'minimal' && (
            <div className="mt-4">
              <Button 
                variant="ghost" 
                size="sm" 
                className="w-full group-hover:bg-brand-primary/10 group-hover:text-brand-primary"
              >
                자세히 보기
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    );
  }
);

AIProjectCard.displayName = 'AIProjectCard'; 