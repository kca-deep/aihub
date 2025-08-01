'use client';

import React from 'react';
import { 
  Hero, 
  Button, 
  Card, 
  CardContent, 
  CardHeader, 
  Heading, 
  Text, 
  Navigation,
  Footer,
  ImageCard,
  Logo
} from '@/components/ui';
import { cn } from '@/lib/utils';

export default function HomePage() {
  const projects = [
    {
      id: 'project-1',
      title: 'AI 문서 자동화 시스템',
      description: '공문서 작성 및 검토 프로세스를 AI로 자동화하여 업무 효율성 300% 향상',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
      team: 'Team Alpha',
      members: 4,
      progress: 100,
      tech: ['NLP', 'OCR', 'Python'],
      impact: '업무 시간 60% 단축'
    },
    {
      id: 'project-2',
      title: '스마트 고객 응대 챗봇',
      description: '자연어 처리를 활용한 지능형 고객 상담 시스템 구축',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop',
      team: 'Team Beta',
      members: 3,
      progress: 85,
      tech: ['ChatGPT API', 'FastAPI', 'React'],
      impact: '응대 시간 80% 단축'
    },
    {
      id: 'project-3',
      title: '데이터 분석 대시보드',
      description: '실시간 데이터 시각화를 통한 의사결정 지원 시스템',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
      team: 'Team Gamma',
      members: 3,
      progress: 90,
      tech: ['Tableau', 'Python', 'SQL'],
      impact: '분석 시간 70% 단축'
    },
    {
      id: 'project-4',
      title: 'AI 기반 예측 모델',
      description: '머신러닝을 활용한 업무 트렌드 예측 및 리소스 최적화',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=300&fit=crop',
      team: 'Team Delta',
      members: 3,
      progress: 75,
      tech: ['TensorFlow', 'Scikit-learn', 'Docker'],
      impact: '예측 정확도 85% 달성'
    }
  ];

  const teams = [
    {
      name: 'Team Alpha',
      project: 'AI 문서 자동화 시스템',
      members: ['김혁신', '박효율', '이자동', '최스마트'],
      progress: 100,
      achievement: '업무 프로세스 완전 자동화 달성'
    },
    {
      name: 'Team Beta',
      project: '스마트 고객 응대 챗봇',
      members: ['정대화', '한지능', '강자연'],
      progress: 85,
      achievement: '고객 만족도 95% 달성'
    },
    {
      name: 'Team Gamma',
      project: '데이터 분석 대시보드',
      members: ['윤분석', '조시각', '임실시간'],
      progress: 90,
      achievement: '의사결정 시간 50% 단축'
    },
    {
      name: 'Team Delta',
      project: 'AI 기반 예측 모델',
      members: ['백예측', '송머신', '임학습'],
      progress: 75,
      achievement: '예측 모델 정확도 85% 달성'
    }
  ];

  const impactStats = [
    { label: '업무 효율성 개선', value: '300%', description: 'AI 도입으로 달성' },
    { label: '시간 절약', value: '60%', description: '평균 업무 시간 단축' },
    { label: '프로세스 자동화', value: '85%', description: '수동 작업 대비' },
    { label: '사용자 만족도', value: '95%', description: '시스템 도입 후' }
  ];

  const techStack = [
    { 
      name: 'Python', 
      description: 'AI/ML 개발의 핵심 언어', 
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
      )
    },
    { 
      name: 'TensorFlow', 
      description: '딥러닝 모델 구축', 
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
          <path d="M12 2v20"/>
        </svg>
      )
    },
    { 
      name: 'NLP', 
      description: '자연어 처리 기술', 
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          <path d="M8 9h8M8 13h6"/>
        </svg>
      )
    },
    { 
      name: 'React', 
      description: '사용자 인터페이스', 
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
      )
    },
    { 
      name: 'Docker', 
      description: '컨테이너화 및 배포', 
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
          <path d="M3 3h18v18H3V3zm16 16V5H5v14h14z"/>
          <path d="M7 7h4v4H7V7zm6 0h4v4h-4V7zM7 13h4v4H7v-4zm6 0h4v4h-4v-4z"/>
        </svg>
      )
    },
    { 
      name: 'FastAPI', 
      description: '고성능 API 서버', 
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L2 7l10 5 10-5-10-5z"/>
          <path d="M2 17l10 5 10-5"/>
          <path d="M2 12l10 5 10-5"/>
        </svg>
      )
    }
  ];

  const heroStats = [
    { value: '4개', label: '프로젝트' },
    { value: '13명', label: '참여' },
    { value: '12주', label: '개발' }
  ];

  const scrollToSection = (sectionId: string) => {
    if (sectionId === 'hero') {
      // Home 버튼의 경우 페이지 최상단으로 스크롤
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="min-h-screen bg-background-primary">
      {/* Navigation */}
      <Navigation
        items={[
          { label: 'Home', href: '#hero', onClick: () => scrollToSection('hero') },
          { label: 'Projects', href: '#projects', onClick: () => scrollToSection('projects') },
          { label: 'Teams', href: '#teams', onClick: () => scrollToSection('teams') },
          { label: 'About', href: '#about', onClick: () => scrollToSection('about') }
        ]}
        actions={{
          primary: { 
            label: 'Components', 
            href: '/components'
          },
          secondary: { 
            label: '팀 소개', 
            onClick: () => scrollToSection('teams') 
          }
        }}
        variant="transparent"
        sticky
        logo={<Logo variant="white" size="md" />}
      />

      {/* Hero Section */}
      <section id="hero">
        <Hero
          variant="centered"
          size="md"
          title="KCA AI LAB"
          subtitle="13명이 만든 AI 혁신의 시작"
          description="한국방송통신전파진흥원(KCA)의 공공기관 업무 효율성 향상을 위한 파일럿 프로젝트를 통해 AI 기술의 실무 적용 가능성을 검증하고, 디지털 전환의 새로운 모델을 제시합니다."
        primaryAction={{ 
          label: "프로젝트 탐색", 
          onClick: () => scrollToSection('projects') 
        }}
        secondaryAction={{ 
          label: "팀 소개", 
          onClick: () => scrollToSection('teams') 
        }}
        badge={{ text: "AI Innovation", variant: "brand" }}
        stats={heroStats}
        backgroundVideo={{
          src: ["/videos/ai-background.mp4", "/videos/ai-background_sec.mp4", "/videos/ai-background_third.mp4"],
          poster: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1920&h=1080&fit=crop",
          muted: true,
          loop: true,
          autoplay: true,
          crossfade: true
        }}
        overlay={true}
        overlayOpacity={0.7}
        className="section-padding"
      />
      </section>

      {/* Projects Section */}
      <section id="projects" className="section-padding bg-background-secondary">
        <div className="container-linear">
          <div className="text-center mb-16">
            <Heading as="h2" className="text-h2 mb-4">
              AI Innovation Projects
            </Heading>
            <Text size="large" className="text-text-secondary max-w-2xl mx-auto">
              4개 팀이 12주간 진행한 혁신적인 AI 프로젝트들을 확인해보세요
            </Text>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <Card key={project.id} variant="elevated" hoverable clickable className="h-full group">
                <CardHeader>
                  <div className="relative mb-4">
                    <div className="w-full h-48 bg-surface-secondary rounded-lg overflow-hidden">
                      <img 
                        src={project.image} 
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="absolute top-3 right-3 bg-brand-primary text-white px-2 py-1 rounded text-xs font-medium">
                      {project.team}
                    </div>
                  </div>
                  <Heading as="h3" className="mb-2">
                    {project.title}
                  </Heading>
                  <Text size="medium" className="text-text-secondary mb-4">
                    {project.description}
                  </Text>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech, techIndex) => (
                      <span 
                        key={techIndex}
                        className="px-2 py-1 bg-surface-tertiary text-text-secondary text-xs rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="flex -space-x-2">
                        {Array.from({ length: project.members }, (_, i) => (
                          <div 
                            key={i}
                            className="w-6 h-6 bg-brand-primary rounded-full border-2 border-background-secondary"
                          />
                        ))}
                      </div>
                      <Text size="small" className="text-text-tertiary">
                        {project.members}명
                      </Text>
                    </div>
                    <div className="text-right">
                      <Text size="small" className="text-brand-primary font-medium">
                        {project.progress}%
                      </Text>
                      <div className="w-16 h-1 bg-surface-tertiary rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-brand-primary rounded-full transition-all duration-500"
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 p-3 bg-surface-primary rounded-lg">
                    <Text size="small" className="text-text-secondary">
                      <span className="text-brand-primary font-medium">Impact:</span> {project.impact}
                    </Text>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Teams Section */}
      <section id="teams" className="section-padding">
        <div className="container-linear">
          <div className="text-center mb-16">
            <Heading as="h2" className="text-h2 mb-4">
              Our Innovation Teams
            </Heading>
            <Text size="large" className="text-text-secondary max-w-2xl mx-auto">
              작은 팀, 큰 변화를 만들어가는 KCA의 혁신가들
            </Text>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teams.map((team, index) => (
              <Card key={team.name} variant="elevated" hoverable className="h-full">
                <CardHeader>
                  <Heading as="h3" className="text-lg mb-2">
                    {team.name}
                  </Heading>
                  <Text size="small" className="text-text-secondary mb-4">
                    {team.project}
                  </Text>
                  <div className="flex -space-x-2 mb-4">
                    {team.members.map((member, memberIndex) => (
                      <div 
                        key={memberIndex}
                        className="w-8 h-8 bg-brand-primary rounded-full border-2 border-background-primary flex items-center justify-center"
                      >
                        <Text size="small" className="text-white font-medium">
                          {member.charAt(0)}
                        </Text>
                      </div>
                    ))}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <Text size="small" className="text-text-secondary">
                        진행률
                      </Text>
                      <Text size="small" className="text-brand-primary font-medium">
                        {team.progress}%
                      </Text>
                    </div>
                    <div className="w-full h-2 bg-surface-tertiary rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-brand-primary rounded-full transition-all duration-1000"
                        style={{ width: `${team.progress}%` }}
                      />
                    </div>
                  </div>
                  <Text size="small" className="text-text-secondary">
                    {team.achievement}
                  </Text>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Dashboard Section */}
      <section className="section-padding bg-background-secondary">
        <div className="container-linear">
          <div className="text-center mb-16">
            <Heading as="h2" className="text-h2 mb-4">
              Project Impact
            </Heading>
            <Text size="large" className="text-text-secondary max-w-2xl mx-auto">
              AI 도입으로 달성한 구체적인 성과들
            </Text>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {impactStats.map((stat, index) => (
              <Card key={stat.label} variant="elevated" className="text-center group hover:scale-105 transition-transform duration-300">
                <CardContent className="p-6">
                  <div className="text-3xl font-bold text-brand-primary mb-2 group-hover:scale-110 transition-transform duration-300">
                    {stat.value}
                  </div>
                  <Heading as="h3" className="text-lg mb-2">
                    {stat.label}
                  </Heading>
                  <Text size="small" className="text-text-secondary">
                    {stat.description}
                  </Text>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Stack Section */}
      <section className="section-padding">
        <div className="container-linear">
          <div className="text-center mb-16">
            <Heading as="h2" className="text-h2 mb-4">
              Technology Stack
            </Heading>
            <Text size="large" className="text-text-secondary max-w-2xl mx-auto">
              프로젝트에서 활용된 최신 AI/ML 기술들
            </Text>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {techStack.map((tech, index) => (
              <Card key={tech.name} variant="elevated" hoverable className="text-center group">
                <CardContent className="p-6">
                  <div className="text-3xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {tech.icon}
                  </div>
                  <Heading as="h3" className="text-lg mb-2">
                    {tech.name}
                  </Heading>
                  <Text size="small" className="text-text-secondary">
                    {tech.description}
                  </Text>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-background-secondary">
        <div className="container-linear text-center">
          <Heading as="h2" className="text-h2 mb-4">
            더 많은 AI 프로젝트가 준비 중입니다
          </Heading>
          <Text size="large" className="text-text-secondary max-w-2xl mx-auto mb-8">
            KCA AI LAB은 지속적인 혁신을 통해 공공부문의 디지털 전환을 이끌어갑니다
          </Text>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="primary" 
              size="lg"
              onClick={() => scrollToSection('projects')}
            >
              프로젝트 자세히 보기
            </Button>
            <Button 
              variant="secondary" 
              size="lg"
              onClick={() => scrollToSection('teams')}
            >
              팀 소개 보기
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section-padding bg-background-primary">
        <div className="container-linear">
          <div className="text-center mb-16">
                         <Heading as="h2" className="text-h2 mb-4">
               About KCA AI LAB
             </Heading>
             <Text size="large" className="text-text-secondary max-w-3xl mx-auto">
               한국방송통신전파진흥원(KCA)의 AI 혁신 연구팀으로, 공공기관의 디지털 전환을 위한
               실용적인 AI 솔루션을 개발하고 있습니다.
             </Text>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Heading as="h3" className="text-h3 mb-6">
                우리의 미션
              </Heading>
              <Text size="medium" className="text-text-secondary mb-6">
                공공기관의 업무 효율성 향상과 시민 서비스 개선을 위해 
                최신 AI 기술을 활용한 실용적인 솔루션을 개발합니다.
              </Text>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-brand-primary rounded-full mt-2"></div>
                  <Text size="medium">문서 자동화 및 지능형 검토 시스템</Text>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-brand-primary rounded-full mt-2"></div>
                  <Text size="medium">자연어 처리 기반 고객 응대 시스템</Text>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-brand-primary rounded-full mt-2"></div>
                  <Text size="medium">데이터 기반 의사결정 지원 시스템</Text>
                </div>
              </div>
            </div>
            
            <div className="bg-surface-secondary rounded-lg p-8">
              <Heading as="h3" className="text-h3 mb-6">
                핵심 가치
              </Heading>
              <div className="space-y-6">
                <div>
                  <Text size="medium" className="font-medium mb-2">혁신성</Text>
                  <Text size="small" className="text-text-secondary">
                    최신 AI 기술을 활용한 혁신적인 솔루션 개발
                  </Text>
                </div>
                <div>
                  <Text size="medium" className="font-medium mb-2">실용성</Text>
                  <Text size="small" className="text-text-secondary">
                    실제 업무 환경에서 활용 가능한 실용적인 시스템 구축
                  </Text>
                </div>
                <div>
                  <Text size="medium" className="font-medium mb-2">협력성</Text>
                  <Text size="small" className="text-text-secondary">
                    다양한 전문가와의 협력을 통한 종합적 솔루션 제공
                  </Text>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer
        sections={[
          {
            title: 'KCA AI LAB',
            links: [
              { label: '프로젝트 소개', href: '#projects' },
              { label: '팀 소개', href: '#teams' },
              { label: '기술 스택', href: '#tech' },
              { label: '성과 지표', href: '#impact' }
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
          },
          {
            title: '리소스',
            links: [
              { label: 'KCA 홈페이지', href: 'https://www.kca.kr' },
              { label: 'AI 정책', href: '#' },
              { label: '문서', href: '#' }
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
          },
          {
            name: 'LinkedIn',
            href: '#',
            icon: (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
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