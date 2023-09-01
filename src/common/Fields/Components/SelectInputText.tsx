import React from 'react';
import {InputText, InputMasked, Label} from '../../../common/Input';
import clsx from 'clsx';

import {Masked} from '../Masked.component';
import {fieldsStyle} from '../Fields.style';
import {Box, Typography} from '@mui/material';

const SelectInputText = React.forwardRef(
  (
    {
      label,
      multiline,
      defaultValue,
      inline,
      center,
      spacing,
      masked,
      errorText,
      helperText,
      readOnly,
      errorField,
      validated,
      fontSize,
      secondary,
      extraComponent,
      bottomText,
      unitValue,
      props,
    }: any,
    ref = null,
  ) => {
    const {classes} = fieldsStyle();

    return (
      <>
        <Box
          //border={errorField ? 1 : 0}
          //borderColor={errorField ? 'red' : 'transparent'}
          className={clsx(
            {[classes.inlineFormFieldDesc]: inline},
            {[classes.alignCenter]: center},
          )}
          marginRight={spacing ? 2 : 0}>
          {masked ? (
            <InputMasked
              id={label}
              fullWidth
              variant='outlined'
              multiline={multiline}
              defaultValue={defaultValue}
              placeholder={helperText}
              InputProps={{
                readOnly: readOnly,
              }}
              className={clsx(
                {[classes.errorMasked]: errorField},
                {[classes.validMasked]: validated === false},
              )}
              inputProps={{inputRef: ref}}
              inputComponent={Masked}
              {...props}
            />
          ) : (
            <InputText
              id={label}
              fullWidth
              variant='outlined'
              multiline={multiline}
              defaultValue={defaultValue}
              placeholder={helperText}
              InputProps={{
                readOnly: readOnly,
              }}
              inputProps={{...props?.inputProps}}
              className={clsx(
                {[classes.errorField]: errorField},
                {[classes.validInput]: validated === false},
                {[classes.fontLarge]: fontSize === 'large'},
                {[classes.removeSpinArrow]: props.type === 'number'},
                {[classes.secondary]: secondary === true},
              )}
              inputRef={ref}
              {...props}
            />
          )}
          {extraComponent && <Box paddingLeft={1}>{extraComponent}</Box>}
          {bottomText && (
            <Label className={classes.multilineHelperText}>{bottomText}</Label>
          )}
          {unitValue && (
            <Typography variant='subtitle1'>{unitValue}</Typography>
          )}
        </Box>
        {errorText && (
          <Typography variant='subtitle1' className={classes.errorText}>
            {errorText}
          </Typography>
        )}
      </>
    );
  },
);

export default SelectInputText;
