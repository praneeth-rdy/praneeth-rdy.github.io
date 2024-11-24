/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    `./src/pages/**/*.{js,jsx,ts,tsx}`,
    `./src/components/**/*.{js,jsx,ts,tsx}`,
  ],
  theme: {
    extend: {
      colors: {
        success: '#28C76F',
        error: "#EA5455",
        yellow: "#FFD600",
        orange: "#FF9F43",
        violet: "#584CDB", 
        teal: "#00BBB7",
        secondary: {
          DEFAULT: "#0065C1",
          light: "#E0F0FB",
          muted: "#99C1E6",
          500: "#0185E4",
        },
        typography: {
          DEFAULT: "#EBE9F1",
          heading: "#5E5873",
          body: "#6E6B7B",
          muted: "#B9B9C3",
          50: "#E6E7E7",
          200: "#B4B7B8",
          300: "#9C9FA1",
          500: "#6A7071",
          600: "#515759",
          700: "#394042",
        },
      },
    },
  },
  plugins: [], // [require('tailwindcss-animate')],
  future: {
    hoverOnlyWhenSupported: true,
  },
}
