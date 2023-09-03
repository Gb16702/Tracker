/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        vprimary: "#FF4655",
        vsecondary: "#603AD9",
        vtertiary: "#FF4655",
        adminText: "#020302",
        adminBg: "#f3f7f4",
        adminBgAlt: "#1d1d20",
        adminMainBtn: "#2f2a3c",
        adminAltBtn: "#ffffff",
        adminThirdBtn: "#303940",
        adminFourthBtn: "#3a4b5f",
        adminAccent: "#3c2f2a",
        customWhite: "#F1F5F9",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
