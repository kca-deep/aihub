/**
 * KCA AI LAB Design System - AI Image Generator Demo
 * AI 이미지 생성 기능 데모 페이지
 */

'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { 
  AIImageGenerator, 
  Heading, 
  Text, 
  Card, 
  CardContent, 
  CardHeader,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent
} from '@/components/ui';
import { cn } from '@/lib/utils';

export default function AIImageDemoPage() {
  const [generatedImages, setGeneratedImages] = useState<{
    project?: string;
    team?: string;
    tech?: string;
  }>({});

  const handleImageGenerated = (type: string, imageUrl: string) => {
    setGeneratedImages(prev => ({
      ...prev,
      [type]: imageUrl
    }));
  };

  const handleError = (error: string) => {
    console.error('Image generation error:', error);
    
    // API 키 관련 오류인 경우 더 자세한 안내
    if (error.includes('API 키가 설정되지 않았습니다')) {
      alert(`OpenAI API 키가 설정되지 않았습니다.\n\n설정 방법:\n1. 프로젝트 루트에 .env.local 파일 생성\n2. OPENAI_API_KEY=your_api_key_here 추가\n3. 서버 재시작`);
    } else {
      alert(`Error: ${error}`);
    }
  };

  return (
    <div className="min-h-screen bg-background-primary">
      <div className="container-linear py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <Heading as="h1" className="text-h1 mb-4">
            AI Image Generator Demo
          </Heading>
          <Text size="large" className="text-text-secondary max-w-2xl mx-auto">
            OpenAI DALL-E 3를 사용하여 프로젝트, 팀, 기술 스택에 대한 전문적인 이미지를 생성해보세요.
          </Text>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="project" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="project">Project Images</TabsTrigger>
            <TabsTrigger value="team">Team Images</TabsTrigger>
            <TabsTrigger value="tech">Tech Stack Images</TabsTrigger>
          </TabsList>

          {/* Project Images Tab */}
          <TabsContent value="project" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* AI 문서 자동화 시스템 */}
              <AIImageGenerator
                type="project"
                title="AI 문서 자동화 시스템"
                description="공문서 작성 및 검토 프로세스를 AI로 자동화하여 업무 효율성 300% 향상"
                techStack={['NLP', 'OCR', 'Python']}
                onImageGenerated={(url) => handleImageGenerated('project', url)}
                onError={handleError}
                className="h-fit"
              />

              {/* 생성된 이미지 표시 */}
              {generatedImages.project && (
                <Card className="h-fit">
                  <CardHeader>
                    <Heading as="h3">Generated Project Image</Heading>
                  </CardHeader>
                  <CardContent>
                    <Image
                      src={generatedImages.project}
                      alt="Generated Project Image"
                      width={1024}
                      height={1024}
                      className="w-full h-auto rounded-lg"
                      unoptimized
                    />
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          {/* Team Images Tab */}
          <TabsContent value="team" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Team Alpha */}
              <AIImageGenerator
                type="team"
                title="Team Alpha"
                description="AI 문서 자동화 시스템 개발팀"
                memberCount={4}
                onImageGenerated={(url) => handleImageGenerated('team', url)}
                onError={handleError}
                className="h-fit"
              />

              {/* 생성된 이미지 표시 */}
              {generatedImages.team && (
                <Card className="h-fit">
                  <CardHeader>
                    <Heading as="h3">Generated Team Image</Heading>
                  </CardHeader>
                  <CardContent>
                    <Image
                      src={generatedImages.team}
                      alt="Generated Team Image"
                      width={1024}
                      height={1024}
                      className="w-full h-auto rounded-lg"
                      unoptimized
                    />
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          {/* Tech Stack Images Tab */}
          <TabsContent value="tech" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Python */}
              <AIImageGenerator
                type="tech"
                title="Python"
                description="AI/ML 개발의 핵심 언어"
                onImageGenerated={(url) => handleImageGenerated('tech', url)}
                onError={handleError}
                className="h-fit"
              />

              {/* 생성된 이미지 표시 */}
              {generatedImages.tech && (
                <Card className="h-fit">
                  <CardHeader>
                    <Heading as="h3">Generated Tech Image</Heading>
                  </CardHeader>
                  <CardContent>
                    <Image
                      src={generatedImages.tech}
                      alt="Generated Tech Image"
                      width={1024}
                      height={1024}
                      className="w-full h-auto rounded-lg"
                      unoptimized
                    />
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>

        {/* Usage Instructions */}
        <Card className="mt-16">
          <CardHeader>
            <Heading as="h2">사용 방법</Heading>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Text size="medium" className="font-medium mb-2">
                1. 환경 설정
              </Text>
              <Text size="small" className="text-text-secondary mb-2">
                프로젝트 루트에 <code className="bg-surface-secondary px-2 py-1 rounded">.env.local</code> 파일을 생성하고 다음 내용을 추가하세요:
              </Text>
              <pre className="bg-surface-secondary p-3 rounded text-xs overflow-x-auto">
{`OPENAI_API_KEY=your_openai_api_key_here
OPENAI_API_URL=https://api.openai.com/v1`}
              </pre>
              <Text size="small" className="text-text-secondary mt-2">
                OpenAI API 키는 <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" className="text-brand-primary hover:underline">OpenAI Platform</a>에서 발급받을 수 있습니다.
              </Text>
            </div>

            <div>
              <Text size="medium" className="font-medium mb-2">
                2. 이미지 생성
              </Text>
              <Text size="small" className="text-text-secondary">
                각 탭에서 해당하는 타입의 이미지를 생성할 수 있습니다. 
                커스텀 프롬프트를 입력하거나 자동 생성된 프롬프트를 사용하세요.
              </Text>
            </div>

            <div>
              <Text size="medium" className="font-medium mb-2">
                3. 이미지 설정
              </Text>
              <Text size="small" className="text-text-secondary">
                이미지 크기, 품질, 스타일을 조정할 수 있습니다. 
                HD 품질은 더 높은 비용이 발생할 수 있습니다.
              </Text>
            </div>

            <div>
              <Text size="medium" className="font-medium mb-2">
                4. 다운로드
              </Text>
              <Text size="small" className="text-text-secondary">
                생성된 이미지는 다운로드 버튼을 클릭하여 저장할 수 있습니다.
              </Text>
            </div>
          </CardContent>
        </Card>

        {/* API Information */}
        <Card className="mt-8">
          <CardHeader>
            <Heading as="h2">API 정보</Heading>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Text size="medium" className="font-medium mb-2">
                OpenAI DALL-E 3 API
              </Text>
              <Text size="small" className="text-text-secondary">
                이 기능은 OpenAI의 DALL-E 3 API를 사용합니다. 
                API 사용량에 따라 비용이 발생할 수 있습니다.
              </Text>
            </div>

            <div>
              <Text size="medium" className="font-medium mb-2">
                요청 예시
              </Text>
              <pre className="bg-surface-secondary p-4 rounded text-xs overflow-x-auto">
{`curl https://api.openai.com/v1/images/generations \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer $OPENAI_API_KEY" \\
  -d '{
    "model": "dall-e-3",
    "prompt": "Create a modern, professional illustration...",
    "n": 1,
    "size": "1024x1024"
  }'`}
              </pre>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 