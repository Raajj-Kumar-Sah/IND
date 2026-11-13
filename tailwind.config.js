/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#10100f",
        gold: "#c7a66a",
        cream: "#f4f0e8",
        muted: "#9b978e"
      },
      fontFamily: {
        display: ["Georgia", "serif"],
        sans: ["Inter", "Arial", "sans-serif"]
      }
    }
  },
  plugins: []
};
