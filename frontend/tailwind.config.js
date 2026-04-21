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
        primary: "#6366f1",
        secondary: "#8b5cf6",
        accent: "#a78bfa",
        dark: {
          DEFAULT: "#0f0f1a",
          100: "#1a1a2e",
          200: "#16213e",
        },
      },
      backdropBlur: {
        'xs': '2px',
        'glass': '20px',
        '3xl': '64px',
      },
      backgroundImage: {
        'glass-gradient': 'linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.06) 100%)',
        'glass-gradient-dark': 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)',
        'hero-gradient': 'linear-gradient(135deg, #e8eaf6 0%, #ede7f6 25%, #e3f2fd 55%, #f3e5f5 80%, #fce4ec 100%)',
        'hero-gradient-dark': 'linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 35%, #16213e 65%, #0d0d1a 100%)',
        'orb-1': 'radial-gradient(circle, rgba(139,92,246,0.25) 0%, transparent 70%)',
        'orb-2': 'radial-gradient(circle, rgba(99,102,241,0.2) 0%, transparent 70%)',
        'orb-3': 'radial-gradient(circle, rgba(236,72,153,0.15) 0%, transparent 70%)',
        'card-shine': 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.1) 100%)',
      },
      boxShadow: {
        'glass': '0 8px 32px rgba(0,0,0,0.08), 0 1px 0 rgba(255,255,255,0.5) inset',
        'glass-md': '0 16px 48px rgba(0,0,0,0.1), 0 1px 0 rgba(255,255,255,0.4) inset',
        'glass-lg': '0 24px 64px rgba(0,0,0,0.12), 0 1px 0 rgba(255,255,255,0.3) inset',
        'glass-dark': '0 8px 32px rgba(0,0,0,0.4), 0 1px 0 rgba(255,255,255,0.08) inset',
        'glass-dark-md': '0 16px 48px rgba(0,0,0,0.5), 0 1px 0 rgba(255,255,255,0.06) inset',
        'glow': '0 0 30px rgba(139,92,246,0.3)',
        'glow-sm': '0 0 15px rgba(139,92,246,0.2)',
        'inner-light': 'inset 0 1px 0 rgba(255,255,255,0.5)',
      },
      animation: {
        'float': 'float 8s ease-in-out infinite',
        'float-slow': 'float 12s ease-in-out infinite',
        'float-delayed': 'float 10s ease-in-out infinite 3s',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translate(0px, 0px) rotate(0deg)' },
          '33%': { transform: 'translate(20px, -20px) rotate(2deg)' },
          '66%': { transform: 'translate(-15px, 15px) rotate(-1deg)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        fadeInUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
