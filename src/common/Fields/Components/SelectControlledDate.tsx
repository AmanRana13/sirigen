import React from 'react';
import {fieldsStyle} from '../Fields.style';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {Controller} from 'react-hook-form';
import clsx from 'clsx';
import {InputControlledDatePicker} from '../../../common/Input';
import {
  DATE_ERROR_MESSAGE,
  DATE_FORMAT,
} from '../../../globals/global.constants';
import {Typography} from '@mui/material';

const SelectControlledDate = ({
  label,
  errorField,
  disableFutureDate,
  props,
  defaultValue,
  errorText,
  control,
  disabled,
}: any) => {
  const {classes} = fieldsStyle();
 
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Controller
        name={props.name}
        render={({field}: any) => {
          return (
            <InputControlledDatePicker
              {...props}
              {...field}
              id={label}
              clearable
              className={clsx({[classes.inputDateError]: errorField})}
              variant='inline'
              disableFuture={disableFutureDate}
              autoOk
              inputProps={{
                placeholder: DATE_FORMAT,
              }}
              InputProps={{
                disableUnderline: true,
              }}
              invalidDateMessage=''
              maxDateMessage={DATE_ERROR_MESSAGE.futureDateDisable}
              format='MM/dd/yyyy'
              disabled={disabled ? true : false}
            />
          );
        }}
        defaultValue={defaultValue}
        control={control}
        rules={props.rules}
      />
      {errorText && (
        <Typography variant='subtitle1' className={classes.errorTextSelect}>
          {errorText}
        </Typography>
      )}
    </LocalizationProvider>
  );
};

export default SelectControlledDate;
