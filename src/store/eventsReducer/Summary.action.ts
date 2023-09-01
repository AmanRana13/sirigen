import {
  closeEvent,
  getEventsInsightHistory,
  maximizeEvent,
} from './Events.action';
import moment from 'moment-timezone';

import {
  hideApplicationLoader,
  showApplicationLoader,
} from 'common/ApplicationLoader';
import {getSeniorFullName} from 'store/commonReducer/common.action';
import {getCareAgentInfo, getCurrentSenior} from 'globals/global.functions';
import {
  DATE_FORMAT,
  PAGINATION_LIMIT,
  TOAST_MESSAGES,
} from 'globals/global.constants';
import {
  convertEndDateInUTCTz,
  convertStartDateInUTCTz,
  convertUTCSecondsToUnixNanoSeconds,
  getClientTimezone,
} from 'globals/date.functions';
import {IGetInsightsPayload} from 'pages/WCPages/SeniorCareInsights/SeniorCareInsight.state';

import {
  CareInsightStatus,
  CareInsightTypes,
  EventsType,
  EventViewState,
  ToastMessageType,
} from './../../globals/enums';
import {IEventsInitialState, ISummaryEvent} from './Events.state';
import {CREATE_SUMMARY} from './Alerts.action';
import {showToast} from 'common/Toast';
import {
  RESET_INSIGHT_HISTORY,
  RESET_PAGINATION,
  getInsightHistory,
} from 'pages/WCPages/SeniorCareInsights/MessageManager/MessageManager.action';
import {postSummaryMessageService} from 'services/careInsightService/insightSummary.service';

/**
 * @function createSummary
 * @description action creator to create summary popup
 */
export const createSummary = () => async (dispatch: any, getState: any) => {
  const events: IEventsInitialState = getState().events;
  const {
    user_id: seniorId,
    account_id: accountId,
    isResident
  } = getState().common.seniorDetail.minimalInfo;

  const endDate = moment().format(DATE_FORMAT);
  const startDate = moment(endDate).subtract(7, 'days').format(DATE_FORMAT);

  const response: any = await dispatch(
    getSummaryCareInsightHistory(startDate, endDate, accountId, seniorId),
  );

  const {timezone: seniorTimezone} = getCurrentSenior();

  if (!events.summary[seniorId]) {
    const fullName = dispatch(getSeniorFullName());
    const summaryData: ISummaryEvent = createSummaryData(
      fullName,
      seniorId,
      startDate,
      endDate,
      response.results,
      EventsType.Summary,
      EventViewState.Maximize,
      '',
      accountId,
      seniorTimezone,
      seniorId,
      isResident
    );

    dispatch({type: CREATE_SUMMARY, payload: {summaryData}});
  } else {
    dispatch(maximizeEvent(seniorId, EventsType.Summary));
  }
};

/**
 * @function getSummaryCareInsightHistory
 * @description action creator to get care insight history
 * @param {*} startDate
 * @param {*} endDate
 * @param {string} accountId
 * @param {string} seniorId
 * @returns summary history api response
 */
export const getSummaryCareInsightHistory = (
  startDate: any,
  endDate: any,
  accountId: string,
  seniorId: string,
) => async (dispatch: any) => {
  dispatch(showApplicationLoader());
  const clientTimezone = getClientTimezone();

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
  };
  return await dispatch(getEventsInsightHistory(payload));
};

/**
 * @function postSummaryMessage
 * @description action creator to submit message summary
 * @param {string} seniorId
 * @param {string} message
 * @returns void
 */
export const postSummaryMessage = (
  seniorId: string,
  message: string,
  eventId: string,
  summaryType: string | null,
) => async (dispatch: any, getState: any) => {
  const {user_id: currentSeniorId} = getState().common.seniorDetail.minimalInfo;

  try {
    dispatch(showApplicationLoader());
    const careAgentInfo = getCareAgentInfo();

    const payload = {
      senior_id: seniorId,
      message: message,
      insight_type: summaryType,
      created_by: careAgentInfo.userName.first_name,
      status: CareInsightStatus.SentForApproval,
    };

    await postSummaryMessageService(payload);

    dispatch(closeEvent(eventId, EventsType.Summary));
    dispatch(hideApplicationLoader());
    dispatch(
      showToast(
        TOAST_MESSAGES.POST_CARE_INSIGHT_SUMMARY.SUCCESS,
        ToastMessageType.Success,
      ),
    );

    // update insight history when on message manaeger page.
    if (
      seniorId === currentSeniorId &&
      window.location.pathname.includes('message-manager')
    ) {
      dispatch({type: RESET_INSIGHT_HISTORY});
      dispatch({type: RESET_PAGINATION});
      dispatch(getInsightHistory(0, PAGINATION_LIMIT.messageManager));
    }
  } catch (error) {
    dispatch(hideApplicationLoader());
    dispatch(
      showToast(
        TOAST_MESSAGES.POST_CARE_INSIGHT_SUMMARY.FAIL,
        ToastMessageType.Error,
      ),
    );
  }
};

/**
 * @function createApproveSummary action creator to create approve dialog for summary
 * @param data
 * @returns null if summary approve dialog exist else void
 */
export const createApproveSummary = (data: any) => (
  dispatch: any,
  getState: any,
) => {
  const summary = getState().events.summary;

  const isExist = Object.values(summary).some((value: any) => {
    return value.viewState === EventViewState.Approve;
  });

  // if approve dialog for alert already existing return null
  if (isExist) {
    return;
  }
  const summaryData: ISummaryEvent = createSummaryData(
    '',
    data.seniorId,
    '',
    '',
    [],
    EventsType.Summary,
    EventViewState.Approve,
    data.message,
    data.accountId,
    '',
    data.careInsightId,
    data.isResident
  );

  dispatch({type: CREATE_SUMMARY, payload: {summaryData}});
};

/**
 * @function createSummaryActionNotification action creator to create approve dialog for summary
 * @param data
 * @returns null if summary approve dialog exist else void
 */
export const createSummaryActionNotification = (data: any) => (
  dispatch: any,
) => {
  const summaryData: ISummaryEvent = createSummaryData(
    '',
    data.seniorId,
    '',
    '',
    [],
    EventsType.Summary,
    EventViewState.ActionNotification,
    data.message,
    data.accountId,
    '',
    data.careInsightId,
    data.isResident
  );

  dispatch({type: CREATE_SUMMARY, payload: {summaryData}});
};

/**
 * @function createSummaryData
 * @description method to create data for summary event
 * @param {string} fullName senior fullname
 * @param {string} seniorId senior ID
 * @param {string} startDate care insight history data start date
 * @param {string} endDate care insight history data end date
 * @param {any} careInsightHistory
 * @param {EventsType} type type of event summary
 * @param {EventViewState} viewState view state of event maximize or minimize
 * @returns {ISummaryEvent}
 */
const createSummaryData = (
  fullName: string,
  seniorId: string,
  startDate: string,
  endDate: string,
  careInsightHistory: any,
  eventType: EventsType,
  viewState: EventViewState,
  message: string,
  accountId: string,
  seniorTimezone: string | undefined,
  eventId: string,
  isResident: boolean,
): ISummaryEvent => {
  const id = `${seniorId}-${eventId}`;
  return {
    [id]: {
      eventType,
      viewState,
      fullName,
      seniorId,
      startDate,
      endDate,
      careInsightHistory,
      message,
      accountId,
      seniorTimezone,
      eventId: id,
      isResident
    },
  };
};
