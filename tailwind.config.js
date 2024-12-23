/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./projects/website/src/app/components/**/*.{html,js,jsx,ts,tsx}",
    "./projects/website/src/app/pages/**/*.{html,js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("tailwindcss-primeui")],
};
