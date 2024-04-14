/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ["./src/**/*.{js,jsx,ts,tsx,html,css}"],
  theme: {
    extend: {
      fontFamily: {
        'montserrat': ['Montserrat'], 'archivo-black': ['Archivo Black']
      },
    },
  },
  plugins: [],
}