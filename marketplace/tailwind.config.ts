import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'purple-primary': '#8B5CF6',
        'purple-light': '#A78BFA',
        'purple-dark': '#7C3AED',
        'green-accent': '#4ADE80',
        'cyan-accent': '#22D3EE',
        'yellow-accent': '#FACC15',
        'dark-blue': '#111827',
        'dark-blue-light': '#1F2937',
        'dark-blue-lighter': '#374151',
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config; 