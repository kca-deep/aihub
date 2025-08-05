'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  Button, 
  Input, 
  Textarea,
  Select,
  Checkbox,
  Heading,
  Text,
  Alert,
  AlertDescription
} from '@/components/ui';
import { cn } from '@/lib/utils';
import { 
  Project, 
  ProjectFormData, 
  PROJECT_STATUSES, 
  TECH_STACKS,
  TechStack 
} from '@/types/project';
import { 
  AIImageGenerator,
  useImageGeneration
} from '@/components/ui';

interface ProjectFormProps {
  project?: Project;
  onSubmit: (data: ProjectFormData) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export const ProjectForm: React.FC<ProjectFormProps> = ({
  project,
  onSubmit,
  onCancel,
  isLoading = false
}) => {
  const [formData, setFormData] = useState<ProjectFormData>({
    title: project?.title || '',
    description: project?.description || '',
    overview: project?.overview || '',
    techStack: project?.techStack.map(t => t.id) || [],
    teamName: project?.teamName || '',
    memberNames: project?.members.map(m => m.name) || [''],
    memberRoles: project?.members.map(m => m.role) || [''],
    progress: project?.progress || 0,
    statusId: project?.status.id || 'planning',
    expectedImpact: project?.expectedImpact.description || '',
    impactMetrics: project?.expectedImpact.metrics || [{ label: '', value: '', unit: '' }],
    startDate: project?.startDate ? project.startDate.toISOString().split('T')[0] : '',
    endDate: project?.endDate ? project.endDate.toISOString().split('T')[0] : '',
    image: project?.image || '',
    priority: project?.priority || 'medium',
    tags: project?.tags || [],
    budget: project?.budget,
    resources: project?.resources || [''],
    risks: project?.risks || ['']
  });

  const [selectedTechStacks, setSelectedTechStacks] = useState<TechStack[]>([]);
  const [techStackSearch, setTechStackSearch] = useState('');
  const [showImageGenerator, setShowImageGenerator] = useState(false);
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string>('');
  const [imageGenerationError, setImageGenerationError] = useState<string | null>(null);

  // 선택된 기술 스택 업데이트
  useEffect(() => {
    const selected = TECH_STACKS.filter(tech => formData.techStack.includes(tech.id));
    setSelectedTechStacks(selected);
  }, [formData.techStack]);

  const handleInputChange = (field: keyof ProjectFormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleArrayInputChange = (field: 'memberNames' | 'memberRoles' | 'resources' | 'risks', index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  const addArrayInput = (field: 'memberNames' | 'memberRoles' | 'resources' | 'risks') => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const removeArrayInput = (field: 'memberNames' | 'memberRoles' | 'resources' | 'risks', index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const handleMetricChange = (index: number, field: 'label' | 'value' | 'unit', value: string) => {
    setFormData(prev => ({
      ...prev,
      impactMetrics: prev.impactMetrics.map((metric, i) => 
        i === index ? { ...metric, [field]: value } : metric
      )
    }));
  };

  const addMetric = () => {
    setFormData(prev => ({
      ...prev,
      impactMetrics: [...prev.impactMetrics, { label: '', value: '', unit: '' }]
    }));
  };

  const removeMetric = (index: number) => {
    setFormData(prev => ({
      ...prev,
      impactMetrics: prev.impactMetrics.filter((_, i) => i !== index)
    }));
  };

  const toggleTechStack = (techId: string) => {
    setFormData(prev => ({
      ...prev,
      techStack: prev.techStack.includes(techId)
        ? prev.techStack.filter(id => id !== techId)
        : [...prev.techStack, techId]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleImageGenerated = (imageUrl: string) => {
    setGeneratedImageUrl(imageUrl);
    setFormData(prev => ({
      ...prev,
      image: imageUrl
    }));
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

  const filteredTechStacks = TECH_STACKS.filter(tech =>
    tech.name.toLowerCase().includes(techStackSearch.toLowerCase()) ||
    tech.category.toLowerCase().includes(techStackSearch.toLowerCase())
  );

  const techStacksByCategory = filteredTechStacks.reduce((acc, tech) => {
    if (!acc[tech.category]) {
      acc[tech.category] = [];
    }
    acc[tech.category].push(tech);
    return acc;
  }, {} as Record<string, TechStack[]>);

  return (
    <Card variant="elevated" className="max-w-4xl mx-auto">
      <CardHeader>
        <Heading as="h2" className="text-xl">
          {project ? '프로젝트 수정' : '새 프로젝트 추가'}
        </Heading>
        <Text className="text-text-secondary">
          프로젝트 정보를 입력해주세요
        </Text>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 기본 정보 */}
          <div className="space-y-4">
            <Heading as="h3" className="text-lg">기본 정보</Heading>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">프로젝트명 *</label>
                <Input
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="프로젝트명을 입력하세요"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">팀명 *</label>
                <Input
                  value={formData.teamName}
                  onChange={(e) => handleInputChange('teamName', e.target.value)}
                  placeholder="팀명을 입력하세요"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">간단 설명 *</label>
              <Textarea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="프로젝트에 대한 간단한 설명을 입력하세요"
                rows={3}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">상세 개요 *</label>
              <Textarea
                value={formData.overview}
                onChange={(e) => handleInputChange('overview', e.target.value)}
                placeholder="프로젝트의 상세한 개요를 입력하세요"
                rows={4}
                required
              />
            </div>

            {/* 프로젝트 이미지 섹션 */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium">프로젝트 이미지</label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setShowImageGenerator(!showImageGenerator);
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  className="flex items-center gap-2"
                >
                  <span className="text-lg">🎨</span>
                  AI 이미지 생성
                </Button>
              </div>

              {/* AI 이미지 생성기 */}
              {showImageGenerator && (
                <div 
                  className="border border-border-primary rounded-lg p-4 bg-surface-secondary"
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
                  <AIImageGenerator
                    type="project"
                    title={formData.title}
                    description={formData.description}
                    techStack={selectedTechStacks.map(tech => tech.name)}
                    onImageGenerated={handleImageGenerated}
                    onError={handleImageGenerationError}
                    onLoadingChange={handleImageGenerationLoading}
                    className="w-full"
                  />
                </div>
              )}

              {/* 이미지 URL 입력 */}
              <div 
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                onMouseDown={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
              >
                <Input
                  value={formData.image}
                  onChange={(e) => handleInputChange('image', e.target.value)}
                  placeholder="https://example.com/image.jpg 또는 AI로 이미지 생성"
                  type="url"
                />
              </div>

              {/* 이미지 미리보기 */}
              {(formData.image || generatedImageUrl) && (
                <div 
                  className="space-y-2" 
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                >
                  <Text size="small" className="font-medium">이미지 미리보기</Text>
                  <div className="relative w-full h-48 rounded-lg overflow-hidden border border-border-primary">
                    <Image
                      src={generatedImageUrl || formData.image!}
                      alt="프로젝트 이미지"
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                </div>
              )}

              {/* 이미지 생성 에러 */}
              {imageGenerationError && (
                <div 
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                >
                  <Alert variant="error">
                    <AlertDescription>{imageGenerationError}</AlertDescription>
                  </Alert>
                </div>
              )}
            </div>
          </div>

          {/* 기술 스택 */}
          <div className="space-y-4">
            <Heading as="h3" className="text-lg">기술 스택</Heading>
            
            <div>
              <Input
                value={techStackSearch}
                onChange={(e) => setTechStackSearch(e.target.value)}
                placeholder="기술 스택 검색..."
                className="mb-4"
              />
            </div>

            <div className="space-y-4 max-h-60 overflow-y-auto border border-border-primary rounded-lg p-4">
              {Object.entries(techStacksByCategory).map(([category, techs]) => (
                <div key={category}>
                  <Text className="font-medium mb-2 capitalize text-brand-primary">
                    {category === 'ai' ? 'AI/ML' : category}
                  </Text>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {techs.map((tech) => (
                      <label
                        key={tech.id}
                        className="flex items-center space-x-2 cursor-pointer p-2 rounded hover:bg-surface-secondary"
                      >
                        <Checkbox
                          checked={formData.techStack.includes(tech.id)}
                          onChange={() => toggleTechStack(tech.id)}
                        />
                        <span 
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: tech.color }}
                        />
                        <span className="text-sm">{tech.name}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* 선택된 기술 스택 */}
            {selectedTechStacks.length > 0 && (
              <div>
                <Text className="text-sm font-medium mb-2">선택된 기술 스택:</Text>
                <div className="flex flex-wrap gap-2">
                  {selectedTechStacks.map((tech) => (
                    <span
                      key={tech.id}
                      className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-surface-secondary text-text-primary"
                    >
                      <span 
                        className="w-2 h-2 rounded-full mr-1"
                        style={{ backgroundColor: tech.color }}
                      />
                      {tech.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* 팀 구성원 */}
          <div className="space-y-4">
            <Heading as="h3" className="text-lg">팀 구성원</Heading>
            
            {formData.memberNames.map((name, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">이름</label>
                  <Input
                    value={name}
                    onChange={(e) => handleArrayInputChange('memberNames', index, e.target.value)}
                    placeholder="팀원 이름"
                  />
                </div>
                <div className="flex gap-2">
                  <div className="flex-1">
                    <label className="block text-sm font-medium mb-2">역할</label>
                    <Input
                      value={formData.memberRoles[index] || ''}
                      onChange={(e) => handleArrayInputChange('memberRoles', index, e.target.value)}
                      placeholder="역할"
                    />
                  </div>
                  {formData.memberNames.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        removeArrayInput('memberNames', index);
                        removeArrayInput('memberRoles', index);
                      }}
                      className="mt-6"
                    >
                      삭제
                    </Button>
                  )}
                </div>
              </div>
            ))}
            
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                addArrayInput('memberNames');
                addArrayInput('memberRoles');
              }}
            >
              팀원 추가
            </Button>
          </div>

          {/* 진행 상황 */}
          <div className="space-y-4">
            <Heading as="h3" className="text-lg">진행 상황</Heading>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">진행률 (%)</label>
                <Input
                  type="number"
                  min="0"
                  max="100"
                  value={formData.progress}
                  onChange={(e) => handleInputChange('progress', parseInt(e.target.value) || 0)}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">상태</label>
                <Select
                  value={formData.statusId}
                  onChange={(e) => handleInputChange('statusId', e.target.value)}
                >
                  {PROJECT_STATUSES.map((status) => (
                    <option key={status.id} value={status.id}>
                      {status.name}
                    </option>
                  ))}
                </Select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">우선순위</label>
                <Select
                  value={formData.priority}
                  onChange={(e) => handleInputChange('priority', e.target.value)}
                >
                  <option value="low">낮음</option>
                  <option value="medium">보통</option>
                  <option value="high">높음</option>
                  <option value="critical">긴급</option>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">시작일</label>
                <Input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => handleInputChange('startDate', e.target.value)}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">종료일 (예정)</label>
                <Input
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => handleInputChange('endDate', e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* 기대 효과 */}
          <div className="space-y-4">
            <Heading as="h3" className="text-lg">기대 효과</Heading>
            
            <div>
              <label className="block text-sm font-medium mb-2">효과 설명</label>
              <Textarea
                value={formData.expectedImpact}
                onChange={(e) => handleInputChange('expectedImpact', e.target.value)}
                placeholder="프로젝트의 기대 효과를 설명해주세요"
                rows={3}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">성과 지표</label>
              {formData.impactMetrics.map((metric, index) => (
                <div key={index} className="grid grid-cols-12 gap-2 mb-2">
                  <div className="col-span-4">
                    <Input
                      value={metric.label}
                      onChange={(e) => handleMetricChange(index, 'label', e.target.value)}
                      placeholder="지표명"
                    />
                  </div>
                  <div className="col-span-3">
                    <Input
                      value={metric.value}
                      onChange={(e) => handleMetricChange(index, 'value', e.target.value)}
                      placeholder="수치"
                    />
                  </div>
                  <div className="col-span-3">
                    <Input
                      value={metric.unit || ''}
                      onChange={(e) => handleMetricChange(index, 'unit', e.target.value)}
                      placeholder="단위"
                    />
                  </div>
                  <div className="col-span-2">
                    {formData.impactMetrics.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeMetric(index)}
                      >
                        삭제
                      </Button>
                    )}
                  </div>
                </div>
              ))}
              
              <Button
                type="button"
                variant="outline"
                onClick={addMetric}
              >
                지표 추가
              </Button>
            </div>
          </div>

          {/* 폼 액션 */}
          <div className="flex justify-end space-x-4 pt-6 border-t border-border-primary">
            <Button
              type="button"
              variant="ghost"
              onClick={onCancel}
              disabled={isLoading}
            >
              취소
            </Button>
            <Button
              type="submit"
              disabled={isLoading || !formData.title || !formData.teamName}
            >
              {isLoading ? '저장 중...' : project ? '수정' : '추가'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};