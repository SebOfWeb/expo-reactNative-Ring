/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        'Capsmall': ['Capsmall', 'sans-serif'] // Assurez-vous que 'Capsmall' est correctement chargée dans votre projet
      }
    },
  },
  plugins: [],
}

