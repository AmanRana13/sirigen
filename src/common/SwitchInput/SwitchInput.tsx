import React from 'react';

import {Switch, Box, Typography} from '@mui/material';
import {containerStyle, switchStyle} from './SwitchInput.style';
import {ISwitchInputProps} from './SwitchInput.types';

const SwitchInput = ({
  label,
  checked = false,
  handleChange,
}: ISwitchInputProps) => {
  const classes: any = {...containerStyle().classes, ...switchStyle().classes};

  return (
    <Box className={classes.container} data-testid='switch-input-component'>
      {label && <Typography variant='h4'>{label}</Typography>}
      <Box className={classes.switchContainer}>
        <Switch
          classes={{
            root: classes.root,
            switchBase: classes.switchBase,
            thumb: classes.thumb,
            track: classes.track,
            checked: classes.checked,
          }}
          size='medium'
          checked={checked}
          onChange={handleChange}
          inputProps={{'aria-label': 'controlled'}}
          color='default'
        />
      </Box>
    </Box>
  );
};

export default SwitchInput;
