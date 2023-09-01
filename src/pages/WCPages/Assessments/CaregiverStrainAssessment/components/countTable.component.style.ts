import {makeStyles} from 'tss-react/mui';

export const countTableStyle = makeStyles()(() => ({
  responseTableContainer: {
    justifyContent: 'right',
    maxWidth: '50%',
    border: '1px solid #c9c9c9',
    marginBottom: 30,
  },
  responseTable: {
    borderCollapse: 'collapse',
    maxWidth: '100%',
    align: 'right',
    '& th,td': {
      fontSize: 16,
    },
    '& tbody': {
      '& tr:last-child td, tr:last-child th': {border: 0},
    },
  },
  tableText: {
    color: '#000',
  },
  disabledText: {
    color: '#aaaaaa',
  },
}));
