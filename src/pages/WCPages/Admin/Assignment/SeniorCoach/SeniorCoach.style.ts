import {makeStyles} from 'tss-react/mui';

export const seniorCoachsStyle = makeStyles()((theme: any) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    padding: '24px 36px 23px 36px',
    borderRadius: 16,
    boxShadow: '0 2px 8px 0 rgba(0, 0, 0, 0.16)',
    border: `solid 1px ${theme.palette.grey.A100}`,
    backgroundColor: theme.palette.background.default,
  },
  subContainer: {
    display: 'flex',
    flexDirection: 'column',
    padding: '24px 30px 30px 30px',
    borderRadius: 8,
    boxShadow: '0 2px 8px 0 rgba(0, 0, 0, 0.16)',
    backgroundColor: theme.palette.background.default,
  },
  header: {
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 18,
    alignItems: 'top',
  },

  mainHeadingText: {
    color: theme.palette.customColor.primaryLight,
    margin: '5px 0px 0px 0px',
    fontWeight: 'bold',
  },
  subHeadingText: {
    color: theme.palette.customColor.primaryLight,
    margin: '5px 0px 0px 0px',
  },
  wCButton: {
    border: 'solid 1px #00a9cf',
    color: 'white',
    padding: '8px 22px',
    fontWeight: '600',
    fontSize: '16px',
    borderRadius: 0,
  },
}));
