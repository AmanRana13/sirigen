import {makeStyles} from 'tss-react/mui';

export const seniorSummaryStyle = makeStyles()((theme: any) => ({
  seniorDetail: {
    display: 'flex',
    lineHeight: 1.7,
    padding: '0 10px',
  },
  seniorDetailHeading: {
    width: '50%',
    wordBreak: 'break-word',
  },
  seniorDetailValue: {
    marginLeft: '15px',
    width: '50%',
    flex: 1,
  },
  seniorSummaryContainer: {
    display: 'flex',
    marginTop: 15,
    wordBreak: 'break-all',
    color: '#000',
    flexDirection: 'column',
    borderRadius: '16px',
    border: `4px solid ${theme.palette.customColor.primaryGreen}`,
    backgroundColor: 'transparent',
  },
  seniorSummaryTable: {
    '& .MuiGrid-item': {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    '&>:nth-child(odd)': {
      backgroundColor: '#f1f7ed',
    },
    '&>:nth-child(1)': {
      paddingTop: 10,
      borderRadius: '16px 16px 0 0',
    },
    '&>:nth-child(n-1)': {
      paddingBottom: 10,
    },
  },

  underline: {
    textDecoration: 'underline',
  },
}));
