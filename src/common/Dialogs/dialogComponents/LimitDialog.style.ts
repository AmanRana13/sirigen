import {makeStyles} from 'tss-react/mui';

export const limitDialogStyle = makeStyles()((theme: any) => ({
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: theme.palette.customColor.white,
    width: '430px',
    borderRadius: '15px',
    '& h2': {
      fontWeight: theme.typography.fontWeightBold,
    },
  },
  imageContainer: {
    textAlign: 'center',
    '& img': {
      width: '50%',
    },
    marginTop: '25px',
  },
  title: {
    paddingTop: 0,
    paddingBottom: '4px',
  },
  content: {
    color: 'red',
    width: '253px',
    textAlign: 'center',
    '& p': {
      fontSize: '18px',
    },
  },
  buttonStyle: {
    borderRadius: 20,
    fontSize: 16,
    width: 180,
    color: theme.palette.customColor.white,
    backgroundColor: theme.palette.customColor.primary,
    marginBottom: '20px',
    '&:hover': {
      backgroundColor: theme.palette.customColor.primary,
    },
  },
}));
