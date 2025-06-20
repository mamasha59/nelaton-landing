import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        glow: "glow .5s infinite alternate",
      },
      keyframes: {
        glow: {
          "0%": { boxShadow: "0 0 5px rgba(255, 255, 0, 0.5)" },
          "100%": { boxShadow: "0 0 15px rgba(255, 255, 0, 1)" },
        },
      },
      colors: {
        linkBlur: '#6B7279',
        black: '#292D32',
        blue: '#0073A6',
        greenBg: '#EDFBF2',
        blueBg: '#EBF7FF',
        yellowBg: '#FFF7E1',
        yellow: '#FFCF49',
        mainBlue: '#4E8EEF',
      },
      backgroundImage:{
        'header-background': "url('/images/backgroundHeader.webp')",
        'privacy-background': "url('/images/privacyBackground.webp')",
        'termOfUse-background': "url('/images/termsBackground.webp')",
      },
    },
  },
  plugins: [],
} satisfies Config;
