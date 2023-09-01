import React, {useState, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from 'hooks/reduxHooks';
import {Grid, Box, Typography, Button, useTheme} from '@mui/material';
import get from 'lodash.get';
import {isEmpty} from 'lodash';
import moment from 'moment-timezone';

import GraphAPI from 'utilities';
import {
  printStartEndTime,
  getTimestamp,
  getCurrentSenior,
} from 'globals/global.functions';
import {Card} from 'common/components/Card';

import {ActivityChart} from './ActivityChart.component';
import {activityStyle} from './Activity.style';
import globalUseStyles from 'config/global.styles';
import {InputFields} from 'common/InputFields';
import {DIALOG_TYPES, activityGoalOptions} from 'globals/global.constants';
import ActivityCard from 'common/ActivityCard/ActivityCard.component';
import {ACTIVITY_CARD_VARIANT} from 'globals/enums';
import CircularGraph from 'common/CircularGraph/CircularGraph.component';
import {
  hideApplicationLoader,
  showApplicationLoader,
} from 'common/ApplicationLoader';
import {useMutation} from 'utilities/react-query';
import {
  getActivityGoalService,
  postActivityGoalService,
} from 'services/activityGoalService/activityGoal.service';
import {
  fetchSeniorDetail,
  getSeniorFullName,
  openOverlayDialog,
  showError,
} from 'store/commonReducer/common.action';

const ActivityComponent = () => {
  const {currentState, startTime, endTime, reRender} = useAppSelector(
    (state: any) => state.wellnessDashboard,
  );
  const {classes} = activityStyle();
  const {classes: globalClasses} = globalUseStyles();
  const theme: any = useTheme();
  const dispatch: any = useAppDispatch();
  const fullName = dispatch(getSeniorFullName());
  const [config, setConfig] = useState<any>({
    loading: true,
    subTitle: '',
    noRecordFound: false,
  });
  const [activityChartData, setActivityChartData] = useState<any>([]);
  const [activityScore, setActivityScore] = useState<number>(0);
  const [targetScore, setTargetScore] = useState<number>(0);
  const [activityPercentage, setActivityPercentage] = useState<number>(0);
  const [totalDuration, setTotalDuration] = useState<any>({
    moderate: 0,
    intense: 0,
    moderateGoal: 120,
    intenseGoal: 20,
    moderatePercentage: '0',
    intensePercentage: '0',
  });
  const [activityGoal, setActivityGoal] = useState<number>(40000);
  const [isEditActivityGoal, setIsEditActivityGoal] = useState<boolean>(false);
  const getActivityGoalMutation = useMutation({
    mutationFn: (): Promise<any> => {
      dispatch(showApplicationLoader());
      const senior = getCurrentSenior();
      return getActivityGoalService({
        senior_id: senior.seniorID,
        account_id: senior.accountID,
      });
    },
    onSuccess: (goal) => {
      setActivityGoal(goal || 40000);
      setIsEditActivityGoal(false);
      dispatch(hideApplicationLoader());
    },
    onError: (error: any) => {
      dispatch(hideApplicationLoader());
      dispatch(showError(error));
    },
  });
  const postActivityGoalMutation = useMutation({
    mutationFn: (goal: number): Promise<any> => {
      dispatch(showApplicationLoader());
      const senior = getCurrentSenior();
      return postActivityGoalService({
        senior_id: senior.seniorID,
        account_id: senior.accountID,
        goal,
      });
    },
    onSuccess: () => {
      getActivityScore();
      getActualActivity();
      getActivityGoalMutation.mutate();
      dispatch(hideApplicationLoader());
      dispatch(
        openOverlayDialog({
          type: DIALOG_TYPES.SUCCESS,
          firstMessage: `Activity Goal is updated successfully for ${fullName}`,
        }),
      );
    },
    onError: (error: any) => {
      dispatch(hideApplicationLoader());
      dispatch(showError(error));
    },
  });

  useEffect(() => {
    if (startTime && endTime && reRender) {
      printStartEndTime(startTime, endTime);
      setConfig({
        ...config,
        loading: true,
        noRecordFound: false,
        subTitle: '',
      });
      getActualActivity();
      getActivityScore();
      getActivityGoalMutation.mutate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startTime, endTime, reRender]);

  const getActivityScore = () => {
    GraphAPI.fetchActivityScore(startTime, endTime).then((res) => {
      setActivityScore(
        Math.floor(get(res, `data.${startTime}.activity_score`, 0)),
      );
      setTargetScore(Math.floor(get(res, 'target_score', 0)));
      setActivityPercentage(Math.round(get(res, 'goal_percentage', 0)));
    });
  };

  const getActualActivity = () => {
    GraphAPI.fetchActivitySeries(startTime, endTime).then((res) => {
      if (isEmpty(res)) {
        setConfig({...config, loading: false, noRecordFound: true});
        return;
      }
      let high: any = [];
      let medium: any = [];
      let yDomain: any = [];
      let totalModerateDuration = 0;
      let totalIntenseDuration = 0;
      Object.entries(res).forEach((data) => {
        const highActivity = get(data[1], 'high_activity', 0);
        const mediumActivity = get(data[1], 'medium_activity', 0);

        const activityDuration = get(data[1], 'activity_duration', 0);
        const xPlot = moment(getTimestamp(parseInt(data[0]))).format();
        const yPlotHigh = (activityDuration * (highActivity / 100)) / 60;
        const yPlotMedium = (activityDuration * (mediumActivity / 100)) / 60;
        yDomain.push(yPlotHigh + yPlotMedium);

        high.push({
          x: xPlot,
          y: yPlotHigh,
        });

        totalIntenseDuration += (activityDuration / 60) * (highActivity / 100);

        medium.push({
          x: xPlot,
          y: yPlotMedium,
        });

        totalModerateDuration +=
          (activityDuration / 60) * (mediumActivity / 100);
      });
      const moderateHour = Math.floor(totalModerateDuration / 60);
      const moderateMin = Math.floor(totalModerateDuration) - moderateHour * 60;
      const intenseHour = Math.floor(totalIntenseDuration / 60);
      const intenseMin = Math.floor(totalIntenseDuration) - intenseHour * 60;
      const moderatePer = Math.round(
        ((moderateHour * 60 + moderateMin) / totalDuration.moderateGoal) * 100,
      );

      const intensePer = Math.round(
        ((intenseHour * 60 + intenseMin) / totalDuration.intenseGoal) * 100,
      );
      setTotalDuration({
        ...totalDuration,
        moderate: [
          moderateHour ? `${moderateHour}h` : '',
          moderateMin ? `${moderateMin}m` : '',
        ].join(' '),
        intense: [
          intenseHour ? `${intenseHour}h` : '',
          intenseMin ? `${intenseMin}m` : '',
        ].join(' '),
        moderatePercentage: `${moderatePer}`,
        intensePercentage: `${intensePer}`,
      });
      setConfig({
        ...config,
        loading: false,
        noRecordFound:
          totalModerateDuration || totalIntenseDuration ? false : true,
        maxDomain: Math.max(...yDomain),
      });
      setActivityChartData([medium, high]);
    });
  };

  const getTitle = () => {
    switch (currentState) {
      case 'day':
        return 'Goal';
      case 'week':
        return 'Week Average';
      case 'month':
        return 'Month Average';
    }
  };

  const handleSetActivityGoal = React.useCallback(() => {
    postActivityGoalMutation.mutate(activityGoal);
  }, [activityGoal, postActivityGoalMutation]);

  useEffect(() => {
    dispatch(fetchSeniorDetail());
  }, []);
  return (
    <Grid spacing={2} container data-testid='activity-container'>
      <Grid item sm={5} flexDirection='column' container spacing={2}>
        <Grid item>
          <Card isLoading={config.loading}>
            <Box
              display='flex'
              style={{
                justifyContent: 'space-between',
                gap: '1rem',
                width: '100%',
              }}>
              <Box display='flex' alignItems='center' gap='1rem'>
                <Typography className={classes.activityGoalLabel}>
                  Set Activity Goal
                </Typography>
                <Box width='140px'>
                  <InputFields
                    menu
                    inputProps={{
                      name: 'activity_goal',
                      disabled: !isEditActivityGoal,
                    }}
                    menuItems={activityGoalOptions}
                    eventProps={{
                      onChange: (e: any) => setActivityGoal(e.target.value),
                      value: activityGoal,
                      'data-testid': 'activity-goal-input',
                    }}
                  />
                </Box>
              </Box>
              <Button
                variant='contained'
                color='primary'
                className={globalClasses.smallButton}
                style={{minWidth: '120px'}}
                onClick={
                  isEditActivityGoal
                    ? handleSetActivityGoal
                    : () => setIsEditActivityGoal(true)
                }
                data-testid='activity-goal-button'>
                {isEditActivityGoal ? 'Save' : 'Edit'}
              </Button>
            </Box>
          </Card>
        </Grid>
        <Grid item>
          <Card
            isLoading={config.loading}
            noRecordFound={config.noRecordFound}
            title={getTitle()}
            stretch>
            <Box
              display='flex'
              alignItems='center'
              justifyContent='space-between'
              gap='1rem'
              width='100%'>
              <Box width='175px' height='175px'>
                <CircularGraph
                  data={[
                    {
                      value: totalDuration.intensePercentage,
                      color: theme?.palette?.customColor?.intenseGreen,
                      key: 'intense',
                    },
                    {
                      value: totalDuration.moderatePercentage,
                      color: theme?.palette?.customColor?.moderateGreen,
                      key: 'moderate',
                    },
                    {
                      value: activityPercentage,
                      color: theme?.palette?.customColor?.activityGreen,
                      key: 'score',
                    },
                  ]}
                  bgColor={theme?.palette?.customColor?.bgGrey}
                />
              </Box>
              <Box
                display='flex'
                flexDirection='column'
                gap='1rem'
                flexGrow={1}>
                <ActivityCard
                  variant={ACTIVITY_CARD_VARIANT.ACTIVITY}
                  goal={`${activityScore}/${targetScore}`}
                  percentage={activityPercentage}
                />
                <ActivityCard
                  variant={ACTIVITY_CARD_VARIANT.MODERATE}
                  goal={`${totalDuration.moderate || '0h'}/2h`}
                  percentage={totalDuration.moderatePercentage}
                />
                <ActivityCard
                  variant={ACTIVITY_CARD_VARIANT.INTENSE}
                  goal={`${totalDuration.intense || '0m'}/20m`}
                  percentage={totalDuration.intensePercentage}
                />
              </Box>
            </Box>
          </Card>
        </Grid>
      </Grid>
      <Grid item sm={7}>
        <Card
          noRecordFound={config.noRecordFound}
          isLoading={config.loading}
          title='Activity'
          stretch>
          <ActivityChart
            type={currentState}
            activityChartData={activityChartData}
            currentState={currentState}
            maxDomain={config.maxDomain}
          />
        </Card>
      </Grid>
    </Grid>
  );
};

export {ActivityComponent};
