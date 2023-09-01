import {makeStyles} from 'tss-react/mui';

export const seniorCallSchedulesStyle = makeStyles()((theme: any) => ({
  container: {
    //margin: '10px 5%',
    marginBottom: 50,
  },
  tableContainer: {
    width: '80%',
    margin: 'auto',
    borderRadius: 16,
  },
  tableHead: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
  tableHeadName: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#007E9A',
  },
  tableGroupHead: {
    textAlign: 'left',
    fontWeight: 'bold',
    fontSize: 16,
    color: '#007E9A',
  },
  seniorName: {
    color: '#007E9A',
  },
  noData: {
    borderBottom: 'none',
    height: '15vh',
    textAlign: 'center',
  },
  tableHeadStyle: {
    fontWeight: 800,
    fontSize: 15,
  },
  tableBodyStyle: {
    fontSize: 13,
  },
}));
