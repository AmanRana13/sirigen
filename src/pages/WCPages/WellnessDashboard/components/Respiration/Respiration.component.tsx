import React, {useEffect, useState} from 'react';
import {useAppSelector} from 'hooks/reduxHooks';
import {Grid} from '@mui/material';
import moment from 'moment';
import get from 'lodash.get';
import {isEmpty} from 'lodash';
import GraphAPI from 'utilities';
import {Card} from 'common/components/Card';
import {
  getTimestamp,
  printStartEndTime,
  normalizeActivity,
  putToBucket,
  removeActivityWithNoData,
  updateBucketWithNoActivity,
} from 'globals/global.functions';

import {RespirationSummary} from './components/RespirationSummary.component';
import {RespirationActivity} from './components/RespirationActivity.component';
import {DATE_FORMAT_SHORT} from 'globals/global.constants';

const RespirationComponent = () => {
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
  const [respirationRate, setRespirationRate] = useState({
    data: [],
    data2: [],
    loading: true,
    notFound: false,
    subTitle: '',
  });

  useEffect(() => {
    if (startTime && endTime && reRender) {
      printStartEndTime(startTime, endTime);
      setSummary({...summary, loading: true, subTitle: ''});
      setRespirationRate({
        ...respirationRate,
        loading: true,
        subTitle: '',
      });
      getCurrentSummary();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startTime, endTime, reRender]);

  useEffect(() => {
    return () => {
      setActivityChartData([]);
      setSummary({...summary, loading: true, subTitle: '', data: []});
      setRespirationRate({
        ...respirationRate,
        loading: true,
        subTitle: '',
        data: [],
        data2: [],
      });
    };
  }, []);

  const getCurrentSummary = () => {
    GraphAPI.fetchRespirationExtreme(startTime, endTime).then((res) => {
      if (isEmpty(res)) {
        setSummary({...summary, loading: false, notFound: true, subTitle: ''});
        setRespirationRate({
          ...respirationRate,
          loading: false,
          notFound: true,
        });
        return;
      }

      setSummary({
        ...summary,
        data: res,
        notFound: false,
        loading: false,
        subTitle: moment(getTimestamp(get(res, 'time'))).format(
          currentState == 'day' ? 'LT' : 'L',
        ),
      });

      getRespirationActivity(get(res, 'min'), get(res, 'max'));
    });
  };

  const getRespirationActivity = (min: any, max: any) => {
    GraphAPI.fetchActivitySeries(startTime, endTime).then((res) => {
      getActualRespirationRate(res, min, max);
    });
  };

  const getActualRespirationRate = (
    activitySeries: any,
    minBarHeight: any,
    maxBarHeight: any,
  ) => {
    GraphAPI.fetchRespirationRate(startTime, endTime).then((res) => {
      if (isEmpty(res)) {
        setRespirationRate({
          ...respirationRate,
          loading: false,
          notFound: true,
        });
        return;
      }
      let RRRate: any = [];
      let RRMinMax: any = [];
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
          'respiration_rate',
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
            RRRate.push({
              x: xPlot,
              y: avg,
            });
            RRMinMax.push({
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

          if (!data.respiration_rate) {
            delete bucketList.normalizedActivity[data.time];
          } else {
            RRRate.push({
              x: xPlot,
              y: data.respiration_rate,
            });
            RRMinMax.push({
              x: xPlot,
              y0: data.max_respiration_rate,
              y: data.min_respiration_rate,
            });
          }
        });

        const graphData: any = createActivityGraph(
          bucketList.normalizedActivity,
        );
        setActivityChartData(graphData);
      }

      setRespirationRate({
        ...respirationRate,
        data: RRRate,
        data2: RRMinMax,
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
    <Grid container spacing={2} data-testid='respiration'>
      <Grid item sm={4}>
        <Card
          noRecordFound={summary.notFound}
          isLoading={summary.loading}
          title={currentState == 'day' ? 'Current' : 'Average'}
          subTitle={summary.subTitle}>
          <RespirationSummary summary={summary.data} />
        </Card>
      </Grid>
      <Grid item sm={8}>
        <Card
          noRecordFound={respirationRate.notFound}
          isLoading={respirationRate.loading}
          title='respiration/activity'
          subTitle={respirationRate.subTitle}>
          <RespirationActivity
            summary={summary}
            activityChartData={activityChartData}
            respirationRate={respirationRate.data}
            minMaxData={respirationRate.data2}
            type={currentState}
          />
        </Card>
      </Grid>
    </Grid>
  );
};

export {RespirationComponent};
