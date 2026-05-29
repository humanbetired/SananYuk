import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        body: ["var(--font-poppins)", "sans-serif"],
        mono: ["var(--font-poppins)", "sans-serif"],
        display: ["var(--font-poppins)", "sans-serif"],
      },
      colors: {
        bg: {
          primary: "#F8F7F4",
          secondary: "#FFFFFF",
          card: "#FFFFFF",
          hover: "#F3F1ED",
          border: "#E8E4DC",
        },
        accent: {
          gold: "#B8860B",
          "gold-dim": "#D4A843",
          green: "#2D7A4F",
          red: "#C0392B",
          blue: "#2471A3",
          muted: "#9B9080",
        },
        text: {
          primary: "#2C2A26",
          secondary: "#6B6560",
          dim: "#B0A898",
        },
      },
      animation: {
        ticker: "ticker 50s linear infinite",
        "fade-in": "fadeIn 0.3s ease-out forwards",
        "slide-up": "slideUp 0.4s ease-out forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        ticker: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
