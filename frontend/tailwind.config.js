/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        darkBlue: "#443CC7",
        purple: "#6552FE",
        green: "#22E164",
        red: "#E83031",
        black: "#252525",
        darkGrey: "2D2D2D",
        lightGrey: "#5B5B5B",
        white: "#FFFFFF",
        primary: "#070707",
      },
    },
  },
  plugins: [],
};
