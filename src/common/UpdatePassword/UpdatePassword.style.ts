import {makeStyles} from 'tss-react/mui';

export const updatePasswordStyle = makeStyles()((theme: any) => ({
  inputField: {
    borderRadius: 7,
    '& .MuiOutlinedInput-root': {
      height: 40,
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: `${theme?.palette?.customColor?.borderBlue}!important`,
    },
  },
  visibility: {
    height: 18,
    width: 18,
  },
  errorText: {
    color: theme.palette.error.light,
  },
  successText: {
    color: theme?.palette?.customColor?.success,
  },
  infoText: {
    color: theme?.palette?.customColor?.info,
  },
  errorTextWrapper: {
    display: 'flex',
    alignItems: 'center',
    '& img': {
      marginRight: 8,
    },
  },

  mainContainer: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  choosePassword: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    minHeight: 395,
    borderRadius: 16,
    backgroundColor: theme?.palette?.customColor?.white,
    width: '928px',
  },
  headingText: {
    fontWeight: 'bold',
    paddingTop: 30,
  },
  welcomeContainer: {
    height: 180,
    width: '100%',
    borderRadius: 10,
    display: 'flex',
    position: 'relative',
    alignItems: 'center',
    backgroundColor: theme?.palette?.customColor?.welcome,
    marginBottom: 50,
    marginTop: 50,
  },
  welcomeImage: {
    position: 'absolute',
    bottom: 0,
    height: 220,
  },
  welcomeImageContainer: {
    width: 350,
    marginLeft: 30,
  },
  welcomeText: {
    color: theme.palette.customColor.white,
  },
  isError: {color: theme.palette.error.light},
  errorField: {
    borderRadius: 7,
    '& .MuiOutlinedInput-root': {
      height: 40,
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: `${theme.palette.error.light}!important`,
    },
  },
}));
