/** @type {import('tailwindcss').Config} */
import type { Config } from "tailwindcss";
const { nextui } = require("@nextui-org/react");
const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    fontFamily: {
      NotoSansThai: ["Noto Sans Thai"],
    },
    fontSize: {
      xxs: "0.5rem",
      xs: "0.7rem",
      sm: "0.8rem",
      base: "1rem",
      xl: "1.25rem",
      "2xl": "1.563rem",
      "3xl": "1.953rem",
      "4xl": "2.441rem",
      "5xl": "3.052rem",
    },
  },
  plugins: [
  
    nextui({
      themes: {
        light: {
          colors: {
            secondary: {
              DEFAULT: "#8e0369",
              foreground: "#ffffff",
            },
            focus: "#BEF264",
          },
        },
      },
    }),
  ],
};

export default config;
