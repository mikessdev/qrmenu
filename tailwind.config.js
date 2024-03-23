/** @type {import('tailwindcss').Config} */
/* eslint-disable */
// prettier-ignore
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        mobile: { min: '0px', max: '480px' },

        tablet: { min: '481px', max: '768px' },

        laptop: { min: '769px', max: '1024px' },

        desktop: { min: '1025px', max: '1200px' },

        tv: { min: '1201px' },
      },
      colors: {
        'qr-primary-orange': 'var(--qr-primary-orange)',
        'qr-light-gray': 'var(--qr-light-gray)',
        'qr-medium-gray': 'var(--qr-medium-gray)',
        'qr-dark-gray': 'var(--qr-dark-gray)',
        'qr-bit-light-gray': 'var(--qr-bit-light-gray)'
      },
      fontFamily: {
        notosans: ['Noto Sans'],

      }
    }
  },
  plugins: []
};
