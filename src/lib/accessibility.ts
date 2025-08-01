/**
 * KCA AI LAB Design System - Accessibility Utilities
 * 접근성 관련 유틸리티 함수와 상수들
 */

import { KeyboardEvent } from 'react';

// =====================================
// 1. ARIA Attributes Helpers
// =====================================

/**
 * 기본 버튼 접근성 속성
 */
export const getButtonA11yProps = (props: {
  disabled?: boolean;
  pressed?: boolean;
  expanded?: boolean;
  label?: string;
  describedBy?: string;
}) => ({
  role: 'button',
  tabIndex: props.disabled ? -1 : 0,
  'aria-disabled': props.disabled || false,
  'aria-pressed': props.pressed,
  'aria-expanded': props.expanded,
  'aria-label': props.label,
  'aria-describedby': props.describedBy,
});

/**
 * 기본 입력 필드 접근성 속성
 */
export const getInputA11yProps = (props: {
  id?: string;
  required?: boolean;
  invalid?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  describedBy?: string;
  labelledBy?: string;
}) => ({
  id: props.id,
  'aria-required': props.required || false,
  'aria-invalid': props.invalid || false,
  'aria-disabled': props.disabled || false,
  'aria-readonly': props.readOnly || false,
  'aria-describedby': props.describedBy,
  'aria-labelledby': props.labelledBy,
});

/**
 * 기본 모달/다이얼로그 접근성 속성
 */
export const getModalA11yProps = (props: {
  titleId?: string;
  descriptionId?: string;
  open?: boolean;
}) => ({
  role: 'dialog',
  'aria-modal': true,
  'aria-labelledby': props.titleId,
  'aria-describedby': props.descriptionId,
  'aria-hidden': !props.open,
});

/**
 * 기본 탭 접근성 속성
 */
export const getTabA11yProps = (props: {
  selected?: boolean;
  disabled?: boolean;
  controls?: string;
  tabIndex?: number;
}) => ({
  role: 'tab',
  'aria-selected': props.selected || false,
  'aria-disabled': props.disabled || false,
  'aria-controls': props.controls,
  tabIndex: props.tabIndex ?? (props.selected ? 0 : -1),
});

/**
 * 기본 탭패널 접근성 속성
 */
export const getTabPanelA11yProps = (props: {
  id?: string;
  labelledBy?: string;
  hidden?: boolean;
}) => ({
  role: 'tabpanel',
  id: props.id,
  'aria-labelledby': props.labelledBy,
  hidden: props.hidden,
  tabIndex: 0,
});

// =====================================
// 2. Keyboard Navigation Helpers
// =====================================

/**
 * 키보드 이벤트 키 상수
 */
export const KEYS = {
  ENTER: 'Enter',
  SPACE: ' ',
  ESCAPE: 'Escape',
  TAB: 'Tab',
  ARROW_UP: 'ArrowUp',
  ARROW_DOWN: 'ArrowDown',
  ARROW_LEFT: 'ArrowLeft',
  ARROW_RIGHT: 'ArrowRight',
  HOME: 'Home',
  END: 'End',
  PAGE_UP: 'PageUp',
  PAGE_DOWN: 'PageDown',
} as const;

/**
 * 키보드 이벤트에서 특정 키가 눌렸는지 확인
 */
export const isKey = (event: KeyboardEvent, key: string): boolean => {
  return event.key === key;
};

/**
 * 여러 키 중 하나가 눌렸는지 확인
 */
export const isKeyOneOf = (event: KeyboardEvent, keys: string[]): boolean => {
  return keys.includes(event.key);
};

/**
 * 화살표 키가 눌렸는지 확인
 */
export const isArrowKey = (event: KeyboardEvent): boolean => {
  return isKeyOneOf(event, [KEYS.ARROW_UP, KEYS.ARROW_DOWN, KEYS.ARROW_LEFT, KEYS.ARROW_RIGHT]);
};

/**
 * 내비게이션 키가 눌렸는지 확인
 */
export const isNavigationKey = (event: KeyboardEvent): boolean => {
  return isKeyOneOf(event, [
    KEYS.ARROW_UP,
    KEYS.ARROW_DOWN,
    KEYS.ARROW_LEFT,
    KEYS.ARROW_RIGHT,
    KEYS.HOME,
    KEYS.END,
    KEYS.PAGE_UP,
    KEYS.PAGE_DOWN,
  ]);
};

