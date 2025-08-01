/**
 * KCA AI LAB Design System - Advanced Type Utilities
 * 고급 타입 유틸리티와 제네릭 헬퍼들
 */

import { ComponentProps, ElementType, ReactNode } from 'react';

// =====================================
// 1. Polymorphic Component Types
// =====================================

/**
 * 다형성 컴포넌트를 위한 기본 Props
 */
export type PolymorphicComponentProps<T extends ElementType> = {
  as?: T;
  children?: ReactNode;
} & ComponentProps<T>;

/**
 * 다형성 컴포넌트의 Ref 타입
 */
export type PolymorphicRef<T extends ElementType> = 
  ComponentProps<T> extends { ref?: infer R } ? R : never;

/**
 * 다형성 컴포넌트 Props with Ref
 */
export type PolymorphicComponentPropsWithRef<
  T extends ElementType,
  P = {}
> = P & PolymorphicComponentProps<T> & {
  ref?: PolymorphicRef<T>;
};

// =====================================
// 2. Design Token Types
// =====================================

/**
 * 디자인 토큰 키 추출 유틸리티
 */
export type ExtractTokenKeys<T> = T extends Record<string, any>
  ? keyof T
  : never;

/**
 * 중첩된 객체의 키 경로 추출
 */
export type DeepKeys<T> = T extends Record<string, any>
  ? {
      [K in keyof T]: K extends string
        ? T[K] extends Record<string, any>
          ? `${K}` | `${K}.${DeepKeys<T[K]>}`
          : `${K}`
        : never;
    }[keyof T]
  : never;

/**
 * 점 표기법으로 중첩된 객체 값 가져오기
 */
export type DeepValue<T, K extends string> = K extends keyof T
  ? T[K]
  : K extends `${infer P}.${infer S}`
  ? P extends keyof T
    ? DeepValue<T[P], S>
    : never
  : never;

// =====================================
// 3. Component Variant Types
// =====================================

/**
 * 컴포넌트 변형 생성기
 */
export type CreateVariants<T extends Record<string, any>> = {
  [K in keyof T]: {
    variant: K;
  } & T[K];
}[keyof T];

/**
 * 조건부 Props 타입
 */
export type ConditionalProps<T, Condition> = Condition extends true ? T : never;

/**
 * Variant에 따른 조건부 Props
 */
export type VariantProps<
  T extends string,
  Props extends Record<T, any>
> = T extends keyof Props
  ? { variant: T } & Props[T]
  : never;

// =====================================
// 4. Event Handler Types
// =====================================

/**
 * 제네릭 이벤트 핸들러
 */
export type EventHandler<T = any> = (event: T) => void;

/**
 * 비동기 이벤트 핸들러
 */
export type AsyncEventHandler<T = any> = (event: T) => Promise<void>;

/**
 * 값 변경 핸들러
 */
export type ChangeHandler<T = string> = (value: T, name?: string) => void;

/**
 * 검증 핸들러
 */
export type ValidationHandler<T = any> = (value: T) => string | null;

// =====================================
// 5. Form Types
// =====================================

/**
 * 폼 필드 상태
 */
export interface FieldState<T = any> {
  value: T;
  error?: string;
  touched: boolean;
  dirty: boolean;
  valid: boolean;
}

/**
 * 폼 상태
 */
export interface FormState<T extends Record<string, any> = Record<string, any>> {
  values: T;
  errors: Partial<Record<keyof T, string>>;
  touched: Partial<Record<keyof T, boolean>>;
  dirty: Partial<Record<keyof T, boolean>>;
  valid: boolean;
  submitting: boolean;
}

/**
 * 폼 액션
 */
export type FormAction<T> = 
  | { type: 'SET_VALUE'; field: keyof T; value: any }
  | { type: 'SET_ERROR'; field: keyof T; error: string }
  | { type: 'SET_TOUCHED'; field: keyof T; touched: boolean }
  | { type: 'RESET' }
  | { type: 'SUBMIT_START' }
  | { type: 'SUBMIT_END' };

// =====================================
// 6. Animation Types
// =====================================

/**
 * 애니메이션 상태
 */
