import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],

  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        outfit: ["Outfit", "comic-sans"],
        lato: ["Lato", "comic-sans"],
      },
      colors: {
        tangaroa: "var(--tangaroa)",
        "saphire-blue": "var(--saphire-blue)",
        "keppel-green": "var(--keppel-green)",
        "lavender-white": "var(--lavender-white)",
        "light-font-color": "var(--light-font-color)",
        "dark-font-color": "var(--dark-font-color)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
