import {makeStyles} from 'tss-react/mui';

export const useMedicalCondtionStyle = makeStyles()((theme: any) => ({
  tableDataRow: {
    paddingLeft: 0,
    verticalAlign: 'top',
    borderBottom: '1px solid #707070',
  },
  optionsRadioField: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    '& .PrivateSwitchBase-root': {
      padding: '0px 0px 5px 0px',
    },
    '& .MuiFormControlLabel-label': {
      padding: '0px 0px 5px 10px',
    },
    '& label': {
      margin: 0,
    },
    '& .MuiFormControlLabel-root .MuiFormControlLabel-label.Mui-disabled ': {
      color: '#000000',
    },
  },
  tableBtn: {
    fontSize: '16px',
    padding: '0px',
    borderBottom: '1px solid #707070',
  },
  removeIcon: {
    color: '#00a9cf',
    cursor: 'pointer',
    display: 'flex',
    alignSelf: 'center',
    marginLeft: 5,
    width: '40px',
    height: '40px',
  },
  removeIconDisable: {
    color: '#A7A7A7!important',
    pointerEvents: 'none',
  },
  resolved: {
    color: theme?.palette?.customColor?.lightGrey,
    position: 'absolute',
    left: 0,
    bottom: '1rem',
  },
  resolve: {
    color: theme?.palette?.customColor?.highlight,
    textDecorationLine: 'underline',
    cursor: 'pointer',
    position: 'absolute',
    left: 0,
    bottom: '1rem',
  },
}));
