import {makeStyles} from 'tss-react/mui';

export const infoTooltipStyle = makeStyles()((theme: any) => ({
  tooltip: {
    backgroundColor: theme.palette.customColor.white,
    color: theme.palette.customColor.black,
    width: 239,
    boxShadow: ` 0 2px 8px ${theme.palette.customColor.boxShadow}`,
    border: 0,
    borderRadius: 8,
    paddingLeft: '12px',
    paddingRight: '12px',
  },
  tooltipArrow: {
    color: theme.palette.background.default,
  },
  infoIcon: {
    fontSize: 27,
    marginLeft: 5,
    marginTop: 3,
  },
}));
