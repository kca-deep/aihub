/**
 * KCA AI LAB Design System - Accessibility Utilities
 * 접근성 향상을 위한 유틸리티 함수들
 */

import React, { useEffect, useRef, useState } from 'react';

// =====================================
// 1. Focus Management
// =====================================

/**
 * 포커스 트랩을 위한 훅
 */
export const useFocusTrap = (enabled: boolean = true) => {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!enabled || !containerRef.current) return;

    const container = containerRef.current;
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Tab') {
        if (event.shiftKey) {
          if (document.activeElement === firstElement) {
            event.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            event.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    container.addEventListener('keydown', handleKeyDown);
    return () => container.removeEventListener('keydown', handleKeyDown);
  }, [enabled]);

  return containerRef;
};

/**
 * 자동 포커스 훅
 */
export const useAutoFocus = (enabled: boolean = true) => {
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (enabled && elementRef.current) {
      elementRef.current.focus();
    }
  }, [enabled]);

  return elementRef;
};

// =====================================
// 2. Screen Reader Support
// =====================================

/**
 * 스크린 리더 전용 텍스트 생성
 */
export const createScreenReaderText = (text: string): React.ReactElement => {
  return React.createElement('span', { className: 'sr-only' }, text);
};

/**
 * ARIA 라벨 생성
 */
export const createAriaLabel = (label: string, description?: string): string => {
  return description ? `${label}. ${description}` : label;
};

/**
 * ARIA 설명 생성
 */
export const createAriaDescription = (description: string): React.ReactElement => {
  return React.createElement('span', { 
    id: 'aria-description', 
    className: 'sr-only' 
  }, description);
};

// =====================================
// 3. Keyboard Navigation
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
 * 키보드 이벤트 핸들러 생성
 */
export const createKeyboardHandler = (
  handlers: {
    Enter?: () => void;
    Space?: () => void;
    Escape?: () => void;
    ArrowUp?: () => void;
    ArrowDown?: () => void;
    ArrowLeft?: () => void;
    ArrowRight?: () => void;
    Home?: () => void;
    End?: () => void;
  }
) => {
  return (event: React.KeyboardEvent) => {
    const handler = handlers[event.key as keyof typeof handlers];
    if (handler) {
      event.preventDefault();
      handler();
    }
  };
};

/**
 * 키보드 접근성 훅
 */
export const useKeyboardAccessibility = (
  onEnter?: () => void,
  onSpace?: () => void,
  onEscape?: () => void
) => {
  const handleKeyDown = (event: React.KeyboardEvent) => {
    switch (event.key) {
      case 'Enter':
        if (onEnter) {
          event.preventDefault();
          onEnter();
        }
        break;
      case ' ':
        if (onSpace) {
          event.preventDefault();
          onSpace();
        }
        break;
      case 'Escape':
        if (onEscape) {
          event.preventDefault();
          onEscape();
        }
        break;
    }
  };

  return handleKeyDown;
};

// =====================================
// 4. ARIA Attributes Helpers
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
// 5. Color Contrast
// =====================================

/**
 * 색상 대비 계산
 */
export const calculateContrastRatio = (
  foreground: string,
  background: string
): number => {
  const getLuminance = (color: string): number => {
    const rgb = color.match(/\d+/g)?.map(Number);
    if (!rgb || rgb.length !== 3) return 0;

    const [r, g, b] = rgb.map(c => {
      c = c / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });

    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };

  const l1 = getLuminance(foreground);
  const l2 = getLuminance(background);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);

  return (lighter + 0.05) / (darker + 0.05);
};

/**
 * WCAG AA 표준 충족 여부 확인
 */
export const meetsWCAGAA = (contrastRatio: number, isLargeText: boolean = false): boolean => {
  const minimumRatio = isLargeText ? 3 : 4.5;
  return contrastRatio >= minimumRatio;
};

// =====================================
// 6. Motion Preferences
// =====================================

/**
 * 사용자의 모션 선호도 확인
 */
export const useReducedMotion = (): boolean => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return prefersReducedMotion;
};

/**
 * 모션 선호도에 따른 애니메이션 클래스 생성
 */
export const createMotionClass = (
  baseClass: string,
  motionClass: string,
  reducedMotionClass?: string,
  prefersReducedMotion: boolean = false
): string => {
  if (prefersReducedMotion) {
    return reducedMotionClass || baseClass;
  }
  
  return `${baseClass} ${motionClass}`;
};

// =====================================
// 7. Live Regions
// =====================================

/**
 * 라이브 리전 상태 관리
 */
export const useLiveRegion = (role: 'polite' | 'assertive' = 'polite') => {
  const [message, setMessage] = useState('');
  const timeoutRef = useRef<NodeJS.Timeout>();

  const announce = (text: string, duration: number = 3000) => {
    setMessage(text);
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    timeoutRef.current = setTimeout(() => {
      setMessage('');
    }, duration);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return {
    message,
    announce,
    liveRegionProps: {
      'aria-live': role,
      'aria-atomic': 'true',
      className: 'sr-only',
    },
  };
};

// =====================================
// 8. Skip Links
// =====================================

/**
 * 스킵 링크 컴포넌트 생성
 */
export const createSkipLink = (targetId: string, text: string): React.ReactElement => {
  return React.createElement('a', {
    href: `#${targetId}`,
    className: 'sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-brand-primary text-white px-4 py-2 rounded z-50'
  }, text);
};

// =====================================
// 9. Export Accessibility Utilities
// =====================================

const accessibilityUtils = {
  useFocusTrap,
  useAutoFocus,
  createScreenReaderText,
  createAriaLabel,
  createAriaDescription,
  KEYS,
  createKeyboardHandler,
  useKeyboardAccessibility,
  getButtonA11yProps,
  getInputA11yProps,
  getModalA11yProps,
  getTabA11yProps,
  getTabPanelA11yProps,
  calculateContrastRatio,
  meetsWCAGAA,
  useReducedMotion,
  createMotionClass,
  useLiveRegion,
  createSkipLink,
};

export default accessibilityUtils;