import {makeStyles} from 'tss-react/mui';

export const deviceIntegrationStyle = makeStyles()((theme: any) => ({
  buttonContainerStyle: {
    position: 'absolute',
    margin: 'auto',
    left: 0,
    right: 0,
    display: 'flex',
    marginTop: 0,
    width: '40%',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  container: {
    backgroundColor: '#FFF',
    borderRadius: 7,
    marginTop: 20,
    margin: 0,
    marginBottom: theme.spacing(2),
  },
  gridContainer: {
    margin: 0,
    paddingBottom: 20,
    paddingTop: 20,
  },
  connectButton: {
    padding: 0,
    marginTop: 18,
    fontSize: 14,
    paddingBottom: 2,
    fontWeight: 'normal',
    width: 130,
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
    borderRadius: 20,
    fontSize: 20,
    width: 180,
    marginRight: 20,
    borderWidth: 1,
    borderColor: theme.palette.customColor.black,
  },
}));
