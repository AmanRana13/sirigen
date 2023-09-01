import { API } from "globals/api";
import { ASSESSMENT_TAGS_ENDPOINTS } from "globals/apiEndPoints";
import { IAssessmentStatus } from "./assessmentStatus.types";
import { AssessmentName } from "globals/enums";

/**
 * @function getUserAssessmentStatusService
 * @description API service to get Assessment Status from User Service
 * @param params api payload
 * @returns Promise
 */
export async function getUserAssessmentStatusService<T>(params: T) {
  try {
    const response = await API({
      url: ASSESSMENT_TAGS_ENDPOINTS.GET_USER_ASSESSMENT_TAGS,
      method: 'get',
      params: params,
    });
    const data = response?.data?.data || [];
    return mapAssessmentStatusPayload(data);
  } catch (error) {
    let errorMessage = error.response.data.message;
    throw new Error(errorMessage);
  }
}

/**
 * @function getSupervisionAssessmentStatusService
 * @description API service to get Assessment Status from Supervision Service
 * @param params api payload
 * @returns Promise
 */
export async function getSupervisionAssessmentStatusService<T>(params: T) {
    try {
      const response = await API({
        url: ASSESSMENT_TAGS_ENDPOINTS.GET_SUPERVISION_ASSESSMENT_TAGS,
        method: 'get',
        params: params,
      });
      const data = response.data?.data || [];
      return mapAssessmentStatusPayload(data);
    } catch (error) {
      let errorMessage = error.response.data.message;
      throw new Error(errorMessage);
    }
}

const AssessmentNames: Record<string, AssessmentName> = {
  'adl_brody_assessment': AssessmentName.LAWTON_BRODY,
  'adl_katz_assessment': AssessmentName.KATZ_INDEPENDENCE,
  'caregiver_assessment': AssessmentName.CAREGIVER_STRAIN,
  'holistic_assessment': AssessmentName.HOLISTIC,
  'wellness_survey': AssessmentName.WELLNESS_SURVEY,
  'medical_condition': AssessmentName.MEDICAL_CONDITION,
  'medication_list': AssessmentName.MEDICATION_LIST
}

function mapAssessmentStatusPayload(payload: IAssessmentStatus[]) {
    return payload.reduce((obj, data: IAssessmentStatus) => ({
        ...obj,
        [AssessmentNames[data.name]]: {
            status: data.status,
            datetime: data.datetime
        }
    }), {})
}
