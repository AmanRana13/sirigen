import {Box} from '@mui/material';
import AppVersion from '../AppVersion/AppVersion';
import {footerStyle} from './Footer.style';
import {useAppSelector} from 'hooks/reduxHooks';
import {appRoutesEndpoints} from 'routes/appRoutesEndpoints';

const Footer = () => {
  const {classes} = footerStyle();
  const pageRoute = useAppSelector((state) => state.router.location?.pathname);

  return (
    <Box component='footer' className={classes.container}>
      {pageRoute === appRoutesEndpoints.homePage && <AppVersion />}
    </Box>
  );
};

export default Footer;
