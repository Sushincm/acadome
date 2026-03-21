export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-navy": "#0f2747",
        "secondary-navy": "#1d3557",
        "accent-red": "#e63946",
        "light-bg": "#f5f7fa",
        "dark-text": "#2b2b2b",
      },
      fontFamily: {
        heading: ["Poppins", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
      boxShadow: {
        soft: "0px 8px 24px rgba(0, 0, 0, 0.06)",
      },
      spacing: {
        section: "80px",
      },
    },
  },
  plugins: [],
};
