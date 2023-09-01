import {makeStyles} from 'tss-react/mui';

export const wellnessIndicatorStyle = makeStyles()((theme: any) => ({
  customTooltip: {
    color: 'black',
    margin: '4px 0px',
    fontSize: 18,
    padding: '5px 15px',
    backgroundColor: 'white',
  },
  customArrow: {
    color: 'white',
  },
  wellnesIndicator: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 10,
    width: `100%`,
    backgroundColor: '#fff',
    borderRadius: 10,
    cursor: 'pointer',
  },
  wellnesIndicatorSleep: {
    display: 'flex',
    position: 'relative',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    width: `100%`,
    backgroundColor: '#fff',
    borderRadius: 10,
    cursor: 'pointer',
    height: '100%',
    marginRight: 10,
  },
  indicatorModified: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
    padding: 10,
    backgroundColor: '#79be27',
    borderRadius: 50,
  },
  indicatorModifiedSleep: {
    width: 80,
    height: 80,
  },
  sleepModified: {
    backgroundColor: '#DC143C',
  },
  locationContainer: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.palette.customColor.white,
    height: '319px',
    padding: 10,
    marginTop: 15,
    borderRadius: '16px',
    boxShadow: '0 2px 8px 0 rgba(0, 0, 0, 0.16)',
    border: 'solid 1px #d3d3d3',
  },
  locationTitle: {
    color: theme.palette.customColor.primaryGreen,
    fontWeight: 500,
  },
  locationValue: {
    fontWeight: 500,
  },
  mapStyle: {
    '& div[aria-roledescription="map"]': {
      cursor: 'pointer!important',
    },
  },
}));
