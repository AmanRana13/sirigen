/* eslint-disable max-len */
import {Box} from '@mui/material';
import {getClientTimezone} from 'globals/date.functions';
import {
  DASHBOARD_VITALS_TYPE,
  HEART_RATE_CONDITION,
  ACTIVITY_CONDITION,
  WEIGHT_CONDITION,
  SLEEP_CONDITION,
} from 'globals/enums';
import {
  getCurrentDate,
  getCurrentSenior,
  getCurrentSleepDate,
  kgToLbs,
  roundOff,
} from 'globals/global.functions';
import {useAppDispatch} from 'hooks/reduxHooks';
import get from 'lodash.get';
import moment from 'moment';
import ResidentDetailsCard from 'pages/FacilityPages/AllResidents/component/ResidentsCard/ResidentDetailsCard.component ';
import {getSleepDaily} from 'pages/WCPages/WellnessDashboard/components/Sleep/sleep.action';
import React, {useState} from 'react';
import {getThresholdService} from 'services/careInsightService/threshold.service';
import {showError} from 'store/commonReducer/common.action';
import GraphAPI from 'utilities/GraphAPI';
import {useQuery} from 'utilities/react-query';
import {
  getActivityVerbiage,
  getHeartRateVerbiage,
  getSleepVerbiage,
  getWeightVerbiage,
} from './WellnessIndicator.utility';
import {makeStyles} from 'tss-react/mui';

interface IConditions {
  heartRate: HEART_RATE_CONDITION;
  activity: ACTIVITY_CONDITION;
  sleep: SLEEP_CONDITION;
  weight: WEIGHT_CONDITION;
}

const useStyles = makeStyles()(() => ({
  container: {
    display: 'flex',
    gap: '30px',
    '& > div': {
      flexGrow: 1,
      maxWidth: '276px',
    },
  },
}));
const WellnessIndicators = () => {
  const {classes} = useStyles();
  const [conditions, setConditions] = useState<IConditions>({
    heartRate: HEART_RATE_CONDITION.NO_DATA,
    activity: ACTIVITY_CONDITION.NO_DATA,
    sleep: SLEEP_CONDITION.NO_DATA,
    weight: WEIGHT_CONDITION.NO_DATA,
  });
  const dispatch: any = useAppDispatch();

  const {data: threshold} = useQuery({
    queryKey: ['thresholdData'],
    queryFn: async (): Promise<any> => {
      const seniorInfo = getCurrentSenior();
      const params = {
        account_id: seniorInfo.account_id,
        senior_ids: JSON.stringify([seniorInfo.senior_id]),
      };
      const response = await getThresholdService(params);
      return response?.data?.[0]?.threshold || null;
    },
    onError: (error: any) => {
      dispatch(showError(error));
    },
    cacheTime: 0,
  });

  const {data: currentHeartRate} = useQuery({
    queryKey: ['heartRateData'],
    queryFn: async (): Promise<any> => {
      const currentDate = {...getCurrentDate(getClientTimezone())};
      const response = await GraphAPI.fetchHeartExtreme(
        currentDate.startTime,
        currentDate.endTime,
      );
      return response?.last || '';
    },
    onError: (error: any) => {
      dispatch(showError(error));
    },
    cacheTime: 0,
  });

  const {data: currentActivityScore} = useQuery({
    queryKey: ['activityData'],
    queryFn: async (): Promise<any> => {
      const currentDate = {...getCurrentDate(getClientTimezone())};
      const response = await GraphAPI.fetchActivitySeries(
        currentDate.startTime,
        currentDate.endTime,
      );
      let totalModerateDuration = 0;
      let totalIntenseDuration = 0;
      response &&
        Object.entries(response).forEach((data) => {
          const highActivity = get(data[1], 'high_activity', 0);
          const mediumActivity = get(data[1], 'medium_activity', 0);
          const activityDuration = get(data[1], 'activity_duration', 0);

          totalIntenseDuration +=
            (activityDuration / 60) * (highActivity / 100);

          totalModerateDuration +=
            (activityDuration / 60) * (mediumActivity / 100);
        });
      return totalIntenseDuration + totalModerateDuration;
    },
    onError: (error: any) => {
      dispatch(showError(error));
    },
    cacheTime: 0,
  });

  const {data: weightData} = useQuery({
    queryKey: ['weightData'],
    queryFn: (): Promise<any> => {
      const currentDate = {...getCurrentDate(getClientTimezone())};
      return GraphAPI.fetchBodyHealthMeasurement(
        currentDate.startTime,
        currentDate.endTime,
      );
    },
    onError: (error: any) => {
      dispatch(showError(error));
    },
    cacheTime: 0,
  });

  const {currentWeight, lastWeight} = React.useMemo(() => {
    const weight = get(weightData, 'extremities.raw_data.average_weight');
    const lastWeight = get(weightData, 'last.weight');
    return {
      currentWeight: weight ? kgToLbs(weight) : 0,
      lastWeight: lastWeight ? kgToLbs(lastWeight) : 0,
    };
  }, [weightData]);

  const {data: currentSleepScore} = useQuery({
    queryKey: ['sleepData'],
    queryFn: async (): Promise<any> => {
      const seniorInfo = {...getCurrentSenior()};
      const currentSleepDate = {...getCurrentSleepDate(seniorInfo.timezone)};
      const response = await dispatch(
        getSleepDaily(currentSleepDate.startTime, currentSleepDate.endTime),
      );

      return response.averageSleepScore || '';
    },
    onError: (error: any) => {
      dispatch(showError(error));
    },
    cacheTime: 0,
  });

  React.useEffect(() => {
    const newConditions: any = {
      ...getHeartRateVerbiage(currentHeartRate, threshold),
      ...getWeightVerbiage(currentWeight, lastWeight),
      ...getSleepVerbiage(currentSleepScore),
      ...getActivityVerbiage(currentActivityScore),
    };
    setConditions((conditions) => ({...conditions, ...newConditions}));
  }, [
    threshold,
    currentHeartRate,
    currentWeight,
    lastWeight,
    currentSleepScore,
    currentActivityScore,
  ]);

  return (
    <Box className={classes.container}>
      <ResidentDetailsCard
        cardType={DASHBOARD_VITALS_TYPE.WELLNESS}
        condition={conditions.heartRate}
        activityTitle='Heart Rate'
        activityValue={currentHeartRate ? `${currentHeartRate} bpm` : '-'}
      />
      <ResidentDetailsCard
        cardType={DASHBOARD_VITALS_TYPE.ACTIVITY}
        condition={conditions.activity}
        activityTitle='Activity'
        activityValue={
          currentActivityScore
            ? moment()
                .startOf('day')
                .add(currentActivityScore, 'minutes')
                .format('h[h]m[m]')
            : '-'
        }
      />
      <ResidentDetailsCard
        cardType={DASHBOARD_VITALS_TYPE.SLEEP}
        condition={conditions.sleep}
        activityTitle='Sleep Score'
        activityValue={currentSleepScore || '-'}
      />
      <ResidentDetailsCard
        cardType={DASHBOARD_VITALS_TYPE.HEALTH}
        condition={conditions.weight}
        activityTitle='Weight'
        activityValue={
          currentWeight ? `${roundOff(currentWeight, 1)} lbs` : '-'
        }
      />
    </Box>
  );
};

export default WellnessIndicators;
