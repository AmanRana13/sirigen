import {makeStyles} from 'tss-react/mui';

export const dailyRecapDialogStyle = makeStyles()((theme: any) => ({
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'baseline',
    background: `${theme.palette.customColor.white} 0% 0% no-repeat padding-box`,
    boxShadow: `0px 2px 21px ${theme.palette.customColor.boxShadow}`,
    width: 363,
    borderRadius: 16,
    '& h2': {
      fontWeight: theme.typography.fontWeightBold,
    },
  },
  content: {
    padding: 15,
    width: '100%',
    textAlign: 'start',
    '& p': {
      fontSize: 24,
    },
    '&:first-child': {
      padding: 15,
    },
  },
  recapSummary: {
    background: `${theme.palette.customColor.white} 0% 0% no-repeat padding-box`,
    boxShadow: `0px 2px 21px ${theme.palette.customColor.boxShadow}`,
    borderRadius: 16,
    width: 328,
    textAlign: 'left',
    padding: 10,
    marginTop: 5,
  },
}));
