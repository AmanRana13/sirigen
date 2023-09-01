import {CssBaseline} from '@mui/material';
import {ThemeProvider, responsiveFontSizes} from '@mui/material/styles';
import facilityTheme from './facilityTheme';

const InitTheme = responsiveFontSizes(facilityTheme);

const FacilityThemeProvider = ({children}: any) => {
  return (
    <ThemeProvider theme={InitTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default FacilityThemeProvider;
