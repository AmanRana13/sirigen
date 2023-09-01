import {makeStyles} from 'tss-react/mui';

export const seniorCareInsightsStyle = makeStyles()((theme: any) => ({
  container: {
    marginBottom: 50,
  },
  contanctInfoContainer: {
    backgroundColor: theme.palette.customColor.white,
    width: '100%',
    borderRadius: '0 0 8px 8px',
    padding: 10,
    boxShadow: `0 8px 24px ${theme.palette.customColor.boxShadow}`,
  },
  seniorImage: {
    height: 60,
    width: 60,
  },
  detailText: {
    wordBreak: 'break-all',
  },
  detailContainer: {
    display: 'flex',
    //alignItems: 'center',
  },
  thresholdNav: {
    marginTop: 35,
    borderBottom: `2px solid ${theme.palette.customColor.primary}`,
  },
  thresholdNavButton: {
    backgroundColor: theme.palette.customColor.white,
    color: theme.palette.customColor.primary,
    borderRadius: '15px 15px 0 0',
    position: 'relative',
    bottom: 4,
    width: '100%',
    height: 45,
    '&:hover': {
      backgroundColor: theme.palette.customColor.white,
      color: theme.palette.customColor.primary,
    },
  },
  filledButton: {
    backgroundColor: theme.palette.customColor.primary,
    color: theme.palette.customColor.white,
    '&:hover': {
      backgroundColor: theme.palette.customColor.primary,
      color: theme.palette.customColor.white,
    },
    pointerEvents: 'none',
  },
  infoIcon: {
    fontSize: 16,
    marginLeft: 6,
    marginTop: 3,
  },
  navTabs: {
    display: 'flex',
    alignItems: 'center',
  },
  settingContainer: {
    backgroundColor: theme.palette.customColor.white,
    boxShadow: `0 8px 12px ${theme.palette.customColor.boxShadow}`,
    borderRadius: `0 0 16px 16px`,
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'row',
    marginTop: 3,
  },
  leftPane: {
    height: '100%',
    backgroundColor: theme.palette.customColor.primary,
  },
  inActiveIndicator: {
    borderRadius: '50%',
    height: 10,
    width: 10,
    backgroundColor: theme.palette.customColor.red,
    border: `1px solid ${theme.palette.customColor.white}`,
  },
  activeIndicator: {
    backgroundColor: theme.palette.customColor.green,
    borderWidth: 0,
  },
  vitalContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: 7,
    paddingRight: 7,
    zIndex: 1,
    cursor: 'pointer',
  },
  vitalList: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    height: 40,
  },
  selectedVital: {
    backgroundColor: theme.palette.customColor.white,
    color: theme.palette.customColor.primary,
    borderRadius: '5px 0 0 5px',
    zIndex: 3,
  },
  line: {
    width: '100%',
    borderBottom: `1px solid ${theme.palette.customColor.ligthGrey}`,
    margin: '45px 0px',
  },
  separator: {
    //width: '90%',
    marginLeft: 13,
    marginRight: 10,
    borderBottom: `1px solid ${theme.palette.customColor.ligthGrey}`,
    margin: '0 auto',
    position: 'relative',
    left: 2,
    zIndex: 1,
  },
  tooltip: {
    backgroundColor: theme.palette.customColor.white,
    color: theme.palette.customColor.black,
    width: 250,
    boxShadow: `0px 8px 12px ${theme.palette.customColor.boxShadow}`,
  },
  iconSize: {
    fontSize: theme.typography.body1.fontSize,
  },
  count: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.palette.customColor.white,
    color: theme.palette.customColor.primary,
    height: 16,
    width: 16,
    borderRadius: '50%',
    marginLeft: 1,
    position: 'relative',
    bottom: 3,
  },
  headingVital: {
    display: 'flex',
    height: 40,
    alignItems: 'center',
  },
  disableVital: {
    backgroundColor: 'darkgrey',
    cursor: 'default',
  },
}));
