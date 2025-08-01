# KCA AI LAB Design System Theme

KCA AI LAB Design System을 기반으로 한 완전한 웹사이트 테마와 컴포넌트 라이브러리입니다.

## 🎨 Design System

### 색상 시스템
- **Brand**: `#3B82F6` (딥 블루)
- **Background**: 다크 테마 기반 (`#08090A`, `#141516`, `#0F1011`)
- **Surface**: 서피스 색상 (`#141516`, `#282830`, `#3E3E44`)
- **Text**: 고대비 텍스트 색상 (`#F7F8F8`, `rgba(255, 255, 255, 0.7)`, `#8A8F98`)

### 타이포그래피
- **Font Family**: Inter Variable, SF Pro Display
- **Headings**: H1-H4 스타일 정의
- **Body Text**: Large, Medium, Small 크기

### 간격 시스템
- **Scale**: xs(4px) ~ 4xl(96px)
- **Layout**: Header Height, Container Max Width, Section Padding

## 🧩 Components

### 기본 컴포넌트
- **Button**: Primary, Secondary, Ghost 변형
- **Card**: Default, Elevated, Interactive
- **Typography**: Heading, Text, Label
- **Input**: Input, Textarea, Checkbox, Radio, Select
- **ImageCard**: 이미지 카드 컴포넌트
- **Carousel**: 캐러셀 컴포넌트
- **Hero**: 히어로 섹션
- **Navigation**: 네비게이션 바
- **Footer**: 푸터 컴포넌트

### 새로운 컴포넌트 (v1.1)
- **Tabs**: 탭 인터페이스 (TabsList, TabsTrigger, TabsContent)
- **Badge**: 상태 표시 배지
- **Alert**: 알림 컴포넌트 (AlertTitle, AlertDescription)

### 특수 컴포넌트
- **AIProjectCard**: AI 프로젝트 전용 카드
- **ProjectModal**: 프로젝트 모달
- **Logo**: 로고 컴포넌트

## 📁 Project Structure

```
src/
├── app/
│   ├── page.tsx              # 메인 페이지 (KCA AI LAB)
│   ├── gallery/
│   │   └── page.tsx          # 컴포넌트 갤러리
│   ├── ai-exhibition/
│   │   └── page.tsx          # AI 전시 페이지
│   ├── components/
│   │   └── page.tsx          # 컴포넌트 페이지
│   ├── globals.css           # 글로벌 스타일
│   └── layout.tsx            # 루트 레이아웃
├── components/
│   └── ui/                   # UI 컴포넌트 라이브러리
│       ├── button.tsx
│       ├── card.tsx
│       ├── typography.tsx
│       ├── input.tsx
│       ├── hero.tsx
│       ├── image-card.tsx
│       ├── carousel.tsx
│       ├── navigation.tsx
│       ├── footer.tsx
│       ├── tabs.tsx          # NEW
│       ├── badge.tsx         # NEW
│       ├── alert.tsx         # NEW
│       ├── ai-project-card.tsx
│       ├── project-modal.tsx
│       ├── logo.tsx
│       └── index.ts
└── lib/
    ├── theme.ts              # 테마 설정
    ├── utils.ts              # 유틸리티 함수
    └── ai-projects.ts        # AI 프로젝트 데이터
```

## 🚀 Getting Started

### 설치
```bash
npm install
```

### 개발 서버 실행
```bash
npm run dev
```

### 빌드
```bash
npm run build
```

## 📖 Usage

### 컴포넌트 사용법

```typescript
import { 
  Button, 
  Card, 
  Heading, 
  Text, 
  Input, 
  Tabs,
  Badge,
  Alert 
} from '@/components/ui';

// 버튼 사용
<Button variant="primary">Primary Button</Button>

// 카드 사용
<Card>
  <CardHeader>
    <Heading as="h3">Card Title</Heading>
  </CardHeader>
  <CardContent>
    <Text>Card content</Text>
  </CardContent>
</Card>

// 탭 사용
<Tabs defaultValue="tab1">
  <TabsList>
    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">Content 1</TabsContent>
  <TabsContent value="tab2">Content 2</TabsContent>
</Tabs>

// 배지 사용
<Badge variant="brand">New</Badge>

// 알림 사용
<Alert variant="success">
  <AlertTitle>Success</AlertTitle>
  <AlertDescription>Operation completed successfully.</AlertDescription>
</Alert>
```

## 🎯 Features

### 메인 페이지 (KCA AI LAB)
- AI 프로젝트 소개
- 팀 정보 및 성과 지표
- 기술 스택 소개
- 인터랙티브 요소

### 컴포넌트 갤러리 (`/gallery`)
- 모든 컴포넌트의 실제 사용 예시
- 탭 기반 컴포넌트 탐색
- 변형 및 크기 옵션 확인

### AI 전시 페이지 (`/ai-exhibition`)
- AI 프로젝트 상세 정보
- 모달 기반 프로젝트 뷰어

## 🎨 Design Principles

1. **일관성**: 모든 컴포넌트가 동일한 디자인 언어 사용
2. **접근성**: 모든 사용자가 접근할 수 있는 UI
3. **성능**: 최적화된 컴포넌트와 번들 크기
4. **유지보수성**: 명확한 구조와 문서화
5. **확장성**: 새로운 기능을 쉽게 추가할 수 있는 구조

## 🔧 Configuration

### Tailwind CSS 설정
- KCA AI LAB Design System 색상 팔레트
- 커스텀 간격 시스템
- 다크 테마 최적화

### 테마 시스템
- 중앙화된 테마 설정
- CSS 변수 기반 색상 관리
- 컴포넌트별 스타일 정의

## 📝 Changelog

### v1.1.0 (Latest)
- ✨ 새로운 컴포넌트 추가: Tabs, Badge, Alert
- 🎨 컴포넌트 갤러리 페이지 추가
- 📱 반응형 디자인 개선
- 🔧 성능 최적화

### v1.0.0
- 🎉 초기 릴리즈
- ✨ 기본 컴포넌트 라이브러리
- 🎨 KCA AI LAB Design System 적용
- 📄 KCA AI LAB 메인 페이지

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [KCA AI LAB](https://kca.go.kr) for the design inspiration
- [Tailwind CSS](https://tailwindcss.com) for the utility-first CSS framework
- [Next.js](https://nextjs.org) for the React framework 