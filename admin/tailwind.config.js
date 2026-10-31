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
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
        },
        brand: {
          dark: '#0B132B',
          primary: '#1C2541',
          accent: '#3A506B',
          highlight: '#5BC0BE',
          gold: '#D97706',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
