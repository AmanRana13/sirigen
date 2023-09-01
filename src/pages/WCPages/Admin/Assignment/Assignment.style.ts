import {makeStyles} from 'tss-react/mui';

export const AssignmentStyle = makeStyles()((theme: any) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    padding: '30px 25px 45px 25px',
    borderRadius: '16px',
    boxShadow: '0 2px 8px 0 rgba(0, 0, 0, 0.16)',
    border: `solid 1px ${theme.palette.grey.A100}`,
    backgroundColor: theme.palette.background.default,
  },
}));
