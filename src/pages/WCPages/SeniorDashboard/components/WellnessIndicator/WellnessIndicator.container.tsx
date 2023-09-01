/* eslint-disable max-len */
import React, {useState, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from 'hooks/reduxHooks';
import get from 'lodash.get';

import GraphAPI from 'utilities';
import {
  getCurrentDate,
  getCurrentSleepDate,
  getCurrentSenior,
  kgToLbs,
} from 'globals/global.functions';
import {getSleepDaily} from 'pages/WCPages/WellnessDashboard/components/Sleep/sleep.action';

import {WellnessIndicatorComponent} from './WellnessIndicator.component';
import {getClientTimezone} from 'globals/date.functions';
import {useQuery} from 'utilities/react-query';
import {getThresholdService} from 'services/careInsightService/threshold.service';
import {showError} from 'store/commonReducer/common.action';
import {
  calulateWellnessScore,
  getWellnessSurvey,
} from 'pages/WCPages/Assessments/Wellbieng/WellnessSurvey/WellnessSurvey.action';

const WellnessIndicator = (props: any) => {
  const dispatch: any = useAppDispatch();
  const [currentHeartRate, setCurrentHeartRate] = useState();
  const [currentWeight, setCurrentWeight] = useState<number>();
  const [currentActivityScore, setCurrentActivityScore] = useState();
  const [currentSleepScore, setCurrentSleepScore] = useState();
  const [lastWeight, setLastWeight] = useState<number>();
  const [wellnessCurrentScore, setWellnessScore] = useState({});
  const accountCreatedDate = useAppSelector(
    (state: any) => state.common.seniorDetail.minimalInfo.created_date,
  );

  useEffect(() => {
    const seniorInfo = {...getCurrentSenior()};
    const currentDate = {...getCurrentDate(getClientTimezone())};
    const currentSleepDate = {...getCurrentSleepDate(seniorInfo.timezone)};

    GraphAPI.fetchHeartExtreme(currentDate.startTime, currentDate.endTime).then(
      (res) => {
        setCurrentHeartRate(get(res, 'last'));
      },
    );

    GraphAPI.fetchBodyHealthMeasurement(
      currentDate.startTime,
      currentDate.endTime,
    ).then((res) => {
      const weight = get(res, 'extremities.raw_data.average_weight');
      const lastWeight = get(res, 'last.weight');
      setCurrentWeight(kgToLbs(weight));
      setLastWeight(kgToLbs(lastWeight));
    });

    GraphAPI.fetchActivityScore(
      currentDate.startTime,
      currentDate.endTime,
    ).then((res) => {
      setCurrentActivityScore(
        get(res, `data.${currentDate.startTime}.activity_score`),
      );
    });
    const sleepResponse: any = dispatch(
      getSleepDaily(currentSleepDate.startTime, currentSleepDate.endTime),
    );

    setCurrentSleepScore(sleepResponse.averageSleepScore);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (accountCreatedDate) {
      const wellnessScore = async () => {
        const {data} = await dispatch(getWellnessSurvey(true));
        const {survey} = calulateWellnessScore(data);
        setWellnessScore({score: survey[0].score, total: survey[0].scoreLimit});
      };
      wellnessScore();
    }
  }, [accountCreatedDate]);

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

  return (
    <WellnessIndicatorComponent
      currentHeartRate={currentHeartRate}
      currentWeight={currentWeight}
      currentActivityScore={currentActivityScore}
      currentSleepScore={currentSleepScore}
      lastWeight={lastWeight}
      threshold={threshold}
      wellnessScore={wellnessCurrentScore}
      {...props}
    />
  );
};

export default WellnessIndicator;
