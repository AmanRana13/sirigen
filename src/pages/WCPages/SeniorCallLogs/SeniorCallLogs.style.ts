import {makeStyles} from 'tss-react/mui';

export const seniorCallLogsStyle = makeStyles()(() => ({
  container: {
    //margin: '10px 5%',
    marginBottom: 50,
  },
  tableContainer: {
    width: '80%',
    margin: 'auto',
    borderRadius: 16,
  },
  capitalize: {
    textTransform: 'capitalize',
  },
  noData: {
    borderBottom: 'none',
    height: '15vh',
  },
  tableHeader: {
    fontSize: 15,
    fontWeight: 800,
  },
  tableBody: {
    fontSize: 13,
  },
}));
