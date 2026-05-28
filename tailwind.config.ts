import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      colors: {
        ink: "#183034",
        pearl: "#f7faf9",
        mint: "#dff3ef",
        teal: "#157f7a",
        copper: "#b46b43",
        coral: "#df6f61",
      },
      boxShadow: {
        soft: "0 18px 55px rgba(24, 48, 52, 0.14)",
      },
    },
  },
  plugins: [],
} satisfies Config;
