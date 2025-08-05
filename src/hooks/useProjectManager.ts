'use client';

import { useState, useEffect, useCallback } from 'react';
import { 
  Project, 
  ProjectFormData, 
  TeamMember, 
  PROJECT_STATUSES, 
  TECH_STACKS 
} from '@/types/project';

const STORAGE_KEY = 'kca-ai-lab-projects';

export const useProjectManager = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 로컬 스토리지에서 프로젝트 로드
  const loadProjects = useCallback(() => {
    try {
      setIsLoading(true);
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsedProjects = JSON.parse(stored).map((project: any) => ({
          ...project,
          startDate: new Date(project.startDate),
          endDate: project.endDate ? new Date(project.endDate) : undefined,
          createdAt: new Date(project.createdAt),
          lastUpdated: new Date(project.lastUpdated),
          milestones: project.milestones?.map((milestone: any) => ({
            ...milestone,
            dueDate: new Date(milestone.dueDate),
            completedAt: milestone.completedAt ? new Date(milestone.completedAt) : undefined
          })) || []
        }));
        setProjects(parsedProjects);
      } else {
        // 기본 예제 프로젝트 생성
        const defaultProjects = createDefaultProjects();
        setProjects(defaultProjects);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultProjects));
      }
      setError(null);
    } catch (err) {
      setError('프로젝트를 불러오는 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // 로컬 스토리지에 프로젝트 저장
  const saveProjects = useCallback((projectsToSave: Project[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(projectsToSave));
    } catch (err) {
      setError('프로젝트 저장 중 오류가 발생했습니다.');
    }
  }, []);

  // 컴포넌트 마운트 시 프로젝트 로드
  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  // 프로젝트 추가
  const addProject = useCallback((formData: ProjectFormData) => {
    try {
      const newProject: Project = {
        id: `project-${Date.now()}`,
        title: formData.title,
        description: formData.description,
        overview: formData.overview,
        techStack: TECH_STACKS.filter(tech => formData.techStack.includes(tech.id)),
        teamName: formData.teamName,
        members: formData.memberNames.map((name, index): TeamMember => ({
          id: `member-${Date.now()}-${index}`,
          name: name,
          role: formData.memberRoles[index] || 'Developer',
          skills: []
        })).filter(member => member.name.trim() !== ''),
        leaderId: `member-${Date.now()}-0`,
        progress: formData.progress,
        status: PROJECT_STATUSES.find(s => s.id === formData.statusId) || PROJECT_STATUSES[0],
        expectedImpact: {
          description: formData.expectedImpact,
          metrics: formData.impactMetrics.filter(metric => 
            metric.label.trim() !== '' && metric.value.trim() !== ''
          )
        },
        startDate: new Date(formData.startDate),
        endDate: formData.endDate ? new Date(formData.endDate) : undefined,
        createdAt: new Date(),
        lastUpdated: new Date(),
        createdBy: 'current-user',
        image: formData.image || '',
        priority: formData.priority,
        tags: formData.tags,
        budget: formData.budget,
        resources: formData.resources.filter(resource => resource.trim() !== ''),
        risks: formData.risks.filter(risk => risk.trim() !== ''),
        milestones: []
      };

      const updatedProjects = [...projects, newProject];
      setProjects(updatedProjects);
      saveProjects(updatedProjects);
      setError(null);
      
      return newProject;
    } catch (err) {
      setError('프로젝트 추가 중 오류가 발생했습니다.');
      throw err;
    }
  }, [projects, saveProjects]);

  // 프로젝트 수정
  const updateProject = useCallback((projectId: string, formData: ProjectFormData) => {
    try {
      const updatedProjects = projects.map(project => {
        if (project.id === projectId) {
          return {
            ...project,
            title: formData.title,
            description: formData.description,
            overview: formData.overview,
            techStack: TECH_STACKS.filter(tech => formData.techStack.includes(tech.id)),
            teamName: formData.teamName,
            members: formData.memberNames.map((name, index): TeamMember => ({
              id: project.members[index]?.id || `member-${Date.now()}-${index}`,
              name: name,
              role: formData.memberRoles[index] || 'Developer',
              skills: project.members[index]?.skills || []
            })).filter(member => member.name.trim() !== ''),
            progress: formData.progress,
            status: PROJECT_STATUSES.find(s => s.id === formData.statusId) || project.status,
            expectedImpact: {
              description: formData.expectedImpact,
              metrics: formData.impactMetrics.filter(metric => 
                metric.label.trim() !== '' && metric.value.trim() !== ''
              )
            },
            startDate: new Date(formData.startDate),
            endDate: formData.endDate ? new Date(formData.endDate) : undefined,
            lastUpdated: new Date(),
            image: formData.image || '',
            priority: formData.priority,
            tags: formData.tags,
            budget: formData.budget,
            resources: formData.resources.filter(resource => resource.trim() !== ''),
            risks: formData.risks.filter(risk => risk.trim() !== '')
          };
        }
        return project;
      });

      setProjects(updatedProjects);
      saveProjects(updatedProjects);
      setError(null);
      
      return updatedProjects.find(p => p.id === projectId);
    } catch (err) {
      setError('프로젝트 수정 중 오류가 발생했습니다.');
      throw err;
    }
  }, [projects, saveProjects]);

  // 프로젝트 삭제
  const deleteProject = useCallback((projectId: string) => {
    try {
      const updatedProjects = projects.filter(project => project.id !== projectId);
      setProjects(updatedProjects);
      saveProjects(updatedProjects);
      setError(null);
    } catch (err) {
      setError('프로젝트 삭제 중 오류가 발생했습니다.');
      throw err;
    }
  }, [projects, saveProjects]);

  // 프로젝트 진행률 업데이트
  const updateProgress = useCallback((projectId: string, progress: number) => {
    try {
      const updatedProjects = projects.map(project => {
        if (project.id === projectId) {
          let newStatus = project.status;
          
          // 진행률에 따른 상태 자동 업데이트
          if (progress === 100) {
            newStatus = PROJECT_STATUSES.find(s => s.id === 'completed') || project.status;
          } else if (progress > 0 && project.status.id === 'planning') {
            newStatus = PROJECT_STATUSES.find(s => s.id === 'development') || project.status;
          }
          
          return {
            ...project,
            progress,
            status: newStatus,
            lastUpdated: new Date()
          };
        }
        return project;
      });

      setProjects(updatedProjects);
      saveProjects(updatedProjects);
      setError(null);
    } catch (err) {
      setError('진행률 업데이트 중 오류가 발생했습니다.');
      throw err;
    }
  }, [projects, saveProjects]);

  // 프로젝트 상태 업데이트
  const updateStatus = useCallback((projectId: string, statusId: string) => {
    try {
      const updatedProjects = projects.map(project => {
        if (project.id === projectId) {
          const newStatus = PROJECT_STATUSES.find(s => s.id === statusId);
          if (!newStatus) return project;
          
          return {
            ...project,
            status: newStatus,
            lastUpdated: new Date()
          };
        }
        return project;
      });

      setProjects(updatedProjects);
      saveProjects(updatedProjects);
      setError(null);
    } catch (err) {
      setError('상태 업데이트 중 오류가 발생했습니다.');
      throw err;
    }
  }, [projects, saveProjects]);

  // 프로젝트 ID로 조회
  const getProject = useCallback((projectId: string) => {
    return projects.find(project => project.id === projectId);
  }, [projects]);

  // 통계 정보 조회
  const getStats = useCallback(() => {
    const total = projects.length;
    const completed = projects.filter(p => p.progress === 100).length;
    const inProgress = projects.filter(p => p.progress > 0 && p.progress < 100).length;
    const notStarted = projects.filter(p => p.progress === 0).length;
    const avgProgress = total > 0 ? Math.round(projects.reduce((sum, p) => sum + p.progress, 0) / total) : 0;
    
    const statusCounts = PROJECT_STATUSES.reduce((acc, status) => {
      acc[status.id] = projects.filter(p => p.status.id === status.id).length;
      return acc;
    }, {} as Record<string, number>);

    const priorityCounts = {
      critical: projects.filter(p => p.priority === 'critical').length,
      high: projects.filter(p => p.priority === 'high').length,
      medium: projects.filter(p => p.priority === 'medium').length,
      low: projects.filter(p => p.priority === 'low').length
    };

    return {
      total,
      completed,
      inProgress,
      notStarted,
      avgProgress,
      statusCounts,
      priorityCounts
    };
  }, [projects]);

  return {
    projects,
    isLoading,
    error,
    addProject,
    updateProject,
    deleteProject,
    updateProgress,
    updateStatus,
    getProject,
    getStats,
    refresh: loadProjects
  };
};

