'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader } from './card';
import { Heading, Text } from './typography';
import { Button } from './button';
import { AIProject, TeamMember, ProjectResult, ProjectLink } from '@/lib/ai-projects';

export interface ProjectModalProps {
  project: AIProject | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  isOpen,
  onClose
}) => {
  // ESC 키로 모달 닫기
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!project || !isOpen) return null;

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

  const getLinkIcon = (type: string) => {
    switch (type) {
      case 'demo':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        );
      case 'github':
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
        );
      case 'paper':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        );
      case 'video':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      default:
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-surface-primary rounded-lg border border-border-primary shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-surface-primary border-b border-border-primary p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className={cn(
                'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border',
                getDifficultyColor(project.difficulty)
              )}>
                {project.difficulty}
              </span>
              <span className={cn(
                'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border',
                getStatusColor(project.status)
              )}>
                {project.status}
              </span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="p-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Project Header */}
          <div className="space-y-4">
            <div>
              <Heading as="h1" className="mb-2">
                {project.title}
              </Heading>
              <Text color="secondary" className="text-lg">
                {project.description}
              </Text>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-surface-secondary text-text-secondary border border-border-primary">
                {project.category}
              </span>
              {project.tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2 py-1 rounded-md text-sm font-medium bg-surface-secondary text-text-secondary border border-border-primary"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Project Images */}
          {project.images.length > 0 && (
            <div className="space-y-4">
              <Heading as="h3">프로젝트 이미지</Heading>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {project.images.map((image, index) => (
                  <div key={index} className="relative aspect-video rounded-lg overflow-hidden">
                    <Image
                      src={image}
                      alt={`${project.title} 이미지 ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Video */}
          {project.video && (
            <div className="space-y-4">
              <Heading as="h3">데모 비디오</Heading>
              <div className="relative aspect-video rounded-lg overflow-hidden">
                <iframe
                  src={project.video}
                  title={`${project.title} 데모 비디오`}
                  className="w-full h-full"
                  allowFullScreen
                />
              </div>
            </div>
          )}

          {/* Long Description */}
          <div className="space-y-4">
            <Heading as="h3">프로젝트 설명</Heading>
            <Text color="secondary" className="leading-relaxed">
              {project.longDescription}
            </Text>
          </div>

          {/* Tech Stack */}
          <div className="space-y-4">
            <Heading as="h3">기술 스택</Heading>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 rounded-md text-sm font-medium bg-brand-primary/10 text-brand-primary border border-brand-primary/20"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Team */}
          {project.team.length > 0 && (
            <div className="space-y-4">
              <Heading as="h3">팀 구성</Heading>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {project.team.map((member, index) => (
                  <Card key={index} className="p-4">
                    <div className="flex items-center space-x-3">
                      {member.avatar ? (
                        <Image
                          src={member.avatar}
                          alt={member.name}
                          width={48}
                          height={48}
                          className="rounded-full"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-surface-secondary flex items-center justify-center">
                          <Text className="text-text-secondary font-medium">
                            {member.name.charAt(0)}
                          </Text>
                        </div>
                      )}
                      <div className="flex-1">
                        <Text className="font-medium">{member.name}</Text>
                        <Text color="secondary" size="small">{member.role}</Text>
                      </div>
                      <div className="flex space-x-2">
                        {member.linkedin && (
                          <a
                            href={member.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1 text-text-secondary hover:text-brand-primary transition-colors"
                          >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                            </svg>
                          </a>
                        )}
                        {member.github && (
                          <a
                            href={member.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1 text-text-secondary hover:text-brand-primary transition-colors"
                          >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                            </svg>
                          </a>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Results */}
          {project.results.length > 0 && (
            <div className="space-y-4">
              <Heading as="h3">주요 결과</Heading>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {project.results.map((result, index) => (
                  <Card key={index} className="p-4 text-center">
                    <Text className="text-2xl font-bold text-brand-primary mb-1">
                      {result.value}
                    </Text>
                    <Text className="font-medium mb-2">{result.metric}</Text>
                    <Text color="secondary" size="small">{result.description}</Text>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Links */}
          {project.links.length > 0 && (
            <div className="space-y-4">
              <Heading as="h3">관련 링크</Heading>
              <div className="flex flex-wrap gap-3">
                {project.links.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg bg-surface-secondary text-text-primary border border-border-primary hover:bg-surface-tertiary hover:border-brand-primary/50 transition-all duration-200"
                  >
                    {getLinkIcon(link.type)}
                    <span>{link.label}</span>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Project Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-border-primary">
            <div>
              <Text color="secondary" size="small">예상 개발 시간</Text>
              <Text className="font-medium">{project.estimatedTime}</Text>
            </div>
            <div>
              <Text color="secondary" size="small">생성일</Text>
              <Text className="font-medium">{new Date(project.createdAt).toLocaleDateString('ko-KR')}</Text>
            </div>
            <div>
              <Text color="secondary" size="small">최종 업데이트</Text>
              <Text className="font-medium">{new Date(project.updatedAt).toLocaleDateString('ko-KR')}</Text>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 