/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Dark mode colors
        textDark: '#FBF5F3',
        borderDark: '#403D39',
        // Light mode colors
        textLight: '#000000',
        borderLight: '#ffffff',
      },
      backgroundColor: {
        light: '#FBF5F3',
        dark: '#2B2C28',
      },
      btnBackgroundColor: {
        light: '#8447FF',
        dark: '#2EC0F9',
      },
      textColor: {
        light: '#000000',
        dark: '#FBF5F3',
      },
      fontFamily: {
        'montserrat': ['Montserrat'],
        'lato': ['Lato'],
        'garamond': ['Garamond']
      }
    },
  },
  plugins: [],
}

