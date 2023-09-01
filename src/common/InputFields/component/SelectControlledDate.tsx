import {fieldsStyle} from '../InputFields.style';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import clsx from 'clsx';
import {InputControlledDatePicker} from '../../Input';
import {DATE_FORMAT} from '../../../globals/global.constants';
import {Typography} from '@mui/material';

const SelectControlledDate = ({inputProps, eventProps, ...props}: any) => {
  const {classes} = fieldsStyle();
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <InputControlledDatePicker
        id={props.label}
        clearable
        style={{marginBottom: 4}}
        className={clsx({[classes.inputDateError]: props.isError})}
        variant='inline'
        autoOk
        InputProps={{
          disableUnderline: true,
          readOnly: props.readOnly || false,
        }}
        //using data-error prop for autoscroll to the first error on the screen
        inputProps={{
          placeholder: DATE_FORMAT,
          ...inputProps,
          'data-error': props.isError ? 'error' : '',
        }}
        {...eventProps}
        invalidDateMessage=''
        // maxDateMessage={DATE_ERROR_MESSAGE.futureDateDisable}
        format='MM/dd/yyyy'
      />

      {props.isError && props.errorText && (
        <Typography
          variant='subtitle1'
          className={clsx(
            {[classes.errorTextSelect]: true},
            {[classes.errorCustomStyle]: props.isErrorCustomeStyle},
          )}>
          {props.errorText}
        </Typography>
      )}
    </LocalizationProvider>
  );
};

export default SelectControlledDate;
