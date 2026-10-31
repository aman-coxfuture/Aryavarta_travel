/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        indigo: {
          950: '#07101d',
          900: '#0f1d33',
          800: '#172c4d',
          700: '#1e3a68',
          600: '#2b528e',
          500: '#3c6fb8',
        },
        gold: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
        },
        terracotta: {
          500: '#e07a5f',
          600: '#c85a3c',
          700: '#a84227',
        },
        sand: '#fbf9f5',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(15, 23, 42, 0.15)',
        'premium': '0 20px 40px -15px rgba(15, 23, 42, 0.12)',
        'glow-gold': '0 0 25px rgba(245, 158, 11, 0.35)',
      },
    },
  },
  plugins: [],
};
