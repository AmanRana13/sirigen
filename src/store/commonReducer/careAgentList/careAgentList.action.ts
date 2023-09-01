import {
  showApplicationLoader,
  hideApplicationLoader,
} from 'common/ApplicationLoader';
import {Roles, ShiftTypes} from 'globals/enums';
import {getCareAgentService} from 'services/careAgentAccountService/careAgentAccount.service';
import {showError} from 'store/commonReducer/common.action';

export const GET_CARE_AGENT_LIST = 'GET_CARE_AGENT_LIST';
export const GET_CARE_AGENT_LIST_SUCCESS = 'GET_CARE_AGENT_LIST_SUCCESS';
export const GET_CARE_AGENT_LIST_FAIL = 'GET_CARE_AGENT_LIST_FAIL';
export const UPDATE_CARE_AGENT_LIST_PAGE_NUMBER =
  'UPDATE_CARE_AGENT_LIST_PAGE_NUMBER';
export const RESET_CARE_AGENT_LIST = 'RESET_CARE_AGENT_LIST';
export const GET_CARE_AGENT_SEARCH_LIST_SUCCESS =
  'GET_CARE_AGENT_SEARCH_LIST_SUCCESS';

/**
 * @function getCareAgentList
 * @description action creator to get CareAgent List
 * @param {string} searchQuery
 * @param {any} lastEvaluatedKey
 * @param {boolean} showLoader if set true will show the ApplicationLoader
 * @param {ShiftTypes[]} shift an array of shifts to filter
 * @param {Roles} role role to filter
 */
export const getCareAgentList = (
  searchQuery = '',
  lastEvaluatedKey = '',
  showLoader = false,
  shift: ShiftTypes[] = [],
  role?: Roles,
) => {
  return async (dispatch: any) => {
    if (showLoader) {
      dispatch(showApplicationLoader());
    }
    dispatch({type: GET_CARE_AGENT_LIST});
    const params: any = {};

    if (lastEvaluatedKey) {
      params.last_evaluated_key = lastEvaluatedKey;
    }

    if (searchQuery) {
      params.search_query = JSON.stringify([
        {type: 'name', value: searchQuery},
      ]);
    }

    if (shift.length) {
      params.shift = JSON.stringify(shift);
    }

    if (role) {
      params.role = role;
    }

    try {
      const response = await getCareAgentService(params);
      dispatch(hideApplicationLoader());
      return {
        data: response.result,
        lastEvaluatedKey: response.lastEvaluatedKey,
      };
    } catch (error) {
      dispatch(hideApplicationLoader());
    }
  };
};

/**
 * @function getCareAgentListWithoutOvernight
 * @description action creator to get CareAgent List without shift Overnight
 * @param {string} searchQuery
 * @param {any} lastEvaluatedKey
 * @param {boolean} showLoader if set true will show the ApplicationLoader
 */
export const getCareAgentListWithoutOvernight = (
  searchQuery = '',
  lastEvaluatedKey = '',
  showLoader = false,
) => {
  return getCareAgentList(
    searchQuery,
    lastEvaluatedKey,
    showLoader,
    [ShiftTypes.DAY, ShiftTypes.EVENING],
    Roles.CareAgent,
  );
};

/**
 * @function getCareAgentListSuccess
 * @description action creator to store careAgents table data
 * @param tableData
 */
export const getCareAgentListSuccess = (tableData: any) => (dispatch: any) => {
  const {data, lastEvaluatedKey, searchLastEvaluatedKey} = tableData;

  dispatch({
    type: GET_CARE_AGENT_LIST_SUCCESS,
    payload: {
      data,
      lastEvaluatedKey,
      searchLastEvaluatedKey,
    },
  });
};

/**
 * @function getCareAgentSearchListSuccess
 * @description action creator to store careAgents table data
 * @param tableData
 */
export const getCareAgentSearchListSuccess =
  (tableData: any) => (dispatch: any) => {
    const {data, lastEvaluatedKey} = tableData;

    dispatch({
      type: GET_CARE_AGENT_SEARCH_LIST_SUCCESS,
      payload: {
        data,
        searchLastEvaluatedKey: lastEvaluatedKey,
      },
    });
  };

/**
 * @function getCareAgentListFail
 * @description action creator to fetch error on api get fail
 * @param error
 */
export const getCareAgentListFail = (error: any) => (dispatch: any) => {
  dispatch(showError(error));
  dispatch({
    type: GET_CARE_AGENT_LIST_FAIL,
  });
};

/**
 * @function updateCareAgentListPageNumber
 * @description action creator to update the page number of careAgents table
 * @param {string | number} value
 */
export const updateCareAgentListPageNumber =
  (value: any) => (dispatch: any) => {
    dispatch({type: UPDATE_CARE_AGENT_LIST_PAGE_NUMBER, payload: value});
  };

/**
 * @function resetCareAgentList
 * @description action creator to reset careAgents table
 */
export const resetCareAgentList = () => (dispatch: any) => {
  dispatch({
    type: RESET_CARE_AGENT_LIST,
  });
};

/**
 * @description search careAgent by name
 * @function searchCareAgentByName
 * @param {any[]} data
 * @param {string} searchQuery
 * @returns {any[]}
 */
export const searchCareAgentByName = (data = [], searchQuery = '') => {
  return data.filter((careAgent: any) => {
    const basicInfo = careAgent.name;
    const query = searchQuery.toLowerCase().split(' ');
    const firstName = basicInfo.firstName.toLowerCase() || '';
    const middleName = basicInfo.middleName?.toLowerCase() || '';
    const lastName = basicInfo.lastName.toLowerCase() || '';

    return query.every((data) => {
      return (
        firstName.includes(data) ||
        middleName.includes(data) ||
        lastName.includes(data)
      );
    });
  });
};
