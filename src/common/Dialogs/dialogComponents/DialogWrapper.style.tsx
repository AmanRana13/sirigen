import {makeStyles} from 'tss-react/mui';

export const dialogWrapperStyle = makeStyles()((theme: any) => ({
  container: {
    display: 'flex',
    paddingBottom: 0,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'baseline',
    backgroundColor: theme.palette.customColor.white,
    width: '792px',
    borderRadius: '15px',
    '& h2': {
      fontWeight: theme.typography.fontWeightBold,
    },
    '&.wide': {
      padding: 0,
      width: '860px',
    },
  },
  content: {
    width: '100%',
    textAlign: 'start',
    padding: '0 120px',
    '&.wide': {
      padding: '0 30px',
    },
    '& p': {
      fontSize: 24,
    },
  },
  dialogTitle: {
    height: 96,
    fontSize: 32,
    fontWeight: '400',
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#6cf0ff',
    '&.MuiDialogTitle-root': {
      fontWeight: '400',
    },
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(2),
    top: theme.spacing(2),
    color: theme.palette.customColor.black,
  },
}));
