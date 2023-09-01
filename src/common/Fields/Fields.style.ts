import {makeStyles} from 'tss-react/mui';

export const fieldsStyle = makeStyles()((theme: any) => ({
  inlineFormFieldDesc: {
    display: 'flex',
    alignItems: 'flex-end',
  },
  alignCenter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  multilineHelperText: {
    color: '#AAA',
    lineHeight: 1.5,
  },
  errorTextStyle: {
    color: 'red',
  },
  inputDateError: {
    border: '1px solid #CC0000',
    borderWidth: '1px!important',
  },
  inputSelectError: {
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: '#CC0000!important',
    },
  },
  whiteBackground: {
    '& .MuiOutlinedInput-input': {
      backgroundColor: '#FFF!important',
    },
  },
  errorField: {
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: '#CC0000!important',
    },
  },
  errorText: {
    paddingTop: 2,
    color: '#CC0000',
  },
  errorTextSelect: {
    color: '#CC0000',
  },
  validInput: {
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: '#008000!important',
    },
  },
  errorMasked: {
    border: '1px solid #CC0000',
  },
  validMasked: {
    border: '1px solid #008000',
  },
  fontLarge: {
    '& .MuiOutlinedInput-input': {
      fontSize: 20,
      fontWeight: 600,
    },
  },
  removeSpinArrow: {
    // eslint-disable-next-line max-len
    '& input[type=number]::-webkit-inner-spin-button, & input[type=number]::-webkit-outer-spin-button':
      {
        '-webkit-appearance': 'none',
        margin: 0,
      },
  },
  secondary: {
    background: theme.palette.background.primary,
  },
  menuList: {
    textTransform: 'capitalize',
  },
  menuItem: {
    textTransform: 'capitalize',
  },
  icon: {
    color: '#0186a5',
  },
}));
