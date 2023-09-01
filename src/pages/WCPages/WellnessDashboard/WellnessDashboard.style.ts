import {makeStyles} from 'tss-react/mui';

export const wellnessDashboardStyle = makeStyles()((theme: any) => ({
  accordianRoot: {
    //margin: '10px 5%',
    marginBottom: 20,
    backgroundColor: theme.palette.background.green,
    boxShadow: '0 0 0 0',
    '&.MuiAccordion-rounded': {
      borderRadius: 10,
    },
    '&:before': {
      background: 'none',
    },
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  wellnessContainer: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
  },
  wellnessButton: {
    backgroundColor: theme.palette.common.white,
    boxShadow: '0 0 0 0',
    marginRight: 10,
    color: theme.palette.customColor.lighterBlack,
    border: `1px solid ${theme.palette.customColor.lighterBlack}`,
    '&:hover': {
      backgroundColor: theme.palette.common.white,
      color: theme.palette.customColor.lighterBlack,
    },
  },
  selectedButton: {
    backgroundColor: theme.palette.customColor.primaryGreen,
    color: theme.palette.common.white,
    '&:hover': {
      backgroundColor: theme.palette.customColor.primaryGreen,
      color: theme.palette.common.white,
    },
  },
  cardContainer: {
    backgroundColor: theme.palette.common.white,
    borderRadius: 17,
    boxShadow: `0 4px 19px ${theme.palette.customColor.boxShadow}`,
  },
  cardTitle: {
    color: theme.palette.customColor.lighterBlack,
    textTransform: 'uppercase',
    fontSize: 18,
  },
  lastRecordedTitle: {
    color: theme.palette.customColor.lighterBlack,
    fontSize: 18,
  },
  lastRecordedRelativeStyle: {
    bottom: 25,
    position: 'relative',
  },
  cardSubTitle: {
    color: theme.palette.customColor.primaryGreen,
    fontSize: 18,
  },
}));
