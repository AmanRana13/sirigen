/* eslint-disable max-len */
import {
  showApplicationLoader,
  hideApplicationLoader,
} from 'common/ApplicationLoader';

import {getFacilityManagementService} from 'services/coporateAndFacilitiesService/FacilityManagementService/facilitymanagement.service';
import {IFacilityData} from 'services/coporateAndFacilitiesService/FacilityManagementService/facilitymanagement.types';

import {showError} from 'store/commonReducer/common.action';

export const GET_FACILITY_MANAGEMENT_LIST = 'GET_FACILITY_MANAGEMENT_LIST';
export const GET_FACILITY_MANAGEMENT_LIST_SUCCESS =
  'GET_FACILITY_MANAGEMENT_LIST_SUCCESS';
export const GET_FACILITY_MANAGEMENT_LIST_FAIL =
  'GET_FACILITY_MANAGEMENT_LIST_FAIL';
export const UPDATE_FACILITY_MANAGEMENT_LIST_PAGE_NUMBER =
  'UPDATE_FACILITY_MANAGEMENT_LIST_PAGE_NUMBER';
export const RESET_FACILITY_MANAGEMENT_LIST = 'RESET_FACILITY_MANAGEMENT_LIST';
export const GET_FACILITY_MANAGEMENT_SEARCH_LIST_SUCCESS =
  'GET_FACILITY_MANAGEMENT_SEARCH_LIST_SUCCESS';

/**
 * @functions getFacilityList
 * @description action creator to fetch the facility lists
 * @returns void
 */
export const getFacilityList =
  (searchQuery: string, corpId: string | undefined) =>
  async (dispatch: any, getState: any) => {
    dispatch(showApplicationLoader());
    const lastEvaluatedKey =
      getState().cIRangeMilestones.completed.lastEvaluatedKey;

    const payload: any = {
      corporate_id: corpId,
    };

    if (searchQuery) {
      payload.facility_name = searchQuery;
    }
    if (lastEvaluatedKey) {
      payload.last_evaluated_key = lastEvaluatedKey;
    }

    try {
      const response = await getFacilityManagementService(payload);
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
 * @function getFacilityListSuccess
 * @description action creator to store facility table data
 * @param tableData
 */
export const getFacilityListSuccess = (tableData: any) => (dispatch: any) => {
  const {data, lastEvaluatedKey, searchLastEvaluatedKey} = tableData;

  dispatch({
    type: GET_FACILITY_MANAGEMENT_LIST_SUCCESS,
    payload: {
      data,
      lastEvaluatedKey,
      searchLastEvaluatedKey,
    },
  });
};

/**
 * @function getFacilitySearchListSuccess
 * @description action creator to search facility list
 * @param tableData
 */
export const getFacilitySearchListSuccess =
  (tableData: any) => (dispatch: any) => {
    const {data, lastEvaluatedKey} = tableData;

    dispatch({
      type: GET_FACILITY_MANAGEMENT_SEARCH_LIST_SUCCESS,
      payload: {
        data,
        searchLastEvaluatedKey: lastEvaluatedKey,
      },
    });
  };

/**
 * @function getFacilityListFail
 * @description action creator to fetch error on api get fail
 * @param error
 */
export const getFacilityListFail = (error: any) => (dispatch: any) => {
  dispatch(showError(error));
  dispatch({
    type: GET_FACILITY_MANAGEMENT_LIST_FAIL,
  });
};

/**
 * @function updateFacilityPageNumber
 * @description action creator to update the page number of facility management table
 * @param {string | number} value
 */
export const updateFacilityPageNumber = (value: any) => (dispatch: any) => {
  dispatch({
    type: UPDATE_FACILITY_MANAGEMENT_LIST_PAGE_NUMBER,
    payload: value,
  });
};

/**
 * @function resetFacilityManagementList
 * @description action creator to reset facility table
 */
export const resetFacilityManagementList = () => (dispatch: any) => {
  dispatch({
    type: RESET_FACILITY_MANAGEMENT_LIST,
  });
};

/**
 * @description method to flter data on FE, search by name
 * @function searchFacilityByName
 * @param {any[]} data
 * @param {string} searchQuery
 * @returns {any[]}
 */
export const searchFacilityByName = (data = [], searchQuery = '') => {
  return data.filter((facility: IFacilityData) => {
    const query = searchQuery.toLowerCase();
    const corpName = facility.facilityName.toLowerCase() || '';
    return corpName.includes(query);
  });
};
