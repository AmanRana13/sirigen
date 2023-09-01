import {Box} from '@mui/material';
import {appStyle} from 'App.style';
import FacilityBreadcrumbs from 'common/Breadcrumbs/FacilityBreadcrumbs';
import Footer from 'common/Footer/Footer.component';
import Header from 'common/Header';
import {Outlet} from 'react-router-dom';
import {FacilityThemeProvider} from 'themes';

const FacilityLayout = () => {
  const {classes} = appStyle();

  return (
    <FacilityThemeProvider>
      <Box>
        <Header showMenu={true} />
        <Box className={classes.layout}>
          <FacilityBreadcrumbs />
          <Outlet />
        </Box>
        <Footer />
      </Box>
    </FacilityThemeProvider>
  );
};

export {FacilityLayout};
