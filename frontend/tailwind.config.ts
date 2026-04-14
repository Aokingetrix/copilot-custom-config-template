import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Space Grotesk"', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(251, 191, 36, 0.2), 0 18px 45px rgba(15, 23, 42, 0.35)',
      },
      colors: {
        midnight: {
          950: '#060816',
          900: '#0b1020',
          800: '#121936',
        },
      },
    },
  },
  plugins: [],
};

export default config;