import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f2f7f4",
          100: "#dfece4",
          600: "#246b4a",
          700: "#19563a",
          800: "#16452f",
          900: "#123a29"
        }
      },
      boxShadow: { card: "0 1px 2px rgba(16, 24, 40, 0.04)" }
    }
  },
  plugins: []
};

export default config;
