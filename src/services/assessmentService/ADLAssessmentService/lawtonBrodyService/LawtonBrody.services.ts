/* eslint-disable max-len */
import {isEmpty} from 'lodash';
import {API} from 'globals/api';
import {LAWTON_BRODY_ADL_ASSESSMENT_END_POINTS} from 'globals/apiEndPoints';
import {
  ILawtonBrodyADLAssessmentResponse,
  ILawtonBrodyADLAssessmentSurveyResponse,
} from './LawtonBrodyService.type';
import {
  ILawtonBrodyADLAssessmentSurveyData,
  IGetLawtonBrodyADLAssessmentParam,
  IPostLawtonBrodyADLAssessmentParams,
} from 'pages/WCPages/Assessments/AdlAssessment/LawtonBrodyAssessment/LawtonBrodyAssessment.type';
import moment from 'moment';
import {DATE_FORMAT, TIME_FORMAT} from 'globals/global.constants';

/**
 * @function getLawtonBrodyADLAssessmentService
 * @description get Lawton Brody ADL Assessment Service
 * @param {IGetLawtonBrodyADLAssessmentParam} param
 */
export async function getLawtonBrodyADLAssessmentService(
  param: IGetLawtonBrodyADLAssessmentParam,
): Promise<any> {
  let response: any = [];
  try {
    response = await API({
      url: `${LAWTON_BRODY_ADL_ASSESSMENT_END_POINTS.GET_LAWTON_BRODY_ADL_ASSESSMENT}`,
      method: 'get',
      params: param,
    });
  } catch (e) {
    console.log('Calling Empty Lawton Brody ADL Assessment');
  }

  if (isEmpty(response) || isEmpty(response.data)) {
    try {
      response = await API({
        url: `${LAWTON_BRODY_ADL_ASSESSMENT_END_POINTS.GET_BLANK_LAWTON_BRODY_ADL_ASSESSMENT}`,
        method: 'get',
      });
    } catch (err) {
      return err;
    }
  }
  return mapLawtonBrodyADLAssessmentPayload(response.data);
}

/**
 * @function postLawtonBrodyAssessmentService
 * @description post Lawton Brody ADL Assessment Service
 * @param {IPostLawtonBrodyADLAssessmentParams} param
 */
export async function postLawtonBrodyAssessmentService(
  param: IPostLawtonBrodyADLAssessmentParams,
): Promise<any> {
  try {
    await API({
      url: `${LAWTON_BRODY_ADL_ASSESSMENT_END_POINTS.POST_LAWTON_BRODY_ADL_ASSESSMENT}`,
      method: 'post',
      data: param,
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
}

/**
 * @function mapLawtonBrodyADLAssessmentPayload
 * @description map lawton brody ADL Assessment Payload function
 * @param {ILawtonBrodyADLAssessmentResponse} response
 */
const mapLawtonBrodyADLAssessmentPayload = (
  response: ILawtonBrodyADLAssessmentResponse,
) => {
  const formData: ILawtonBrodyADLAssessmentSurveyResponse[] = response.form;
  const lawtonBrodyForm = mapLawtonBrodyFormData(formData);
  const date = moment
    .utc(response.modification_date)
    .tz(moment.tz.guess())
    .format(DATE_FORMAT);
  const time = moment
    .utc(response.modification_date)
    .tz(moment.tz.guess())
    .format(TIME_FORMAT);

  return {
    surveys: lawtonBrodyForm,
    assessmentId: response.assessment_id,
    versionNumber: response.version,
    careAgentId: response.care_agent_id,
    assessmentStatus: response.assessment_status,
    dateTime: `${date} ${time}`,
  };
};

/**
 * @function mapLawtonBrodyFormData
 * @description maplawton brody Form Data
 * @param {ILawtonBrodyADLAssessmentSurveyResponse} lawtonBrodyFormData
 */
export const mapLawtonBrodyFormData = (
  lawtonBrodyFormData: ILawtonBrodyADLAssessmentSurveyResponse[],
) => {
  let payloadData: ILawtonBrodyADLAssessmentSurveyData[] = [];
  lawtonBrodyFormData?.forEach((item: any) => {
    payloadData = [...payloadData, item];
  });
  return payloadData;
};
