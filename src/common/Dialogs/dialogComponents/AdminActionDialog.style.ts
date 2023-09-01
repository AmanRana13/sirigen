import {makeStyles} from 'tss-react/mui';

export const adminActionDialogStyle = makeStyles()((theme: any) => ({
  container: {
    display: 'flex',
    padding: '25px',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'baseline',
    backgroundColor: theme.palette.customColor.white,
    maxWidth: 674,
    width: 674,
    //height: 214,
    borderRadius: '16px',
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
  dialogTitle: {
    padding: 0,
  },
  content: {
    width: '100%',
    textAlign: 'center',
    padding: 0,
    paddingLeft: 50,
    paddingRight: 50,
    //marginBottom: 43,
    //paddingTop: 20,
    //paddingBottom: 20,

    '& p': {
      fontSize: 20,
    },
  },
  buttonContainer: {
    width: '100%',
    padding: 0,
    justifyContent: 'center',
  },
  warningIcon: {
    color: theme.palette.error.light,
    width: 34,
    height: 28,
    marginBottom: -4,
  },
}));
