import React, {useEffect, useState, useRef} from 'react';
import {useAppDispatch, useAppSelector} from 'hooks/reduxHooks';
import {useLocation} from 'react-router-dom';
import moment from 'moment';
import get from 'lodash.get';
import {isEmpty} from 'lodash';
import {Grid} from '@mui/material';

import GraphAPI from 'utilities';
import {
  getTimestamp,
  printStartEndTime,
  removeActivityWithNoData,
  normalizeActivity,
  putToBucket,
  updateBucketWithNoActivity,
} from 'globals/global.functions';
import {Card} from 'common/components/Card';

import {HeartRateSummary} from './HeartRateSummary';
import {HeartRateActivity} from './HeartRateActivity';
import {DATE_FORMAT_SHORT, DIALOG_TYPES} from 'globals/global.constants';
import {OPEN_DIALOG} from 'store/commonReducer/common.action';

const HeartRateComponent = () => {
  const dispatch: any = useAppDispatch();
  const location: any = useLocation();
  const ref = useRef(true);

  const {currentState, startTime, endTime, reRender} = useAppSelector(
    (state: any) => state.wellnessDashboard,
  );

  const [summary, setSummary] = useState({
    data: [],
    loading: true,
    notFound: false,
    subTitle: '',
  });

  const [activityChartData, setActivityChartData] = useState([]);
  const [heartRate, setHeartRate] = useState({
    data: [],
    data2: [],
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
            rangeMap: location.state.vitalData.rangeMap,
            heartRateData: heartRate.data || [],
          },
        },
      });
    }
  }, [heartRate.data]);

  useEffect(() => {
    if (startTime && endTime && reRender) {
      printStartEndTime(startTime, endTime);

      setSummary({...summary, loading: true, subTitle: ''});
      setHeartRate({...heartRate, loading: true, subTitle: ''});
      getCurrentSummary();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startTime, endTime, reRender]);

  useEffect(() => {
    return () => {
      setActivityChartData([]);
      setSummary({...summary, loading: true, subTitle: '', data: []});
      setHeartRate({
        ...heartRate,
        loading: true,
        subTitle: '',
        data: [],
        data2: [],
      });
    };
  }, []);

  const getCurrentSummary = () => {
    GraphAPI.fetchHeartExtreme(startTime, endTime).then((res) => {
      if (isEmpty(res)) {
        setSummary({...summary, loading: false, notFound: true, subTitle: ''});
        setHeartRate({...heartRate, loading: false, notFound: true});
        return;
      }
      setSummary({
        ...summary,
        data: res,
        loading: false,
        notFound: false,
        subTitle: moment(getTimestamp(get(res, 'time'))).format(
          currentState == 'day' ? 'LT' : 'L',
        ),
      });

      getHeartRateActivity(get(res, 'min'), get(res, 'max'));
    });
  };

  const getHeartRateActivity = (min: any, max: any) => {
    GraphAPI.fetchActivitySeries(startTime, endTime).then((res) => {
      getActualHeartRate(res, min, max);
    });
  };

  const getActualHeartRate = (
    activitySeries: any,
    minBarHeight: any,
    maxBarHeight: any,
  ) => {
    GraphAPI.fetchHeartRate(startTime, endTime).then((res) => {
      if (isEmpty(res)) {
        setHeartRate({...heartRate, loading: false, notFound: true});
        return;
      }

      let HRActivity: any = [];
      let HRMinMax: any = [];
      const barMaxHeight = (minBarHeight + maxBarHeight) / 2;

      const bucketList = normalizeActivity(
        activitySeries,
        barMaxHeight,
        Math.floor(minBarHeight * 0.8),
      );
      if (currentState == 'day') {
        bucketList.bucket = updateBucketWithNoActivity(
          bucketList.bucket,
          startTime,
          endTime,
        );
        const evaluatedBucket = putToBucket(
          bucketList.bucket,
          res,
          'heart_rate',
        );
        const finalData = removeActivityWithNoData(
          evaluatedBucket,
          bucketList.normalizedActivity,
        );

        const graphData: any = createActivityGraph(finalData.activity);

        setActivityChartData(graphData);

        Object.entries(finalData.bucket).forEach((data: any) => {
          if (!isEmpty(data[1])) {
            const min = Math.min(...data[1]);
            const max = Math.max(...data[1]);
            const sum = data[1].reduce((a: any, b: any) => a + b, 0);
            const avg = sum / data[1].length || 0;

            const xPlot = moment(getTimestamp(parseInt(data[0]))).format(
              currentState == 'day' ? 'LT' : DATE_FORMAT_SHORT,
            );
            HRActivity.push({
              x: xPlot,
              y: avg,
            });
            HRMinMax.push({
              x: xPlot,
              y0: max,
              y: min,
            });
          }
        });
      } else {
        res.map((data: any) => {
          const xPlot = moment(getTimestamp(parseInt(data.time))).format(
            currentState == 'day' ? 'LT' : DATE_FORMAT_SHORT,
          );

          if (!data.heart_rate) {
            delete bucketList.normalizedActivity[data.time];
          } else {
            HRActivity.push({
              x: xPlot,
              y: data.heart_rate,
            });
            HRMinMax.push({
              x: xPlot,
              y0: data.max_heart_rate,
              y: data.min_heart_rate,
            });
          }
        });

        const graphData: any = createActivityGraph(
          bucketList.normalizedActivity,
        );
        setActivityChartData(graphData);
      }
      setHeartRate({
        ...heartRate,
        data: HRActivity,
        data2: HRMinMax,
        loading: false,
        notFound: false,
      });
    });
  };

  const createActivityGraph = (rawData: any) => {
    let high: any = [];
    let medium: any = [];
    Object.entries(rawData).forEach((data) => {
      const highActivity = get(data[1], 'high_activity');
      const mediumActivity = get(data[1], 'medium_activity');
      const xPlot = moment(getTimestamp(parseInt(data[0]))).format(
        currentState == 'day' ? 'LT' : DATE_FORMAT_SHORT,
      );

      high.push({
        x: xPlot,
        y: highActivity,
      });
      medium.push({
        x: xPlot,
        y: mediumActivity,
      });
    });
    return [medium, high];
  };

  return (
    <Grid container spacing={2} data-testid='heart-rate-component'>
      <Grid item sm={4}>
        <Card
          noRecordFound={summary.notFound}
          isLoading={summary.loading}
          title={currentState == 'day' ? 'Current' : 'Average'}
          subTitle={summary.subTitle}
          stretch>
          <HeartRateSummary
            summary={summary.data}
            currentState={currentState}
          />
        </Card>
      </Grid>
      <Grid item sm={8}>
        <Card
          noRecordFound={heartRate.notFound}
          isLoading={heartRate.loading}
          title='Heart Rate/Activity'
          subTitle={heartRate.subTitle}
          stretch>
          <HeartRateActivity
            summary={summary}
            activityChartData={activityChartData}
            heartRateActivity={heartRate.data}
            minMaxData={heartRate.data2}
            type={currentState}
          />
        </Card>
      </Grid>
    </Grid>
  );
};

export {HeartRateComponent};
