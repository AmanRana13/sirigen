import {makeStyles} from 'tss-react/mui';

export const medicalInfoStyle = makeStyles()((theme: any) => ({
  medicalScheduleContainer: {
    display: 'flex',
    alignItems: 'center',
    width: 600,
    borderRadius: 7,
    marginBottom: 10,
  },
  autocomplete: {
    '& .MuiAutocomplete-input': {
      padding: '0px!important',
    },
  },

  medicalSchedule: {
    display: 'flex',
    paddingBottom: 4,
    alignItems: 'center',
    backgroundColor: '#EAF8F7',
    borderRadius: 7,
  },
  iconButtonStyle: {color: '#16A9D0'},
  buttonStyle: {
    borderRadius: 20,
    width: 200,
    backgroundColor: theme.palette.customColor.primary,
  },
  buttonStyle2: {
    borderRadius: 20,
    width: 240,
    backgroundColor: theme.palette.customColor.primary,
  },
  appendButtonStyle: {
    display: 'flex',
    marginTop: 10,
    justifyContent: 'flex-end',
  },
  cancelButtonStyle: {
    borderRadius: 20,
    width: 200,
    marginRight: 20,
    borderWidth: 1,
    borderColor: theme.palette.customColor.black,
  },
  buttonContainerStyle: {
    position: 'absolute',
    margin: 'auto',
    left: 0,
    right: 0,
    display: 'flex',
    width: '40%',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 6,
  },
  medicalInfoButtonContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  timePicker: {
    backgroundColor: '#FFF',
    borderRadius: 7,
    height: 37,
    padding: '3px 5px',
    marginTop: 5,
    '& input': {padding: '3px 0px'},
    '&&& :before': {
      borderBottom: 'none',
    },
    '&& :after': {
      borderBottom: 'none',
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: '#fff !important',
    },
  },
}));
