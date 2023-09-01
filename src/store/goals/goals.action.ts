import {IGetGoalsService} from './../../services/goalsService/goals.service';
import {GoalStatus, Roles} from 'globals/enums';

import {IGetGoalParams, IGetGoalsData, IGoalDataParams} from './goals.types';
import {
  showApplicationLoader,
  hideApplicationLoader,
} from 'common/ApplicationLoader';
import {getCurrentSenior} from 'globals/global.functions';
import {DATE_FORMAT, PAGINATION_LIMIT} from 'globals/global.constants';
import moment from 'moment';
import {ISelectedSeniorCareGiver} from 'pages/WCPages/SeniorWellnessPlan/SeniorWellnessPlan.types';
import {
  getGoalActionMapService,
  getGoalsService,
  postGoalsService,
} from 'services/goalsService/goals.service';
import {
  showError,
  getPaginationDataIsolated,
} from 'store/commonReducer/common.action';
import {UPDATE_GOAL_CONTEXT} from 'pages/WCPages/SeniorWellnessPlan/wellnessPlanContext/reducer';
import {IResource} from 'common/Dialogs/dialogComponents/Resources/ResourcesDialog.types';

export const GET_GOALS = 'GET_GOALS';
export const GET_GOALS_SUCCESS = 'GET_GOALS_SUCCESS';
export const GET_GOALS_FAILS = 'GET_GOALS_FAILS';
export const UPDATE_GOALS_PAGE_NUMBER = 'UPDATE_GOALS_PAGE_NUMBER';
export const RESET_GOALS = 'RESET_GOALS';

export const GET_GOAL_ACTION_MAP = 'GET_GOAL_ACTION_MAP';
export const UPDATE_GOAL_ACTION_MAP = 'UPDATE_GOAL_ACTION_MAP';
export const CHANGE_GOAL_ACTION_MAP = 'CHANGE_GOAL_ACTION_MAP';

/**
 * @description action creator to fetch the goals data
 * @function getGoalsData
 * @param versionNo version number
 */
export const getGoalsData =
  (customerID: string, versionNo?: string, lastEvaluatedKey?: any) =>
  async (dispatch: any) => {
    try {
      dispatch(showApplicationLoader());
      dispatch({type: GET_GOALS});

      let params: IGetGoalParams = {
        customer_id: customerID,
        version: versionNo || '',
      };

      if (lastEvaluatedKey) {
        params = {
          ...params,
          last_evaluated_key: lastEvaluatedKey,
        };
      }

      const goalsResponse: IGetGoalsService = await getGoalsService(params);

      dispatch(hideApplicationLoader());

      return {
        data: JSON.parse(JSON.stringify([...goalsResponse.data].reverse())),
        lastEvaluatedKey: goalsResponse.lastEvaluatedKey,
      };
    } catch (error) {
      dispatch(hideApplicationLoader());
      dispatch(showError(error));
    }
  };

/**
 * @function getGoalsSuccess
 * @description action creator to store table
 * @param {IGetGoalsData} tableData
 */
export const getGoalsSuccess =
  (tableData: IGetGoalsData) => (dispatch: any) => {
    const {data, lastEvaluatedKey} = tableData;

    dispatch({
      type: GET_GOALS_SUCCESS,
      payload: {
        data,
        lastEvaluatedKey,
      },
    });
  };

/**
 * @description action creator to fetch error on api get fail
 * @param error
 */
export const getGoalsFail = (error: any) => (dispatch: any) => {
  dispatch(showError(error));

  dispatch({
    type: GET_GOALS_FAILS,
  });
};

/**
 * @description action creator to update the goals data in context and update goal action map
 * @function updateGoals
 * @param {string} value
 * @param {string} name
 * @param rowData
 * @param dispatchContext wellnessplan context dispatch
 */
