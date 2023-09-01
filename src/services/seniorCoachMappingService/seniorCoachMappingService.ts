import {API} from 'globals/api';
import {
  ISeniorMappingParams,
  IUnAssignSeniorParams,
} from './seniorCoachMapping.types';
import {SENIOR_COACH_MAPPING_ENDPOINTS} from 'globals/apiEndPoints';
import {APIMethod} from 'globals/enums';

/**
 * @function assignWellnessCoachService
 * @description method to assign Welness Coach to a List of Seniors.
 * @param {ISeniorMappingParams} data
 * @returns success or error
 */
export async function assignWellnessCoachService(data: ISeniorMappingParams) {
  return await API({
    url: SENIOR_COACH_MAPPING_ENDPOINTS.POST_ASSIGN,
    method: APIMethod.Post,
    data,
  });
}

/**
 * @function unassignSeniorsService
 * @description method to Unassign a List of Seniors from a WellnessCoach.
 * @param {ISeniorMappingParams} data
 * @returns success or error
 */
export async function unassignSeniorsService(data: IUnAssignSeniorParams) {
  return await API({
    url: SENIOR_COACH_MAPPING_ENDPOINTS.DELETE_UNASSIGN,
    method: APIMethod.Delete,
    data,
  });
}
