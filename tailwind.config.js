/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#030303', // Pitch black main background
        surface: '#0c0c0e', // Very dark grey for cards/sidebar
        primary: '#00e5ff', // Cyan
        pink: '#ff1f5a', // Hot pink from the hero
        'primary-hover': '#00c3d9',
        text: '#ffffff',
        'text-muted': '#8a8a93', // Muted grey for subtitles
        border: '#1f1f23', // Subtle dark border
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
