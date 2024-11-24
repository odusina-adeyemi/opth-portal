/** @type {import('tailwindcss').Config} */
export const content = [
  './app/**/*.{js,ts,jsx,tsx,mdx}',
  './pages/**/*.{js,ts,jsx,tsx,mdx}',
  './components/**/*.{js,ts,jsx,tsx,mdx}',

  // Or if using `src` directory:
  './src/**/*.{js,ts,jsx,tsx,mdx}',
];
export const theme = {
  extend: {
    colors: {
      primary: {
        light: '#7EC2D5', // A lighter shade of #4BA7C1
        default: '#4BA7C1', // Main color
        dark: '#357A8A', // A darker shade of #4BA7C1
      },
      secondary: {
        light: '#FFD5D2', // Light coral
        DEFAULT: '#FC8173', // Coral for contrast
        dark: '#C45346', // Dark coral
      },
      accent: {
        light: '#F9E79F', // Light gold
        DEFAULT: '#F4D03F', // Gold accent
        dark: '#B7950B', // Dark gold
      },
      neutral: {
        light: '#F7FAFC', // Light neutral
        DEFAULT: '#E2E8F0', // Neutral gray
        dark: '#2D3748', // Dark neutral
      },
    },
  },
  plugins: [],
};
