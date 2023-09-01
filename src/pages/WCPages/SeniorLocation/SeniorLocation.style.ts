import {makeStyles} from 'tss-react/mui';

export const seniorLocationStyle = makeStyles()((theme: any) => ({
  seniorLocationContainer: {
    backgroundColor: '#fff',
    padding: '30px 68px',
    borderRadius: '16px',
    boxShadow: '0 2px 8px 0 rgba(0, 0, 0, 0.16)',
  },
  mapContainer: {
    height: '65vh',
    width: '100%',
    borderRadius: 8,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapStyle: {
    borderRadius: 16,
  },
  locationDetailsLoader: {
    height: '132px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '20px',
    marginTop: '116px',
    borderRadius: 16,
    padding: 30,
    border: '1px solid #00a9cf',
  },
}));
