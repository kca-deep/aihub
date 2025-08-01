/**
 * Linear Design System Theme Configuration
 * Complete theme data extracted from Linear.app website
 */

export interface LinearTheme {
  name: string;
  description: string;
  version: string;
  meta: {
    title: string;
    description: string;
    viewport: string;
  };
  colors: {
    brand: {
      primary: string;
      primaryRgb: string;
      primaryHex: string;
    };
    background: {
      primary: string;
      primaryRgb: string;
      secondary: string;
      secondaryRgb: string;
      tertiary: string;
      tertiaryRgb: string;
    };
    surface: {
      primary: string;
      secondary: string;
      tertiary: string;
    };
    text: {
      primary: string;
      primaryRgb: string;
      secondary: string;
      tertiary: string;
      tertiaryRgb: string;
      muted: string;
      mutedRgb: string;
    };
    border: {
      primary: string;
      secondary: string;
    };
    neutral: {
      white: string;
      whiteRgb: string;
      gray100: string;
      gray200: string;
      gray300: string;
      gray400: string;
      gray500: string;
      gray600: string;
      gray700: string;
      gray800: string;
    };
  };
  typography: {
    fontFamily: {
      primary: string;
    };
    headings: {
      h1: TypographyStyle;
      h2: TypographyStyle;
      h3: TypographyStyle;
      h4: TypographyStyle;
    };
    body: {
      large: TypographyStyle;
      medium: TypographyStyle;
      small: TypographyStyle;
    };
  };
  spacing: {
    scale: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      '2xl': string;
      '3xl': string;
      '4xl': string;
    };
    layout: {
      headerHeight: string;
      containerMaxWidth: string;
      sectionPadding: string;
    };
  };
  borderRadius: {
    none: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    '2xl': string;
    full: string;
    button: string;
    buttonLarge: string;
  };
  shadows: {
    sm: string;
    md: string;
    lg: string;
  };
  gradients: {
    subtle: string;
    glass: string;
    overlay: string;
    fade: string;
  };
  components: {
    button: {
      primary: ButtonStyle;
      secondary: ButtonStyle;
      ghost: ButtonStyle;
      large: Partial<ButtonStyle>;
    };
    navigation: {
      height: string;
      backgroundColor: string;
      borderBottom: string;
      backdropFilter: string;
    };
    card: {
      backgroundColor: string;
      border: string;
      borderRadius: string;
      padding: string;
    };
  };
  animation: {
    duration: {
      fast: string;
      normal: string;
      slow: string;
      slower: string;
    };
    easing: {
      default: string;
      easeOut: string;
      easeIn: string;
    };
    transitions: {
      button: string;
      color: string;
      background: string;
      transform: string;
    };
  };
  layout: {
    breakpoints: {
      mobile: string;
      tablet: string;
      desktop: string;
      wide: string;
    };
    container: {
      maxWidth: string;
      padding: string;
    };
    grid: {
      columns: number;
      gutter: string;
    };
  };
  designPrinciples: {
    philosophy: string;
    characteristics: string[];
    darkMode: boolean;
    minimalist: boolean;
    professional: boolean;
  };
}

interface TypographyStyle {
  fontSize: string;
  fontSizePx: string;
  fontWeight: string;
  lineHeight: string;
  letterSpacing?: string;
  letterSpacingPx?: string;
}

interface ButtonStyle {
  backgroundColor: string;
  color: string;
  border: string;
  borderRadius: string;
  padding: string;
  fontSize: string;
  fontWeight: string;
  transition: string;
}

