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
import {DIALOG_TYPES, PAGINATION_LIMIT} from 'globals/global.constants';
import {
  getPaginationDataIsolated,
  openOverlayDialog,
  showError,
} from 'store/commonReducer/common.action';
import {
  getLawtonBrodyADLAssessmentService,
  mapLawtonBrodyFormData,
  postLawtonBrodyAssessmentService,
} from 'services/assessmentService/ADLAssessmentService/lawtonBrodyService/LawtonBrody.services';
import {getLawtonBrodyAssessmentHistoryService} from 'services/assessmentService/ADLAssessmentService/lawtonBrodyService/lawtonBrodyAssessmentHistory/lawtonBrodyAssessmentHistory.service';

import {
  ILawtonBrodyAssessmentHistory,
  IGetLawtonBrodyADLAssessmentParam,
  IPostLawtonBrodyADLAssessmentParams,
  IPostLawtonBrodyActionParams,
  ICareAgentName,
} from './LawtonBrodyAssessment.type';
import {
  GET_ASSESSMENT,
  GET_ASSESSMENT_HISTORY,
  GET_ASSESSMENT_HISTORY_FAIL,
  GET_ASSESSMENT_HISTORY_SUCCESS,
  GET_LOADING_STATUS,
  TOGGLE_IS_COMPLETED,
  TOGGLE_VIEW_STATE,
  UPDATE_ASSESSMENT_HISTORY_PAGE_NUMBER,
} from 'pages/WCPages/Assessments/Assessments.action';
import {
  getAssessmentStatus,
  UPDATE_ASSESSMENT_STATUS,
} from 'pages/WCPages/Assessments/AssessmentStatus/AssessmentStatus.action';

/**
 * @function getLawtonBrodyAssessment
 * @discription action creator to fetch LawtonBrody assessment
 */
export const getLawtonBrodyAssessment =
  () => async (dispatch: any, getState: any) => {
    dispatch({type: GET_LOADING_STATUS, payload: true});
    dispatch(showApplicationLoader());
    const {seniorID} = getCurrentSenior();
    const lastEvaluatedKey: string =
      getState().assessments.history.lastEvaluatedKey;
    const param: IGetLawtonBrodyADLAssessmentParam = {
      senior_id: seniorID,
    };

    if (lastEvaluatedKey) {
      param.last_evaluated_key = lastEvaluatedKey;
    }
    try {
      const response = await getLawtonBrodyADLAssessmentService(param);
      dispatch({type: GET_LOADING_STATUS, payload: false});
      dispatch({
        type: GET_ASSESSMENT,
        payload: {...response},
      });

      dispatch(hideApplicationLoader());
    } catch (error) {
      dispatch(hideApplicationLoader());
      dispatch({type: GET_LOADING_STATUS, payload: false});
      dispatch(showError(error));
    }
  };

/**
 * @function postLawtonBrodyAssessment
 * @description action creator to post LawtonBrody assessment, to save reset and submit
 */
