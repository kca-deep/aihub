/**
 * KCA AI LAB Design System - Standard Component Types
 * 모든 컴포넌트에서 사용할 표준화된 타입 정의
 */

import { ComponentProps, ReactNode } from 'react';

// =====================================
// 1. Base Component Props
// =====================================

/**
 * 모든 컴포넌트의 기본 Props 인터페이스
 */
export interface BaseComponentProps {
  /** 추가 CSS 클래스명 */
  className?: string;
  /** 컴포넌트 자식 요소 */
  children?: ReactNode;
  /** 테스트용 ID */
  'data-testid'?: string;
  /** 비활성화 상태 */
  disabled?: boolean;
  /** 로딩 상태 */
  loading?: boolean;
}

/**
 * 크기 변형을 가진 컴포넌트의 Props
 */
export interface SizeVariantProps {
  /** 컴포넌트 크기 */
  size?: 'sm' | 'md' | 'lg';
}

/**
 * 스타일 변형을 가진 컴포넌트의 Props
 */
export interface StyleVariantProps<T extends string = string> {
  /** 컴포넌트 스타일 변형 */
  variant?: T;
}

/**
 * 상호작용이 가능한 컴포넌트의 Props
 */
export interface InteractiveProps {
  /** 클릭 이벤트 핸들러 */
  onClick?: (event: React.MouseEvent) => void;
  /** 키보드 이벤트 핸들러 */
  onKeyDown?: (event: React.KeyboardEvent) => void;
  /** 포커스 이벤트 핸들러 */
  onFocus?: (event: React.FocusEvent) => void;
  /** 블러 이벤트 핸들러 */
  onBlur?: (event: React.FocusEvent) => void;
}

// =====================================
// 2. Accessibility Props
// =====================================

/**
 * 접근성 관련 Props
 */
export interface AccessibilityProps {
  /** ARIA 레이블 */
  'aria-label'?: string;
  /** ARIA 레이블을 참조하는 요소의 ID */
  'aria-labelledby'?: string;
  /** ARIA 설명을 참조하는 요소의 ID */
  'aria-describedby'?: string;
  /** 요소의 역할 */
  role?: string;
  /** 탭 순서 */
  tabIndex?: number;
  /** 확장 가능한 요소의 확장 상태 */
  'aria-expanded'?: boolean;
  /** 선택 가능한 요소의 선택 상태 */
  'aria-selected'?: boolean;
  /** 체크 가능한 요소의 체크 상태 */
  'aria-checked'?: boolean | 'mixed';
  /** 비활성화 상태 (ARIA) */
  'aria-disabled'?: boolean;
  /** 숨김 상태 (ARIA) */
  'aria-hidden'?: boolean;
  /** 현재 상태 */
  'aria-current'?: boolean | 'page' | 'step' | 'location' | 'date' | 'time';
}

/**
 * 키보드 내비게이션 Props
 */
export interface KeyboardNavigationProps {
  /** Enter 키 핸들러 */
  onEnterKey?: (event: React.KeyboardEvent) => void;
  /** Space 키 핸들러 */
  onSpaceKey?: (event: React.KeyboardEvent) => void;
  /** Escape 키 핸들러 */
  onEscapeKey?: (event: React.KeyboardEvent) => void;
  /** 화살표 키 핸들러 */
  onArrowKey?: (event: React.KeyboardEvent, direction: 'up' | 'down' | 'left' | 'right') => void;
}

// =====================================
// 3. Form Component Props
// =====================================

/**
 * 폼 요소 기본 Props
 */
export interface FormElementProps {
  /** 입력 요소 이름 */
  name?: string;
  /** 입력 요소 ID */
  id?: string;
  /** 필수 입력 여부 */
  required?: boolean;
  /** 읽기 전용 여부 */
  readOnly?: boolean;
  /** 오류 상태 */
  error?: boolean;
  /** 오류 메시지 */
  errorMessage?: string;
  /** 도움말 텍스트 */
  helperText?: string;
  /** 레이블 텍스트 */
  label?: string;
  /** 플레이스홀더 텍스트 */
  placeholder?: string;
}

/**
 * 입력 값을 가진 컴포넌트의 Props
 */
export interface ValueProps<T = string> {
  /** 현재 값 */
  value?: T;
  /** 기본값 */
  defaultValue?: T;
  /** 값 변경 핸들러 */
  onChange?: (value: T) => void;
}

