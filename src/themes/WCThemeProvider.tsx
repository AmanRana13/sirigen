import {CssBaseline} from '@mui/material';
import {ThemeProvider, responsiveFontSizes, Theme} from '@mui/material/styles';
import {theme} from 'config/theme.config';

const InitTheme = responsiveFontSizes(theme as Theme);

const WCThemeProvider = ({children}: any) => {
  return (
    <ThemeProvider theme={InitTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default WCThemeProvider;
