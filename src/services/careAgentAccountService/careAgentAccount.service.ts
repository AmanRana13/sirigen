import {API} from 'globals/api';
import {USER_SERVICE_ENDPOINTS} from 'globals/apiEndPoints';
import {ICareAgentData, ICareAgentAPIData} from './careAgentAccount.types';
import {constructName} from 'globals/global.functions';

/**
 * @function getCareAgentService
 * @description method to get care agent data via api response.
 * @param {*} params
 * @returns agent accounts.
 */
export async function getCareAgentService<T>(params?: T): Promise<any> {
  try {
    const response = await API({
      url: USER_SERVICE_ENDPOINTS.GET_CARE_AGENT,
      method: 'get',
      params: params,
    });
    const results: ICareAgentAPIData[] = response.data.caregivers;

    return {
      result: mapCareAgentPayload(results) || [],
      lastEvaluatedKey: response.data.LastEvaluatedKey,
    };
  } catch (error) {
    console.log(error);
    let errorMessage = error.response.data.message;
    throw new Error(errorMessage);
  }
}

/**
 * @function mapCareAgentPayload
 * @description method to map care agent account data.
 * @param {*} data
 * @returns {ICareAgentAPIData[]} agent accounts data.
 */
export const mapCareAgentPayload = (data: ICareAgentAPIData[]) => {
  if (Array.isArray(data)) {
    return data.map((careAgentData: ICareAgentAPIData) =>
      createCareAgentData(careAgentData),
    );
  }

  return createCareAgentData(data);
};

/**
 * @function createCareAgentData
 * @description method to create care agent account data.
 * @param {*} data
 * @returns {ICareAgentData} agent accounts data in required format.
 */
export const createCareAgentData = (data: any): ICareAgentData => ({
  userId: data.user_id || '',
  employeeId: data.employee_id || '',
  name: {
    firstName: data.name.first_name,
    lastName: data.name.last_name,
    middleName: data.name.middle_name,
  },
  fullName: constructName(data.name.first_name, '', data.name.last_name),
  email: data.email || '',
  phone: data?.phone_number?.number || '',
  extension: data?.phone_number?.ext || '',
  accessRole: data.role || 'careagent',
  isFirstLogin: false,
  location: data.location,
  shift: data.shift || '',
  timezone: data.location?.timezone || '',
  assignedSenior: data.assigned_senior || [],
});
