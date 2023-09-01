/* eslint-disable max-len */
const SFUIText =
  'https://vimient-frontend-resources.s3.us-west-1.amazonaws.com/SFUIText-';

import {createTheme, Palette} from '@mui/material/styles';
import {TypographyProps} from '@mui/material';

export interface MUThemeOptionsV2 {
  palette: Palette;
  typography: TypographyProps;
}

export const theme: any = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#16a9d0',
      dark: '#005976',
      light: '#16a9d0',
      contrastText: '#FFFFFF',
    },
    secondary: {
      light: '#FF8776',
      main: '#eaf8f7',
      contrastText: '#FFFFFF',
    },
    common: {
      white: '#FFF',
      black: '#000',
    },
    background: {
      default: '#FFFFFF',
      primary: '#DFF4F3',
      collapseItem: '#B8EDF4',
      green: '#F1F7ED',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#000000',
      disabled: '#aaaaaa',
    },
    grey: {
      A100: '#d3d3d3',
      A200: '#707070',
    },
    error: {
      light: '#CC0000',
      main: '#FF6D6D',
      contrastText: '#FFFFFF',
    },
    footer: {
      border: '#e0e0e0',
    },
    disabled: {
      main: '#868686',
    },
    customColor: {
      black: '#000000',
      titleBlack: '#313131',
      white: '#FFFFFF',
      primary: '#16A9D0',
      grey: '#A0A1A5',
      ligthGrey: '#E8E8E8',
      boxShadow: '#00000029',
      red: '#FF6D6D',
      green: '#79BE27',
      amber: '#FFC000',
      error: '#CC0000',
      summaryHeader: '#F7DA61',
      alertHeader: '#FC9271',
      sosHeader: '#ff1900',
      callEntryHeader: '#15efff',
      resourcesHeader: '#6cf0ff',
      disabled: '#0000001f',
      sky: '#d8f9ff',
      mapBackground: '#E5E3DF',
      activeCellBackground: '#EAF8F7',
      highlight: '#00a9cf',
      disabledRemove: '#a7a7a7',
      borderGrey: '#707070',
      borderDark: '#bebbbb',
      primaryDark: '#0088a9',
      primaryLight: '#0186a5',
      darkSeparator: '#525050',
      imageBorder: '#ededed',
      notification: '#fd521d',
      lightGrey: '#727272',
      success: '#88ba42',
      info: '#757575',
      welcome: '#03A9D0',
      borderBlue: '#9B9B9B',
      dateHeader: '#6B6B6B',
      lightBlack: '#404040',
      lighterBlack: '#686868',
      activityGreen: '#03fd0c',
      moderateBlue: '#00e6ff',
      intenseBlue: '#2fa2f2',
      moderateGreen: '#9cc37a',
      intenseGreen: '#498515',
      percentBlue: '#007e9a',
      bgGrey: '#eeeeee',
      primaryGreen: '#6ba539',
      lightSeparator: '#d0d0d0',
      strokeGrey: '#aeaeae',
      remGreen: '#cde0bc',
      squareGreen: '#05f705',
      noDataGrey: '#9e9e9e',
      labelRed: '#c43a31',
      hydrationGreen: '#7ABE27',
      hydrationRed: '#ff6932',
      highGreen: '#82e523',
      stackGreen: '#a8ff54',
      stackYellow: '#ffed77',
      axisBlack: '#252525',
      whitesmoke: '#fafafa',
      strokeBlue: '#034D80',
      sleepGrey: '#d3d3d3',
      strokeBlack: '#0000001A',
      smokeGrey: '#ccc',
      sleepRed: '#FF7979',
      sleepGreen: '#83e522',
      sleepYellow: '#fedd03',
    },
    zoneWhite: {main: '#ffffff', contrastText: '#000'},
    zoneBlue: {main: '#8fd9e9', contrastText: '#000'},
    zoneGreen: {main: '#ade867', contrastText: '#000'},
    zoneVimient: {main: '#ffdd00', contrastText: '#000'},
    border: {
      main: '#8D9398',
    },
  },
  headerHeight: 70,
  footerHeight: 50,
  cardMaxWidth: 1024,
  status: {
    danger: '#CC0000',
    success: '#5FC072',
    info: '#1E3E93',
    warning: '#FF8B00',
  },
  customTypography: {
    h4: {
      fontSize: 18,
      fontWeight: 800,
    },
    heading: {
      fontSize: '30px',
      fontWeight: 600,
      fontStretch: 'normal',
      fontStyle: 'normal',
      lineHeight: 0.67,
      letterSpacing: 'normal',
    },
    subheading: {
      fontSize: '22px',
      fontWeight: 500,
      fontStretch: 'normal',
      fontStyle: 'normal',
      lineHeight: 1.09,
      letterSpacing: 'normal',
    },
    normal: {
      fontSize: '24px',
      fontWeight: 'normal',
      fontStretch: 'normal',
      fontStyle: 'normal',
      lineHeight: 'normal',
      letterSpacing: 'normal',
    },
  },
  typography: {
    toolTipFontSize: 13,
    allVariants: {
      fontFamily: 'SFUIText',
      letterSpacing: 0,
    },
    boldHeading: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    h1v1: {
      fontSize: 30,
      fontWeight: 800,
    },
    h2v1: {
      fontSize: 23,
    },
    h3v1: {fontSize: 20, fontWeight: 600},
    h6v1: {
      fontSize: 20,
      fontWeight: 800,
    },
    h1: {
      fontSize: 26,
    },
    f24bold: {
      fontSize: 24,
      fontWeight: 'bold',
    },
    h2: {
      fontSize: 20,
      fontWeight: 500,
    },
    h3: {
      fontSize: 20,
    },
    h4: {
      fontSize: 18,
      fontWeight: 600,
    },
    h5: {
      fontSize: 16,
      fontWeight: 800,
      padding: 0.5,
    },
    h6: {
      fontSize: 20,
    },

    body1: {
      fontSize: 16,
      fontWeight: 'normal',
      padding: 0.5,
    },
    body1Bold: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    body2: {
      fontSize: 18,
      fontWeight: 'normal',
    },
    subtitle1: {
      fontSize: 14,
    },
    subtitle2: {
      fontSize: 14,
      fontWeight: 800,
    },
  },
  drawer: {
    drawerWidth: 240,
  },
  appBar: {
    desktopHeight: 120,
    mobileHeight: 56,
  },
  components: {
    MuiChip: {
      styleOverrides: {
        outlinedPrimary: {
          color: '#00A9CF',
          borderColor: '#00A9CF',
        },
        deleteIconOutlinedColorPrimary: {
          color: '#00A9CF',
          '&:hover': {
            color: '#00A9CF',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'initial',
          fontWeight: 600,
          fontSize: 13,
          color: '#FFFFFF',
        },
        containedSizeSmall: {
          fontSize: 15,
          fontWeight: 600,
          '&:disabled': {
            backgroundColor: '#868686',
            color: '#FFFFFF',
          },
        },
        containedSizeLarge: {
          fontSize: 20,
          fontWeight: 600,
          width: 180,
          borderRadius: 25,
          padding: '4px 10px',
          '&:disabled': {
            backgroundColor: '#868686',
            color: '#FFFFFF',
          },
        },
        outlinedSizeLarge: {
          fontSize: 20,
          fontWeight: 600,
          padding: '3px 9px',
          borderRadius: 25,
          border: '2px solid #707170',
          backgroundColor: 'transparent',
          color: '#707170',
          width: 180,
          boxShadow: '0 0 0 0',
          '&:hover': {
            boxShadow: '0 0 0 0',
            border: '2px solid #707170',
          },
        },
        outlinedSizeSmall: {
          fontSize: 15,
          fontWeight: 600,
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontSize: 15,
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          fontSize: 15,
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontSize: 15,
          paddingLeft: 16,
          paddingRight: 16,
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: '#4A90E2',
          cursor: 'pointer',
          textDecoration: 'none',
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: `
        a {
          text-decoration: none;
        }
        body {
          padding: 0;
          font-size: 0.875rem;
          font-weight: 400;
          line-height: 1.43;
          letter-spacing: 0;
          background-color: #DFF4F3;
        }
        ::selection {
          background-color: #FF8776;
          color: #FFFFFF;
        }
        :-webkit-autofill {
          -webkit-box-shadow: 0 0 0 1000px white inset;
          background-color: #FFFFFF;
        }
        .MuiOutlinedInput-notchedOutline {
          border-color: #EAF8F7!important;
        }
        .MuiOutlinedInput-input {
          padding: 0 14px;
        }
        .MuiInputBase-root {
          font-size:15px!important;
        }
        .MuiPickersDay-root.Mui-selected,
        .PrivatePickersYear-yearButton.Mui-selected,
        .PrivatePickersMonth-root.Mui-selected,
        .MuiPickersDay-root.Mui-selected:focus,
        .PrivatePickersYear-yearButton.Mui-selected:focus,
        .PrivatePickersMonth-root.Mui-selected:focus {
          background-color: #6ba539!important;
          color:#FFF!important;
        }
        .MuiPickersDay-root:hover {
          background-color: #498515!important;
          color:#FFF!important;
        }
        .MuiPickersDay-root:not(.Mui-selected) {
          border: none!important;
        }
        .MuiMenuItem-root.Mui-selected, .MuiMenuItem-root.Mui-selected:hover{
          background-color: #00000014!important;
        }
       
        .MuiPickersToolbar-penIconButton {
          visibility:hidden;
        }
        @font-face {
          font-family: 'SFUIText';
          font-style: 'normal';
          font-display: 'swap';
          font-weight: 300;
          src: url(${SFUIText}Light.ttf);
          unicodeRange: 'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF';
        }
        @font-face {
          font-family: 'SFUIText';
          font-style: 'normal';
          font-display: 'swap';
          font-weight: 400;
          src: url(${SFUIText}Regular.ttf);
          unicodeRange: 'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF';
        }
        @font-face {
          font-family: 'SFUIText';
          font-style: 'normal';
          font-display: 'swap';
          font-weight: 600;
          src: url(${SFUIText}SemiBold.ttf);
          unicodeRange: 'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF';
        }
        @font-face {
          font-family: 'SFUIText';
          font-style: 'normal';
          font-display: 'swap';
          font-weight: 700;
          src: url(${SFUIText}Bold.ttf);
          unicodeRange: 'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF';
        }
        @font-face {
          font-family: 'SFUIText';
          font-style: 'normal';
          font-display: 'swap';
          font-weight: 500;
          src: url(${SFUIText}Medium.ttf);
          unicodeRange: 'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF';
        }
      `,
    },
    MuiExpansionPanelSummary: {
      styleOverrides: {
        expandIcon: {
          '&$expanded': {
            transform: 'rotate(90deg)',
          },
        },
      },
    },
    MuiSlider: {
      styleOverrides: {
        valueLabel: () => ({
          sx: {fontSize: 14},
        }),
      },
    },
  },
});
