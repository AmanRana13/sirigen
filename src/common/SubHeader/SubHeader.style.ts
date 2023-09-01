import {makeStyles} from 'tss-react/mui';

export const subHeaderStyle = makeStyles()((theme: any) => ({
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    borderBottom: `4px solid ${theme.palette.customColor.primaryGreen}`,
  },
  button: {
    backgroundColor: theme.palette.customColor.white,
    color: theme.palette.customColor.primaryGreen,
    borderRadius: '0px',
    position: 'relative',
    bottom: 4,
    width: '100%',
    border: `1px solid ${theme.palette.customColor.primaryGreen}`,
  },
  filled: {
    backgroundColor: theme.palette.customColor.primaryGreen,
    color: theme.palette.customColor.white,
    pointerEvents: 'none',
  },
  notification: {
    backgroundColor: theme.palette.customColor.notification,
    height: 33,
    width: 33,
    borderRadius: '50%',
    position: 'absolute',
    top: -20,
    right: -8,
  },
  incomplete: {
    borderRadius: '50%',
    backgroundColor: theme.palette.customColor.white,
    width: '21px',
    height: '21px',
    overflow: 'hidden',
    position: 'absolute',
    right: '7.5px',
    top: '7.5px',
  },
}));
