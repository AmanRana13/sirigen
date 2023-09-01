import {showError} from 'store/commonReducer/common.action';
import {
  delayInMilliSeconds,
  PAGINATION_LIMIT,
  TOAST_MESSAGES,
} from './../../globals/global.constants';

import {
  hideApplicationLoader,
  showApplicationLoader,
} from 'common/ApplicationLoader';
import {showToast} from 'common/Toast';
import {removeObjectProperty, getCareAgentInfo} from 'globals/global.functions';
import {
  convertEndDateInUTCTz,
  convertStartDateInUTCTz,
  convertUTCSecondsToUnixNanoSeconds,
  getClientTimezone,
} from 'globals/date.functions';
import {
  IGetInsightsPayload,
  ICareInsightHistory,
} from 'pages/WCPages/SeniorCareInsights/SeniorCareInsight.state';
import {
  getAllCareInsightEventsService,
  updateInsightStatusService,
} from 'services/careInsightService/insightSummary.service';

import {
  CareInsightStatus,
  CareInsightTypes,
  EventsType,
  ToastMessageType,
  EventViewState,
} from './../../globals/enums';

import {getCareInsightHistory} from './../../pages/WCPages/SeniorCareInsights/SeniorCareInsight.action';
import {
  ICareInsightUpdateStatusPayload,
  IEventsInitialState,
} from './Events.state';
import {createAlertDialog} from './Alerts.action';
import {push} from 'redux-first-history';
import {
  getAdminCareInsight,
  resetCareInsightReviewData,
} from 'pages/WCPages/Admin/CareInsightReview/CareInsightReview.action';
import {adminBaseRoute, appRoutesEndpoints} from 'routes/appRoutesEndpoints';
import {getAllAlarmEventsService} from 'services/alarmService/alarm.service';
import {createAlarmDialog} from '../alarmReducer/Alarm.action';
import {createCallEntryDialog} from 'pages/WCPages/SeniorDashboard/components/CallEntry/CallEntry.action';

import {RootState} from 'store/store';

export const ADD_SUMMARY = 'ADD_SUMMARY';
export const CREATE_SUMMARY = 'CREATE_SUMMARY';
export const MINIMIZE_EVENT = 'MINIMIZE_EVENT';
export const MAXIMIZE_EVENT = 'MAXIMIZE_EVENT';
export const CLOSE_EVENT = 'CLOSE_EVENT';
export const CREATE_ALERT = 'CREATE_ALERT';
export const CREATE_MILESTONE = 'CREATE_MILESTONE';
export const REMOVE_ALL_EVENTS = 'REMOVE_ALL_EVENTS';

/**
 * @description action creator to minimize the events
 */
export const minimizeEvent =
  (eventId: string, eventType: EventsType, data?: any) => (dispatch: any) => {
    dispatch({type: MINIMIZE_EVENT, payload: {eventId, eventType, data}});
  };

/**
 * @function maximizeEvent
 * @description action creator to maximize the events
 */
export const maximizeEvent =
  (eventId: string, eventType: EventsType) => (dispatch: any) => {
    dispatch({type: MAXIMIZE_EVENT, payload: {eventId, eventType}});
  };

/**
 * @function removeAllEvents
 * @description action creator to remove all the events
 */
export const removeAllEvents = () => (dispatch: any) => {
  dispatch({type: REMOVE_ALL_EVENTS});
};

/**
 * @function closeEvent
 * @description action creator to close the events
 */
export const closeEvent =
  (eventId: string, eventType: EventsType) =>
  (dispatch: any, getState: any) => {
    const events: IEventsInitialState = getState().events;
    const updatedEvent = removeObjectProperty(events[eventType], eventId);

    dispatch({type: CLOSE_EVENT, payload: {eventType, updatedEvent}});
  };

/**
 * @function getAlertCareInsightHistory
 * @description action creator to get care insight history
 * @param {*} startDate
 * @param {*} endDate
 * @param {string} accountId
 * @param {string} seniorId
 * @returns alert history api response
 */
