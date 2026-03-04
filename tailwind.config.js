/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0D0D12",
        accent: "#C9A84C",
        background: "#FAF8F5",
        slate: "#2A2A35",
        dark: "#0a0a0d",
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        drama: ['Playfair Display', 'serif'],
        data: ['JetBrains Mono', 'monospace'],
      }
    },
  },
  plugins: [],
}

