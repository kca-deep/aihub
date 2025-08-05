'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  Heading, 
  Text,
  Button,
  Alert,
  AlertDescription
} from '@/components/ui';
import { cn } from '@/lib/utils';
import { Project, PROJECT_STATUSES } from '@/types/project';
import { AIImageGenerator } from '@/components/ui';

interface ProjectCardProps {
  project: Project;
  onEdit?: (project: Project) => void;
  onDelete?: (project: Project) => void;
  onView?: (project: Project) => void;
  onImageGenerated?: (projectId: string, imageUrl: string) => void;
  showActions?: boolean;
  variant?: 'default' | 'compact' | 'detailed';
  className?: string;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onEdit,
  onDelete,
  onView,
  onImageGenerated,
  showActions = false,
  variant = 'default',
  className
}) => {
  const [showImageGenerator, setShowImageGenerator] = useState(false);
  const [imageGenerationError, setImageGenerationError] = useState<string | null>(null);

  const status = PROJECT_STATUSES.find(s => s.id === project.status.id);
  
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'text-red-500';
      case 'high': return 'text-orange-500';
      case 'medium': return 'text-yellow-500';
      case 'low': return 'text-green-500';
      default: return 'text-gray-500';
    }
  };

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case 'critical': return '긴급';
      case 'high': return '높음';
      case 'medium': return '보통';
      case 'low': return '낮음';
      default: return '보통';
    }
  };

  const handleImageGenerated = (imageUrl: string) => {
    onImageGenerated?.(project.id, imageUrl);
    setShowImageGenerator(false);
    setImageGenerationError(null);
  };

  const handleImageGenerationError = (error: string) => {
    setImageGenerationError(error);
    console.error('Image generation error:', error);
  };

  const handleImageGenerationLoading = (isLoading: boolean) => {
    // 로딩 상태 처리 (필요시)
  };

  const hasImage = project.image && project.image !== '';

  if (variant === 'compact') {
    return (
      <Card 
        variant="elevated" 
        hoverable 
        clickable 
        className={cn("h-full group", className)}
        onClick={() => onView?.(project)}
      >
        <CardContent className="p-4">
          <div className="flex items-start justify-between mb-3">
            <Heading as="h3" className="text-base font-semibold line-clamp-2 group-hover:text-brand-primary transition-colors">
              {project.title}
            </Heading>
            <div className="flex items-center space-x-2 ml-2">
              <span 
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{ backgroundColor: status?.color }}
              />
              <span className={cn("text-xs font-medium", getPriorityColor(project.priority))}>
                {getPriorityLabel(project.priority)}
              </span>
            </div>
          </div>
          
          <Text size="small" className="text-text-secondary mb-3 line-clamp-2">
            {project.description}
          </Text>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="flex -space-x-1">
                {project.members.slice(0, 3).map((member, i) => (
                  <div 
                    key={i}
                    className="w-5 h-5 bg-brand-primary rounded-full border border-background-secondary"
                    title={member.name}
                  />
                ))}
                {project.members.length > 3 && (
                  <div className="w-5 h-5 bg-surface-tertiary rounded-full border border-background-secondary flex items-center justify-center">
                    <span className="text-xs font-medium">+{project.members.length - 3}</span>
                  </div>
                )}
              </div>
              <Text size="small" className="text-text-tertiary">
                {project.members.length}명
              </Text>
            </div>
            
            <div className="text-right">
              <Text size="small" className="text-brand-primary font-medium">
                {project.progress}%
              </Text>
              <div className="w-12 h-1 bg-surface-tertiary rounded-full overflow-hidden">
                <div 
                  className="h-full bg-brand-primary rounded-full transition-all duration-500"
                  style={{ width: `${project.progress}%` }}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card 
        variant="elevated" 
        hoverable 
        clickable 
        className={cn("h-full group", className)}
        onClick={() => onView?.(project)}
      >
        <CardHeader>
          <div className="relative mb-4">
            <div className="w-full h-48 bg-surface-secondary rounded-lg overflow-hidden">
              {hasImage ? (
                <Image 
                  src={project.image!} 
                  alt={project.title}
                  width={400}
                  height={300}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop';
                  }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-brand-primary/20 to-brand-secondary/20">
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
            </div>
            
            {/* 상태 및 우선순위 배지 */}
            <div className="absolute top-3 right-3 flex space-x-2">
              <div 
                className="px-2 py-1 rounded text-xs font-medium text-white"
                style={{ backgroundColor: status?.color }}
              >
                {status?.name}
              </div>
              <div className={cn("px-2 py-1 bg-background-primary rounded text-xs font-medium", getPriorityColor(project.priority))}>
                {getPriorityLabel(project.priority)}
              </div>
            </div>
            
            <div className="absolute top-3 left-3 bg-brand-primary text-white px-2 py-1 rounded text-xs font-medium">
              {project.teamName}
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
          
          <Heading as="h3" className="mb-2 group-hover:text-brand-primary transition-colors">
            {project.title}
          </Heading>
          <Text size="medium" className="text-text-secondary mb-4 line-clamp-3">
            {project.description}
          </Text>
        </CardHeader>
        
        <CardContent>
          {/* 기술 스택 */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.techStack.slice(0, 4).map((tech) => (
              <span 
                key={tech.id}
                className="inline-flex items-center px-2 py-1 bg-surface-tertiary text-text-secondary text-xs rounded"
              >
                <span 
                  className="w-2 h-2 rounded-full mr-1"
                  style={{ backgroundColor: tech.color }}
                />
                {tech.name}
              </span>
            ))}
            {project.techStack.length > 4 && (
              <span className="px-2 py-1 bg-surface-tertiary text-text-secondary text-xs rounded">
                +{project.techStack.length - 4}
              </span>
            )}
          </div>
          
          {/* 팀 정보 및 진행률 */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <div className="flex -space-x-2">
                {project.members.slice(0, 4).map((member, i) => (
                  <div 
                    key={i}
                    className="w-6 h-6 bg-brand-primary rounded-full border-2 border-background-secondary"
                    title={`${member.name} (${member.role})`}
                  />
                ))}
                {project.members.length > 4 && (
                  <div className="w-6 h-6 bg-surface-tertiary rounded-full border-2 border-background-secondary flex items-center justify-center">
                    <span className="text-xs font-medium">+{project.members.length - 4}</span>
                  </div>
                )}
              </div>
              <Text size="small" className="text-text-tertiary">
                {project.members.length}명
              </Text>
            </div>
            
            <div className="text-right">
              <Text size="small" className="text-brand-primary font-medium mb-1">
                {project.progress}%
              </Text>
              <div className="w-16 h-2 bg-surface-tertiary rounded-full overflow-hidden">
                <div 
                  className="h-full rounded-full transition-all duration-500"
                  style={{ 
                    width: `${project.progress}%`,
                    backgroundColor: status?.color
                  }}
                />
              </div>
            </div>
          </div>
          
          {/* 기대 효과 */}
          <div className="p-3 bg-surface-primary rounded-lg mb-4">
            <Text size="small" className="text-text-secondary">
              <span className="text-brand-primary font-medium">Impact:</span> {project.expectedImpact.description}
            </Text>
            
            {project.expectedImpact.metrics.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {project.expectedImpact.metrics.slice(0, 2).map((metric, index) => (
                  <span key={index} className="text-xs text-brand-primary font-medium">
                    {metric.label}: {metric.value}{metric.unit}
                  </span>
                ))}
              </div>
            )}
          </div>
          
          {/* 날짜 정보 */}
          <div className="flex justify-between text-xs text-text-tertiary mb-4">
            <span>시작: {new Date(project.startDate).toLocaleDateString()}</span>
            {project.endDate && (
              <span>종료: {new Date(project.endDate).toLocaleDateString()}</span>
            )}
          </div>
          
          {/* 액션 버튼 */}
          {showActions && (
            <div className="flex justify-end space-x-2 pt-4 border-t border-border-primary">
              {onEdit && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit(project);
                  }}
                >
                  수정
                </Button>
              )}
              {onDelete && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (confirm('정말 삭제하시겠습니까?')) {
                      onDelete(project);
                    }
                  }}
                  className="text-red-500 hover:text-red-700"
                >
                  삭제
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>

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
              <Heading as="h3">AI 이미지 생성 - {project.title}</Heading>
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  (e.nativeEvent as Event).stopImmediatePropagation();
                  setShowImageGenerator(false);
                  setImageGenerationError(null);
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
            
            {imageGenerationError && (
              <Alert variant="error" className="mb-4">
                <AlertDescription>{imageGenerationError}</AlertDescription>
              </Alert>
            )}
            
            <AIImageGenerator
              type="project"
              title={project.title}
              description={project.description}
              techStack={project.techStack.map(tech => tech.name)}
              onImageGenerated={handleImageGenerated}
              onError={handleImageGenerationError}
              onLoadingChange={handleImageGenerationLoading}
              className="w-full"
            />
          </div>
        </div>
      )}
    </>
  );
};