import {makeStyles} from 'tss-react/mui';

export const forgotPasswordStyle = makeStyles()((theme: any) => ({
  fieldArea: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '100%',
    height: '100%',
    padding: '20px 70px',
  },
  resetPasswordButton: {
    backgroundColor: '#00a9cf',
    color: '#FFF',
    fontSize: 19,
    fontWeight: 400,
    height: 35,
    borderRadius: 17.5,
  },
  inputField: {
    borderRadius: 7,
    '& .MuiOutlinedInput-root': {
      height: 40,
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: '#9B9B9B!important',
    },
  },
  errorText: {
    height: 12,
    color: '#CC0000',
    paddingTop: 2,
  },
  resendOtp: {
    '& a': {
      color: theme.palette.customColor.black,
      fontSize: 16,
      textDecoration: 'underline',
    },
  },
  resendOtpDisable: {
    '& a': {
      color: theme.palette.customColor.black,
      fontSize: 16,
      textDecoration: 'underline',
      pointerEvents: 'none',
      cursor: 'not-allowed',
      opacity: 0.5,
    },
  },
}));
