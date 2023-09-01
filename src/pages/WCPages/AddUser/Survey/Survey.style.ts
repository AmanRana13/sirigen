import {makeStyles} from 'tss-react/mui';

export const SurveyStyle = makeStyles()((theme: any) => ({
  container: {
    paddingLeft: 20,
    paddingBottom: 20,
    paddingRight: 20,
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
    zIndex: 100,
  },

  buttonStyle: {
    margin: '20px 0 0px',
  },
  iconButtonStyle: {color: '#16A9D0', marginTop: 20},

  cancelButtonStyle: {
    borderRadius: 20,
    width: 180,
    marginRight: 20,
    borderWidth: 1,
    borderColor: theme.palette.customColor.black,
  },
  autocomplete: {
    '& .MuiAutocomplete-input': {
      padding: '0px!important',
    },
  },
}));
