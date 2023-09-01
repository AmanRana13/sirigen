import {ACTIVITY_CARD_VARIANT} from 'globals/enums';
import {makeStyles} from 'tss-react/mui';

const getActivityTitleColor = (variant: ACTIVITY_CARD_VARIANT, theme: any) => {
  switch (variant) {
    case ACTIVITY_CARD_VARIANT.ACTIVITY:
      return theme.palette?.customColor?.activityGreen;
    case ACTIVITY_CARD_VARIANT.MODERATE:
      return theme.palette?.customColor?.moderateGreen;
    case ACTIVITY_CARD_VARIANT.INTENSE:
      return theme.palette?.customColor?.intenseGreen;
    default:
      return theme.palette?.customColor?.black;
  }
};

export const activityCardStyles = makeStyles<{
  variant: ACTIVITY_CARD_VARIANT;
}>()((theme: any, {variant}) => ({
  activityCard: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '16px',
    padding: '8px 16px',
    borderRadius: '8px',
    border: `solid 2px ${theme.palette?.customColor?.borderGrey}`,
  },
  percentageValue: {
    color: theme.palette?.customColor?.primaryGreen,
    fontSize: '40px',
    display: 'flex',
    alignItems: 'center',
    '& > span': {
      fontSize: '20px',
      marginLeft: '2px',
      color: theme.palette?.customColor?.lighterBlack,
    },
  },
  title: {
    color: getActivityTitleColor(variant, theme),
    fontWeight: '600',
    fontSize: '20px',
  },
  goal: {
    color: theme.palette?.customColor?.lighterBlack,
    fontSize: '19px',
  },
}));
