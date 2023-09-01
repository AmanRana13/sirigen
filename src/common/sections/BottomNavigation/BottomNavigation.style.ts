import {makeStyles} from 'tss-react/mui';

export const bottomNavigationStyle = makeStyles()((theme: any) => ({
  container: {
    marginBottom: 20,
  },
  navigationButton: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
  },
  next: {
    float: 'right',
  },
  arrow: {
    backgroundColor: '#16A9D0',
    borderRadius: '50%',
    color: '#fff',
    padding: 3,
  },
  saveContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveButton: {
    display: 'none',
    borderRadius: 20,
    width: 180,
    backgroundColor: theme.palette.customColor.primary,
  },
}));
