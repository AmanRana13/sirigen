import {
  getSleepDailyService,
  getSleepDepthService,
  getSleepHRService,
  getSleepPhaseService,
} from 'services/wellnessGraph/sleep.service';
import {
  ISleepParam,
  ISleepGraphParam,
} from 'services/wellnessGraph/sleep.types';
import {getCurrentSenior} from 'globals/global.functions';

export const getSleepDaily = (startTime: any, endTime: any) => async () => {
  const {accountID, seniorID} = getCurrentSenior();
  try {
    const params: ISleepParam = {
      start_timestamp: startTime,
      end_timestamp: endTime,
      senior_id: seniorID,
      account_id: accountID,
    };
    const response = await getSleepDailyService(params);
    return response;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const getSleepHR = (summaryCycleTimestamps: any) => async () => {
  const {accountID, seniorID} = getCurrentSenior();
  try {
    const params: ISleepGraphParam = {
      sleep_cycle: JSON.stringify(summaryCycleTimestamps),
      senior_id: seniorID,
      account_id: accountID,
    };
    const response = await getSleepHRService(params);
    return response;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const getSleepPhase = (summaryCycleTimestamps: any) => async () => {
  const {accountID, seniorID} = getCurrentSenior();
  try {
    const params: ISleepGraphParam = {
      sleep_cycle: JSON.stringify(summaryCycleTimestamps),
      senior_id: seniorID,
      account_id: accountID,
    };
    const response = await getSleepPhaseService(params);
    return response;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const getSleepDepth = (startTime: any, endTime: any) => async () => {
  const {accountID, seniorID} = getCurrentSenior();

  try {
    const params: ISleepParam = {
      start_timestamp: startTime,
      end_timestamp: endTime,
      senior_id: seniorID,
      account_id: accountID,
    };
    const response = await getSleepDepthService(params);
    return response;
  } catch (error) {
    console.error(error);
    return error;
  }
};
