/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        mobile: {
          max: '576px',
        },
        laptop: {
          max: '976px',
        },
        desktop: {
          max: '1280px',
        },
      },
      colors: {
        overlay: '#3a3a3ab3',
        'dark-grey': '#333030',
        monokai: '#272822',
        'alpha-black': '#333333a1',
        'black-aqua': '#091921',
        'aqua-active': '#133d52',
        'black-aqua_op': '#091921d5',
        'black-aqua_hard_op': '#09192171',
        'popup-overlay': '#946666de',
        pink: '#ff105e',
        red: '#c50040',
        'pale-green': '#67b04b',
        'pale-bright-green': '#71c74f',
        'bright-green': '#55d725',
        'bright-blue': '#42c5e4',
        blue: '#4343ff',
        'blue-second': '#2727fe',
        'pale-bright-blue': '#98A7F5',
        'pale-blue': '#69abad',
        yellow: ' #e0fd4d',
        'glowing-yellow': '#d8ff13',
        orange: '#ff6800',
        gray: '#cccccc',
        'deep-gray': '#858585',
        'hover-blue': '#102936',
        'disabled-grey': '#ffffff49',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontSize: {
        sm: ['14px', '20px'],
        base: ['16px', '24px'],
        lg: ['20px', '28px'],
        xl: ['24px', '32px'],
      },
      boxShadow: {
        max: '0 0 15px #42c5e4',
      },
    },
  },
  plugins: [],
};
