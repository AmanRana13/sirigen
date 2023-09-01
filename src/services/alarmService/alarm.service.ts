import {API} from 'globals/api';
import {ALARM_END_POINTS} from 'globals/apiEndPoints';
import {getTimestamp} from 'globals/global.functions';

import {IAlarmAPIResponse, IAlarmData} from './alarm.types';

/**
 * @function getAllAlarmEventsService
 * @description API service to get existing events with status pending, assigned
 * @param params api payload
 * @returns Promise
 */
export async function getAllAlarmEventsService<T>(params: T) {
  try {
    const response = await API({
      url: ALARM_END_POINTS.GET_ALARMS,
      method: 'get',
      params: params,
    });
    const alarmData = response.data;
    return mapAlarmDataPayload(alarmData);
  } catch (error) {
    let errorMessage = error.response.data.message;
    throw new Error(errorMessage);
  }
}

/**
 * @function updateAlarmStatusService
 * @description API service to get existing events with status pending, assigned
 * @param params api payload
 * @returns Promise
 */
export async function updateAlarmStatusService<T>(params: T) {
  return await API({
    url: ALARM_END_POINTS.UPDATE_ALARMS,
    method: 'put',
    params: params,
  });
}

/**
 * @function getSOSListService
 * @description API service to get existing SOS with status pending, assigned
 * @param params api payload
 * @returns Promise
 */
export async function getSOSListService<T>(params: T) {
  try {
    const response = await API({
      url: ALARM_END_POINTS.GET_SOS,
      method: 'get',
      params: params,
    });
    return response?.data?.data || [];
  } catch (error) {
    let errorMessage = error.response.data.message;
    throw new Error(errorMessage);
  }
}

/**
 * @function getFallDetectionListService
 * @description API service to get existing Fall Detected with status pending, assigned
 * @param params api payload
 * @returns Promise
 */
export async function getFallDetectionListService<T>(params: T) {
  try {
    const response = await API({
      url: ALARM_END_POINTS.GET_FALL_DETECTION,
      method: 'get',
      params: params,
    });
    return response?.data?.data || [];
  } catch (error) {
    let errorMessage = error.response.data.message;
    throw new Error(errorMessage);
  }
}

const mapAlarmDataPayload = (payload: any) => {
  return payload.map((data: any) => createAlarmData(data));
};

export const createAlarmData = (data: IAlarmAPIResponse): IAlarmData => {
  return {
    accountId: data.account_id,
    seniorId: data.senior_id,
    status: data.status,
    timestamp: getTimestamp(data.timestamp),
    alarmId: data.alarm_id,
    alarmStatus: data.alarm_status,
    lastAlertTime: getTimestamp(data.last_alert?.time),
    lastCallTime: data.last_call?.time,
    lastLocation: {
      lat: data.last_location?.lat,
      lng: data.last_location?.lng,
    },
  };
};
