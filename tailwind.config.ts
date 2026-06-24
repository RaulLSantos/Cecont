import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: "#286ccd",
          gold: "#f2b44c",
          navy: "#0e2a4f",
          ink: "#12233d",
          mist: "#f4f7fb"
        },
        ds: {
          gold: "#B1966B",
          yellow: "#FFDD21",
          blueLight: "#6A8C95",
          blueDark: "#00252E",
          cream: "#F5F4F0",
          dark: "#0A0A0A",
          card: "#171717",
          surface: "#262626",
          muted: "#A3A3A3"
        }
      },
      boxShadow: {
        soft: "0 18px 55px rgba(14, 42, 79, 0.12)",
        card: "0 14px 35px rgba(18, 35, 61, 0.09)",
        glow: "0 0 30px rgba(255, 221, 33, 0.28)",
        gold: "0 0 30px rgba(177, 150, 107, 0.28)"
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif"
        ],
        heading: ["Poppins", "Inter", "sans-serif"],
        accent: ["Merriweather", "serif"]
      }
    }
  },
  plugins: []
} satisfies Config;
