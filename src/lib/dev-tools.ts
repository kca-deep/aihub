/**
 * KCA AI LAB Design System - Development Tools
 * 개발자 경험 향상을 위한 유틸리티들
 */

import React, { ComponentType, ReactNode } from 'react';

// =====================================
// 1. Development Warnings & Errors
// =====================================

/**
 * 개발 모드에서만 경고 메시지 출력
 */
export const devWarn = (message: string, component?: string): void => {
  if (process.env.NODE_ENV === 'development') {
    const prefix = component ? `[${component}]` : '[KCA Design System]';
    console.warn(`${prefix} ${message}`);
  }
};

/**
 * 개발 모드에서만 에러 메시지 출력
 */
export const devError = (message: string, component?: string): void => {
  if (process.env.NODE_ENV === 'development') {
    const prefix = component ? `[${component}]` : '[KCA Design System]';
    console.error(`${prefix} ${message}`);
  }
};

/**
 * deprecated API 사용 시 경고
 */
export const deprecationWarning = (
  oldAPI: string,
  newAPI: string,
  component: string,
  version?: string
): void => {
  if (process.env.NODE_ENV === 'development') {
    const versionInfo = version ? ` (deprecated in v${version})` : '';
    console.warn(
      `[${component}] "${oldAPI}" is deprecated${versionInfo}. Please use "${newAPI}" instead.`
    );
  }
};

/**
 * 필수 props 검증
 */
export const validateRequiredProps = <T extends Record<string, any>>(
  props: T,
  requiredProps: (keyof T)[],
  componentName: string
): void => {
  if (process.env.NODE_ENV === 'development') {
    requiredProps.forEach(prop => {
      if (props[prop] === undefined) {
        devError(`Missing required prop: "${String(prop)}"`, componentName);
      }
    });
  }
};

// =====================================
// 2. Props Validation Helpers
// =====================================

/**
 * 타입 검증 헬퍼
 */
export const validatePropType = (
  value: any,
  expectedType: string,
  propName: string,
  componentName: string
): boolean => {
  if (process.env.NODE_ENV !== 'development') return true;
  
  const actualType = typeof value;
  if (actualType !== expectedType) {
    devError(
      `Invalid prop type: "${propName}" expected ${expectedType}, got ${actualType}`,
      componentName
    );
    return false;
  }
  return true;
};

/**
 * Enum 값 검증
 */
export const validateEnumProp = <T extends string>(
  value: T,
  allowedValues: readonly T[],
  propName: string,
  componentName: string
): boolean => {
  if (process.env.NODE_ENV !== 'development') return true;
  
  if (!allowedValues.includes(value)) {
    devError(
      `Invalid prop value: "${propName}" must be one of [${allowedValues.join(', ')}], got "${value}"`,
      componentName
    );
    return false;
  }
  return true;
};

/**
 * children 타입 검증
 */
export const validateChildren = (
  children: ReactNode,
  allowedTypes: ('string' | 'number' | 'element' | 'fragment')[],
  componentName: string
): boolean => {
  if (process.env.NODE_ENV !== 'development') return true;
  
  // 복잡한 children 검증 로직 (간소화)
  const hasValidChildren = allowedTypes.some(type => {
    switch (type) {
      case 'string':
        return typeof children === 'string';
      case 'number':
        return typeof children === 'number';
      case 'element':
        return React.isValidElement(children);
      case 'fragment':
        return React.isValidElement(children) && children.type === React.Fragment;
      default:
        return false;
    }
  });
  
  if (!hasValidChildren) {
    devWarn(
      `Unexpected children type. Expected one of: ${allowedTypes.join(', ')}`,
      componentName
    );
    return false;
  }
  
  return true;
};

// =====================================
// 3. Development Component Wrappers
// =====================================

/**
 * 개발 모드에서 컴포넌트 정보를 표시하는 래퍼
 */
export const withDevInfo = <P extends Record<string, any>>(
  Component: ComponentType<P>,
  info: {
    name: string;
    version?: string;
    description?: string;
    props?: (keyof P)[];
  }
) => {
  if (process.env.NODE_ENV !== 'development') {
    return Component;
  }
  
  const WrappedComponent = (props: P) => {
    // 개발 도구에서 컴포넌트 정보 제공
    if (typeof window !== 'undefined') {
      (window as any).__KCA_DESIGN_SYSTEM_COMPONENTS__ = {
        ...(window as any).__KCA_DESIGN_SYSTEM_COMPONENTS__,
        [info.name]: {
          ...info,
          lastRendered: Date.now(),
          propsReceived: Object.keys(props),
        }
      };
    }
    
    return React.createElement(Component, props);
  };
  
  WrappedComponent.displayName = `withDevInfo(${info.name})`;
  return WrappedComponent;
};

/**
 * Props 로깅 래퍼
 */
export const withPropsLogger = <P extends Record<string, any>>(
  Component: ComponentType<P>,
  componentName: string
) => {
  if (process.env.NODE_ENV !== 'development') {
    return Component;
  }
  
  const WrappedComponent = (props: P) => {
    console.group(`[${componentName}] Props`);
    Object.entries(props).forEach(([key, value]) => {
      console.log(`${key}:`, value);
    });
    console.groupEnd();
    
    return React.createElement(Component, props);
  };
  
  WrappedComponent.displayName = `withPropsLogger(${componentName})`;
  return WrappedComponent;
};

