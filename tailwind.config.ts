import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#17211b",
        muted: "#647067",
        line: "#dce2dc",
        canvas: "#f7f8f5",
        brand: {
          DEFAULT: "#116149",
          dark: "#0b4333",
          gold: "#c9822a"
        }
      },
      boxShadow: {
        soft: "0 12px 30px rgba(23, 33, 27, 0.08)"
      }
    }
  },
  plugins: []
};

export default config;
