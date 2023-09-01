/* eslint-disable max-len */
import {snakeCase} from 'lodash';

import {
  showApplicationLoader,
  hideApplicationLoader,
} from 'common/ApplicationLoader';
import {
  getHolisticAssessmentAdminService,
  getHolisticAssessmentHistoryAdminService,
  postHolisticAssessmentAdminService,
} from 'services/adminServices/holisticAssessmentAdmin.service';
import {
  getPaginationDataIsolated,
  openOverlayDialog,
  showError,
} from 'store/commonReducer/common.action';
import {DIALOG_TYPES, PAGINATION_LIMIT} from 'globals/global.constants';
import {HolisticAssessmentAdminStatus} from 'globals/enums';

export const GET_HOLISTIC_ASSESSMENT_ADMIN = 'GET_HOLISTIC_ASSESSMENT_ADMIN';
export const GET_HOLISTIC_ASSESSMENT_HISTORY_ADMIN =
  'GET_HOLISTIC_ASSESSMENT_HISTORY_ADMIN';
export const GET_HOLISTIC_ASSESSMENT_HISTORY_ADMIN_SUCCESS =
  'GET_HOLISTIC_ASSESSMENT_HISTORY_ADMIN_SUCCESS';
export const GET_HOLISTIC_ASSESSMENT_HISTORY_ADMIN_FAIL =
  'GET_HOLISTIC_ASSESSMENT_HISTORY_ADMIN_FAIL';
export const UPDATE_ASSESSMENT_HISTORY_ADMIN_PAGE_NUMBER =
  'UPDATE_ASSESSMENT_HISTORY_ADMIN_PAGE_NUMBER';
export const TOGGLE_HOLISTIC_ADMIN_VIEW_STATE =
  'TOGGLE_HOLISTIC_ADMIN_VIEW_STATE';

/**
 * @description action creator to fetch holistic assessment admin
 * @function getHolisticAssessmentAdmin
 */
export const getHolisticAssessmentAdmin = () => async (dispatch: any) => {
  dispatch(showApplicationLoader());
  try {
    const response = await getHolisticAssessmentAdminService();
    dispatch(hideApplicationLoader());
    dispatch({
      type: GET_HOLISTIC_ASSESSMENT_ADMIN,
      payload: {
        ...response,
      },
    });
  } catch (error) {
    dispatch(hideApplicationLoader());
    dispatch(showError(error));
  }
};

/**
 * @description action creator to fetch assessment history admin
 * @function getHolisticAssessmentHistoryAdmin
 * @returns pagination data
 */
export const getHolisticAssessmentHistoryAdmin =
  () => async (dispatch: any, getState: any) => {
    try {
      dispatch({type: GET_HOLISTIC_ASSESSMENT_HISTORY_ADMIN});
      const lastEvaluatedKey =
        getState().holisticAssessmentAdmin.history.lastEvaluatedKey;

      const param: any = {};

      if (lastEvaluatedKey) {
        param.last_evaluated_key = lastEvaluatedKey;
      }
      const response = await getHolisticAssessmentHistoryAdminService(param);

      return {
        data: response.data,
        lastEvaluatedKey: response.lastEvaluatedKey,
      };
    } catch (error) {
      dispatch(hideApplicationLoader());
      dispatch(showError(error));
    }
  };

/**
 * @function getAssessmentHistoryAdminSuccess
 * @description action creator to store assessment history table data
 * @param {IAssessmentHisotry} tableData
 */
export const getAssessmentHistoryAdminSuccess =
  (tableData: any) => (dispatch: any) => {
    const {data, lastEvaluatedKey} = tableData;

    dispatch({
      type: GET_HOLISTIC_ASSESSMENT_HISTORY_ADMIN_SUCCESS,
      payload: {
        data,
        lastEvaluatedKey,
      },
    });
  };

/**
 * @description action creator to fetch error on api get fail
 * @param error
 */
