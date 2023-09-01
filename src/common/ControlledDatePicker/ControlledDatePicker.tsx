import React from 'react';
import clsx from 'clsx';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

import {InputControlledDatePicker} from 'common/Input/Input.component';
import {InputAdornment, Box} from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {controlledDatePickerStyle} from './ControlledDatePicker.style';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';

const ControlledDatePicker = (props: any) => {
  const {
    onPrev,
    onNext,
    label,
    error,
    onNextMouseDown,
    onNextMouseUp,
    onPrevMouseDown,
    onPrevMouseUp,
    value,
    disablePrevArrow,
    disableNextArrow,
  } = props;
  const {classes} = controlledDatePickerStyle();

  return (
    <React.Fragment>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Box
          display='flex'
          alignItems='center'
          justifyContent='center'
          data-testid='controlledDatePicker'>
          {label && (
            <Box htmlFor='date' component='label'>
              {label}
            </Box>
          )}
          <Box display='flex' flexDirection='column'>
            <Box
              style={{
                visibility: error ? 'visible' : 'hidden',
              }}
              color='red'
              fontSize={12}
              ml={3}>
              *Required field
            </Box>

            <Box
              display='flex'
              mb={2}
              justifyContent='center'
              alignItems='center'>
              <NavigateBeforeIcon
                data-testid={`${label}-navigate-before`}
                className={clsx({
                  [classes.activeArrow]: value,
                  [classes.disabledArrow]: !value || disablePrevArrow,
                })}
                onClick={onPrev}
                onMouseDown={onPrevMouseDown}
                onMouseUp={onPrevMouseUp}
              />
              <InputControlledDatePicker
                {...props}
                className={error ? classes.error : classes.rootContainer}
                label=''
                InputProps={{
                  disableUnderline: true,
                  style: {width: 160, fontSize: 15},
                  endAdornment: (
                    <InputAdornment position='end'>
                      <CalendarTodayIcon style={{paddingRight: 8}} />
                    </InputAdornment>
                  ),
                }}
              />
              <NavigateNextIcon
                data-testid={`${label}-navigate-next`}
                className={clsx({
                  [classes.activeArrow]: value,
                  [classes.disabledArrow]: !value || disableNextArrow,
                })}
                onClick={onNext}
                onMouseDown={onNextMouseDown}
                onMouseUp={onNextMouseUp}
              />
            </Box>
          </Box>
        </Box>
      </LocalizationProvider>
    </React.Fragment>
  );
};

export default ControlledDatePicker;
