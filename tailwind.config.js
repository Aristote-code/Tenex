/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1C1C1E",
        accent: "#FF2E2E",
        glow: "#8B0000",
        background: "#F7F7F8",
        slate: "#6B7280",
        dark: "#5D0000",
        surface: "#E5E7EB",
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Satoshi', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      }
    },
  },
  plugins: [],
}
