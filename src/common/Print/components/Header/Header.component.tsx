import React, {PropsWithChildren} from 'react';
import {Box} from '@mui/material';
import {headerStyles} from './Header.style';
import VimientLogo from 'assets/Vimient_Logo_New.png';

const Header: React.FC<PropsWithChildren> = ({children}) => {
  const {classes} = headerStyles();
  return (
    <Box className={classes.container} data-testid='print-header'>
      <Box className={classes.logo}>
        <img src={VimientLogo} alt='Vimient Logo' />
      </Box>
      <Box>{children}</Box>
    </Box>
  );
};

export default Header;
