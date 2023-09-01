import {makeStyles} from 'tss-react/mui';

export const commonStyle = makeStyles()(() => ({
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
    fontSize: 14,
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
  labelBold: {
    fontWeight: 'bold',
  },
  icon: {
    color: '#0186a5',
  },
}));
