/* eslint-disable max-len */
import {
  showApplicationLoader,
  hideApplicationLoader,
} from 'common/ApplicationLoader';

import {getCorporateListService} from 'services/coporateAndFacilitiesService/corporateManagementService/corporateManagement.service';

import {showError} from 'store/commonReducer/common.action';

export const GET_CORPORATE_MANAGEMENT_LIST = 'GET_CORPORATE_MANAGEMENT_LIST';
export const GET_CORPORATE_MANAGEMENT_LIST_SUCCESS =
  'GET_CORPORATE_MANAGEMENT_LIST_SUCCESS';
export const GET_CORPORATE_MANAGEMENT_LIST_FAIL =
  'GET_CORPORATE_MANAGEMENT_LIST_FAIL';
export const UPDATE_CORPORATE_MANAGEMENT_LIST_PAGE_NUMBER =
  'UPDATE_CORPORATE_MANAGEMENT_LIST_PAGE_NUMBER';
export const RESET_CORPORATE_MANAGEMENT_LIST =
  'RESET_CORPORATE_MANAGEMENT_LIST';
export const GET_CORPORATE_MANAGEMENT_SEARCH_LIST_SUCCESS =
  'GET_CORPORATE_MANAGEMENT_SEARCH_LIST_SUCCESS';

/**
 * @functions getCorporateList
 * @description action creator to fetch the corporte lists
 * @returns void
 */
export const getCorporateList =
  (searchQuery: string) => async (dispatch: any, getState: any) => {
    dispatch(showApplicationLoader());
    const lastEvaluatedKey =
      getState().cIRangeMilestones.completed.lastEvaluatedKey;

    const payload: any = {};

    if (searchQuery) {
      payload.corporation_name = searchQuery;
    }
    if (lastEvaluatedKey) {
      payload.last_evaluated_key = lastEvaluatedKey;
    }

    try {
      const response = await getCorporateListService(payload);
      dispatch(hideApplicationLoader());

      return {
        data: response.data,
        lastEvaluatedKey: response.lastEvaluatedKey,
      };
    } catch (error) {
      dispatch(showError(error));
      dispatch(hideApplicationLoader());
    }
  };

/**
 * @function getCorporateListSuccess
 * @description action creator to store corporate table data
 * @param tableData
 */
export const getCorporateListSuccess = (tableData: any) => (dispatch: any) => {
  const {data, lastEvaluatedKey, searchLastEvaluatedKey} = tableData;

  dispatch({
    type: GET_CORPORATE_MANAGEMENT_LIST_SUCCESS,
    payload: {
      data,
      lastEvaluatedKey,
      searchLastEvaluatedKey,
    },
  });
};

/**
 * @function getCorporateSearchListSuccess
 * @description action creator to search corporate list
 * @param tableData
 */
export const getCorporateSearchListSuccess =
  (tableData: any) => (dispatch: any) => {
    const {data, lastEvaluatedKey} = tableData;

    dispatch({
      type: GET_CORPORATE_MANAGEMENT_SEARCH_LIST_SUCCESS,
      payload: {
        data,
        searchLastEvaluatedKey: lastEvaluatedKey,
      },
    });
  };

/**
 * @function getCorporateListFail
 * @description action creator to fetch error on api get fail
 * @param error
 */
export const getCorporateListFail = (error: any) => (dispatch: any) => {
  dispatch(showError(error));
  dispatch({
    type: GET_CORPORATE_MANAGEMENT_LIST_FAIL,
  });
};

/**
 * @function updateCorporatePageNumber
 * @description action creator to update the page number of corporate management table
 * @param {string | number} value
 */
export const updateCorporatePageNumber = (value: any) => (dispatch: any) => {
  dispatch({
    type: UPDATE_CORPORATE_MANAGEMENT_LIST_PAGE_NUMBER,
    payload: value,
  });
};

/**
 * @function resetCorporateManagementList
 * @description action creator to reset corporate table
 */
export const resetCorporateManagementList = () => (dispatch: any) => {
  dispatch({
    type: RESET_CORPORATE_MANAGEMENT_LIST,
  });
};

/**
 * @description method to flter data on FE, search by name
 * @function searchByName
 * @param {any[]} data
 * @param {string} searchQuery
 * @returns {any[]}
 */
export const searchByName = (data = [], searchQuery = '') => {
  return data.filter((corporate: any) => {
    const query = searchQuery.toLowerCase().split(' ');
    const corpName = corporate.name.toLowerCase() || '';
    return corpName.includes(query);
  });
};