export const getAssessmentHistoryAdminFail =
  (error: any) => (dispatch: any) => {
    dispatch(showError(error));
    dispatch({
      type: GET_HOLISTIC_ASSESSMENT_HISTORY_ADMIN_FAIL,
    });
  };

/**
 * @function updateAssessmentHistoryAdminPageNumber
 * @description action creator to update the page number of history table
 * @param {string | number} value
 */
export const updateAssessmentHistoryAdminPageNumber =
  (value: string | number) => (dispatch: any) => {
    dispatch({
      type: UPDATE_ASSESSMENT_HISTORY_ADMIN_PAGE_NUMBER,
      payload: value,
    });
  };

/**
 * @function toggleHolisticAssessmentAdminViewState
 * @description action creator to toggle view state
 * @param {boolean} isHistory
 */
export const toggleHolisticAssessmentAdminViewState =
  (isHistory: boolean) => (dispatch: any) => {
    dispatch({
      type: TOGGLE_HOLISTIC_ADMIN_VIEW_STATE,
      payload: {isHistory: isHistory},
    });
  };

/**
 * @function postHolisticAssessmentAdmin
 * @description action creator to save/submit/reset assessment
 * @param {any} param
 */
export const postHolisticAssessmentAdmin =
  ({...param}: any) =>
  async (dispatch: any, getState: any) => {
    dispatch(showApplicationLoader());

    const careAgentId = getState().auth.userId;
    const careAgentName = getState().auth.userName;
    const exitingSurveyForm = getState().holisticAssessmentAdmin.survey;

    const dataParam = param.surveyData.map(({data, header}: any) => {
      const surveyKey = snakeCase(header);
      return {[surveyKey]: [...data]};
    });

    const params: any = {
      created_by: careAgentId,
      created_by_name: `${careAgentName.first_name} ${careAgentName.last_name}`,
      form_status: param.type,
      version_number: param.versionNumber,
      form_id: param.formId,
      form:
        param.type == HolisticAssessmentAdminStatus.Reset
          ? exitingSurveyForm
          : dataParam,
      options: {
        always: 3,
        never: 1,
        sometimes: 2,
      },
    };

    if (param.type == HolisticAssessmentAdminStatus.SubmitLater) {
      params.publish_date_time = param.publishDateTime;
    }

    try {
      await postHolisticAssessmentAdminService(params);
      await dispatch(getHolisticAssessmentAdmin());

      if (
        param.type == HolisticAssessmentAdminStatus.SubmitLater ||
        param.type == HolisticAssessmentAdminStatus.Submit ||
        param.type == HolisticAssessmentAdminStatus.Reset
      ) {
        dispatch(
          getPaginationDataIsolated(
            () => getHolisticAssessmentHistoryAdmin(),
            PAGINATION_LIMIT.assessmentHistory,
            '',
            1,
            getAssessmentHistoryAdminSuccess,
            getAssessmentHistoryAdminFail,
            '',
            '',
          ),
        );
      }

      dispatch(hideApplicationLoader());
      dispatch(
        openOverlayDialog({
          type: DIALOG_TYPES.SUCCESS,
          firstMessage: fetchSuccessMessage(param.type),
        }),
      );
    } catch (error) {
      dispatch(hideApplicationLoader());
      dispatch(showError(error));
    }
  };

const fetchSuccessMessage = (type: HolisticAssessmentAdminStatus) => {
  const submitMessage = `Holistic Assessment questions are submitted successfully`;
  const saveMessage = `Holistic Assessment updates are saved successfully`;
  const resetMessage = `Holistic Assessment has been reset`;
  const submitLater = `The latest Holistic Assessment questions are submitted successfully`;

  switch (type) {
    case HolisticAssessmentAdminStatus.Save:
      return saveMessage;
    case HolisticAssessmentAdminStatus.Submit:
      return submitMessage;
    case HolisticAssessmentAdminStatus.SubmitLater:
      return submitLater;
    case HolisticAssessmentAdminStatus.Reset:
      return resetMessage;
    default:
      return '';
  }
};
