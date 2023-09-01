import {Link} from 'react-router-dom';
import {Box, Typography} from '@mui/material';
import {makeStyles} from 'tss-react/mui';
import RoleBaseRender from '../RoleBaseRender';
import {Roles} from 'globals/enums';
import {appRoutesEndpoints} from 'routes/appRoutesEndpoints';
import {useAppSelector} from 'hooks/reduxHooks';

const useStyles = makeStyles()((theme: any) => ({
  links: {
    color: theme.palette.common.black,
  },
}));

const NavLinks = () => {
  const {classes} = useStyles();
  const defaultPage = useAppSelector(
    (state) => state.auth.roleConfig.defaultPage,
  );
  const navLinks = [
    {
      label: 'Admin',
      // eslint-disable-next-line max-len
      path: defaultPage,
      roles: [Roles.Admin, Roles.BDM],
    },
    {
      label: 'Home',
      path: appRoutesEndpoints.homePage,
      roles: [Roles.CareAgent, Roles.WarehouseEmployee],
    },
    {
      label: 'Add User',
      path: '/add-user',
      roles: [Roles.CareAgent, Roles.WarehouseEmployee, Roles.BDM],
    },
    {
      label: 'Call Schedule',
      path: '/call-schedule',
      roles: [Roles.CareAgent],
    },
  ];

  return (
    <Box display='flex' marginRight={2}>
      {navLinks.map((data: any) => {
        return (
          <RoleBaseRender forRole={data.roles} key={data.label}>
            <Box key={data.label} padding={2}>
              <Typography variant='body1'>
                <Link className={classes.links} to={data.path}>
                  {data.label}
                </Link>
              </Typography>
            </Box>
          </RoleBaseRender>
        );
      })}
    </Box>
  );
};

export {NavLinks};
