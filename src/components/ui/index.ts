/**
 * KCA AI LAB Design System - Component Index
 * Tree-shaking 최적화를 위한 명시적 export
 */

import { createExportMap } from '@/lib/performance';

// =====================================
// Foundation Components (기본 UI 요소)
// =====================================

// Button 컴포넌트
export { Button, type ButtonProps, type ButtonVariant, type ButtonSize } from './button';

// Card 컴포넌트
export {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  type CardProps,
  type CardVariant,
  type CardHeaderProps,
  type CardContentProps,
  type CardFooterProps
} from './card';

// Typography 컴포넌트
export {
  Heading,
  Text,
  Label,
  type HeadingProps,
  type TextProps,
  type TypographyColor,
  type TypographyWeight
} from './typography';

// Input 컴포넌트
export {
  Input,
  Textarea,
  Checkbox,
  Radio,
  Select,
  type InputProps,
  type InputVariant,
  type InputSize,
  type TextareaProps,
  type CheckboxProps,
  type RadioProps,
  type SelectProps
} from './input';

// Badge 컴포넌트
export {
  Badge,
  type BadgeProps
} from './badge';

// Alert 컴포넌트
export {
  Alert,
  AlertTitle,
  AlertDescription,
  type AlertProps,
  type AlertTitleProps,
  type AlertDescriptionProps
} from './alert';

// Tabs 컴포넌트
export {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  type TabsProps,
  type TabsListProps,
  type TabsTriggerProps,
  type TabsContentProps
} from './tabs';

// =====================================
// Layout Components (레이아웃 컴포넌트)
// =====================================

// Navigation 컴포넌트
export {
  Navigation,
  type NavigationProps,
  type NavigationVariant,
  type NavigationSize,
  type NavigationItem
} from './navigation';

// Footer 컴포넌트
export {
  Footer,
  type FooterProps,
  type FooterVariant,
  type FooterSize,
  type FooterLink,
  type FooterSection,
  type SocialLink
} from './footer';

// Hero 컴포넌트
export {
  Hero,
  type HeroProps,
  type HeroVariant,
  type HeroSize
} from './hero';

// =====================================
// Specialized Components (특화 컴포넌트)
// =====================================

// ImageCard 컴포넌트
export {
  ImageCard,
  type ImageCardProps,
  type ImageCardVariant,
  type ImageCardSize
} from './image-card';

// Carousel 컴포넌트
export {
  Carousel,
  type CarouselProps,
  type CarouselItem
} from './carousel';

// AI Project Components
export {
  AIProjectCard,
  type AIProjectCardProps
} from './ai-project-card';

export {
  ProjectModal,
  type ProjectModalProps
} from './project-modal';

// Logo 컴포넌트
export { Logo } from './logo';

// =====================================
// Component Groups for Lazy Loading
// =====================================

/**
 * Foundation 컴포넌트 그룹 (가장 자주 사용됨)
 */
export const FoundationComponents = createExportMap({
  Button: () => import('./button').then(m => m.Button),
  Card: () => import('./card').then(m => m.Card),
  Input: () => import('./input').then(m => m.Input),
  Typography: () => import('./typography'),
});

/**
 * Layout 컴포넌트 그룹 (페이지 레이아웃용)
 */
export const LayoutComponents = createExportMap({
  Navigation: () => import('./navigation').then(m => m.Navigation),
  Footer: () => import('./footer').then(m => m.Footer),
  Hero: () => import('./hero').then(m => m.Hero),
});

/**
 * Specialized 컴포넌트 그룹 (필요시 로딩)
 */
export const SpecializedComponents = createExportMap({
  AIProjectCard: () => import('./ai-project-card').then(m => m.AIProjectCard),
  ProjectModal: () => import('./project-modal').then(m => m.ProjectModal),
  Carousel: () => import('./carousel').then(m => m.Carousel),
  ImageCard: () => import('./image-card').then(m => m.ImageCard),
});

// =====================================
// Type-only exports for better tree-shaking
// =====================================

export type * from './types'; 