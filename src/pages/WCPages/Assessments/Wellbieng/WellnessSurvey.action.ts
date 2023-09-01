/* eslint-disable max-len */
import {
  Assessements,
  AssessmentButtonAction,
  AssessmentName,
  AssessmentStatus,
  AssessmentStatuses,
} from 'globals/enums';
import moment from 'moment';
import {
  showApplicationLoader,
  hideApplicationLoader,
} from 'common/ApplicationLoader';
import {
  assessmentDailogMessage,
  getCurrentSenior,
} from 'globals/global.functions';
import {
  getPaginationDataIsolated,
  openOverlayDialog,
  showError,
} from 'store/commonReducer/common.action';
import {
  DATE_FORMAT,
  DIALOG_TYPES,
  PAGINATION_LIMIT,
} from 'globals/global.constants';

import {
  GET_ASSESSMENT,
  GET_ASSESSMENT_HISTORY_FAIL,
  GET_ASSESSMENT_HISTORY_SUCCESS,
  TOGGLE_IS_COMPLETED,
  TOGGLE_VIEW_STATE,
  UPDATE_ASSESSMENT_HISTORY_PAGE_NUMBER,
} from '../Assessments.action';
import WellnessSurveyParser from 'services/assessmentService/wellnessSurvey/parser/wellnessSurveyParser';
import {
  getWellnessSurveyService,
  postWellnessSurveyService,
} from 'services/assessmentService/wellnessSurvey/wellnessSurvey.service';
import {IAssessmentHistoryTableData} from '../AssessmentHistory.type';
import {
  IGetFormDataParams,
  IPostWellnessSurvey,
  IPostWellnesSurveyService,
} from './WellnessSurvey.type';
import {convertDateInUTC} from 'globals/date.functions';
import {
  UPDATE_ASSESSMENT_STATUS,
  getAssessmentStatus,
} from '../AssessmentStatus/AssessmentStatus.action';

/**
 * @function getWellnessSurvey
 * @description action creator to fetch current form data
 * @returns form data if form is saved previously otherwise return blank from
 */
export const getWellnessSurvey = () => async (dispatch: any, getState: any) => {
  const {seniorID, accountID} = getCurrentSenior();

  dispatch(showApplicationLoader());
  const accountCreatedDate = getState().common.seniorDetail.minimalInfo
    .created_date;
  const params: IGetFormDataParams = {
    senior_id: seniorID,
    account_id: accountID,
    limit: 100,
    is_survey_completed: false,
    start_time: convertDateInUTC(
      moment(accountCreatedDate).format(DATE_FORMAT),
    ),
    end_time: moment().format(),
    ascending: false,
  };

  try {
    const response = await getWellnessSurveyService(params);
    dispatch(hideApplicationLoader());
    const dataParser = new WellnessSurveyParser();
    const wellnessSurveyData = dataParser.parse(response?.data?.data[0] || {});

    dispatch({
      type: GET_ASSESSMENT,
      payload: {...wellnessSurveyData},
    });
  } catch (error) {
    dispatch(hideApplicationLoader());
    dispatch(showError(error));
  }
};

/**
 * @function postWellnessSurvey
 * @description action creator to save, submit or reset form data
 * @param param
 */
