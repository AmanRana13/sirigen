import {makeStyles} from 'tss-react/mui';

export const appStyle = makeStyles()((theme) => ({
  layout: {
    marginLeft: 145,
    marginRight: 145,
    marginTop: 30,
    [theme.breakpoints.down('xl')]: {
      marginLeft: '2%',
      marginRight: '2%',
    },
  },
}));
