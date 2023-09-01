/* eslint-disable max-len */
import {isEmpty, camelCase} from 'lodash';
import {API} from 'globals/api';
import {HOLISTIC_ASSESSMENT_END_POINTS} from 'globals/apiEndPoints';
import {IHolisticAssessmentSurvey} from 'pages/WCPages/Assessments/HolisticAssessment/HolisticAssessment.types';
import {
  IHolisticAssessmentSurveyResponse,
  IHolisticAssessmentResponse,
} from './assessmentService.types';
import moment from 'moment';
import {DATE_FORMAT, TIME_FORMAT} from 'globals/global.constants';

export async function getHolisticAssessmentService(param: any): Promise<any> {
  let response: any = [];
  try {
    response = await API({
      url: `${HOLISTIC_ASSESSMENT_END_POINTS.GET_HOLISTIC_ASSESSMENT}`,
      method: 'get',
      params: param,
    });
  } catch (e) {
    console.log('Calling Empty Holistic Assessment');
  }

  if (isEmpty(response) || isEmpty(response.data)) {
    try {
      response = await API({
        url: `${HOLISTIC_ASSESSMENT_END_POINTS.GET_BLANK_HOLISTIC_ASSESSMENT}`,
        method: 'get',
      });
    } catch (err) {
      return err;
    }
  }

  return mapHolisticAssessmentPayload(response.data);
}

export async function postHolisticAssessmentService(param: any): Promise<any> {
  try {
    await API({
      url: `${HOLISTIC_ASSESSMENT_END_POINTS.POST_HOLISTIC_ASSESSMENT}`,
      method: 'post',
      data: param,
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
}

const mapHolisticAssessmentPayload = (
  response: IHolisticAssessmentResponse,
) => {
  const formData: IHolisticAssessmentSurveyResponse[] = response.form;
  const holisticForm = mapHolisticFormData(formData);
  const date = moment
    .utc(response.modification_date)
    .tz(moment.tz.guess())
    .format(DATE_FORMAT);
  const time = moment
    .utc(response.modification_date)
    .tz(moment.tz.guess())
    .format(TIME_FORMAT);
  return {
    surveys: holisticForm,
    assessmentId: response.assessment_id,
    versionNumber: response.version_number,
    assessmentStatus: response.assessment_status,
    dateTime: `${date} ${time}`,
    careAgentId: response.care_agent_id,
  };
};

export const mapHolisticFormData = (
  holisticFormData: IHolisticAssessmentSurveyResponse[],
): IHolisticAssessmentSurvey => {
  let payloadData: IHolisticAssessmentSurvey = {};

  holisticFormData.forEach((item: IHolisticAssessmentSurveyResponse) => {
    const payloadDataKey: string = camelCase(item.header);
    payloadData = {
      ...payloadData,
      [payloadDataKey]: item.data,
    };
  });
  return payloadData;
};
