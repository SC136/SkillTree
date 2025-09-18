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
        // RPG Dark Theme
        background: {
          primary: '#0a0e1a',
          secondary: '#1a1f2e',
          tertiary: '#2a2f3e',
        },
        surface: {
          primary: '#1e293b',
          secondary: '#334155',
          tertiary: '#475569',
        },
        text: {
          primary: '#f1f5f9',
          secondary: '#cbd5e1',
          muted: '#94a3b8',
        },
        accent: {
          primary: '#3b82f6',
          secondary: '#8b5cf6',
          tertiary: '#06b6d4',
        },
        skill: {
          locked: '#475569',
          available: '#fbbf24',
          completed: '#10b981',
          recommended: '#8b5cf6',
        },
        node: {
          science: '#06b6d4',
          commerce: '#f59e0b',
          arts: '#ec4899',
          interdisciplinary: '#8b5cf6',
        }
      },
      fontFamily: {
        'rpg': ['Orbitron', 'ui-monospace', 'monospace'],
        'fantasy': ['Cinzel', 'serif'],
      },
      animation: {
        'unlock': 'unlock 0.8s ease-out',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'float': 'float 3s ease-in-out infinite',
        'particle': 'particle 1s ease-out forwards',
      },
      keyframes: {
        unlock: {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.3)', opacity: '0.8' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px currentColor' },
          '100%': { boxShadow: '0 0 20px currentColor, 0 0 30px currentColor' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        particle: {
          '0%': { transform: 'translateY(0) scale(1)', opacity: '1' },
          '100%': { transform: 'translateY(-20px) scale(0)', opacity: '0' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}