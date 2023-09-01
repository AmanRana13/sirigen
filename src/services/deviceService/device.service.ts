import {API} from 'globals/api';

import {DEVICES_END_POINTS} from 'globals/apiEndPoints';

/**
 * @description method to fetch all device details
 * @function getDevicesService
 * @param {T} params
 */
export async function getDevicesService<T>(params: T) {
  try {
    const response = await API({
      url: DEVICES_END_POINTS.GET_DEVICES,
      params: params,
      method: 'get',
    });
    return response.data;
  } catch (e) {
    return e;
  }
}

/**
 * @description method to get all the device info along with watch phone number
 * @function getDevicesInformationService
 * @param {any} params
 */
export async function getDevicesInformationService(params: any) {
  return await API({
    url: DEVICES_END_POINTS.GET_DEVICES_INFORMATION,
    params: params,
    method: 'get',
  });
}
