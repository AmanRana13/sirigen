import {makeStyles} from 'tss-react/mui';

export const messageActionDialogStyle = makeStyles()((theme: any) => ({
  container: {
    display: 'flex',
    padding: '0px 20px 30px 10px',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'baseline',
    backgroundColor: theme.palette.customColor.white,
    width: '600px',
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
    width: '100%',
    textAlign: 'start',
    paddingTop: 20,
    paddingBottom: 20,

    '& p': {
      fontSize: 24,
    },
  },
  buttonContainer: {
    width: '100%',
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