export const getAlertCareInsightHistory =
  (startDate: any, endDate: any, accountId: string, seniorId: string) =>
  async (dispatch: any) => {
    const clientTimezone = getClientTimezone();

    try {
      const payload: IGetInsightsPayload = {
        account_id: accountId,
        senior_id: seniorId,
        start_timestamp: convertUTCSecondsToUnixNanoSeconds(
          convertStartDateInUTCTz(startDate, clientTimezone),
        ),
        end_timestamp: convertUTCSecondsToUnixNanoSeconds(
          convertEndDateInUTCTz(endDate, clientTimezone),
        ),
        desc: true,
        insight_type: CareInsightTypes.Action,
        // status: CareInsightStatus.New,
      };

      return await dispatch(getEventsInsightHistory(payload));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

/**
 * @description action creator to get events insight history
 * @param {IGetInsightsPayload} payload
 * @returns
 */
export const getEventsInsightHistory =
  (payload: IGetInsightsPayload) => async (dispatch: any) => {
    try {
      const response = await dispatch(getCareInsightHistory(payload));
      dispatch(hideApplicationLoader());

      return response;
    } catch (error) {
      dispatch(hideApplicationLoader());

      if (error instanceof Error) {
        dispatch(showToast(error.message, ToastMessageType.Error));
      }
      return null;
    }
  };

/**
 * @function getAllCareInsightEvents
 * @description action creator to get the existing new events(actions, sos, fall detection)
 * @returns void
 */
export const getAllCareInsightEvents = () => async (dispatch: any) => {
  try {
    const statusNewRequest = getAllCareInsightEventsService({
      status: CareInsightStatus.New,
      insight_type: CareInsightTypes.Action,
    });

    const statusAbandonedRequest = getAllCareInsightEventsService({
      status: CareInsightStatus.Abandoned,
      insight_type: CareInsightTypes.Action,
    });

    let response: ICareInsightHistory[][] | ICareInsightHistory[] =
      await Promise.all([statusNewRequest, statusAbandonedRequest]);

    response = response.flat();

    for (const careInsightData of response) {
      if (careInsightData.type === CareInsightTypes.Action) {
        dispatch(createAlertDialog(careInsightData));
      }
    }
  } catch (error) {
    dispatch(
      showToast(
        TOAST_MESSAGES.GET_ALL_CARE_INSIGHT.FAIL,
        ToastMessageType.Error,
      ),
    );
  }
};

/**
 * @function getAllAlarmEvents
 * @description action creator to get the existing new events(actions, sos, fall detection)
 * @returns void
 */
export const getAllAlarmEvents = () => async (dispatch: any) => {
  const userInfo = getCareAgentInfo();

  //function to delay sos/fall rendering to hear individual sound notification
  const wait = (ms: any) => new Promise((resolve) => setTimeout(resolve, ms));

  try {
    const pending: any = await getAllAlarmEventsService({
      statuses: JSON.stringify(['pending']),
    });
    const assigned: any = await getAllAlarmEventsService({
      statuses: JSON.stringify(['assigned']),
      user_id: userInfo.userId,
    });

    for (const alarmData of pending) {
      await dispatch(createAlarmDialog(alarmData));
      await wait(delayInMilliSeconds.SOS_FALL);
    }

    for (const callData of assigned) {
      await dispatch(createCallEntryDialog(callData));
    }
  } catch (error) {
    console.log(error);
    dispatch(
      showToast(
        TOAST_MESSAGES.GET_ALL_CARE_INSIGHT.FAIL,
        ToastMessageType.Error,
      ),
    );
  }
};

/**
 * @description action creator to update insight status
 * @param {ICareInsightUpdateStatusPayload} payload
 * @returns void
 */
export const updateInsightStatus =
  (payload: ICareInsightUpdateStatusPayload) => async (dispatch: any) => {
    try {
      dispatch(showApplicationLoader());
      const response = await updateInsightStatusService(payload);
      dispatch(hideApplicationLoader());
      return response;
    } catch (error) {
      dispatch(hideApplicationLoader());
      dispatch(showError(error));
    }
  };

/**
 * @description action creator to change the careinsight status to no action
 * @param {string} careInsightId
 * @returns void
 */
export const updateNoActionStatus =
  (careInsightId: string[]) => (dispatch: any) => {
    const careAgentInfo = getCareAgentInfo();

    const payload: ICareInsightUpdateStatusPayload = {
      care_insight_ids: careInsightId,
      updated_by: careAgentInfo.userName.first_name,
      status: CareInsightStatus.NoAction,
    };

    dispatch(updateInsightStatus(payload));
  };

//temp action creator need to remove in future
export const tempNoActionAllAlert = () => (dispatch: any, getState: any) => {
  const allAlerts = getState().events.alert;

  const arrayAlertsId: string[] = Object.values(allAlerts).map(
    (value: any) => value.alertId,
  );

  dispatch(updateNoActionStatus(arrayAlertsId));
  dispatch(removeAllEvents());
};

/**
 * @description action creator to redirect the user on CI review page when clicking approve dialog
 * @function redirectApproveDialog
 */
export const redirectApproveDialog = () => (dispatch: any, getState: any) => {
  const currentPath = getState().router.location.pathname;

  const limit = PAGINATION_LIMIT.adminCareInsightReview;

  if (
    currentPath ===
    appRoutesEndpoints.admin.nestedRoutes.careInsightReview.baseRoute
  ) {
    dispatch(resetCareInsightReviewData());
    dispatch(getAdminCareInsight(0, limit));
    dispatch(closeAlertAndSummaryNotifications());
  } else {
    dispatch(closeAlertAndSummaryNotifications());
    dispatch(
      push(
        `${adminBaseRoute}${appRoutesEndpoints.admin.nestedRoutes.careInsightReview.baseRoute}`,
      ),
    );
  }
};

/**
 * @description action creator to close the approve dialog
 * @function closeAllApproveDialog
 */
export const closeAllApproveDialog = () => (dispatch: any, getState: any) => {
  const alert = Object.values(getState().events.alert);
  const summary = Object.values(getState().events.summary);
  const milestone = Object.values(getState().events.milestone);

  const allEvent = [...summary, ...alert, ...milestone];

  allEvent.forEach((element: any) => {
    if (element.viewState === EventViewState.Approve) {
      dispatch(closeEvent(element.eventId, element.eventType));
    }
  });

  Object.values(alert).some((value: any) => {
    return value.viewState === EventViewState.Approve;
  });
};

/**
 * @description action creator to close the alert and summary approve dialog
 * @function closeAlertAndSummaryNotifications
 */
export const closeAlertAndSummaryNotifications =
  () => (dispatch: any, getState: any) => {
    const alert = Object.values(getState().events.alert);
    const summary = Object.values(getState().events.summary);

    const allEvent = [...summary, ...alert];

    allEvent.forEach((element: any) => {
      if (element.viewState === EventViewState.Approve) {
        dispatch(closeEvent(element.eventId, element.eventType));
      }
    });

    Object.values(alert).some((value: any) => {
      return value.viewState === EventViewState.Approve;
    });
  };

/**
 * @description action creator to close the milestone notification
 * @function closeMilestoneNotification
 */
export const closeMilestoneNotification =
  () => (dispatch: any, getState: any) => {
    const milestone = Object.values(getState().events.milestone);

    milestone.forEach((element: any) => {
      if (element.viewState === EventViewState.Approve) {
        dispatch(closeEvent(element.eventId, element.eventType));
      }
    });
  };

/**
 * @description action creator to close all actions notification
 * @function closeAllActionNotification
 */
export const closeAllActionNotification =
  () => (dispatch: any, getState: any) => {
    const alert = Object.values(getState().events.alert);
    const summary = Object.values(getState().events.summary);

    const allEvent = [...summary, ...alert];

    allEvent.forEach((element: any) => {
      if (element.viewState === EventViewState.ActionNotification) {
        dispatch(closeEvent(element.eventId, element.eventType));
      }
    });

    Object.values(alert).some((value: any) => {
      return value.viewState === EventViewState.ActionNotification;
    });
  };
