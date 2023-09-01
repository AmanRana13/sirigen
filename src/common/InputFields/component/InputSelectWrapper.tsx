import clsx from 'clsx';
import {Typography, MenuItem, Box} from '@mui/material';

import {IMenuItem} from 'pages/WCPages/Admin/formField.types';

import {InputSelect} from './Input.component';
import {fieldsStyle} from '../InputFields.style';

const InputSelectWrapper = (item: any) => {
  const {classes} = fieldsStyle();
  const {inputProps, eventProps, ...props} = item;
  return (
    <>
      <InputSelect
        className={clsx(
          {[classes.inputSelectError]: props.isError},
          {[classes.whiteBackground]: props.white},
          classes.menu,
        )}
        variant='outlined'
        displayEmpty
        inputProps={{
          ...inputProps,
          'data-testid': inputProps?.dataTestid,
          classes: {
            icon: classes.icon,
          },
        }}
        //using data-error prop for autoscroll to the first error on the screen
        data-error={props.isError ? 'error' : ''}
        {...eventProps}>
        <MenuItem
          value=''
          disabled={props.isSelectValueDisable ?? true}
          classes={{root: classes.selectedMenuColor}}>
          <Box
            style={{
              color: '#a7a7a7',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
            }}>
            {item.initialLabel || 'Select'}
          </Box>
        </MenuItem>
        {props.menuItems.map((data: IMenuItem) => (
          <MenuItem key={data.value} value={data.value}>
            {data.label}
          </MenuItem>
        ))}
      </InputSelect>

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
};

export default InputSelectWrapper;
