/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "Segoe UI", "Arial", "sans-serif"]
      },
      colors: {
        ink: "#172033",
        mist: "#eef4f8",
        teal: "#0f766e",
        cobalt: "#2454d6",
        amber: "#d97706"
      },
      boxShadow: {
        panel: "0 20px 60px rgba(23, 32, 51, 0.10)"
      }
    }
  },
  plugins: []
};
