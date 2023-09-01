import {makeStyles} from 'tss-react/mui';

export const successDialogStyle = makeStyles()((theme: any) => ({
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: theme.palette.customColor.white,
    maxWidth: 674,
    width: 674,
    minHeight: 176,
    borderRadius: '15px',
    '& h2': {
      fontWeight: theme.typography.fontWeightBold,
    },
  },
  successContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    position: 'absolute',
    right: 27,
    top: 27,
  },
  clearButton: {
    cursor: 'pointer',
    height: 24,
    width: 24,
  },
  success: {
    color: '#8ad83e',
  },
  error: {
    color: '#f50202',
  },
  title: {
    paddingTop: 0,
    paddingBottom: '4px',
  },
  content: {
    display: 'flex',
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