export const updateGoals =
  (value: any, name: string, rowData: any, dispatchContext: any) =>
  (dispatch: any) => {
    if (
      name === 'action' &&
      rowData.status !== GoalStatus.Completed &&
      rowData.status !== GoalStatus.Cancelled
    ) {
      if (rowData.action) {
        dispatch(
          changeActionMap(
            rowData.goal,
            value,
            rowData.newGoalId || rowData.id,
            rowData.action,
          ),
        );
      } else {
        dispatch(
          selectGoalActionMap(
            rowData.goal,
            value,
            rowData.newGoalId || rowData.id,
          ),
        );
      }
    }

    if (name === 'goal') {
      if (rowData.goal && rowData.action) {
        dispatch(
          changeActionMap(
            value,
            value,
            rowData.newGoalId || rowData.id,
            rowData.action,
            rowData.goal,
          ),
        );
      }
    }

    dispatchContext({
      type: UPDATE_GOAL_CONTEXT,
      payload: {
        id: rowData.newGoalId || rowData.id,
        value,
        name,
      },
    });
  };

/**
 * @function postGoals
 * @description Action creator to save the goals data
 * @param {ISelectedSeniorCareGiver} selectedSeniorCareGiver
 * @param updatedGoals
 * @param deletedGoals
 */
export const postGoals =
  (
    selectedSeniorCareGiver: ISelectedSeniorCareGiver,
    updatedGoals: any,
    deletedGoals: any,
  ) =>
  async (dispatch: any, getState: any) => {
    try {
      dispatch(showApplicationLoader());

      const careAgentName = getState().auth.userName;
      const careAgentId = getState().auth.userId;
      const wellnessState = getState().wellnessPlan;
      const tableData = getState().goals.goalsRowsData;

      const comparer = (otherArray: any) => {
        return function (current: any) {
          return (
            otherArray.filter(function (other: any) {
              return (
                other.status == current.status &&
                other.startDate == current.startDate &&
                other.progress == current.progress &&
                other.targetDate == current.targetDate &&
                other.notes == current.notes &&
                other.id == current.id &&
                JSON.stringify(other.resource) ===
                  JSON.stringify(current.resource)
              );
            }).length == 0
          );
        };
      };

      const params: IGoalDataParams = {
        customer_id: selectedSeniorCareGiver.value,
        role: Roles.Senior,
        last_updated_date: moment().format(DATE_FORMAT),
        last_updated_by: `${careAgentName.first_name} ${careAgentName.last_name}`,
        careagent_id: careAgentId,
        current_version: `${parseInt(wellnessState.currentVersion || 0) + 1}`,
        goal_actions: [...updatedGoals.reverse(), ...deletedGoals]
          .filter(comparer(tableData))
          .map((data: any) => {
            const resource =
              data.resource?.map((item: IResource) => {
                const {
                  resourceId,
                  resourceVersion,
                  createdBy,
                  lastUpdatedBy,
                  lastViewed,
                  ...rest
                } = item;
                return {
                  ...rest,
                  resource_id: resourceId,
                  resource_version: resourceVersion,
                  created_by: createdBy,
                  last_updated_by: lastUpdatedBy,
                  last_viewed: lastViewed,
                };
              }) || null;
            const apiPayload = {
              goal: data.goal,
              action: data.action,
              status: data.status,
              percentage: `${data.progress || 0}`,
              start_date: data.startDate,
              target_date: data.targetDate,
              notes: data.notes,
              goal_action_id: data.id,
              resource,
            };
            if (data.isNewGoal) {
              delete apiPayload.goal_action_id;
            }
            return apiPayload;
          }),
      };

      await postGoalsService(params);
      dispatch(getGoalActionMap(selectedSeniorCareGiver.value));
      dispatch(
        getPaginationDataIsolated(
          () => getGoalsData(selectedSeniorCareGiver.value),
          PAGINATION_LIMIT.goals,
          '',
          1,
          getGoalsSuccess,
          getGoalsFail,
          '',
          '',
        ),
      );
    } catch (error) {
      dispatch(hideApplicationLoader());
      dispatch(showError(error));
    }
  };

/**
 * @function updateGoalsPageNumber
 * @description action creator to update the page number of wellness plan table
 * @param {string | number} value
 */
export const updateGoalsPageNumber =
  (value: string | number) => (dispatch: any) => {
    dispatch({type: UPDATE_GOALS_PAGE_NUMBER, payload: value});
  };

/**
 * @description action creator to fetch goal action map
 * @function getGoalActionMap
 */
