import {showError} from './../../../../store/commonReducer/common.action';
/* eslint-disable no-console */
import {getCareAgentInfo} from 'globals/global.functions';
import {updateInsightStatus} from './../../../../store/eventsReducer/Events.action';
/* eslint-disable max-len */
import {isEmpty} from 'lodash';
import {
  hideApplicationLoader,
  showApplicationLoader,
} from 'common/ApplicationLoader';
import {
  IGetCareInsightReviewsPayload,
  IUpdateCareInsightStatusParams,
} from './CareInsightReview.types';
import {CareInsightStatus, CareInsightTypes} from 'globals/enums';
import {postAlertDialog} from 'store/eventsReducer/Alerts.action';
import {
  getAllCareInsightEventsService,
  postSummaryMessageService,
} from 'services/careInsightService/insightSummary.service';
import {ICareInsightUpdateStatusPayload} from 'store/eventsReducer/Events.state';
import {PAGINATION_LIMIT} from 'globals/global.constants';

export const GET_CARE_INSIGHT_REVIEW = 'GET_CARE_INSIGHT_REVIEW';
export const RESET_CARE_INSIGHT_REVIEWS = 'RESET_CARE_INSIGHT_REVIEWS';
export const CARE_INSIGHT_REVIEWS_RESET_PAGINATION =
  'CARE_INSIGHT_REVIEWS_RESET_PAGINATION';
export const CARE_INSIGHT_REVIEWS_END_PAGINATION =
  'CARE_INSIGHT_REVIEWS_END_PAGINATION';

/**
 * @functions getAdminCareInsight
 * @description action creator to fetch the care insight on admin dashboard
 * @returns void
 */
export const getAdminCareInsight =
  (offset: number, limit: number) => async (dispatch: any) => {
    dispatch(showApplicationLoader());

    const payload: IGetCareInsightReviewsPayload = {
      desc: true,
      limit: limit,
      offset,
      status: CareInsightStatus.SentForApproval,
    };

    try {
      const response: any = await getAllCareInsightEventsService(payload);

      if (isEmpty(response)) {
        dispatch({type: CARE_INSIGHT_REVIEWS_END_PAGINATION});
      }

      dispatch({
        type: GET_CARE_INSIGHT_REVIEW,
        payload: {data: response},
      });
      dispatch(hideApplicationLoader());
    } catch (error) {
      dispatch(showError(error));
      dispatch(hideApplicationLoader());
    }
  };

/**
 * @function approveCareInsight
 * @description action creator to approve care insight.
 * @param {string} insightId
 * @param {string} msg
 * @param {string} seniorId
 * @param {string} type
 */
export const approveCareInsight =
  (insightId: string, msg: string, seniorId: string, type: string) =>
  async (dispatch: any, getState: any) => {
    const careAgentInfo = getCareAgentInfo();
    const CareInsightReviewData =
      getState().careInsightReview.allCareInsightReviews;

    const careInsight = CareInsightReviewData.find((data: any) => {
      return data.careInsightId === insightId;
    });

    //Check if admin edit the message
    const status =
      careInsight.message !== msg
        ? CareInsightStatus.ApprovedWithEdit
        : CareInsightStatus.Approved;

    if (
      type === CareInsightTypes.Summary ||
      type === CareInsightTypes.Facility_Summary
    ) {
      const payload = {
        senior_id: seniorId,
        message: msg,
        insight_type: CareInsightTypes.Summary,
        status,
        care_insight_id: insightId,
        updated_by: careAgentInfo.userName.first_name,
      };

      dispatch(approveSummary(payload));
    } else {
      const payload: IUpdateCareInsightStatusParams = {
        careInsightId: insightId,
        status,
        message: msg,
        updated_by: careAgentInfo.userName.first_name,
      };
      dispatch(approveAlert(payload));
    }
  };

/**
 * @function approveAlert
 * @description action to approve care insight alert
 * @param {IUpdateCareInsightStatusParams} payload payload of the API
 */
export const approveAlert =
  (payload: IUpdateCareInsightStatusParams) => async (dispatch: any) => {
    try {
      dispatch({type: CARE_INSIGHT_REVIEWS_END_PAGINATION});
      await dispatch(
        postAlertDialog(payload.careInsightId, payload.status, payload.message),
      );
      dispatch(resetCareInsightReviewData());

      dispatch(getAdminCareInsight(0, PAGINATION_LIMIT.adminCareInsightReview));
    } catch (error) {
      dispatch(showError(error));
      console.log(error);
    }
  };

/**
 * @function approveSummary
 * @description action creator to approve care insight summary
 * @param payload payload of the API
 * @returns
 */
export const approveSummary = (payload: any) => async (dispatch: any) => {
  try {
    dispatch({type: CARE_INSIGHT_REVIEWS_END_PAGINATION});
    await postSummaryMessageService(payload);
    dispatch(resetCareInsightReviewData());
    dispatch(getAdminCareInsight(0, PAGINATION_LIMIT.adminCareInsightReview));
  } catch (error) {
    dispatch(showError(error));
  }
};

/**
 * @function resetCareInsightReviewData
 * @description action creator to reset care insight review table data and pagination
 */
export const resetCareInsightReviewData = () => (dispatch: any) => {
  dispatch({type: RESET_CARE_INSIGHT_REVIEWS});
  dispatch({type: CARE_INSIGHT_REVIEWS_RESET_PAGINATION});
};

/**
 * @function declineCareInsight
 * @description action creator decline the care insight while reviewing
 * @param {string} careInsightId care insight id
 */
export const declineCareInsight =
  (careInsightId: string[]) => async (dispatch: any) => {
    try {
      const careAgentInfo = getCareAgentInfo();
      dispatch({type: CARE_INSIGHT_REVIEWS_END_PAGINATION});

      const payload: ICareInsightUpdateStatusPayload = {
        care_insight_ids: careInsightId,
        updated_by: careAgentInfo.userName.first_name,
        status: CareInsightStatus.Denied,
      };

      await dispatch(updateInsightStatus(payload));

      dispatch(resetCareInsightReviewData());
      await dispatch(
        getAdminCareInsight(0, PAGINATION_LIMIT.adminCareInsightReview),
      );
    } catch (error) {
      dispatch(showError(error));
      console.log(error);
    }
  };
