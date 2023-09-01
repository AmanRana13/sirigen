import {makeStyles} from 'tss-react/mui';

export const sleepStyle = makeStyles()((theme: any) => ({
  headerContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  sleepCycleContainer: {
    display: 'flex',
    height: '100%',
  },
  cycleDataContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 5,
  },
  cycleData: {
    //flex: '0 50%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    height: 100,
    //width: 130,
    borderRadius: 10,
    border: `solid 5px ${theme.palette.customColor.sleepRed}`,
    padding: 5,
  },
  cycleDataValue: {
    marginTop: 'auto',
    fontWeight: 'bold',
    fontSize: 18,
  },
  cycleDataLabel: {
    marginTop: 'auto',
    color: theme.palette.customColor.lighterBlack,
    fontSize: 14,
  },
  sleepDataContainer: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  heartRateContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  sleepDepthContainer: {
    display: 'flex',
    position: 'relative',
    flexDirection: 'column',
    height: 200,
    width: '100%',
  },
  sleepDepthAwake: {
    backgroundColor: theme.palette.customColor.sleepGrey,

    width: 40,
    borderRadius: '25px 25px 0 0',
  },
  sleepDepthRem: {
    backgroundColor: theme.palette.customColor.remGreen,

    width: 40,
  },
  sleepDepthLight: {
    backgroundColor: theme.palette.customColor.moderateGreen,

    width: 40,
  },
  sleepDepthDeep: {
    backgroundColor: theme.palette.customColor.intenseGreen,
    width: 40,
    borderRadius: '0 0 25px 25px',
  },
  sleepWeekScoreContainer: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
  },
  sleepWeekScore: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sleepScoreListContainer: {
    width: '100%',
    display: 'flex',
    alignItems: 'flex-start',
    flexDirection: 'column',
  },
  sleepScoreList: {
    display: 'flex',
    width: '90%',
    padding: '0 10px 0 10px',
    justifyContent: 'space-between',
    borderBottom: `1px solid ${theme.palette.customColor.sleepGrey}`,
  },
  sleepScoreListItem: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sleepScoreListIcon: {
    backgroundColor: theme.palette.customColor.green,
    height: '10px',
    marginRight: 5,
    width: '10px',
    borderRadius: '50%',
  },
  childrenClass: {
    justifyContent: 'space-between !important',
    alignItems: 'baseline',
  },
}));
