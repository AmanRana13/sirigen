import {InputSelect} from 'common/Input';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import {Controller} from 'react-hook-form';
import clsx from 'clsx';

import {commonStyle} from '../FormField.style';

const Menu = ({
  input = 'menu',
  menuItems = [],
  control = null,
  errorField = undefined,
  errorText = '',
  defaultValue = '',
  handleChange = {},
  ...props
}: any) => {
  const {classes} = commonStyle();
  return (
    <>
      <Controller
        render={({field}: any) => {
          return (
            <InputSelect
              {...field}
              className={clsx(
                {[classes.inputSelectError]: errorField},
                {[classes.whiteBackground]: props.white},
              )}
              variant='outlined'
              displayEmpty
              onChange={(e: any) => {
                field.onChange(e);
                handleChange(e.target.value);
              }}
              {...props}
              inputProps={{
                'data-testid': 'menu-component',
                classes: {
                  icon: classes.icon,
                },
              }}>
              <MenuItem value='' disabled>
                Select
              </MenuItem>
              {menuItems.map((data: any) => (
                <MenuItem key={data.key} value={data.key}>
                  {data.value}
                </MenuItem>
              ))}
            </InputSelect>
          );
        }}
        defaultValue={defaultValue}
        name={props.name}
        control={control}
        // value={props.value}
        rules={props.rules}
      />
      {errorText && <Box className={classes.errorTextSelect}>{errorText}</Box>}
    </>
  );
};

export {Menu};
