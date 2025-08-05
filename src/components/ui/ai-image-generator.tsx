/**
 * KCA AI LAB Design System - AI 이미지 생성 컴포넌트
 * OpenAI API를 사용한 이미지 생성 컴포넌트
 */

import React, { useState, useCallback } from 'react';
import Image from 'next/image';
import { 
  Button, 
  Card, 
  CardContent, 
  CardHeader, 
  Heading, 
  Text, 
  Input,
  Alert,
  AlertDescription
} from '@/components/ui';
import { cn } from '@/lib/utils';
import { 
  useImageGeneration, 
  generateProjectImagePrompt,
  generateTeamImagePrompt,
  generateTechStackImagePrompt,
  type ImageGenerationRequest 
} from '@/lib/ai-image';

// =====================================
// 1. 타입 정의
// =====================================

export interface AIImageGeneratorProps {
  /** 이미지 타입 */
  type: 'project' | 'team' | 'tech';
  /** 프로젝트 제목 */
  title?: string;
  /** 프로젝트 설명 */
  description?: string;
  /** 기술 스택 */
  techStack?: string[];
  /** 팀 멤버 수 */
  memberCount?: number;
  /** 생성된 이미지 URL */
  onImageGenerated?: (imageUrl: string) => void;
  /** 에러 발생 시 콜백 */
  onError?: (error: string) => void;
  /** 로딩 상태 변경 콜백 */
  onLoadingChange?: (isLoading: boolean) => void;
  /** 커스텀 프롬프트 */
  customPrompt?: string;
  /** 이미지 크기 */
  imageSize?: '256x256' | '512x512' | '1024x1024' | '1792x1024' | '1024x1792';
  /** 이미지 품질 */
  imageQuality?: 'standard' | 'hd';
  /** 이미지 스타일 */
  imageStyle?: 'vivid' | 'natural';
  /** 클래스명 */
  className?: string;
}

// =====================================
// 2. 컴포넌트
// =====================================

