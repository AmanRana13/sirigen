import {useState} from 'react';
import moment from 'moment-timezone';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import {PickersDay} from '@mui/x-date-pickers/PickersDay';
import {DatePicker} from '@mui/x-date-pickers';
import {Box, TextField, useTheme} from '@mui/material';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import {styled} from '@mui/material/styles';

import {OpenPickerIcon} from 'common/InputFields/component/Input.component';

export default function WeekPicker({setCurrentWeek}: any) {
  const theme: any = useTheme();
  const [selectedDate, setSelectedDate] = useState(moment().startOf('week'));

  const handleWeekChange = (val: any) => {
    const date = moment(val);
    const dt = date.startOf('week');
    setSelectedDate(dt);
    setCurrentWeek(dt);
  };

  const CustomPickersDay = styled(PickersDay, {
    shouldForwardProp: (prop) =>
      prop !== 'dayIsBetween' && prop !== 'isFirstDay' && prop !== 'isLastDay',
  })(({theme, dayIsBetween, isFirstDay, isLastDay}: any) => ({
    ...(dayIsBetween && {
      borderRadius: 0,
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
      '&:hover, &:focus': {
        backgroundColor: theme.palette.primary.dark,
      },
    }),
    ...(isFirstDay && {
      borderTopLeftRadius: '50%',
      borderBottomLeftRadius: '50%',
    }),
    ...(isLastDay && {
      borderTopRightRadius: '50%',
      borderBottomRightRadius: '50%',
    }),
  }));

  const renderWeekPickerDay = (
    dt: any,
    selectedDates: any,
    pickersDayProps: any,
  ) => {
    const date = moment(dt).clone();
    if (!selectedDate) {
      return <PickersDay {...pickersDayProps} />;
    }

    const start = selectedDate.clone().startOf('week');
    const end = selectedDate.clone().endOf('week');

    const dayIsBetween = date.isBetween(start, end, null, '[]');
    const isFirstDay = date.isSame(start, 'day');
    const isLastDay = date.isSame(end, 'day');

    return (
      <CustomPickersDay
        {...pickersDayProps}
        disableMargin
        dayIsBetween={dayIsBetween}
        isFirstDay={isFirstDay}
        isLastDay={isLastDay}
      />
    );
  };

  const navigatePrevWeek = () => {
    const prevWeek = moment(selectedDate).subtract(1, 'week');
    handleWeekChange(prevWeek);
  };

  const navigateNextWeek = () => {
    const nextWeek = moment(selectedDate).add(1, 'week');
    const selectedWeek = moment(selectedDate)
      .clone()
      .startOf('week')
      .format('L');
    const currentWeek = moment().clone().startOf('week').format('L');
    if (selectedWeek == currentWeek) {
      return false;
    }
    handleWeekChange(nextWeek);
  };

  return (
    <Box display='flex' alignItems='center' data-testid='week-picker'>
      <NavigateBeforeIcon
        style={{
          cursor: 'pointer',
          color: theme.palette.customColor.primaryGreen,
        }}
        onClick={navigatePrevWeek}
      />
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          renderInput={(params) => (
            <TextField
              {...params}
              inputProps={{...params.inputProps, readOnly: true}}
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
          components={{
            OpenPickerIcon: OpenPickerIcon,
          }}
          value={selectedDate}
          disableFuture
          // autoOk
          // disableToolbar
          InputProps={{
            disableUnderline: true,
            style: {
              borderRadius: 5,
              backgroundColor: 'white',
              width: 160,
              paddingLeft: 8,
              paddingRight: 8,
              border: `1px solid ${theme.palette.customColor.lighterBlack}`,
            },
          }}
          onChange={handleWeekChange}
          inputFormat="'Week of' MM/dd"
          renderDay={renderWeekPickerDay}
        />
      </LocalizationProvider>
      <NavigateNextIcon
        style={{
          cursor: 'pointer',
          color: theme.palette.customColor.primaryGreen,
        }}
        onClick={navigateNextWeek}
      />
    </Box>
  );
}
