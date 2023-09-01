import React from 'react';
import Box from '@mui/material/Box';

import {NavLinks} from 'common/NavLinks';
import UserName from 'common/UserName';
import MoreOptions from './MoreOptions';
import Vimient_Logo from 'assets/Vimient_Logo_New.png';

import {headerStyle} from './Header.style';
import {Typography} from '@mui/material';
import {getClientTimezone, getTimezoneFullAbbr} from 'globals/date.functions';
import {PRINT_HIDE_CLASS} from 'common/Print/Print.types';
import {NavLink} from 'react-router-dom';
import {useAppSelector} from 'hooks/reduxHooks';

interface IHeaderPorps {
  showMenu: boolean;
}
const Header = ({showMenu}: IHeaderPorps) => {
  const {classes} = headerStyle();
  const defaultPage = useAppSelector(
    (state: any) => state.auth.roleConfig?.defaultPage,
  );

  return (
    <Box
      component='header'
      boxShadow={3}
      className={`${classes.container} ${PRINT_HIDE_CLASS}`}>
      <Box width={150}>
        <NavLink to={defaultPage}>
          <img
            src={Vimient_Logo}
            height='100%'
            alt='vimient-logo'
            width='100%'
          />
        </NavLink>
      </Box>
      {showMenu && (
        <Box display='flex' flexDirection='row' alignItems='center'>
          <Typography style={{color: '#686868'}}>
            {getTimezoneFullAbbr(getClientTimezone())}
          </Typography>
          <NavLinks />
          <Typography variant='body1'>
            <UserName firstName />
          </Typography>
          <MoreOptions />
        </Box>
      )}
    </Box>
  );
};

export default Header;
