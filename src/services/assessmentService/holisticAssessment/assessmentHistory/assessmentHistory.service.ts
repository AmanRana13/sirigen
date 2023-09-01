/* eslint-disable max-len */
import {HOLISTIC_ASSESSMENT_END_POINTS} from '../../../../globals/apiEndPoints';
import {API} from 'globals/api';
import AssessmentHistoyParser from './parser/assessmentHistoryParser';
import {IGetHolisticAssessmentHistoryParam} from 'pages/WCPages/Assessments/HolisticAssessment/HolisticAssessment.types';

/**
 * @description API service to fetch the history data and parse
 * @function getHolisticAssessmentHistoryService
 * @param {IGetHolisticAssessmentHistoryParam} params
 * @returns data for pagination
 */
export const getHolisticAssessmentHistoryService = async (
  params: IGetHolisticAssessmentHistoryParam,
) => {
  try {
    const response = await API({
      url: HOLISTIC_ASSESSMENT_END_POINTS.GET_HISTORY,
      method: 'get',
      params,
    });

    const dataParser = new AssessmentHistoyParser();
    const historyData = dataParser.parse(response?.data?.data || []);

    const lastEvaluatedKey = response?.data?.last_evaluated_key;
    return {data: historyData, lastEvaluatedKey};
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    throw error;
  }
};
