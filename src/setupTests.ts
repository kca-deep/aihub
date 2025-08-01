// @ts-nocheck
/**
 * Jest Test Setup
 * Testing Library와 Jest DOM 매처 설정
 */

import React from 'react';
import '@testing-library/jest-dom';

declare global {
  const jest: any;
}

// Mock Next.js router
jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '/',
      query: {},
      asPath: '/',
      push: jest.fn(),
      pop: jest.fn(),
      reload: jest.fn(),
      back: jest.fn(),
      prefetch: jest.fn().mockResolvedValue(undefined),
      beforePopState: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn(),
        emit: jest.fn(),
      },
      isFallback: false,
      isLocaleDomain: true,
      isReady: true,
      isPreview: false,
    };
  },
}));

// Mock Next.js Image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line jsx-a11y/alt-text, @next/next/no-img-element
    return React.createElement('img', props);
  },
}));

// Mock Next.js Link component  
jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, ...props }: any) => {
    return React.createElement('a', props, children);
  },
}));

// Mock Intersection Observer
global.IntersectionObserver = jest.fn().mockImplementation((callback: any) => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
  root: null,
  rootMargin: '',
  thresholds: [],
}));

// Mock ResizeObserver
global.ResizeObserver = jest.fn().mockImplementation((callback: any) => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query: any) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock getComputedStyle
Object.defineProperty(window, 'getComputedStyle', {
  value: () => ({
    getPropertyValue: () => '',
    marginTop: '0px',
    paddingTop: '0px',
  }),
});

// Performance API mock
Object.defineProperty(window, 'performance', {
  value: {
    now: jest.fn(() => Date.now()),
    mark: jest.fn(),
    measure: jest.fn(),
  },
});

// Suppress console warnings for tests
const originalWarn = console.warn;
const originalError = console.error;

beforeAll(() => {
  console.warn = jest.fn();
  console.error = jest.fn();
});

afterAll(() => {
  console.warn = originalWarn;
  console.error = originalError;
});

// Global test utilities
global.testUtils = {
  // Custom test utilities can be added here
};