/* eslint-disable max-len */
import {
  showApplicationLoader,
  hideApplicationLoader,
} from 'common/ApplicationLoader';
import {
  assessmentDailogMessage,
  getCurrentSenior,
} from 'globals/global.functions';
import {
  Assessements,
  AssessmentButtonAction,
  AssessmentName,
  AssessmentStatus,
  AssessmentStatuses,
} from 'globals/enums';
import {
  DIALOG_TYPES,
  PAGINATION_LIMIT,
  CGAssessmentResponseValues,
} from 'globals/global.constants';
import {
  getPaginationDataIsolated,
  openOverlayDialog,
  showError,
} from 'store/commonReducer/common.action';

import {
  ICaregiverStrainAssessmentHistory,
  IGetCaregiverStrainAssessmentFilledFormParam,
  IGetCaregiverStrainAssessmentParam,
  IPostCaregiverActionParams,
  IPostCareGiverStrainAssessmentParams,
} from './CaregiverStrainAssessment.type';
import {
  getCaregiverStrainAssessmentService,
  mapCaregiverStrainFormData,
  postCaregiverStrainAssessmentService,
} from 'services/assessmentService/caregiverStrainAssessmentService/CGAssessment.services';
import {getCaregiverStrainAssessmentHistoryService} from 'services/assessmentService/caregiverStrainAssessmentService/assessmentHistory/CGAssessmentHistory.service';
import {
  GET_ASSESSMENT,
  GET_LOADING_STATUS,
  GET_ASSESSMENT_HISTORY,
  GET_ASSESSMENT_HISTORY_FAIL,
  GET_ASSESSMENT_HISTORY_SUCCESS,
  TOGGLE_IS_COMPLETED,
  TOGGLE_VIEW_STATE,
  UPDATE_ASSESSMENT_HISTORY_PAGE_NUMBER,
} from '../Assessments.action';
import {
  getAssessmentStatus,
  UPDATE_ASSESSMENT_STATUS,
} from '../AssessmentStatus/AssessmentStatus.action';

/**
 * @function getCaregiverStrainAssessment
 * @discription  action creator to fetch caregiverStrain assessment
 */
export const getCaregiverStrainAssessment =
  (caregiverId: string) => async (dispatch: any, getState: any) => {
    dispatch({type: GET_LOADING_STATUS, payload: true});
    const {seniorID} = getCurrentSenior();
    const lastEvaluatedKey = getState().assessments.history.lastEvaluatedKey;
    const param: IGetCaregiverStrainAssessmentFilledFormParam = {
      senior_id: seniorID,
      caregiver_id: caregiverId,
    };

    if (lastEvaluatedKey) {
      param.last_evaluated_key = lastEvaluatedKey;
    }
    try {
      const response = await getCaregiverStrainAssessmentService(param);
      dispatch({type: GET_LOADING_STATUS, payload: false});
      dispatch({
        type: GET_ASSESSMENT,
        payload: {
          ...response,
        },
      });
    } catch (error) {
      dispatch({type: GET_LOADING_STATUS, payload: false});
      dispatch(showError(error));
    }
  };

/**
 * @function postCaregiverStrainAssessment
 * @description action creator to post caregiverStrain assessment, to save reset and submit
 */
