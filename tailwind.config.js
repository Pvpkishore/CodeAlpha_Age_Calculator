/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  /* Add to your Tailwind config */
theme: {
  extend: {
    animation: {
      'float': 'float 6s ease-in-out infinite',
      'float-delayed': 'float 6s ease-in-out -2s infinite',
      'glow': 'glow 2s ease-in-out infinite alternate',
    },
    keyframes: {
      float: {
        '0%, 100%': { transform: 'translateY(0)' },
        '50%': { transform: 'translateY(-20px)' },
      },
      glow: {
        '0%': { filter: 'drop-shadow(0 0 5px #ec4899)' },
        '100%': { filter: 'drop-shadow(0 0 20px #ec4899)' },
      }
    }
  }
},
  plugins: [],
}