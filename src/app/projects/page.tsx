'use client';

import React, { useState } from 'react';
import { 
  Button, 
  Heading, 
  Text,
  Navigation,
  Footer,
  Logo,
  Card,
  CardContent,
  CardHeader
} from '@/components/ui';
import { cn } from '@/lib/utils';
import { Project } from '@/types/project';
import { useProjectManager } from '@/hooks/useProjectManager';
import { useProjectBackup } from '@/hooks/useProjectBackup';
import { ProjectList } from '@/components/project/ProjectList';
import { ProjectForm } from '@/components/project/ProjectForm';

export default function ProjectsPage() {
  const {
    projects,
    isLoading,
    error,
    addProject,
    updateProject,
    deleteProject,
    getStats,
    refresh
  } = useProjectManager();

  const {
    exportToFile,
    importFromFile,
    autoBackup
  } = useProjectBackup();

  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const stats = getStats();

  const handleAddProject = () => {
    setEditingProject(null);
    setShowForm(true);
  };

  const handleEditProject = (project: Project) => {
    setEditingProject(project);
    setShowForm(true);
  };

  const handleDeleteProject = (project: Project) => {
    if (confirm(`정말로 "${project.title}" 프로젝트를 삭제하시겠습니까?`)) {
      deleteProject(project.id);
    }
  };

  const handleViewProject = (project: Project) => {
    // 향후 프로젝트 상세 페이지로 이동
    console.log('View project:', project);
  };

  const handleFormSubmit = async (formData: any) => {
    try {
      setIsSubmitting(true);
      if (editingProject) {
        await updateProject(editingProject.id, formData);
      } else {
        await addProject(formData);
      }
      setShowForm(false);
      setEditingProject(null);
    } catch (error) {
      console.error('프로젝트 저장 실패:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingProject(null);
  };

  // 백업/복원 핸들러들
  const handleExportProjects = () => {
    const success = exportToFile(projects);
    if (success) {
      alert('프로젝트 데이터가 성공적으로 내보내졌습니다.');
    } else {
      alert('데이터 내보내기에 실패했습니다.');
    }
  };

  const handleImportProjects = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    importFromFile(file)
      .then((importedProjects) => {
        // 기존 프로젝트와 병합 또는 교체 확인
        const shouldReplace = confirm(
          `${importedProjects.length}개의 프로젝트를 가져왔습니다. 기존 데이터를 교체하시겠습니까?\n` +
          '취소를 선택하면 기존 데이터에 추가됩니다.'
        );

        if (shouldReplace) {
          // localStorage에 직접 저장하고 새로고침
          localStorage.setItem('kca-ai-lab-projects', JSON.stringify(importedProjects));
          refresh();
        } else {
          // 기존 데이터에 추가 (ID 중복 방지)
          const existingIds = new Set(projects.map(p => p.id));
          const newProjects = importedProjects.filter(p => !existingIds.has(p.id));
          const allProjects = [...projects, ...newProjects];
          localStorage.setItem('kca-ai-lab-projects', JSON.stringify(allProjects));
          refresh();
        }

        alert(`${importedProjects.length}개의 프로젝트가 성공적으로 가져와졌습니다.`);
      })
      .catch((error) => {
        alert('파일 가져오기에 실패했습니다: ' + error.message);
      })
      .finally(() => {
        // 파일 입력 초기화
        event.target.value = '';
      });
  };

  const handleAutoBackup = () => {
    const success = autoBackup();
    if (success) {
      alert('자동 백업이 완료되었습니다.');
    } else {
      alert('백업할 데이터가 없습니다.');
    }
  };

  const scrollToSection = (sectionId: string) => {
    if (sectionId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  if (showForm) {
    return (
      <div className="min-h-screen bg-background-primary">
        {/* Navigation */}
        <Navigation
          items={[
            { label: 'Home', href: '/' },
            { label: 'Projects', href: '/projects' },
            { label: 'Components', href: '/components' }
          ]}
          actions={{
            primary: { 
              label: 'Components', 
              href: '/components'
            }
          }}
          variant="transparent"
          sticky
          logo={<Logo variant="white" size="md" />}
        />

        <div className="pt-20 pb-12">
          <div className="container mx-auto px-4">
            <ProjectForm
              project={editingProject || undefined}
              onSubmit={handleFormSubmit}
              onCancel={handleFormCancel}
              isLoading={isSubmitting}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background-primary">
      {/* Navigation */}
      <Navigation
        items={[
          { label: 'Home', href: '/' },
          { label: 'Projects', href: '/projects' },
          { label: 'Components', href: '/components' }
        ]}
        actions={{
          primary: { 
            label: 'Components', 
            href: '/components'
          }
        }}
        variant="transparent"
        sticky
        logo={<Logo variant="white" size="md" />}
      />

      {/* Header Section */}
      <section className="pt-20 pb-12 bg-background-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <Heading as="h1" className="text-h1 mb-4">
              프로젝트 관리
            </Heading>
            <Text size="large" className="text-text-secondary max-w-2xl mx-auto">
              KCA AI LAB의 혁신적인 프로젝트들을 관리하고 추적하세요
            </Text>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card variant="elevated" className="text-center">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-brand-primary mb-2">
                  {stats.total}
                </div>
                <Heading as="h3" className="text-lg mb-1">
                  총 프로젝트
                </Heading>
                <Text size="small" className="text-text-secondary">
                  전체 관리 중인 프로젝트
                </Text>
              </CardContent>
            </Card>

            <Card variant="elevated" className="text-center">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-green-500 mb-2">
                  {stats.completed}
                </div>
                <Heading as="h3" className="text-lg mb-1">
                  완료된 프로젝트
                </Heading>
                <Text size="small" className="text-text-secondary">
                  성공적으로 완료
                </Text>
              </CardContent>
            </Card>

            <Card variant="elevated" className="text-center">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-blue-500 mb-2">
                  {stats.inProgress}
                </div>
                <Heading as="h3" className="text-lg mb-1">
                  진행 중
                </Heading>
                <Text size="small" className="text-text-secondary">
                  현재 개발 중인 프로젝트
                </Text>
              </CardContent>
            </Card>

            <Card variant="elevated" className="text-center">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-brand-primary mb-2">
                  {stats.avgProgress}%
                </div>
                <Heading as="h3" className="text-lg mb-1">
                  평균 진행률
                </Heading>
                <Text size="small" className="text-text-secondary">
                  전체 프로젝트 평균
                </Text>
              </CardContent>
            </Card>
          </div>

          {/* 데이터 관리 섹션 */}
          <Card variant="elevated" className="mb-8">
            <CardHeader>
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div>
                  <Heading as="h3" className="text-lg mb-2">
                    데이터 관리
                  </Heading>
                  <Text className="text-text-secondary">
                    프로젝트 데이터를 백업하거나 복원할 수 있습니다
                  </Text>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleExportProjects}
                    disabled={projects.length === 0}
                  >
                    📤 데이터 내보내기
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => document.getElementById('import-file')?.click()}
                  >
                    📥 데이터 가져오기
                  </Button>
                  
                  <input
                    id="import-file"
                    type="file"
                    accept=".json"
                    onChange={handleImportProjects}
                    className="hidden"
                  />
                </div>
              </div>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {error && (
            <Card variant="elevated" className="mb-6 border-red-200 bg-red-50">
              <CardContent className="p-4">
                <Text className="text-red-700">
                  오류: {error}
                </Text>
              </CardContent>
            </Card>
          )}

          <ProjectList
            projects={projects}
            onAdd={handleAddProject}
            onEdit={handleEditProject}
            onDelete={handleDeleteProject}
            onView={handleViewProject}
            isLoading={isLoading}
            showActions={true}
            variant="grid"
          />
        </div>
      </section>

      {/* Footer */}
      <Footer
        sections={[
          {
            title: 'KCA AI LAB',
            links: [
              { label: '홈', href: '/' },
              { label: '프로젝트', href: '/projects' },
              { label: '컴포넌트', href: '/components' }
            ]
          },
          {
            title: '기술',
            links: [
              { label: 'Python', href: '#' },
              { label: 'TensorFlow', href: '#' },
              { label: 'NLP', href: '#' },
              { label: 'React', href: '#' }
            ]
          }
        ]}
        socialLinks={[
          {
            name: 'GitHub',
            href: '#',
            icon: (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            )
          }
        ]}
        newsletter={{
          title: 'AI 업데이트 받기',
          description: 'KCA AI LAB의 최신 프로젝트와 기술 동향을 이메일로 받아보세요.',
          onSubmit: (email) => console.log('Newsletter subscription:', email)
        }}
        variant="extended"
      />
    </div>
  );
}