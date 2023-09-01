import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from 'hooks/reduxHooks';
import clsx from 'clsx';
import moment from 'moment';
import 'moment-timezone';
import {Box, Button, TextField, Typography, useTheme} from '@mui/material';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';

import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

import {
  SET_CURRENT_STATE,
  SET_START_END_TIME,
  RE_RENDER_GRAPH,
} from '../WellnessDashboard.types';
import WeekPicker from './WeekPicker.component';
import MonthPicker from './MonthPicker.component';
import {wellnessDashboardStyle} from '../WellnessDashboard.style';
import {DATE_FORMAT} from 'globals/global.constants';
import {getCurrentSenior} from 'globals/global.functions';
import {getTimezoneFullAbbr} from 'globals/date.functions';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import {OpenPickerIcon} from 'common/InputFields/component/Input.component';

export const OpenCalenderIcon = () => {
  return <CalendarTodayIcon fontSize='small' />;
};

const WellnessWrapper = ({children, wellnessParam}: any) => {
  const theme: any = useTheme();
  const {classes} = wellnessDashboardStyle();
  const {currentState} = useAppSelector(
    (state: any) => state.wellnessDashboard,
  );
  const dispatch: any = useAppDispatch();
  const [buttonState, setButtonState] = useState('day');
  const [selectedDay, handleDayChange] = useState<any>(new Date());

  const {timezone}: any = getCurrentSenior();

  useEffect(() => {
    setButtonState(currentState);
    handleDayChange(new Date());
    switch (currentState) {
      case 'day':
        setCurrentDay();
        return;
      case 'week':
        setCurrentWeek();
        return;
      case 'month':
        setCurrentMonth();
        return;
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentState]);

  useEffect(() => {
    return () => {
      dispatch({
        type: SET_START_END_TIME,
        startTime: '',
        endTime: '',
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setCurrentDay = (currentDate = moment().format('L')) => {
    let startT: any = '';
    let endT: any = '';

    startT =
      moment(currentDate, DATE_FORMAT).startOf('day').valueOf() * 1000000;
    endT = moment(currentDate, DATE_FORMAT).endOf('day').valueOf() * 1000000;

    dispatch({
      type: SET_START_END_TIME,
      startTime: startT,
      endTime: endT,
    });

    dispatch({type: RE_RENDER_GRAPH, value: true});
  };

  const setCurrentWeek = (dt?: any) => {
    let startOfWeek = moment(dt).clone().startOf('week').format('x');
    let endOfWeek = moment(dt).clone().endOf('week').format('x');

    dispatch({
      type: SET_START_END_TIME,
      startTime: parseInt(startOfWeek) * 1000000,
      endTime: parseInt(endOfWeek) * 1000000,
    });
    dispatch({type: RE_RENDER_GRAPH, value: true});
  };

  const setCurrentMonth = (mnth?: any) => {
    let startOfMonth = moment(mnth).clone().startOf('month').format('x');
    let endOfMonth = moment(mnth).clone().endOf('month').format('x');

    dispatch({
      type: SET_START_END_TIME,
      startTime: parseInt(startOfMonth) * 1000000,
      endTime: parseInt(endOfMonth) * 1000000,
    });
    dispatch({type: RE_RENDER_GRAPH, value: true});
  };

  const setWellnessState = (state: any) => {
    if (currentState !== state) {
      dispatch({type: RE_RENDER_GRAPH, value: false});
      dispatch({type: SET_CURRENT_STATE, currentState: state});
    }
  };

  const navigatePrevDay = () => {
    const prevDate = moment(selectedDay).subtract(1, 'd');
    handleDayChange(prevDate);
    setCurrentDay(prevDate.format(DATE_FORMAT));
  };

  const navigateNextDay = () => {
    const nextDate = moment(selectedDay).add(1, 'd');
    if (moment(selectedDay).format('L') == moment().format('L')) {
      return false;
    }
    handleDayChange(nextDate);
    setCurrentDay(nextDate.format(DATE_FORMAT));
  };

  return (
    <Box width='100%'>
      <Box className={classes.wellnessContainer} data-testid='wellness-wrapper'>
        <Box>
          <Button
            className={clsx([classes.wellnessButton], {
              [classes.selectedButton]: buttonState == 'day',
            })}
            variant='contained'
            color='primary'
            data-testid='day-button'
            onClick={setWellnessState.bind(null, 'day')}>
            Day
          </Button>
          <Button
            className={clsx([classes.wellnessButton], {
              [classes.selectedButton]: buttonState == 'week',
            })}
            variant='contained'
            color='primary'
            data-testid='week-button'
            onClick={setWellnessState.bind(null, 'week')}>
            Week
          </Button>
          <Button
            className={clsx([classes.wellnessButton], {
              [classes.selectedButton]: buttonState == 'month',
            })}
            variant='contained'
            color='primary'
            data-testid='month-button'
            onClick={setWellnessState.bind(null, 'month')}>
            Month
          </Button>
        </Box>
        <Box display='flex' alignItems='center'>
          {wellnessParam === 'sleep' && (
            <>
              <InfoOutlinedIcon style={{marginRight: 5}} />
              <Typography variant='body1' style={{marginRight: 15}}>
                Sleep graph data is displayed based on the &nbsp;
                {getTimezoneFullAbbr(timezone)}
              </Typography>
            </>
          )}
          {currentState === 'day' && (
            <Box display='flex' alignItems='center' data-testid='day-picker'>
              <NavigateBeforeIcon
                style={{
                  cursor: 'pointer',
                  color: theme.palette.customColor.primaryGreen,
                }}
                onClick={navigatePrevDay}
              />
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Box htmlFor='date' component='label' hidden>
                  Date
                </Box>
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
                  label=''
                  disableFuture
                  value={selectedDay}
                  onChange={(day) => {
                    const date = moment(day).format(DATE_FORMAT);
                    setCurrentDay(date);
                    handleDayChange(day);
                  }}
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
                />
              </LocalizationProvider>

              <NavigateNextIcon
                style={{
                  cursor: 'pointer',
                  color: theme.palette.customColor.primaryGreen,
                }}
                onClick={navigateNextDay}
              />
            </Box>
          )}
          {currentState === 'week' && (
            <WeekPicker
              wellnessParam={wellnessParam}
              setCurrentWeek={setCurrentWeek}
            />
          )}
          {currentState === 'month' && (
            <MonthPicker
              wellnessParam={wellnessParam}
              setCurrentMonth={setCurrentMonth}
            />
          )}
        </Box>
      </Box>
      <Box mt={2}>{children}</Box>
    </Box>
  );
};
export {WellnessWrapper};
