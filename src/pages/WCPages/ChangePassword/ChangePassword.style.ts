import {makeStyles} from 'tss-react/mui';

export const changePasswordStyle = makeStyles()((theme: any) => ({
  mainContainer: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  choosePassword: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    minHeight: 395,
    borderRadius: 16,
    backgroundColor: theme?.palette?.customColor?.white,
    width: '928px',
  },
}));
