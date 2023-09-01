import React from 'react';
import {Controller} from 'react-hook-form';
import {InputSelect} from '../../../common/Input';
import clsx from 'clsx';
import MenuItem from '@mui/material/MenuItem';
import {Typography} from '@mui/material';
import {fieldsStyle} from '../Fields.style';

const SelectMenu = ({
  errorField,
  props,
  menuItems,
  defaultValue,
  errorText,
  control,
}: any) => {
  const {classes} = fieldsStyle();

  return (
    <>
      <Controller
        render={({field}) => {
          return (
            <InputSelect
              {...field}
              className={clsx(
                {[classes.inputSelectError]: errorField},
                {[classes.whiteBackground]: props.white},
              )}
              variant='outlined'
              displayEmpty
              inputProps={{
                classes: {
                  icon: classes.icon,
                },
              }}
              {...props}>
              <MenuItem value='' disabled={props.isSelectValueDisable ?? true}>
                Select
              </MenuItem>
              {menuItems.map((data: any) => (
                <MenuItem key={data} value={data}>
                  {data}
                </MenuItem>
              ))}
            </InputSelect>
          );
        }}
        defaultValue={defaultValue}
        name={props.name}
        control={control}
        rules={props.rules}
      />
      {errorText && (
        <Typography variant='subtitle1' className={classes.errorTextSelect}>
          {errorText}
        </Typography>
      )}
    </>
  );
};

export default SelectMenu;
