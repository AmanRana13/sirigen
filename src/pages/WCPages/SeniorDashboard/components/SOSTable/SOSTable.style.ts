import {makeStyles} from 'tss-react/mui';

export const SOSTableStyle = makeStyles()((theme: any) => ({
  container: {
    marginBottom: 50,
  },
  tableCard: {
    borderRadius: '16px',
    boxShadow: '0 2px 8px 0 rgba(0, 0, 0, 0.16)',
    backgroundColor: theme.palette.background.paper,
  },
}));
