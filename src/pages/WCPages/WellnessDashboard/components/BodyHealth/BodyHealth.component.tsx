import React, {useState, useEffect, useMemo} from 'react';
import {useAppSelector} from 'hooks/reduxHooks';
import {Box, Grid, CircularProgress} from '@mui/material';
import moment from 'moment-timezone';
import {isEmpty} from 'lodash';

import GraphAPI from 'utilities';
import {getTimestamp} from 'globals/global.functions';
import {
  DATE_FORMAT_SHORT_YEAR,
  DATE_FORMAT_SHORT,
} from 'globals/global.constants';
import {getFormattedDate} from 'globals/date.functions';
import {GraphView} from 'globals/enums';

import {BodyWeight} from './components/BodyWeight.component';
import {BodyComposition} from './components/BodyComposition.component';
import {BodyHydration} from './components/BodyHydration.component';
import {wellnessDashboardStyle} from '../../WellnessDashboard.style';

const BodyHealthComponent = () => {
  const {currentState, startTime, endTime, reRender} = useAppSelector(
    (state: any) => state.wellnessDashboard,
  );
  const {classes} = wellnessDashboardStyle();
  const [summary, setSummary] = useState<any>([]);
  const [lastRecordedDate, setLastRecordedDate] = useState<any>(null);
  const [difference, setDifference] = useState([]);
  const [graph, setGraph] = useState<any>([]);
  const [weightDayStartTime, setWeightDayStartTime] = useState<any>('');
  const [weightDayEndTime, setWeightDayEndTime] = useState<any>('');
  const [config, setConfig] = useState({
    loading: true,
    subTitle: '',
    noRecordFound: false,
  });

  const lastAvailableKey = useMemo(() => {
    if (!isEmpty(summary.all_data)) {
      return Object.keys(summary.all_data)[
        Object.keys(summary.all_data).length - 1
      ];
    }
    return null;
  }, [summary]);

  const graphTickValues = useMemo(() => {
    const tempArray = [];
    const startDate = moment(
      getTimestamp(currentState == 'day' ? weightDayStartTime : startTime),
    );
    const endDate = moment(
      getTimestamp(currentState == 'day' ? weightDayEndTime : endTime),
    ).add(1, 'day');
    while (endDate.diff(startDate, 'days') > 0) {
      tempArray.push(startDate.format(DATE_FORMAT_SHORT));
      startDate.add(1, 'days');
    }
    return tempArray;
  }, [startTime, endTime, weightDayStartTime, weightDayEndTime]);

  const isGraphEmpty = useMemo(() => {
    const checkEmptyGraph = isEmpty(
      Object.keys(summary.all_data || {}).filter((data) =>
        graphTickValues.includes(
          moment(getTimestamp(data)).format(DATE_FORMAT_SHORT),
        ),
      ),
    );
    return checkEmptyGraph;
  }, [summary, graphTickValues]);

  useEffect(() => {
    if (startTime && endTime && reRender) {
      let weightGraphStartTime: any = moment(getTimestamp(startTime))
        .clone()
        .startOf('week')
        .format('x');
      let weightGraphEndTime: any = moment(getTimestamp(startTime))
        .clone()
        .endOf('week')
        .format('x');
      setWeightDayStartTime(weightGraphStartTime * 1000000);
      setWeightDayEndTime(weightGraphEndTime * 1000000);
      const getBodyHealthMeasurement = GraphAPI.fetchBodyHealthMeasurement(
        startTime,
        endTime,
      );
      const getBodyHealthDifference = GraphAPI.fetchBodyHealthDifference(
        startTime,
        endTime,
      );

      const getWeightGraph = GraphAPI.fetchBodyHealthGraph(
        'weight',
        currentState == 'day' ? weightGraphStartTime * 1000000 : startTime,
        currentState == 'day' ? weightGraphEndTime * 1000000 : endTime,
      );

      setConfig({
        ...config,
        loading: true,
      });
      Promise.all([
        getBodyHealthMeasurement,
        getBodyHealthDifference,
        getWeightGraph,
      ]).then((res) => {
        const measurement = res[0];
        const bodyHealthDifference = res[1];

        setConfig({
          ...config,
          loading: false,
        });
        setSummary({
          ...measurement,
        });
        setDifference({
          ...bodyHealthDifference,
        });
        setGraph({
          weight: res[2],
        });
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startTime, endTime, reRender]);
  useEffect(() => {
    const lastRecDate = getFormattedDate(
      lastAvailableKey,
      DATE_FORMAT_SHORT_YEAR,
    );

    if (
      getFormattedDate(startTime) !== getFormattedDate(lastAvailableKey) &&
      currentState == GraphView.DAY &&
      !isEmpty(summary)
    ) {
      setLastRecordedDate(lastRecDate);
    } else if (isGraphEmpty && !isEmpty(summary)) {
      setLastRecordedDate(lastRecDate);
    } else {
      setLastRecordedDate(null);
    }
  }, [summary, lastAvailableKey, isGraphEmpty]);

  return (
    <Grid container spacing={2} data-testid='body-health-container'>
      <Grid item sm={12}>
        <Box className={classes.cardContainer} p={2}>
          {config.loading ? (
            <Box display='flex' justifyContent='center' alignItems='center'>
              <CircularProgress />
            </Box>
          ) : (
            <BodyWeight
              graph={graph}
              difference={difference}
              summary={summary}
              type={currentState}
              lastRecordedDate={lastRecordedDate}
              graphTickValues={graphTickValues}
            />
          )}
        </Box>
      </Grid>
      <Grid item sm={currentState === 'day' ? 7 : 12}>
        <Box className={classes.cardContainer} p={2}>
          {config.loading ? (
            <Box display='flex' justifyContent='center' alignItems='center'>
              <CircularProgress />
            </Box>
          ) : (
            <BodyComposition
              difference={difference}
              summary={summary}
              currentState={currentState}
              type={currentState}
              lastRecordedDate={lastRecordedDate}
              lastAvailableKey={lastAvailableKey}
              graphTickValues={graphTickValues}
            />
          )}
        </Box>
      </Grid>
      <Grid item sm={currentState === 'day' ? 5 : 12}>
        <Box className={classes.cardContainer} p={2}>
          {config.loading ? (
            <Box display='flex' justifyContent='center' alignItems='center'>
              <CircularProgress />
            </Box>
          ) : (
            <BodyHydration
              difference={difference}
              summary={summary}
              type={currentState}
              currentState={currentState}
              lastRecordedDate={lastRecordedDate}
              graphTickValues={graphTickValues}
            />
          )}
        </Box>
      </Grid>
    </Grid>
  );
};

export {BodyHealthComponent};
