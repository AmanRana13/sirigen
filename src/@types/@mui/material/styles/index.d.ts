import * as styles from '@mui/material/styles';
declare module '@mui/material/styles' {
  interface TypographyVariants {
    boldHeading: React.CSSProperties;
    body1Bold: React.CSSProperties;
    toolTipFontSize?: number;
    h1v1: React.CSSProperties;
    h2v1: React.CSSProperties;
    h3v1: React.CSSProperties;
    h6v1: React.CSSProperties;
    f24bold: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    boldHeading?: React.CSSProperties;
    body1Bold?: React.CSSProperties;
    toolTipFontSize?: number;
    h1v1: React.CSSProperties;
    h2v1: React.CSSProperties;
    h3v1: React.CSSProperties;
    h6v1: React.CSSProperties;
    f24bold: React.CSSProperties;
  }

  interface ThemeOptions {
    appBar?: {
      desktopHeight?: number;
      mobileHeight?: number;
    };
    drawer?: {
      drawerWidth?: number;
    };
    headerHeight?: number;
    footerHeight?: number;
    cardMaxWidth?: number;
    status?: {
      danger?: string;
      success?: string;
      info?: string;
      warning?: string;
    };
    customTypography?: {
      h4?: {
        fontSize?: number;
        fontWeight?: number;
      };
      heading?: {
        fontSize?: string;
        fontWeight?: number;
        fontStretch?: string;
        fontStyle?: string;
        lineHeight?: number | string;
        letterSpacing?: string;
      };
      subheading?: {
        fontSize?: string;
        fontWeight?: number;
        fontStretch?: string;
        fontStyle?: string;
        lineHeight?: number | string;
        letterSpacing?: string;
      };
      normal?: {
        fontSize?: string;
        fontWeight?: string | number;
        fontStretch?: string;
        fontStyle?: string;
        lineHeight?: string | number;
        letterSpacing?: string;
      };
    };
  }
  interface Components {
    MuiExpansionPanelSummary?: {
      styleOverrides?: {
        expandIcon?: {
          '&$expanded'?: {
            transform?: string;
          };
        };
      };
    };
  }

  interface PaletteOptions {
    footer?: {
      border?: string;
    };
    customColor?: {
      black?: string;
      titleBlack?: string;
      white?: string;
      primary?: string;
      grey?: string;
      ligthGrey?: string;
      boxShadow?: string;
      red?: string;
      green?: string;
      amber?: string;
      error?: string;
      summaryHeader?: string;
      alertHeader?: string;
      sosHeader?: string;
      callEntryHeader?: string;
      resourcesHeader?: string;
      disabled?: string;
      sky?: string;
      mapBackground?: string;
      activeCellBackground?: string;
      highlight?: string;
      disabledRemove?: string;
      borderGrey?: string;
      borderDark?: string;
      primaryDark?: string;
      primaryLight?: string;
      darkSeparator?: string;
      imageBorder?: string;
      notification?: string;
      lightGrey?: string;
      success?: string;
      info?: string;
      welcome?: string;
      borderBlue?: string;
      dateHeader?: string;
      lightBlack?: string;
      lighterBlack?: string;
      activityGreen?: string;
      moderateBlue?: string;
      intenseBlue?: string;
      moderateGreen?: string;
      intenseGreen?: string;
      percentBlue?: string;
      bgGrey?: string;
      primaryGreen?: string;
      primaryGreen?: string;
      lightSeparator?: string;
      strokeGrey?: string;
      remGreen?: string;
      squareGreen?: string;
      noDataGrey?: string;
      labelRed?: string;
      hydrationGreen?: string;
      hydrationRed?: string;
      highGreen?: string;
      stackGreen?: string;
      stackYellow?: string;
      axisBlack?: string;
      whitesmoke?: string;
      strokeBlue?: string;
      sleepGrey?: string;
      strokeBlack?: string;
      smokeGrey?: string;
      sleepRed?: string;
      sleepGreen?: string;
      sleepYellow?: string;
    };
    zoneWhite?: PaletteOptions['primary'];
    zoneBlue?: PaletteOptions['primary'];
    zoneGreen?: PaletteOptions['primary'];
    zoneVimient?: PaletteOptions['primary'];
    disabled?: PaletteOptions['primary'];
    border?: PaletteOptions['primary'];
    hyperlink?: PaletteOptions['primary'];
  }
}

declare module '@mui/material/styles/createPalette' {
  interface TypeBackground {
    primary?: string;
    collapseItem?: string;
    default: string;
    paper: string;
    green?: string;
  }
}

// Update the Typography's variant prop options
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    boldHeading: true;
    body1Bold: true;
    h1v1: true;
    h2v1: true;
    h3v1: true;
    h6v1: true;
    f24bold: true;
  }
}

declare module '@mui/material/Chip' {
  interface ChipPropsColorOverrides {
    zoneWhite: true;
    zoneBlue: true;
    zoneGreen: true;
    zoneVimient: true;
  }
}
