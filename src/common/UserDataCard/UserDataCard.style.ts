import {makeStyles} from 'tss-react/mui';

export const UserDataCardStyle = makeStyles()((theme: any) => ({
  userCard: {
    background: theme.palette.background.default,
    boxShadow: '0 2px 8px 0 rgba(0, 0, 0, 0.33)',
    borderRadius: '8px',
    padding: '15px',
    cursor: 'pointer',
  },
  assignButton: {
    color: theme.palette.customColor.primaryLight,
    fontSize: '16px',
    fontWeight: 600,
    margin: '10px 17px 0 3px',
  },
  image: {
    height: '100%',
    width: '100%',
  },
  imageBorder: {
    border: `solid 1px ${theme.palette.customColor.borderGrey}`,
    backgroundColor: theme.palette.customColor.imageBorder,
    color: '#000',
    fontSize: '20px',
    fontWeight: 'normal',
  },
}));
