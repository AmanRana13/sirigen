import {makeStyles} from 'tss-react/mui';

export const resourcesDialogLayoutStyle = makeStyles()((theme: any) => ({
  dialogTitle: {
    backgroundColor: theme.palette.customColor.resourcesHeader,
    padding: '8px 30px',
    textAlign: 'end',
    height: 70,
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
    fontSize: '32px',
  },
  titleColor: {
    color: '#585757',
    minWidth: 117,
  },
  errorText: {
    color: theme.palette.customColor.error,
  },
  infoIcon: {
    fontSize: 27,
    marginLeft: 5,
    marginTop: 3,
  },
  closeIcon: {
    fontSize: 42,
    fontWeight: 100,
    cursor: 'pointer',
  },
  tooltip: {
    backgroundColor: theme.palette.customColor.white,
    color: theme.palette.customColor.black,
    width: 239,
    boxShadow: ` 0 2px 8px ${theme.palette.customColor.boxShadow}`,
    border: 0,
    borderRadius: 8,
  },
  tooltipArrow: {
    color: theme.palette.background.default,
  },
  urlInput: {
    '& .MuiOutlinedInput-root': {
      borderRadius: '10px !important',
      padding: '11.44px 11px !important',
    },
  },
  infoStyle: {
    wordBreak: 'break-all',
  },
}));

export const resourcesDetailStyle = makeStyles()((theme: any) => ({
  detailContainer: {
    display: 'flex',
    width: '50%',
    height: '100%',
    overflowWrap: 'break-word',
  },
  detailLableContainer: {
    display: 'flex',
    width: '40%',
  },
  detailValueContainer: {
    minWidth: '55%',
    padding: '0 10px',
  },
  selectWidth: {
    width: '100%',
  },
  detailValues: {
    fontSize: 16,
    [theme.breakpoints.down('xl')]: {
      fontSize: 14,
    },
  },
}));
