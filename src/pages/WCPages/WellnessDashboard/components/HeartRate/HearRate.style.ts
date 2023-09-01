import {makeStyles} from 'tss-react/mui';

export const heartRateStyle = makeStyles()((theme: any) => ({
  headerContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  activityContainer: {
    display: 'flex',
    width: '100%',
    height: 300,
    alignItems: 'center',
  },
  summaryBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    //height: 120,
    borderRadius: 10,
    border: `solid 1px ${theme.palette.customColor.borderGrey}`,
    padding: 5,
    textAlign: 'center',
  },
  summaryCircle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 120,
    width: 120,
    borderRadius: '50%',
    padding: 5,
    background: theme.palette.background.green,
  },
  summaryBoxLabel: {
    marginTop: 'auto',
    fontSize: 14,
    color: theme.palette.customColor.lighterBlack,
    textTransform: 'uppercase',
  },
  summaryBoxValue: {
    marginBottom: 'auto',
    fontSize: 14,
  },
  summaryBoxValueData: {
    fontWeight: 'Bold',
    fontSize: 20,
    color: theme.palette.customColor.primaryGreen,
  },
  currentRate: {
    fontSize: 35,
    marginRight: 2,
  },
  currentUnit: {
    color: theme.palette.customColor.lighterBlack,
  },
}));
