/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Brand Colors
        brand: {
          primary: '#3B82F6',
          'primary-rgb': '59, 130, 246',
        },
        
        // Background Colors
        background: {
          primary: '#08090A',
          'primary-rgb': '8, 9, 10',
          secondary: '#141516',
          'secondary-rgb': '20, 21, 22',
          tertiary: '#0F1011',
          'tertiary-rgb': '15, 16, 17',
        },
        
        // Surface Colors
        surface: {
          primary: '#141516',
          secondary: '#282830',
          tertiary: '#3E3E44',
        },
        
        // Text Colors
        text: {
          primary: '#F7F8F8',
          'primary-rgb': '247, 248, 248',
          secondary: 'rgba(255, 255, 255, 0.7)',
          tertiary: '#8A8F98',
          'tertiary-rgb': '138, 143, 152',
          muted: '#62626D',
          'muted-rgb': '98, 102, 109',
        },
        
        // Border Colors
        border: {
          primary: 'rgba(255, 255, 255, 0.08)',
          secondary: '#23252A',
        },
        
        // Neutral Colors
        neutral: {
          white: '#FFFFFF',
          'white-rgb': '255, 255, 255',
          gray100: '#E6E6E6',
          gray200: '#8A8F98',
          gray300: '#62626D',
          gray400: '#3E3E44',
          gray500: '#282830',
          gray600: '#141516',
          gray700: '#0F1011',
          gray800: '#08090A',
        },
      },
      fontFamily: {
        primary: ['"Inter Variable"', '"SF Pro Display"', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', '"Open Sans"', '"Helvetica Neue"', 'sans-serif'],
      },
      fontSize: {
        'h1': ['3.5rem', { lineHeight: '1.1', letterSpacing: '-0.0325em', fontWeight: '538' }],
        'h2': ['1.3125rem', { lineHeight: '1.33', letterSpacing: '-0.012em', fontWeight: '510' }],
        'h3': ['1.3125rem', { lineHeight: '1.33', letterSpacing: '-0.0176em', fontWeight: '510' }],
        'h4': ['0.875rem', { lineHeight: '1.71', letterSpacing: '-0.013em', fontWeight: '510' }],
        'body-large': ['1.3125rem', { lineHeight: '1.33', letterSpacing: '-0.012em', fontWeight: '510' }],
        'body-medium': ['0.875rem', { lineHeight: '1.5', fontWeight: '510' }],
        'body-small': ['0.8125rem', { lineHeight: '1.5', fontWeight: '510' }],
      },
      spacing: {
        'xs': '0.25rem',
        'sm': '0.5rem',
        'md': '1rem',
        'lg': '1.5rem',
        'xl': '2rem',
        '2xl': '3rem',
        '3xl': '4rem',
        '4xl': '6rem',
        'header-height': '64px',
        'container-max-width': '1200px',
      },
      borderRadius: {
        'button': '8px',
        'button-large': '30px',
      },
      boxShadow: {
        'sm': 'rgba(0, 0, 0, 0) 0px 8px 2px 0px, rgba(0, 0, 0, 0.01) 0px 5px 2px 0px, rgba(0, 0, 0, 0.04) 0px 3px 2px 0px, rgba(0, 0, 0, 0.07) 0px 1px 1px 0px, rgba(0, 0, 0, 0.08) 0px 0px 1px 0px',
        'md': 'rgba(0, 0, 0, 0.1) 0px 4px 16px',
        'lg': 'rgba(0, 0, 0, 0.2) 0px 8px 32px',
      },
      animation: {
        'fade-in': 'fadeIn 0.2s ease-out',
        'slide-up': 'slideUp 0.2s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      maxWidth: {
        'container': '1200px',
      },
    },
  },
  plugins: [],
} 