module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#3d0514",
        secondary: "#ff80ab",

        // BORDEAU
        "main-bordeau": "#3d0514",
        "brand-100": "#D8CDD0",
        "brand-200": "#B19BA1",
        "brand-300": "#8B6972",
        "brand-400": "#643743",
        "brand-500": "#3D0514", // main bordeau
        "brand-600": "#310410",

        // PINK
        "main-pink": "#ff80ab",
        "secondary-200": "#FFCCDD",
        "secondary-300": "#FFB3CD",
        "secondary-400": "#FF99BC",
        "secondary-500": "#FF80AB", // main pink
        "secondary-600": "#CC6689",

        // BEIGE
        "main-beige": "#fff8c0",
        "tertiary-100": "#FFFAF2",
        "tertiary-200": "#FFF6E6",
        "tertiary-400": "#FFEDCD",
        "tertiary-500": "#FFE8C0", // main beige
        "tertiary-600": "#CCBA9A",
        "tertiary-700": "#998B73",
        "tertiary-800": "#665D4D",

        // GREEN
        "main-green": "#218a0a",
        "cta-200": "#A6D09D",
        "cta-300": "#7AB96C",
        "cta-400": "#4DA13B",
        "cta-500": "#218A0A", // main green

        // NEUTRALS
        "neutrals-100": "#F4F4F4",

        "grey-200": "#DADADA",
      },
      fontFamily: {
        'body': ['Dongle', 'sans-serif'],
        'heading': ['Dongle', 'sans-serif'],
      }
    },
  },
  plugins: [],
}