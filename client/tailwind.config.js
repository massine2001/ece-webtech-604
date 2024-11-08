/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brown: {
          400: '#A0522D',
          500: '#8B4513',
        }
      },
      animation: {
        'fade-in-down': 'fade-in-down 0.5s ease-out',
        'slide-in-from-left': 'slide-in-from-left 0.5s ease-out',
        'slide-in-from-right': 'slide-in-from-right 0.5s ease-out',
      },
      keyframes: {
        'fade-in-down': {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-in-from-left': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        'slide-in-from-right': {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
    },
  },
  variants: {},
  plugins: [
    require('tailwindcss-font-inter'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
}