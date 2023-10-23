/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    fontFamily: {
      Poppins: "Poopins",
    },
    colors: {
      background: "#50728E",
      primary: "#fff6cc",
      secondary: "#fff6cc",
      button: "#000814",
      buttonText: "#fff6cc",
      input: "#fff6cc",
      text: "#fff6cc",
      pilltext: "#fff6cc",
      darkGreen:'#55a630',
      darkRed:'#bc4749'
    },
    animation: {
      top: "animate-top .4s linear",
    },
    keyframes: {
      "animate-top": {
        from: { opacity: 0, bottom: "30%", transform: "translateY(-1.25em)" },
        to: { opacity: 1, bottom: 0, transform: "translateY(0)" },
      },
    },
  },
  plugins: [],
};
