import {makeStyles} from 'tss-react/mui';

export const ApproveDialogStyle = makeStyles()((theme) => ({
  container: {
    display: 'flex',
    backgroundColor: '#fff',
    width: 470,
    borderRadius: '16px',
    position: 'fixed',
    top: 100,
    right: 18,
    zIndex: 1000,
    boxShadow: '0 16px 32px 0 rgba(0, 0, 0, 0.16)',
    '& h2': {
      fontWeight: theme.typography.fontWeightBold,
    },
    cursor: 'pointer',
  },
  clearIcon: {
    display: 'flex',
    flex: 1.5,
    alignItems: 'center',
  },
  clearButton: {
    cursor: 'pointer',
    transform: 'scale(1.72)',
  },
  alertNotificationColor: {
    backgroundColor: '#FD521D',
  },
  summaryNotificationColor: {
    backgroundColor: '#FFEB50',
  },
  cIRangeMilestoneColor: {
    backgroundColor: '#b1b1b1',
  },
  content: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    padding: '0',
    flex: 20,
  },
  notificationColorDimensions: {
    width: 24,
    flex: 1,
  },
  message: {
    // [theme.breakpoints.down('lg')]: {
    //   fontSize: '17px',
    // },
  },
}));
