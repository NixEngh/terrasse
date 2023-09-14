/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      gridTemplateRows: {
        24: "repeat(auto-fill, minmax(0, 1fr))",
      },
      colors: {
        profileRed: {
          primary: "#DB4437",
          secondary: "#FF5733",
        },
        profileGreen: {
          primary: "#0F9D58",
          secondary: "#7EFF8E",
        },
        profileBlue: {
          primary: "#4285F4",
          secondary: "#7EB0FF",
        },
        profileYellow: {
          primary: "#F4B400",
          secondary: "#F7FF7E",
        },
      },
    },
  },
  safelist: [
    "bg-profileRed-primary",
    "bg-profileRed-secondary",
    "bg-profileGreen-primary",
    "bg-profileGreen-secondary",
    "bg-profileBlue-primary",
    "bg-profileBlue-secondary",
    "bg-profileYellow-primary",
    "bg-profileYellow-secondary",
    "border-profileRed-primary",
    "border-profileRed-secondary",
    "border-profileGreen-primary",
    "border-profileGreen-secondary",
    "border-profileBlue-primary",
    "border-profileBlue-secondary",
    "border-profileYellow-primary",
    "border-profileYellow-secondary",
    "text-profileRed-primary",
    "text-profileRed-secondary",
    "text-profileGreen-primary",
    "text-profileGreen-secondary",
    "text-profileBlue-primary",
    "text-profileBlue-secondary",
    "text-profileYellow-primary",
    "text-profileYellow-secondary"
  ],
  plugins: [],
};
