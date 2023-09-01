import {API} from 'globals/api';
import {IUpdateCaregiverInfoParams} from './careCircle.types';
/**
 * @function createUserService
 * @description method to create new caregiver .
 * @param {*} params
 * @returns new caregiver info with caregiver id.
 */
export async function createUserService(data: IUpdateCaregiverInfoParams) {
  return await API({
    url: 'cognito/user',
    method: 'post',
    data,
  });
}
/**
 * @function saveCaregiverInfoService
 * @description method to save caregiver details.
 * @param {*} params
 * @returns updated caregiver details.
 */
export async function saveCaregiverInfoService(
  data: IUpdateCaregiverInfoParams,
) {
  return await API({
    url: 'users/senior/care-circle',
    method: 'put',
    data,
  });
}
/**
 * @function fetchCaregiverInfoservice
 * @description method to fetch caregiver Info.
 * @param {*} params
 * @returns caregiver info
 */
export async function fetchCaregiverInfoservice(
  senior_id: string,
  account_id: string,
) {
  try {
    const response = await API({
      // eslint-disable-next-line max-len
      url: `users/senior/care-circle?senior_id=${senior_id}&account_id=${account_id}`,
      method: 'get',
    });
    return response;
  } catch (error) {
    return error;
  }
}
