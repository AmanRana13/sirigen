/* eslint-disable max-len */
import {
  showApplicationLoader,
  hideApplicationLoader,
} from 'common/ApplicationLoader';
import {showToast} from 'common/Toast';
import {ZoneType} from 'globals/enums';
import {IUserId, Nullable} from 'globals/global.types';
import {getMultipleImagesService} from 'services/getMultipleImagesService/getMultipleImages.service';
import {IImagePayload} from 'services/getMultipleImagesService/getMultipleImages.types';
import {
  getSeniorListService,
  getSeniorMappingService,
} from 'services/seniorService/senior.service';
import {showError} from 'store/commonReducer/common.action';

export const GET_SENIOR_LIST = 'GET_SENIOR_LIST';
export const GET_SENIOR_LIST_SUCCESS = 'GET_SENIOR_LIST_SUCCESS';
export const GET_SENIOR_LIST_FAIL = 'GET_SENIOR_LIST_FAIL';
export const UPDATE_SENIOR_LIST_PAGE_NUMBER = 'UPDATE_SENIOR_LIST_PAGE_NUMBER';
export const RESET_SENIOR_LIST = 'RESET_SENIOR_LIST';
export const GET_SENIOR_SEARCH_LIST_SUCCESS = 'GET_SENIOR_SEARCH_LIST_SUCCESS';

export const SET_HOME_WC = 'SET_HOME_WC';
export const SET_HOME_ZONE = 'SET_HOME_ZONE';
export const SENIOR_HOME_SEARCH = 'SENIOR_HOME_SEARCH';
export const RESET_HOME_SEARCH = 'RESET_HOME_SEARCH';
export const SET_SENIOR_ZONE = 'SET_SENIOR_ZONE';

/**
 * @function getSeniorList
 * @description action creator to get Senior List
 * @param {string} searchQuery
 * @param {any} lastEvaluatedKey
 * @param {IUserId[]} ids an array of ids for which data is to be fetched
 * @param {boolean} unassigned if set true, filter for unassigned seniors
 * @param {boolean} showLoader if set true, shows ApplicationLoader
 * @param {string} order key by which list is to be ordered
 * @param {boolean} ascending if true, sorts list in ascending direction based on order key.
 */
export const getSeniorList = (
  searchQuery: string,
  lastEvaluatedKey: any = '',
  ids: IUserId[] = [],
  unassigned: Nullable<boolean> = null,
  showLoader = false,
  order: string = '',
  ascending: boolean = true,
  showAvatar: boolean = false,
  assignedTo: string = '',
  zone: ZoneType | '' = '',
) => {
  return async (dispatch: any, getState: any) => {
    const selectedHomeWc = getState().common.seniorList.selectedHomeWc;
    const selectedHomeZone = getState().common.seniorList.selectedHomeZone;
    const seniorHomeSearch = getState().common.seniorList.seniorHomeSearch;

    if (showLoader) {
      dispatch(showApplicationLoader());
    }

    dispatch({type: GET_SENIOR_LIST});

    const param: any = {};

    if (lastEvaluatedKey) {
      param.last_evaluated_key = lastEvaluatedKey;
    }

    if (seniorHomeSearch || searchQuery) {
      param.search_query = JSON.stringify([
        {type: 'name', value: seniorHomeSearch || searchQuery},
      ]);
    }

    if (ascending) {
      param.ascending = true;
    }

    if (order) {
      param.order = order;
    }

    if (assignedTo || selectedHomeWc) {
      param.assigned_to = assignedTo || selectedHomeWc.userId;
    }

    if (zone || selectedHomeZone) {
      param.zone = zone?.toLowerCase() || selectedHomeZone?.toLowerCase();
    }

    param.assigned = unassigned !== null ? !unassigned : null;
    // if ids are provided SeniorInfo is fetched directly, without fetching the list
    if (ids?.length > 0) {
      return getSeniorInformation(ids, dispatch, true).then((data) => {
        dispatch(hideApplicationLoader());
        return {data, lastEvaluatedKey: ''};
      });
    }

    // if ids are not provided SeniorList will be fetched
    try {
      const res = await getSeniorListService(param);
      const seniorsData = await getSeniorInformation(
        [],
        dispatch,
        true,
        res.data,
        showAvatar,
      );

      dispatch(hideApplicationLoader());
      return {data: seniorsData || [], lastEvaluatedKey: res.LastEvaluatedKey};
    } catch (error) {
      console.log(error);
      dispatch(hideApplicationLoader());
    }
  };
};

/**
 * @function getUnassignedSeniorList
 * @description action creator to get Unassigned Senior List
 * @param {string} searchQuery
 * @param {any} lastEvaluatedKey
 * @param {string} order key by which list is to be ordered
 * @param {boolean} ascending if true, sorts list in ascending direction based on order key.
 */
