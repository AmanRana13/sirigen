import {makeStyles} from 'tss-react/mui';

export const schedulerFormStyle = makeStyles()((theme: any) => ({
  container: {
    width: '60%',
    margin: 'auto',
  },
  card: {
    borderRadius: '16px',
    boxShadow: '0px 8px 24px #00000029',
  },
  header: {
    fontSize: '26px',
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000000',
    marginBottom: '30px',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    textAlign: 'left',
    font: 'normal normal bold 16px Source Sans Pro',
    letterSpacing: 0,
    color: '#000000',
    opacity: 1,
    paddingLeft: '40px',
  },
  actionBtn: {
    color: '#ffffff',
    borderRadius: 24,
    width: 163,
    height: 45,
    boxShadow: '0px 10px 15px #007e9a26',
    opacity: 1,
    margin: '30px 0',
    backgroundColor: '#00A9CF',
    '&:hover': {
      backgroundColor: '#00b9e2',
    },
  },
  error: {
    border: '1px solid red',
  },
}));
