/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FF6B00',
          light: '#FF8533',
          dark: '#CC5500'
        },
        secondary: {
          DEFAULT: '#1A1A1A',
          light: '#2A2A2A',
          dark: '#000000'
        },
        accent: {
          DEFAULT: '#FFD700',
          light: '#FFEB3B',
          dark: '#FFC107'
        }
      },
      height: {
        'header': '80px'
      },
      fontFamily: {
        'sans': ['Roboto', 'Arial', 'sans-serif'],
      },
      boxShadow: {
        'glow': '0 0 10px rgba(255, 107, 0, 0.5)',
      },
    }
  },
  plugins: [],
}