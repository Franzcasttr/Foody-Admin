/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      dropShadow: {
        '4xl': [
          '-4px -4px 8px #ffffff',
          '4px 4px 8px rgba(120, 120, 120, 0.1)',
        ],
        '5xl': [
          '-6px -6px 8px #FFFFFF',
          '6px 6px 8px rgba(216, 224, 233, 0.6)',
        ],
        '6xl': ['0px 4px 40px rgba(90, 176, 224, 0.15)'],
      },
    },
  },
  plugins: [],
};
