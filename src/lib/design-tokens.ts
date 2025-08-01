/**
 * KCA AI LAB Design System - Design Tokens
 * 의미론적 토큰과 컴포넌트별 토큰을 정의합니다.
 */

// =====================================
// 1. Primitive Tokens (원시 토큰)
// =====================================

export const primitiveTokens = {
  colors: {
    // Brand Colors
    blue: {
      50: '#EFF6FF',
      100: '#DBEAFE', 
      200: '#BFDBFE',
      300: '#93C5FD',
      400: '#60A5FA',
      500: '#3B82F6', // Primary
      600: '#2563EB',
      700: '#1D4ED8',
      800: '#1E40AF',
      900: '#1E3A8A',
    },
    purple: {
      500: '#5E6AD2', // KCA Brand
      600: '#4F46E5',
      700: '#4338CA',
    },
    // Grayscale
    gray: {
      50: '#F9FAFB',
      100: '#F3F4F6',
      200: '#E5E7EB',
      300: '#D1D5DB',
      400: '#9CA3AF',
      500: '#6B7280',
      600: '#4B5563',
      700: '#374151',
      800: '#1F2937',
      900: '#111827',
    },
    // Dark theme specific
    dark: {
      50: '#F7F8F8',
      100: '#E6E6E6',
      200: '#8A8F98',
      300: '#62626D',
      400: '#3E3E44',
      500: '#282830',
      600: '#141516',
      700: '#0F1011',
      800: '#08090A',
    },
    // Feedback colors
    red: {
      500: '#EF4444',
      600: '#DC2626',
      700: '#B91C1C',
    },
    green: {
      500: '#10B981',
      600: '#059669',
      700: '#047857',
    },
    yellow: {
      500: '#F59E0B',
      600: '#D97706',
      700: '#B45309',
    },
  },
  spacing: {
    0: '0px',
    1: '4px',
    2: '8px',
    3: '12px',
    4: '16px',
    5: '20px',
    6: '24px',
    8: '32px',
    10: '40px',
    12: '48px',
    16: '64px',
    20: '80px',
    24: '96px',
    32: '128px',
  },
  borderRadius: {
    none: '0px',
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    '2xl': '24px',
    full: '9999px',
  },
  fontSize: {
    xs: '12px',
    sm: '14px',
    base: '16px',
    lg: '18px',
    xl: '20px',
    '2xl': '24px',
    '3xl': '30px',
    '4xl': '36px',
    '5xl': '48px',
    '6xl': '60px',
  },
  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
  lineHeight: {
    tight: '1.25',
    normal: '1.5',
    relaxed: '1.75',
  },
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  },
};

// =====================================
// 2. Semantic Tokens (의미론적 토큰)
// =====================================

export const semanticTokens = {
  colors: {
    // Text colors
    text: {
      primary: primitiveTokens.colors.dark[50],
      secondary: 'rgba(255, 255, 255, 0.7)',
      tertiary: primitiveTokens.colors.dark[200],
      muted: primitiveTokens.colors.dark[300],
      disabled: primitiveTokens.colors.dark[400],
      inverse: primitiveTokens.colors.dark[800],
    },
    // Background colors
    background: {
      primary: primitiveTokens.colors.dark[800],
      secondary: primitiveTokens.colors.dark[600],
      tertiary: primitiveTokens.colors.dark[700],
      elevated: primitiveTokens.colors.dark[600],
      overlay: 'rgba(0, 0, 0, 0.5)',
    },
    // Surface colors
    surface: {
      primary: primitiveTokens.colors.dark[600],
      secondary: primitiveTokens.colors.dark[500],
      tertiary: primitiveTokens.colors.dark[400],
      elevated: primitiveTokens.colors.dark[600],
      glass: 'rgba(20, 21, 22, 0.8)',
    },
    // Border colors
    border: {
      primary: 'rgba(255, 255, 255, 0.08)',
      secondary: 'rgba(255, 255, 255, 0.12)',
      tertiary: 'rgba(255, 255, 255, 0.16)',
      focus: primitiveTokens.colors.blue[500],
      disabled: 'rgba(255, 255, 255, 0.04)',
    },
    // Brand colors
    brand: {
      primary: primitiveTokens.colors.blue[500],
      primaryHover: primitiveTokens.colors.blue[600],
      primaryActive: primitiveTokens.colors.blue[700],
      secondary: primitiveTokens.colors.purple[500],
      secondaryHover: primitiveTokens.colors.purple[600],
    },
    // Feedback colors
    feedback: {
      error: primitiveTokens.colors.red[500],
      errorHover: primitiveTokens.colors.red[600],
      success: primitiveTokens.colors.green[500],
      successHover: primitiveTokens.colors.green[600],
      warning: primitiveTokens.colors.yellow[500],
      warningHover: primitiveTokens.colors.yellow[600],
      info: primitiveTokens.colors.blue[500],
      infoHover: primitiveTokens.colors.blue[600],
    },
  },
  spacing: {
    // Component-specific spacing
    component: {
      xs: primitiveTokens.spacing[1], // 4px
      sm: primitiveTokens.spacing[2], // 8px
      md: primitiveTokens.spacing[4], // 16px
      lg: primitiveTokens.spacing[6], // 24px
      xl: primitiveTokens.spacing[8], // 32px
    },
    // Layout spacing
    layout: {
      xs: primitiveTokens.spacing[2], // 8px
      sm: primitiveTokens.spacing[4], // 16px
      md: primitiveTokens.spacing[6], // 24px
      lg: primitiveTokens.spacing[8], // 32px
      xl: primitiveTokens.spacing[12], // 48px
      '2xl': primitiveTokens.spacing[16], // 64px
    },
  },
};

