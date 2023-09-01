import moment from 'moment';
import {constructName} from 'globals/global.functions';
import {DATE_FORMAT, DIALOG_TYPES} from 'globals/global.constants';
import {
  getCareGiver,
  openDialog,
  openOverlayDialog,
  showError,
} from 'store/commonReducer/common.action';
import {
  getWellnessPlanService,
  updateWellnessPlanService,
} from 'services/wellnessPlanService/wellnessPlan.service';
import {
  hideApplicationLoader,
  showApplicationLoader,
} from 'common/ApplicationLoader';

import {
  IChallenge,
  IGetWellnessPlanPayload,
  IMemberPriority,
  IResourcesDialogData,
  ISelectedSeniorCareGiver,
  IWellnessPlanDetail,
} from './SeniorWellnessPlan.types';
import {IWellnessPlanData} from 'services/wellnessPlanService/wellnessPlan.types';
import {GoalStatus} from 'globals/enums';
export const GET_WELLNESS_PLAN = 'GET_WELLNESS_PLAN';
export const RESET_WELLNESS_PLAN = 'RESET_WELLNESS_PLAN';

export const getWellnessPlan =
  (customerID: string, versionNo?: string) => async (dispatch: any) => {
    dispatch(showApplicationLoader());
    try {
      const params: IGetWellnessPlanPayload = {
        customer_id: customerID,
        version: versionNo || '',
      };

      const wellnessPlan: IWellnessPlanData = await getWellnessPlanService(
        params,
      );

      if (wellnessPlan !== null) {
        dispatch({
          type: GET_WELLNESS_PLAN,
          payload: {
            ...wellnessPlan,
          },
        });
      }
      dispatch(hideApplicationLoader());
    } catch (error) {
      dispatch(hideApplicationLoader());
      dispatch(showError(error));
      return;
    }
  };

export const getSeniorCareGiver =
  () => async (dispatch: any, getState: any) => {
    let list = [];
    const caregiverList = await dispatch(getCareGiver());

    const {user_id, name} = getState().common.seniorDetail.minimalInfo;

    const seniorList = {
      value: user_id,
      label: `Senior - ${name.first_name} ${name.last_name}`,
    };

    list.push(seniorList);

    caregiverList?.forEach((data: any) => {
      list.push({
        value: data.id,
        label: `Caregiver - ${data.name.firstName} ${data.name.lastName}`,
        data: data,
      });
    });
    return list;
  };

export const updateWellnessPlan =
  (
    leftField: IWellnessPlanDetail,
    memberPriority: IMemberPriority[],
    challenges: IChallenge[],
    isNextVersion: boolean,
    selectedSeniorCareGiver: ISelectedSeniorCareGiver,
  ) =>
  async (dispatch: any, getState: any) => {
    const wellnessState = getState().wellnessPlan;
    const careAgentName = getState().auth.userName;
    const careAgentId = getState().auth.userId;
    if (!isNextVersion) {
      return;
    }
    dispatch(showApplicationLoader());
    try {
      const params = {
        customer_id: selectedSeniorCareGiver.value,
        customer_name: selectedSeniorCareGiver.label,
        role: 'senior',
        wellness_plan_date_started:
          wellnessState.dateStarted || moment().format(DATE_FORMAT),
        last_updated_date: moment().format(DATE_FORMAT),
        last_updated_by: `${careAgentName.first_name} ${careAgentName.last_name}`,
        careagent_id: careAgentId,
        last_version: wellnessState.currentVersion || '0',
        current_version: isNextVersion
          ? `${parseInt(wellnessState.currentVersion || 0) + 1}`
          : wellnessState.currentVersion,
        wellness_plan_details: {
          situation: leftField.situation.value,
          background: leftField.background.value,
          assessment: leftField.assessment.value,
          recommendations: leftField.recommendation.value,
          member_priorities: memberPriority.map((data: any) => {
            return {seq: data.seq, value: data.value};
          }),
          challenges: challenges.map((data: any) => {
            return {seq: data.seq, value: data.value};
          }),
        },
      };
      await updateWellnessPlanService(params);
      await dispatch(getWellnessPlan(selectedSeniorCareGiver.value));
      dispatch(
        openOverlayDialog({
          type: DIALOG_TYPES.SUCCESS,
          firstMessage: `Wellness Plan has been successfully saved`,
        }),
      );
      dispatch(hideApplicationLoader());
    } catch (error) {
      dispatch(hideApplicationLoader());
      dispatch(showError(error));
    }
  };

export const openResourcesDialog =
  (rowData: any, dispatchContext: any) =>
  async (dispatch: any, getState: any) => {
    const {goals, wellnessPlan, auth} = getState();
    const {seniorName} = wellnessPlan;
    const {userName} = auth;
    const fullName = constructName(
      userName.first_name,
      userName.middle_name,
      userName.last_name,
    );
    const [role, name] = seniorName.split(' - ');
    const goalsRowsData = goals.goalsRowsData;
    const goalData = goalsRowsData.filter(
      (goal: any) => goal.id === rowData.id,
    )[0];
    let existingResourcesData = [];
    if (goalData && goalData.resource && goalData.resource.length) {
      existingResourcesData = goalData.resource;
    }
    const isDisabled = Boolean(
      !wellnessPlan.isLatestVersion ||
        rowData.status === GoalStatus.Completed ||
        rowData.status === GoalStatus.Cancelled,
    );
    const resourcesData: IResourcesDialogData = {
      careagentId: wellnessPlan.careagentId,
      currentVersion: wellnessPlan.currentVersion,
      seniorId: wellnessPlan.seniorId,
      role,
      name,
      existingResourcesData,
      goalData: rowData,
      dispatchGoalsContext: dispatchContext,
      isDisabled,
      fullName,
    };
    dispatch(
      openDialog({
        type: DIALOG_TYPES.RESOURCES,
        dialogTitle: 'Resources',
        data: resourcesData,
      }),
    );
  };
