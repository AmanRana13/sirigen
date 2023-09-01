import {makeStyles} from 'tss-react/mui';

export const bodyHealthStyle = makeStyles()((theme: any) => ({
  headerContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  activityContainer: {
    display: 'flex',
    height: '100%',
    alignItems: 'center',
  },
  summaryBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    borderRadius: 10,
    border: `solid 1px ${theme.palette.customColor.borderGrey}`,
    padding: 5,
  },
  summaryCircle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 160,
    borderRadius: '50%',
    padding: 5,
    backgroundColor: theme.palette.background.green,
  },
  summaryBoxLabel: {
    marginTop: 'auto',
    fontSize: 14,
    color: theme.palette.customColor.lighterBlack,
  },
  summaryBoxValue: {
    marginBottom: 'auto',
    fontSize: 17,
    fontWeight: 'bold',
    color: theme.palette.customColor.primaryGreen,
  },
  summaryBoxValueData: {
    fontWeight: 'Bold',
    fontSize: 20,
    color: theme.palette.customColor.primaryGreen,
  },
  lastRecordedColor: {
    marginBottom: 'auto',
    fontSize: 17,
    color: theme.palette.customColor.lightBlack,
    fontWeight: 'bold',
  },
}));
