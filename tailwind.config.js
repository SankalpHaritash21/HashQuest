/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        tron: {
          accent: "#00ff9d",
          glow: "#00ff9d",
          text: "#00ff9d",
          dark: "#001a0f",
          grid: "rgba(0, 255, 157, 0.1)",
        },
      },
      fontFamily: {
        mono: ["Share Tech Mono", "monospace"],
      },
      animation: {
        "pulse-glow": "pulse-glow 2s infinite",
        "grid-flow": "grid-flow 20s linear infinite",
      },
      keyframes: {
        "pulse-glow": {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0.5 },
        },
        "grid-flow": {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(50px)" },
        },
      },
    },
  },
  plugins: [],
};
