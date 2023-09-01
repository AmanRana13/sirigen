import {makeStyles} from 'tss-react/mui';

export const cIRangeMilestonesStyle = makeStyles()((theme: any) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    padding: '24px 36px 23px 36px',
    borderRadius: 16,
    boxShadow: '0 2px 8px 0 rgba(0, 0, 0, 0.16)',
    border: `solid 1px ${theme.palette.grey.A100}`,
    backgroundColor: theme.palette.background.default,
  },
  cIRangeHeader: {
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 30,
    alignItems: 'baseline',
  },

  cIRangeText: {
    color: theme.palette.customColor.primaryLight,
    margin: '5px 0px 0px 0px',
  },
}));
