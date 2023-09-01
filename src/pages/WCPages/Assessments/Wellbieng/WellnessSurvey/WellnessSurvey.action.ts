/* eslint-disable max-len */
import {
  showApplicationLoader,
  hideApplicationLoader,
} from 'common/ApplicationLoader';
import {showToast} from 'common/Toast';
import {getCurrentSenior} from 'globals/global.functions';
import {
  convertDateInUTC,
  convertEndDateInUTCTz,
  convertStartDateInUTCTz,
  getClientTimezone,
  subtractDate,
  validateDate,
} from 'globals/date.functions';
import {TABLE_CACHE_KEY} from 'globals/global.constants';

import {getPaginationDataIsolated} from 'store/commonReducer/common.action';
import {getWellnessSurveyService} from 'services/assessmentService/wellnessSurvey/wellnessSurvey.service';
import moment from 'moment';

// actions for wellness survey
export const GET_WELLNESS_SURVEY = 'GET_WELLNESS_SURVEY';
export const GET_WELLNESS_SURVEY_SUCCESS = 'GET_WELLNESS_SURVEY_SUCCESS';
export const GET_WELLNESS_SURVEY_FAIL = 'GET_WELLNESS_SURVEY_FAIL';
export const UPDATE_TO_DATE = 'UPDATE_TO_DATE';
export const UPDATE_FROM_DATE = 'UPDATE_FROM_DATE';
export const IS_DATE_ERROR = 'IS_DATE_ERROR';
export const RESET_DATE_FILTER = 'RESET_DATE_FILTER';
export const RESET_WELLNESS_SCORE = 'RESET_WELLNESS_SCORE';
export const RESET_WELLNESS_SURVEY = 'RESET_WELLNESS_SURVEY';
export const CLEAR_SURVEYS = 'CLEAR_SURVEYS';
export const SET_ROWS = 'SET_ROWS';
export const UPDATE_CURRENT_PAGE = 'UPDATE_CURRENT_PAGE';

/**
 * @description action creator to fetch all the wellness surveys
 * @param {boolean} isCompleted
 * @param {number} limit
 * @returns void
 */
export const getWellnessSurvey = (isCompleted: any, limit = 100) => async (
  dispatch: any,
  getState: any,
) => {
  try {
    const clientTimezone = getClientTimezone();
    const seniorInfo = {...getCurrentSenior()};
    dispatch(showApplicationLoader());
    dispatch({type: GET_WELLNESS_SURVEY});
    const priorThirtyDayDate: any = getPriorThirtyDayDate();

    const {
      toDate,
      lastEvaluatedKey,
      fromDate,
    } = getState().seniorDashboard.wellnessSurvey;

    const params = {
      senior_id: seniorInfo.seniorID,
      account_id: seniorInfo.accountID,
      limit,
      last_evaluated_key: lastEvaluatedKey,
      is_survey_completed: isCompleted,
      start_time: fromDate
        ? convertStartDateInUTCTz(fromDate, clientTimezone)
        : convertDateInUTC(priorThirtyDayDate),
      // end_time: moment(toDate).tz('America/Los_Angeles').format(),
      end_time: convertEndDateInUTCTz(toDate, clientTimezone),
      ascending: false,
    };

    if (!lastEvaluatedKey) {
      delete params.last_evaluated_key;
    }

    const response = await getWellnessSurveyService(params);

    dispatch(hideApplicationLoader());

    const resLastEvaluatedKey = response.data.last_evaluated_key;
    const list = response.data.data;
    return {
      data: list,
      lastEvaluatedKey: resLastEvaluatedKey,
    };
  } catch (error) {
    dispatch(hideApplicationLoader());
    dispatch(getWellnessSurveyFail(error));
    return new Error(error);
  }
};

export const getWellnessSurveySuccess = (tableData: any) => (dispatch: any) => {
  const {data, lastEvaluatedKey} = tableData;
  const scores: any = calulateWellnessScore(data);

  dispatch({
    type: GET_WELLNESS_SURVEY_SUCCESS,
    payload: {
      allSurveys: scores.survey,
      wellnessScore: scores.wellnessScore,
      lastEvaluatedKey,
    },
  });
};

export const getWellnessSurveyFail = (error: any) => (dispatch: any) => {
  let message = '';
  if (error.response) {
    message = `${GET_WELLNESS_SURVEY_FAIL}: ${error.response.data.message}`;
  }

  if (message) {
    dispatch(showToast(message, 'error'));
  }

  dispatch({
    type: GET_WELLNESS_SURVEY_FAIL,
  });
};

