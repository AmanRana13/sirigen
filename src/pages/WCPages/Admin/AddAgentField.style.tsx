import {makeStyles} from 'tss-react/mui';

export const addAgentField = makeStyles()((theme: any) => ({
  form: {
    padding: '30px 0',
  },
  container: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  resendOTP: {
    '& a': {
      textDecoration: 'underline',
      color: '#707070',
      fontSize: 14,
    },
  },
  resendOTPDisbale: {
    '& a': {
      textDecoration: 'underline',
      color: '#707070',
      opacity: 0.5,
      pointerEvents: 'none',
      cursor: 'not-allowed',
    },
  },
  errorText: {
    color: theme.palette.customColor.error,
  },
  shiftWrapper: {
    display: 'flex',
    flexDirection: 'row',
    '& label': {
      marginRight: '14px',
    },
  },
  roleErrorContainer: {
    display: 'flex',
    width: 301,
    alignItems: 'flex-start',
  },
  roleErrorIcon: {
    margin: '4px 5px',
    width: '29px',
    height: '14px',
  },
}));
