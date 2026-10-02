import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './features/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        carent: {
          yellow: '#FEE123',
          'yellow-hover': '#FDD835',
          'yellow-light': '#FFF8D6',
          dark: '#121316',
          'dark-card': '#191B1F',
          'dark-hover': '#23252B',
          gray: '#F4F4F6',
          'gray-light': '#F8F8FA',
          'gray-dark': '#E5E5E8',
          text: '#111215',
          'text-muted': '#6B7280',
        },
        stone: {
          50: '#FAF9F6',
          100: '#F4F4F6',
          200: '#E5E5E8',
          300: '#D1D1D6',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#121316',
          950: '#0B0C0E',
        },
        champagne: {
          DEFAULT: '#FEE123',
          hover: '#FDD835',
          accent: '#F5CB23',
        },
        primary: {
          DEFAULT: '#121316',
          foreground: '#FFFFFF',
        },
        secondary: {
          DEFAULT: '#F4F4F6',
          foreground: '#121316',
        },
        muted: {
          DEFAULT: '#F4F4F6',
          foreground: '#6B7280',
        },
        accent: {
          DEFAULT: '#FEE123',
          foreground: '#121316',
        },
        card: {
          DEFAULT: '#FFFFFF',
          foreground: '#121316',
        },
        border: '#E5E5E8',
        input: '#E5E5E8',
        ring: '#FEE123',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'Plus Jakarta Sans', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['var(--font-display)', 'var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        none: '0',
        sm: '4px',
        DEFAULT: '8px',
        md: '10px',
        lg: '14px',
        xl: '18px',
        '2xl': '24px',
        '3xl': '32px',
        full: '9999px',
      },
    },
  },
  plugins: [],
};

export default config;
