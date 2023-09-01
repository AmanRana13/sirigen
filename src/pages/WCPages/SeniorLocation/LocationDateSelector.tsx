import React from 'react';
import {useAppDispatch, useAppSelector} from 'hooks/reduxHooks';
import moment from 'moment-timezone';
import {Box} from '@mui/material';

import {DATE_FORMAT, INVALID_DATE} from 'globals/global.constants';
import {getCurrentSenior} from 'globals/global.functions';
import {InputFields} from 'common/InputFields';
import ControlledDatePicker from 'common/ControlledDatePicker/ControlledDatePicker';
import {
  getSeniorCalenderDates,
  getSeniorLocation,
} from 'store/commonReducer/common.action';
import {useTheme} from '@emotion/react';

const LocationDateSelector = ({coordinates}: any) => {
  const theme: any = useTheme();
  const dispatch: any = useAppDispatch();
  const {timezone}: any = getCurrentSenior();

  const allEnableDatesData = useAppSelector(
    (state: any) => state.common.seniorLocation.calenderDates,
  );
  const seniorActualMonth = moment().tz(timezone).startOf('month');
  const [selectedMonth, setSelectedMonth] = React.useState(seniorActualMonth);

  const [selectedDay, handleDayChange] = React.useState(moment().tz(timezone));
  const [currentHours, setCurrentHours] = React.useState(0);
  const [enableDates, setEnableDates]: any = React.useState();
  const [isCalenderOpen, setIsCalenderOpen] = React.useState(false);
  const [isFirstTimeRender, setIsFirstTimeRender] = React.useState(true);
  const [disablePrevArrow, setDisablePrevArrow] = React.useState(false);
  const [disableNextArrow, setDisableNextArrow] = React.useState(false);

  React.useEffect(() => {
    dispatch(getSeniorCalenderDates(selectedDay));
  }, []);

  React.useEffect(() => {
    if (isFirstTimeRender) {
      const enableMonthData =
        allEnableDatesData[selectedMonth.format('MM-YYYY')];
      const calenderDate = enableMonthData?.calenderDates;

      setEnableDates(calenderDate);
    }
  }, [allEnableDatesData]);

  React.useEffect(() => {
    if (enableDates && !isCalenderOpen && isFirstTimeRender) {
      setIsFirstTimeRender(false);
      if (enableDates.length == 0) {
        const lastRecordedDate = getLastRecordedDate();
        if (lastRecordedDate) {
          handleDayChange(moment(lastRecordedDate));
          setSelectedMonth(moment(lastRecordedDate));
        }
      } else {
        handleDayChange(moment.utc(enableDates[enableDates.length - 1]));
      }
    }
  }, [enableDates]);

  React.useEffect(() => {
    fetchCalenderDates();
  }, [selectedMonth]);

  const fetchCalenderDates = async () => {
    if (
      !Object.keys(allEnableDatesData).includes(selectedMonth.format('MM-YYYY'))
    ) {
      const data: any = await dispatch(getSeniorCalenderDates(selectedMonth));
      setEnableDates(data);
    } else {
      const enableMonthData =
        allEnableDatesData[selectedMonth.format('MM-YYYY')];
      const calenderDate = enableMonthData?.calenderDates;
      setEnableDates(calenderDate);
    }
  };

  React.useEffect(() => {
    if (coordinates.latitude) {
      let time: any,
        endTime: any = '';

      if (
        selectedDay.format(DATE_FORMAT) ==
        moment().tz(timezone).format(DATE_FORMAT)
      ) {
        time = moment().tz(timezone).subtract({
          hours: currentHours,
          minutes: 59,
          seconds: 59,
        });
        if (
          time.format(DATE_FORMAT) !== moment().tz(timezone).format(DATE_FORMAT)
        ) {
          time = moment(selectedDay)
            .endOf('day')
            .subtract({hours: 23, minutes: 59, seconds: 59});
        }
        endTime = moment().tz(timezone).format('HH:mm:ss');
      } else {
        time = moment(selectedDay)
          .endOf('day')
          .subtract({hours: currentHours, minutes: 59, seconds: 59});
        endTime = '23:59:59';
      }

      const startTime = time.format('HH:mm:ss');

      dispatch(
        getSeniorLocation({
          isHistory: true,
          date: selectedDay,
          startTime,
          endTime,
        }),
      );
    }
  }, [coordinates, selectedDay, currentHours]);

  const navigatePrevDay = () => {
    setCurrentHours(0);
    setDisablePrevArrow(false);
    setDisableNextArrow(false);
    const prevEnableDateIndex = checkEnableDate(selectedDay);
    if (prevEnableDateIndex == 0) {
      const lastRecordedDate = getLastRecordedDate();
      if (lastRecordedDate) {
        handleDayChange(moment(lastRecordedDate));
        setSelectedMonth(moment(lastRecordedDate));
      } else {
        setDisablePrevArrow(true);
      }
    } else {
      const prevEnableDate = enableDates[prevEnableDateIndex - 1];
      handleDayChange(moment(prevEnableDate));
    }

    // }
  };

  const checkEnableDate = (date: any) => {
    const index: number = enableDates?.findIndex(
      (x: any) => x == date.format(DATE_FORMAT),
    );
    return index;
  };

  const navigateNextDay = () => {
    setCurrentHours(0);
    setDisablePrevArrow(false);
    setDisableNextArrow(false);
    const nextEnableDateIndex = checkEnableDate(selectedDay);
    if (nextEnableDateIndex == enableDates.length - 1) {
      const nextRecordedDate = getNextRecordedDate();

      if (nextRecordedDate) {
        handleDayChange(moment(nextRecordedDate));
        setSelectedMonth(moment(nextRecordedDate));
      } else {
        setDisableNextArrow(true);
      }
    } else {
      const nextEnableDate = enableDates[nextEnableDateIndex + 1];

      if (moment(selectedDay).format('L') == moment().format('L')) {
        return false;
      }
      handleDayChange(moment(nextEnableDate));
    }
  };

  const handleEnableDates = (currentDate: any) => {
    if (isCalenderOpen) {
      const enableMonthData =
        allEnableDatesData[selectedMonth.format('MM-YYYY')];
      return !enableMonthData?.calenderDates?.find(
        (disableDate: any) =>
          disableDate == moment(currentDate).format(DATE_FORMAT),
      );
    }
  };

  const handleHour = (evnt: any) => {
    setCurrentHours(evnt.target.value);
  };

  const handleMonthChange = (month: any) => {
    setSelectedMonth(month);
  };

  const getLastRecordedDate = () => {
    const enableMonthData = allEnableDatesData[selectedMonth.format('MM-YYYY')];
    return enableMonthData?.lastRecordedDate;
  };

  const getNextRecordedDate = () => {
    const enableMonthData = allEnableDatesData[selectedMonth.format('MM-YYYY')];
    return enableMonthData?.nextRecordedDate;
  };

  return (
    <>
      <Box mt={2} mr={1} data-testid='locationDateSelector'>
        <InputFields
          menu={true}
          menuItems={[
            {value: 0, label: '1:00 h'},
            {value: 1, label: '2:00 h'},
            {value: 3, label: '4:00 h'},
            {value: 7, label: '8:00 h'},
            {value: 15, label: '16:00 h'},
            {value: 23, label: '24:00 h'},
          ]}
          inputProps={{
            name: 'duration',
            dataTestid: 'duration',
          }}
          eventProps={{
            value: currentHours,
            onChange: handleHour,
            sx: {
              '&.MuiInputBase-root': {
                backgroundColor: theme.palette.common.white,
                border: `1px solid ${theme.palette.customColor.borderGrey}`,
                borderRadius: '8px',
                boxShadow: 'none',
                '& > div': {
                  backgroundColor: `${theme.palette.common.white}!important`,
                },
                '& > svg > path': {
                  fill: theme.palette.customColor.primaryGreen,
                },
              },
            },
          }}
        />
      </Box>
      <Box
        display='flex'
        alignItems='center'
        data-testid='locationDateSelector-datePicker'>
        <ControlledDatePicker
          value={selectedDay || null}
          id='dateFrom'
          variant='inline'
          autoOk={true}
          disableToolbar={true}
          disableFuture={true}
          format={DATE_FORMAT}
          placeholder={DATE_FORMAT}
          invalidDateMessage={INVALID_DATE}
          inputProps={{readOnly: true}}
          onPrev={navigatePrevDay}
          onNext={navigateNextDay}
          onOpen={() => {
            setSelectedMonth(selectedDay);
            setIsCalenderOpen(true);
          }}
          onClose={() => {
            setIsCalenderOpen(false);
          }}
          onChange={(day: any) => {
            handleDayChange(moment(day));
          }}
          onAccept={(day: any) => {
            setCurrentHours(0);
            const enableMonthData =
              allEnableDatesData[moment(day).format('MM-YYYY')];
            const calenderDate = enableMonthData?.calenderDates;
            setSelectedMonth(moment(day));
            setEnableDates(calenderDate);
            setDisablePrevArrow(false);
            setDisableNextArrow(false);
          }}
          onMonthChange={(month: any) => {
            handleMonthChange(moment(month));
          }}
          shouldDisableDate={(currentDate: any) =>
            handleEnableDates(moment(currentDate))
          }
          style={{
            backgroundColor: theme.palette.common.white,
            height: 38.81,
          }}
          disablePrevArrow={disablePrevArrow}
          disableNextArrow={disableNextArrow}
        />
      </Box>
    </>
  );
};

export default LocationDateSelector;
