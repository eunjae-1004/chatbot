import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#F8F5EA",
          100: "#F1ECDD",
          200: "#E7DFC7",
          500: "#C8A96B",
          700: "#8E6F3E",
        },
        neutral: {
          0: "#FFFFFF",
          50: "#F9F9F7",
          100: "#EFEDE7",
          700: "#4D4A43",
          900: "#111111",
        },
        accent: {
          sage: "#DDE8C8",
          butter: "#F6E08E",
          peach: "#F2D5BF",
          mist: "#E9F0E6",
        },
        danger: {
          soft: "#FCE8E6",
        },
      },
      boxShadow: {
        soft: "0 8px 24px rgba(17, 17, 17, 0.06)",
      },
      fontFamily: {
        sans: [
          "var(--font-pretendard)",
          "Pretendard",
          "Inter",
          "system-ui",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
};

export default config;
