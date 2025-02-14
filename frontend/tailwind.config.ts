/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2563EB", // Azul Tailwind
        secondary: "#D1D5DB", // Cinza claro
        white: "#FFFFFF", // Branco
        accent: "#16A34A", // Verde personalizado
        background: "#111827", // Fundo escuro
      },
      boxShadow: {
        xl: "0 10px 20px rgba(0, 0, 0, 0.2)",
      },
      borderRadius: {
        xl: "1rem",
      },
    },
  },
  plugins: [],
};