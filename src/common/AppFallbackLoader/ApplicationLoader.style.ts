import {makeStyles} from 'tss-react/mui';

export const loaderStyles = makeStyles()((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 999,
    color: '#fff',
  },
  loaderContainer: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    lineHeight: 4,
    '& div': {
      fontWeight: 600,
      fontSize: 16,
    },
  },
}));
