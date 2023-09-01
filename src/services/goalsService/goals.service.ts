import {IGoal} from './../../store/goals/goals.types';
import {API} from 'globals/api';
import {GOALS_END_POINTS} from 'globals/apiEndPoints';
import {IGetGoalParams} from 'store/goals/goals.types';
import GoalsDataParser from './parser/goalsDataParser';

export interface IGetGoalsService {
  data: IGoal[];
  lastEvaluatedKey: string | null
}

/**
 * @description API service to get the goals data and parse the data
 * @function getGoalsService
 * @param {IGetGoalParams} params of get goals api
 * @returns {IGetGoalsService}
 */
export async function getGoalsService(params: IGetGoalParams): Promise<any> {
  try {
    const goalsDataResponse = await API({
      url: GOALS_END_POINTS.GET_GOALS_DATA,
      method: 'get',
      params,
    });

    const dataParser = new GoalsDataParser();
    const goalsRowsData = dataParser.parseGoalData(
      goalsDataResponse?.data?.goal_action_data,
    );
    const lastEvaluatedKey = goalsDataResponse?.data?.last_evaluated_key;
    return {data: goalsRowsData, lastEvaluatedKey};
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getGoalActionMapService<T>(params: T): Promise<any> {
  try {
    const response = await API({
      url: GOALS_END_POINTS.GET_GOALS_ACTION_MAP_DATA,
      method: 'get',
      params,
    });

    const dataParser = new GoalsDataParser();
    const parsedData = dataParser.parseGoalActionMapData(
      response?.data?.goal_action_mapping,
    );

    return parsedData;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function postGoalsService<T>(params: T): Promise<any> {
  return await API({
    url: GOALS_END_POINTS.POST_GOALS_DATA,
    method: 'post',
    data: params,
  });
}
