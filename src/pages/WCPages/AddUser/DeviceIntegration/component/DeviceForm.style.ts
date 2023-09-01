import {makeStyles} from 'tss-react/mui';

export const deviceFormStyle = makeStyles()(() => ({
  container: {
    display: 'flex',
    padding: '24px 0',
  },
  fieldContainer: {
    width: '300px',
  },
  buttonWrapper: {
    marginLeft: '24px',
    '& button': {
      marginTop: '30px',
    },
  },
}));
