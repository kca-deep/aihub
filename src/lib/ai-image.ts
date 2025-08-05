/**
 * KCA AI LAB Design System - AI Image Generation
 * OpenAI API를 사용한 이미지 생성 유틸리티
 */

// =====================================
// 1. Types
// =====================================

export interface ImageGenerationRequest {
  prompt: string;
  size?: '256x256' | '512x512' | '1024x1024' | '1792x1024' | '1024x1792';
  quality?: 'standard' | 'hd';
  style?: 'vivid' | 'natural';
  n?: number;
}

export interface ImageGenerationResponse {
  created: number;
  data: Array<{
    url: string;
    revised_prompt?: string;
  }>;
}

export interface ImageGenerationError {
  error: {
    message: string;
    type: string;
    code?: string;
  };
}

// =====================================
// 2. OpenAI API Configuration
// =====================================

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_API_URL = process.env.OPENAI_API_URL || 'https://api.openai.com/v1';

console.log('🔧 Environment Check:', {
  hasApiKey: !!OPENAI_API_KEY,
  apiKeyLength: OPENAI_API_KEY?.length || 0,
  apiUrl: OPENAI_API_URL,
  nodeEnv: process.env.NODE_ENV
});

if (!OPENAI_API_KEY) {
  console.warn('⚠️ OPENAI_API_KEY is not set. Image generation will not work.');
  console.warn('📝 Please create a .env.local file in the project root with:');
  console.warn('   OPENAI_API_KEY=your_openai_api_key_here');
  console.warn('   OPENAI_API_URL=https://api.openai.com/v1');
} else {
  console.log('✅ OpenAI API key is configured');
}

// =====================================
// 3. Image Generation Functions
// =====================================

/**
 * OpenAI API를 사용하여 이미지 생성
 */
export const generateImage = async (
  request: ImageGenerationRequest
): Promise<ImageGenerationResponse> => {
  console.log('🔍 AI Image Generation Debug:', {
    hasApiKey: !!OPENAI_API_KEY,
    apiUrl: OPENAI_API_URL,
    request: {
      prompt: request.prompt,
      size: request.size,
      quality: request.quality,
      style: request.style,
      n: request.n
    }
  });

  if (!OPENAI_API_KEY) {
    console.error('❌ OpenAI API key is not configured');
    throw new Error('OpenAI API key is not configured. Please set OPENAI_API_KEY in your environment variables.');
  }

  try {
    const requestBody = {
      model: 'dall-e-3',
      prompt: request.prompt,
      n: request.n || 1,
      size: request.size || '1024x1024',
      quality: request.quality || 'standard',
      style: request.style || 'vivid',
    };

    console.log('📤 Sending request to OpenAI:', {
      url: `${OPENAI_API_URL}/images/generations`,
      body: requestBody
    });

    const response = await fetch(`${OPENAI_API_URL}/images/generations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify(requestBody),
    });

    console.log('📥 Response status:', response.status, response.statusText);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ OpenAI API Error Response:', errorText);
      
      let errorData: ImageGenerationError;
      try {
        errorData = JSON.parse(errorText);
      } catch (parseError) {
        console.error('❌ Failed to parse error response:', parseError);
        throw new Error(`Image generation failed: HTTP ${response.status} - ${response.statusText}`);
      }
      
      const errorMessage = errorData.error.message || 'Unknown error';
      throw new Error(`Image generation failed: ${errorMessage}`);
    }

    const responseData = await response.json();
    console.log('✅ Image generation successful:', {
      created: responseData.created,
      imageCount: responseData.data?.length,
      firstImageUrl: responseData.data?.[0]?.url ? 'Present' : 'Missing'
    });

    return responseData;
  } catch (error) {
    console.error('❌ Image generation error:', error);
    throw error;
  }
};

/**
 * 프로젝트 타입에 따른 이미지 프롬프트 생성
 */
export const generateProjectImagePrompt = (
  projectTitle: string,
  projectDescription: string,
  techStack: string[] = []
): string => {
  const techKeywords = techStack.length > 0 ? `using ${techStack.join(', ')}` : '';
  
  return `Create a modern, professional illustration for a tech project titled "${projectTitle}". 
  The project is about: ${projectDescription} ${techKeywords}. 
  Style: Clean, minimalist design with a dark theme, suitable for a professional tech company website. 
  Colors: Use blues, grays, and whites with subtle gradients. 
  Composition: Include abstract tech elements, data visualization, or UI components that represent the project's purpose. 
  No text or logos, just visual elements.`;
};

/**
 * 팀 이미지 프롬프트 생성
 */
export const generateTeamImagePrompt = (
  teamName: string,
  projectName: string,
  memberCount: number
): string => {
  return `Create a modern, professional illustration representing a tech team called "${teamName}" 
  working on project "${projectName}" with ${memberCount} members. 
  Style: Clean, minimalist design with a dark theme, suitable for a professional tech company website. 
  Colors: Use blues, grays, and whites with subtle gradients. 
  Composition: Show collaboration, teamwork, or project development elements. 
  Include abstract representations of team collaboration, code, or project management. 
  No text or logos, just visual elements.`;
};

/**
 * 기술 스택 이미지 프롬프트 생성
 */
export const generateTechStackImagePrompt = (
  techName: string,
  description: string
): string => {
  return `Create a modern, professional icon/illustration for "${techName}" technology. 
  Description: ${description}
  Style: Clean, minimalist design with a dark theme, suitable for a professional tech company website. 
  Colors: Use blues, grays, and whites with subtle gradients. 
  Composition: Create an abstract representation or icon that symbolizes this technology. 
  No text or logos, just visual elements that represent the technology's purpose.`;
};

// =====================================
// 4. Image Processing Utilities
// =====================================

/**
 * 이미지 URL을 Base64로 변환
 */
export const convertImageToBase64 = async (imageUrl: string): Promise<string> => {
  try {
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error('Failed to convert image to base64:', error);
    throw error;
  }
};

/**
 * 이미지 최적화 (압축)
 */
export const optimizeImage = async (
  imageUrl: string,
  quality: number = 0.8
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        reject(new Error('Failed to get canvas context'));
        return;
      }
      
      canvas.width = img.width;
      canvas.height = img.height;
      
      ctx.drawImage(img, 0, 0);
      
      canvas.toBlob(
        (blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob);
            resolve(url);
          } else {
            reject(new Error('Failed to create blob'));
          }
        },
        'image/jpeg',
        quality
      );
    };
    
    img.onerror = () => reject(new Error('Failed to load image'));
    img.src = imageUrl;
  });
};

