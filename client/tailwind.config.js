/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        btnDark: '#8447FF', //purple
        btnLight: '#2EC0F9', //blue
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

