import React, {useEffect, useState, useRef} from 'react';
import {useAppDispatch, useAppSelector} from 'hooks/reduxHooks';
import {useLocation} from 'react-router-dom';
import {Box, Grid} from '@mui/material';
import {isEmpty} from 'lodash';
import moment from 'moment-timezone';
import {get} from 'react-hook-form';

import {Card} from 'common/components/Card';
import {
  getHourMin,
  printStartEndTime,
  getTimestamp,
} from 'globals/global.functions';
import {OPEN_DIALOG} from 'store/commonReducer/common.action';
import {DIALOG_TYPES} from 'globals/global.constants';

import {SleepQuality} from './components/SleepQuality.component';
import {AverageSleep} from './components/AverageSleep.component';
import {SleepCycle} from './components/SleepCycle.component';
import {
  getSleepDaily,
  getSleepDepth,
  getSleepHR,
  getSleepPhase,
} from './sleep.action';

import {SleepDuration} from './components/sleepDuration';
import {sleepStyle} from './Sleep.style';
const SleepComponent = ({dailyRecapDateHandler}: any) => {
  const ref = useRef(true);
  const {classes} = sleepStyle();
  const dispatch: any = useAppDispatch();
  const location: any = useLocation();

  const {startTime, endTime, reRender} = useAppSelector(
    (state: any) => state.wellnessDashboard,
  );
  const [summary, setSummary] = useState<any>({
    data: [],
    loading: true,
    notFound: false,
    subTitle: '',
  });
  const [sleepHeartRate, setSleepHeartRate] = useState<any>({
    data: [],
    loading: true,
    notFound: false,
    subTitle: '',
  });
  const [sleepCycle, setSleepCycle] = useState<any>({
    data: [],
    loading: true,
    notFound: false,
    subTitle: '',
  });
  const [sleepDepth, setSleepDepth] = useState<any>({
    data: [],
    loading: true,
    notFound: false,
    subTitle: '',
  });

  useEffect(() => {
    if (location.state && ref.current) {
      if (
        moment(getTimestamp(location.state.vitalData.date)).format('L') ==
        moment(getTimestamp(startTime)).format('L')
      ) {
        ref.current = false;
      }

      dispatch({
        type: OPEN_DIALOG,
        payload: {
          type: DIALOG_TYPES.DAILY_RECAP,
          data: {
            summaryMessage: location.state.vitalData.summaryMessage,
            date: location.state.vitalData.date,
          },
        },
      });
      dailyRecapDateHandler(location.state.vitalData.date);
    }
  }, [location.state]);

  useEffect(() => {
    if (startTime && endTime && reRender) {
      printStartEndTime(startTime, endTime);

      setSummary({
        ...summary,
        loading: true,
        notFound: false,
        subTitle: '',
      });
      setSleepHeartRate({
        ...sleepHeartRate,
        loading: true,
        notFound: false,
        subTitle: '',
      });
      setSleepCycle({
        ...sleepCycle,
        loading: true,
        notFound: false,
        subTitle: '',
      });
      setSleepDepth({
        ...sleepDepth,
        loading: true,
        notFound: false,
        subTitle: '',
      });
      getSleepSummary();
      getSleepDepthGraph();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startTime, endTime, reRender]);

  const getSleepDepthGraph = async () => {
    const res = await dispatch(getSleepDepth(startTime, endTime));

    if (isEmpty(res)) {
      setSleepDepth({
        loading: false,
        notFound: true,
      });
      return;
    }
    setSleepDepth({
      data: res,
      loading: false,
      notFound: false,
    });
  };

  const getSleepSummary = async () => {
    const response = await dispatch(getSleepDaily(startTime, endTime));

    if (isEmpty(response)) {
      setSummary({
        data: [],
        loading: false,
        notFound: true,
      });
      setSleepCycle({
        loading: false,
        notFound: true,
      });
      setSleepHeartRate({
        loading: false,
        notFound: true,
      });
      return;
    }
    setSummary({
      ...summary,
      data: response.daySummary,
      loading: false,
      notFound: false,
      subTitle: 'Restful',
    });
    await getSleepHeartRate(response.daySummary.summaryCycle);
    await getSleepCycleGraph(response.daySummary.summaryCycle);
  };

  const getSleepCycleGraph = async (summaryCycleTimestamps: any) => {
    const res = await dispatch(getSleepPhase(summaryCycleTimestamps));

    if (isEmpty(res)) {
      setSleepCycle({
        loading: false,
        notFound: true,
      });
      return;
    }
    setSleepCycle({
      data: res,
      loading: false,
      notFound: false,
    });
  };

  const getSleepHeartRate = async (summaryCycleTimestamps: any) => {
    const res = await dispatch(getSleepHR(summaryCycleTimestamps));

    if (isEmpty(res)) {
      setSleepHeartRate({
        loading: false,
        notFound: true,
      });
      return;
    }
    let graph: any = [];
    let interupptionGraph: any = [];
    Object.entries(res).forEach(([key, value]: any) => {
      const sleepCycleData = value.measurement;
      sleepCycleData?.map((chunk: any, resCount: any) => {
        const lastIndex = chunk.measurements.length - 1;
        const lastIndexTime = chunk.end_time;
        const lastIndexHR = chunk.measurements[lastIndex].heart_rate;
        const firstIndexTime = chunk.start_time;
        const firstIndexHR = chunk.measurements[0].heart_rate;

        if (resCount == 0 && sleepCycleData.length < 0) {
          interupptionGraph.push({
            x: lastIndexTime,
            y: lastIndexHR,
          });
        } else if (resCount + 1 == sleepCycleData.length) {
          interupptionGraph.push({
            x: firstIndexTime,
            y: firstIndexHR,
          });
          interupptionGraph.push({
            x: lastIndexTime,
            y: null,
          });
        } else {
          interupptionGraph.push({
            x: firstIndexTime,
            y: firstIndexHR,
          });
          interupptionGraph.push({
            x: firstIndexTime,
            y: null,
          });
          interupptionGraph.push({
            x: lastIndexTime,
            y: lastIndexHR,
          });
        }

        chunk?.measurements.map((data: any, i: any) => {
          graph.push({
            x: data.time,
            y: data.heart_rate,
          });

          if (chunk.measurements.length == i + 1) {
            graph.push({
              x: data.time,
              y: null,
            });
          }
        });
      });
    });

    setSleepHeartRate({
      data: graph,
      interupptionGraph: interupptionGraph,
      loading: false,
      notFound: false,
    });
  };

  return (
    <>
      <Grid container spacing={3}>
        <Grid item sm={12} data-testid='sleep-quality-container'>
          <Card
            childrenClass={classes.childrenClass}
            CardContentStyle={{padding: 0}}>
            <Grid item lg={6} xs={6}>
              <Card
                noRecordFound={summary.notFound}
                isLoading={summary.loading}
                title='Sleep Quality'
                subTitle={summary.subTitle}
                stretch
                style={{borderRadius: 0, boxShadow: 'none'}}
                showBorder
                CardContentStyle={{
                  margin: '16px 0px',
                  padding: '0px 16px',
                  borderRight: '1px solid rgba(0, 0, 0, 0.16)',
                }}>
                <SleepQuality sleepSummary={summary.data} />
              </Card>
            </Grid>
            <Grid item lg={6} xs={6}>
              <Card
                noRecordFound={summary.notFound}
                isLoading={summary.loading}
                title='Weekly SLEEP SCORE'
                stretch
                style={{borderRadius: 0, boxShadow: 'none'}}
                CardContentStyle={{paddingTop: 0}}>
                <SleepDuration />
              </Card>
            </Grid>
          </Card>
        </Grid>
      </Grid>
      <Box mt={2}>
        <Grid container spacing={2}>
          <Grid item lg={6} xs={6}>
            <Card
              noRecordFound={sleepCycle.notFound}
              isLoading={sleepCycle.loading}
              title='Sleep Cycles'
              subTitle={getHourMin(get(summary, 'data.totalSleepTime', ''))}
              stretch>
              <SleepCycle graphData={sleepCycle.data} />
            </Card>
          </Grid>
          <Grid item lg={6} xs={6}>
            <Card
              noRecordFound={sleepHeartRate.notFound}
              isLoading={sleepHeartRate.loading}
              title='Average Sleep Heart Rate'
              subTitle={`${get(summary, 'data.heartRateAvg', '')}bpm`}
              stretch>
              <AverageSleep
                graphData={sleepHeartRate.data}
                interupptionGraph={sleepHeartRate.interupptionGraph}
              />
            </Card>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export {SleepComponent};
