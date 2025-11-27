/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        academic: {
          primary: '#A8DADC',
          secondary: '#457B9D',
        },
        service: {
          primary: '#C7E8CA',
          secondary: '#2A9D8F',
        },
        leisure: {
          primary: '#FADECB',
          secondary: '#E76F51',
        },
      },
    },
  },
  plugins: [],
}