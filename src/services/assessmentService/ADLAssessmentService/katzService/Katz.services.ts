/* eslint-disable max-len */
import {isEmpty} from 'lodash';
import {API} from 'globals/api';
import {KATZ_ADL_ASSESSMENT_END_POINTS} from 'globals/apiEndPoints';
import {
  IKatzADLAssessmentResponse,
  IKatzADLAssessmentSurveyResponse,
} from './KatzService.type';
import {
  IKatzADLAssessmentSurveyData,
  IGetKatzADLAssessmentParam,
  IPostKatzADLAssessmentParams,
} from 'pages/WCPages/Assessments/AdlAssessment/KatzAssessment/KatzAssessment.type';
import moment from 'moment';
import { DATE_FORMAT, TIME_FORMAT } from 'globals/global.constants';

/**
 * @function getKatzADLAssessmentService
 * @description get Katz Independence ADL Assessment Service
 * @param {IGetKatzADLAssessmentParam} param
 */
export async function getKatzADLAssessmentService(
  param: IGetKatzADLAssessmentParam,
): Promise<any> {
  let response: any = [];
  try {
    response = await API({
      url: `${KATZ_ADL_ASSESSMENT_END_POINTS.GET_KATZ_ADL_ASSESSMENT}`,
      method: 'get',
      params: param,
    });
  } catch (e) {
    console.log('Calling Empty Katz Independence ADL Assessment');
  }

  if (isEmpty(response) || isEmpty(response.data)) {
    try {
      response = await API({
        url: `${KATZ_ADL_ASSESSMENT_END_POINTS.GET_BLANK_KATZ_ADL_ASSESSMENT}`,
        method: 'get',
      });
    } catch (err) {
      return err;
    }
  }
  return mapKatzADLAssessmentPayload(response.data);
}

/**
 * @function postKatzAssessmentService
 * @description post Katz Independence ADL Assessment Service
 * @param {IPostKatzADLAssessmentParams} param
 */
export async function postKatzAssessmentService(
  param: IPostKatzADLAssessmentParams,
): Promise<any> {
  try {
    await API({
      url: `${KATZ_ADL_ASSESSMENT_END_POINTS.POST_KATZ_ADL_ASSESSMENT}`,
      method: 'post',
      data: param,
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
}

/**
 * @function mapKatzADLAssessmentPayload
 * @description map Katz Independence ADL Assessment Payload function
 * @param {IKatzADLAssessmentResponse} response
 */
const mapKatzADLAssessmentPayload = (response: IKatzADLAssessmentResponse) => {
  const formData: IKatzADLAssessmentSurveyResponse[] = response.form;
  const katzForm = mapKatzFormData(formData);
  const date = moment.utc(response.modification_date).tz(moment.tz.guess()).format(DATE_FORMAT);
  const time = moment.utc(response.modification_date).tz(moment.tz.guess()).format(TIME_FORMAT);

  return {
    surveys: katzForm,
    assessmentId: response.assessment_id,
    versionNumber: response.version,
    careAgentId: response.care_agent_id,
    assessmentStatus: response.assessment_status,
    dateTime: `${date} ${time}`,
  };
};

/**
 * @function mapKatzFormData
 * @description map Katz Independence Form Data
 * @param {IKatzADLAssessmentSurveyResponse} katzFormData
 */
export const mapKatzFormData = (
  katzFormData: IKatzADLAssessmentSurveyResponse[],
) => {
  let payloadData: IKatzADLAssessmentSurveyData[] = [];
  katzFormData?.forEach((item: any) => {
    payloadData = [...payloadData, item];
  });
  return payloadData;
};
