import {makeStyles} from 'tss-react/mui';

export const publicWrapperStyle = makeStyles()(() => ({
  container: {
    display: 'flex',
    width: '100%',
    minHeight: 395,
    borderRadius: 10,
    backgroundColor: '#FFF',
  },
  loginImageContainer: {
    position: 'relative',
    height: '100%',
  },
  loginImage: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    top: 0,
    padding: 40,
  },
  polygon: {
    height: '100%',
    width: '100%',
    borderRadius: '10px 0 0 10px',
    backgroundColor: '#03A9D0',
    clipPath: 'polygon(0 0, 90% 0, 100% 100%, 0% 100%)',
  },
  loginArea: {
    marginLeft: 'auto',
    display: 'flex',
    marginTop: 30,
    marginBottom: 30,
    flexDirection: 'column',
    alignItems: 'center',
    width: '40%',
  },
  welcomeText: {
    fontWeight: 'bold',
  },
  subText: {marginTop: 24},
  fieldArea: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '100%',
    height: '100%',
    padding: '20px 70px',
  },
  loginButton: {
    backgroundColor: '#00a9cf',
    color: '#FFF',
    fontSize: 19,
    fontWeight: 400,
    height: 35,
    borderRadius: 17.5,
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
  errorText: {
    height: 12,
    color: '#CC0000',
    paddingTop: 2,
  },
}));
