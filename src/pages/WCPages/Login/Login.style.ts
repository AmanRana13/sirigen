import {makeStyles} from 'tss-react/mui';

export const loginStyle = makeStyles()((theme: any) => ({
  container: {
    display: 'flex',
    width: '100%',
    borderRadius: 10,
    backgroundColor: '#FFF',
  },
  loginArea: {
    marginLeft: 'auto',
    display: 'flex',
    paddingTop: 30,
    marginBottom: 30,
    flexDirection: 'column',
    alignItems: 'center',
    width: '40%',
  },
  inputField: {
    borderRadius: 7,
    '& .MuiOutlinedInput-root': {
      height: 40,
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: '#9B9B9B!important',
    },
  },
  visibility: {
    height: 18,
    width: 18,
  },
  loginImage: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    top: 0,
    padding: 40,
  },
  loginImageContainer: {
    position: 'relative',
    height: '100%',
  },
  polygon: {
    height: '100%',
    width: '100%',
    borderRadius: '10px 0 0 10px',
    backgroundColor: '#03A9D0',
    clipPath: 'polygon(0 0, 90% 0, 100% 100%, 0% 100%)',
  },
  errorText: {
    height: 12,
    color: '#CC0000',
    paddingTop: 2,
  },
}));
