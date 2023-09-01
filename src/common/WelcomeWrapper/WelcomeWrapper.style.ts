import {makeStyles} from 'tss-react/mui';

export const welcomeWrapperStyle = makeStyles()((theme: any) => ({
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
}));
