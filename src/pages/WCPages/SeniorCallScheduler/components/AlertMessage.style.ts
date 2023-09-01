import {makeStyles} from 'tss-react/mui';

export const alertMessageStyle = makeStyles()((theme: any) => ({
  alertBox: {
    display: 'flex',
    marginTop: '15px',
    '& img': {
      width: '30px',
    },
    '& span': {
      marginLeft: '10px',
      color: theme.status.danger,
    },
  },
}));
