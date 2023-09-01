import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from 'hooks/reduxHooks';
import {Box, Grid, useTheme} from '@mui/material';
import {VictoryChart, VictoryAxis, VictoryBar} from 'victory';
import {isEmpty} from 'lodash';
import get from 'lodash.get';
import moment from 'moment';

import {
  getTimestamp,
  getHourMin,
  printStartEndTime,
  roundOff,
} from 'globals/global.functions';
import {Card} from 'common/components/Card';
import {CircularProgress} from 'common/CircularProgress';

import {getSleepDaily} from './sleep.action';
import {sleepStyle} from './Sleep.style';
import {addDate, convertMiliSecondsToNanoSeconds} from 'globals/date.functions';
import SleepQualityGoals from './components/SleepQualityGoal';

const SleepWeek = () => {
  const theme: any = useTheme();
  const {startTime, endTime, reRender} = useAppSelector(
    (state: any) => state.wellnessDashboard,
  );
  const dispatch: any = useAppDispatch();
  const {classes} = sleepStyle();
  const [summary, setSummary] = useState({
    data: [],
    loading: true,
    notFound: false,
    subTitle: '',
  });
  const [duration, setDuration] = useState([]);
  const [score, setScore] = useState({
    data: [],
    loading: true,
    notFound: false,
    subTitle: '',
  });
  const [graph, setGraph] = useState({
    data: [],
    loading: true,
    notFound: false,
    subTitle: '',
  });
  const [tickValue, setTickValue] = useState<any>([]);

  useEffect(() => {
    if (startTime && endTime && reRender) {
      printStartEndTime(startTime, endTime);
      setSummary({...summary, loading: true, subTitle: ''});
      setScore({...score, loading: true});
      setGraph({...graph, loading: true});
      getWeekSummary();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startTime, endTime, reRender]);

  const getWeekSummary = async () => {
    const res = await dispatch(getSleepDaily(startTime, endTime));
    const endTimePlusOne: any = addDate(
      getTimestamp(endTime),
      1,
      'days',
    )?.format('x');
    const resGraph = await dispatch(
      getSleepDaily(startTime, convertMiliSecondsToNanoSeconds(endTimePlusOne)),
    );

    const data = get(res, 'summary');
    const summaryList = get(resGraph, 'summaryList');
    if (isEmpty(data)) {
      setSummary({...summary, loading: false, notFound: true});
      setGraph({...graph, loading: false, notFound: true});
      setScore({...score, loading: false, notFound: true});
      return;
    }
    let mockData: any = [];
    summaryList.forEach((list: any, index: any) => {
      list.forEach((item: any) => {
        const sleepStart = item.time;
        const sleepEnd = item.end_timestamp;
        const min = parseFloat(moment(getTimestamp(sleepStart)).format('H.mm'));
        const max = parseFloat(moment(getTimestamp(sleepEnd)).format('H.mm'));

        if (min > max) {
          if (index != 0) {
            mockData.push({
              x: moment(getTimestamp(item.senior_day))
                .subtract(1, 'days')
                .format('ddd'),
              y0: min,
              y: 24,
            });
          }

          if (
            summaryList.length > 1 &&
            summaryList.length - 1 == index &&
            moment(getTimestamp(item.senior_day)).format('ddd') == 'Sun'
          ) {
            //Do Nothing
          } else {
            mockData.push({
              x: moment(getTimestamp(item.senior_day)).format('ddd'),
              y0: 0,
              y: max,
            });
          }
        } else {
          const onlySunday = mockData.every((value: any) => value.x == 'Sun');
          if (
            moment(getTimestamp(item.senior_day)).format('ddd') != 'Sun' ||
            onlySunday
          ) {
            mockData.push({
              x: moment(getTimestamp(item.senior_day)).format('ddd'),
              y0: min,
              y: max,
            });
          }
        }
      });
    });

    setTickValue([0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24]);
    setGraph({...graph, data: mockData, loading: false, notFound: false});
    setSummary({
      ...summary,
      data: res,
      loading: false,
      notFound: false,
    });
    updateScore(get(res, 'summary'));
    updateDuration(get(res, 'summary'));
  };

  const updateScore = (weekScore: any) => {
    weekScore.sort((x: any, y: any) => x.time - y.time);
    let allScore: any = [];
    weekScore.map((data: any) => {
      const timestamp = getTimestamp(data.time);
      allScore.push({
        week: moment(timestamp).format('ddd').charAt(0),
        score: data.sleep_score,
      });
    });
    setScore({...score, data: allScore, loading: false, notFound: false});
  };

  const updateDuration = (weekDuration: any) => {
    weekDuration.sort((x: any, y: any) => x.time - y.time);
    let allDuration: any = [];
    weekDuration.map((data: any) => {
      const timestamp = getTimestamp(data.time);
      allDuration.push({
        week: moment(timestamp).format('dddd'),
        time: getHourMin(get(data, 'total_timeinbed')),
      });
    });
    setDuration(allDuration);
  };

  function getSleepBarColor(data: any) {
    const {sleepGreen, sleepYellow, hydrationRed} = theme.palette.customColor;
    const colorData: any = {
      Sun: sleepGreen,
      Mon: sleepYellow,
      Tue: sleepGreen,
      Wed: sleepYellow,
      Thu: hydrationRed,
      Fri: sleepGreen,
      Sat: sleepGreen,
    };
    return colorData[data.x];
  }

  return (
    <>
      <Grid spacing={2} container data-testid='sleep-week-component'>
        <Grid item sm={3} display='flex' flexDirection='column'>
          <Card
            title='Sleep Cycle'
            noRecordFound={summary.notFound}
            isLoading={summary.loading}>
            <SleepQualityGoals
              value={Number(
                roundOff(get(summary, 'data.averageSleepScore', 0)),
              )}
              sleepGoal={80}
            />
          </Card>
          <Card
            mt={2}
            title='Weekly Average'
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
            isLoading={score.loading}>
            <Box display='grid' gridTemplateColumns='repeat(7, 1fr)'>
              {score.data.map((data: any) => {
                return (
                  <Box key={data.week} className={classes.sleepWeekScore}>
                    <strong>{data.week}</strong>
                    <CircularProgress value={data.score} />
                  </Box>
                );
              })}
            </Box>
          </Card>
          <Card
            mt={2}
            title='Duration In Bed'
            noRecordFound={score.notFound}
            isLoading={score.loading}
            stretch>
            <Box className={classes.sleepScoreListContainer}>
              {duration.map((data: any) => {
                return (
                  <Box key={data.week} className={classes.sleepScoreList}>
                    <Box className={classes.sleepScoreListItem}>
                      <Box className={classes.sleepScoreListIcon}></Box>
                      {data.week}
                    </Box>
                    <Box>{data.time}</Box>
                  </Box>
                );
              })}
            </Box>
          </Card>
        </Grid>
        <Grid item sm={5}>
          <Card
            title='Sleep Duration'
            noRecordFound={graph.notFound}
            isLoading={graph.loading}
            stretch>
            <VictoryChart width={600} domainPadding={{x: 20}}>
              <VictoryAxis
                dependentAxis={true}
                orientation='right'
                invertAxis={true}
                style={{
                  axis: {stroke: 'none'},
                  grid: {
                    stroke: theme.palette.customColor.strokeGrey,
                    strokeWidth: 2,
                  },
                }}
                tickValues={tickValue}
                tickFormat={(y) => {
                  if (y == 24) {
                    return `12 AM`;
                  }
                  if (y < -12) {
                    return `${12 + y} AM`;
                  }
                  if (y < 0) {
                    return `${12 + y} PM`;
                  }
                  if (y == 12) {
                    return `12 PM`;
                  }
                  if (y > 12) {
                    return `${y - 12} PM`;
                  }
                  if (y == 0) {
                    return `12 AM`;
                  }
                  return `${y} AM`;
                }}
              />

              <VictoryBar
                barWidth={15}
                cornerRadius={{
                  bottom: ({datum}) => {
                    return datum.y0 == 0 ? 0 : 8;
                  },
                  top: ({datum}) => {
                    return datum.y == 24 ? 0 : 8;
                  },
                }}
                data={graph.data}
                style={{
                  data: {
                    fill: ({datum}) => getSleepBarColor(datum),
                    stroke: theme.palette.common.black,
                    strokeWidth: 1,
                  },
                }}
              />

              <VictoryAxis
                standalone={true}
                offsetY={24}
                style={{axis: {stroke: 'none'}}}
              />
            </VictoryChart>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};
export {SleepWeek};
