import {makeStyles} from 'tss-react/mui';

export const locationInfoStyle = makeStyles()((theme: any) => ({
  locationInfoContainer: {
    backgroundColor: theme.palette.customColor.white,
    borderRadius: 16,
    padding: 30,
    border: `1px solid ${theme.palette.customColor.primaryGreen}`,
  },
  seniorImage: {
    height: 60,
    width: 60,
  },
  detailText: {
    wordBreak: 'break-word',
  },
  detailContainer: {
    display: 'flex',
  },
  locateMeButton: {
    borderRadius: 24,
    padding: '6px 8px 6px 6.6px',
    boxShadow: '0 10px 15px 0 rgba(0, 126, 154, 0.16)',
    color: theme.palette.common.white,
    '& img': {
      marginRight: 4,
    },
    '&:disabled': {
      backgroundColor: theme.palette.disabled.main,
      color: theme.palette.common.white,
    },
  },

  justifySpace: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: 0,
  },
  label: {
    color: theme.palette.customColor.primaryGreen,
    fontWeight: 600,
  },
  marginB20: {
    marginBottom: 20,
  },
  locateMeBox: {
    display: 'flex',
    alignItems: 'center',
    height: '100%',
  },
  locateMe: {width: 'fit-content', height: 'fit-content'},
  locateMeContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 16,
  },
  locateMeLoader: {width: '20%'},
  tooltip: {
    backgroundColor: theme.palette.customColor.white,
    color: theme.palette.customColor.black,
    width: 200,
    boxShadow: `0px 8px 24px ${theme.palette.customColor.boxShadow}`,
    border: `solid 1px ${theme.palette.customColor.primaryGreen}`,
  },
  tooltipArrow: {
    '&:before': {
      border: `solid 1px ${theme.palette.customColor.primaryGreen}`,
    },
    color: theme.palette.background.default,
  },
}));
