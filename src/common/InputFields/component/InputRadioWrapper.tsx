import {Typography, FormControlLabel, RadioGroup} from '@mui/material';

import {InputRadio} from './Input.component';
import {fieldsStyle} from '../InputFields.style';
import clsx from 'clsx';

const InputRadioWrapper = (item: any) => {
  const {classes} = fieldsStyle();
  const {inputProps, eventProps, ...props} = item;
  return (
    <>
      <RadioGroup
        {...eventProps}
        className={clsx(props.className, {
          [classes.errorTextSelect]: props.isError,
        })}>
        {props.radioItems.map((data: any) => {
          return (
            <FormControlLabel
              key={data.value}
              control={
                //using data-error prop for autoscroll to the first error on the screen
                <InputRadio
                  {...{
                    ...inputProps,
                    required: false,
                    'data-error': props.isError ? 'error' : '',
                  }}
                  dataTestid={`${data.value}${inputProps?.dataTestid}`}
                />
              }
              disabled={data.disabled}
              value={data.value}
              label={props.showRadioLabel ? data.label : ''}
            />
          );
        })}
      </RadioGroup>

      {props.errorText && (
        <Typography variant='subtitle1' className={classes.errorText}>
          {props.errorText}
        </Typography>
      )}
    </>
  );
};

export default InputRadioWrapper;
