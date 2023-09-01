import {API} from 'globals/api';
import {CORPORATE_MANAGEMENT_END_POINTS} from 'globals/apiEndPoints';
import {APIMethod} from 'globals/enums';
import CorporateListParser from './parser/corporateListParser';

/**
 * @function getCorporateManagementService
 * @description method to get corporate data via api response.
 * @param {*} params
 * @returns corporate accounts.
 */
export async function getCorporateListService<T>(
  params?: T,
): Promise<any> {
  try {
    const response = await API({
      url: CORPORATE_MANAGEMENT_END_POINTS.GET_CORPORATE_LIST,
      method: APIMethod.Get,
      params: params,
    });

    const dataParser = new CorporateListParser();
    const corporationList = dataParser.parse(
      response.data.corporation,
    );
    return {
      data: corporationList || [],
      lastEvaluatedKey: response.data.last_evaluated_key,
    };
  } catch (error) {
    console.log(error);
    let errorMessage = error.response.data.message;
    throw new Error(errorMessage);
  }
}

/**
 * @description disabling the corporate
 * @param param
 * @returns
 */
export async function disableCorporateService(param: any): Promise<any> {
  return API({
    url: CORPORATE_MANAGEMENT_END_POINTS.DISABLE_CORPORATE,
    method: APIMethod.Post,
    data: param,
  });
}

/**
 * @function postCorporateService
 * @description to post updated corporate list
 * @param {ICorporateManagementAPIData} param
 */
export async function postCorporateService(param: any): Promise<any> {
  try {
 const response= await API({
      url: CORPORATE_MANAGEMENT_END_POINTS.POST_CORPORATE,
      method: APIMethod.Post,
      data: param,
    });
    return response.data || []; 
  } catch (error) {
    console.error(error);
    throw error;
  }
}



/**
 * @function postCorporateService
 * @description to post updated corporate list
 * @param {ICorporateManagementAPIData} param
 */
export async function validateDuplicateDataService(param: any): Promise<any> {
  try {
    const response= await API({
      url: CORPORATE_MANAGEMENT_END_POINTS.VALIDATE_DUPLICATE_DATA,
      method: APIMethod.Post,
      data: param,
    });
    return response.data
  } catch (error) {
    console.error(error);
    throw error;
  }
}

/**
 * @function searchCorporateService
 * @description to get list of auto suggetion on search for any corporate
 */
export async function searchCorporateService(param: any): Promise<any> {
  try {
    const response = await API({
      url: CORPORATE_MANAGEMENT_END_POINTS.SEARCH_CORPORATE,
      method: APIMethod.Get,
      params: param,
    });
    return response.data || []; //parse is not required as we get single array in result
  } catch (error) {
    console.error(error);
    throw error;
  }
}