/**
 * @description actionCreator to validate the data and dispatch getWellnessSurvey
 * @returns void
 */
export const getSurvey = () => async (dispatch: any, getState: any) => {
  const priorThirtyDayDate = getPriorThirtyDayDate();
  const {
    toDate,
    fromDate,
    isDateError,
  } = getState().seniorDashboard.wellnessSurvey;

  if (!fromDate) {
    dispatch(updateFromDate(priorThirtyDayDate));
  }

  if (!validation(fromDate || priorThirtyDayDate, toDate, isDateError)) {
    try {
      return await dispatch(getWellnessSurvey(true));
    } catch (error) {
      return null;
    }
  } else {
    dispatch(updateIsDateError(true));
  }
};

export const applyDateFilter = () => (dispatch: any, getState: any) => {
  dispatch(clearSurveyData());
  const totalRows = getState().seniorDashboard.wellnessSurvey.totalRows;

  setTimeout(() => {
    dispatch(
      getPaginationDataIsolated(
        getSurvey,
        totalRows,
        TABLE_CACHE_KEY.WELLNESS_SURVEY,
        1,
        getWellnessSurveySuccess,
        getWellnessSurveyFail,
        '',
        '',
      ),
    );
  }, 200);
};

const clearSurveyData = () => (dispatch: any) => {
  dispatch(updateCurrentPage(1));
  localStorage.removeItem(TABLE_CACHE_KEY.WELLNESS_SURVEY);
  dispatch({type: CLEAR_SURVEYS});
};

/**
 * @description action creator to update the "to" date
 * @param {date} value
 * @returns void
 */
export const updateToDate = (value: any) => async (dispatch: any) => {
  dispatch({type: UPDATE_TO_DATE, payload: {date: value}});
};

/**
 * @description action creator to update the "from" date
 * @param {date} value
 * @returns void
 */
export const updateFromDate = (value: any) => async (dispatch: any) => {
  dispatch({type: UPDATE_FROM_DATE, payload: {date: value}});
};

/**
 * @description action creator to update the "isDateError"
 * @param {boolean} value error true or false
 * @returns void
 */
export const updateIsDateError = (value: any) => async (dispatch: any) => {
  dispatch({type: IS_DATE_ERROR, payload: value});
};

/**
 * @description action creator to reset the date filters value
 * @param {date} value
 * @returns void
 */
export const resetDateFilter = () => async (dispatch: any, getState: any) => {
  const priorThirtyDayDate = getPriorThirtyDayDate();

  localStorage.removeItem(TABLE_CACHE_KEY.WELLNESS_SURVEY);

  dispatch({type: RESET_DATE_FILTER, payload: {priorThirtyDayDate}});
  dispatch(applyDateFilter());
};

/**
 * @description action creator to reset wellness survey
 * @returns void
 */
export const resetWellnessSurvey = () => async (
  dispatch: any,
  getState: any,
) => {
  const currentSeniorId = getState().common?.seniorDetail?.minimalInfo?.user_id;
  localStorage.removeItem(
    `${TABLE_CACHE_KEY.WELLNESS_SURVEY}-${currentSeniorId}`,
  );
  dispatch({type: RESET_WELLNESS_SURVEY});
};

/**
 * @description action creator to update the table current page
 * @returns void
 */
export const updateCurrentPage = (value: any) => async (dispatch: any) => {
  dispatch({type: UPDATE_CURRENT_PAGE, payload: value});
};

/**
 * @description fn to validate the dates
 * @param {date} fromDate start date
 * @param {date} toDate end date date
 * @param {boolean} isDateError error value
 * @returns void
 */
const validation = (fromDate: any, toDate: any, isDateError: any) => {
  let isError = false;

  if (!validateDate(fromDate) || !validateDate(toDate) || isDateError) {
    isError = true;
  }

  return isError;
};

export const calulateWellnessScore = (survey: any) => {
  survey.forEach((data: any) => {
    const answerKeysArr = Object.keys(data.answer);
    data.score = 0;
    data.scoreLimit = answerKeysArr.length;
    answerKeysArr.forEach((dataKey) => {
      if (!data.answer[dataKey]?.value) {
        data.score += 1;
      }
    });
  });
  return {survey};
};

export const wellnessTableDimensions = {
  oneRowHeight: 55,
  tableHeaderHeight: 103,
};

/**
 * @function getPriorThirtyDayDate
 * @returns {Moment}prior 30 days date
 */
export const getPriorThirtyDayDate = () => subtractDate(moment(), 30, 'days');
