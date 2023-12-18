import { createTheme, TypographyVariantsOptions } from '@mui/material';
import { ThemeOptions } from '@mui/material/styles';
import { TypographyStyleOptions } from '@mui/material/styles/createTypography';
import { Theme } from '@mui/system';
import React from 'react';
import { pxToRem, pxTovW } from '../commonUtils/resizeUtils';

// --------THEME INTERFACE------------

// configuration for type theme
declare module '@mui/material/styles' {
  interface Theme {
    status: {
      danger: string;
    };
  }
  interface Palette {
    neutral: {
      lightGreen: string;
      aqua: string;
      lightPink: string;
      lightOrange: string;
      vistaWhite: string;
      turquoise: string;
      paleGrey: string;
      grey: string;
      lightBlue: string;
      royalBlue: string;
      gainsboro: string;
      crimson: string;
      honeydew: string;
      aliceBlue: string;
      cornflowerBlue: string;
      lightMint: string;
      electricGreen: string;
    };
  }
  interface PaletteOptions {
    neutral: {
      lightGreen: string;
      aqua: string;
      lightPink: string;
      lightOrange: string;
      vistaWhite: string;
      turquoise: string;
      paleGrey: string;
      grey: string;
      lightBlue: string;
      royalBlue: string;
      gainsboro: string;
      crimson: string;
      honeydew: string;
      aliceBlue: string;
      cornflowerBlue: string;
      lightMint: string;
      electricGreen: string;
    };
  }

  // allow configuration using `createTheme`
  interface ThemeOptions {
    status?: {
      danger?: string;
    };
  }
  interface TypographyVariantsOptions {
    g1: TypographyStyleOptions;
    g2: TypographyStyleOptions;
    bodyText: TypographyStyleOptions;
    linkText: TypographyStyleOptions;
    cardText: TypographyStyleOptions;
    smallText: TypographyStyleOptions;
    subText: TypographyStyleOptions;
    smallestText: TypographyStyleOptions;
    elementText: TypographyStyleOptions;
    elementH1: TypographyStyleOptions;
    elementH2: TypographyStyleOptions;
    elementH3: TypographyStyleOptions;
    elementBodyText: TypographyStyleOptions;
  }
}

// Update the Typography's variant prop options
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    g1: true;
    g2: true;
    bodyText: true;
    linkText: true;
    cardText: true;
    smallText: true;
    subText: true;
    smallestText: true;
    elementText: true;
    elementH1: true;
    elementH2: true;
    elementH3: true;
    elementBodyText: true;
  }
}

interface ExtendedTypographyOptions extends TypographyVariantsOptions {
  display1: React.CSSProperties;
}

// --------THEME FILE------------
export const themeBreakPoints = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 300,
      md: 680,
      lg: 1200,
      xl: 1920,
    },
  },
});

