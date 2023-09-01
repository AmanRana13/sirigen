import {makeStyles} from 'tss-react/mui';

export const controlledDatePickerStyle = makeStyles()((theme: any) => ({
  rootContainer: {
    backgroundColor: 'white',
  },
  error: {
    backgroundColor: 'white',
    border: '1px solid red',
    borderWidth: '1px!important',
    '& .Mui-error': {
      width: 160,
    },
  },
  disabledArrow: {
    pointerEvents: 'none',
    color: `${theme.palette.customColor.disabled}!important`,
    cursor: 'pointer',
  },
  activeArrow: {
    pointerEvents: 'all',
    color: theme.palette.customColor.primaryGreen,
    cursor: 'pointer',
  },
}));
