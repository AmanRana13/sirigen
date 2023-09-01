import 'date-fns';
import React, {useState} from 'react';
import {makeStyles} from 'tss-react/mui';
import moment from 'moment-timezone';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DesktopDatePicker} from '@mui/x-date-pickers/DesktopDatePicker';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import {Box, TextField, useTheme} from '@mui/material';

import {OpenPickerIcon} from 'common/InputFields/component/Input.component';

const monthPickerStyle = makeStyles()(() => ({
  root: {
    '& .MuiIconButton-root': {
      padding: '0 8px 0 0',
    },
  },
}));

export default function MonthPicker({setCurrentMonth}: any) {
  const theme: any = useTheme();
  const {classes} = monthPickerStyle();
  const [selectedDate, setSelectedDate] = useState<any>(new Date());

  const handleDateChange = (date: any) => {
    setCurrentMonth(date);
  };

  const navigatePrevMonth = () => {
    const prevMonth: any = moment(selectedDate).subtract(1, 'month');
    handleDateChange(prevMonth);
    setSelectedDate(prevMonth);
  };

  const navigateNextMonth = () => {
    const nextMonth: any = moment(selectedDate).add(1, 'month');
    const selectedMonth = moment(selectedDate)
      .clone()
      .startOf('month')
      .format('x');
    const currentMonth = moment().clone().startOf('month').format('x');
    if (selectedMonth == currentMonth) {
      return false;
    }
    handleDateChange(nextMonth);
    setSelectedDate(nextMonth);
  };

  return (
    <Box display='flex' alignItems='center' data-testid='month-picker'>
      <NavigateBeforeIcon
        style={{
          cursor: 'pointer',
          color: theme.palette.customColor.primaryGreen,
        }}
        onClick={navigatePrevMonth}
      />
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DesktopDatePicker
          renderInput={(params) => (
            <TextField
              {...params}
              inputProps={{...params.inputProps, readOnly: true}}
              className={classes.root}
              variant='standard'
              sx={{
                svg: {
                  '& .cls-1': {
                    fill: theme.palette.customColor.primaryGreen,
                  },
                },
              }}
            />
          )}
          // autoOk
          components={{
            OpenPickerIcon: OpenPickerIcon,
          }}
          // disableToolbar
          disableFuture
          InputProps={{
            disableUnderline: true,
            style: {
              backgroundColor: 'white',
              paddingLeft: 8,
              paddingRight: 8,
              borderRadius: 5,
              width: 160,
              border: `1px solid ${theme.palette.customColor.lighterBlack}`,
            },
          }}
          // format='MMMM yyyy'
          views={['year', 'month']}
          // variant='inline'
          value={selectedDate}
          onChange={setSelectedDate}
          onMonthChange={handleDateChange}
        />
      </LocalizationProvider>
      <NavigateNextIcon
        style={{
          cursor: 'pointer',
          color: theme.palette.customColor.primaryGreen,
        }}
        onClick={navigateNextMonth}
      />
    </Box>
  );
}
