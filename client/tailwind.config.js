const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
  theme: {
    extend: {
      boxShadow: {
        "custom-shadow": "10px 10px 20px 0px rgba(0, 0, 0, 0.5)",
      },
    },
  },
  plugins: [flowbite.plugin(), require("tailwind-scrollbar")],
};
