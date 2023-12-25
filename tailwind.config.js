/** @type {import('tailwindcss').Config} */
/* eslint-disable */
// prettier-ignore
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        sm: '640px',

        md: { min: '0px', max: '689px' },

        lg: { min: '690px', max: '850px' },

        xl: { min: '851px' },

        '2xl': '1536px'
      },
      colors: {
        'qr-primary-orange': 'var(--qr-primary-orange)',
        'qr-light-gray': 'var(--qr-light-gray)',
        'qr-medium-gray': 'var(--qr-medium-gray)',
        'qr-dark-gray': 'var(--qr-dark-gray)',
        'qr-bit-light-gray': 'var(--qr-bit-light-gray)'
      },
      fontFamily: {
        notosans: ['Noto Sans']
      }
    }
  },
  plugins: []
};