export const postWellnessSurvey = ({...param}: IPostWellnessSurvey) => async (
  dispatch: any,
  getState: any,
) => {
  dispatch(showApplicationLoader('', false, param.isAutoSave));
  const careAgentId = getState().auth.userId;
  const currentUTCOffset = moment().format('Z');
  const currentDate = moment().format('L');
  const surveyDate = moment(
    `${currentDate} 00:00:00${currentUTCOffset}`,
  ).format();

  const params: IPostWellnesSurveyService = {
    account_id: param.accountID,
    senior_id: param.seniorID,
    careagent_id: careAgentId,
    form_version: param.versionNumber,
    survey_date: surveyDate,
    answer: param.data,
    is_survey_completed: param.type === AssessmentStatus.Submit,
    is_reseted: param.type === AssessmentStatus.Reset,
  };

  if (param.assessmentId) {
    params.survey_id = param.assessmentId;
  }
  try {
    await postWellnessSurveyService(params);
    dispatch(toggleIncompleteTag(true));
    if (!param.isUnMount) {
      await dispatch(getWellnessSurvey());
    }
    // Updating global AssessmentStatus
    if (param.type === AssessmentStatus.Reset) {
      dispatch(getAssessmentStatus());
    } else {
      dispatch({
        type: UPDATE_ASSESSMENT_STATUS,
        payload: {
          [AssessmentName.WELLNESS_SURVEY]: {
            status:
              param.type === AssessmentStatus.Submit
                ? AssessmentStatuses.COMPLETE
                : AssessmentStatuses.INCOMPLETE,
            datetime: new Date().toUTCString(),
          },
        },
      });
    }

    if (param.type == AssessmentStatus.Submit) {
      dispatch(
        getPaginationDataIsolated(
          () => getWellnessSurveyHistory(),
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
            Assessements.WELLNESS_SURVEY,
            AssessmentButtonAction.Submit,
          );
        case AssessmentStatus.Reset:
          return assessmentDailogMessage(
            Assessements.WELLNESS_SURVEY,
            AssessmentButtonAction.Reset,
          );
        default:
          return assessmentDailogMessage(
            Assessements.WELLNESS_SURVEY,
            AssessmentButtonAction.Save,
          );
      }
    };
    dispatch(hideApplicationLoader(param.isAutoSave));
    dispatch(
      openOverlayDialog({
        type: DIALOG_TYPES.SUCCESS,
        firstMessage: overlayMessage(param.type),
        isAutoSave: param.isAutoSave,
      }),
    );
    if (param.historyData) {
      const dateTime = `${param.historyData.date} ${param.historyData.time}`;
      dispatch(toggleWellnessSurveyViewState(true, dateTime));
      dispatch({
        type: GET_ASSESSMENT,
        payload: {
          surveys: param.historyData.surveys,
          dateTime: dateTime,
          careAgentId: param.historyData.careAgentId,
          assessmentStatus: AssessmentStatus.Submit,
          assessmentId: param.historyData.assessmentId,
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
 * @function getWellnessSurveyHistory
 * @returns pagination data
 */
export const getWellnessSurveyHistory = () => async (
  dispatch: any,
  getState: any,
) => {
  try {
    const {seniorID, accountID} = getCurrentSenior();
    dispatch(showApplicationLoader());
    const accountCreatedDate = getState().common.seniorDetail.minimalInfo
      .created_date;

    const params: IGetFormDataParams = {
      senior_id: seniorID,
      account_id: accountID,
      limit: 100,
      is_survey_completed: true,
      start_time: convertDateInUTC(
        moment(accountCreatedDate).format(DATE_FORMAT),
      ),
      end_time: moment().format(),
      ascending: false,
    };

    if (accountCreatedDate) {
      const response: any = await getWellnessSurveyService(params);
      dispatch(hideApplicationLoader());
      const resLastEvaluatedKey = response?.data?.last_evaluated_key;
      const historyTableData = response?.data?.data.map((item: any) => {
        const dataParser = new WellnessSurveyParser();
        const wellnessSurveyData = dataParser.parse(item || {});
        return {...wellnessSurveyData};
      });

      return {
        data: historyTableData,
        lastEvaluatedKey: resLastEvaluatedKey || null,
      };
    }
    return {
      data: [],
      lastEvaluatedKey: null,
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
export const getAssessmentHistorySuccess = (
  tableData: IAssessmentHistoryTableData,
) => (dispatch: any) => {
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
export const updateAssessmentHistoryPageNumber = (value: string | number) => (
  dispatch: any,
) => {
  dispatch({type: UPDATE_ASSESSMENT_HISTORY_PAGE_NUMBER, payload: value});
};

/**
 * @function toggleWellnessSurveyViewState
 * @description action creator to toggle the view state of form when we click on view button in history table
 * @param {boolean} isHistory
 *  @param {string} dateTime
 *
 */
export const toggleWellnessSurveyViewState = (
  isHistory: boolean,
  dateTime: string,
) => (dispatch: any) => {
  dispatch({
    type: TOGGLE_VIEW_STATE,
    payload: {isHistory: isHistory, dateTime: dateTime},
  });
};

export const toggleIncompleteTag = (isCompleted: boolean) => (
  dispatch: any,
) => {
  dispatch({
    type: TOGGLE_IS_COMPLETED,
    payload: {isCompleted: isCompleted},
  });
};
