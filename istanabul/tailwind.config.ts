import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        plum: { DEFAULT: "#2E2240", 2: "#3D2F55" },
        ink: "#5A4A66",
        cream: "#FFF7EE",
        card: "#FFFDF9",
        peach: "#FFE6D6",
        coral: { DEFAULT: "#E8653F", text: "#C24A28" },
        sun: "#FFC94A",
        mint: { DEFAULT: "#CDEFE0", deep: "#7BD3B4" },
        pink: "#FFB3A7",
        lilac: "#E4D9F7",
        live: "#D93A2F",
      },
      fontFamily: {
        display: ["var(--font-fredoka)", "ui-rounded", "system-ui", "sans-serif"],
        body: ["var(--font-nunito)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        block: "6px 6px 0 #2E2240",
        "block-sm": "4px 4px 0 #2E2240",
        "block-xs": "2px 2px 0 #2E2240",
        none: "0 0 0 #2E2240",
      },
      borderWidth: { 3: "3px" },
      keyframes: {
        "fade-up": {
          from: { opacity: "0", transform: "translateY(6px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in": {
          from: { transform: "translateX(100%)" },
          to: { transform: "translateX(0)" },
        },
        "slide-up": {
          from: { transform: "translateY(100%)" },
          to: { transform: "translateY(0)" },
        },
        "live-dot": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.35" },
        },
      },
      animation: {
        "fade-up": "fade-up 250ms ease-out both",
        "slide-in": "slide-in 250ms ease-out both",
        "slide-up": "slide-up 250ms ease-out both",
        "live-dot": "live-dot 1.6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
