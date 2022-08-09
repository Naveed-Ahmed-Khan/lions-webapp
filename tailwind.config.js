/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    fontFamily: {
      archivo: ["Archivo", "sans-serif"],
      poppins: ["Poppins", "sans-serif"],
      roboto: ["Roboto", "sans-serif"],
      merri: ["Merriweather", "serif"],
    },
    extend: {
      colors: {
        primary: "#15803d",
        "primary-dark": "#166534",
        "primary-light": "#16a34a",
        "secondary-dark-bg": "#33373E",
        "light-gray": "#F7F7F7",
        "half-transparent": "rgba(0, 0, 0, 0.5)",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
