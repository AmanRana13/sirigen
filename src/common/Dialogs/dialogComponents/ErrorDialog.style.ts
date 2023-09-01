import {makeStyles} from 'tss-react/mui';

export const errorDialogStyle = makeStyles()((theme: any) => ({
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 21,
    backgroundColor: theme.palette.customColor.white,
    maxWidth: 739,
    width: 739,
    minHeight: 244,
    borderRadius: '15px',
    '& h2': {
      fontWeight: theme.typography.fontWeightBold,
    },
  },
  errorContainer: {
    display: 'flex',
    width: '100%',
    justifyContent: 'flex-end',
  },
  clearButton: {
    cursor: 'pointer',
    height: 24,
    width: 24,
  },
  imageContainer: {
    color: '#8ad83e',
  },
  title: {
    paddingTop: 0,
    paddingBottom: '4px',
  },
  errorCodeLabel: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fa400a',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    alignItems: 'center',
    textAlign: 'center',
    paddingLeft: 37,
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
