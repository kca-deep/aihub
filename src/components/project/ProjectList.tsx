'use client';

import React, { useState, useMemo } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  Button, 
  Input,
  Select,
  Heading,
  Text,
  Alert,
  AlertDescription
} from '@/components/ui';
import { cn } from '@/lib/utils';
import { Project, PROJECT_STATUSES, TECH_STACKS } from '@/types/project';
import { ProjectCard } from './ProjectCard';
import { AIImageGenerator } from '@/components/ui';

interface ProjectListProps {
  projects: Project[];
  onEdit?: (project: Project) => void;
  onDelete?: (project: Project) => void;
  onView?: (project: Project) => void;
  onAdd?: () => void;
  onImageGenerated?: (projectId: string, imageUrl: string) => void;
  isLoading?: boolean;
  showActions?: boolean;
  variant?: 'grid' | 'list' | 'compact';
  className?: string;
}

export const ProjectList: React.FC<ProjectListProps> = ({
  projects = [],
  onEdit,
  onDelete,
  onView,
  onAdd,
  onImageGenerated,
  isLoading = false,
  showActions = true,
  variant = 'grid',
  className
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [techFilter, setTechFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'title' | 'progress' | 'createdAt' | 'lastUpdated'>('lastUpdated');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [showImageGenerator, setShowImageGenerator] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [imageGenerationError, setImageGenerationError] = useState<string | null>(null);

  // 필터링 및 정렬된 프로젝트 목록
  const filteredAndSortedProjects = useMemo(() => {
    let filtered = projects.filter(project => {
      // 검색어 필터
      const matchesSearch = !searchQuery || 
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.teamName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.members.some(member => 
          member.name.toLowerCase().includes(searchQuery.toLowerCase())
        );

      // 상태 필터
      const matchesStatus = statusFilter === 'all' || project.status.id === statusFilter;

      // 우선순위 필터
      const matchesPriority = priorityFilter === 'all' || project.priority === priorityFilter;

      // 기술 스택 필터
      const matchesTech = techFilter === 'all' || 
        project.techStack.some(tech => tech.id === techFilter);

      return matchesSearch && matchesStatus && matchesPriority && matchesTech;
    });

    // 정렬
    filtered.sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'title':
          comparison = a.title.localeCompare(b.title);
          break;
        case 'progress':
          comparison = a.progress - b.progress;
          break;
        case 'createdAt':
          comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
          break;
        case 'lastUpdated':
          comparison = new Date(a.lastUpdated).getTime() - new Date(b.lastUpdated).getTime();
          break;
        default:
          return 0;
      }
      
      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return filtered;
  }, [projects, searchQuery, statusFilter, priorityFilter, techFilter, sortBy, sortOrder]);

  // 통계 정보
  const stats = useMemo(() => {
    const total = projects.length;
    const completed = projects.filter(p => p.progress === 100).length;
    const inProgress = projects.filter(p => p.progress > 0 && p.progress < 100).length;
    const notStarted = projects.filter(p => p.progress === 0).length;
    const avgProgress = total > 0 ? Math.round(projects.reduce((sum, p) => sum + p.progress, 0) / total) : 0;
    const projectsWithoutImage = projects.filter(p => !p.image || p.image === '').length;
    
    return {
      total,
      completed,
      inProgress,
      notStarted,
      avgProgress,
      projectsWithoutImage
    };
  }, [projects]);

  const getGridClasses = () => {
    switch (variant) {
      case 'compact':
        return 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4';
      case 'list':
        return 'space-y-4';
      default:
        return 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6';
    }
  };

  const handleImageGenerated = (imageUrl: string) => {
    if (selectedProject) {
      onImageGenerated?.(selectedProject.id, imageUrl);
      setShowImageGenerator(false);
      setSelectedProject(null);
      setImageGenerationError(null);
    }
  };

  const handleImageGenerationError = (error: string) => {
    setImageGenerationError(error);
    console.error('Image generation error:', error);
  };

  const handleImageGenerationLoading = (isLoading: boolean) => {
    // 로딩 상태 처리 (필요시)
  };

  const openImageGenerator = (project: Project) => {
    setSelectedProject(project);
    setShowImageGenerator(true);
    setImageGenerationError(null);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-pulse text-center">
          <div className="w-16 h-16 bg-surface-secondary rounded-full mx-auto mb-4"></div>
          <Text>프로젝트를 불러오는 중...</Text>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("space-y-6", className)}>
      {/* 헤더 및 통계 */}
      <Card variant="elevated">
        <CardHeader>
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <Heading as="h2" className="text-xl mb-2">
                프로젝트 관리
              </Heading>
              <Text className="text-text-secondary">
                총 {stats.total}개 프로젝트 | 완료 {stats.completed}개 | 진행 중 {stats.inProgress}개 | 평균 진행률 {stats.avgProgress}%
                {stats.projectsWithoutImage > 0 && (
                  <span className="ml-2 text-brand-primary">
                    | 이미지 없는 프로젝트 {stats.projectsWithoutImage}개
                  </span>
                )}
              </Text>
            </div>
            <div className="flex gap-2">
              {stats.projectsWithoutImage > 0 && (
                <Button
                  variant="outline"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    (e.nativeEvent as Event).stopImmediatePropagation();
                    const projectWithoutImage = projects.find(p => !p.image || p.image === '');
                    if (projectWithoutImage) {
                      openImageGenerator(projectWithoutImage);
                    }
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
                  className="flex items-center gap-2"
                >
                  <span className="text-lg">🎨</span>
                  AI 이미지 생성
                </Button>
              )}
              {onAdd && (
                <Button onClick={onAdd}>
                  새 프로젝트 추가
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* 필터 및 검색 */}
      <Card variant="elevated">
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">검색</label>
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="프로젝트, 팀, 멤버 검색..."
                className="w-full"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">상태</label>
              <Select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">전체</option>
                {PROJECT_STATUSES.map(status => (
                  <option key={status.id} value={status.id}>{status.name}</option>
                ))}
              </Select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">우선순위</label>
              <Select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
              >
                <option value="all">전체</option>
                <option value="critical">긴급</option>
                <option value="high">높음</option>
                <option value="medium">보통</option>
                <option value="low">낮음</option>
              </Select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">기술스택</label>
              <Select
                value={techFilter}
                onChange={(e) => setTechFilter(e.target.value)}
              >
                <option value="all">전체</option>
                {TECH_STACKS.map(tech => (
                  <option key={tech.id} value={tech.id}>{tech.name}</option>
                ))}
              </Select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">정렬</label>
              <div className="flex gap-2">
                <Select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="flex-1"
                >
                  <option value="lastUpdated">최근 수정</option>
                  <option value="createdAt">생성일</option>
                  <option value="title">이름</option>
                  <option value="progress">진행률</option>
                </Select>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                  className="px-2"
                >
                  {sortOrder === 'asc' ? '↑' : '↓'}
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AI 이미지 생성기 모달 */}
      {showImageGenerator && selectedProject && (
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
              <Heading as="h3">AI 이미지 생성 - {selectedProject.title}</Heading>
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  (e.nativeEvent as Event).stopImmediatePropagation();
                  setShowImageGenerator(false);
                  setSelectedProject(null);
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
              title={selectedProject.title}
              description={selectedProject.description}
              techStack={selectedProject.techStack.map(tech => tech.name)}
              onImageGenerated={handleImageGenerated}
              onError={handleImageGenerationError}
              onLoadingChange={handleImageGenerationLoading}
              className="w-full"
            />
          </div>
        </div>
      )}

      {/* 프로젝트 목록 */}
      {filteredAndSortedProjects.length === 0 ? (
        <Card variant="elevated">
          <CardContent className="py-12 text-center">
            <div className="w-16 h-16 bg-surface-secondary rounded-full mx-auto mb-4 flex items-center justify-center">
              <svg className="w-8 h-8 text-text-tertiary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <Heading as="h3" className="text-lg mb-2">
              {projects.length === 0 ? '프로젝트가 없습니다' : '검색 결과가 없습니다'}
            </Heading>
            <Text className="text-text-secondary mb-4">
              {projects.length === 0 
                ? '새로운 프로젝트를 추가해보세요' 
                : '다른 검색어나 필터를 시도해보세요'
              }
            </Text>
            {projects.length === 0 && onAdd && (
              <Button onClick={onAdd}>
                첫 번째 프로젝트 추가
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className={getGridClasses()}>
          {filteredAndSortedProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onEdit={onEdit}
              onDelete={onDelete}
              onView={onView}
              showActions={showActions}
              variant={variant === 'compact' ? 'compact' : 'default'}
              onImageGenerated={onImageGenerated}
            />
          ))}
        </div>
      )}
    </div>
  );
};