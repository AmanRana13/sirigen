import React from 'react';
import clsx from 'clsx';
import {Label} from 'common/Input';

import {commonStyle} from '../FormField.style';

const LabelText = ({
  label = '',
  required = false,
  errorField = undefined,
  bold = false,
  ...props
}: any) => {
  const {classes} = commonStyle();
  return (
    <>
      <Label
        htmlFor={props.id}
        className={clsx(
          {[classes.labelBold]: bold},
          {
            [classes.errorTextStyle]: errorField,
          },
        )}
        data-testid='labelText-component'>
        {label}
        <span className={classes.errorTextSelect}>{required && `*`}</span>
      </Label>
    </>
  );
};

export {LabelText};