// =====================================
// 4. Performance Monitoring
// =====================================

/**
 * 렌더링 성능 모니터링
 */
export const withPerformanceMonitor = <P extends Record<string, any>>(
  Component: ComponentType<P>,
  componentName: string
) => {
  if (process.env.NODE_ENV !== 'development') {
    return Component;
  }
  
  const WrappedComponent = (props: P) => {
    const startTime = performance.now();
    
    React.useEffect(() => {
      const endTime = performance.now();
      const renderTime = endTime - startTime;
      
      if (renderTime > 16) { // 60fps 기준
        devWarn(
          `Slow render detected: ${renderTime.toFixed(2)}ms (>16ms)`,
          componentName
        );
      }
    });
    
    return React.createElement(Component, props);
  };
  
  WrappedComponent.displayName = `withPerformanceMonitor(${componentName})`;
  return WrappedComponent;
};

// =====================================
// 5. Design Token Inspector
// =====================================

/**
 * 디자인 토큰 사용 추적
 */
export const trackTokenUsage = (tokenPath: string, component: string): void => {
  if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
    (window as any).__KCA_TOKEN_USAGE__ = {
      ...(window as any).__KCA_TOKEN_USAGE__,
      [tokenPath]: {
        component,
        usedAt: Date.now(),
        count: ((window as any).__KCA_TOKEN_USAGE__?.[tokenPath]?.count || 0) + 1,
      }
    };
  }
};

/**
 * 사용되지 않는 토큰 찾기
 */
export const findUnusedTokens = (allTokens: Record<string, any>): string[] => {
  if (process.env.NODE_ENV !== 'development') return [];
  
  const usedTokens = (window as any).__KCA_TOKEN_USAGE__ || {};
  const allTokenPaths = Object.keys(allTokens);
  
  return allTokenPaths.filter(path => !usedTokens[path]);
};

// =====================================
// 6. Accessibility Auditing
// =====================================

/**
 * 접근성 이슈 감지
 */
export const auditAccessibility = (
  element: HTMLElement,
  componentName: string
): void => {
  if (process.env.NODE_ENV !== 'development') return;
  
  const issues: string[] = [];
  
  // 기본적인 접근성 검사
  if (element.tagName === 'BUTTON' && !element.textContent && !element.getAttribute('aria-label')) {
    issues.push('Button must have accessible text or aria-label');
  }
  
  if (element.tagName === 'IMG' && !element.getAttribute('alt')) {
    issues.push('Image must have alt attribute');
  }
  
  if (element.getAttribute('role') === 'button' && !element.hasAttribute('tabindex')) {
    issues.push('Interactive element must be keyboard accessible');
  }
  
  if (issues.length > 0) {
    console.group(`[${componentName}] Accessibility Issues`);
    issues.forEach(issue => console.warn(issue));
    console.groupEnd();
  }
};

// =====================================
// 7. Style Debugging
// =====================================

/**
 * CSS 클래스 사용 추적
 */
export const trackCSSUsage = (classes: string[], component: string): void => {
  if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
    classes.forEach(className => {
      (window as any).__KCA_CSS_USAGE__ = {
        ...(window as any).__KCA_CSS_USAGE__,
        [className]: {
          component,
          usedAt: Date.now(),
        }
      };
    });
  }
};

/**
 * 스타일 충돌 감지
 */
export const detectStyleConflicts = (element: HTMLElement): void => {
  if (process.env.NODE_ENV !== 'development') return;
  
  const computedStyle = window.getComputedStyle(element);
  const conflicts: string[] = [];
  
  // 예: 중복된 margin/padding 설정 감지
  const marginTop = computedStyle.marginTop;
  const paddingTop = computedStyle.paddingTop;
  
  if (marginTop !== '0px' && paddingTop !== '0px') {
    conflicts.push('Both margin-top and padding-top are set');
  }
  
  if (conflicts.length > 0) {
    devWarn(`Style conflicts detected: ${conflicts.join(', ')}`);
  }
};

// =====================================
// 8. Development Server Helpers
// =====================================

/**
 * 핫 리로드 지원
 */
export const enableHotReload = (componentName: string): void => {
  if (process.env.NODE_ENV === 'development' && (module as any).hot) {
    (module as any).hot.accept(() => {
      console.log(`[${componentName}] Hot reloaded`);
    });
  }
};

/**
 * 컴포넌트 등록 (개발 도구용)
 */
export const registerComponent = (
  name: string,
  component: ComponentType<any>,
  metadata?: Record<string, any>
): void => {
  if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
    (window as any).__KCA_COMPONENTS_REGISTRY__ = {
      ...(window as any).__KCA_COMPONENTS_REGISTRY__,
      [name]: {
        component,
        metadata,
        registeredAt: Date.now(),
      }
    };
  }
};

// =====================================
// 9. Export Development Utilities
// =====================================

export default {
  devWarn,
  devError,
  deprecationWarning,
  validateRequiredProps,
  validatePropType,
  validateEnumProp,
  validateChildren,
  withDevInfo,
  withPropsLogger,
  withPerformanceMonitor,
  trackTokenUsage,
  findUnusedTokens,
  auditAccessibility,
  trackCSSUsage,
  detectStyleConflicts,
  enableHotReload,
  registerComponent,
};