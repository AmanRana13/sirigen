import {makeStyles} from 'tss-react/mui';

export const addUserStyle = makeStyles()((theme: any) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'relative',
  },
  title: {
    width: '100%',
    textAlign: 'center',
    borderBottom: '1px solid #ccc',
    lineHeight: '0.1em',
    margin: '10px 0 30px',
    '& span': {
      background: '#DFF4F3',
      fontSize: 20,
      fontWeight: 700,
      padding: '0 20px',
    },
  },
  saveButton: {
    borderRadius: 25,
    backgroundColor: theme.palette.customColor.primary,
    width: 180,
  },
  cancelButton: {
    marginRight: 15,
  },
  bottomButton: {
    position: 'absolute',
    margin: 'auto',
    left: 0,
    right: 0,
    width: 400,
  },
  whiteBox: {
    margin: 'auto',
    top: 0,
    left: 0,
    right: 0,
    width: 800,
    borderRadius: theme.spacing(0.8),
    backgroundColor: '#FFF',
    height: 70,
    position: 'absolute',
  },
  iconSize: {
    height: 50,
    width: 50,
  },
  iconContainer: {
    backgroundColor: '#9B9B9B',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 70,
    width: 70,
  },
  addUserButtonContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  addUserButton: {
    borderRadius: 20,
    width: 180,
    backgroundColor: theme.palette.customColor.primary,
  },
  addDeletIcon: {
    color: theme.palette.customColor.primary,
    cursor: 'pointer',
  },
  alignCenter: {
    display: 'flex',
    alignItems: 'center',
  },
  errorTextStyle: {
    color: 'red',
  },
}));
