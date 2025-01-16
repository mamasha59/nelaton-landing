import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        linkBlur: '#6B7279',
        black: '#292D32',
        blue: '#00B3D6',
        greenBg: '#EDFBF2',
        blueBg: '#EBF7FF',
        yellowBg: '#FFF7E1',
        yellow: '#FFCF49',
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
