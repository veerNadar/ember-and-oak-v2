import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Ember & Oak brand palette
        ember: {
          DEFAULT: "#C8692A",
          light: "#D9854A",
          dark: "#A8521A",
        },
        oak: {
          DEFAULT: "#3D2314",
          light: "#5C3520",
          dark: "#261509",
        },
        cream: {
          DEFAULT: "#F5F0E8",
          light: "#FAF8F4",
          dark: "#E8E0CC",
        },
        charcoal: {
          DEFAULT: "#1A1A1A",
          light: "#2E2E2E",
          dark: "#0D0D0D",
        },
        ash: {
          DEFAULT: "#4A4A4A",
          light: "#6B6B6B",
          dark: "#333333",
        },
      },
      fontFamily: {
        playfair: ["Playfair Display", "Georgia", "serif"],
        inter: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
