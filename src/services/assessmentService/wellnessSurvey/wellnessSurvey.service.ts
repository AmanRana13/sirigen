import {API} from 'globals/api';
import {WELLNESS_SURVEY_END_POINTS} from 'globals/apiEndPoints';
import {APIMethod} from 'globals/enums';
import {IPostWellnesSurveyService} from 'pages/WCPages/Assessments/Wellbieng/WellnessSurvey.type';

/**
 * @function getWellnessSurveyService
 * @description Service to get all the wellness surveys
 * @param {object} params
 * @returns promise response
 */
export const getWellnessSurveyService = async (params: object) => {
  return await API({
    url: WELLNESS_SURVEY_END_POINTS.FETCH,
    method: APIMethod.Get,
    params: params,
  });
};

/**
 * @function postWellnessSurveyService
 * @description to save submit and reset wellness survey
 * @param param
 */
export async function postWellnessSurveyService(
  param: IPostWellnesSurveyService,
): Promise<any> {
  try {
    await API({
      url: `${WELLNESS_SURVEY_END_POINTS.POST}`,
      method: APIMethod.Post,
      data: param,
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
}
