import {isEmpty} from 'lodash';
import {API} from 'globals/api';
import {
  IChallenge,
  IMemberPriority,
} from 'pages/WCPages/SeniorWellnessPlan/SeniorWellnessPlan.types';
import {WELLESS_PLAN_END_POINTS} from 'globals/apiEndPoints';

import {
  IWellnessPlanResponse,
  IMemberPriorityResponse,
  IChallengeResponse,
  IWellnessPlanData,
} from './wellnessPlan.types';

/**
 * @function getWellnessPlanService
 * @description method to get wellness plan data via api response.
 * @param {*} params
 * @returns wellness plan data.
 */
export async function getWellnessPlanService<T>(params?: T): Promise<any> {
  try {
    const response = await API({
      url: WELLESS_PLAN_END_POINTS.GET_WELLNESS_PLAN,
      method: 'get',
      params: params,
    });
    return createWellnessPlanData(response.data);
  } catch (error) {
    return error;
    //throw error;
  }
}

/**
 * @function updateWellnessPlanService
 * @description method to update welness plan data.
 * @param {*} params
 */
export async function updateWellnessPlanService<T>(params?: T): Promise<any> {
  try {
    await API({
      url: WELLESS_PLAN_END_POINTS.UPDATE_WELLNESS_PLAN,
      method: 'post',
      data: params,
    });
  } catch (error) {
    return error;
  }
}

const createWellnessPlanData = (
  data: IWellnessPlanResponse,
): IWellnessPlanData | null => {
  if (isEmpty(data)) {
    return null;
  }
  return {
    wellnessPlanDetail: {
      situation: {
        error: false,
        errorText: '',
        value: data.wellness_plan_details.situation,
      },
      background: {
        error: false,
        errorText: '',
        value: data.wellness_plan_details.background,
      },
      assessment: {
        error: false,
        errorText: '',
        value: data.wellness_plan_details.assessment,
      },
      recommendation: {
        error: false,
        errorText: '',
        value: data.wellness_plan_details.recommendations,
      },
    },
    memberPriority: mapData(data.wellness_plan_details.member_priorities),
    challenges: mapData(data.wellness_plan_details.challenges),
    careagentId: data.careagent_id,
    createdDate: data.created_date,
    currentVersion: data.current_version,
    lastUpdatedBy: data.last_updated_by,
    lastUpdatedDate: data.last_updated_date,
    lastVersion: data.last_version,
    lastAvailableVersion: data.last_available_version,
    modificationDate: data.modification_date,
    seniorId: data.customer_id,
    seniorName: data.customer_name,
    dateStarted: data.wellness_plan_date_started,
    isLatestVersion:
      data.last_available_version == parseInt(data.current_version),
  };
};

const mapData = (
  item: IMemberPriorityResponse[] | IChallengeResponse[],
): IMemberPriority[] | IChallenge[] => {
  return item.map((itemData: IMemberPriorityResponse | IChallengeResponse) => {
    return {
      error: false,
      errorText: '',
      value: itemData.value,
      seq: itemData.seq,
    };
  });
};