// =====================================
// 3. Component Tokens (컴포넌트 토큰)
// =====================================

export const componentTokens = {
  button: {
    // Size variants
    size: {
      sm: {
        height: '32px',
        padding: `${primitiveTokens.spacing[2]} ${primitiveTokens.spacing[3]}`,
        fontSize: primitiveTokens.fontSize.sm,
        borderRadius: primitiveTokens.borderRadius.md,
      },
      md: {
        height: '40px',
        padding: `${primitiveTokens.spacing[3]} ${primitiveTokens.spacing[6]}`,
        fontSize: primitiveTokens.fontSize.sm,
        borderRadius: primitiveTokens.borderRadius.md,
      },
      lg: {
        height: '48px',
        padding: `${primitiveTokens.spacing[4]} ${primitiveTokens.spacing[8]}`,
        fontSize: primitiveTokens.fontSize.base,
        borderRadius: primitiveTokens.borderRadius.lg,
      },
    },
    // Style variants
    variant: {
      primary: {
        backgroundColor: semanticTokens.colors.brand.primary,
        color: primitiveTokens.colors.dark[50],
        borderColor: 'transparent',
        hover: {
          backgroundColor: semanticTokens.colors.brand.primaryHover,
        },
        active: {
          backgroundColor: semanticTokens.colors.brand.primaryActive,
        },
        disabled: {
          backgroundColor: primitiveTokens.colors.dark[400],
          color: primitiveTokens.colors.dark[300],
        },
      },
      secondary: {
        backgroundColor: semanticTokens.colors.surface.primary,
        color: semanticTokens.colors.text.primary,
        borderColor: semanticTokens.colors.border.primary,
        hover: {
          backgroundColor: semanticTokens.colors.surface.secondary,
          borderColor: semanticTokens.colors.border.secondary,
        },
      },
      ghost: {
        backgroundColor: 'transparent',
        color: semanticTokens.colors.text.tertiary,
        borderColor: 'transparent',
        hover: {
          backgroundColor: semanticTokens.colors.surface.primary,
          color: semanticTokens.colors.text.primary,
        },
      },
    },
  },
  card: {
    variant: {
      default: {
        backgroundColor: semanticTokens.colors.surface.primary,
        borderColor: semanticTokens.colors.border.primary,
        borderRadius: primitiveTokens.borderRadius.lg,
        padding: primitiveTokens.spacing[6],
        shadow: 'none',
      },
      elevated: {
        backgroundColor: semanticTokens.colors.surface.elevated,
        borderColor: semanticTokens.colors.border.secondary,
        borderRadius: primitiveTokens.borderRadius.lg,
        padding: primitiveTokens.spacing[6],
        shadow: primitiveTokens.shadows.md,
      },
      glass: {
        backgroundColor: semanticTokens.colors.surface.glass,
        borderColor: semanticTokens.colors.border.primary,
        borderRadius: primitiveTokens.borderRadius.lg,
        padding: primitiveTokens.spacing[6],
        backdropFilter: 'blur(20px)',
      },
    },
  },
  input: {
    size: {
      sm: {
        height: '32px',
        padding: `${primitiveTokens.spacing[2]} ${primitiveTokens.spacing[3]}`,
        fontSize: primitiveTokens.fontSize.sm,
        borderRadius: primitiveTokens.borderRadius.md,
      },
      md: {
        height: '40px',
        padding: `${primitiveTokens.spacing[3]} ${primitiveTokens.spacing[4]}`,
        fontSize: primitiveTokens.fontSize.sm,
        borderRadius: primitiveTokens.borderRadius.md,
      },
      lg: {
        height: '48px',
        padding: `${primitiveTokens.spacing[4]} ${primitiveTokens.spacing[4]}`,
        fontSize: primitiveTokens.fontSize.base,
        borderRadius: primitiveTokens.borderRadius.lg,
      },
    },
    variant: {
      default: {
        backgroundColor: semanticTokens.colors.surface.primary,
        borderColor: semanticTokens.colors.border.primary,
        color: semanticTokens.colors.text.primary,
        placeholderColor: semanticTokens.colors.text.muted,
        focus: {
          borderColor: semanticTokens.colors.border.focus,
          boxShadow: `0 0 0 1px ${semanticTokens.colors.border.focus}`,
        },
        error: {
          borderColor: semanticTokens.colors.feedback.error,
          boxShadow: `0 0 0 1px ${semanticTokens.colors.feedback.error}`,
        },
      },
    },
  },
  typography: {
    heading: {
      h1: {
        fontSize: primitiveTokens.fontSize['5xl'],
        fontWeight: primitiveTokens.fontWeight.bold,
        lineHeight: primitiveTokens.lineHeight.tight,
        letterSpacing: '-0.025em',
        color: semanticTokens.colors.text.primary,
      },
      h2: {
        fontSize: primitiveTokens.fontSize['3xl'],
        fontWeight: primitiveTokens.fontWeight.semibold,
        lineHeight: primitiveTokens.lineHeight.tight,
        letterSpacing: '-0.020em',
        color: semanticTokens.colors.text.primary,
      },
      h3: {
        fontSize: primitiveTokens.fontSize['2xl'],
        fontWeight: primitiveTokens.fontWeight.semibold,
        lineHeight: primitiveTokens.lineHeight.normal,
        color: semanticTokens.colors.text.primary,
      },
      h4: {
        fontSize: primitiveTokens.fontSize.lg,
        fontWeight: primitiveTokens.fontWeight.medium,
        lineHeight: primitiveTokens.lineHeight.normal,
        color: semanticTokens.colors.text.primary,
      },
    },
    body: {
      large: {
        fontSize: primitiveTokens.fontSize.lg,
        fontWeight: primitiveTokens.fontWeight.normal,
        lineHeight: primitiveTokens.lineHeight.relaxed,
        color: semanticTokens.colors.text.primary,
      },
      medium: {
        fontSize: primitiveTokens.fontSize.base,
        fontWeight: primitiveTokens.fontWeight.normal,
        lineHeight: primitiveTokens.lineHeight.normal,
        color: semanticTokens.colors.text.primary,
      },
      small: {
        fontSize: primitiveTokens.fontSize.sm,
        fontWeight: primitiveTokens.fontWeight.normal,
        lineHeight: primitiveTokens.lineHeight.normal,
        color: semanticTokens.colors.text.secondary,
      },
    },
  },
};

