const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ["./src/**/*.{js,jsx,ts,tsx,html,css}"],
  plugins: [
    require('daisyui'),
  ],
  theme: {
    extend: {
      fontFamily: {
        libre: ['"Poppins"', ...defaultTheme.fontFamily.sans],
      },
    },
    fontFamily: {
      sans: ['"Poppins"']
    }
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#075985",
          "secondary": "#f6d860",
          "accent": "#37cdbe",
          "neutral": "#000000",
          "base-100": "#ffffff",
          "--rounded-box": "1rem",
          "--rounded-btn": "0.5rem",
          "--rounded-badge": "1.9rem",
          "--animation-btn": "0.25s",
          "--animation-input": "0.2s",
          "--btn-focus-scale": "0.95",
          "--border-btn": "1px",
          "--tab-border": "1px",
          "--tab-radius": "0.5rem",
        },
      },
    ],
  },
};
