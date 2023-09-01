import React, {ReactElement} from 'react';
import {
  ThemeProvider,
  Theme,
  StyledEngineProvider,
  responsiveFontSizes,
} from '@mui/material/styles';
import {theme} from 'config/theme.config';

// declare module '@mui/styles/defaultTheme' {
//   // eslint-disable-next-line @typescript-eslint/no-empty-interface
//   interface DefaultTheme extends Theme {}
// }

const InitTheme = responsiveFontSizes(theme as Theme);

const MockThemeProvider = (ui: ReactElement): ReactElement => {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={InitTheme}>{ui}</ThemeProvider>
    </StyledEngineProvider>
  );
};

export default MockThemeProvider;
