/* eslint-disable max-len */
import {API} from 'globals/api';
import KatzAssessmentHistoryParser from './parser/katzAssessmentHistoryParser';

import {KATZ_ADL_ASSESSMENT_END_POINTS} from 'globals/apiEndPoints';
import {IGetKatzADLAssessmentParam} from 'pages/WCPages/Assessments/AdlAssessment/KatzAssessment/KatzAssessment.type';

/**
 * @description API service to fetch the history data and parse
 * @function getKatzAssessmentHistoryService
 * @param {IGetKatzAssessmentParam} params
 * @returns data for pagination
 */
export const getKatzAssessmentHistoryService = async (
  params: IGetKatzADLAssessmentParam,
) => {
  try {
    const response = await API({
      url: KATZ_ADL_ASSESSMENT_END_POINTS.GET_KATZ_HISTORY,
      method: 'get',
      params,
    });
    const dataParser = new KatzAssessmentHistoryParser();
    const historyData = dataParser.parse(response?.data?.data || []);
    const lastEvaluatedKey = response?.data?.last_evaluated_key;

    return {data: historyData, lastEvaluatedKey};
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    throw error;
  }
};
