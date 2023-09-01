import React from 'react';
import {useAppDispatch, useAppSelector} from 'hooks/reduxHooks';
import {Box, Button, Grid} from '@mui/material';

import {SubHeader} from 'common/SubHeader';
import {ERROR_MESSAGE, REGEX} from 'globals/global.constants';
import useAutoScroll from 'hooks/useAutoScroll';

import Goals from './goals/Goals.component';
import WellnessLeftPanel from './components/WellnessLeftPanel.component';
import WellnessRightPanel from './components/WellnessRightPanel.component';
import SeniorWellnessInfo from './SeniorWellnessInfo.component';
import {
  getWellnessPlan,
  updateWellnessPlan,
  RESET_WELLNESS_PLAN,
} from './SeniorWellnessPlan.action';
import {
  IChallenge,
  IMemberPriority,
  ISelectedSeniorCareGiver,
  IWellnessPlanDetail,
} from './SeniorWellnessPlan.types';
import {INITIAL_STATE} from './wellnessPlanReducer.reducer';
import WellnessPlanProvider, {
  WellnessPlanContext,
} from './wellnessPlanContext/WellnessPlan.context';
import {IWellnessPlanData} from 'services/wellnessPlanService/wellnessPlan.types';
import {postGoals} from 'store/goals/goals.action';
import {validateDate} from 'globals/date.functions';
import moment from 'moment';
import {UPDATE_GOAL_ERROR} from './wellnessPlanContext/reducer';
import {trimValues} from 'globals/global.functions';

