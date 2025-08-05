'use client';

import { useCallback } from 'react';
import { Project } from '@/types/project';

export const useProjectBackup = () => {
  // 프로젝트 데이터를 JSON 파일로 내보내기
  const exportToFile = useCallback((projects: Project[], filename?: string) => {
    try {
      const dataStr = JSON.stringify(projects, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      
      const link = document.createElement('a');
      link.href = URL.createObjectURL(dataBlob);
      link.download = filename || `kca-projects-backup-${new Date().toISOString().split('T')[0]}.json`;
      
      // 파일 다운로드 트리거
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // 메모리 정리
      URL.revokeObjectURL(link.href);
      
      return true;
    } catch (error) {
      console.error('프로젝트 내보내기 실패:', error);
      return false;
    }
  }, []);

  // JSON 파일에서 프로젝트 데이터 가져오기
  const importFromFile = useCallback((file: File): Promise<Project[]> => {
    return new Promise((resolve, reject) => {
      if (!file.type.includes('json')) {
        reject(new Error('JSON 파일만 지원됩니다.'));
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const result = e.target?.result as string;
          const data = JSON.parse(result);
          
          // 데이터 유효성 검사
          if (!Array.isArray(data)) {
            throw new Error('올바른 프로젝트 데이터 형식이 아닙니다.');
          }

          // 날짜 필드 복원
          const projects: Project[] = data.map((project: any) => ({
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

          resolve(projects);
        } catch (error) {
          reject(new Error('파일 파싱 중 오류가 발생했습니다: ' + (error as Error).message));
        }
      };

      reader.onerror = () => {
        reject(new Error('파일 읽기 중 오류가 발생했습니다.'));
      };

      reader.readAsText(file);
    });
  }, []);

  // 자동 백업 (localStorage에서 읽어서 파일로 저장)
  const autoBackup = useCallback(() => {
    try {
      const stored = localStorage.getItem('kca-ai-lab-projects');
      if (stored) {
        const projects = JSON.parse(stored);
        exportToFile(projects, `auto-backup-${Date.now()}.json`);
        return true;
      }
      return false;
    } catch (error) {
      console.error('자동 백업 실패:', error);
      return false;
    }
  }, [exportToFile]);

  // 백업 파일 생성 (브라우저 다운로드 없이)
  const createBackupData = useCallback((projects: Project[]) => {
    try {
      return {
        version: '1.0',
        timestamp: new Date().toISOString(),
        projectCount: projects.length,
        data: projects
      };
    } catch (error) {
      console.error('백업 데이터 생성 실패:', error);
      return null;
    }
  }, []);

  // 데이터 유효성 검사
  const validateProjectData = useCallback((data: any[]): boolean => {
    try {
      return data.every(project => 
        typeof project.id === 'string' &&
        typeof project.title === 'string' &&
        typeof project.description === 'string' &&
        Array.isArray(project.members) &&
        typeof project.progress === 'number'
      );
    } catch {
      return false;
    }
  }, []);

  return {
    exportToFile,
    importFromFile,
    autoBackup,
    createBackupData,
    validateProjectData
  };
};