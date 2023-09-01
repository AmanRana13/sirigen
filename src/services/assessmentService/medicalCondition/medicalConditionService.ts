/* eslint-disable max-len */
import {API} from 'globals/api';
import {isEmpty} from 'lodash';
import {MEDICAL_CONDITION_END_POINTS} from 'globals/apiEndPoints';
import {APIMethod} from 'globals/enums';
import {
  IGetMedicalConditionActionParams,
  IPostMedicalConditionServiceParams,
} from 'pages/WCPages/Assessments/MedicalCondition/MedicalCondition.types';
import {
  IGetMedicalConditionAssessmentHistoryParam,
  ISearchMedicalConditionParam,
} from './medicalConditionService.types';
import AssessmentHistoyParser from './parser/medicalConditionHistoryParser';
import MedicalConditionParser from './parser/medicalConditionParser';

/**
 * @function getMedicalConditionService
 * @description to fetch medical conditions data and parse
 * @param {IGetMedicalConditionActionParams} param
 */
export async function getMedicalConditionService(
  param: IGetMedicalConditionActionParams,
): Promise<any> {
  try {
    const response = await API({
      url: `${MEDICAL_CONDITION_END_POINTS.GET_MEDICAL_CONDITION}`,
      method: APIMethod.Get,
      params: param,
    });
    const dataParser = new MedicalConditionParser();
    const medicalConditionData = dataParser.parse(response?.data);
    return {data: medicalConditionData};
  } catch (error) {
    console.log(error);
    throw error;
  }
}

/**
 * @function postMedicalConditionService
 * @description to post updated medical conditions
 * @param {IPostMedicalConditionServiceParams} param
 */
export async function postMedicalConditionService(
  param: IPostMedicalConditionServiceParams,
): Promise<any> {
  try {
    await API({
      url: `${MEDICAL_CONDITION_END_POINTS.POST_MEDICAL_CONDITION}`,
      method: APIMethod.Put,
      data: param,
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
}

/**
 * @function searchMedicalConditionService
 * @description to get list of auto suggetion on search for any medical condition
 * @param {ISearchMedicalConditionParam} param
 */
export async function searchMedicalConditionService(
  param: ISearchMedicalConditionParam,
): Promise<any> {
  try {
    const response = await API({
      url: `${MEDICAL_CONDITION_END_POINTS.SEARCH_MEDICAL_CONDITION}`,
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
 * @description API service to fetch the history data and parse
 * @function getMedicalConditionAssessmentHistoryService
 * @param {IGetMedicalConsitionAssessmentHistoryParam} params
 * @returns data for pagination
 */
export const getMedicalConditionHistoryService = async (
  params: IGetMedicalConditionAssessmentHistoryParam,
) => {
  try {
    const response = await API({
      url: MEDICAL_CONDITION_END_POINTS.GET_MEDICAL_CONDITION_HISTORY,
      method: APIMethod.Get,
      params,
    });
    const dataParser = new AssessmentHistoyParser();
    const historyData = dataParser.parse(
      !isEmpty(response.data.data) ? response.data.data : [],
    );

    const lastEvaluatedKey = response.data.last_evaluated_key;
    return {data: historyData, lastEvaluatedKey};
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    throw error;
  }
};