// =====================================
// 4. Layout Props
// =====================================

/**
 * 간격 관련 Props
 */
export interface SpacingProps {
  /** 마진 */
  margin?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  /** 패딩 */
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  /** 상하 마진 */
  marginY?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  /** 좌우 마진 */
  marginX?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  /** 상하 패딩 */
  paddingY?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  /** 좌우 패딩 */
  paddingX?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
}

/**
 * 정렬 관련 Props
 */
export interface AlignmentProps {
  /** 수평 정렬 */
  align?: 'start' | 'center' | 'end';
  /** 수직 정렬 */
  verticalAlign?: 'start' | 'center' | 'end';
  /** Flexbox justify-content */
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  /** Flexbox align-items */
  items?: 'start' | 'center' | 'end' | 'stretch' | 'baseline';
}

// =====================================
// 5. Animation Props
// =====================================

/**
 * 애니메이션 관련 Props
 */
export interface AnimationProps {
  /** 애니메이션 지속 시간 */
  duration?: 'instant' | 'fast' | 'normal' | 'slow' | 'slower';
  /** 애니메이션 이징 */
  easing?: 'linear' | 'ease' | 'easeIn' | 'easeOut' | 'easeInOut' | 'bounce';
  /** 애니메이션 지연 */
  delay?: number;
  /** 애니메이션 비활성화 */
  disableAnimation?: boolean;
}

// =====================================
// 6. Combined Props Types
// =====================================

/**
 * 표준 UI 컴포넌트 Props (Button, Card 등)
 */
export interface StandardComponentProps<T extends string = string>
  extends BaseComponentProps,
    SizeVariantProps,
    StyleVariantProps<T>,
    AccessibilityProps,
    InteractiveProps,
    AnimationProps {}

/**
 * 폼 컴포넌트 Props (Input, Select 등)
 */
export interface StandardFormProps<T = string>
  extends BaseComponentProps,
    SizeVariantProps,
    FormElementProps,
    ValueProps<T>,
    AccessibilityProps,
    KeyboardNavigationProps {}

/**
 * 레이아웃 컴포넌트 Props (Container, Grid 등)
 */
export interface StandardLayoutProps
  extends BaseComponentProps,
    SpacingProps,
    AlignmentProps {}

// =====================================
// 7. Event Handler Types
// =====================================

/**
 * 표준 이벤트 핸들러 타입들
 */
export type ClickHandler = (event: React.MouseEvent<HTMLElement>) => void;
export type KeyDownHandler = (event: React.KeyboardEvent<HTMLElement>) => void;
export type FocusHandler = (event: React.FocusEvent<HTMLElement>) => void;
export type ChangeHandler<T = string> = (value: T, event?: React.ChangeEvent<HTMLInputElement>) => void;

// =====================================
// 8. Polymorphic Component Props
// =====================================

/**
 * 다형성 컴포넌트를 위한 Props (as prop 지원)
 */
export type PolymorphicProps<T extends React.ElementType = 'div'> = {
  as?: T;
} & Omit<ComponentProps<T>, 'as'>;

/**
 * 다형성 컴포넌트 Ref 타입
 */
export type PolymorphicRef<T extends React.ElementType> = React.ComponentPropsWithRef<T>['ref'];

// =====================================
// 9. Utility Types
// =====================================

/**
 * Optional 속성을 Required로 만드는 유틸리티 타입
 */
export type RequiredProps<T, K extends keyof T> = T & Required<Pick<T, K>>;

/**
 * 특정 속성을 제외하는 유틸리티 타입
 */
export type OmitProps<T, K extends keyof T> = Omit<T, K>;

/**
 * 컴포넌트 variant 추출 유틸리티 타입
 */
export type ExtractVariants<T> = T extends StyleVariantProps<infer U> ? U : never;

// =====================================
// 10. Component Factory Types
// =====================================

/**
 * 컴포넌트 팩토리 함수 타입
 */
export type ComponentFactory<P extends BaseComponentProps> = React.ForwardRefExoticComponent<
  P & React.RefAttributes<HTMLElement>
>;

/**
 * 컴포넌트 디스플레이 이름 설정 헬퍼
 */
export const setDisplayName = <T extends React.ComponentType<any>>(
  component: T,
  name: string
): T => {
  component.displayName = name;
  return component;
};

// Types are already exported individually above
// Default export removed as types cannot be exported as runtime values