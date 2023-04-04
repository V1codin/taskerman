import { DefaultTheme } from 'styled-components';

export const defaultTheme = {
  radius: {
    s: '3px',
    m: '5px',
    l: '7px',
    xl: '10px',
  },
  containerSizes: {
    s: '20vw',
    m: '50vw',
    l: '95vw',
    default: '330px',
  },
  spacing: {
    unset: 'unset',
    '6xs': '2px',
    '5xs': '4px',
    '4xs': '8px',
    '3xs': '12px',
    '2xs': '16px',
    xs: '20px',
    s: '24px',
    m: '32px',
    l: '40px',
    xl: '48px',
    '2xl': '64px',
    '3xl': '80px',
    '4xl': '100px',
    '5xl': '120px',
    '6xl': '140px',
    '7xl': '160px',
    '8xl': '180px',
  },
};

const defaultColors = {
  gold: '#BEA77E',
  brightGold: '#ffe4b4',
  white: '#FFFFF4',
  gentleWhite: '#f1f1f1',
  paleWhite: '#e8e8e8',
  grey: '#8E8E8E',
  darkGrey: '#333030',
  lighterBlack: '#1D1C1A',
  black: '#151515',
  gentleBlack: '#272822',
  blue: '#98A7F5',
  darkBlue: '#6880fb',
  deepDarkBlue: '#091921',
  green: '#7fc67f',
  brightGreen: '#55d725',
  red: '#ff105e',
  paleGreen: '#67b04b',
  brightBlue: '#42c5e4',
  paleBlue: '#69abad',
  yellow: '#e0fd4d',
};

export const darkTheme: DefaultTheme = {
  ...defaultTheme,
  colors: {
    ...defaultColors,
  },
  themeColors: {
    table: {
      heading: {
        text: {
          primary: '#ffe4b4',
          secondary: '#FFFFF4',
        },
        background: {
          primary: '#333030',
          secondary: '#151515',
        },
      },
      body: {
        background: {
          primary: '#333030',
          secondary: '#BEA77E',
        },
        text: {
          primary: '#f0f0da',
          secondary: '#e8e8e8',
        },
      },
    },
    link: {
      visited: '#6880fb',
      primary: '#FFFFF4',
      secondary: '#BEA77E',
    },
    text: {
      primary: '#FFFFF4',
      secondary: '#BEA77E',
    },
    background: {
      primary: '#1D1C1A',
      secondary: '#151515',
    },
    border: {
      primary: '#BEA77E',
      secondary: '#333030',
    },
  },
};

export const lightTheme: DefaultTheme = {
  ...defaultTheme,
  colors: {
    ...defaultColors,
  },
  themeColors: {
    table: {
      heading: {
        text: {
          primary: '#2181b1',
          secondary: '#333030',
        },
        background: {
          primary: '#ffe4b4',
          secondary: '#FFFFF4',
        },
      },
      body: {
        background: {
          primary: '#98A7F5',
          secondary: '#e8e8e8',
        },
        text: {
          primary: '#333030',
          secondary: '#BEA77E',
        },
      },
    },
    link: {
      visited: '#98A7F5',
      primary: '#151515',
      secondary: '#091921',
    },
    text: {
      primary: '#151515',
      secondary: '#091921',
    },
    background: {
      primary: '#f0f0da',
      secondary: '#e8e8e8',
    },
    border: {
      primary: '#333030',
      secondary: '#BEA77E',
    },
  },
};

export const themes = {
  dark: darkTheme,
  light: lightTheme,
};
