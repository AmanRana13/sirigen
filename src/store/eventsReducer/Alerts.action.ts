import {showError} from 'store/commonReducer/common.action';
import {
  showApplicationLoader,
  hideApplicationLoader,
} from './../../common/ApplicationLoader/ApplicationLoader.action';
import {getAlertCareInsightHistory} from './Events.action';

import moment from 'moment-timezone';

import {
  capitalizeFirstLetter,
  getCareAgentInfo,
  isAuthenticateUser,
} from 'globals/global.functions';
import {DATE_FORMAT, TIME_FORMAT} from 'globals/global.constants';
import {
  CareInsightStatus,
  EventsType,
  EventViewState,
} from '../../globals/enums';
import {IAlertEvent} from './Events.state';
import {postAlertDialogService} from 'services/careInsightService/insightSummary.service';
import {IPostAlertDialogPayload} from './Alerts.types';
import {getSeniorMappingService} from 'services/seniorService/senior.service';

export const ADD_SUMMARY = 'ADD_SUMMARY';
export const CREATE_SUMMARY = 'CREATE_SUMMARY';
export const MINIMIZE_EVENT = 'MINIMIZE_EVENT';
export const MAXIMIZE_EVENT = 'MAXIMIZE_EVENT';
export const CLOSE_EVENT = 'CLOSE_EVENT';
export const CREATE_ALERT = 'CREATE_ALERT';
export const REMOVE_ALL_EVENTS = 'REMOVE_ALL_EVENTS';

/**
 * @function createAlertDialog
 * @description action creator to create summary popup
 */
export const createAlertDialog = (data: any) => async (dispatch: any) => {
  const seniorQueryPayload = [
    {
      user_id: data.seniorId,
      account_id: data.accountId,
    },
  ];
  try {
    const seniorDetail = await getSeniorMappingService(seniorQueryPayload);
    const seniorName =
      seniorDetail[data.accountId][data.seniorId]['minimal']['name'];
    const seniorTimezone =
      seniorDetail[data.accountId][data.seniorId]['basic_info']['timezone'];
    const detailList = [
      {
        label: 'Date/Time Generated',
        value: `${moment(data.dateGenerated).format(DATE_FORMAT)} @ ${moment(
          data.dateGenerated,
        ).format(TIME_FORMAT)}`,
      },
      {
        label: 'Vital Sign',
        value: data.vitalLabel,
      },
      {
        label: 'Variable',
        value: capitalizeFirstLetter(data.variable),
      },
      {
        label: 'Current',
        value: `${data.reading} ${data.meassurementUnit}`,
      },
      {
        label: 'Range',
        value:
          !data.range.goodLower || !data.range.goodUpper
            ? '-'
            : `${data.range.goodLower}-${data.range.goodUpper} ${data.meassurementUnit}`,
      },
    ];

    const fullName = `${seniorName.first_name} ${seniorName.last_name}`;
    const endDate = moment(data.dateGenerated).format(DATE_FORMAT);
    const startDate = moment(endDate).subtract(7, 'days').format(DATE_FORMAT);

    const careInsightHistory = await dispatch(
      getAlertCareInsightHistory(
        startDate,
        endDate,
        data.accountId,
        data.seniorId,
      ),
    );
    if (!isAuthenticateUser()) {
      return;
    }
    const alertData: IAlertEvent = createAlertData(
      fullName,
      data.seniorId,
      startDate,
      endDate,
      careInsightHistory?.results,
      EventsType.Alert,
      EventViewState.Maximize,
      data.message,
      data.accountId,
      seniorTimezone,
      data.careInsightId,
      detailList,
      data.dateGenerated,
    );

    dispatch({type: CREATE_ALERT, payload: {alertData}});
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('Data is missing in the API', {error});
  }
};

/**
 * @function postAlertDialog
 * @description action creator to submit the care insight alert
 * @param {string} careInsightId
 * @param {string} status
 * @param {string} message
 * @returns void
 */
export const postAlertDialog = (
  careInsightId: string,
  status: CareInsightStatus,
  message: string,
) => async (dispatch: any) => {
  const careAgentInfo = getCareAgentInfo();
  const payload: IPostAlertDialogPayload = {
    care_insight_id: careInsightId,
    updated_by: careAgentInfo.userName.first_name,
    status: status,
    message: message.trim(),
  };

  try {
    dispatch(showApplicationLoader());
    const response = await postAlertDialogService(payload);
    dispatch(hideApplicationLoader());

    return response;
  } catch (error) {
    dispatch(hideApplicationLoader());
    dispatch(showError(error));
  }
};

/**
 * @function createApproveAlert
 * @description action creator to create approve dialog
 * @param data
 */
export const createApproveAlert = (data: any) => (
  dispatch: any,
  getState: any,
) => {
  const alert = getState().events.alert;

  const isExist = Object.values(alert).some((value: any) => {
    return value.viewState === EventViewState.Approve;
  });

  // if approve dialog for alert already existing return null
  if (isExist) {
    return;
  }

  const alertData: IAlertEvent = createAlertData(
    '',
    data.seniorId,
    '',
    '',
    [],
    EventsType.Alert,
    EventViewState.Approve,
    data.message,
    data.accountId,
    '',
    data.careInsightId,
    [],
    data.dateGenerated,
  );

  dispatch({type: CREATE_ALERT, payload: {alertData}});
};

/**
 * @function createAlertActionNotification
 * @description action creator to create notification when action performed on careinsight by admin
 * @param data
 */
export const createAlertActionNotification = (data: any) => (dispatch: any) => {
  const alertData: IAlertEvent = createAlertData(
    '',
    data.seniorId,
    '',
    '',
    [],
    EventsType.Alert,
    EventViewState.ActionNotification,
    data.message,
    data.accountId,
    '',
    data.careInsightId,
    [],
    data.dateGenerated,
  );

  dispatch({type: CREATE_ALERT, payload: {alertData}});
};

/**
 * @function createAlertData
 * @description method to create data for alert event
 * @param {string} fullName senior fullname
 * @param {string} seniorId senior ID
 * @param {string} startDate care insight history data start date
 * @param {string} endDate care insight history data end date
 * @param {any} careInsightHistory
 * @param {EventsType} type type of event alert
 * @param {EventViewState} viewState view state of event maximize or minimize
 * @returns {ISummaryEvent}
 */
const createAlertData = (
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
  alertId: string,
  detailList: any,
  dateGenerated: string,
): IAlertEvent => {
  const eventId = `${seniorId}-${alertId}`;
  return {
    [eventId]: {
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
      eventId,
      alertId,
      detailList,
      dateGenerated,
    },
  };
};
