import {API} from 'globals/api';
import {HOLISTIC_ASSESSMENT_END_POINTS} from 'globals/apiEndPoints';
// eslint-disable-next-line max-len
import {
  IGetHolisticAssessmentAdminHistoryResponse,
  IGetHolisticAssessmentAdminResponse,
} from 'pages/WCPages/Admin/Assessment/HolisticAsssessmentAdmin/HolisticAssessmentAdmin.types';

export async function getHolisticAssessmentAdminService(): Promise<any> {
  try {
    const response = await API({
      url: `${HOLISTIC_ASSESSMENT_END_POINTS.GET_HOLISTIC_ASSESSMENT_ADMIN}`,
      method: 'get',
    });
    return mapHolisticAssessmentPayload(response.data);
  } catch (error) {
    return error;
  }
}

export async function getHolisticAssessmentHistoryAdminService(params: any): Promise<any> {
  try {
    const historyResponse = await API({
      url: `${HOLISTIC_ASSESSMENT_END_POINTS.GET_HOLISTIC_ASSESSMENT_HISTORY_ADMIN}`,
      method: 'get',
      params
    });
    return mapHolisticAssessmentHistoryPayload(historyResponse.data);
  } catch (error) {
    return error;
  }
}

export async function postHolisticAssessmentAdminService(
  param: any,
): Promise<any> {
  try {
    await API({
      url: `${HOLISTIC_ASSESSMENT_END_POINTS.POST_HOLISTIC_ASSESSMENT_ADMIN}`,
      method: 'post',
      data: param,
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
}

const mapHolisticAssessmentPayload = (
  response: IGetHolisticAssessmentAdminResponse,
) => {
  const formData = response.form;
  return {
    survey: formData,
    versionNumber: response.version_number,
    formId: response.form_id,
    formStatus: response.form_status,
    publishDateTime: response.publish_date_time,
  };
};

const mapHolisticAssessmentHistoryPayload = (
  response: IGetHolisticAssessmentAdminHistoryResponse,
) => {
  const formData = response.forms.map((data: any) =>
    createPreviousHistoryData(data),
  );
  return {data: formData, lastEvaluatedKey: response.last_evaluated_key};
};

const createPreviousHistoryData = (
  data: IGetHolisticAssessmentAdminResponse,
) => ({
  versionNumber: data.version_number,
  formStatus: data.form_status,
  createdDateAndTime: data.created_date,
  publishedDateAndTime: data.publish_date_time,
  adminName: data.updated_by_name,
  form: data.form,
});