export const postCaregiverStrainAssessment =
  ({...assessmentData}: IPostCaregiverActionParams) =>
  async (dispatch: any) => {
    dispatch(showApplicationLoader());

    const params: IPostCareGiverStrainAssessmentParams = {
      senior_id: assessmentData.seniorID,
      caregiver_id: assessmentData.caregiverId,
      caregiver_name: assessmentData.caregiverName,
      assessment_status: assessmentData.type,
      total_score: assessmentData.totalScore,
      data: assessmentData.survey,
      version: assessmentData.versionNumber,
      options: {
        regular: CGAssessmentResponseValues.Regular,
        sometimes: CGAssessmentResponseValues.Sometimes,
        no: CGAssessmentResponseValues.No,
      },
    };
    if (assessmentData.assessmentId) {
      params.assessment_id = assessmentData.assessmentId;
    }
    try {
      await postCaregiverStrainAssessmentService(params);
      dispatch(toggleIncompleteTag(true));
      if (!assessmentData.isUnMount) {
        await dispatch(getCaregiverStrainAssessment(params.caregiver_id));
      }
      // Updating global AssessmentStatus
      if (assessmentData.type === AssessmentStatus.Reset) {
        dispatch(getAssessmentStatus());
      } else {
        dispatch({
          type: UPDATE_ASSESSMENT_STATUS,
          payload: {
            [AssessmentName.CAREGIVER_STRAIN]: {
              status:
                assessmentData.type === AssessmentStatus.Submit
                  ? AssessmentStatuses.COMPLETE
                  : AssessmentStatuses.INCOMPLETE,
              datetime: new Date().toUTCString(),
            },
          },
        });
      }

      if (assessmentData.type === AssessmentStatus.Submit) {
        dispatch(
          getPaginationDataIsolated(
            () => getCaregiverStrainAssessmentHistory(),
            PAGINATION_LIMIT.assessmentHistory,
            '',
            1,
            getCaregiverStrainAssessmentHistorySuccess,
            getCaregiverStrainAssessmentHistoryFail,
            '',
            '',
          ),
        );
      }

      const overlayMessage = (type: AssessmentStatus) => {
        switch (type) {
          case AssessmentStatus.Submit:
            return assessmentDailogMessage(
              Assessements.CAREGIVER_STRAIN,
              AssessmentButtonAction.Submit,
            );
          case AssessmentStatus.Reset:
            return assessmentDailogMessage(
              Assessements.CAREGIVER_STRAIN,
              AssessmentButtonAction.Reset,
            );
          default:
            return assessmentDailogMessage(
              Assessements.CAREGIVER_STRAIN,
              AssessmentButtonAction.Save,
            );
        }
      };
      dispatch(hideApplicationLoader());
      dispatch(
        openOverlayDialog({
          type: DIALOG_TYPES.SUCCESS,
          firstMessage: overlayMessage(assessmentData.type),
          isAutoSave: assessmentData.isAutoSave,
        }),
      );
      if (assessmentData.historyData) {
        const dateTime = `${assessmentData.historyData.date} ${assessmentData.historyData.time}`;
        const caregiverId = assessmentData.historyData.caregiverId;
        dispatch(
          toggleCaregiverStrainAssessmentViewState(true, dateTime, caregiverId),
        );
        dispatch({
          type: GET_ASSESSMENT,
          payload: {
            surveys: mapCaregiverStrainFormData(
              assessmentData.historyData.formData,
            ),
            dateTime: dateTime,
            assessmentId: assessmentData.historyData.assessmentId,
            careAgentId: assessmentData.historyData.careAgentId,
            assessmentStatus: 'submit',
          },
        });
      }
    } catch (error) {
      dispatch(hideApplicationLoader());
      dispatch(showError(error));
    }
  };

/**
 * @description action creator to fetch assessment history
 * @function getCaregiverStrainAssessmentHistory
 * @returns pagination data
 */
export const getCaregiverStrainAssessmentHistory =
  () => async (dispatch: any) => {
    try {
      dispatch({type: GET_ASSESSMENT_HISTORY});
      const {seniorID} = getCurrentSenior();
      const params: IGetCaregiverStrainAssessmentParam = {
        senior_id: seniorID,
      };
      const response = await getCaregiverStrainAssessmentHistoryService(params);
      return {
        data: JSON.parse(JSON.stringify(response.data)),
        lastEvaluatedKey: response.lastEvaluatedKey,
      };
    } catch (error) {
      dispatch(hideApplicationLoader());
      dispatch(showError(error));
    }
  };

/**
 * @function getCaregiverStrainAssessmentHistorySuccess
 * @description action creator to store assessment history table data
 * @param {ICaregiverStrainAssessmentHistory} tableData
 */
export const getCaregiverStrainAssessmentHistorySuccess =
  (tableData: ICaregiverStrainAssessmentHistory) => (dispatch: any) => {
    let {data, lastEvaluatedKey} = tableData;
    dispatch({
      type: GET_ASSESSMENT_HISTORY_SUCCESS,
      payload: {
        data: data,
        lastEvaluatedKey,
      },
    });
  };

/**
 * @description action creator to fetch error on api get fail
 * @param error
 */
export const getCaregiverStrainAssessmentHistoryFail =
  (error: any) => (dispatch: any) => {
    dispatch(showError(error));

    dispatch({
      type: GET_ASSESSMENT_HISTORY_FAIL,
    });
  };

/**
 * @function updateAssessmentHistoryPageNumber
 * @description action creator to update the page number of history table
 * @param {string | number} value
 */
export const updateCaregiverStrainAssessmentHistoryPageNumber =
  (value: string | number) => (dispatch: any) => {
    dispatch({
      type: UPDATE_ASSESSMENT_HISTORY_PAGE_NUMBER,
      payload: value,
    });
  };
/**
 * @function toggleCaregiverStrainAssessmentViewState
 * @description action creator to toggle the view of caregiverStrain assessmemt for submitted assessment
 */
export const toggleCaregiverStrainAssessmentViewState =
  (isHistory: boolean, dateTime: string, caregiverId: string) =>
  (dispatch: any) => {
    dispatch(showApplicationLoader());
    dispatch({
      type: TOGGLE_VIEW_STATE,
      payload: {
        isHistory: isHistory,
        dateTime: dateTime,
        caregiverId: caregiverId,
      },
    });
    dispatch(hideApplicationLoader());
  };
/**
 * @function toggleIncompleteTag
 * @description action creator to toggle the incomplete tag for incomplete caregiverStrain assessmemt
 */
export const toggleIncompleteTag =
  (isCompleted: boolean) => (dispatch: any) => {
    dispatch({
      type: TOGGLE_IS_COMPLETED,
      payload: {isCompleted: isCompleted},
    });
  };
