import {makeStyles} from 'tss-react/mui';

export const alertDialogStyle = makeStyles()((theme) => ({
  line: {
    borderTop: 'solid 1px #707070',
    opacity: 0.2,
    width: '100%',
    marginLeft: 5,
  },
  tableContainer: {
    height: 362,
    border: 'solid 1px #707070',
    marginTop: 10,
  },
  table: {
    '& th': {
      borderBottom: '1px solid #000',
    },
    '& th,td': {
      padding: 10,
    },
  },
}));