/**
 * 액션 키가 눌렸는지 확인 (Enter, Space)
 */
export const isActionKey = (event: KeyboardEvent): boolean => {
  return isKeyOneOf(event, [KEYS.ENTER, KEYS.SPACE]);
};

/**
 * 키보드 이벤트 핸들러 생성 헬퍼
 */
export const createKeyboardHandler = (handlers: {
  onEnter?: () => void;
  onSpace?: () => void;
  onEscape?: () => void;
  onArrowUp?: () => void;
  onArrowDown?: () => void;
  onArrowLeft?: () => void;
  onArrowRight?: () => void;
  onHome?: () => void;
  onEnd?: () => void;
}) => {
  return (event: KeyboardEvent) => {
    switch (event.key) {
      case KEYS.ENTER:
        handlers.onEnter?.();
        break;
      case KEYS.SPACE:
        event.preventDefault(); // 스크롤 방지
        handlers.onSpace?.();
        break;
      case KEYS.ESCAPE:
        handlers.onEscape?.();
        break;
      case KEYS.ARROW_UP:
        event.preventDefault();
        handlers.onArrowUp?.();
        break;
      case KEYS.ARROW_DOWN:
        event.preventDefault();
        handlers.onArrowDown?.();
        break;
      case KEYS.ARROW_LEFT:
        handlers.onArrowLeft?.();
        break;
      case KEYS.ARROW_RIGHT:
        handlers.onArrowRight?.();
        break;
      case KEYS.HOME:
        event.preventDefault();
        handlers.onHome?.();
        break;
      case KEYS.END:
        event.preventDefault();
        handlers.onEnd?.();
        break;
    }
  };
};

// =====================================
// 3. Focus Management Helpers
// =====================================

/**
 * 요소에 포커스 설정
 */
export const setFocus = (element: HTMLElement | null, options?: FocusOptions): void => {
  if (element) {
    element.focus(options);
  }
};

/**
 * 다음 틱에서 포커스 설정 (DOM 업데이트 후)
 */
export const setFocusAsync = (element: HTMLElement | null, options?: FocusOptions): void => {
  requestAnimationFrame(() => {
    setFocus(element, options);
  });
};

/**
 * 첫 번째 포커스 가능한 요소 찾기
 */
export const getFirstFocusableElement = (container: HTMLElement): HTMLElement | null => {
  const focusableElements = getFocusableElements(container);
  return focusableElements[0] || null;
};

/**
 * 마지막 포커스 가능한 요소 찾기
 */
export const getLastFocusableElement = (container: HTMLElement): HTMLElement | null => {
  const focusableElements = getFocusableElements(container);
  return focusableElements[focusableElements.length - 1] || null;
};

/**
 * 컨테이너 내의 모든 포커스 가능한 요소 찾기
 */
export const getFocusableElements = (container: HTMLElement): HTMLElement[] => {
  const focusableSelectors = [
    'button:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
    'a[href]',
    '[contenteditable="true"]',
  ].join(', ');

  return Array.from(container.querySelectorAll(focusableSelectors)) as HTMLElement[];
};

/**
 * 포커스 트랩 생성 (모달 등에서 사용)
 */
export const createFocusTrap = (container: HTMLElement) => {
  const focusableElements = getFocusableElements(container);
  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  const trapFocus = (event: KeyboardEvent) => {
    if (event.key !== KEYS.TAB) return;

    if (event.shiftKey) {
      // Shift + Tab
      if (document.activeElement === firstElement) {
        event.preventDefault();
        lastElement?.focus();
      }
    } else {
      // Tab
      if (document.activeElement === lastElement) {
        event.preventDefault();
        firstElement?.focus();
      }
    }
  };

  // 초기 포커스 설정
  firstElement?.focus();

  return {
    trapFocus,
    firstElement,
    lastElement,
    focusableElements,
  };
};

// =====================================
// 4. Screen Reader Helpers
// =====================================

/**
 * 스크린 리더를 위한 라이브 리전 생성
 */
