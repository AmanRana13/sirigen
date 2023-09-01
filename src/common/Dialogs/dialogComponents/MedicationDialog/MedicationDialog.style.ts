import {makeStyles} from 'tss-react/mui';

export const medicationDialogStyles = makeStyles()((theme: any) => ({
  heading: {
    color: theme.palette.customColor.primaryLight,
  },
  dialogTitle: {
    backgroundColor: theme.palette.customColor.resourcesHeader,
    padding: '30px 30px',
    textAlign: 'end',
    height: 98,
  },
  dialogTitleName: {
    display: 'flex',
    height: '100%',
    alignItems: 'center',
  },
  dialogHeader: {
    display: 'flex',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleNameFontStyle: {
    fontSize: 32,
  },
  closeIcon: {
    fontSize: 42,
    fontWeight: 100,
    cursor: 'pointer',
  },
  errorText: {
    color: theme.palette.customColor.error,
  },
  clearBtn: {
    cursor: 'pointer',
    color: theme.palette.customColor.primaryLight,
    padding: '0 0 0 11px',
    textDecoration: 'underline',
  },
  checkbox: {
    color: theme.palette.text.primary,
  },
  infoIcon: {
    fontSize: 17,
    marginRight: 4,
  },
  disable: {
    color: theme.palette.customColor.disabledRemove,
  },
  incomplete: {
    display: 'flex',
    alignItems: 'center',
    fontSize: 20,
    fontWeight: 500,
    justifyContent: 'center',
    color: theme.palette.error.light,
    '& img': {
      marginRight: 10,
    },
  },
}));
