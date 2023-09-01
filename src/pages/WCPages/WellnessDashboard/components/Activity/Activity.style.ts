import {makeStyles} from 'tss-react/mui';

export const activityStyle = makeStyles()((theme: any) => ({
  activitySummaryConatiner: {
    border: `1px solid ${theme.palette?.grey?.A200}`,
    height: 130,
    padding: 10,
    borderRadius: 8,
    textAlign: 'center',
  },
  activitySummaryTitle: {
    color: theme.palette?.customColor?.lighterBlack,
    textTransform: 'uppercase',
    fontSize: 11,
  },
  duration: {
    marginTop: 14,
    fontSize: 18,
  },
  goal: {
    color: theme.palette?.customColor?.lighterBlack,
    fontSize: 14,
  },
  activityGoalLabel: {
    color: theme.palette?.customColor?.lightBlack,
  },
}));