const SeniorWellnessPlanComponent = () => {
  const dispatch: any = useAppDispatch();
  const {state, dispatchContext} = React.useContext(WellnessPlanContext);

  /*
   ref limit the section where we have to search data-error: error attribute for autoscroll feature
   scrollToFirstError handles the focus of user
  */
  const {ref, scrollToFirstError} = useAutoScroll();

  const wellnessData: IWellnessPlanData = useAppSelector(
    (state: any) => state.wellnessPlan,
  );
  const tableData = useAppSelector((state: any) => state.goals.goalsRowsData);

  const [selectedSeniorCareGiver, setSelectedSeniorCareGiver] =
    React.useState<ISelectedSeniorCareGiver>({
      value: '',
      label: '',
    });
  const [showWellnessPlan, setShowWellnessPlan] =
    React.useState<boolean>(false);
  const [leftField, setLeftField] = React.useState<IWellnessPlanDetail>(
    INITIAL_STATE.wellnessPlanDetail,
  );
  const [memberPriority, setMemberPriority] = React.useState<IMemberPriority[]>(
    INITIAL_STATE.memberPriority,
  );
  const [challenges, setChallenges] = React.useState<IChallenge[]>(
    INITIAL_STATE.challenges,
  );
  React.useEffect(() => {
    if (selectedSeniorCareGiver?.value) {
      dispatch(getWellnessPlan(selectedSeniorCareGiver?.value));
    }
    return () => {
      dispatch({type: RESET_WELLNESS_PLAN});
    };
  }, [dispatch, selectedSeniorCareGiver]);

  React.useEffect(() => {
    setShowWellnessPlan(wellnessData.currentVersion ? true : false);
    setLeftField(wellnessData.wellnessPlanDetail);
    setMemberPriority(wellnessData.memberPriority);
    setChallenges(wellnessData.challenges);
  }, [wellnessData]);

  const compareData = React.useCallback(() => {
    // removing isEdited field from each row
    const rowsData = [...state.goalsRowsData, ...state.deleteRowsData].map(
      (rowData) => {
        const {isEdited, ...rest} = rowData;
        return rest;
      },
    );
    // comparing data to check if there is any change
    if (
      JSON.stringify(leftField) ==
        JSON.stringify(wellnessData.wellnessPlanDetail) &&
      JSON.stringify(memberPriority) ==
        JSON.stringify(wellnessData.memberPriority) &&
      JSON.stringify(challenges) == JSON.stringify(wellnessData.challenges) &&
      // comparing newData with existing data
      JSON.stringify(rowsData) === JSON.stringify(tableData)
    ) {
      return false;
    }
    return true;
  }, [
    challenges,
    leftField,
    memberPriority,
    state.deleteRowsData,
    state.goalsRowsData,
    tableData,
    wellnessData.challenges,
    wellnessData.memberPriority,
    wellnessData.wellnessPlanDetail,
  ]);

  const checkGoalsError = (): boolean => {
    let isError = false;
    const data = state.goalsRowsData.map((data: any) => {
      if (!data.goal) {
        isError = true;
        data.goalError = true;
        data.goalErrorText = ERROR_MESSAGE.REQUIRED_FIELD;
        return data;
      }

      if (!data.action) {
        isError = true;
        data.actionError = true;
        data.actionErrorText = ERROR_MESSAGE.REQUIRED_FIELD;
        return data;
      }

      if (data.startDate && !validateDate(data.startDate)) {
        isError = true;
        return data;
      }

      if (data.targetDate && !validateDate(data.targetDate)) {
        isError = true;
        return data;
      }

      if (Math.sign(moment(data.targetDate).diff(data.startDate)) === -1) {
        isError = true;
        return data;
      }

      return data;
    });

    if (isError) {
      dispatchContext({
        type: UPDATE_GOAL_ERROR,
        payload: data,
      });
    }

    return isError;
  };

  const handleSave = () => {
    let isError: boolean = false;
    Object.entries(leftField).forEach(([key, value]) => {
      if (!REGEX.BLANK_FIELD.test(value.value)) {
        isError = true;
        setLeftField((prevState: any) => ({
          ...prevState,
          [key]: {
            ...prevState[key],
            error: true,
            errorText: ERROR_MESSAGE.REQUIRED_FIELD,
          },
        }));
      }
    });

    setMemberPriority(
      [...memberPriority].map((data: IMemberPriority) => {
        if (!REGEX.BLANK_FIELD.test(data.value)) {
          isError = true;
          return {
            ...data,
            error: true,
            errorText: ERROR_MESSAGE.REQUIRED_FIELD,
          };
        } else return data;
      }),
    );

    setChallenges(
      [...challenges].map((data: IChallenge) => {
        if (!REGEX.BLANK_FIELD.test(data.value)) {
          isError = true;
          return {
            ...data,
            error: true,
            errorText: ERROR_MESSAGE.REQUIRED_FIELD,
          };
        } else return data;
      }),
    );

    const isNextVersion: boolean = compareData();
    const goalsError = checkGoalsError();
    if (!isError && !goalsError && isNextVersion) {
      const trimmedGoalsRowsData = trimValues(state.goalsRowsData);
      const trimmedDeleteRowsData = trimValues(state.deleteRowsData);
      const trimmedLeftField = trimValues(leftField);
      const trimmedMemberPriority = trimValues(memberPriority);
      const trimmedChallenges = trimValues(challenges);

      dispatch(
        updateWellnessPlan(
          trimmedLeftField,
          trimmedMemberPriority,
          trimmedChallenges,
          isNextVersion,
          selectedSeniorCareGiver,
        ),
      );
      dispatch(
        postGoals(
          selectedSeniorCareGiver,
          trimmedGoalsRowsData,
          trimmedDeleteRowsData,
        ),
      );
    }
    scrollToFirstError();
  };

  return (
    <Box data-testid='senior-wellness-plan'>
      <SubHeader />
      <SeniorWellnessInfo
        selectedSeniorCareGiver={selectedSeniorCareGiver}
        setSelectedSeniorCareGiver={setSelectedSeniorCareGiver}
      />
      {/* ref is used for autoscroll feature */}
      <Box ref={ref}>
        {showWellnessPlan ? (
          <>
            <Grid container>
              <Grid sm={5}>
                <WellnessLeftPanel data={leftField} setData={setLeftField} />
              </Grid>
              <Grid sm={7}>
                <WellnessRightPanel
                  name='memberPriority'
                  item={memberPriority}
                  updateItem={setMemberPriority}
                  cardTitle='Priorities'
                  inputPlaceholder='Please enter priority here'
                  buttonLabel='Add Priority'
                />
                <WellnessRightPanel
                  name='challenges'
                  item={challenges}
                  updateItem={setChallenges}
                  cardTitle='Challenges'
                  inputPlaceholder='Please enter challenge here'
                  buttonLabel='Add Challenge'
                />
              </Grid>
            </Grid>
            <Goals customerID={selectedSeniorCareGiver.value} />
          </>
        ) : (
          <Box
            style={{
              display: 'flex',
              justifyContent: 'center',
              width: '100%',
              marginTop: '80px',
            }}>
            <Button
              variant='contained'
              color='primary'
              size='large'
              onClick={() => setShowWellnessPlan(true)}
              style={{
                width: '256px',
              }}>
              Add New Wellness Plan
            </Button>
          </Box>
        )}
      </Box>
      {showWellnessPlan && (
        <Box
          display='flex'
          justifyContent='center'
          alignItems='center'
          style={{marginTop: 125, marginBottom: 124}}>
          <Button
            data-testid='handle-save'
            variant='contained'
            color='primary'
            size='large'
            disabled={!wellnessData.isLatestVersion}
            onClick={handleSave}>
            Save
          </Button>
        </Box>
      )}
    </Box>
  );
};

const SeniorWellnessPlan = () => {
  return (
    <WellnessPlanProvider>
      <SeniorWellnessPlanComponent />
    </WellnessPlanProvider>
  );
};
export default SeniorWellnessPlan;
