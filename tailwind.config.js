/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f8fafc',
          100: '#f1f5f9',
          500: '#62b9ff',
          700: '#20639b',
          900: '#0f172a',
        },
      },
      boxShadow: {
        glow: '0 0 50px rgba(98, 185, 255, 0.25)',
      },
    },
  },
  plugins: [],
};