export const createLiveRegion = (politeness: 'polite' | 'assertive' = 'polite'): HTMLElement => {
  const liveRegion = document.createElement('div');
  liveRegion.setAttribute('aria-live', politeness);
  liveRegion.setAttribute('aria-atomic', 'true');
  liveRegion.style.position = 'absolute';
  liveRegion.style.left = '-10000px';
  liveRegion.style.width = '1px';
  liveRegion.style.height = '1px';
  liveRegion.style.overflow = 'hidden';
  
  document.body.appendChild(liveRegion);
  return liveRegion;
};

/**
 * 스크린 리더에 메시지 전달
 */
export const announceToScreenReader = (
  message: string,
  politeness: 'polite' | 'assertive' = 'polite'
): void => {
  const liveRegion = createLiveRegion(politeness);
  liveRegion.textContent = message;
  
  // 메시지 전달 후 제거
  setTimeout(() => {
    document.body.removeChild(liveRegion);
  }, 1000);
};

// =====================================
// 5. Color Contrast Helpers
// =====================================

/**
 * 색상 대비율 계산
 */
export const calculateContrastRatio = (color1: string, color2: string): number => {
  const getLuminance = (color: string): number => {
    // 간단한 RGB 색상만 지원 (실제로는 더 복잡한 계산 필요)
    const rgb = color.match(/\d+/g);
    if (!rgb || rgb.length < 3) return 0;
    
    const [r, g, b] = rgb.map(Number);
    const normalize = (c: number) => {
      c = c / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    };
    
    return 0.2126 * normalize(r) + 0.7152 * normalize(g) + 0.0722 * normalize(b);
  };

  const l1 = getLuminance(color1);
  const l2 = getLuminance(color2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  
  return (lighter + 0.05) / (darker + 0.05);
};

/**
 * WCAG AA 기준 통과 여부 확인
 */
export const meetsWCAGAA = (color1: string, color2: string): boolean => {
  return calculateContrastRatio(color1, color2) >= 4.5;
};

/**
 * WCAG AAA 기준 통과 여부 확인
 */
export const meetsWCAGAAA = (color1: string, color2: string): boolean => {
  return calculateContrastRatio(color1, color2) >= 7;
};

// =====================================
// 6. Motion Preferences
// =====================================

/**
 * 사용자의 모션 선호도 확인
 */
export const prefersReducedMotion = (): boolean => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * 모션 감소 선호도에 따른 애니메이션 지속시간 반환
 */
export const getAnimationDuration = (duration: number): number => {
  return prefersReducedMotion() ? 0 : duration;
};

// =====================================
// 7. Validation Helpers
// =====================================

/**
 * 접근성 요구사항 검증
 */
export const validateA11yRequirements = (element: HTMLElement): string[] => {
  const issues: string[] = [];
  
  // 버튼에 접근 가능한 이름이 있는지 확인
  if (element.tagName === 'BUTTON' || element.getAttribute('role') === 'button') {
    const hasAccessibleName = 
      element.textContent ||
      element.getAttribute('aria-label') ||
      element.getAttribute('aria-labelledby') ||
      element.getAttribute('title');
    
    if (!hasAccessibleName) {
      issues.push('Button must have an accessible name');
    }
  }
  
  // 입력 필드에 레이블이 있는지 확인
  if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA' || element.tagName === 'SELECT') {
    const hasLabel = 
      element.getAttribute('aria-label') ||
      element.getAttribute('aria-labelledby') ||
      document.querySelector(`label[for="${element.id}"]`);
    
    if (!hasLabel) {
      issues.push('Form control must have an associated label');
    }
  }
  
  return issues;
};

export default {
  getButtonA11yProps,
  getInputA11yProps,
  getModalA11yProps,
  getTabA11yProps,
  getTabPanelA11yProps,
  KEYS,
  isKey,
  isKeyOneOf,
  isArrowKey,
  isNavigationKey,
  isActionKey,
  createKeyboardHandler,
  setFocus,
  setFocusAsync,
  getFirstFocusableElement,
  getLastFocusableElement,
  getFocusableElements,
  createFocusTrap,
  createLiveRegion,
  announceToScreenReader,
  calculateContrastRatio,
  meetsWCAGAA,
  meetsWCAGAAA,
  prefersReducedMotion,
  getAnimationDuration,
  validateA11yRequirements,
};