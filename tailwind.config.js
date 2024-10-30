/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        cinzel: "'Cinzel Decorative', serif",
        poppin: "'Poppins', serif",
      },
      keyframes: {
        slideIn: {
          '0%': { opacity: '0', transform: 'translateX(100%)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
      animation: {
        slideIn: 'slideIn 1s ease-in-out forwards',
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: ["light", "luxury"],
  },
}
