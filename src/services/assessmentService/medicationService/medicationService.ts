/* eslint-disable max-len */
import {API} from 'globals/api';
import {MEDICATION_LIST_END_POINTS} from 'globals/apiEndPoints';
import {APIMethod} from 'globals/enums';
import {IPostMedicationServiceParams} from 'pages/WCPages/Assessments/MedicationList/MedicationList.types';
import MedicationListParser from './parser/medicationListParser';
import {ISearchMedicationParam} from './medicationService.types';

/**
 * @function getMedicationListService
 * @description to fetch medication list data and parse
 * @param param
 */
export async function getMedicationListService(param: any): Promise<any> {
  try {
    const response = await API({
      url: MEDICATION_LIST_END_POINTS.MEDICATION_LIST,
      method: APIMethod.Get,
      params: param,
    });

    const dataParser = new MedicationListParser();
    const medicationListData = dataParser.parse(response?.data);

    return {data: medicationListData};
  } catch (error) {
    console.log(error);
    throw error;
  }
}

/**
 * @function postMedicationListService
 * @description to post updated medication list
 * @param {IPostMedicationServiceParams} param
 */
export async function postMedicationListService(param: any): Promise<any> {
  try {
    await API({
      url: MEDICATION_LIST_END_POINTS.MEDICATION_LIST,
      method: APIMethod.Post,
      data: param,
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
}

/**
 * @function searchMedicationService
 * @description to get list of auto suggetion on search for any medication
 * @param {ISearchMedicationParam} param
 */
export async function searchMedicationService(
  param: ISearchMedicationParam,
): Promise<any> {
  try {
    const response = await API({
      url: MEDICATION_LIST_END_POINTS.SEARCH_MEDICATION,
      method: APIMethod.Get,
      params: param,
    });
    return response.data || []; //parse is not required as we get single array in result
  } catch (error) {
    console.error(error);
    throw error;
  }
}
