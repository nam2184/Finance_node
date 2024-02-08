/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: [
    './src/components/**/*.{js,jsx,ts,tsx}', 
    './public/index.html',
    './src/**/*.{js,jsx,ts,tsx}'],
  content: [
    './src/components/**/*.{js,jsx,ts,tsx}', 
    './public/index.html',
    './src/**/*.{js,jsx,ts,tsx}'],
  darkMode: false,
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

