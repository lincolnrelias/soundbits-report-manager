/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          600: '#1fb6ff',
          700: '#0f7bc0'
        },
        gray: {
          100: '#f3f4f6',
          200: '#e5e7eb',
          500: '#8492a6',
          700: '#273444',
          800: '#1f2937',
          900: '#111827'
        },
        red: {
          100: '#fee2e2',
          400: '#f87171',
          500: '#ef4444'
        }
      },
      fontFamily: {
        sans: ['Graphik', 'ui-sans-serif', 'system-ui', '-apple-system'],
        serif: ['Merriweather', 'ui-serif', 'Georgia']
      },
      borderRadius: {
        'lg': '0.5rem',
        '4xl': '2rem'
      },
      boxShadow: {
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
      }
    }
  },
  plugins: []
}

