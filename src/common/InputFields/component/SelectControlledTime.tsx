import clsx from 'clsx';
import Box from '@mui/material/Box';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';

import {InputTimePicker} from './Input.component';
import {fieldsStyle} from '../InputFields.style';

const SelectControlledTime = ({inputProps, eventProps, ...props}: any) => {
  const {classes} = fieldsStyle();
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <InputTimePicker
        clearable
        className={clsx({[classes.inputDateError]: props.isError})}
        variant='inline'
        style={{marginBottom: 4}}
        autoOk
        InputProps={{
          disableUnderline: true,
          readOnly: props.readOnly || false,
        }}
        invalidDateMessage=''
        inputProps={{
          placeholder: 'HH:MM',
          ...inputProps,
          'data-error': props.isError ? 'error' : '',
        }}
        {...eventProps}
      />

      {props.isError && props.errorText && (
        <Box className={classes.errorTextSelect}>{props.errorText}</Box>
      )}
    </LocalizationProvider>
  );
};

export default SelectControlledTime;
