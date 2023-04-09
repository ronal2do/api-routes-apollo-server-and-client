/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    // Or if using `src` directory:
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      animation: {
        "fade-in": "fade-in 0.5s linear forwards",
        marquee: "marquee var(--marquee-duration) linear infinite",
        "spin-slow": "spin 4s linear infinite",
        "spin-slower": "spin 6s linear infinite",
        "spin-reverse": "spin-reverse 1s linear infinite",
        "spin-reverse-slow": "spin-reverse 4s linear infinite",
        "spin-reverse-slower": "spin-reverse 6s linear infinite",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      colors: {
        "bay-leaf": {
          50: "#f3faf3",
          100: "#e2f6e5",
          200: "#c7ebcc",
          300: "#84d28f",
          400: "#67c174",
          500: "#42a550",
          600: "#32873e",
          700: "#2a6b34",
          800: "#26552e",
          900: "#204727",
          950: "#0d2611",
        },
        "aqua-haze": {
          50: "#f7faf9", //
          100: "#dcebe6",
          200: "#b9d6cd",
          300: "#8fb9ae",
          400: "#679a8e",
          500: "#4d7f74",
          600: "#3c655d",
          700: "#33524d",
          800: "#2c4340",
          900: "#283936",
          950: "#13201f",
        },
        paradiso: {
          50: "#f0fbfa",
          100: "#d8f3f5",
          200: "#b6e8eb",
          300: "#83d6dd",
          400: "#4abcc6",
          500: "#2ea0ac",
          600: "#298291",
          700: "#266673", //
          800: "#285762",
          900: "#254954",
          950: "#143038",
        },
        "faded-jade": {
          50: "#f4f9f9",
          100: "#daedec",
          200: "#b5dad9",
          300: "#88bfc0",
          400: "#5fa0a2",
          500: "#438184", //
          600: "#35686c",
          700: "#2e5457",
          800: "#284447",
          900: "#25393c",
          950: "#111f22",
        },
        blumine: {
          50: "#eefdfd",
          100: "#d3f9fa",
          200: "#adf2f4",
          300: "#75e6eb",
          400: "#35d2db",
          500: "#1ab5c0",
          600: "#1892a2",
          700: "#1a7584",
          800: "#1d5c68", //
          900: "#1d505c",
          950: "#0e353e",
        },
        "vivid-tangerine": {
          50: "#fff3ed",
          100: "#ffe3d4",
          200: "#ffc4a9",
          300: "#ff9d75", //
          400: "#fe6639",
          500: "#fc3e13",
          600: "#ed2509",
          700: "#c51609",
          800: "#9c1410",
          900: "#7e1410",
          950: "#440606",
        },
      },
      fontFamily: {
        sans: ["Montserrat", ...defaultTheme.fontFamily.sans],
      },
      keyframes: {
        "fade-in": {
          from: {
            opacity: 0,
          },
          to: {
            opacity: 1,
          },
        },
        marquee: {
          "100%": {
            transform: "translateY(-50%)",
          },
        },
        "spin-reverse": {
          to: {
            transform: "rotate(-360deg)",
          },
        },
      },
      maxWidth: {
        "2xl": "40rem",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
