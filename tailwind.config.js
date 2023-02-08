/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        theme: {
          DEFAULT: "#F84342",
          50: "#FFF3F3",
          100: "#FEE0DF",
          200: "#FCB8B8",
          300: "#FB9191",
          400: "#F96A69",
          500: "#F84342",
          600: "#F60D0C",
          700: "#C30807",
          800: "#8C0605",
          900: "#560403",
        },
      },
    },
  },
};
