import {makeStyles} from 'tss-react/mui';

const Headers = makeStyles()((theme: any) => ({
  container: {
    backgroundColor: '#FFF',
    height: '106px',
    borderRadius: '16px',
    boxShadow: '0 2px 8px 0 rgba(0, 0, 0, 0.16)',
    alignItems: 'center',
    padding: '0 30px',
    margin: '30px 0',
  },
  InnerContainer: {
    height: 'inherit',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  button: {
    color: 'white',
    padding: '8px 22px',
    fontWeight: '600',
    fontSize: '16px',
    borderRadius: 0,
    backgroundColor: '#6ba539',
  },
}));
export default Headers;