export const linearTheme: LinearTheme = {
  name: "KCA AI LAB Design System",
  description: "Complete theme data extracted from KCA AI LAB website",
  version: "1.0.0",
  meta: {
    title: "KCA AI LAB – Plan and build products",
    description: "KCA AI LAB streamlines issues, projects, and roadmaps. Purpose-built for modern product development.",
    viewport: "width=device-width, height=device-height, initial-scale=1, viewport-fit=cover"
  },
  colors: {
    brand: {
      primary: "#3B82F6",
      primaryRgb: "rgb(59, 130, 246)",
      primaryHex: "#3B82F6"
    },
    background: {
      primary: "#08090A",
      primaryRgb: "rgb(8, 9, 10)",
      secondary: "#141516",
      secondaryRgb: "rgb(20, 21, 22)",
      tertiary: "#0F1011",
      tertiaryRgb: "rgb(15, 16, 17)"
    },
    surface: {
      primary: "#141516",
      secondary: "#282830",
      tertiary: "#3E3E44"
    },
    text: {
      primary: "#F7F8F8",
      primaryRgb: "rgb(247, 248, 248)",
      secondary: "rgba(255, 255, 255, 0.7)",
      tertiary: "#8A8F98",
      tertiaryRgb: "rgb(138, 143, 152)",
      muted: "#62626D",
      mutedRgb: "rgb(98, 102, 109)"
    },
    border: {
      primary: "rgba(255, 255, 255, 0.08)",
      secondary: "#23252A"
    },
    neutral: {
      white: "#FFFFFF",
      whiteRgb: "rgb(255, 255, 255)",
      gray100: "#E6E6E6",
      gray200: "#8A8F98",
      gray300: "#62626D",
      gray400: "#3E3E44",
      gray500: "#282830",
      gray600: "#141516",
      gray700: "#0F1011",
      gray800: "#08090A"
    }
  },
  typography: {
    fontFamily: {
      primary: "\"Inter Variable\", \"SF Pro Display\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Oxygen, Ubuntu, Cantarell, \"Open Sans\", \"Helvetica Neue\", sans-serif"
    },
    headings: {
      h1: {
        fontSize: "3.5rem",
        fontSizePx: "56px",
        fontWeight: "538",
        lineHeight: "1.1",
        letterSpacing: "-0.0325em",
        letterSpacingPx: "-1.82px"
      },
      h2: {
        fontSize: "1.3125rem",
        fontSizePx: "21px",
        fontWeight: "510",
        lineHeight: "1.33",
        letterSpacing: "-0.012em",
        letterSpacingPx: "-0.252px"
      },
      h3: {
        fontSize: "1.3125rem",
        fontSizePx: "21px",
        fontWeight: "510",
        lineHeight: "1.33",
        letterSpacing: "-0.0176em",
        letterSpacingPx: "-0.37px"
      },
      h4: {
        fontSize: "0.875rem",
        fontSizePx: "14px",
        fontWeight: "510",
        lineHeight: "1.71",
        letterSpacing: "-0.013em",
        letterSpacingPx: "-0.182px"
      }
    },
    body: {
      large: {
        fontSize: "1.3125rem",
        fontSizePx: "21px",
        fontWeight: "510",
        lineHeight: "1.33",
        letterSpacing: "-0.012em"
      },
      medium: {
        fontSize: "0.875rem",
        fontSizePx: "14px",
        fontWeight: "510",
        lineHeight: "1.5"
      },
      small: {
        fontSize: "0.8125rem",
        fontSizePx: "13px",
        fontWeight: "510",
        lineHeight: "1.5"
      }
    }
  },
  spacing: {
    scale: {
      xs: "0.25rem",
      sm: "0.5rem",
      md: "1rem",
      lg: "1.5rem",
      xl: "2rem",
      "2xl": "3rem",
      "3xl": "4rem",
      "4xl": "6rem"
    },
    layout: {
      headerHeight: "64px",
      containerMaxWidth: "1200px",
      sectionPadding: "4rem 0"
    }
  },
  borderRadius: {
    none: "0px",
    sm: "4px",
    md: "8px",
    lg: "12px",
    xl: "16px",
    "2xl": "24px",
    full: "9999px",
    button: "8px",
    buttonLarge: "30px"
  },
  shadows: {
    sm: "rgba(0, 0, 0, 0) 0px 8px 2px 0px, rgba(0, 0, 0, 0.01) 0px 5px 2px 0px, rgba(0, 0, 0, 0.04) 0px 3px 2px 0px, rgba(0, 0, 0, 0.07) 0px 1px 1px 0px, rgba(0, 0, 0, 0.08) 0px 0px 1px 0px",
    md: "rgba(0, 0, 0, 0.1) 0px 4px 16px",
    lg: "rgba(0, 0, 0, 0.2) 0px 8px 32px"
  },
  gradients: {
    subtle: "linear-gradient(rgba(255, 255, 255, 0.05), rgba(0, 0, 0, 0) 20%)",
    glass: "linear-gradient(134deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.02), rgba(255, 255, 255, 0) 55%)",
    overlay: "linear-gradient(rgba(255, 255, 255, 0.1) 40%, rgba(8, 9, 10, 0.1))",
    fade: "linear-gradient(to right, rgb(247, 248, 248), rgba(0, 0, 0, 0) 80%)"
  },
  components: {
    button: {
      primary: {
        backgroundColor: "#5E6AD2",
        color: "#FFFFFF",
        border: "none",
        borderRadius: "8px",
        padding: "12px 24px",
        fontSize: "14px",
        fontWeight: "510",
        transition: "all 0.16s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
      },
      secondary: {
        backgroundColor: "#141516",
        color: "#F7F8F8",
        border: "1px solid rgba(255, 255, 255, 0.08)",
        borderRadius: "8px",
        padding: "12px 24px",
        fontSize: "14px",
        fontWeight: "510",
        transition: "all 0.16s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
      },
      ghost: {
        backgroundColor: "transparent",
        color: "#8A8F98",
        border: "none",
        borderRadius: "8px",
        padding: "12px 24px",
        fontSize: "13px",
        fontWeight: "510",
        transition: "color 0.1s cubic-bezier(0.25, 0.46, 0.45, 0.94), background 0.1s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
      },
      large: {
        borderRadius: "30px",
        padding: "16px 32px",
        fontSize: "16px"
      }
    },
    navigation: {
      height: "64px",
      backgroundColor: "rgba(10, 10, 10, 0.8)",
      borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
      backdropFilter: "blur(20px)"
    },
    card: {
      backgroundColor: "#141516",
      border: "1px solid rgba(255, 255, 255, 0.08)",
      borderRadius: "12px",
      padding: "24px"
    }
  },
  animation: {
    duration: {
      fast: "0.1s",
      normal: "0.16s",
      slow: "0.2s",
      slower: "0.24s"
    },
    easing: {
      default: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      easeOut: "ease-out",
      easeIn: "ease-in"
    },
    transitions: {
      button: "all 0.16s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      color: "color 0.1s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      background: "background 0.2s ease-out",
      transform: "transform 0.16s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
    }
  },
  layout: {
    breakpoints: {
      mobile: "768px",
      tablet: "1024px",
      desktop: "1200px",
      wide: "1440px"
    },
    container: {
      maxWidth: "1200px",
      padding: "0 24px"
    },
    grid: {
      columns: 12,
      gutter: "24px"
    }
  },
  designPrinciples: {
    philosophy: "KCA AI LAB is shaped by the practices and principles that distinguish world-class product teams from the rest: relentless focus, fast execution, and a commitment to the quality of craft.",
    characteristics: [
      "Purpose-built for product development",
      "Designed to move fast", 
      "Crafted to perfection"
    ],
    darkMode: true,
    minimalist: true,
    professional: true
  }
}; 