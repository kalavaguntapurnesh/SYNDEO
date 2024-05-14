/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      container: {},
      colors: {
        companyColor: "#14",
        footer: "#001e00",
        inputColor: "#F8F8F8",
        footerLinks: "#a6aab6",
        scrollToTop: "#e7473c",
        trackColor: "#002147",
        // colorTwo: "#070346",
        colorThree: "#2a3b2c",
        // colorFour: "#108a00",
        colorFour: "#007ae1",
        colorFive: "#2a3b2c",
      },
    },
  },
  plugins: [],
};
