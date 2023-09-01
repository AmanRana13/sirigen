import {makeStyles} from 'tss-react/mui';

export const mapComponentStyle = makeStyles()((theme: any) => ({
  mapContainer: {
    height: '100%',
    width: '100%',

    //override root styling of the infoWindow in google map API
    '& .gm-style .gm-style-iw-c': {
      borderRadius: 0,
      padding: '7px 0 0 9px',
      border: 'solid 1px #bab8b8',

      //overriding the styling of the cross icon in infoWindow
      '& .gm-ui-hover-effect span': {
        width: '28px !important',
        height: '28px !important',
      },
      '& .gm-ui-hover-effect': {
        right: '10px !important',
      },
    },
  },
  mapBackgroundColor: {
    backgroundColor: theme.palette.customColor.mapBackground,
  },
}));
