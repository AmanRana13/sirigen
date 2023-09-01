import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {useAppDispatch, useAppSelector} from 'hooks/reduxHooks';
import {Box, Grid, useTheme} from '@mui/material';
import {isEmpty} from 'lodash';
import get from 'lodash.get';
import moment from 'moment';

import {
  getTimestamp,
  getHourMin,
  printStartEndTime,
} from 'globals/global.functions';
import {Card} from 'common/components/Card';
import {CircularProgress} from 'common/CircularProgress';

import {
  addDate,
  convertMiliSecondsToNanoSeconds,
  convertNanoSecondsToMiliSeconds,
} from 'globals/date.functions';
import {getSleepDaily} from '../../sleep.action';
import {sleepStyle} from '../../Sleep.style';

const SleepDuration = () => {
  const theme: any = useTheme();
  const {startTime: startTimeT, endTime: endTimeT, reRender} = useAppSelector(
    (state: any) => state.wellnessDashboard,
  );

  const {startTime, endTime} = useMemo(() => {
    const date = moment(convertNanoSecondsToMiliSeconds(endTimeT));
    let startTime = convertMiliSecondsToNanoSeconds(
      moment(date).clone().startOf('week').format('x'),
    );
    let endTime = convertMiliSecondsToNanoSeconds(
      moment(date).clone().endOf('week').format('x'),
    );
    return {startTime, endTime};
  }, [endTimeT, startTimeT]);

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
    console.log('res', startTime, endTime);

    const res = await dispatch(getSleepDaily(startTime, endTime));
    console.log(' day res', res);

    const endTimePlusOne: any = addDate(
      getTimestamp(endTimeT),
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

  console.log('score', score);

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

  return (
    <>
      <Grid
        item
        display='flex'
        flexDirection='column'
        data-testid='sleep-week-component'>
        <Card
          noRecordFound={score.notFound}
          isLoading={score.loading}
          style={{borderRadius: 0, boxShadow: 'none'}}>
          <Box
            display='grid'
            gridTemplateColumns='repeat(7, 1fr)'
            style={{padding: 0}}>
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
          stretch
          style={{borderRadius: 0, boxShadow: 'none'}}>
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
    </>
  );
};
export {SleepDuration};
