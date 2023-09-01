import {makeStyles} from 'tss-react/mui';

export const notificationStyle = makeStyles()(() => ({
  container: {
    marginTop: 5,
    marginBottom: 5,
    width: '100%',
    backgroundColor: 'rgb(195,235,243)',
  },
  tableBorderStyle: {
    borderBottom: '1px solid rgba(199, 203, 204, 1)',
    padding: 5,
  },
  tableHeader: {
    verticalAlign: 'top',
    padding: 5,
  },
}));
