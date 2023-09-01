import {API} from 'globals/api';
import {
  IGetActivityGoalParams,
  IPostActivityGoalData,
} from './activityGoalService.types';
import {ACTIVITY_GOAL_ENDPOINTS} from 'globals/apiEndPoints';
import {APIMethod} from 'globals/enums';

/**
 * @function getActivityGoalService
 * @description method to get activity goal via api response.
 * @param {IGetActivityGoalParams} params
 * @returns
 */
export const getActivityGoalService = async (
  params: IGetActivityGoalParams,
): Promise<number> => {
  try {
    const response = await API({
      url: ACTIVITY_GOAL_ENDPOINTS.GET_ACTIVITY_GOAL,
      method: APIMethod.Get,
      params,
    });
    const data = response.data?.data || {};
    const keys = Object.keys(data);
    return data[keys[0]]?.target_score || 0;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

/**
 * @function postActivityGoalService
 * @description method to post activity goal.
 * @param {IPostActivityGoalData} data
 */
export const postActivityGoalService = async (data: IPostActivityGoalData) => {
  try {
    const response = await API({
      url: ACTIVITY_GOAL_ENDPOINTS.POST_ACTIVITY_GOAL,
      method: APIMethod.Post,
      data,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