export const postLawtonBrodyAssessment =
  ({...assessmentData}: IPostLawtonBrodyActionParams) =>
  async (dispatch: any, getState: any) => {
    dispatch(showApplicationLoader('', false, assessmentData.isAutoSave));
    const careAgentName: ICareAgentName = getState().auth.userName;

    const params: IPostLawtonBrodyADLAssessmentParams = {
      senior_id: assessmentData.seniorID,
      care_agent_name: `${careAgentName.first_name} ${careAgentName.last_name}`,
      assessment_status: assessmentData.type,
      total_score: assessmentData.totalScore,
      data: assessmentData.survey,
      version: assessmentData.versionNumber,
    };
    if (assessmentData.assessmentId) {
      params.assessment_id = assessmentData.assessmentId;
    }
    try {
      await postLawtonBrodyAssessmentService(params);
      dispatch(toggleIncompleteTag(true));
      if (!assessmentData.isUnMount) {
        await dispatch(getLawtonBrodyAssessment());
      }
      // Updating global AssessmentStatus
      if (assessmentData.type === AssessmentStatus.Reset) {
        dispatch(getAssessmentStatus());
      } else {
        dispatch({
          type: UPDATE_ASSESSMENT_STATUS,
          payload: {
            [AssessmentName.LAWTON_BRODY]: {
              status:
                assessmentData.type === AssessmentStatus.Submit
                  ? AssessmentStatuses.COMPLETE
                  : AssessmentStatuses.INCOMPLETE,
              datetime: new Date().toUTCString(),
            },
          },
        });
      }
      //set form as complete and refetch the history table
      if (assessmentData.type === AssessmentStatus.Submit) {
        dispatch(
          getPaginationDataIsolated(
            () => getLawtonBrodyAssessmentHistory(),
            PAGINATION_LIMIT.assessmentHistory,
            '',
            1,
            getLawtonBrodyAssessmentHistorySuccess,
            getLawtonBrodyAssessmentHistoryFail,
            '',
            '',
          ),
        );
      }
      const overlayMessage = (type: AssessmentStatus) => {
        switch (type) {
          case AssessmentStatus.Submit:
            return assessmentDailogMessage(
              Assessements.LAWTON_BRODY,
              AssessmentButtonAction.Submit,
            );
          case AssessmentStatus.Reset:
            return assessmentDailogMessage(
              Assessements.LAWTON_BRODY,
              AssessmentButtonAction.Reset,
            );
          default:
            return assessmentDailogMessage(
              Assessements.LAWTON_BRODY,
              AssessmentButtonAction.Save,
            );
        }
      };

      dispatch(hideApplicationLoader(assessmentData.isAutoSave));
      dispatch(
        openOverlayDialog({
          type: DIALOG_TYPES.SUCCESS,
          firstMessage: overlayMessage(assessmentData.type),
          isAutoSave: assessmentData.isAutoSave,
        }),
      );
      if (assessmentData.historyData) {
        const dateTime = `${assessmentData.historyData.date} ${assessmentData.historyData.time}`;
        dispatch(toggleLawtonBrodyAssessmentViewState(true, dateTime));
        dispatch({
          type: GET_ASSESSMENT,
          payload: {
            surveys: mapLawtonBrodyFormData(
              assessmentData.historyData.formData,
            ),
            dateTime: dateTime,
            assessmentId: assessmentData.historyData.assessmentId,
            assessmentStatus: AssessmentStatus.Submit,
            careAgentId: assessmentData.historyData.careAgentId,
          },
        });
      }
    } catch (error) {
      dispatch(hideApplicationLoader(assessmentData.isAutoSave));
      dispatch(showError(error));
    }
  };

/**
 * @description action creator to fetch assessment history
 * @function getLawtonBrodyAssessmentHistory
 * @returns pagination data
 */
export const getLawtonBrodyAssessmentHistory = () => async (dispatch: any) => {
  try {
    dispatch({type: GET_ASSESSMENT_HISTORY});
    const {seniorID} = getCurrentSenior();
    const params: IGetLawtonBrodyADLAssessmentParam = {
      senior_id: seniorID,
    };
    const response = await getLawtonBrodyAssessmentHistoryService(params);
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
 * @function getLawtonBrodyAssessmentHistorySuccess
 * @description action creator to store assessment history table data
 * @param ILawtonBrodyAssessmentHistory
 */
export const getLawtonBrodyAssessmentHistorySuccess =
  (tableData: ILawtonBrodyAssessmentHistory) => (dispatch: any) => {
    const {data, lastEvaluatedKey} = tableData;

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
export const getLawtonBrodyAssessmentHistoryFail =
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
export const updateLawtonBrodyAssessmentHistoryPageNumber =
  (value: string | number) => (dispatch: any) => {
    dispatch({
      type: UPDATE_ASSESSMENT_HISTORY_PAGE_NUMBER,
      payload: value,
    });
  };

/**
 * @function toggleLawtonBrodyAssessmentViewState
 * @description action creator to toggle the view of LawtonBrody assessmemt for submitted assessment
 */
export const toggleLawtonBrodyAssessmentViewState =
  (isHistory: boolean, dateTime: string) => (dispatch: any) => {
    dispatch(showApplicationLoader());
    dispatch({
      type: TOGGLE_VIEW_STATE,
      payload: {
        isHistory: isHistory,
        dateTime: dateTime,
      },
    });

    dispatch(hideApplicationLoader());
  };

/**
 * @function toggleIncompleteTag
 * @description action creator to toggle the incomplete tag for incomplete LawtonBrody assessmemt
 */
export const toggleIncompleteTag =
  (isCompleted: boolean) => (dispatch: any) => {
    dispatch({
      type: TOGGLE_IS_COMPLETED,
      payload: {isCompleted: isCompleted},
    });
  };
