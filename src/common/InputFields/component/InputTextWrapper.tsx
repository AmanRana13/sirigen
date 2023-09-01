import React from 'react';
import clsx from 'clsx';
import {Box, Typography} from '@mui/material';

import {FontSize} from 'globals/enums';

import {InputText, InputMasked, Label} from './Input.component';
import {Masked} from '../Masked.component';
import {fieldsStyle} from '../InputFields.style';

interface IInputTextWrapper {
  inputProps: any;
  isLabel: boolean;
  name: string;
  onChange: () => void;
  inline: boolean;
  center: boolean;
  spacing: boolean;
  masked: boolean;
  multiline: boolean;
  defaultValue: string | number;
  placeholder: string;
  errorField: boolean;
  validated: boolean;
  readOnly: boolean;
  fontSize: FontSize;
  type: string;
  secondary: boolean;
  value: string | number;
  extraComponent: JSX.Element;
  bottomText: string;
  unitValue: string;
  errorText: string;
}

const InputTextWrapper = React.forwardRef((item: any, ref) => {
  const {inputProps, eventProps, withExtensionProps, ...props} = item;
  const {classes} = fieldsStyle();
  return (
    <>
      <Box
        className={clsx(
          {[classes.inlineFormFieldDesc]: props.inline},
          {[classes.alignCenter]: props.center},
        )}
        marginRight={props.spacing ? 2 : 0}>
        {props.masked ? (
          <InputMasked
            fullWidth
            autoComplete='off'
            className={clsx(
              {[classes.errorMasked]: props.isError},
              {[classes.validMasked]: props.validated === false},
            )}
            //using data-error prop for autoscroll to the first error on the screen
            inputComponent={Masked}
            {...{inputProps, 'data-error': props.isError ? 'error' : ''}}
            {...eventProps}
          />
        ) : (
          <InputText
            fullWidth
            variant='outlined'
            autoComplete='off'
            InputProps={{
              readOnly: props.readOnly,
              inputRef: ref,
            }}
            multiline={props.multiline}
            rows={props.rows}
            className={clsx(
              {[classes.multiline]: props.multiline === true && !props.isError},
              {[classes.errorField]: props.isError},
              {[classes.validInput]: props.validated === false},
              {[classes.fontLarge]: props.fontSize === 'large'},
              {[classes.removeSpinArrow]: props.type === 'number'},
              {[classes.secondary]: props.secondary === true},
              {[classes.withBorder]: props.withBorder && !props.isError},
            )}
            inputProps={{
              ...inputProps,
              'data-error': props.isError ? 'error' : '',
            }}
            {...eventProps}
          />
        )}
        {props.extraComponent && (
          <Box paddingLeft={1}>{props.extraComponent}</Box>
        )}
        {props.bottomText && (
          <Label className={classes.multilineHelperText}>
            {props.bottomText}
          </Label>
        )}
        {props.unitValue && (
          <Typography variant='subtitle1'>{props.unitValue}</Typography>
        )}
      </Box>

      {props.errorText && (
        <Typography
          variant='subtitle1'
          className={clsx(
            {[classes.errorText]: true},
            {[classes.errorCustomStyle]: props.isErrorCustomeStyle},
          )}>
          {props.errorText}
        </Typography>
      )}
    </>
  );
});

export default InputTextWrapper;
