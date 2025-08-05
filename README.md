# KCA AI LAB Design System

한국방송통신전파진흥원(KCA)의 AI 혁신 연구팀을 위한 디자인 시스템과 컴포넌트 라이브러리입니다.

## 🚀 주요 기능

### 🎨 AI 이미지 생성 기능
- **OpenAI DALL-E 3 API**를 사용한 전문적인 이미지 생성
- 프로젝트, 팀, 기술 스택별 맞춤형 이미지 생성
- 실시간 프롬프트 미리보기 및 커스텀 프롬프트 지원
- 이미지 크기, 품질, 스타일 조정 가능
- 생성된 이미지 캐싱 및 다운로드 기능

### 🧩 Linear Design System 기반 컴포넌트
- 일관된 디자인 언어와 색상 시스템
- 접근성 최적화된 UI 컴포넌트
- 성능 최적화된 번들링
- TypeScript 완전 지원

## 📦 설치 및 설정

### 1. 의존성 설치
```bash
npm install
```

### 2. 환경 변수 설정
`.env.local` 파일을 생성하고 다음 내용을 추가하세요:

```env
# OpenAI API Configuration
OPENAI_API_KEY=your_openai_api_key_here
OPENAI_API_URL=https://api.openai.com/v1

# Application Configuration
NEXT_PUBLIC_APP_NAME=KCA AI LAB Design System
NEXT_PUBLIC_APP_VERSION=0.1.0

# Development Configuration
NODE_ENV=development
```

### 3. 개발 서버 실행
```bash
npm run dev
```

## 🎨 AI 이미지 생성 사용법

### 기본 사용법
```tsx
import { AIImageGenerator } from '@/components/ui';

// 프로젝트 이미지 생성
<AIImageGenerator
  type="project"
  title="AI 문서 자동화 시스템"
  description="공문서 작성 및 검토 프로세스를 AI로 자동화"
  techStack={['NLP', 'OCR', 'Python']}
  onImageGenerated={(imageUrl) => console.log('Generated:', imageUrl)}
  onError={(error) => console.error('Error:', error)}
/>
```

### 팀 이미지 생성
```tsx
<AIImageGenerator
  type="team"
  title="Team Alpha"
  description="AI 문서 자동화 시스템 개발팀"
  memberCount={4}
  onImageGenerated={(imageUrl) => setTeamImage(imageUrl)}
/>
```

### 기술 스택 이미지 생성
```tsx
<AIImageGenerator
  type="tech"
  title="Python"
  description="AI/ML 개발의 핵심 언어"
  onImageGenerated={(imageUrl) => setTechImage(imageUrl)}
/>
```

### 고급 설정
```tsx
<AIImageGenerator
  type="project"
  title="프로젝트 제목"
  description="프로젝트 설명"
  customPrompt="커스텀 프롬프트"
  imageSize="1024x1024"
  imageQuality="hd"
  imageStyle="vivid"
  onImageGenerated={handleImageGenerated}
  onError={handleError}
  onLoadingChange={handleLoadingChange}
/>
```

## 🧩 컴포넌트 사용법

### 기본 컴포넌트
```tsx
import { Button, Card, Heading, Text } from '@/components/ui';

<Card>
  <CardHeader>
    <Heading as="h2">제목</Heading>
  </CardHeader>
  <CardContent>
    <Text>내용</Text>
    <Button variant="primary">버튼</Button>
  </CardContent>
</Card>
```

### 레이아웃 컴포넌트
```tsx
import { Navigation, Hero, Footer } from '@/components/ui';

<Navigation
  items={[
    { label: 'Home', href: '/' },
    { label: 'Projects', href: '/projects' }
  ]}
  actions={{
    primary: { label: 'Get Started', onClick: () => {} }
  }}
/>

<Hero
  title="메인 제목"
  description="설명 텍스트"
  primaryAction={{ label: "시작하기", onClick: () => {} }}
/>
```

## 🎯 주요 페이지

- **홈페이지** (`/`): KCA AI LAB 소개 및 프로젝트 갤러리
- **프로젝트** (`/projects`): AI 프로젝트 관리 및 상세 정보
- **컴포넌트** (`/components`): 디자인 시스템 컴포넌트 갤러리
- **AI 이미지 데모** (`/ai-image-demo`): AI 이미지 생성 기능 테스트

## 🛠 개발 도구

### 스크립트
```bash
# 개발 서버
npm run dev

# 빌드
npm run build

# 린트 검사
npm run lint

# 타입 검사
npm run type-check

# 테스트
npm run test

# 번들 분석
npm run analyze-bundle
```

### 환경 설정
- **TypeScript**: 엄격한 타입 검사
- **ESLint**: 코드 품질 관리
- **Prettier**: 코드 포맷팅
- **Husky**: Git 훅 관리
- **Jest**: 테스트 프레임워크

## 🎨 디자인 시스템

### 색상 팔레트
```css
/* 브랜드 색상 */
--brand-primary: #3B82F6;

/* 배경 색상 */
--background-primary: #08090A;
--background-secondary: #141516;

/* 텍스트 색상 */
--text-primary: #F7F8F8;
--text-secondary: rgba(255, 255, 255, 0.7);
```

### 타이포그래피
```css
/* 헤딩 */
font-size: 3.5rem; /* h1 */
font-size: 1.3125rem; /* h2, h3 */
font-size: 0.875rem; /* h4 */

/* 본문 */
font-size: 1.3125rem; /* body-large */
font-size: 0.875rem; /* body-medium */
font-size: 0.8125rem; /* body-small */
```

### 간격 시스템
```css
--spacing-xs: 0.25rem;  /* 4px */
--spacing-sm: 0.5rem;   /* 8px */
--spacing-md: 1rem;      /* 16px */
--spacing-lg: 1.5rem;    /* 24px */
--spacing-xl: 2rem;      /* 32px */
```

## 🔧 성능 최적화

### 번들 최적화
- Tree-shaking을 통한 사용하지 않는 코드 제거
- 코드 스플리팅으로 초기 로딩 시간 단축
- 이미지 최적화 및 지연 로딩
- 컴포넌트 지연 로딩

### 캐싱 전략
- 생성된 이미지 캐싱
- API 응답 캐싱
- 정적 자산 캐싱

## 🚀 배포

### Vercel 배포
```bash
# Vercel CLI 설치
npm i -g vercel

# 배포
vercel --prod
```

### 환경 변수 설정
배포 시 다음 환경 변수를 설정하세요:
- `OPENAI_API_KEY`: OpenAI API 키
- `NODE_ENV`: production

## 📝 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.

## 🤝 기여하기

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 문의

프로젝트에 대한 문의사항이 있으시면 이슈를 생성해 주세요. 