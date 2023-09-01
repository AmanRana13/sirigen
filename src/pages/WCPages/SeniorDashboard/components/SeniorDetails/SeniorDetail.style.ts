import {makeStyles} from 'tss-react/mui';

export const seniorDetailsStyle = makeStyles()((theme: any) => ({
  container: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    borderRadius: 10,
    padding: 15,
    boxShadow: '0 8px 24px 0 rgba(0, 0, 0, 0.16)',
    border: 'solid 1px #d3d3d3',
  },
  seniorImage: {
    height: 84,
    width: 84,
    marginRight: 14,
  },
  seniorDetail: {
    display: 'flex',
    lineHeight: 1.7,
    padding: '3px',
  },
  seniorDetailHeading: {
    width: '40%',
  },
  seniorDetailValue: {
    width: '60%',
  },
  height: {
    borderLeft: '1px solid',
    borderRight: '1px solid',
  },
}));
