/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#090d12',
          surface: '#0f141d',
          card: '#151c27',
          border: '#212a3a',
          hover: '#1c2534',
          muted: '#8492a6',
          text: '#f1f5f9'
        },
        light: {
          bg: '#f8fafc',
          surface: '#ffffff',
          card: '#ffffff',
          border: '#e2e8f0',
          hover: '#f1f5f9',
          muted: '#64748b',
          text: '#0f172a'
        },
        accent: {
          DEFAULT: '#10b981',
          hover: '#059669',
          light: '#34d399',
          muted: 'rgba(16, 185, 129, 0.12)'
        }
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Menlo', 'Monaco', 'Courier New', 'monospace']
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
