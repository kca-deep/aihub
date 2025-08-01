'use client';

import React, { useState, useMemo } from 'react';
import { 
  Navigation, 
  Footer, 
  Hero, 
  AIProjectCard, 
  ProjectModal,
  Input,
  Button,
  Heading,
  Text
} from '@/components/ui';
import { aiProjects, categories, difficulties, statuses, type AIProject, type AICategory } from '@/lib/ai-projects';

export default function AIExhibitionPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<AICategory | 'All'>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<AIProject | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 필터링된 프로젝트
  const filteredProjects = useMemo(() => {
    return aiProjects.filter(project => {
      const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          project.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory;
      const matchesDifficulty = selectedDifficulty === 'All' || project.difficulty === selectedDifficulty;
      const matchesStatus = selectedStatus === 'All' || project.status === selectedStatus;

      return matchesSearch && matchesCategory && matchesDifficulty && matchesStatus;
    });
  }, [searchTerm, selectedCategory, selectedDifficulty, selectedStatus]);

  // Featured 프로젝트
  const featuredProjects = useMemo(() => {
    return aiProjects.filter(project => project.featured);
  }, []);

  const handleProjectClick = (project: AIProject) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  const navigationItems = [
    { label: 'Home', href: '/' },
    { label: 'Components', href: '/components' },
    { label: 'AI Exhibition', href: '/ai-exhibition' }
  ];

  const footerSections = [
    {
      title: 'AI Projects',
      links: [
        { label: 'Computer Vision', href: '/ai-exhibition?category=Computer+Vision' },
        { label: 'NLP', href: '/ai-exhibition?category=Natural+Language+Processing' },
        { label: 'Machine Learning', href: '/ai-exhibition?category=Machine+Learning' },
        { label: 'Creative AI', href: '/ai-exhibition?category=Creative+AI' }
      ]
    },
    {
      title: 'Resources',
      links: [
        { label: 'Documentation', href: '/docs' },
        { label: 'GitHub', href: 'https://github.com' },
        { label: 'Blog', href: '/blog' },
        { label: 'Contact', href: '/contact' }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background-primary">
      {/* Navigation */}
      <Navigation
        items={navigationItems}
        logo={{ text: 'AI Exhibition' }}
        actions={{
          primary: { label: 'Get Started', onClick: () => console.log('Get Started clicked') },
          secondary: { label: 'Sign In', onClick: () => console.log('Sign In clicked') }
        }}
        sticky
      />

      {/* Hero Section */}
      <Hero
        variant="centered"
        title="AI 활용 아이디어 전시관"
        description="혁신적인 AI 프로젝트들을 탐험하고 영감을 얻어보세요. 다양한 분야의 AI 활용 사례를 통해 미래 기술의 가능성을 확인할 수 있습니다."
        primaryAction={{ 
          label: "프로젝트 탐험하기", 
          onClick: () => document.getElementById('projects-section')?.scrollIntoView({ behavior: 'smooth' })
        }}
        secondaryAction={{ 
          label: "자세히 알아보기", 
          onClick: () => console.log('Learn more clicked')
        }}
        className="mb-16"
      />

      {/* Search and Filter Section */}
      <section className="container-linear mb-12">
        <div className="bg-surface-primary border border-border-primary rounded-lg p-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            {/* Search */}
            <div className="lg:col-span-2">
              <Input
                placeholder="프로젝트 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                leftIcon={
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                }
              />
            </div>

            {/* Category Filter */}
            <div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value as AICategory | 'All')}
                className="w-full px-3 py-2 bg-surface-secondary border border-border-primary rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary"
              >
                <option value="All">모든 카테고리</option>
                {categories.map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* Difficulty Filter */}
            <div>
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="w-full px-3 py-2 bg-surface-secondary border border-border-primary rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary"
              >
                <option value="All">모든 난이도</option>
                {difficulties.map((difficulty) => (
                  <option key={difficulty} value={difficulty}>{difficulty}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Status Filter */}
          <div className="mt-4 flex flex-wrap gap-2">
            <Button
              variant={selectedStatus === 'All' ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setSelectedStatus('All')}
            >
              모든 상태
            </Button>
            {statuses.map((status) => (
              <Button
                key={status}
                variant={selectedStatus === status ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setSelectedStatus(status)}
              >
                {status}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      {featuredProjects.length > 0 && (
        <section className="container-linear mb-16">
          <div className="mb-8">
            <Heading as="h2" className="mb-2">Featured Projects</Heading>
            <Text color="secondary">특별히 선별된 혁신적인 AI 프로젝트들</Text>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects.map((project) => (
              <AIProjectCard
                key={project.id}
                project={project}
                variant="featured"
                onClick={handleProjectClick}
                showTags
                showTeam
                showResults
              />
            ))}
          </div>
        </section>
      )}

      {/* All Projects */}
      <section id="projects-section" className="container-linear mb-16">
        <div className="mb-8">
          <Heading as="h2" className="mb-2">All Projects</Heading>
          <Text color="secondary">
            {filteredProjects.length}개의 프로젝트를 찾았습니다
          </Text>
        </div>
        
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProjects.map((project) => (
              <AIProjectCard
                key={project.id}
                project={project}
                onClick={handleProjectClick}
                showTags
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Text color="secondary" className="text-lg">
              검색 조건에 맞는 프로젝트가 없습니다.
            </Text>
            <Button
              variant="ghost"
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('All');
                setSelectedDifficulty('All');
                setSelectedStatus('All');
              }}
              className="mt-4"
            >
              필터 초기화
            </Button>
          </div>
        )}
      </section>

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />

      {/* Footer */}
      <Footer
        sections={footerSections}
        socialLinks={[
          {
            name: 'GitHub',
            href: 'https://github.com',
            icon: (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            )
          },
          {
            name: 'Twitter',
            href: 'https://twitter.com',
            icon: (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
            )
          }
        ]}
        newsletter={{
          title: 'AI 업데이트 받기',
          description: '최신 AI 프로젝트와 기술 동향을 이메일로 받아보세요.',
          placeholder: '이메일 주소를 입력하세요',
          buttonText: '구독하기',
          onSubmit: (email) => console.log('Newsletter subscription:', email)
        }}
      />
    </div>
  );
} 