export const AIImageGenerator: React.FC<AIImageGeneratorProps> = ({
  type,
  title = '',
  description = '',
  techStack = [],
  memberCount = 0,
  onImageGenerated,
  onError,
  onLoadingChange,
  customPrompt,
  imageSize = '1024x1024',
  imageQuality = 'standard',
  imageStyle = 'vivid',
  className,
}) => {
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string>('');
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [customPromptInput, setCustomPromptInput] = useState(customPrompt || '');
  const [selectedImageSize, setSelectedImageSize] = useState(imageSize);
  const [selectedImageQuality, setSelectedImageQuality] = useState(imageQuality);
  const [selectedImageStyle, setSelectedImageStyle] = useState(imageStyle);

  const { generateImage, isGenerating, error, clearError } = useImageGeneration();

  // 프롬프트 생성
  const generatePrompt = useCallback((): string => {
    if (customPromptInput) {
      return customPromptInput;
    }

    switch (type) {
      case 'project':
        return generateProjectImagePrompt(title, description, techStack);
      case 'team':
        return generateTeamImagePrompt(title, description, memberCount);
      case 'tech':
        return generateTechStackImagePrompt(title, description);
      default:
        return `${title}에 대한 현대적이고 전문적인 일러스트레이션을 생성해주세요`;
    }
  }, [type, title, description, techStack, memberCount, customPromptInput]);

  // 이미지 생성 핸들러
  const handleGenerateImage = useCallback(async () => {
    try {
      clearError();
      onLoadingChange?.(true);

      const prompt = generatePrompt();
      
      console.log('🎨 Starting image generation with prompt:', prompt);
      
      const request: ImageGenerationRequest = {
        prompt,
        size: selectedImageSize,
        quality: selectedImageQuality,
        style: selectedImageStyle,
        n: 1,
      };

      console.log('📤 Sending image generation request:', request);

      const imageUrl = await generateImage(request);
      
      console.log('✅ Image generated successfully:', imageUrl);
      
      setGeneratedImageUrl(imageUrl);
      onImageGenerated?.(imageUrl);
    } catch (err) {
      console.error('❌ Image generation error:', err);
      
      let errorMessage = '이미지 생성에 실패했습니다';
      
      if (err instanceof Error) {
        errorMessage = err.message;
        
        // API 키 관련 오류 처리
        if (errorMessage.includes('API key is not configured')) {
          errorMessage = 'OpenAI API 키가 설정되지 않았습니다. 환경 변수 OPENAI_API_KEY를 설정해주세요.';
        }
        
        // 네트워크 오류 처리
        if (errorMessage.includes('fetch') || errorMessage.includes('network')) {
          errorMessage = '네트워크 연결 오류가 발생했습니다. 인터넷 연결을 확인해주세요.';
        }
        
        // API 제한 오류 처리
        if (errorMessage.includes('rate limit') || errorMessage.includes('quota')) {
          errorMessage = 'API 사용량 제한에 도달했습니다. 잠시 후 다시 시도해주세요.';
        }
        
        // 콘텐츠 정책 오류 처리
        if (errorMessage.includes('content policy') || errorMessage.includes('violation')) {
          errorMessage = '생성된 콘텐츠가 OpenAI 정책을 위반합니다. 다른 프롬프트를 시도해주세요.';
        }
      }
      
      console.error('❌ Final error message:', errorMessage);
      onError?.(errorMessage);
    } finally {
      onLoadingChange?.(false);
    }
  }, [
    generatePrompt,
    selectedImageSize,
    selectedImageQuality,
    selectedImageStyle,
    generateImage,
    clearError,
    onImageGenerated,
    onError,
    onLoadingChange,
  ]);

  // 프롬프트 미리보기 토글
  const togglePromptPreview = useCallback(() => {
    setIsPreviewMode(!isPreviewMode);
  }, [isPreviewMode]);

  return (
    <Card className={cn('w-full bg-surface-primary border-border-primary', className)}>
      <CardHeader className="border-b border-border-primary">
        <Heading as="h3" className="flex items-center gap-3 text-text-primary">
          <span className="text-2xl">🎨</span>
          AI 이미지 생성기
        </Heading>
        <Text size="medium" className="text-text-secondary">
          AI를 사용하여 {type === 'project' ? '프로젝트' : type === 'team' ? '팀' : '기술 스택'}에 대한 전문적인 이미지를 생성합니다
        </Text>
      </CardHeader>

      <CardContent className="space-y-6 p-6">
        {/* 에러 표시 */}
        {error && (
          <Alert variant="error" className="bg-surface-secondary border-border-secondary">
            <AlertDescription className="text-text-primary">{error}</AlertDescription>
            {error.includes('API 키가 설정되지 않았습니다') && (
              <div className="mt-3 p-3 bg-surface-tertiary rounded border border-border-secondary">
                <Text size="small" className="font-medium text-text-primary mb-2">
                  🔧 환경 변수 설정 방법:
                </Text>
                <Text size="small" className="text-text-secondary mb-2">
                  1. 프로젝트 루트에 <code className="bg-surface-primary px-1 rounded">.env.local</code> 파일을 생성하세요
                </Text>
                <Text size="small" className="text-text-secondary mb-2">
                  2. 다음 내용을 추가하세요:
                </Text>
                <pre className="bg-surface-primary p-2 rounded text-xs text-text-secondary overflow-x-auto">
{`OPENAI_API_KEY=your_openai_api_key_here
OPENAI_API_URL=https://api.openai.com/v1`}
                </pre>
                <Text size="small" className="text-text-secondary mt-2">
                  3. OpenAI API 키는 <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" className="text-brand-primary hover:underline">OpenAI Platform</a>에서 발급받을 수 있습니다
                </Text>
              </div>
            )}
          </Alert>
        )}

        {/* 프롬프트 미리보기 */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Text size="medium" className="font-medium text-text-primary">
              생성될 프롬프트
            </Text>
            <Button
              variant="ghost"
              size="sm"
              onClick={togglePromptPreview}
              className="text-text-secondary hover:text-text-primary hover:bg-surface-secondary"
            >
              {isPreviewMode ? '숨기기' : '미리보기'}
            </Button>
          </div>

          {isPreviewMode && (
            <div className="p-4 bg-surface-secondary rounded-lg border border-border-primary">
              <Text size="small" className="text-text-secondary whitespace-pre-wrap font-mono">
                {generatePrompt()}
              </Text>
            </div>
          )}
        </div>

        {/* 현재 설정 표시 */}
        <div className="p-4 bg-surface-secondary rounded-lg border border-border-primary">
          <Text size="small" className="font-medium text-text-primary mb-2">
            현재 설정
          </Text>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs text-text-secondary">
            <div>크기: {selectedImageSize}</div>
            <div>품질: {selectedImageQuality === 'standard' ? '표준' : '고화질'}</div>
            <div>스타일: {selectedImageStyle === 'vivid' ? '선명한' : '자연스러운'}</div>
          </div>
        </div>

        {/* 커스텀 프롬프트 입력 */}
        <div className="space-y-2">
          <Text size="medium" className="font-medium text-text-primary">
            커스텀 프롬프트 (선택사항)
          </Text>
                     <Input
             value={customPromptInput}
             onChange={(e) => setCustomPromptInput(e.target.value)}
             placeholder="이미지 생성을 위한 커스텀 프롬프트를 입력하세요..."
             disabled={false}
             className="bg-surface-secondary border-border-primary text-text-primary placeholder-text-tertiary"
           />
        </div>

        {/* 이미지 설정 */}
        <div className="space-y-4">
          <Text size="medium" className="font-medium text-text-primary">
            이미지 설정
          </Text>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Text size="small" className="font-medium mb-2 text-text-primary">
                이미지 크기
              </Text>
                             <select
                 value={selectedImageSize}
                 onChange={(e) => setSelectedImageSize(e.target.value as any)}
                 className="w-full p-3 bg-surface-secondary border border-border-primary rounded text-text-primary focus:border-brand-primary focus:outline-none"
                 disabled={false}
               >
                <option value="256x256">256x256 (작은 크기)</option>
                <option value="512x512">512x512 (중간 크기)</option>
                <option value="1024x1024">1024x1024 (표준 크기)</option>
                <option value="1792x1024">1792x1024 (가로형)</option>
                <option value="1024x1792">1024x1792 (세로형)</option>
              </select>
            </div>

            <div>
              <Text size="small" className="font-medium mb-2 text-text-primary">
                품질
              </Text>
                             <select
                 value={selectedImageQuality}
                 onChange={(e) => setSelectedImageQuality(e.target.value as any)}
                 className="w-full p-3 bg-surface-secondary border border-border-primary rounded text-text-primary focus:border-brand-primary focus:outline-none"
                 disabled={false}
               >
                <option value="standard">표준 (빠른 생성)</option>
                <option value="hd">고화질 (더 나은 품질)</option>
              </select>
            </div>

            <div>
              <Text size="small" className="font-medium mb-2 text-text-primary">
                스타일
              </Text>
                             <select
                 value={selectedImageStyle}
                 onChange={(e) => setSelectedImageStyle(e.target.value as any)}
                 className="w-full p-3 bg-surface-secondary border border-border-primary rounded text-text-primary focus:border-brand-primary focus:outline-none"
                 disabled={false}
               >
                <option value="vivid">선명한 (더 생생한 색상)</option>
                <option value="natural">자연스러운 (더 자연스러운 색상)</option>
              </select>
            </div>
          </div>
        </div>

        {/* 생성 버튼 */}
        <div className="space-y-2">
                     <Button
             variant="primary"
             size="lg"
             onClick={handleGenerateImage}
             disabled={false}
             loading={isGenerating}
             className="w-full bg-brand-primary hover:bg-brand-primary/90 text-text-primary font-medium"
           >
            {isGenerating ? '이미지 생성 중...' : '이미지 생성하기'}
          </Button>
          {isGenerating && (
            <Text size="small" className="text-text-secondary text-center">
              이미지 생성에는 10-30초 정도 소요될 수 있습니다
            </Text>
          )}
        </div>

        {/* 생성된 이미지 표시 */}
        {generatedImageUrl && (
          <div className="space-y-4">
            <Text size="medium" className="font-medium text-text-primary">
              생성된 이미지
            </Text>
            <div className="relative group">
              <Image
                src={generatedImageUrl}
                alt="AI 생성 이미지"
                width={1024}
                height={1024}
                className="w-full h-auto rounded-lg shadow-lg border border-border-primary"
                unoptimized
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 rounded-lg flex items-center justify-center">
                <Button
                  variant="secondary"
                  size="sm"
                  className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-surface-secondary text-text-primary hover:bg-surface-tertiary"
                  onClick={() => {
                    const link = document.createElement('a');
                    link.href = generatedImageUrl;
                    link.download = `ai-generated-image-${Date.now()}.png`;
                    link.click();
                  }}
                >
                  다운로드
                </Button>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

// =====================================
// 3. 내보내기
// =====================================

export default AIImageGenerator; 