import {API} from 'globals/api';
import {SENIOR_SERVICE_END_POINTS} from 'globals/apiEndPoints';
import {APIMethod} from 'globals/enums';
import {getChunks} from 'globals/global.functions';
import {IUserId} from 'globals/global.types';
import uniqBy from 'lodash.uniqby';

/**
 * @function getSeniorListService
 * @description method to get senior list via api response.
 * @param {*} params
 * @returns ids: array of {senior_id, account_id}, LastEvaluatedKey
 */
export async function getSeniorListService<T>(params?: T): Promise<any> {
  try {
    const response = await API({
      url: SENIOR_SERVICE_END_POINTS.GET_SENIOR_LIST,
      method: 'get',
      params: params,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    let errorMessage = error.response.data.message;
    throw new Error(errorMessage);
  }
}

/**
 * @function getSeniorMappingService
 * @description method to get senior data mapping
 * @param {IUserId[]} userList list of users to fetch data for
 * @returns object of Senior Data
 */
export async function getSeniorMappingService(
  userList: IUserId[],
  isPost: boolean = false,
): Promise<any> {
  const chunks = getChunks<IUserId>(uniqBy(userList, 'user_id'), 100);
  let data: any = {};
  try {
    for (let i = 0; i < chunks.length; i++) {
      const config = isPost
        ? {
            method: 'post',
            data: chunks[i],
          }
        : {
            method: 'get',
            params: {senior_mapping: JSON.stringify(chunks[i])},
          };
      const response = await API({
        url: SENIOR_SERVICE_END_POINTS.GET_SENIOR_MAPPING,
        ...config,
      });
      data = {...data, ...response.data};
    }
    return data;
  } catch (error) {
    console.log(error);
    let errorMessage = error.response.data.message;
    throw new Error(errorMessage);
  }
}

/**
 * @function postMinimalInfoService
 * @description method to update Senior's minimal-info.
 * @param {any} data new minimal data for senior
 * @returns Senior Data
 */
export async function postMinimalInfoService(data: any): Promise<any> {
  try {
    await API({
      url: SENIOR_SERVICE_END_POINTS.POST_MINIMAL_INFO,
      method: APIMethod.Post,
      data,
    });
    return data;
  } catch (error) {
    console.log(error);
    let errorMessage = error.response.data.message;
    throw new Error(errorMessage);
  }
}
