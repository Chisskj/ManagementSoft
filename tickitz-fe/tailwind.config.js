/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        tickitz: {
          bgDetail: "#F5F6F8",
          greyBorder: "#DEDEDE",
          detail: "#8692A6",
          primary: "#3D405B",
          secondary: "#F4F1DE",
          warning: "#F2CC8F",
          error: "#E07A5F",
          success: "#81B29A",
          darkTitle: "#14142B",
          label: "#6E7191",
          basic: "#4E4B66",
        },
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["corporate"],
  },
};
