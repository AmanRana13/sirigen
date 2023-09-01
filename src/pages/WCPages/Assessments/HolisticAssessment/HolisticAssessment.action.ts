import {snakeCase} from 'lodash';

/* eslint-disable max-len */
import {
  showApplicationLoader,
  hideApplicationLoader,
} from 'common/ApplicationLoader';
import {
  assessmentDailogMessage,
  getCurrentSenior,
} from 'globals/global.functions';
import {DIALOG_TYPES, PAGINATION_LIMIT} from 'globals/global.constants';
import {getHolisticAssessmentHistoryService} from 'services/assessmentService/holisticAssessment/assessmentHistory/assessmentHistory.service';
import {
  getHolisticAssessmentService,
  mapHolisticFormData,
  postHolisticAssessmentService,
} from 'services/assessmentService/holisticAssessment/assessment.service';
import {
  getPaginationDataIsolated,
  openOverlayDialog,
  showError,
} from 'store/commonReducer/common.action';

import {
  IGetHolisticAssessmentHistoryParam,
  IHolisticAssessmentSurvey,
  IHolisticAssessmentSurveyCount,
  IPostHolisticAssessmentParams,
} from './HolisticAssessment.types';
import {
  Assessements,
  AssessmentButtonAction,
  AssessmentName,
  AssessmentStatus,
  AssessmentStatuses,
} from 'globals/enums';
import {IAssessmentHistoryTableData} from '../AssessmentHistory.type';
import {
  GET_ASSESSMENT,
  GET_ASSESSMENT_HISTORY,
  GET_ASSESSMENT_HISTORY_FAIL,
  GET_ASSESSMENT_HISTORY_SUCCESS,
  TOGGLE_IS_COMPLETED,
  TOGGLE_VIEW_STATE,
  UPDATE_ASSESSMENT_HISTORY_PAGE_NUMBER,
} from '../Assessments.action';
import {
  UPDATE_ASSESSMENT_STATUS,
  getAssessmentStatus,
} from '../AssessmentStatus/AssessmentStatus.action';

export const getHolisticAssessment =
  () => async (dispatch: any, getState: any) => {
    dispatch(showApplicationLoader());
    const {seniorID} = getCurrentSenior();
    const lastEvaluatedKey = getState().assessments.history.lastEvaluatedKey;

    const param: any = {senior_id: seniorID};

    if (lastEvaluatedKey) {
      param.last_evaluated_key = lastEvaluatedKey;
    }
    try {
      const response = await getHolisticAssessmentService(param);
      dispatch(hideApplicationLoader());
      dispatch({
        type: GET_ASSESSMENT,
        payload: {
          ...response,
        },
      });
    } catch (error) {
      dispatch(hideApplicationLoader());
      dispatch(showError(error));
    }
  };

