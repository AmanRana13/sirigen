import moment from 'moment-timezone';
import {isEmpty} from 'lodash';

import {getTimestamp} from 'globals/global.functions';
import {API} from 'globals/api';
import {SLEEP_END_POINTS} from 'globals/apiEndPoints';

import {
  ISleepParam,
  ISleepResponse,
  ISleepResponseDetail,
  ISleepResponseSummary,
  ISleepSummary,
  ISleepGraphParam,
} from './sleep.types';

export async function getSleepDailyService(param: ISleepParam): Promise<any> {
  try {
    const response = await API({
      url: SLEEP_END_POINTS.GET_SLEEP_DAILY,
      method: 'get',
      params: param,
    });
    const sleepData = response.data.data;
    return createSleepSummary(sleepData);
  } catch (error) {
    let errorMessage = error.response.data.message;
    throw new Error(errorMessage);
  }
}

export async function getSleepHRService(param: ISleepGraphParam): Promise<any> {
  try {
    const response = await API({
      url: SLEEP_END_POINTS.GET_SLEEP_HEART_RATE,
      method: 'get',
      params: param,
    });
    return response.data.data;
  } catch (error) {
    let errorMessage = error.response.data.message;
    throw new Error(errorMessage);
  }
}

export async function getSleepPhaseService(
  param: ISleepGraphParam,
): Promise<any> {
  try {
    const response = await API({
      url: SLEEP_END_POINTS.GET_SLEEP_PHASE,
      method: 'get',
      params: param,
    });
    return response.data.data;
  } catch (error) {
    let errorMessage = error.response.data.message;
    throw new Error(errorMessage);
  }
}

export async function getSleepDepthService(param: ISleepParam): Promise<any> {
  try {
    const response = await API({
      url: SLEEP_END_POINTS.GET_SLEEP_DEPTH,
      method: 'get',
      params: param,
    });
    return response.data.data[0];
  } catch (error) {
    let errorMessage = error.response.data.message;
    throw new Error(errorMessage);
  }
}
/**
 * @function createSleepSummary
 * @description method to create the summary data from sleep-daily api response
 * @param {*} data
 * @param {number} selectedDate
 * @returns summary data
 */
const createSleepSummary = (data: ISleepResponse) => {
  let detailList: ISleepResponseDetail[] = [];
  let allSummaryList: ISleepResponseSummary[] = [];

  Object.entries(data)
    .filter(([key]) => moment(getTimestamp(key)).isValid())
    .forEach(([key, value]: any) => {
      value.detail.time = parseInt(key);
      detailList.push(value.detail);
      allSummaryList.push(value.summary);
    });

  if (isEmpty(detailList)) {
    return [];
  }

  const dayDetail: ISleepResponseDetail = detailList[0];
  const sleepSummary: ISleepSummary = {
    daySummary: {
      sleepScoreAvg: dayDetail.sleep_score,
      totalSleepTime: dayDetail.total_sleep_time,
      interruptions: dayDetail.interruptions,
      sleepLatency: dayDetail.sleep_latency,
      timeToGetUp: dayDetail.time_to_get_up,
      heartRateAvg: data.average_hr,
      summaryCycle: dayDetail.summary_cycle,
    },
    averageSleepScore: data.average_sleep_score,
    averageSleepTime: data.average_total_sleep_time,
    averageSleepTimeInBed: data.average_total_timeinbed,
    summary: detailList,
    summaryList: allSummaryList,
  };

  return sleepSummary;
};
