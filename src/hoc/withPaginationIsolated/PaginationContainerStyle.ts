import {makeStyles} from 'tss-react/mui';

export const useRowStyles = makeStyles()((theme: any) => ({
  root: {
    '& ul': {
      // paddingBottom: '2%',
      justifyContent: 'center',
      '& .Mui-selected': {
        color: theme.palette?.customColor?.white || 'white',
        background: theme.palette?.customColor?.primary || '#16a9d0',
        height: 24,
        minWidth: 24,
      },
    },
  },
  secondary: {
    backgroundColor: 'white',
    height: 32,
  },
  secondaryWithBorder: {
    backgroundColor: 'white',
    height: 32,
    borderRadius: '10px',
  },
  border: {
    border: '1px solid #c9c9c9',
    borderRadius: 10,
    marginBottom: 30,
    paddingBottom: 20,
  },
}));
