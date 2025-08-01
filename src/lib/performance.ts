/**
 * KCA AI LAB Design System - Performance Utilities
 * 성능 최적화를 위한 유틸리티 함수들
 */

import { useCallback, useMemo, useRef, useEffect, useState, lazy, ComponentType } from 'react';

// =====================================
// 1. Memoization Utilities
// =====================================

/**
 * 깊은 비교를 통한 메모이제이션 훅
 */
export const useDeepMemo = <T>(factory: () => T, deps: any[]): T => {
  const prevDeps = useRef<any[]>();
  const memoizedValue = useRef<T>();

  const hasChanged = !prevDeps.current || 
    deps.length !== prevDeps.current.length ||
    deps.some((dep, i) => !Object.is(dep, prevDeps.current![i]));

  if (hasChanged) {
    memoizedValue.current = factory();
    prevDeps.current = deps;
  }

  return memoizedValue.current!;
};

/**
 * 안정적인 콜백 메모이제이션
 */
export const useStableCallback = <T extends (...args: any[]) => any>(
  callback: T
): T => {
  const callbackRef = useRef<T>(callback);
  callbackRef.current = callback;

  return useCallback(
    ((...args: Parameters<T>) => callbackRef.current(...args)) as T,
    []
  );
};

/**
 * 이전 값 추적 훅
 */
export const usePrevious = <T>(value: T): T | undefined => {
  const ref = useRef<T>();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

// =====================================
// 2. Lazy Loading Utilities
// =====================================

/**
 * 컴포넌트 지연 로딩 헬퍼
 */
export const createLazyComponent = <T extends ComponentType<any>>(
  importFn: () => Promise<{ default: T }>,
  options?: {
    fallback?: React.ComponentType;
    retryCount?: number;
    retryDelay?: number;
  }
) => {
  const { fallback, retryCount = 3, retryDelay = 1000 } = options || {};
  
  const LazyComponent = lazy(() => {
    let retries = 0;
    
    const attemptImport = async (): Promise<{ default: T }> => {
      try {
        return await importFn();
      } catch (error) {
        if (retries < retryCount) {
          retries++;
          await new Promise(resolve => setTimeout(resolve, retryDelay));
          return attemptImport();
        }
        throw error;
      }
    };
    
    return attemptImport();
  });

  if (fallback) {
    (LazyComponent as any).displayName = `Lazy(${(fallback as any).displayName || (fallback as any).name || 'Component'})`;
  }

  return LazyComponent;
};

/**
 * 동적 import 캐시
 */
const importCache = new Map<string, Promise<any>>();

export const cachedImport = <T>(
  key: string,
  importFn: () => Promise<T>
): Promise<T> => {
  if (!importCache.has(key)) {
    importCache.set(key, importFn());
  }
  return importCache.get(key)!;
};

// =====================================
// 3. Bundle Optimization
// =====================================

/**
 * 트리 셰이킹을 위한 명시적 export 헬퍼
 */
export const createExportMap = <T extends Record<string, any>>(
  exports: T
): T => {
  // 개발 모드에서 사용하지 않는 export 경고
  if (process.env.NODE_ENV === 'development') {
    const usedExports = new Set<string>();
    
    return new Proxy(exports, {
      get(target, prop: string) {
        usedExports.add(prop);
        return target[prop];
      }
    });
  }
  
  return exports;
};

/**
 * 코드 스플리팅을 위한 모듈 그룹화
 */
export const createModuleGroup = (modules: Record<string, () => Promise<any>>) => {
  return {
    loadModule: async <K extends keyof typeof modules>(key: K) => {
      return cachedImport(key as string, modules[key]);
    },
    
    preloadModules: (keys: (keyof typeof modules)[]) => {
      keys.forEach(key => {
        cachedImport(key as string, modules[key]);
      });
    },
    
    loadAllModules: async () => {
      const promises = Object.entries(modules).map(([key, importFn]) =>
        cachedImport(key, importFn)
      );
      return Promise.all(promises);
    }
  };
};

// =====================================
// 4. Resource Preloading
// =====================================

/**
 * 리소스 프리로딩 유틸리티
 */
export const preloadResource = (
  href: string,
  as: 'script' | 'style' | 'image' | 'font' = 'script',
  crossOrigin?: 'anonymous' | 'use-credentials'
): void => {
  if (typeof document === 'undefined') return;
  
  const existingLink = document.querySelector(`link[href="${href}"]`);
  if (existingLink) return;
  
  const link = document.createElement('link');
  link.rel = 'preload';
  link.href = href;
  link.as = as;
  
  if (crossOrigin) {
    link.crossOrigin = crossOrigin;
  }
  
  if (as === 'font') {
    link.type = 'font/woff2';
    link.crossOrigin = 'anonymous';
  }
  
  document.head.appendChild(link);
};

/**
 * 중요 리소스 우선 로딩
 */
export const preloadCriticalResources = (resources: {
  fonts?: string[];
  images?: string[];
  scripts?: string[];
  styles?: string[];
}): void => {
  const { fonts = [], images = [], scripts = [], styles = [] } = resources;
  
  fonts.forEach(href => preloadResource(href, 'font'));
  images.forEach(href => preloadResource(href, 'image'));
  scripts.forEach(href => preloadResource(href, 'script'));
  styles.forEach(href => preloadResource(href, 'style'));
};

// =====================================
// 5. Performance Monitoring
// =====================================

/**
 * 성능 측정 유틸리티
 */
export const measurePerformance = (name: string, fn: () => void): number => {
  const startTime = performance.now();
  fn();
  const endTime = performance.now();
  const duration = endTime - startTime;
  
  if (process.env.NODE_ENV === 'development') {
    console.log(`${name} took ${duration.toFixed(2)} milliseconds`);
  }
  
  return duration;
};

/**
 * 렌더링 성능 추적 훅
 */
export const useRenderPerformance = (componentName: string): void => {
  const renderCount = useRef(0);
  const startTime = useRef<number>();
  
  renderCount.current++;
  
  if (!startTime.current) {
    startTime.current = performance.now();
  }
  
  useEffect(() => {
    const endTime = performance.now();
    const duration = endTime - startTime.current!;
    
    if (process.env.NODE_ENV === 'development') {
      console.log(
        `${componentName} render #${renderCount.current} took ${duration.toFixed(2)}ms`
      );
    }
    
    startTime.current = performance.now();
  });
};

// =====================================
// 6. Intersection Observer Utilities
// =====================================

/**
 * Intersection Observer 훅
 */
export const useIntersectionObserver = (
  elementRef: React.RefObject<Element>,
  options?: IntersectionObserverInit
) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [intersectionRatio, setIntersectionRatio] = useState(0);
  
  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
        setIntersectionRatio(entry.intersectionRatio);
      },
      options
    );
    
    observer.observe(element);
    
    return () => observer.disconnect();
  }, [elementRef, options]);
  
  return {
    isIntersecting,
    intersectionRatio,
  };
};

