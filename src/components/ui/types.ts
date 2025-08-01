/**
 * KCA AI LAB Design System - Centralized Type Definitions
 * 모든 컴포넌트 타입을 한 곳에서 재export하여 타입 임포트 최적화
 */

// Button types
export type {
  ButtonProps,
  ButtonVariant,
  ButtonSize,
} from './button';

// Card types
export type {
  CardProps,
  CardVariant,
  CardHeaderProps,
  CardContentProps,
  CardFooterProps
} from './card';

// Typography types (placeholder - 실제 파일에서 가져와야 함)
export interface HeadingProps {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  color?: string;
  className?: string;
  children?: React.ReactNode;
}

export interface TextProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  color?: string;
  className?: string;
  children?: React.ReactNode;
}

export type TypographyColor = 'primary' | 'secondary' | 'tertiary' | 'muted' | 'disabled';
export type TypographyWeight = 'normal' | 'medium' | 'semibold' | 'bold';

// Input types (placeholder - 실제 파일에서 가져와야 함)
export interface InputProps {
  variant?: 'default' | 'filled' | 'outlined';
  size?: 'sm' | 'md' | 'lg';
  error?: boolean;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
}

export type InputVariant = 'default' | 'filled' | 'outlined';
export type InputSize = 'sm' | 'md' | 'lg';

export interface TextareaProps extends InputProps {
  rows?: number;
  resize?: 'none' | 'vertical' | 'horizontal' | 'both';
}

export interface CheckboxProps {
  checked?: boolean;
  disabled?: boolean;
  error?: boolean;
  label?: string;
  className?: string;
}

export interface RadioProps {
  checked?: boolean;
  disabled?: boolean;
  error?: boolean;
  label?: string;
  value?: string;
  className?: string;
}

export interface SelectProps {
  options?: Array<{
    value: string;
    label: string;
    disabled?: boolean;
  }>;
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
  className?: string;
}

// Badge types (placeholder)
export interface BadgeProps {
  variant?: 'default' | 'secondary' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  children?: React.ReactNode;
}

// Alert types (placeholder)
export interface AlertProps {
  variant?: 'info' | 'success' | 'warning' | 'error';
  title?: string;
  dismissible?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export interface AlertTitleProps {
  className?: string;
  children?: React.ReactNode;
}

export interface AlertDescriptionProps {
  className?: string;
  children?: React.ReactNode;
}

// Tabs types (placeholder)
export interface TabsProps {
  defaultValue?: string;
  value?: string;
  orientation?: 'horizontal' | 'vertical';
  className?: string;
  children?: React.ReactNode;
}

export interface TabsListProps {
  className?: string;
  children?: React.ReactNode;
}

export interface TabsTriggerProps {
  value: string;
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export interface TabsContentProps {
  value: string;
  className?: string;
  children?: React.ReactNode;
}

// Navigation types (placeholder)
export interface NavigationProps {
  variant?: 'default' | 'sidebar' | 'breadcrumb';
  size?: 'sm' | 'md' | 'lg';
  items?: NavigationItem[];
  className?: string;
}

export type NavigationVariant = 'default' | 'sidebar' | 'breadcrumb';
export type NavigationSize = 'sm' | 'md' | 'lg';

export interface NavigationItem {
  label: string;
  href?: string;
  active?: boolean;
  disabled?: boolean;
  children?: NavigationItem[];
}

// Footer types (placeholder)
export interface FooterProps {
  variant?: 'default' | 'minimal';
  size?: 'sm' | 'md' | 'lg';
  sections?: FooterSection[];
  socialLinks?: SocialLink[];
  className?: string;
}

export type FooterVariant = 'default' | 'minimal';
export type FooterSize = 'sm' | 'md' | 'lg';

export interface FooterLink {
  label: string;
  href: string;
  target?: '_blank' | '_self';
}

export interface FooterSection {
  title: string;
  links: FooterLink[];
}

export interface SocialLink {
  platform: string;
  href: string;
  icon?: React.ReactNode;
}

// Hero types (placeholder)
export interface HeroProps {
  variant?: 'default' | 'centered' | 'split';
  size?: 'sm' | 'md' | 'lg';
  title?: string;
  subtitle?: string;
  backgroundImage?: string;
  className?: string;
  children?: React.ReactNode;
}

export type HeroVariant = 'default' | 'centered' | 'split';
export type HeroSize = 'sm' | 'md' | 'lg';

// ImageCard types (placeholder)
export interface ImageCardProps {
  variant?: 'default' | 'overlay' | 'bordered';
  size?: 'sm' | 'md' | 'lg';
  src: string;
  alt: string;
  title?: string;
  description?: string;
  className?: string;
}

export type ImageCardVariant = 'default' | 'overlay' | 'bordered';
export type ImageCardSize = 'sm' | 'md' | 'lg';

// Carousel types (placeholder)
export interface CarouselProps {
  items: CarouselItem[];
  autoplay?: boolean;
  interval?: number;
  showDots?: boolean;
  showArrows?: boolean;
  className?: string;
}

export interface CarouselItem {
  id: string;
  content: React.ReactNode;
  alt?: string;
}

// AI Project types (placeholder)
export interface AIProjectCardProps {
  title: string;
  description: string;
  image?: string;
  tags?: string[];
  status?: 'active' | 'completed' | 'planned';
  onClick?: () => void;
  className?: string;
}

// Project Modal types (placeholder)
export interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project?: {
    title: string;
    description: string;
    image?: string;
    details?: string;
    tags?: string[];
    status?: string;
  };
  className?: string;
}