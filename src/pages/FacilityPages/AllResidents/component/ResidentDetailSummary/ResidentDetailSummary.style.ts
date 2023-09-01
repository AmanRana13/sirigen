import {makeStyles} from 'tss-react/mui';

export const ResidentSummaryStyle = makeStyles()((theme: any) => ({
  ResidentDetail: {
    display: 'flex',
    lineHeight: 1.7,
    padding: '0 10px',
    borderBottom: '15px',
  },
  ResidentDetailHeading: {
    width: '50%',
    wordBreak: 'break-word',
  },
  ResidentDetailValue: {
    marginLeft: '15px',
    width: '50%',
    flex: 1,
    color: theme.palette.customColor.black,
  },
  ResidentSummaryContainer: {
    maxWidth: '100%',
    width: '100%',
    display: 'flex',
    borderRadius: 15,
    wordBreak: 'break-all',
    padding: '10px 0',
    color: theme.palette.customColor.black,
    border: `4px solid ${theme.palette.primary.main}`,
    flexDirection: 'column',
    '& .MuiGrid-item': {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    '&>*:nth-last-child(-n + 1)': {
      borderBottomRightRadius: '10px',
      borderBottomLeftRadius: '10px',
    },
    '&>*:nth-child(even)': {
      backgroundColor: theme.palette.background.green,
    },
  },
  NavLink: {
    color: theme.palette.customColor.black,
  },
}));