// 기본 예제 프로젝트 생성 함수
const createDefaultProjects = (): Project[] => {
  const now = new Date();
  const oneMonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
  const twoMonthsAgo = new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000);
  
  return [
    {
      id: 'project-1',
      title: 'AI 문서 자동화 시스템',
      description: '공문서 작성 및 검토 프로세스를 AI로 자동화하여 업무 효율성 300% 향상',
      overview: '한국방송통신전파진흥원의 공문서 작성 프로세스를 분석하고, NLP와 OCR 기술을 활용하여 문서 생성부터 검토까지 전 과정을 자동화하는 시스템을 개발합니다. 기존 수동 프로세스 대비 300% 효율성 향상을 목표로 합니다.',
      techStack: TECH_STACKS.filter(tech => ['python', 'tensorflow', 'nltk', 'opencv'].includes(tech.id)),
      teamName: 'Team Alpha',
      members: [
        { id: 'member-1', name: '김혁신', role: 'Team Lead', skills: ['Python', 'NLP'] },
        { id: 'member-2', name: '박효율', role: 'AI Engineer', skills: ['TensorFlow', 'OCR'] },
        { id: 'member-3', name: '이자동', role: 'Backend Developer', skills: ['FastAPI', 'Python'] },
        { id: 'member-4', name: '최스마트', role: 'Frontend Developer', skills: ['React', 'TypeScript'] }
      ],
      leaderId: 'member-1',
      progress: 100,
      status: PROJECT_STATUSES.find(s => s.id === 'completed')!,
      expectedImpact: {
        description: '업무 프로세스 완전 자동화를 통한 효율성 혁신',
        metrics: [
          { label: '업무 시간 단축', value: '60', unit: '%' },
          { label: '처리 속도 향상', value: '300', unit: '%' },
          { label: '정확도', value: '95', unit: '%' }
        ]
      },
      startDate: twoMonthsAgo,
      endDate: oneMonthAgo,
      createdAt: twoMonthsAgo,
      lastUpdated: oneMonthAgo,
      createdBy: 'admin',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
      priority: 'high',
      tags: ['automation', 'document', 'ai'],
      budget: 50000000,
      resources: ['GPU 서버', 'OCR 라이브러리', '문서 데이터셋'],
      risks: ['데이터 품질', '모델 성능', '사용자 접근성'],
      milestones: []
    },
    {
      id: 'project-2',
      title: '스마트 고객 응대 챗봇',
      description: '자연어 처리를 활용한 지능형 고객 상담 시스템 구축',
      overview: 'ChatGPT API와 자체 NLP 모델을 결합하여 24시간 고객 문의를 처리할 수 있는 지능형 챗봇을 개발합니다. 고객 만족도 95% 달성을 목표로 합니다.',
      techStack: TECH_STACKS.filter(tech => ['chatgpt-api', 'fastapi', 'react', 'python'].includes(tech.id)),
      teamName: 'Team Beta',
      members: [
        { id: 'member-5', name: '정대화', role: 'Team Lead', skills: ['NLP', 'ChatGPT API'] },
        { id: 'member-6', name: '한지능', role: 'AI Engineer', skills: ['Python', 'FastAPI'] },
        { id: 'member-7', name: '강자연', role: 'Frontend Developer', skills: ['React', 'JavaScript'] }
      ],
      leaderId: 'member-5',
      progress: 85,
      status: PROJECT_STATUSES.find(s => s.id === 'testing')!,
      expectedImpact: {
        description: '24시간 고객 서비스 자동화를 통한 만족도 향상',
        metrics: [
          { label: '응대 시간 단축', value: '80', unit: '%' },
          { label: '고객 만족도', value: '95', unit: '%' },
          { label: '운영 비용 절감', value: '40', unit: '%' }
        ]
      },
      startDate: oneMonthAgo,
      createdAt: oneMonthAgo,
      lastUpdated: now,
      createdBy: 'admin',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop',
      priority: 'high',
      tags: ['chatbot', 'customer-service', 'nlp'],
      budget: 30000000,
      resources: ['ChatGPT API', '클라우드 서버', '고객 데이터'],
      risks: ['API 비용', '응답 품질', '보안'],
      milestones: []
    }
  ];
};