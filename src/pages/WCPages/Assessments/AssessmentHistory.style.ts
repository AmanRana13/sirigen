import {makeStyles} from 'tss-react/mui';

export const assessmentHistoryStyle: any = makeStyles()(() => ({
  tableContainer: {
    border: '1px solid #c9c9c9',
    borderRadius: 10,
    marginBottom: 30,
  },
  tableInnerContainer: {
    padding: '0px 10px 20px 10px',
    height: 470,
  },
  table: {
    borderCollapse: 'collapse',
    minWidth: 650,
    position: 'relative',
    '& th,td': {
      fontSize: 16,
    },
  },
  tableHeadingText: {
    color: '#0186a5',
    fontWeight: 500,
    textAlign: 'center',
    margin: '20px 0 10px 0',
  },
  secondAbsoluteRow: {
    position: 'absolute',
    top: 0,
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
  },
  radioField: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    '& label': {
      margin: 0,
    },
  },
  view: {
    color: '#00a9cf',
    cursor: 'pointer',
  },
  noData: {
    borderBottom: 'none',
    height: '32vh',
    textAlign: 'center',
  },
  disabled: {
    color: '#aaaaaa',
  },
}));
