import {API} from 'globals/api';
import LawtonBrodyAssessmentHistoryParser from './parser/lawtonBrodyAssessmentHistoryParser';

import {LAWTON_BRODY_ADL_ASSESSMENT_END_POINTS} from 'globals/apiEndPoints';
// eslint-disable-next-line max-len
import {IGetLawtonBrodyADLAssessmentParam} from 'pages/WCPages/Assessments/AdlAssessment/LawtonBrodyAssessment/LawtonBrodyAssessment.type';

/**
 * @description API service to fetch the history data and parse
 * @function getLawtonBrodyAssessmentHistoryService
 * @param {IGetLawtonBrodyADLAssessmentParam} params
 * @returns data for pagination
 */
export const getLawtonBrodyAssessmentHistoryService = async (
  params: IGetLawtonBrodyADLAssessmentParam,
) => {
  try {
    const response = await API({
      url: LAWTON_BRODY_ADL_ASSESSMENT_END_POINTS.GET_LAWTON_BRODY_HISTORY,
      method: 'get',
      params,
    });
    const dataParser = new LawtonBrodyAssessmentHistoryParser();
    const historyData = dataParser.parse(response?.data?.data || []);
    const lastEvaluatedKey = response?.data?.last_evaluated_key;

    return {data: historyData, lastEvaluatedKey};
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    throw error;
  }
};
