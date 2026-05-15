import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#52C47A',
        'primary-dark': '#3AAD62',
        'primary-light': '#72D494',
        cream: '#FFFEF5',
        'cream-dark': '#F5F3E8',
        'text-main': '#1A1A1A',
        'text-muted': '#444444',
        'text-on-green': '#FFFFFF',
        border: '#D8F0E0',
        bg: '#FFFEF5',
        surface: '#FEFDF0',
        accent: '#52C47A',
        'accent-light': '#72D494',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
