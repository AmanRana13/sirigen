/* eslint-disable max-len */
import {isEmpty} from 'lodash';
import moment from 'moment';
import {API} from 'globals/api';
import {DATE_FORMAT, TIME_FORMAT} from 'globals/global.constants';
import {
  CAREGIVER_STRAIN_ASSESSMENT_END_POINTS,
  SENIOR_SERVICE_END_POINTS,
} from 'globals/apiEndPoints';
import {
  ICaregiverStrainAssessmentResponse,
  ICaregiverStrainAssessmentSurveyResponse,
} from './CGAssessmentService.type';
import {
  ICaregiverStrainAssessmentSurveyData,
  IGetCaregiverStrainAssessmentParam,
  IPostCareGiverStrainAssessmentParams,
} from 'pages/WCPages/Assessments/CaregiverStrainAssessment/CaregiverStrainAssessment.type';

export async function getCaregiverIdService(param: any): Promise<any> {
  try {
    const response = await API({
      url: SENIOR_SERVICE_END_POINTS.GET_CARE_GIVER,
      method: 'get',
      params: param,
    });
    return response.data;
  } catch (error) {
    return error;
  }
}

export async function getCaregiverStrainAssessmentService(
  param: IGetCaregiverStrainAssessmentParam,
): Promise<any> {
  let response: any = [];
  try {
    response = await API({
      url: `${CAREGIVER_STRAIN_ASSESSMENT_END_POINTS.GET_CAREGIVER_STRAIN_ASSESSMENT}`,
      method: 'get',
      params: param,
    });
  } catch (e) {
    console.log('Calling Empty Caregiver Strain Assessment');
  }

  if (isEmpty(response) || isEmpty(response.data)) {
    try {
      response = await API({
        url: `${CAREGIVER_STRAIN_ASSESSMENT_END_POINTS.GET_BLANK_CAREGIVER_STRAIN_ASSESSMENT}`,
        method: 'get',
      });
    } catch (err) {
      return err;
    }
  }
  return mapCaregiverStrainAssessmentPayload(response.data);
}

export async function postCaregiverStrainAssessmentService(
  param: IPostCareGiverStrainAssessmentParams,
): Promise<any> {
  try {
    await API({
      url: `${CAREGIVER_STRAIN_ASSESSMENT_END_POINTS.POST_CAREGIVER_STRAIN_ASSESSMENT}`,
      method: 'post',
      data: param,
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
}

const mapCaregiverStrainAssessmentPayload = (
  response: ICaregiverStrainAssessmentResponse,
) => {
  const formData: ICaregiverStrainAssessmentSurveyResponse[] = response.form;
  const caregiverStrainForm = mapCaregiverStrainFormData(formData);
  const date = moment
    .utc(response.modification_date)
    .tz(moment.tz.guess())
    .format(DATE_FORMAT);
  const time = moment
    .utc(response.modification_date)
    .tz(moment.tz.guess())
    .format(TIME_FORMAT);

  return {
    surveys: caregiverStrainForm,
    assessmentId: response.assessment_id,
    versionNumber: response.version,
    assessmentStatus: response.assessment_status,
    dateTime: `${date} ${time}`,
    careAgentId: response.care_agent_id,
  };
};

export const mapCaregiverStrainFormData = (
  caregiverStrainFormData: ICaregiverStrainAssessmentSurveyResponse[],
) => {
  let payloadData: ICaregiverStrainAssessmentSurveyData[] = [];
  caregiverStrainFormData?.forEach((item: any) => {
    payloadData = [...payloadData, item];
  });
  return payloadData;
};
