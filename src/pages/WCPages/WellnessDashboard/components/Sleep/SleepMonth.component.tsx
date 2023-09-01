import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from 'hooks/reduxHooks';
import {Box, Grid, Typography, useTheme} from '@mui/material';
import {isEmpty} from 'lodash';
import get from 'lodash.get';
import moment from 'moment';
import calendar from 'calendar-month-array';
import sprintf from 'sprintf';

import {
  getHourMin,
  printStartEndTime,
  getTimestamp,
  roundOff,
} from 'globals/global.functions';
import {Card} from 'common/components/Card';
import {SleepDurationGraph} from 'common/Graphs';
import {CircularProgress} from 'common/CircularProgress';

import {getSleepDaily} from './sleep.action';
import {DATE_FORMAT_SHORT_YEAR} from 'globals/global.constants';
import SleepQualityGoals from './components/SleepQualityGoal';

const SleepMonth = () => {
  const theme: any = useTheme();
  const dispatch: any = useAppDispatch();
  const {startTime, endTime, reRender} = useAppSelector(
    (state: any) => state.wellnessDashboard,
  );
  const [score, setScore] = useState({
    data: [],
    loading: true,
    notFound: false,
    subTitle: '',
  });
  const [summary, setSummary] = useState<any>({
    data: [],
    loading: true,
    notFound: false,
    subTitle: '',
  });
  const [sleepMonthGraph, setSleepMonthGraph] = useState({
    data: [],
    loading: true,
    notFound: false,
    subTitle: '',
  });

  const [currentMonth, setCurrentMonth] = useState<any>(null);

  useEffect(() => {
    if (startTime && endTime && reRender) {
      printStartEndTime(startTime, endTime);

      setSummary({...summary, loading: true, subTitle: ''});
      setScore({...score, loading: true});
      setSleepMonthGraph({...sleepMonthGraph, loading: true});
      getMonthSummary();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startTime, endTime, reRender]);

  const getMonthSummary = async () => {
    const res = await dispatch(getSleepDaily(startTime, endTime));
    const data = get(res, 'summary');

    const timestamp: any = getTimestamp(startTime);

    const weeks = calendar(new Date(timestamp), {
      weekStartDay: 1,
      formatHeader: (date: any) => date.toString().slice(0, 2),
      formatDate: (date: any) => sprintf('%d', date.getDate()),
      formatSiblingMonthDate: () => '',
    });

    setCurrentMonth(weeks);

    if (isEmpty(data)) {
      setSummary({...summary, loading: false, notFound: true});
      setScore({...score, loading: false, notFound: true});
      setSleepMonthGraph({
        ...sleepMonthGraph,
        loading: false,
        notFound: true,
      });
      return;
    }
    setSummary({
      ...summary,
      data: res,
      loading: false,
      notFound: false,
    });
    const avgSleepTime = get(res, 'averageSleepTime');
    const avgTimeInBed = get(res, 'averageSleepTimeInBed');

    let totalSleepTime: any = [];
    let totalTimeInBed: any = [];

    let graphData: any = [];
    const monthArr = [];
    const startDate = moment(startTime * 0.000001);
    const endDate = moment(endTime * 0.000001).subtract(1, 'days');

    while (endDate.diff(startDate, 'days') >= 0) {
      const startDateNew = moment(startDate).valueOf() * 1000000;
      monthArr.push(startDateNew);
      startDate.add(1, 'days');
    }

    for (let i in monthArr) {
      const sleepTime = {
        x: moment(getTimestamp(monthArr[i])).format('MM/DD'),
        y: null,
        z: moment(getTimestamp(monthArr[i])).format(DATE_FORMAT_SHORT_YEAR),
      };
      const timeInBed = {
        x: moment(getTimestamp(monthArr[i])).format('MM/DD'),
        y: null,
        z: moment(getTimestamp(monthArr[i])).format(DATE_FORMAT_SHORT_YEAR),
      };
      totalSleepTime.push(sleepTime);
      totalTimeInBed.push(timeInBed);
    }

    monthArr.forEach((eachDayTime, index) => {
      data?.forEach((sleepData: any) => {
        if (
          moment(getTimestamp(sleepData.time)).format('MM/DD') ===
          moment(getTimestamp(eachDayTime)).format('MM/DD')
        ) {
          totalSleepTime[index].y = sleepData.total_sleep_time;
          totalTimeInBed[index].y = sleepData.total_timeinbed;
        }
      });
    });
    graphData = {
      totalSleepTime: totalSleepTime,
      totalTimeInBed: totalTimeInBed,
      avgSleepTime: avgSleepTime,
      avgTimeInBed: avgTimeInBed,
    };

    setSleepMonthGraph({
      ...sleepMonthGraph,
      data: graphData,
      loading: false,
      notFound: false,
    });
    updateScore(get(res, 'summary'));
  };

  const updateScore = (monthScore: any) => {
    monthScore.sort((x: any, y: any) => {
      return x.time - y.time;
    });
    let allScore: any = [];

    monthScore.map((data: any) => {
      const monthScoreTimestamp = getTimestamp(data.time);
      allScore.push({
        week: moment(monthScoreTimestamp).format('D'),
        score: data.sleep_score,
      });
    });

    setScore({...score, data: allScore, loading: false, notFound: false});
  };

  const renderScoreDayView = (day: any, index: any) => {
    const existDay: any = score.data.find(
      (scoreDay: any) => scoreDay.week == day,
    );

    if (existDay) {
      return (
        <CircularProgress
          key={index}
          innerText={existDay.week}
          value={existDay.score}
          tooltip={true}
        />
      );
    }
    if (!existDay && day) {
      return (
        <CircularProgress
          key={index}
          innerText={day}
          value={0}
          tooltip={true}
        />
      );
    }
    return <Box key={index}></Box>;
  };

  return (
    <>
      <Grid spacing={2} container data-testid='sleep-month-component'>
        <Grid item sm={3} display='flex' flexDirection='column'>
          <Card
            title='Sleep Cycle'
            noRecordFound={summary.notFound}
            isLoading={summary.loading}>
            <SleepQualityGoals
              value={get(summary, 'data.averageSleepScore', 0)}
              sleepGoal={80}
            />
          </Card>
          <Card
            mt={2}
            title='Monthly Average'
            noRecordFound={summary.notFound}
            isLoading={summary.loading}
            stretch>
            <Box fontSize={24} color={theme.palette.customColor.primaryGreen}>
              {getHourMin(get(summary, 'data.averageSleepTime'))}
            </Box>
          </Card>
        </Grid>
        <Grid item sm={4} display='flex' flexDirection='column'>
          <Card
            title='Sleep Score'
            noRecordFound={score.notFound}
            isLoading={score.loading}
            stretch>
            <Box width='100%' style={{overflow: 'scroll', height: '100%'}}>
              <Box display='grid' gridTemplateColumns='repeat(7, 1fr)'>
                {currentMonth &&
                  currentMonth.map((week: any, index: any) =>
                    week.map((day: any, i: any) => {
                      if (index == 0) {
                        return (
                          <Box
                            key={day}
                            style={{padding: '5px 20px'}}
                            alignItems='center'>
                            <strong key={day}>{day}</strong>
                          </Box>
                        );
                      } else {
                        return renderScoreDayView(day, i);
                      }
                    }),
                  )}
              </Box>
              {/* <Box display='grid' gridTemplateColumns='repeat(7, 1fr)'>
                {score.data.map((data) => (
                  <Box key={data.week}>
                    <CircularProgress value={data.score} />
                  </Box>
                ))}
              </Box> */}
            </Box>
          </Card>
        </Grid>
        <Grid item sm={5}>
          <Card
            title='Sleep Duration'
            isLoading={sleepMonthGraph.loading}
            noRecordFound={sleepMonthGraph.notFound}
            stretch>
            <Box>
              <SleepDurationGraph
                sleepMonthGraph={get(sleepMonthGraph, 'data')}
              />
              <Box
                width='100%'
                display='grid'
                rowGap='28px'
                justifyContent='space-between'>
                <Box display='flex'>
                  <Typography style={{paddingRight: 5}}>
                    Average Sleep Duration
                  </Typography>
                  <Typography style={{fontWeight: 'bold'}}>
                    {getHourMin(get(sleepMonthGraph, 'data.avgSleepTime'))}
                  </Typography>
                </Box>
                <Box display='flex'>
                  <Typography style={{paddingRight: 5}}>
                    Average Time In Bed
                  </Typography>
                  <Typography style={{fontWeight: 'bold'}}>
                    {getHourMin(get(sleepMonthGraph, 'data.avgTimeInBed'))}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};
export {SleepMonth};