export const getUnassignedSeniorList = (
  searchQuery: string = '',
  lastEvaluatedKey: any = '',
  order: string = 'member_since',
  ascending: boolean = false,
) =>
  getSeniorList(
    searchQuery,
    lastEvaluatedKey,
    [],
    true,
    false,
    order,
    ascending,
    true,
  );

/**
 * @function getSeniorListSuccess
 * @description action creator to store seniors table data
 * @param tableData
 */
export const getSeniorListSuccess = (tableData: any) => (dispatch: any) => {
  const {data, lastEvaluatedKey, searchLastEvaluatedKey} = tableData;

  dispatch({
    type: GET_SENIOR_LIST_SUCCESS,
    payload: {
      data,
      lastEvaluatedKey,
      searchLastEvaluatedKey,
    },
  });
};

/**
 * @function getSeniorSearchListSuccess
 * @description action creator to store seniors table data
 * @param tableData
 */
export const getSeniorSearchListSuccess =
  (tableData: any) => (dispatch: any) => {
    const {data, lastEvaluatedKey} = tableData;

    dispatch({
      type: GET_SENIOR_SEARCH_LIST_SUCCESS,
      payload: {
        data,
        searchLastEvaluatedKey: lastEvaluatedKey,
      },
    });
  };

/**
 * @function getSeniorListFail
 * @description action creator to fetch error on api get fail
 * @param error
 */
export const getSeniorListFail = (error: any) => (dispatch: any) => {
  dispatch(showError(error));
  dispatch({
    type: GET_SENIOR_LIST_FAIL,
  });
};

/**
 * @function updateSeniorListPageNumber
 * @description action creator to update the page number of seniors table
 * @param {string | number} value
 */
export const updateSeniorListPageNumber = (value: any) => (dispatch: any) => {
  dispatch({type: UPDATE_SENIOR_LIST_PAGE_NUMBER, payload: value});
};

/**
 * @function resetSeniorList
 * @description action creator to reset seniors table
 */
export const resetSeniorList = () => (dispatch: any) => {
  dispatch({
    type: RESET_SENIOR_LIST,
  });
};

export const getSeniorInformation = async (
  ids: IUserId[],
  dispatch: any,
  isPost: boolean = false,
  seniorData: any = {},
  showAvatar: boolean = false,
) => {
  try {
    let res: any = seniorData;

    if (ids.length > 0) {
      res = await getSeniorMappingService(ids, isPost);
    } else {
      const accountIds = Object.keys(res);

      ids = accountIds.map((accountId: string): IUserId => {
        return {
          account_id: accountId,
          user_id: Object.keys(res[accountId])[0],
        };
      });
    }

    let seniorList: any = [];
    let imagePayload: IImagePayload[] = []; // image payload to be used for fetching profile images
    ids.forEach((id: IUserId) => {
      let list = res[id.account_id][id.user_id];
      list['account_id'] = id.account_id;
      list['senior_id'] = id.user_id;

      list['profile_image'] = '';
      seniorList.push(list);
      // building imagePayload, add to list if profile_image_id exists
      if (list?.profile_image_id) {
        imagePayload.push({
          image_id: list.profile_image_id,
          senior_id: list.senior_id,
        });
      }
    });
    // if imagePayload has length, getMultipleImages API is called to fetch direct urls for profile images
    if (imagePayload.length && showAvatar) {
      const images = await getMultipleImagesService(imagePayload);
      seniorList.forEach((senior: any) => {
        const image = images[senior.senior_id];
        if (image) {
          senior['profile_image'] = image;
        }
      });
    }
    return seniorList;
  } catch (err) {
    dispatch(
      showToast(`Member Directory: ${err.response.data.message}`, 'error'),
    );
  }
};

/**
 * @description search senior by name
 * @function searchSeniorByName
 * @param {any[]} data
 * @param {string} searchQuery
 * @returns {any[]}
 */
export const searchSeniorByName = (data = [], searchQuery = '') => {
  return data.filter((name: any) => {
    const basicInfo = name.minimal.name;
    const query = searchQuery.toLowerCase().split(' ');
    const firstName = basicInfo.first_name.toLowerCase() || '';
    const middleName = basicInfo.middle_name?.toLowerCase() || '';
    const lastName = basicInfo.last_name.toLowerCase() || '';

    return query.every((data) => {
      return (
        firstName.includes(data) ||
        middleName.includes(data) ||
        lastName.includes(data)
      );
    });
  });
};

export const resetHomeSearch = () => (dispatch: any) => {
  dispatch({type: RESET_HOME_SEARCH});
};

/**
 * @function setSeniorZone
 * @description action creator to zone of individual senior in redux state
 * @param {string} seniorId
 * @param {any} data
 */
export const setSeniorZone =
  (seniorId: string, zone: ZoneType) => (dispatch: any) => {
    dispatch({
      type: SET_SENIOR_ZONE,
      payload: {
        seniorId,
        zone,
      },
    });
  };
