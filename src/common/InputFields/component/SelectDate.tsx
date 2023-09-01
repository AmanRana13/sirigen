import {fieldsStyle} from '../InputFields.style';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import clsx from 'clsx';
import {InputDatePicker} from '../../Input';
import {DATE_FORMAT} from '../../../globals/global.constants';
import {Typography} from '@mui/material';

const SelectDate = ({
  label,
  errorField,
  disableFutureDate,
  props,
  errorText,
}: any) => {
  const {classes} = fieldsStyle();

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <InputDatePicker
        id={label}
        clearable
        //disableToolbar
        style={{marginBottom: 4}}
        className={clsx({[classes.inputDateError]: errorField})}
        variant='inline'
        //using data-error prop for autoscroll to the first error on the screen
        data-error={errorField ? 'error' : ''}
        disableFuture={disableFutureDate}
        autoOk
        inputProps={{
          placeholder: DATE_FORMAT,
        }}
        InputProps={{
          disableUnderline: true,
        }}
        invalidDateMessage=''
        format='MM/dd/yyyy'
        onAccept={
          props.onChange
            ? props.onChange
            : () => {
                return;
              }
        }
        onChange={
          props.onChange
            ? props.onChange
            : () => {
                return;
              }
        }
        value={() => {
          return null;
        }}
        disabled={props.disabled ? true : false}
      />

      {errorText && (
        <Typography variant='subtitle1' className={classes.errorTextSelect}>
          {errorText}
        </Typography>
      )}
    </LocalizationProvider>
  );
};

export default SelectDate;
