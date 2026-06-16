import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        sindh: {
          indigo: "#1A2A6C",      // Ajrak Blue (Wisdom & Spiritual Depth)
          terracotta: "#B22222",  // Ancient Pottery & Mohenjo-daro Bricks
          clay: "#A38A73",        // Indus Valley Earth Mud (Pantone 2026 Base)
          sand: "#F5F2EB",        // Warm Exhibition Gallery Backdrop
        },
      },
    },
  },
  plugins: [],
};
export default config;