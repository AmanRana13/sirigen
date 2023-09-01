import {API} from 'globals/api';
import {USER_END_POINTS} from '../../globals/apiEndPoints';

/**
 * @description Service to check existence of email, employeeId, is first time login
 * @param {object} params
 * @returns promise response
 */
export const validateEmailAddressService = async (params: object) => {
  return API({
    url: USER_END_POINTS.IS_EMAIL_MAPPED,
    method: 'get',
    params: params,
  });
};
export const validateMobileNumberService = async (params: object) => {
  return API({
    url: USER_END_POINTS.IS_MOBILE_MAPPED,
    method: 'get',
    params: params,
  });
};