/**
 * 지연 로딩을 위한 Intersection Observer
 */
export const useLazyLoad = (
  threshold = 0.1,
  rootMargin = '50px'
) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    const element = elementRef.current;
    if (!element || isVisible) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin }
    );
    
    observer.observe(element);
    
    return () => observer.disconnect();
  }, [threshold, rootMargin, isVisible]);
  
  return {
    ref: elementRef,
    isVisible,
  };
};

// =====================================
// 7. Memory Management
// =====================================

/**
 * 메모리 리크 방지를 위한 cleanup 훅
 */
export const useCleanup = (cleanup: () => void): void => {
  const cleanupRef = useRef(cleanup);
  cleanupRef.current = cleanup;
  
  useEffect(() => {
    return () => {
      cleanupRef.current();
    };
  }, []);
};

/**
 * WeakMap 기반 메모이제이션
 */
export const createWeakMemoize = <K extends object, V>() => {
  const cache = new WeakMap<K, V>();
  
  return {
    get: (key: K): V | undefined => cache.get(key),
    set: (key: K, value: V): void => {
      cache.set(key, value);
    },
    has: (key: K): boolean => cache.has(key),
    delete: (key: K): boolean => cache.delete(key),
    
    memoize: (key: K, factory: () => V): V => {
      if (cache.has(key)) {
        return cache.get(key)!;
      }
      
      const value = factory();
      cache.set(key, value);
      return value;
    }
  };
};

// =====================================
// 8. Bundle Analysis Helpers
// =====================================

/**
 * 번들 크기 분석을 위한 import 추적
 */
export const trackImport = (moduleName: string, size?: number): void => {
  if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
    (window as any).__BUNDLE_ANALYSIS__ = (window as any).__BUNDLE_ANALYSIS__ || {};
    (window as any).__BUNDLE_ANALYSIS__[moduleName] = {
      imported: Date.now(),
      size: size || 'unknown'
    };
  }
};

/**
 * 동적 import 성능 측정
 */
export const timedImport = async <T>(
  importFn: () => Promise<T>,
  moduleName: string
): Promise<T> => {
  const startTime = performance.now();
  
  try {
    const importedModule = await importFn();
    const endTime = performance.now();
    const loadTime = endTime - startTime;
    
    if (process.env.NODE_ENV === 'development') {
      console.log(`${moduleName} loaded in ${loadTime.toFixed(2)}ms`);
    }
    
    trackImport(moduleName);
    return importedModule;
  } catch (error) {
    console.error(`Failed to load ${moduleName}:`, error);
    throw error;
  }
};

// =====================================
// 9. Export Performance Utilities
// =====================================

export default {
  useDeepMemo,
  useStableCallback,
  usePrevious,
  createLazyComponent,
  cachedImport,
  createExportMap,
  createModuleGroup,
  preloadResource,
  preloadCriticalResources,
  measurePerformance,
  useRenderPerformance,
  useIntersectionObserver,
  useLazyLoad,
  useCleanup,
  createWeakMemoize,
  trackImport,
  timedImport,
};