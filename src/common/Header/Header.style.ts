import {makeStyles} from 'tss-react/mui';

export const headerStyle = makeStyles()((theme: any) => ({
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: theme.palette.common.white,
    height: theme.headerHeight,
    padding: `0 145px`,
    [theme.breakpoints.down('xl')]: {
      padding: `0 2%`,
    },
  },
  logoutButton: {
    borderRadius: 20,
  },
}));