// =====================================
// 5. Caching and Storage
// =====================================

/**
 * 생성된 이미지 캐시 관리
 */
class ImageCache {
  private cache = new Map<string, string>();
  private maxSize = 50;

  set(key: string, imageUrl: string): void {
    if (this.cache.size >= this.maxSize) {
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }
    this.cache.set(key, imageUrl);
  }

  get(key: string): string | undefined {
    return this.cache.get(key);
  }

  has(key: string): boolean {
    return this.cache.has(key);
  }

  clear(): void {
    this.cache.clear();
  }
}

export const imageCache = new ImageCache();

/**
 * 캐시 키 생성
 */
export const generateCacheKey = (
  prompt: string,
  size: string = '1024x1024'
): string => {
  return `${prompt}_${size}`.replace(/[^a-zA-Z0-9]/g, '_');
};

// =====================================
// 6. Error Handling
// =====================================

/**
 * 이미지 생성 에러 처리
 */
export const handleImageGenerationError = (error: any): string => {
  console.error('🔍 Analyzing image generation error:', error);
  
  const errorMessage = error?.message || error?.toString() || 'Unknown error';
  
  console.log('📝 Error message:', errorMessage);
  
  // API 키 관련 오류
  if (errorMessage.includes('API key is not configured') || errorMessage.includes('OPENAI_API_KEY')) {
    return 'OpenAI API 키가 설정되지 않았습니다. 환경 변수 OPENAI_API_KEY를 설정해주세요.';
  }
  
  // 결제 관련 오류
  if (errorMessage.includes('billing') || errorMessage.includes('payment')) {
    return 'API 결제 한도에 도달했습니다. OpenAI 계정을 확인해주세요.';
  }
  
  // 콘텐츠 정책 오류
  if (errorMessage.includes('content policy') || errorMessage.includes('violation')) {
    return '생성된 콘텐츠가 OpenAI 정책을 위반합니다. 다른 프롬프트를 시도해주세요.';
  }
  
  // 속도 제한 오류
  if (errorMessage.includes('rate limit') || errorMessage.includes('too many requests')) {
    return 'API 속도 제한에 도달했습니다. 잠시 후 다시 시도해주세요.';
  }
  
  // 네트워크 오류
  if (errorMessage.includes('fetch') || errorMessage.includes('network') || errorMessage.includes('ENOTFOUND')) {
    return '네트워크 연결 오류가 발생했습니다. 인터넷 연결을 확인해주세요.';
  }
  
  // 인증 오류
  if (errorMessage.includes('unauthorized') || errorMessage.includes('401')) {
    return 'OpenAI API 인증에 실패했습니다. API 키를 확인해주세요.';
  }
  
  // 서버 오류
  if (errorMessage.includes('500') || errorMessage.includes('server error')) {
    return 'OpenAI 서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.';
  }
  
  // 기본 오류 메시지
  return '이미지 생성에 실패했습니다. 다시 시도해주세요.';
};

// =====================================
// 7. React Hooks
// =====================================

import { useState, useCallback } from 'react';

/**
 * 이미지 생성 훅
 */
export const useImageGeneration = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateImageWithCache = useCallback(async (
    request: ImageGenerationRequest,
    cacheKey?: string
  ): Promise<string> => {
    console.log('🔄 Starting image generation with cache...');
    setIsGenerating(true);
    setError(null);

    try {
      // 캐시 확인
      const key = cacheKey || generateCacheKey(request.prompt, request.size);
      const cachedImage = imageCache.get(key);
      
      if (cachedImage) {
        console.log('✅ Using cached image:', cachedImage);
        return cachedImage;
      }

      console.log('🔄 No cached image found, generating new image...');

      // 새 이미지 생성
      const response = await generateImage(request);
      const imageUrl = response.data[0]?.url;
      
      if (!imageUrl) {
        console.error('❌ No image URL received from API');
        throw new Error('No image URL received from API');
      }

      console.log('✅ New image generated:', imageUrl);

      // 캐시에 저장
      imageCache.set(key, imageUrl);
      
      return imageUrl;
    } catch (err) {
      console.error('❌ Error in generateImageWithCache:', err);
      const errorMessage = handleImageGenerationError(err);
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsGenerating(false);
    }
  }, []);

  return {
    generateImage: generateImageWithCache,
    isGenerating,
    error,
    clearError: () => setError(null),
  };
};

// =====================================
// 8. Export AI Image Utilities
// =====================================

const aiImageUtils = {
  generateImage,
  generateProjectImagePrompt,
  generateTeamImagePrompt,
  generateTechStackImagePrompt,
  convertImageToBase64,
  optimizeImage,
  imageCache,
  generateCacheKey,
  handleImageGenerationError,
  useImageGeneration,
};

export default aiImageUtils; 