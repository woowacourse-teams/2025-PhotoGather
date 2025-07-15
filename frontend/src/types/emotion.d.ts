// emotion.d.ts
import '@emotion/react';

declare module '@emotion/react' {
  export interface Theme {
    colors: {
      white: string;
      grayBackground: string;
      gray01: string;
      gray02: string;
      gray03: string;
      gray04: string;
      gray05: string;
      gray06: string;
      primary: string;
      primary10: string;
      primary20: string;
      primary60: string;
      primary80: string;
      accent: string;
      lightAccent: string;
      darkAccent: string;
    };
    typography: {
      header01: TypographyStyle;
      header02: TypographyStyle;
      header03: TypographyStyle;
      bodyLarge: TypographyStyle;
      bodyRegular: TypographyStyle;
      captionSmall: TypographyStyle;
      buttonPrimary: TypographyStyle;
      buttonSecondary: TypographyStyle;
      buttonTertiary: TypographyStyle;
    };
  }

  interface TypographyStyle {
    fontWeight: string | number;
    fontSize: string;
    lineHeight: string;
  }
}
