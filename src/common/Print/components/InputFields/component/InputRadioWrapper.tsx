import {FormControlLabel, RadioGroup, Typography} from '@mui/material';
import {fieldsStyle} from '../InputFields.style';
import {InputRadio} from './Input.component';

const InputRadioWrapper = (item: any) => {
  const {inputProps, eventProps, ...props} = item;
  const {classes} = fieldsStyle();
  return (
    <>
      <RadioGroup {...eventProps} className={props.className}>
        {props.radioItems.map((data: any) => {
          return (
            <FormControlLabel
              key={data.value}
              control={<InputRadio {...inputProps} />}
              value={data.value}
              label={
                props.showRadioLabel ? (
                  <Typography className={classes.labelStyle}>
                    {data.label}
                  </Typography>
                ) : (
                  ''
                )
              }
              className={classes.radioComponent}
            />
          );
        })}
      </RadioGroup>
    </>
  );
};

export default InputRadioWrapper;
