/* eslint-disable max-len */
import {showError} from 'store/commonReducer/common.action';
import {
  hideApplicationLoader,
  showApplicationLoader,
} from 'common/ApplicationLoader';
import {getAllCIRangeMilestonesService} from 'services/cIRangeMilestonesService/cIRangeMilestones.service';
import {CIRangeMilestones} from 'globals/enums';

import {
  ICIRangeMilstoneServicedata,
  IGetCIRangeMilestonesParams,
} from './CIRangeMilestones.types';

export const RESET_CI_RANGE_MILESTONES = 'RESET_CI_RANGE_MILESTONES';
export const GET_OPEN_CI_RANGE_MILESTONES_SUCCESS =
  'GET_OPEN_CI_RANGE_MILESTONES_SUCCESS';
export const GET_COMPLETED_CI_RANGE_MILESTONES_SUCCESS =
  'GET_COMPLETED_CI_RANGE_MILESTONES_SUCCESS';
export const GET_OPEN_CI_RANGE_MILESTONES_FAIL =
  'GET_OPEN_CI_RANGE_MILESTONES_FAIL';
export const GET_COMPLETED_CI_RANGE_MILESTONES_FAIL =
  'GET_COMPLETED_CI_RANGE_MILESTONES_FAIL';
export const UPDATE_OPEN_CI_RANGE_MILESTONES_PAGE_NUMBER =
  'UPDATE_OPEN_CI_RANGE_MILESTONES_PAGE_NUMBER';
export const UPDATE_COMPLETED_CI_RANGE_MILESTONES_PAGE_NUMBER =
  'UPDATE_COMPLETED_CI_RANGE_MILESTONES_PAGE_NUMBER';

/**
 * @functions getAdminOpenCIRangeMilestones
 * @description action creator to fetch the open care insight range milestones on admin dashboard
 * @returns void
 */
export const getAdminOpenCIRangeMilestones =
  () => async (dispatch: any, getState: any) => {
    dispatch(showApplicationLoader());
    const lastEvaluatedKey = getState().cIRangeMilestones.open.lastEvaluatedKey;
    const payload: IGetCIRangeMilestonesParams = {
      status: CIRangeMilestones.Pending,
    };

    if (lastEvaluatedKey) {
      payload.last_evaluated_key = lastEvaluatedKey;
    }

    try {
      const response: ICIRangeMilstoneServicedata =
        await getAllCIRangeMilestonesService(payload);
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
 * @functions getAdminCompletedCIRangeMilestones
 * @description action creator to fetch the completed care insight range milestones on admin dashboard
 * @returns void
 */
export const getAdminCompletedCIRangeMilestones =
  () => async (dispatch: any, getState: any) => {
    dispatch(showApplicationLoader());
    const lastEvaluatedKey =
      getState().cIRangeMilestones.completed.lastEvaluatedKey;

    const payload: IGetCIRangeMilestonesParams = {
      status: CIRangeMilestones.Completed,
    };

    if (lastEvaluatedKey) {
      payload.last_evaluated_key = lastEvaluatedKey;
    }

    try {
      const response = await getAllCIRangeMilestonesService(payload);
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
 * @function getOpenCIRangeMilestonesSuccess
 * @description action creator to store open CI Range Milestones table data
 * @param  {ICIRangeMilstoneServicedata} tableData
 */
export const getOpenCIRangeMilestonesSuccess =
  (tableData: ICIRangeMilstoneServicedata) => (dispatch: any) => {
    const {data, lastEvaluatedKey} = tableData;
    const payload = {
      data,
      lastEvaluatedKey,
    };

    dispatch({
      type: GET_OPEN_CI_RANGE_MILESTONES_SUCCESS,
      payload,
    });
  };

/**
 * @function getCompletedCIRangeMilestonesSuccess
 * @description action creator to store completed CI Range Milestones table data
 * @param {ICIRangeMilstoneServicedata} tableData
 */
export const getCompletedCIRangeMilestonesSuccess =
  (tableData: ICIRangeMilstoneServicedata) => (dispatch: any) => {
    const {data, lastEvaluatedKey} = tableData;
    const payload = {
      data,
      lastEvaluatedKey,
    };

    dispatch({
      type: GET_COMPLETED_CI_RANGE_MILESTONES_SUCCESS,
      payload,
    });
  };

/**
 * @function getOpenCIRangeMilestonesFail
 * @description action creator to fetch error on open api get fail
 * @param error
 */
export const getOpenCIRangeMilestonesFail = (error: any) => (dispatch: any) => {
  dispatch(showError(error));
  dispatch({
    type: GET_OPEN_CI_RANGE_MILESTONES_FAIL,
  });
};

/**

 * @function getCompletedCIRangeMilestonesFail
 * @description action creator to fetch error on completed api get fail
 * @param error
 */
export const getCompletedCIRangeMilestonesFail =
  (error: any) => (dispatch: any) => {
    dispatch(showError(error));
    dispatch({
      type: GET_COMPLETED_CI_RANGE_MILESTONES_FAIL,
    });
  };

/**
 * @function updateOpenCIRangeMilestonesPageNumber
 * @description action creator to update the page number of open CI Range Milestones table
 * @param {string | number} value
 */
export const updateOpenCIRangeMilestonesPageNumber =
  (value: string | number) => (dispatch: any) => {
    dispatch({
      type: UPDATE_OPEN_CI_RANGE_MILESTONES_PAGE_NUMBER,
      payload: value,
    });
  };

/**
 * @function updateCompletedCIRangeMilestonesPageNumber
 * @description action creator to update the page number of completed CI Range Milestones table
 * @param {string | number} value
 */
export const updateCompletedCIRangeMilestonesPageNumber =
  (value: string | number) => (dispatch: any) => {
    dispatch({
      type: UPDATE_COMPLETED_CI_RANGE_MILESTONES_PAGE_NUMBER,
      payload: value,
    });
  };

/**
 * @function resetCIRangeMilestonesData
 * @description action creator to reset all CIRangeMilestones table data
 */
export const resetCIRangeMilestonesData = () => (dispatch: any) => {
  dispatch({type: RESET_CI_RANGE_MILESTONES});
};
