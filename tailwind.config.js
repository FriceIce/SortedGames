/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        skeletonColor: "#3d3f44",
        midnightBlue: "#101720",
        themePurple: "#7c61ec",
      },

      screens: {
        xs: { max: "524px" },
      },
    },
  },
  plugins: [],
};
