/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Core brand — deep growth green, the single accent color
        canopy: {
          50: '#f2f7f4',
          100: '#e0ede4',
          200: '#c2dbc9',
          300: '#96c0a3',
          400: '#659c78',
          500: '#417d59',
          600: '#2f6b4f', // primary accent
          700: '#265542',
          800: '#204536',
          900: '#1b392d',
        },
        // Water / hydro-related information
        hydro: {
          50: '#eef6fb',
          100: '#d7ebf5',
          200: '#b0d6ea',
          300: '#7ebcd9',
          400: '#4a9cc2',
          500: '#2a6f97', // primary water blue
          600: '#215a7a',
          700: '#1c4a63',
        },
        // Warnings / cautions
        amber: {
          50: '#fdf5ea',
          100: '#f8e3c2',
          400: '#dba64a',
          500: '#c9822b',
          600: '#a76920',
        },
        // Critical states
        rust: {
          50: '#fbeceb',
          100: '#f3cac7',
          400: '#d3564c',
          500: '#b3261e',
          600: '#8f1e18',
        },
        ink: {
          50: '#f5f6f5',
          100: '#e7e9e6',
          400: '#6b7570',
          500: '#4c554f',
          600: '#333c36',
          700: '#232b26',
          800: '#1a201c',
          900: '#12160f',
        },
      },
      fontFamily: {
        sans: ['"IBM Plex Sans"', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        panel: '0 1px 2px rgba(18, 22, 15, 0.06), 0 1px 0 rgba(18, 22, 15, 0.04)',
      },
    },
  },
  plugins: [],
}
