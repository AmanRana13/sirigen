import {Box} from '@mui/material';
import {appStyle} from 'App.style';
import Footer from 'common/Footer/Footer.component';
import Header from 'common/Header';
import {PRINT_HIDE_CLASS} from 'common/Print/Print.types';
import {Outlet} from 'react-router-dom';
import {WCThemeProvider} from 'themes';

const WCLayout = () => {
  const {classes} = appStyle();

  return (
    <WCThemeProvider>
      <Box className={PRINT_HIDE_CLASS}>
        <Header showMenu={true} />
        <Box className={classes.layout}>
          <Outlet />
        </Box>
        <Footer />
      </Box>
    </WCThemeProvider>
  );
};

export {WCLayout};
