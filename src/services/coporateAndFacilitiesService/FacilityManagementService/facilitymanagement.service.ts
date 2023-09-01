import {API} from 'globals/api';
import {FACILITY_MANAGEMENT_END_POINTS} from 'globals/apiEndPoints';

import {APIMethod} from 'globals/enums';
import {IFacilityData, IFacilityListAPIData} from './facilitymanagement.types';

/**
 * @function getFacilityManagementService
 * @description method to get facility data via api response.
 * @param {*} params
 * @returns facility accounts.
 */
export async function getFacilityManagementService<T>(
  params?: T,
): Promise<any> {
  try {
    const response = await API({
      url: FACILITY_MANAGEMENT_END_POINTS.GET_FACILITY_LIST,
      method: APIMethod.Get,
      params: params,
    });
    const results: IFacilityListAPIData[] = response.data.facilities;

    return {
      data: createFacilityListData(results) || [],
      lastEvaluatedKey: response.data.last_evaluated_key,
    };
  } catch (error) {
    console.log(error);
    let errorMessage = error.response.data.message;
    throw new Error(errorMessage);
  }
}

/**
 * @description disabling the facility
 * @param param
 * @returns
 */
export async function disableFacilityService(facilityData: any): Promise<any> {
  try {
    const param = {
      facility_id: facilityData.id,
    };
    await API({
      url: FACILITY_MANAGEMENT_END_POINTS.DISABLE_FACILITY,
      method: APIMethod.Delete,
      data: param,
    });
    return {facilityName: facilityData.name};
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}

/**
 * @function postFacilityService
 * @description to post updated facility list
 * @param {IFacilityManagementAPIData} param
 */
export async function postFacilityService(param: any): Promise<any> {
  try {
    const response = await API({
      url: FACILITY_MANAGEMENT_END_POINTS.POST_FACILITY,
      method: APIMethod.Post,
      data: param,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

/**
 * @function searchFacilityService
 * @description to get list of auto suggetion on search for any facility
 */
export async function searchFacilityService(param: any): Promise<any> {
  try {
    const response = await API({
      url: FACILITY_MANAGEMENT_END_POINTS.SEARCH_FACILITY,
      method: APIMethod.Get,
      params: param,
    });
    return response.data || []; //parse is not required as we get single array in result
  } catch (error) {
    console.error(error);
    throw error;
  }
}

/**
 * @description to get list of parsed facilty
 * @param {IFacilityListAPIData}
 * @returns {IFacilityData[]}
 */
const createFacilityListData = (response: IFacilityListAPIData[]) => {
  const mappedData: IFacilityData[] = response.map(
    (facility: IFacilityListAPIData) => {
      return {
        id: facility.facility_id,
        facilityName: facility.facility_name,
        facilityCode: facility.facility_code,
        cityAndState: {
          city: facility?.facility_address?.city || '',
          state: facility?.facility_address.state || '',
        },
        phone: facility.facility_phone,
        agent: facility.agent_name,
        residents: facility.total_residents || 0,
        facilityAddress: facility?.facility_address,
      };
    },
  );

  return mappedData;
};

export async function validateDuplicateValuesService(param: any): Promise<any> {
  try {
    const response = await API({
      url: FACILITY_MANAGEMENT_END_POINTS.VALIDATE_DUPLICATE,
      method: APIMethod.Post,
      data: param,
    });
    return response.data || []; //parse is not required as we get single array in result
  } catch (error) {
    console.error(error);
    throw error;
  }
}
