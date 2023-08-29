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
        profileRed: "#DB4437",
        profileGreen: "#0F9D58",
        profileBlue: "#4285F4",
        profileYellow: "#F4B400",
      },
    },
  },
  safelist: [
    "bg-profileRed",
    "bg-profileGreen",
    "bg-profileBlue",
    "bg-profileYellow",
  ],  
  plugins: [],
};
