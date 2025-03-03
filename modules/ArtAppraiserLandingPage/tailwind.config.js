/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: 'rgb(37 99 235)',
        'primary-dark': 'rgb(29 78 216)',
        'white-high': 'rgba(255, 255, 255, 0.95)',
        'black-high': 'rgba(0, 0, 0, 0.9)'
      },
      backgroundColor: {
        'white-contrast': 'rgba(255, 255, 255, 0.25)',
        'dark-contrast': 'rgba(0, 0, 0, 0.75)'
      }
    },
  },
  plugins: [],
};