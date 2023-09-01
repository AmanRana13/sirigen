/* eslint-disable max-len */
import React, {useState} from 'react';
import {Box} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import {
  getCurrentSenior,
  getQueryParamTimezone,
  isValueAvailable,
  roundOff,
} from 'globals/global.functions';

import ResidentDetailsCard from 'pages/FacilityPages/AllResidents/component/ResidentsCard/ResidentDetailsCard.component ';
import {
  ACTIVITY_CONDITION,
  DASHBOARD_VITALS_TYPE,
  HEART_RATE_CONDITION,
  SLEEP_CONDITION,
  WEIGHT_CONDITION,
  WELLNESS_CONDITION,
} from 'globals/enums';
import moment from 'moment';
import {
  getActivityVerbiage,
  getHeartRateVerbiage,
  getSleepVerbiage,
  getWeightVerbiage,
  getWellnessVerbiage,
} from 'pages/FacilityPages/ResidentDashboard/WellnessIndicator.utility';

interface IConditions {
  heartRate: HEART_RATE_CONDITION;
  activity: ACTIVITY_CONDITION;
  sleep: SLEEP_CONDITION;
  weight: WEIGHT_CONDITION;
  wellness: WELLNESS_CONDITION;
}

const WellnessIndicatorComponent = ({
  currentHeartRate,
  currentWeight,
  currentActivityScore,
  currentSleepScore,
  lastWeight,
  threshold,
  wellnessScore,
}: any) => {
  const [conditions, setConditions] = useState<IConditions>({
    heartRate: HEART_RATE_CONDITION.NO_DATA,
    activity: ACTIVITY_CONDITION.NO_DATA,
    sleep: SLEEP_CONDITION.NO_DATA,
    weight: WEIGHT_CONDITION.NO_DATA,
    wellness: WELLNESS_CONDITION.NO_DATA,
  });
  const navigate = useNavigate();
  const {seniorID, accountID, timezone} = getCurrentSenior();

  React.useEffect(() => {
    const newConditions: any = {
      ...getHeartRateVerbiage(currentHeartRate, threshold),
      ...getWeightVerbiage(currentWeight, lastWeight),
      ...getSleepVerbiage(currentSleepScore),
      ...getActivityVerbiage(currentActivityScore),
      ...getWellnessVerbiage(wellnessScore?.score),
    };
    setConditions((conditions) => ({...conditions, ...newConditions}));
  }, [
    threshold,
    currentHeartRate,
    currentWeight,
    lastWeight,
    currentSleepScore,
    currentActivityScore,
    wellnessScore,
  ]);

  const onHandleClick = (initialExpand: string) => {
    initialExpand === 'wellness-survey'
      ? navigate(
          `/senior/${seniorID}/${accountID}/${getQueryParamTimezone(
            timezone,
          )}/assessments/wellness-survey`,
        )
      : navigate(
          `/senior/${seniorID}/${accountID}/${getQueryParamTimezone(
            timezone,
          )}/wellness-dashboard?initialExpand=${initialExpand}`,
        );
  };

  return (
    <Box
      display='flex'
      data-testid='WellnessIndicator'
      ml={2}
      flexWrap='wrap'
      gap='7px'>
      <ResidentDetailsCard
        cardType={DASHBOARD_VITALS_TYPE.WELLNESS}
        condition={conditions.heartRate}
        activityTitle='Heart Rate'
        activityValue={isValueAvailable({
          value: currentHeartRate,
          showValue: `${currentHeartRate} bpm`,
        })}
        onClick={() => onHandleClick('heart_rate')}
      />
      <ResidentDetailsCard
        cardType={DASHBOARD_VITALS_TYPE.ACTIVITY}
        condition={conditions.activity}
        activityTitle='Activity'
        activityValue={isValueAvailable({
          value: currentActivityScore,
          showValue: moment()
            .startOf('day')
            .add(currentActivityScore, 'minutes')
            .format('h[h]m[m]'),
        })}
        onClick={() => onHandleClick('activity')}
      />
      <ResidentDetailsCard
        cardType={DASHBOARD_VITALS_TYPE.SLEEP}
        condition={conditions.sleep}
        activityTitle='Sleep Score'
        activityValue={isValueAvailable({
          value: currentSleepScore,
        })}
        onClick={() => onHandleClick('sleep')}
      />
      <ResidentDetailsCard
        cardType={DASHBOARD_VITALS_TYPE.HEALTH}
        condition={conditions.weight}
        activityTitle='Weight'
        onClick={() => onHandleClick('body_health')}
        activityValue={isValueAvailable({
          value: currentWeight,
          showValue: `${roundOff(currentWeight)}  lb`,
        })}
      />
      <ResidentDetailsCard
        cardType={DASHBOARD_VITALS_TYPE.WELLBEING}
        condition={conditions.wellness}
        activityTitle='Positive Answers'
        activityValue={isValueAvailable({
          value: wellnessScore?.score,
          showValue: `${wellnessScore.score}/${wellnessScore.total}`,
        })}
        onClick={() => onHandleClick('wellness-survey')}
      />
    </Box>
  );
};
export {WellnessIndicatorComponent};
