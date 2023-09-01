import {API} from 'globals/api';
import {PUBLIC_APIS, USER_SERVICE_ENDPOINTS} from 'globals/apiEndPoints';
import {APIMethod} from 'globals/enums';
import {getChunks} from 'globals/global.functions';
import {uniq} from 'lodash';
import {
  IChangePasswordServiceData,
  IValidatePasswordServiceParams,
} from './userService.types';

export const loginUserService = async (data: any) => {
  return API({
    url: PUBLIC_APIS.LOGIN,
    method: 'post',
    data: data,
  });
};

export async function resetPasswordService(param: any): Promise<any> {
  return API({
    url: PUBLIC_APIS.RESET_PASSWORD,
    method: 'post',
    data: param,
  });
}

/**
 * @function postUserMappingService
 * @description method to get senior data mapping
 * @param {string[]} userList list of users to fetch data for
 * @returns object of User Data
 */
export async function postUserMappingService(userList: string[]): Promise<any> {
  const chunks = getChunks<string>(uniq(userList), 100);
  let data: any = {};
  try {
    for (let i = 0; i < chunks.length; i++) {
      const response = await API({
        url: USER_SERVICE_ENDPOINTS.GET_USER_MAPPING,
        method: APIMethod.Post,
        data: {
          user_mapping: chunks[i],
        },
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
 * @function postValidatePasswordService
 * @description service to validate password of currentUser
 * @param {IValidatePasswordServiceParams} params
 */
export const postValidatePasswordService = async (
  data: IValidatePasswordServiceParams,
): Promise<boolean> => {
  try {
    const response = await API({
      url: PUBLIC_APIS.VALIDATE_PASSWORD,
      method: APIMethod.Post,
      data,
    });
    return !!response?.data?.valid;
  } catch (error) {
    let errorMessage = error.response.data.message;
    throw new Error(errorMessage);
  }
};

/**
 * @function postChangePasswordService
 * @description service to validate password of currentUser
 * @param {IChangePasswordServiceData} data
 */
export const postChangePasswordService = async (
  data: IChangePasswordServiceData,
): Promise<boolean> => {
  try {
    await API({
      url: PUBLIC_APIS.CHANGE_PASSWORD,
      method: APIMethod.Post,
      data,
    });
    return true;
  } catch (error) {
    let errorMessage = error.response.data.message;
    throw new Error(errorMessage);
  }
};
