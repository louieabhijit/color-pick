/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: "#2563eb",
        secondary: "#4f46e5",
        dark: {
          DEFAULT: "#1a1a1a",
          100: "#2d2d2d",
          200: "#4d4d4d",
        },
      },
      backdropBlur: {
        'glass': '8px',
      },
      backgroundColor: {
        'glass-light': 'rgba(255, 255, 255, 0.1)',
        'glass-dark': 'rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [],
} 