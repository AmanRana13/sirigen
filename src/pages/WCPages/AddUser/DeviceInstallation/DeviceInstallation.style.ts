import {makeStyles} from 'tss-react/mui';

export const deviceInstallationStyle = makeStyles()((theme: any) => ({
  buttonContainerStyle: {
    position: 'relative',
    margin: '25px',
    left: 0,
    right: 0,
    display: 'flex',
    width: '100%',
    justifyContent: 'flex-end',
    zIndex: 2,
  },
  medicalInfoButtonContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonStyle: {
    margin: '20px 0 0px',
  },
  cancelButtonStyle: {
    marginLeft: 20,
  },
  infoIcon: {
    fontSize: 18,
    marginLeft: 5,
    marginTop: 3,
    marginRight: 2,
    color: theme.palette.error.light,
  },
  errorBox: {
    borderRadius: 8,
    marginLeft: 35,
  },
  errorBorder: {
    border: '2px solid  #c00',
    padding: '10px 6px 15px 7px',
    marginLeft: 28,
    marginRight: -10,
    marginTop: -10,
    marginBottom: 20,
  },
  errorMessage: {
    position: 'absolute',
    bottom: -25,
    left: -4,
  },
}));
