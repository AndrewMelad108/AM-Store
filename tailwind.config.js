/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  content: [],
  theme: {
    extend: {
      gridTemplateColumns: {
        "2-auto": "repeat(2, auto)",
        "3-auto": "repeat(3, minmax(0, auto))",
      },
      backgroundImage: {
        "intro-page-image": "url('assets/images/banner.jpg')",
        "product-page-image": "url('assets/images/product_bg.jpg')",
        "fashion-page-image": "url('assets/images/fashion.jpg')",
        "error-page": "url('assets/images/error.png')",
      },
      colors: {
        "black-color": "rgba(2,2,2,0.4)",
        "head-color": "#ecf3fc",
        "blue-color": "#183661",
        "product-bg-cover": "#f2f2f2",
      },

      animation: {
        "up-down": "bounce 1s ease-in-out ",
      },
    },
  },
  plugins: [],
};
