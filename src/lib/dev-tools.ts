/**
 * KCA AI LAB Design System - Development Tools
 * 개발 및 디버깅을 위한 유틸리티 함수들
 */

import { useEffect, useRef, useState, useCallback } from 'react';

// =====================================
// 1. Development Environment Detection
// =====================================

/**
 * 개발 환경인지 확인
 */
export const isDevelopment = (): boolean => {
  return process.env.NODE_ENV === 'development';
};

/**
 * 프로덕션 환경인지 확인
 */
export const isProduction = (): boolean => {
  return process.env.NODE_ENV === 'production';
};

/**
 * 테스트 환경인지 확인
 */
export const isTest = (): boolean => {
  return process.env.NODE_ENV === 'test';
};

// =====================================
// 2. Debugging Utilities
// =====================================

/**
 * 조건부 로깅
 */
export const debugLog = (message: string, data?: any, condition: boolean = isDevelopment()): void => {
  if (condition) {
    console.log(`[DEBUG] ${message}`, data);
  }
};

/**
 * 성능 측정 로깅
 */
export const performanceLog = (name: string, fn: () => void): void => {
  if (!isDevelopment()) return;
  
  const startTime = performance.now();
  fn();
  const endTime = performance.now();
  
  console.log(`[PERFORMANCE] ${name}: ${(endTime - startTime).toFixed(2)}ms`);
};

/**
 * 컴포넌트 렌더링 추적
 */
export const useRenderTracker = (componentName: string): void => {
  const renderCount = useRef(0);
  
  useEffect(() => {
    renderCount.current++;
    debugLog(`${componentName} rendered ${renderCount.current} times`);
  });
};

// =====================================
// 3. Error Boundary Utilities
// =====================================

/**
 * 에러 정보 수집
 */
export const collectErrorInfo = (error: Error, errorInfo?: any): object => {
  return {
    message: error.message,
    stack: error.stack,
    name: error.name,
    errorInfo,
    timestamp: new Date().toISOString(),
    userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : 'server',
    url: typeof window !== 'undefined' ? window.location.href : 'server',
  };
};

/**
 * 에러 보고
 */
export const reportError = (error: Error, errorInfo?: any): void => {
  const errorData = collectErrorInfo(error, errorInfo);
  
  if (isDevelopment()) {
    console.error('[ERROR]', errorData);
  } else {
    // 프로덕션에서는 에러 리포팅 서비스로 전송
    // 예: Sentry, LogRocket 등
    console.error('[ERROR]', errorData);
  }
};

// =====================================
// 4. Component Inspection
// =====================================

/**
 * 컴포넌트 props 검사
 */
export const inspectProps = (componentName: string, props: any): void => {
  if (!isDevelopment()) return;
  
  console.group(`🔍 ${componentName} Props`);
  console.log('Props:', props);
  console.log('Props Type:', typeof props);
  console.log('Props Keys:', Object.keys(props));
  console.groupEnd();
};

/**
 * 상태 변화 추적
 */
export const useStateTracker = <T>(initialState: T, name: string) => {
  const [state, setState] = useState<T>(initialState);
  const prevState = useRef<T>(initialState);
  
  const setStateWithTracking = useCallback((newState: T | ((prev: T) => T)) => {
    setState(prev => {
      const nextState = typeof newState === 'function' ? (newState as (prev: T) => T)(prev) : newState;
      
      if (isDevelopment()) {
        console.log(`[STATE] ${name}:`, {
          previous: prevState.current,
          current: nextState,
          changed: prevState.current !== nextState,
        });
      }
      
      prevState.current = nextState;
      return nextState;
    });
  }, [name]);
  
  return [state, setStateWithTracking] as const;
};

// =====================================
// 5. Performance Monitoring
// =====================================

/**
 * 메모리 사용량 모니터링
 */
export const useMemoryMonitor = (componentName: string): void => {
  useEffect(() => {
    if (!isDevelopment() || typeof performance === 'undefined') return;
    
    const interval = setInterval(() => {
      if ('memory' in performance) {
        const memory = (performance as any).memory;
        debugLog(`${componentName} Memory Usage:`, {
          used: `${Math.round(memory.usedJSHeapSize / 1048576)} MB`,
          total: `${Math.round(memory.totalJSHeapSize / 1048576)} MB`,
          limit: `${Math.round(memory.jsHeapSizeLimit / 1048576)} MB`,
        });
      }
    }, 5000);
    
    return () => clearInterval(interval);
  }, [componentName]);
};

/**
 * 네트워크 요청 모니터링
 */
export const useNetworkMonitor = (): void => {
  useEffect(() => {
    if (!isDevelopment()) return;
    
    const originalFetch = window.fetch;
    window.fetch = function(...args) {
      const startTime = performance.now();
      
      return originalFetch.apply(this, args).then(response => {
        const endTime = performance.now();
        debugLog('Network Request:', {
          url: args[0],
          duration: `${(endTime - startTime).toFixed(2)}ms`,
          status: response.status,
        });
        return response;
      });
    };
    
    return () => {
      window.fetch = originalFetch;
    };
  }, []);
};

// =====================================
// 6. Development Tools
// =====================================

/**
 * 개발 도구 패널 생성
 */
export const createDevToolsPanel = (): void => {
  if (!isDevelopment() || typeof window === 'undefined') return;
  
  const panel = document.createElement('div');
  panel.id = 'dev-tools-panel';
  panel.style.cssText = `
    position: fixed;
    top: 10px;
    right: 10px;
    background: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 10px;
    border-radius: 5px;
    font-family: monospace;
    font-size: 12px;
    z-index: 9999;
    max-width: 300px;
  `;
  
  panel.innerHTML = `
    <div><strong>Dev Tools</strong></div>
    <div>Environment: ${process.env.NODE_ENV}</div>
    <div>Build Time: ${new Date().toLocaleString()}</div>
  `;
  
  document.body.appendChild(panel);
};

/**
 * 컴포넌트 트리 시각화
 */
export const visualizeComponentTree = (componentName: string, depth: number = 0): void => {
  if (!isDevelopment()) return;
  
  const indent = '  '.repeat(depth);
  console.log(`${indent}${depth === 0 ? '└─' : '├─'} ${componentName}`);
};

// =====================================
// 7. Hot Reload Detection
// =====================================

/**
 * 핫 리로드 감지
 */
export const useHotReloadDetection = (): void => {
  useEffect(() => {
    if (!isDevelopment()) return;
    
    debugLog('Component hot reloaded');
  });
};

// =====================================
// 8. Development Hooks
// =====================================

/**
 * 개발 전용 훅
 */
export const useDevOnly = (callback: () => void, deps: any[] = []): void => {
  useEffect(() => {
    if (isDevelopment()) {
      callback();
    }
  }, [callback]);
};

/**
 * 프로덕션 전용 훅
 */
export const useProdOnly = (callback: () => void, deps: any[] = []): void => {
  useEffect(() => {
    if (isProduction()) {
      callback();
    }
  }, [callback]);
};

// =====================================
// 9. Export Development Tools
// =====================================

const devTools = {
  isDevelopment,
  isProduction,
  isTest,
  debugLog,
  performanceLog,
  useRenderTracker,
  collectErrorInfo,
  reportError,
  inspectProps,
  useStateTracker,
  useMemoryMonitor,
  useNetworkMonitor,
  createDevToolsPanel,
  visualizeComponentTree,
  useHotReloadDetection,
  useDevOnly,
  useProdOnly,
};

export default devTools;