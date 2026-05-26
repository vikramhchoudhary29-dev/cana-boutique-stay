import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)"],
        serif: ["var(--font-serif)"]
      },
      colors: {
        sand: "#F7EFE5",
        ink: "#111827",
        gold: "#C99A45",
        palm: "#0F5132"
      }
    }
  },
  plugins: []
};

export default config;