// =====================================
// 4. Animation Tokens
// =====================================

const animationDuration = {
  instant: '0ms',
  fast: '100ms',
  normal: '200ms',
  slow: '300ms',
  slower: '500ms',
};

const animationEasing = {
  linear: 'linear',
  ease: 'ease',
  easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
  easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
  easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
};

export const animationTokens = {
  duration: animationDuration,
  easing: animationEasing,
  transitions: {
    all: `all ${animationDuration.normal} ${animationEasing.easeInOut}`,
    color: `color ${animationDuration.fast} ${animationEasing.easeOut}`,
    background: `background-color ${animationDuration.normal} ${animationEasing.easeOut}`,
    border: `border-color ${animationDuration.fast} ${animationEasing.easeOut}`,
    transform: `transform ${animationDuration.normal} ${animationEasing.easeOut}`,
    opacity: `opacity ${animationDuration.fast} ${animationEasing.easeOut}`,
  },
};

// =====================================
// 5. Accessibility Tokens
// =====================================

export const a11yTokens = {
  focus: {
    outline: `2px solid ${semanticTokens.colors.border.focus}`,
    outlineOffset: '2px',
  },
  minTouchTarget: '44px',
  textContrast: {
    aa: '4.5:1',
    aaa: '7:1',
  },
};

// =====================================
// 6. Exported Design System
// =====================================

export const designTokens = {
  primitive: primitiveTokens,
  semantic: semanticTokens,
  component: componentTokens,
  animation: animationTokens,
  a11y: a11yTokens,
} as const;

export default designTokens;