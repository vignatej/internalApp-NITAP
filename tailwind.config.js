/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        background:'#0F172A',
        txtCol:'#CBD5E1',
        cardCol:'#1E293B',
        thirdCol:'#334155',
        forthCol:'#92A1B6',
        fifthCol:'#C7D1DD',
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}
