import {Controller} from 'react-hook-form';
import Box from '@mui/material/Box';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import clsx from 'clsx';

import {InputTimePicker} from 'common/Input';
import {commonStyle} from '../FormField.style';

const TimePicker = ({
  control = null,
  errorField = undefined,
  errorText = '',
  defaultValue = '',
  inputFormat = 'HH:mm',
  placeholder='HH:MM',
  ...props
}: any) => {
  const {classes} = commonStyle();
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Controller
          render={({field}: any) => (
            <InputTimePicker
              {...field}
              clearable
              //disableToolbar
              className={clsx({[classes.inputDateError]: errorField})}
              variant='inline'
              disableFuture
              autoOk
              inputProps={{
                placeholder: placeholder,
              }}
              InputProps={{
                disableUnderline: true,
                'data-testid': 'timePicker-component',
              }}
              invalidDateMessage=''
              inputFormat={inputFormat}
              disabled={props.disabled ? true : false}
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

export {TimePicker};
