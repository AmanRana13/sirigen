import {API} from 'globals/api';
import {CARE_INSIGHT_END_POINTS} from 'globals/apiEndPoints';
import {getQueryParamTimezone} from 'globals/global.functions';

import {
  ICIRangeMilestonesService,
  IMilestoneData,
} from './cIRangeMilestones.types';

const createCIRangeMilestoneData = (data: IMilestoneData) => {
  return {
    seniorID: data.senior_id,
    accountID: data.account_id,
    seniorName: {
      firstName: data.name.first_name,
      middleName: data.name.middle_name,
      lastName: data.name.last_name,
    },
    cIType: data.measurement_type,
    milestoneDateAndTime: data.modification_date,
    milestone: data.milestone,
    milestoneOrdinal: data.milestone_ordinal,
    submittedDate: data.last_submitted,
    timezone: getQueryParamTimezone(data.timezone),
    status: data.status,
  };
};

const mapCIRangeMilestonesPayload = (payload: IMilestoneData[]) => {
  return payload.map((data: any) => createCIRangeMilestoneData(data));
};

/**
 * @function getAllCIRangeMilestonesService
 * @description API service to get existing care isights range milstones
 * @param params api payload
 * @returns Promise
 */
export async function getAllCIRangeMilestonesService<T>(params: T) {
  try {
    const response = await API({
      url: CARE_INSIGHT_END_POINTS.GET_CI_RANGE_MILESTONES,
      method: 'get',
      params: params,
    });

    const cIRangeMilestonesData: ICIRangeMilestonesService = response.data;
    return {
      data: mapCIRangeMilestonesPayload(cIRangeMilestonesData?.milestone_data),
      lastEvaluatedKey: cIRangeMilestonesData?.last_evaluated_key,
    };
  } catch (error) {
    return error;
  }
}
