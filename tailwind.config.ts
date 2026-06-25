import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // Legacy tokens — updated to dark navy for site-wide consistency
        ink: "#F0F6FA",
        muted: "#8BA5B4",
        line: "#1E3444",
        canvas: "#060E14",
        brand: {
          DEFAULT: "#00C4CC",
          dark: "#00A8AF",
          gold: "#F59E0B"
        },
        // New Premium Design System
        navy: {
          950: "#020D14",
          900: "#060E14",
          800: "#0A1825",
          700: "#0E1E27",
          600: "#142435",
          500: "#1A2E42",
          400: "#1E3444",
          300: "#2C4A5E",
          200: "#3A6278",
          100: "#8BA5B4",
        },
        teal: {
          DEFAULT: "#00C4CC",
          50: "#E0FAFB",
          100: "#B3F4F6",
          200: "#70EAEE",
          300: "#2DDEE4",
          400: "#00D4DB",
          500: "#00C4CC",
          600: "#00A8AF",
          700: "#008A91",
          800: "#006D72",
          900: "#005054",
          glow: "#00E5EE",
        },
        amber: {
          DEFAULT: "#F59E0B",
          50: "#FFFBEB",
          100: "#FEF3C7",
          200: "#FDE68A",
          300: "#FCD34D",
          400: "#FBBF24",
          500: "#F59E0B",
          600: "#D97706",
          700: "#B45309",
          800: "#92400E",
          900: "#78350F",
        },
      },
      fontFamily: {
        display: ["var(--font-jakarta)", "ui-sans-serif", "system-ui", "sans-serif"],
        body: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        // Legacy
        soft: "0 12px 30px rgba(23, 33, 27, 0.08)",
        // New system
        "teal-glow": "0 0 20px rgba(0, 196, 204, 0.25), 0 0 40px rgba(0, 196, 204, 0.1)",
        "teal-glow-lg": "0 0 40px rgba(0, 196, 204, 0.35), 0 0 80px rgba(0, 196, 204, 0.15)",
        "amber-glow": "0 0 20px rgba(245, 158, 11, 0.25), 0 0 40px rgba(245, 158, 11, 0.1)",
        "card": "0 1px 3px rgba(0,0,0,0.4), 0 4px 16px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.06)",
        "card-hover": "0 4px 12px rgba(0,0,0,0.5), 0 16px 48px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)",
        "glass": "0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.08)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-mesh": "radial-gradient(ellipse 80% 60% at 50% -20%, rgba(0,196,204,0.12) 0%, transparent 70%), radial-gradient(ellipse 50% 40% at 80% 50%, rgba(245,158,11,0.06) 0%, transparent 60%)",
        "teal-gradient": "linear-gradient(135deg, #00C4CC 0%, #0099A8 100%)",
        "navy-gradient": "linear-gradient(180deg, #060E14 0%, #0A1825 100%)",
        "hero-gradient": "linear-gradient(135deg, rgba(2,13,20,0.98) 0%, rgba(10,24,37,0.95) 60%, rgba(0,196,204,0.06) 100%)",
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "rise": "rise-in 700ms ease both",
        "rise-delay-1": "rise-in 700ms 100ms ease both",
        "rise-delay-2": "rise-in 700ms 200ms ease both",
        "rise-delay-3": "rise-in 700ms 300ms ease both",
        "float": "float 6s ease-in-out infinite",
        "glow": "glow-pulse 2s ease-in-out infinite",
        "shimmer": "shimmer 2s linear infinite",
        "logo-pulse": "logo-pulse 1.8s ease-in-out infinite",
        "loading-bar": "loading-bar 1.4s ease-in-out infinite",
      },
    }
  },
  plugins: []
};

export default config;

