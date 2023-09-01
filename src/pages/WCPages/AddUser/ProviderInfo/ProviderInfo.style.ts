import {makeStyles} from 'tss-react/mui';

export const providerInfoStyle = makeStyles()((theme: any) => ({
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
    margin: 'auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonStyle: {
    borderRadius: 20,
    width: 220,
    backgroundColor: theme.palette.customColor.primary,
  },
  appendButtonStyle: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: 0,
    marginTop: 20,
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
}));