export const getGoalActionMap =
  (customerID: string) => async (dispatch: any) => {
    try {
      const params = {
        customer_id: customerID,
      };

      const response = await getGoalActionMapService(params);

      dispatch({type: GET_GOAL_ACTION_MAP, payload: {response}});
    } catch (error) {
      dispatch(hideApplicationLoader());
      dispatch(showError(error));
    }
  };

/**
 * @description action creator to select action for the goal(first time goal and action selection)
 * @function selectGoalActionMap
 * @param goalName
 * @param actionName
 * @param rowId
 */
export const selectGoalActionMap =
  (goalName: string, actionName: string, rowId: string | number) =>
  (dispatch: any, getState: any) => {
    const goalActionMap = getState().goals.goalsActionMap;

    // selecting action
    goalActionMap[goalName].actions[actionName].selected = true;
    goalActionMap[goalName].actions[actionName].rowId.push(rowId);
    goalActionMap[goalName].rowIds.push(rowId);

    const isAll = Object.values(goalActionMap[goalName].actions).every(
      (item: any) => item.selected,
    );

    if (isAll) {
      goalActionMap[goalName].occupied = true;
    } else {
      goalActionMap[goalName].occupied = false;
    }

    dispatch({type: UPDATE_GOAL_ACTION_MAP, payload: {goalActionMap}});
  };

/**
 * @description action creator to update maping when changing the goal or action
 * @function changeActionMap
 * @param goalName
 * @param actionName
 * @param rowId
 * @param removeAction
 * @param removeGoal
 */
export const changeActionMap =
  (
    goalName: string,
    actionName: string,
    rowId: string,
    removeAction: string,
    removeGoal?: string,
  ) =>
  (dispatch: any, getState: any) => {
    const goalActionMap = getState().goals.goalsActionMap;

    if (removeGoal) {
      //if changing goal, remove ids from previous goal
      goalActionMap[removeGoal].actions[removeAction].selected = false;
      goalActionMap[removeGoal].actions[removeAction].rowId = goalActionMap[
        removeGoal
      ].actions[removeAction].rowId.filter((id: string) => id !== rowId);

      goalActionMap[removeGoal].rowIds = goalActionMap[
        removeGoal
      ].rowIds.filter((id: string) => id !== rowId);
      goalActionMap[removeGoal].occupied = false;

      // update ids in new goal and action
    } else {
      //if goal is same and changing action
      goalActionMap[goalName].actions[removeAction].selected = false;
      goalActionMap[goalName].actions[removeAction].rowId = goalActionMap[
        goalName
      ].actions[removeAction].rowId.filter((id: string) => id !== rowId);

      goalActionMap[goalName].actions[actionName].selected = true;
      goalActionMap[goalName].actions[actionName].rowId.push(rowId);
      goalActionMap[goalName].rowIds.push(rowId);
    }

    dispatch({type: UPDATE_GOAL_ACTION_MAP, payload: {goalActionMap}});
  };

/**
 * @description when deleting the row from table
 * @function statusChangeGoalActionMap
 * @param goalName
 * @param actionName
 * @param rowId
 */
export const statusChangeGoalActionMap =
  (goalName: string, actionName: string, rowId: string | number) =>
  (dispatch: any, getState: any) => {
    let goalActionMap = getState().goals.goalsActionMap;

    goalActionMap = {
      ...goalActionMap,
      [goalName]: {
        ...goalActionMap[goalName],
        goalName,
        occupied: false,
        rowIds:
          goalActionMap[goalName]?.rowIds?.length > 0
            ? goalActionMap[goalName]?.rowIds.filter(
                (id: string) => id !== rowId,
              )
            : [],
        actions: {
          ...goalActionMap[goalName]?.actions,
          [actionName]: {
            ...goalActionMap[goalName]?.actions[actionName],
            selected: false,
            actionName,
            rowId:
              goalActionMap[goalName]?.actions[actionName]?.rowId?.length > 0
                ? goalActionMap[goalName].actions[actionName].rowId.filter(
                    (id: string) => id !== rowId,
                  )
                : [],
          },
        },
      },
    };

    dispatch({type: UPDATE_GOAL_ACTION_MAP, payload: {goalActionMap}});
  };

/**
 * @description reset Goals Data
 * @function resetGoals
 */
export const resetGoals = () => (dispatch: any) => {
  dispatch({
    type: RESET_GOALS,
  });
};
