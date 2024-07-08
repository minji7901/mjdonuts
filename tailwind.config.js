/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          100: '#FEC3C7',
          200: '#FC939A'
        },
        'secondary': '#56E0FA',
        'main': '#FFF7F9',
        'default': '#577075',
      },
  },
},
  plugins: [],
};