import {makeStyles} from 'tss-react/mui';

export const seniorWellnessInfoStyle = makeStyles()((theme: any) => ({
  seniorWellnessInfoContainer: {
    backgroundColor: theme.palette.customColor.white,
    borderRadius: 16,
    width: '100%',
    height: 152,
    padding: 25,
    boxShadow: '0 8px 24px 0 rgba(0, 0, 0, 0.16)',
  },

  detailContainer: {
    display: 'flex',
    width: '30%',
    marginBottom: 15,
  },
  detailLableContainer: {
    display: 'flex',
    alignItems: 'center',
    width: '35%',
  },
  detailValueContainer: {
    minWidth: '55%',
  },
  selectWidth: {
    width: '100%',
  },
  detailValues: {
    fontSize: 16,
    [theme.breakpoints.down('xl')]: {
      fontSize: 14,
    },
  },
}));
