import {Controller} from 'react-hook-form';
import Box from '@mui/material/Box';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import clsx from 'clsx';

import {InputDatePicker} from 'common/Input';
import {commonStyle} from '../FormField.style';
import {DATE_FORMAT} from 'globals/global.constants';

const DatePicker = ({
  control = null,
  errorField = undefined,
  errorText = '',
  defaultValue = '',
  disablePast = false,
  maxDate = '',
  ...props
}: any) => {
  const {classes} = commonStyle();
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Controller
          render={({field}) => (
            <InputDatePicker
              {...field}
              clearable
              //disableToolbar
              className={clsx({[classes.inputDateError]: errorField})}
              variant='inline'
              autoOk
              disablePast={disablePast}
              inputProps={{
                placeholder: DATE_FORMAT,
                'data-testid': 'datePicker-component',
              }}
              InputProps={{
                disableUnderline: true,
              }}
              invalidDateMessage=''
              format='MM/dd/yyyy'
              disabled={props.disabled ? true : false}
              maxDate={maxDate}
            />
          )}
          name={props.name}
          defaultValue={defaultValue}
          control={control}
          rules={props.rules}
        />
        {errorText && (
          <Box className={classes.errorTextSelect}>{errorText}</Box>
        )}
      </LocalizationProvider>
    </>
  );
};

export {DatePicker};