export const postHolisticAssessment =
  ({...assessmentData}: any) =>
  async (dispatch: any) => {
    dispatch(showApplicationLoader());

    const surveysData = Object.fromEntries(
      Object.entries(assessmentData.survey).map(([key, value]) => [
        snakeCase(`${key}`),
        value,
      ]),
    );

    const surveysCountData = Object.fromEntries(
      Object.entries(assessmentData.surveyCount).map(([key, value]) => [
        snakeCase(`${key}`),
        value,
      ]),
    ) as IHolisticAssessmentSurveyCount;

    const dataParam = Object.entries(surveysData).map(([key, value]) => {
      return {[key]: value};
    }) as IHolisticAssessmentSurvey[];

    const params: IPostHolisticAssessmentParams = {
      senior_id: assessmentData.seniorID,
      care_agent_id: assessmentData.careAgentId,
      created_by: `${assessmentData.careAgentName.first_name} ${assessmentData.careAgentName.last_name}`,
      assessment_status: assessmentData.type,
      assessment_score: {...surveysCountData},
      data: dataParam,
      total_score: assessmentData.totalScore,
      version: assessmentData.versionNumber,
      options: {
        always: 3,
        sometimes: 2,
        never: 1,
      },
    };
    if (assessmentData.assessmentId) {
      params.assessment_id = assessmentData.assessmentId;
    }
    try {
      await postHolisticAssessmentService(params);
      dispatch({
        type: TOGGLE_IS_COMPLETED,
        payload: {isCompleted: true},
      });
      if (!assessmentData?.isUnMount) await dispatch(getHolisticAssessment());
      // Updating global AssessmentStatus
      if (assessmentData.type === AssessmentStatus.Reset) {
        dispatch(getAssessmentStatus());
      } else {
        dispatch({
          type: UPDATE_ASSESSMENT_STATUS,
          payload: {
            [AssessmentName.HOLISTIC]: {
              status:
                assessmentData.type === AssessmentStatus.Submit
                  ? AssessmentStatuses.COMPLETE
                  : AssessmentStatuses.INCOMPLETE,
              datetime: new Date().toUTCString(),
            },
          },
        });
      }

      if (assessmentData.type == AssessmentStatus.Submit) {
        dispatch(
          getPaginationDataIsolated(
            () => getHolisticAssessmentHistory(),
            PAGINATION_LIMIT.assessmentHistory,
            '',
            1,
            getAssessmentHistorySuccess,
            getAssessmentHistoryFail,
            '',
            '',
          ),
        );
      }

      const overlayMessage = (type: AssessmentStatus) => {
        switch (type) {
          case AssessmentStatus.Submit:
            return assessmentDailogMessage(
              Assessements.HOLISTIC,
              AssessmentButtonAction.Submit,
            );
          case AssessmentStatus.Reset:
            return assessmentDailogMessage(
              Assessements.HOLISTIC,
              AssessmentButtonAction.Reset,
            );
          default:
            return assessmentDailogMessage(
              Assessements.HOLISTIC,
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

        dispatch(toggleHolisticAssessmentViewState(true, dateTime));
        dispatch({
          type: GET_ASSESSMENT,
          payload: {
            surveys: mapHolisticFormData(assessmentData.historyData.formData),
            dateTime: dateTime,
            careAgentId: assessmentData.historyData.careAgentId,
            assessmentStatus: AssessmentStatus.Submit,
            assessmentId: assessmentData.historyData.assessmentId,
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
 * @function getHolisticAssessmentHistory
 * @returns pagination data
 */
export const getHolisticAssessmentHistory =
  () => async (dispatch: any, getState: any) => {
    try {
      dispatch({type: GET_ASSESSMENT_HISTORY});
      const seniorId = getState().common.seniorDetail.minimalInfo.user_id;
      const params: IGetHolisticAssessmentHistoryParam = {
        senior_id: seniorId,
      };
      const response = await getHolisticAssessmentHistoryService(params);

      return {
        data: JSON.parse(JSON.stringify([...response.data].reverse())),
        lastEvaluatedKey: response.lastEvaluatedKey,
      };
    } catch (error) {
      dispatch(hideApplicationLoader());
      dispatch(showError(error));
    }
  };

/**
 * @function getAssessmentHistorySuccess
 * @description action creator to store assessment history table data
 * @param {IAssessmentHistory} tableData
 */
export const getAssessmentHistorySuccess =
  (tableData: IAssessmentHistoryTableData) => (dispatch: any) => {
    const {data, lastEvaluatedKey} = tableData;

    dispatch({
      type: GET_ASSESSMENT_HISTORY_SUCCESS,
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
export const getAssessmentHistoryFail = (error: any) => (dispatch: any) => {
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
export const updateAssessmentHistoryPageNumber =
  (value: string | number) => (dispatch: any) => {
    dispatch({type: UPDATE_ASSESSMENT_HISTORY_PAGE_NUMBER, payload: value});
  };

export const toggleHolisticAssessmentViewState =
  (isHistory: any, dateTime: any) => (dispatch: any) => {
    dispatch({
      type: TOGGLE_VIEW_STATE,
      payload: {isHistory: isHistory, dateTime: dateTime},
    });
  };
