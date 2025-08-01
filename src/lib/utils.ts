import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * 클래스명을 병합하는 유틸리티 함수
 * clsx와 tailwind-merge를 사용하여 중복 클래스를 정리합니다.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * CSS 변수로 테마 값을 설정하는 함수
 */
export function setThemeVariables(theme: any, element: HTMLElement = document.documentElement) {
  const setColorVariables = (colors: any, prefix = '') => {
    Object.entries(colors).forEach(([key, value]) => {
      if (typeof value === 'object' && value !== null) {
        setColorVariables(value, `${prefix}${key}-`);
      } else {
        element.style.setProperty(`--${prefix}${key}`, value as string);
      }
    });
  };

  setColorVariables(theme.colors);
}

/**
 * 픽셀 값을 숫자로 변환하는 함수
 */
export function parsePx(value: string): number {
  return parseInt(value.replace('px', ''), 10);
}

/**
 * rem 값을 픽셀로 변환하는 함수
 */
export function remToPx(rem: string): number {
  const remValue = parseFloat(rem.replace('rem', ''));
  return remValue * 16; // 기본 폰트 크기 16px 기준
}

/**
 * 색상 값을 RGB 배열로 변환하는 함수
 */
export function hexToRgb(hex: string): [number, number, number] | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? [
    parseInt(result[1], 16),
    parseInt(result[2], 16),
    parseInt(result[3], 16)
  ] : null;
}

/**
 * RGB 배열을 hex 값으로 변환하는 함수
 */
export function rgbToHex(r: number, g: number, b: number): string {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

/**
 * 색상의 밝기를 계산하는 함수
 */
export function getLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map(c => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

/**
 * 대비 비율을 계산하는 함수
 */
export function getContrastRatio(luminance1: number, luminance2: number): number {
  const lighter = Math.max(luminance1, luminance2);
  const darker = Math.min(luminance1, luminance2);
  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * 색상이 어두운지 밝은지 판단하는 함수
 */
export function isDarkColor(hex: string): boolean {
  const rgb = hexToRgb(hex);
  if (!rgb) return false;
  const luminance = getLuminance(...rgb);
  return luminance < 0.5;
} 