import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/pages/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      animation: {
        modalIn: "modalIn 0.3s ease-out forwards",
        modalOut: "modalOut 0.3s ease-in forwards",
      },
      keyframes: {
        modalIn: {
          "0%": { opacity: "0", transform: "scale(0.9)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        modalOut: {
          "0%": { opacity: "1", transform: "scale(1)" },
          "100%": { opacity: "0", transform: "scale(0.9)" },
        },
      },
      colors: {
        green: "#55894D",
        "green-dark": "#52824b",
        "green-more-dark": "#385533",
        black: "#1E1E1E",
        "soft-black": "#2e2e2e",
        "light-black": "#4e4e4e",
        "light-soft-black": "#6e6e6e",
        "soft-gray": "#9e9e9e",
        white: "gainsboro",
      },
      borderRadius: {
        "4xl": "2rem",
      },
      boxShadow: {
        "custom-dark": "0 6px 25px rgba(0, 0, 0, 0.6)",
        "custom-darker": "0 10px 15px rgba(0, 0, 0, 0.7)",
        "custom-darkest": "0 20px 25px rgba(0, 0, 0, 0.8)",
      },
    },
  },
  plugins: [],
};
export default config;
