import React from 'react';
import {fieldsStyle} from '../Fields.style';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {Controller} from 'react-hook-form';
import clsx from 'clsx';
import moment from 'moment';
import {InputDatePicker} from '../../../common/Input';
import {
  DATE_ERROR_MESSAGE,
  DATE_FORMAT,
  INVALID_DATE,
} from '../../../globals/global.constants';
import {Typography} from '@mui/material';

const SelectDate = ({
  label,
  errorField,
  disableFutureDate,
  props,
  defaultValue,
  control,
  errorText,
}: any) => {
  const {classes} = fieldsStyle();

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Controller
        render={({field}) => (
          <InputDatePicker
            {...field}
            {...props}
            id={label}
            clearable
            //disableToolbar
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
            format='MM/dd/yyyy'
            disabled={props.disabled ? true : false}
          />
        )}
        name={props.name}
        defaultValue={defaultValue || null}
        control={control}
        rules={{
          ...props.rules,
          validate: {
            value: (value) => {
              if (disableFutureDate && moment(value).isAfter(new Date())) {
                return DATE_ERROR_MESSAGE.futureDateDisable;
              }
              if (value == INVALID_DATE) {
                return INVALID_DATE;
              }
            },
          },
        }}
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
