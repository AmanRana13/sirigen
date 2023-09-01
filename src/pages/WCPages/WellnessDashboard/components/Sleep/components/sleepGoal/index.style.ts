import {makeStyles} from 'tss-react/mui';

export const goalStyle = makeStyles()((theme: any) => ({
  card: {
    height: '68px',
    margin: '18px 0 21px',
    padding: '11px 8px 15px 19px',
    borderRadius: '16px',
    boxShadow: '0 4px 19px 0 rgba(0, 0, 0, 0.16)',
    border: 'solid 1px #d3d3d3',
    backgroundColor: ' #fff',
    alignItems: 'center',
  },
  button: {
    maxWidth: '119px',
    minWidth: '80px',
    height: '40px',
    padding: '8px 17.9px 8px 18px',
    borderRadius: '19px',
    boxShadow: '0 10px 15px 0 rgba(0, 126, 154, 0.15)',
    color: '#fff',
    fontSize: '18px',
    fontWeight: 600,
  },
  input: {
    margin: '0 9px',
    maxWidth: '80px',
    height: '42px',
    borderRadius: '10px',
    backgroundColor: '#f1f7ed',
  },
}));
