import {createTheme} from '@mui/material/styles';

const facilityTheme = createTheme({
  palette: {
    primary: {
      main: '#6BA539',
      dark: '#285501',
      light: '#F1F7ED',
    },
    secondary: {
      main: '#F1F7ED',
    },
    background: {
      default: '#F8F8F8',
      paper: '#FFFFFF',
      green: '#F1F7ED',
    },
    error: {
      main: '#CC0000',
    },
    success: {
      main: '#8AD83E',
    },
    disabled: {
      main: '#868686',
    },
    border: {
      main: '#8D9398',
    },
    hyperlink: {
      main: '#0186A5',
    },
    common: {
      white: '#FFFFFF',
      black: '#000000',
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
      fontSize: 18,
      fontWeight: 'bold',
    },
    body2: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    subtitle1: {
      fontSize: 18,
    },
    subtitle2: {
      fontSize: 16,
      fontWeight: 800,
    },
  },
});

export default facilityTheme;
