import React from 'react';
import {Box} from '@mui/material';
import clsx from 'clsx';

import {Label, InputText} from 'common/Input';
import {commonStyle} from '../FormField.style';

const InputTextBox = ({
  label = '',
  required = false,
  helperText = '',
  inline = false,
  unitValue = '',
  spacing = false,
  readOnly = false,
  register = null,
  multiline = false,
  extraComponent,
  center = false,
  errorField = undefined,
  errorText = '',
  input = 'label',
  defaultValue = '',
  ...props
}: any) => {
  const {classes} = commonStyle();
  return (
    <>
      <Box
        //border={errorField ? 1 : 0}
        //borderColor={errorField ? 'red' : 'transparent'}
        className={clsx(
          {[classes.inlineFormFieldDesc]: inline},
          {[classes.alignCenter]: center},
        )}
        marginRight={spacing ? 2 : 0}
        data-testid='inputTextBox-component'>
        <InputText
          fullWidth
          variant='outlined'
          multiline={multiline}
          defaultValue={defaultValue}
          placeholder={!multiline ? helperText : ''}
          InputProps={{
            readOnly: readOnly,
          }}
          className={clsx({[classes.errorField]: errorField})}
          inputProps={register}
          inputRef={register?.ref}
          {...props}
        />
        {extraComponent && <Box paddingLeft={1}>{extraComponent}</Box>}
        {multiline && (
          <Label className={classes.multilineHelperText}>{helperText}</Label>
        )}
        {unitValue && <Box paddingLeft={0.5}>{unitValue}</Box>}
      </Box>
      {errorText && <Box className={classes.errorText}>{errorText}</Box>}
    </>
  );
};

export {InputTextBox};