export const theme: Theme = {
  ...themeBreakPoints,
  ...createTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 300,
        md: 680,
        lg: 1200,
        xl: 1920,
      },
    },
    spacing: 4,
    palette: {
      common: {
        black: '#1D1D1D',
        white: '#FFFFFF',
      },
      primary: {
        main: '#007CDC',
      },
      secondary: {
        main: '#0AA34F',
      },
      error: {
        main: '#d41f00',
        light: '#FAE9E6',
      },
      warning: {
        main: '#F8C807', //tabs color
      },
      success: {
        main: '#0F8F10',
        light: '#E7F4E7',
      },
      info: {
        main: '#4B4DFD',
      },
      neutral: {
        lightGreen: '#F0FDE0',
        aqua: '#F2F3FE',
        lightPink: '#FFEEEE',
        lightOrange: '#FFF3E7',
        vistaWhite: '#F9F9F9',
        turquoise: '#C1F8DA',
        paleGrey: '#FDFBFB',
        grey: '#B8B8B8',
        lightBlue: '#DAF5FF',
        royalBlue: '#3F4D8F',
        gainsboro: '#E0DFDE',
        crimson: '#F54040',
        honeydew: '#ECFFF5',
        aliceBlue: '#F8FCFF',
        cornflowerBlue: '#61BAFF',
        lightMint: '#DDFAEA ',
        electricGreen: '#38FF92',
      },
      text: {
        primary: '#333333', //body texts
        secondary: '#1D1D1D', //Headings
        disabled: '#B8B8B8',
      },
    },
    shape: {
      borderRadius: 2,
    },

    typography: {
      fontFamily: ['Lato,Poppins'].join(''),
      fontWeightLight: 400,
      fontWeightRegular: 500,
      fontWeightMedium: 600,
      fontWeightBold: 900,
      g1: {
        fontFamily: 'Poppins',
        color: '#1D1D1D',
        fontWeight: '600',
        fontSize: '2.396vw', //46px
        // lineHeight: '2.500vw', //48px
        [themeBreakPoints.breakpoints.down('md')]: {
          fontSize: pxToRem(46), //46px
          // lineHeight: '4.8rem',
        },
      },
      g2: {
        fontFamily: 'Poppins',
        color: '#1D1D1D',
        fontWeight: '600',
        fontSize: '1.667vw', //32px
        // lineHeight: '2.500vw', //48px
        [themeBreakPoints.breakpoints.down('md')]: {
          fontSize: pxToRem(32), //46px
          // lineHeight: '4.8rem',
        },
      },
      h1: {
        fontFamily: 'Poppins',
        color: '#1D1D1D',
        fontWeight: '800',
        fontSize: '2.188vw', //42px
        // lineHeight: '2.500vw', //48px
        [themeBreakPoints.breakpoints.down('md')]: {
          fontSize: pxToRem(21), //21px
          // lineHeight: '3.6rem',
        },
      },
      h2: {
        fontFamily: 'Poppins',
        color: '#1D1D1D',
        fontWeight: '800',
        fontSize: '1.563vw', //30px
        // lineHeight: '2.635vw' /*36*/,
        [themeBreakPoints.breakpoints.down('md')]: {
          fontSize: pxToRem(18), //18px
          // lineHeight: '36px' /*36*/,
        },
      },
      h3: {
        fontFamily: 'Poppins',
        color: '#1D1D1D',
        fontWeight: '500',
        fontSize: '1.094vw', //21px
        // lineHeight: '2.196vw' /*30*/,
        [themeBreakPoints.breakpoints.down('md')]: {
          fontSize: pxToRem(16), //16px
          // lineHeight: '30px',
        },
      },
      h4: {
        fontFamily: 'Lato',
        color: '#1D1D1D',
        fontWeight: '500',
        fontSize: '0.938vw', //18px
        // lineHeight: '1.302vw', //25px
        [themeBreakPoints.breakpoints.down('md')]: {
          fontSize: pxToRem(14), //14px
          // lineHeight: '2.5rem',
        },
      },
      h5: {
        fontFamily: 'Lato',
        color: '#1D1D1D',
        fontWeight: '500',
        fontSize: '0.833vw', //16px
        [themeBreakPoints.breakpoints.down('md')]: {
          fontSize: pxToRem(14), //14px
        },
      },
      cardText: {
        fontFamily: 'Lato',
        color: '#333333',
        fontWeight: 600,
        fontSize: '0.938vw', //18px
        // lineHeight: '1.537vw' /*21*/,
        [themeBreakPoints.breakpoints.down('md')]: {
          fontSize: pxToRem(16), //16px
          // lineHeight: '21px',
        },
      },
      bodyText: {
        fontFamily: 'Lato',
        color: '#333333',
        fontWeight: 400,
        fontSize: '1.094vw', //21px
        // lineHeight: '1.537vw' /*21*/,
        [themeBreakPoints.breakpoints.down('md')]: {
          fontSize: pxToRem(16), //16px
          // lineHeight: '21px',
        },
      },
      linkText: {
        fontFamily: 'Lato',
        color: '#0AA34F',
        fontWeight: 400,
        fontSize: '1.094vw', //21px
        textDecoration: 'underline',
        cursor: 'pointer',
        // lineHeight: '1.537vw' /*21*/,
        [themeBreakPoints.breakpoints.down('md')]: {
          fontSize: pxToRem(16), //16px
          // lineHeight: '21px',
        },
      },
      smallText: {
        fontFamily: 'Lato',
        color: '#333333',
        fontWeight: 700,
        fontSize: '0.729vw', //14px
        // lineHeight: '1.250vw', //24px
        [themeBreakPoints.breakpoints.down('md')]: {
          fontSize: pxToRem(11), //11px
          // lineHeight: '21px',
        },
      },
      subText: {
        fontFamily: 'Lato',
        color: '#333333',
        fontWeight: 400,
        fontSize: '0.625vw', //12px
        // lineHeight: '1.250vw', //24px
        [themeBreakPoints.breakpoints.down('md')]: {
          fontSize: pxToRem(12), //12px
        },
      },
      smallestText: {
        fontFamily: 'Lato',
        color: '#333333',
        fontWeight: 400,
        fontSize: '0.521vw', //10px
        [themeBreakPoints.breakpoints.down('md')]: {
          fontSize: pxToRem(10), //10px
        },
      },
      elementText: {
        fontFamily: 'Lato',
        color: '#333333',
        fontWeight: 400,
        fontSize: pxToRem(24), //24px
        [themeBreakPoints.breakpoints.down('md')]: {
          fontSize: pxToRem(16), //16px
        },
        lineHeight: 1,
      },
      elementBodyText: {
        fontFamily: 'Lato',
        color: '#333333',
        fontWeight: 400,
        fontSize: pxToRem(21), //21px
        // lineHeight: '1.537vw' /*21*/,
        [themeBreakPoints.breakpoints.down('md')]: {
          fontSize: pxToRem(16), //16px
          // lineHeight: '21px',
        },
      },
      elementH1: {
        fontFamily: 'Poppins',
        color: '#1D1D1D',
        fontWeight: '800',
        fontSize: pxToRem(42), //42px
        // lineHeight: '2.500vw', //48px
        [themeBreakPoints.breakpoints.down('md')]: {
          fontSize: pxToRem(21), //21px
          // lineHeight: '3.6rem',
        },
      },
      elementH2: {
        fontFamily: 'Poppins',
        color: '#1D1D1D',
        fontWeight: '800',
        fontSize: pxToRem(30), //30px
        // lineHeight: '2.635vw' /*36*/,
        [themeBreakPoints.breakpoints.down('md')]: {
          fontSize: pxToRem(18), //18px
          // lineHeight: '36px' /*36*/,
        },
      },
      elementH3: {
        fontFamily: 'Poppins',
        color: '#1D1D1D',
        fontWeight: '500',
        fontSize: pxToRem(21), //21px
        // lineHeight: '2.196vw' /*30*/,
        [themeBreakPoints.breakpoints.down('md')]: {
          fontSize: pxToRem(16), //16px
          // lineHeight: '30px',
        },
      },
      button: {
        fontFamily: 'Lato',
        textTransform: 'none',
        fontSize: '1.094vw', //21px
        [themeBreakPoints.breakpoints.down('md')]: {
          fontSize: pxToRem(14), // 14px
        },
      },
    } as ExtendedTypographyOptions,

    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            minWidth: 0,
            fontSize: 'inherit',
            borderRadius: '5px',
          },
        },
      },
      MuiTabs: {
        styleOverrides: {
          root: {
            background: '#F2F4FF',
            borderRadius: '0.586vw 0.586vw 0px 0px', // 8px 8px 0px 0px
            padding: '0 0.878vw 0 0.878vw', // 0 12px 0 12px

            '& .MuiTabs-indicator': {
              display: 'flex',
              justifyContent: 'center',
              backgroundColor: 'transparent',
              height: '0.366vw', // 5px
              //border:'1px solid white',
              borderRadius: '0.586vw 0.586vw 0 0', // 8px 8px 0px 0px
              background: '#F24034',
            },
          },
        },
      },
      MuiTab: {
        styleOverrides: {
          root: {
            minWidth: '0vw',
            maxWidth: 'unset',
            minHeight: '0vw',
            fontWeight: 700,
            fontSize: '1.025vw' /*14*/,
            lineHeight: '1.537vw' /*21*/,
            padding: '0',
            margin: '1.171vw 0.878vw 0.659vw 0.878vw', // 16px 12px 9px 12px
          },
        },
      },
      MuiAutocomplete: {
        styleOverrides: {
          root: {
            '& .MuiAutocomplete-hasPopupIcon': {
              padding: '0px',
            },
          },
          input: {
            fontWeight: '700',
          },
          option: {
            fontSize: '16px',
            // padding: "1.171vw !important",
            // "&:hover": { color: "#fff", background: "#FF334B !important" },ß
            backgroundColor: 'inherit',
          },
          tag: {
            display: 'flex',
            gap: '1.171vw',
            padding: '0.366vw 0.586vw', // 5px 8px
            width: 'max-content',
            background: '#F2F2F2',
            borderRadius: '0.293vw',
            '& .MuiChip-deleteIcon': {
              color: '#C4C4C4',
            },
          },
        },
      },
      MuiGrid: {
        styleOverrides: {
          root: {},
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            fontFamily: 'Lato',
            '& .MuiOutlinedInput-root': {
              //default border
              fontSize: pxTovW(21),
              [themeBreakPoints.breakpoints.down('md')]: {
                fontSize: pxToRem(14),
              },
              // padding: "0.659vw 1.171vw",
              border: '0.073vw solid transparent',

              //other default properties
              '& *': {
                padding: '0px',
                border: '0px solid red',
              },
              borderRadius: '0.293vw',
              //onhover
              '&:hover fieldset': {
                border: '0px solid',
              },
              '&.Mui-error': {
                border: '0.073vw solid red',
              },
              //onfocus
              '&.Mui-focused fieldset': {
                border: '0.073vw solid transparent',
              },
            },
          },
        },
      },
      MuiInputLabel: {
        styleOverrides: {
          root: {
            color: '#000',
            fontSize: '1.025vw',
            [themeBreakPoints.breakpoints.down('md')]: {
              fontSize: '3vw',
            },
          },
        },
      },
      MuiCheckbox: {
        styleOverrides: {
          root: {
            colorPrimary: '#FE5953',
          },
        },
      },
    },
  }),
};
