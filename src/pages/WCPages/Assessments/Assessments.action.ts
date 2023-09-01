export const GET_ASSESSMENT = 'GET_ASSESSMENT';
export const UPDATE_ASSESSMENT_PAGE_NUMBER = 'UPDATE_ASSESSMENT_PAGE_NUMBER';
export const RESET_ASSESSMENT = 'RESET_ASSESSMENT';
export const GET_ASSESSMENT_HISTORY = 'GET_ASSESSMENT_HISTORY';
export const GET_ASSESSMENT_HISTORY_SUCCESS = 'GET_ASSESSMENT_HISTORY_SUCCESS';
export const GET_ASSESSMENT_HISTORY_FAIL = 'GET_ASSESSMENT_HISTORY_FAIL';
export const UPDATE_ASSESSMENT_HISTORY_PAGE_NUMBER =
  'UPDATE_ASSESSMENT_HISTORY_PAGE_NUMBER';
export const TOGGLE_VIEW_STATE = 'TOGGLE_VIEW_STATE';
export const TOGGLE_IS_COMPLETED = 'TOGGLE_IS_COMPLETED';
export const GET_LOADING_STATUS = ' GET_LOADING_STATUS';
export const GET_SEARCH_RESULT = ' GET_SEARCH_RESULT';
export const SEARCH_RESULT_SUCCESS = 'SEARCH_RESULT_SUCCESS';
export const SEARCH_RESULT_FAIL = 'SEARCH_RESULT_FAIL';
export const RESET_SEARCH = 'RESET_SEARCH';

/**
 * @function updateAssessmentPageNumber
 * @description action creator to update the page number of history table
 * @param {string | number} value
 */
export const updateAssessmentPageNumber =
  (value: string | number) => (dispatch: any) => {
    dispatch({
      type: UPDATE_ASSESSMENT_PAGE_NUMBER,
      payload: value,
    });
  };
