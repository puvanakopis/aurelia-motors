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
        stone: {
          50: '#FAF9F6',
          100: '#F4F2EC',
          200: '#E8E5DD',
          300: '#D6D1C6',
          400: '#A9A499',
          500: '#7E7A70',
          600: '#5A564E',
          700: '#3D3A34',
          800: '#262420',
          900: '#141311',
          950: '#0C0B0A',
        },
        obsidian: {
          DEFAULT: '#0D0E10',
          dark: '#08080A',
          card: '#141519',
          border: 'rgba(255, 255, 255, 0.08)',
        },
        champagne: {
          DEFAULT: '#EAE5DD',
          hover: '#F2EFEB',
          accent: '#D4AF37',
        },
        primary: {
          DEFAULT: 'var(--primary)',
          foreground: 'var(--primary-foreground)',
        },
        secondary: {
          DEFAULT: 'var(--secondary)',
          foreground: 'var(--secondary-foreground)',
        },
        muted: {
          DEFAULT: 'var(--muted)',
          foreground: 'var(--muted-foreground)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          foreground: 'var(--accent-foreground)',
        },
        card: {
          DEFAULT: 'var(--card)',
          foreground: 'var(--card-foreground)',
        },
        border: 'var(--border)',
        input: 'var(--input)',
        ring: 'var(--ring)',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['var(--font-display)', 'var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        'tracked': '0.15em',
        'tracked-wide': '0.22em',
        'tracked-widest': '0.3em',
      },
      borderRadius: {
        none: '0',
        sm: '2px',
        DEFAULT: '4px',
        md: '6px',
        lg: '8px',
        full: '9999px',
      },
    },
  },
  plugins: [],
};

export default config;
