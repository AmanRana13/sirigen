import {makeStyles} from 'tss-react/mui';

export const careCircleStyle = makeStyles()((theme: any) => ({
  container: {
    backgroundColor: '#FFF',
    borderRadius: 7,
    padding: theme.spacing(3),
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    marginBottom: theme.spacing(2),
  },
  labelStyle: {
    lineHeight: '0.1em',
    margin: '20px 0 0px',
    fontSize: 16,
    fontWeight: 500,
  },
  title: {
    textAlign: 'center',
    lineHeight: '0.1em',
    width: '100%',
    margin: '10px 0 30px',
    fontSize: 20,
    fontWeight: 700,
  },
  buttonContainerStyle: {
    position: 'absolute',
    margin: 'auto',
    left: 0,
    right: 0,
    display: 'flex',
    width: '40%',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 6,
  },
  saveButtonStyle: {
    width: '40%',
  },
  radioButtonContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  buttonStyle: {
    borderRadius: 20,
    width: 200,
    backgroundColor: theme.palette.customColor.primary,
  },
  careGiverButtonContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  deleteButtonStyle: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: 0,
  },
  errorTextStyle: {
    color: 'red',
  },
  cancelButtonStyle: {
    borderRadius: 20,
    width: 200,
    marginRight: 20,
    borderWidth: 1,
    borderColor: theme.palette.customColor.black,
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
}));
