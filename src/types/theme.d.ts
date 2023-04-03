import 'styled-components';

declare module 'styled-components' {
  export type CSSMeasurementAuto = 'auto';
  export type CSSMeasurementUnit = 'em' | 'em' | 'px' | 'vw' | 'vh' | '%';

  export type CSSNumberMeasurementType =
    | `${number}${CSSMeasurementUnit}`
    | `${number}${CSSMeasurementUnit} ${number}${CSSMeasurementUnit} ${number}${CSSMeasurementUnit} ${number}${CSSMeasurementUnit}`
    | `${number}${CSSMeasurementUnit} ${CSSMeasurementAuto}`;

  export type ThemeColorsUnit = {
    primary: string;
    secondary: string;
  };

  export type ThemeLinkUnit = ThemeColorsUnit & {
    visited: string;
  };

  export type ThemeTableUnit = {
    heading: {
      background: ThemeColorsUnit;
      text: ThemeColorsUnit;
    };
    body: {
      background: ThemeColorsUnit;
      text: ThemeColorsUnit;
    };
  };

  export type ThemesType = 'dark' | 'light';
  export type TButtonDataTypes = {
    'data-drop-type'?: string;
  };

  export interface DefaultTheme {
    radius: {
      s: string;
      m: string;
      l: string;
      xl: string;
    };
    containerSizes: {
      s: string;
      m: string;
      l: string;
      default: string;
    };
    spacing: {
      unset: string;
      '6xs': string;
      '5xs': string;
      '4xs': string;
      '3xs': string;
      '2xs': string;
      xs: string;
      s: string;
      m: string;
      l: string;
      xl: string;
      '2xl': string;
      '3xl': string;
      '4xl': string;
      '5xl': string;
      '6xl': string;
      '7xl': string;
      '8xl': string;
    };
    colors: {
      gold: string;
      brightGold: string;
      white: string;
      gentleWhite: string;
      paleWhite: string;
      grey: string;
      darkGrey: string;
      lighterBlack: string;
      black: string;
      gentleBlack: string;
      blue: string;
      deepDarkBlue: string;
      darkBlue: string;
      green: string;
      brightGreen: string;
      red: string;
      paleGreen: string;
      brightBlue: string;
      paleBlue: string;
      yellow: string;
    };
    themeColors: {
      text: ThemeColorsUnit;
      background: ThemeColorsUnit;
      border: ThemeColorsUnit;
      link: ThemeLinkUnit;
      table: ThemeTableUnit;
    };
  }
}