export type AnimationState = 'idle' | 'entering' | 'entered' | 'exiting' | 'exited';

/**
 * 트랜지션 상태
 */
export interface TransitionState {
  state: AnimationState;
  duration: number;
  easing: string;
}

/**
 * 애니메이션 콜백
 */
export type AnimationCallback = (state: AnimationState) => void;

// =====================================
// 7. Theme Types
// =====================================

/**
 * 테마 모드
 */
export type ThemeMode = 'light' | 'dark' | 'system';

/**
 * 테마 컨텍스트
 */
export interface ThemeContext {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  isDark: boolean;
  isLight: boolean;
  isSystem: boolean;
}

/**
 * 테마 토큰 타입
 */
export interface ThemeTokens {
  colors: Record<string, string>;
  spacing: Record<string, string>;
  typography: Record<string, any>;
  shadows: Record<string, string>;
  borderRadius: Record<string, string>;
}

// =====================================
// 8. Utility Types
// =====================================

/**
 * 깊은 부분 선택적 타입
 */
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

/**
 * 깊은 필수 타입
 */
export type DeepRequired<T> = {
  [P in keyof T]-?: T[P] extends object ? DeepRequired<T[P]> : T[P];
};

/**
 * 읽기 전용 깊은 타입
 */
export type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};

/**
 * 키를 문자열로 제한하는 타입
 */
export type StringKeys<T> = Extract<keyof T, string>;

/**
 * 값의 타입을 추출하는 유틸리티
 */
export type ValueOf<T> = T[keyof T];

/**
 * 함수 타입인지 확인
 */
export type IsFunction<T> = T extends (...args: any[]) => any ? true : false;

/**
 * 배열 타입인지 확인
 */
export type IsArray<T> = T extends any[] ? true : false;

/**
 * 객체 타입인지 확인
 */
export type IsObject<T> = T extends object 
  ? T extends any[] 
    ? false 
    : T extends Function 
      ? false 
      : true
  : false;

// =====================================
// 9. Component Factory Types
// =====================================

/**
 * 컴포넌트 팩토리 설정
 */
export interface ComponentFactoryConfig<P = {}> {
  displayName: string;
  defaultProps?: Partial<P>;
  propTypes?: any;
}

/**
 * 스타일드 컴포넌트 Props
 */
export interface StyledComponentProps {
  css?: string;
  sx?: Record<string, any>;
  __css?: Record<string, any>;
}

/**
 * 포워드 레프 컴포넌트 타입
 */
export type ForwardRefComponent<T, P = {}> = React.ForwardRefExoticComponent<
  P & React.RefAttributes<T>
>;

// =====================================
// 10. Data Types
// =====================================

/**
 * API 응답 타입
 */
export interface ApiResponse<T = any> {
  data: T;
  status: number;
  message?: string;
  error?: string;
}

/**
 * 페이지네이션 정보
 */
export interface PaginationInfo {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

/**
 * 페이지네이션된 응답
 */
export interface PaginatedResponse<T = any> extends ApiResponse<T[]> {
  pagination: PaginationInfo;
}

/**
 * 정렬 정보
 */
export interface SortInfo {
  field: string;
  direction: 'asc' | 'desc';
}

/**
 * 필터 타입
 */
export type FilterValue = string | number | boolean | null | undefined;
export type FilterObject = Record<string, FilterValue | FilterValue[]>;

// =====================================
// 11. Test Types
// =====================================

/**
 * 테스트 렌더 옵션
 */
export interface TestRenderOptions {
  wrapper?: React.ComponentType<{ children: ReactNode }>;
  initialProps?: Record<string, any>;
  rerender?: boolean;
}

/**
 * 모킹 함수 타입
 */
export type MockFunction<T extends (...args: any[]) => any> = T & {
  mock: {
    calls: Parameters<T>[];
    results: ReturnType<T>[];
    instances: any[];
  };
};

// =====================================
// 12. Export All Types
// =====================================

export type {
  // React types re-export
  ComponentProps,
  ElementType,
  ReactNode,
};

// Types are already exported individually above
// Default export removed as types cannot be exported as runtime values