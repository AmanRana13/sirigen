import {makeStyles} from 'tss-react/mui';

export const careInsightsStyle = makeStyles()(() => ({
  tableContainer: {
    height: 200,
    borderRadius: 10,
  },
  table: {
    padding: 0,
    '& .MuiTableCell-sizeSmall': {
      padding: '6px 0 6px 16px',
    },
  },
  noDate: {
    borderBottom: 'none',
    height: '20vh',
    textAlign: 'center',
  },
  tableHeading: {
    fontWeight: 800,
    fontSize: 15,
  },
  tableBody: {
    fontSize: 13,
  },
}));
