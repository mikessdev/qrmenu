/** @type {import('tailwindcss').Config} */
/* eslint-disable */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {},
      colors: {
        'qr-primary-orange': 'var(--qr-primary-orange)',
        'qr-light-gray': 'var(--qr-light-gray)',
        'qr-medium-gray': 'var(--qr-medium-gray)',
        'qr-dark-gray': 'var(--qr-dark-gray)'
      },
      fontFamily: {
        notosans: ['Noto Sans']
      }
    }
  },
  plugins: []
};
