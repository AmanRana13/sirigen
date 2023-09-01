/* eslint-disable max-len */
import {ICareInsightHistory} from 'pages/WCPages/SeniorCareInsights/SeniorCareInsight.state';
import {API} from 'globals/api';
import {CARE_INSIGHT_END_POINTS} from 'globals/apiEndPoints';
import {getTimestamp, getExistingVitalsData} from 'globals/global.functions';
import {ICareInsightUpdateStatusPayload} from 'store/eventsReducer/Events.state';
import {IPostAlertDialogPayload} from 'store/eventsReducer/Alerts.types';
import {
  ICIMilestoneNotificationData,
  IMilestoneNotificationData,
} from 'pages/WCPages/Admin/CIRangeMilestones/CIRangeMilestones.types';

export async function getCareInsightHistoryService<T>(params: T): Promise<any> {
  try {
    const response = await API({
      url: CARE_INSIGHT_END_POINTS.GET_CARE_INSIGHT_HISTORY,
      method: 'get',
      params: params,
    });
    const results = response.data.results;
    const verbiageMessage = response.data.message;

    return {
      results: mapCareInsightHistoryPayload(results) || [],
      message: verbiageMessage || '',
    };
  } catch (error) {
    if (error.response) {
      let errorMessage = error.response.data.message;
      throw new Error(errorMessage);
    }
  }
}

export async function getCareInsightTransactionService<T>(
  params: T,
): Promise<any> {
  try {
    const response = await API({
      url: CARE_INSIGHT_END_POINTS.GET_CARE_INSIGHT_TRANSACTION,
      method: 'get',
      params: params,
    });
    const insights = response.data.insights;
    return mapCareInsightHistoryPayload(insights);
  } catch (error) {
    let errorMessage = error.response.data.message;
    throw new Error(errorMessage);
  }
}

/**
 * @description API service of submit summary message
 * @param params api payload for submit summary
 * @returns {Promise} promise
 */
export async function postSummaryMessageService<T>(params: T): Promise<any> {
  return await API({
    url: CARE_INSIGHT_END_POINTS.POST_CARE_INSIGHT_SUMMARY,
    method: 'post',
    data: params,
  });
}

const mapCareInsightHistoryPayload = (payload: any): ICareInsightHistory[] => {
  return payload.map(
    (data: any): ICareInsightHistory => createCareInsightData(data),
  );
};

export const createCareInsightData = (data: any): ICareInsightHistory => {
  const existingVitalsData: any = getExistingVitalsData(null);

  return {
    seniorId: data.senior_id,
    accountId: data.account_id,
    careInsightId: data.care_insight_id,
    dateGenerated: getTimestamp(data.timestamp),
    dateUpdated: getTimestamp(data.updated_on),
    status: data.status,
    agent: data.updated_by || data.created_by,
    vitalSign: data.vital_type,
    vitalLabel: data.vital_type
      ? existingVitalsData[data.vital_type].label
      : '-',
    meassurementUnit: data.vital_type
      ? existingVitalsData[data.vital_type].measurementUnitAbbreviation
      : '-',
    type: data.insight_type,
    message: data.message || '',
    variable: data.range || '',
    range: {
      goodLower: data.range_map?.good_lower,
      goodUpper: data.range_map?.good_upper,
    },
    reading: data.value,
    seniorName: {
      firstName: data?.senior_name?.first_name,
      middleName: data?.senior_name?.middle_name,
      lastName: data?.senior_name?.last_name,
    },
  };
};

export const createCIRangeMilestoneData = (
  data: ICIMilestoneNotificationData,
  eventId: string,
): IMilestoneNotificationData => {
  const existingVitalsData: any = getExistingVitalsData(null);
  return {
    createdDate: data.created_date,
    lastSubmitted: data.last_submitted,
    vitalSign: data.measurement_type,
    vitalLabel: data.measurement_type
      ? existingVitalsData[data.measurement_type].label
      : '-',
    measurementUnit: data.measurement_type
      ? existingVitalsData[data.measurement_type].measurementUnitAbbreviation
      : '-',
    milestone: data.milestone,
    milestoneOrdinal: data.milestone_ordinal,
    modificationDate: data.modification_date,
    seniorId: data.senior_id,
    status: data.status,
    eventId: eventId?.split('|')[1] || '',
  };
};

/**
 * @description API service of update insight status
 * @param params api payload for set status
 * @returns {Promise} promise
 */
export async function updateInsightStatusService(
  params: ICareInsightUpdateStatusPayload,
): Promise<any> {
  return await API({
    url: CARE_INSIGHT_END_POINTS.UPDATE_CARE_INSIGHT_STATUS,
    method: 'put',
    data: params,
  });
}

/**
 * @description API service of send action message to CG/Admin
 * @param params api payload for submit alert
 * @returns {Promise} promise
 */
export async function postAlertDialogService(
  params: IPostAlertDialogPayload,
): Promise<any> {
  return await API({
    url: CARE_INSIGHT_END_POINTS.POST_CARE_INSIGHT_ALERT,
    method: 'post',
    data: params,
  });
}

/**
 * @function getAllCareInsightEventsService
 * @description API service to get existing events with status new
 * @param params api payload
 * @returns Promise
 */
export async function getAllCareInsightEventsService<T>(params: T) {
  try {
    const response = await API({
      url: CARE_INSIGHT_END_POINTS.GET_ALL_CARE_INSIGHT,
      method: 'get',
      params: params,
    });
    const insights = response.data.results;
    return mapCareInsightHistoryPayload(insights);
  } catch (error) {
    let errorMessage = error.response.data.message;
    throw new Error(errorMessage);
  }
}
