import {makeStyles} from 'tss-react/mui';

export const containerStyle = makeStyles()((theme: any) => ({
  container: {
    display: 'flex',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.customColor.white,
    padding: '6px 5px 6px 15px',
    borderRadius: 12,
    height: 40,
    lineHeight: '29px',
    '& h4': {
      display: 'contents',
    },
  },
  switchContainer: {
    backgroundColor: theme.palette.customColor.white,
    marginLeft: 20,
    padding: '0px 3px',
    borderRadius: 10,
    width: 72,
  },
}));

export const switchStyle = makeStyles()((theme: any) => ({
  root: {
    padding: 0,
    width: 75,
  },
  switchBase: {
    padding: 1,
    '&.MuiSwitch-switchBase.Mui-checked': {
      transform: 'translateX(37px)',
    },
  },
  thumb: {
    color: theme.palette.primary.main,
    width: 23,
    height: 23,
    margin: 1,
  },
  track: {
    width: 20,
    height: 20,
    borderRadius: 20,
    backgroundColor: theme.palette.customColor.white,
    opacity: '1 !important',
    '&:after, &:before': {
      color: theme.palette.primary.main,
      fontSize: 15,
      fontWeight: 800,
      position: 'absolute',
      top: '0px',
      bottom: '0px',
    },
    '&:after': {
      content: "'On'",
      left: '4px',
    },
    '&:before': {
      content: "'Off'",
      right: '13px',
    },
  },
}));
